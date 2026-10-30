/**
 * Monta a entrega de um mês pronta para programar: uma pasta por post (vídeos dos slides na ordem, capa, legenda),
 * agenda.json/agenda.csv (data, hora, tipo, arquivos) e index.html (feed + posts, com botão de copiar a legenda e
 * a marcação "programado"). Tudo com caminhos relativos: funciona offline e dentro do repositório.
 *
 *   node motor/entrega.mjs 2026-11                 → entregas/2026-11/
 *   node motor/entrega.mjs 2026-11 --destino=<dir> → <dir>/ (mesma estrutura)
 *   node motor/entrega.mjs 2026-11 --abrir
 */
import { existsSync, readdirSync, writeFileSync, mkdirSync, copyFileSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { execFile } from "node:child_process";
import { RAIZ, ff } from "./comum.mjs";

const args = process.argv.slice(2);
const mes = args.find((a) => /^\d{4}-\d{2}$/.test(a));
if (!mes) { console.error("uso: node motor/entrega.mjs AAAA-MM [--destino=<pasta>] [--abrir]"); process.exit(1); }
const [ano, mm] = mes.split("-");
const destinoArg = args.find((a) => a.startsWith("--destino="))?.slice(10);
const DEST = destinoArg ? resolve(destinoArg) : join(RAIZ, "entregas", mes);
const { POSTS } = await import(pathToFileURL(join(RAIZ, "conteudo", "plano.mjs")).href + "?v=" + Date.now());
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const diaDe = (p) => String(p.data).match(/(\d{2})\/(\d{2})/);
const posts = POSTS.filter((p) => /carrossel|microreel/.test(p.formato) && diaDe(p)?.[2] === mm)
  .map((p) => ({ ...p, dia: diaDe(p)[1], iso: `${ano}-${mm}-${diaDe(p)[1]}`, hora: p.hora ?? "12:00" }))
  .sort((a, b) => (a.iso + a.hora).localeCompare(b.iso + b.hora));
const SEMANA = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const jpg = (de, para, largura = 540) => ff(["-i", de, "-vf", `scale=${largura}:-2`, "-q:v", "4", para]);

rmSync(join(DEST, "posts"), { recursive: true, force: true });
mkdirSync(join(DEST, "posts"), { recursive: true });
const agenda = [], faltando = [];
for (const [k, p] of posts.entries()) {
  const pasta = `${p.dia}-${p.hora.replace(":", "h")}-${p.formato}`;
  const dir = join(DEST, "posts", pasta);
  mkdirSync(dir, { recursive: true });
  const arquivos = [];
  if (p.formato === "microreel") {
    const mp4 = join(RAIZ, "saida", "microreels", `${p.id}.mp4`), capa = join(RAIZ, "saida", "microreels", `${p.id}-capa.png`);
    if (!existsSync(mp4)) { faltando.push(p.id); continue; }
    copyFileSync(mp4, join(dir, "reel.mp4")); arquivos.push("reel.mp4");
    if (existsSync(capa)) jpg(capa, join(dir, "capa.jpg"), 1080);
  } else {
    const src = join(RAIZ, "saida", "carrosseis", p.id);
    const nums = existsSync(src) ? [...new Set(readdirSync(src).filter((f) => /^\d+\.(png|mp4)$/.test(f)).map((f) => f.split(".")[0]))].sort() : [];
    if (!nums.length) { faltando.push(p.id); continue; }
    for (const n of nums) {
      const v = join(src, `${n}.mp4`), im = join(src, `${n}.png`);
      if (existsSync(v)) { copyFileSync(v, join(dir, `${n}.mp4`)); arquivos.push(`${n}.mp4`); }
      else { jpg(im, join(dir, `${n}.jpg`), 1080); arquivos.push(`${n}.jpg`); }
      if (existsSync(im)) jpg(im, join(dir, `previa-${n}.jpg`));
    }
    jpg(join(src, `${nums[0]}.png`), join(dir, "capa.jpg"), 1080);
  }
  writeFileSync(join(dir, "legenda.txt"), (p.legenda ?? "").trim() + "\n");
  const sem = SEMANA[new Date(`${p.iso}T12:00:00`).getDay()];
  agenda.push({ ordem: k + 1, id: p.id, data: p.iso, dia_semana: sem, hora: p.hora, tipo: p.formato, pilar: p.pilar ?? "", pasta: `posts/${pasta}`, arquivos, legenda: (p.legenda ?? "").trim(), programado: false });
}
writeFileSync(join(DEST, "agenda.json"), JSON.stringify(agenda, null, 2));
const csv = (s) => `"${String(s).replace(/"/g, '""')}"`;
writeFileSync(join(DEST, "agenda.csv"), "﻿" + ["ordem;data;dia;hora;tipo;pasta;arquivos;legenda", ...agenda.map((a) => [a.ordem, a.data.split("-").reverse().join("/"), a.dia_semana, a.hora, a.tipo, a.pasta, a.arquivos.join(" "), a.legenda].map(csv).join(";"))].join("\r\n"));

// página: feed (mais recente primeiro) + posts por data, vídeos só carregam ao tocar
const feed = [...agenda].reverse().map((a) => `<a class="cel" href="#p${a.ordem}"><img loading="lazy" src="${a.pasta}/capa.jpg" alt=""><span>${a.data.slice(8)}/${mm}${a.tipo === "microreel" ? " ▶" : ""}</span></a>`).join("");
const blocos = agenda.map((a) => {
  const midia = a.tipo === "microreel"
    ? `<video class="reel" src="${a.pasta}/reel.mp4" poster="${a.pasta}/capa.jpg" controls playsinline preload="none"></video>`
    : `<div class="trilho">${a.arquivos.map((f) => f.endsWith(".mp4")
      ? `<video src="${a.pasta}/${f}" poster="${a.pasta}/previa-${f.split(".")[0]}.jpg" muted loop playsinline preload="none"></video>`
      : `<img loading="lazy" src="${a.pasta}/${f}" alt="">`).join("")}</div><div class="pontos">${a.arquivos.map((_, j) => `<i${j ? "" : ' class="on"'}></i>`).join("")}</div>`;
  return `<article id="p${a.ordem}" data-id="${a.id}">
  <header><b>${a.data.slice(8)}/${mm} (${a.dia_semana}) · ${a.hora}</b><span class="tag">${a.tipo}</span><span class="pilar">${esc(a.pilar)}</span>
  <label class="ok"><input type="checkbox" data-k="${a.id}"> programado</label></header>
  <div class="tel"><div class="topo-ig"><span class="av"></span><b>biomagistral_santaluz</b><small>Santaluz, Bahia</small></div>${midia}
  <div class="arqs">Arquivos, na ordem: <code>${a.pasta}/</code> ${a.arquivos.map((f) => `<a href="${a.pasta}/${f}" download>${f}</a>`).join(" · ")}</div>
  <pre class="leg">${esc(a.legenda)}</pre><button class="copiar">Copiar legenda</button></div>
</article>`;
}).join("\n");
const nome = new Date(`${ano}-${mm}-15T12:00:00`).toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
writeFileSync(join(DEST, "index.html"), `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Biomagistral Santaluz · ${esc(nome)}</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
:root{--noite:#0F1C2C;--ouro:linear-gradient(100deg,#F4F2BE,#A07F45 50%,#F4F2BE)}
*{box-sizing:border-box}body{margin:0;background:#0A1420;color:#E9EEF4;font-family:Poppins,system-ui,sans-serif}
main{max-width:1200px;margin:0 auto;padding:36px 16px 80px}
h1{font-weight:700;font-size:clamp(26px,4vw,40px);margin:0 0 6px;background:var(--ouro);-webkit-background-clip:text;background-clip:text;color:transparent}
.sub{color:#9FB0C2;margin:0 0 24px;font-size:14px;max-width:760px}
.sec{font-weight:600;font-size:18px;margin:28px 0 12px;color:#E8DDA8}
.feed{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;max-width:520px;background:#000}
.cel{position:relative;aspect-ratio:3/4;overflow:hidden;background:#142639;display:block}
.cel img{width:100%;height:100%;object-fit:cover}
.cel span{position:absolute;left:6px;bottom:6px;font-size:11px;color:#fff;background:rgba(0,0,0,.55);padding:2px 6px;border-radius:6px}
.grade{display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:28px}
article header{display:flex;gap:10px;align-items:center;font-size:13px;color:#C9D4E0;margin-bottom:10px;flex-wrap:wrap}
.tag{background:#A07F45;color:#0F1C2C;font-weight:700;border-radius:99px;padding:2px 10px;text-transform:uppercase;font-size:11px;letter-spacing:.1em}
.pilar{color:#E8DDA8}.ok{margin-left:auto;cursor:pointer}
article.feito .tel{opacity:.55}
.tel{background:#fff;color:#111;border-radius:22px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.4)}
.topo-ig{display:flex;align-items:center;gap:10px;padding:10px 14px;font-size:13px}
.topo-ig .av{width:30px;height:30px;border-radius:50%;background:var(--noite)}
.topo-ig small{color:#777;margin-left:auto}
.trilho{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;aspect-ratio:4/5;background:#000}
.trilho>*{flex:0 0 100%;width:100%;height:100%;object-fit:cover;scroll-snap-align:start}
.pontos{display:flex;justify-content:center;gap:5px;padding:10px}
.pontos i{width:6px;height:6px;border-radius:50%;background:#cfd6de}.pontos i.on{background:#0F62FE}
.reel{display:block;width:100%;aspect-ratio:9/16;background:#000}
.arqs{font-size:11px;color:#555;padding:6px 16px;word-break:break-all}.arqs a{color:#0F62FE}
.leg{white-space:pre-wrap;font:13px/1.55 Poppins,system-ui;margin:0;padding:4px 16px 10px;color:#222}
.copiar{margin:0 16px 16px;border:0;border-radius:99px;background:var(--noite);color:#F4F2BE;font:600 13px Poppins;padding:9px 16px;cursor:pointer}
@media (max-width:480px){.grade{grid-template-columns:1fr}}
</style></head><body><main>
<h1>Biomagistral Santaluz · ${esc(nome)}</h1>
<p class="sub">${agenda.length} posts prontos (${agenda.filter((a) => a.tipo === "carrossel").length} carrosséis animados e ${agenda.filter((a) => a.tipo === "microreel").length} microreels). Toque num slide para ver a animação. Em cada post: a pasta com os arquivos na ordem, a legenda pronta para copiar e a caixinha "programado" (fica salva neste navegador). Passo a passo para programar: COMO-PROGRAMAR.md.</p>
<h2 class="sec">O feed do mês</h2><div class="feed">${feed}</div>
<h2 class="sec">Posts na ordem de publicação</h2><div class="grade">${blocos}</div></main>
<script>
document.querySelectorAll('.trilho').forEach(t=>{const p=t.parentElement.querySelectorAll('.pontos i');t.addEventListener('scroll',()=>{const k=Math.round(t.scrollLeft/t.clientWidth);p.forEach((x,j)=>x.classList.toggle('on',j===k))})});
document.querySelectorAll('.trilho video').forEach(v=>v.addEventListener('click',()=>v.paused?v.play():v.pause()));
document.querySelectorAll('.copiar').forEach(b=>b.addEventListener('click',()=>{navigator.clipboard.writeText(b.previousElementSibling.textContent);b.textContent='Legenda copiada ✓';setTimeout(()=>b.textContent='Copiar legenda',1800)}));
document.querySelectorAll('.ok input').forEach(c=>{const k='bmg-'+c.dataset.k;try{c.checked=localStorage.getItem(k)==='1'}catch{}c.closest('article').classList.toggle('feito',c.checked);c.addEventListener('change',()=>{try{localStorage.setItem(k,c.checked?'1':'0')}catch{}c.closest('article').classList.toggle('feito',c.checked)})});
</script></body></html>`);
console.log(`entrega ${mes}: ${agenda.length} posts em ${DEST}${faltando.length ? ` · FALTAM: ${faltando.join(", ")}` : ""}`);
if (args.includes("--abrir")) execFile("cmd", ["/c", "start", "chrome", pathToFileURL(join(DEST, "index.html")).href]);
