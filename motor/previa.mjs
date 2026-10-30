/**
 * Página de prévia (saida/previa/index.html): cada post como no celular, slide a slide (vídeo quando o slide é
 * animado), com a legenda embaixo. Abre no Chrome com --abrir.
 *
 *   node motor/previa.mjs [<id>...] [--abrir]
 */
import { existsSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";
import { execFile } from "node:child_process";
import { RAIZ } from "./comum.mjs";

const args = process.argv.slice(2);
const ids = args.filter((a) => !a.startsWith("--"));
const { POSTS } = await import(pathToFileURL(join(RAIZ, "conteudo", "plano.mjs")).href);
const lista = POSTS.filter((p) => !ids.length || ids.includes(p.id)).sort((a, b) => String(a.id).localeCompare(String(b.id)));
const PASTA = join(RAIZ, "saida", "previa");
mkdirSync(PASTA, { recursive: true });
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const url = (f) => relative(PASTA, f).split("\\").join("/");

const blocos = lista.map((p) => {
  if (p.formato === "microreel") {
    const mp4 = join(RAIZ, "saida", "microreels", `${p.id}.mp4`);
    return `<article>
  <header><span class="tag">microreel</span><span>${esc(p.data)}${p.hora ? ` · ${esc(p.hora)}` : ""}</span><span class="pilar">${esc(p.pilar ?? "")}</span></header>
  <div class="tel"><div class="topo-ig"><span class="av"></span><b>biomagistral_santaluz</b><small>Santaluz, Bahia</small></div>
  ${existsSync(mp4) ? `<video class="reel" src="${url(mp4)}" controls playsinline loop></video>` : "<p class=\"vazio\">ainda não gerado</p>"}
  <pre class="leg">${esc(p.legenda ?? "")}</pre></div>
</article>`;
  }
  const dir = join(RAIZ, "saida", "carrosseis", p.id);
  const arqs = existsSync(dir) ? readdirSync(dir).sort() : [];
  const nums = [...new Set(arqs.filter((f) => /^\d+\.(png|mp4)$/.test(f)).map((f) => f.slice(0, 2)))];
  const slides = nums.map((n) => arqs.includes(`${n}.mp4`)
    ? `<video src="${url(join(dir, `${n}.mp4`))}" poster="${url(join(dir, `${n}.png`))}" muted loop playsinline autoplay></video>`
    : `<img src="${url(join(dir, `${n}.png`))}" alt="slide ${n}">`).join("");
  return `<article>
  <header><span class="tag">${esc(p.formato)}</span><span>${esc(p.data)}${p.hora ? ` · ${esc(p.hora)}` : ""}</span><span class="pilar">${esc(p.pilar ?? "")}</span></header>
  <div class="tel"><div class="topo-ig"><span class="av"></span><b>biomagistral_santaluz</b><small>Santaluz, Bahia</small></div>
  <div class="trilho">${slides || "<p class='vazio'>ainda não gerado</p>"}</div>
  <div class="pontos">${nums.map((_, k) => `<i${k ? "" : ' class="on"'}></i>`).join("")}</div>
  <pre class="leg">${esc(p.legenda ?? "")}</pre></div>
</article>`;
}).join("\n");

// grade do feed (como no perfil): mais recente primeiro, recorte 3:4
const ordem = (p) => { const m = String(p.data).match(/(\d{2})\/(\d{2})/); return (m ? m[2] + m[1] : "0000") + (p.hora ?? "00:00"); };
const noFeed = POSTS.filter((p) => /carrossel|microreel/.test(p.formato) && /\d{2}\/\d{2}/.test(String(p.data))).sort((a, b) => ordem(b).localeCompare(ordem(a)));
const capaDe = (p) => p.formato === "microreel" ? join(RAIZ, "saida", "microreels", `${p.id}-capa.png`) : join(RAIZ, "saida", "carrosseis", p.id, "01.png");
const feed = noFeed.map((p) => existsSync(capaDe(p)) ? `<div class="cel"><img src="${url(capaDe(p))}" alt=""><span>${esc(String(p.data).slice(0, 5))}${p.formato === "microreel" ? " ▶" : ""}</span></div>` : `<div class="cel vaz"><span>${esc(String(p.data).slice(0, 5))}</span></div>`).join("");
writeFileSync(join(PASTA, "index.html"), `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Prévia Biomagistral</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
:root{--noite:#0F1C2C;--ouro:linear-gradient(100deg,#F4F2BE,#A07F45 50%,#F4F2BE)}
*{box-sizing:border-box}body{margin:0;background:#0A1420;color:#E9EEF4;font-family:Poppins,system-ui,sans-serif}
main{max-width:1200px;margin:0 auto;padding:36px 16px 80px}
h1{font-weight:700;font-size:clamp(26px,4vw,40px);margin:0 0 6px;background:var(--ouro);-webkit-background-clip:text;background-clip:text;color:transparent}
.sub{color:#9FB0C2;margin:0 0 30px;font-size:14px}
.grade{display:grid;grid-template-columns:repeat(auto-fill,minmax(380px,1fr));gap:28px}
article header{display:flex;gap:10px;align-items:center;font-size:13px;color:#9FB0C2;margin-bottom:10px;flex-wrap:wrap}
.tag{background:#A07F45;color:#0F1C2C;font-weight:700;border-radius:99px;padding:2px 10px;text-transform:uppercase;font-size:11px;letter-spacing:.1em}
.pilar{margin-left:auto;color:#E8DDA8}
.tel{background:#fff;color:#111;border-radius:22px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.4)}
.topo-ig{display:flex;align-items:center;gap:10px;padding:10px 14px;font-size:13px}
.topo-ig .av{width:30px;height:30px;border-radius:50%;background:var(--noite)}
.topo-ig small{color:#777;margin-left:auto}
.trilho{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;aspect-ratio:4/5;background:#000}
.trilho>*{flex:0 0 100%;width:100%;height:100%;object-fit:cover;scroll-snap-align:start}
.pontos{display:flex;justify-content:center;gap:5px;padding:10px}
.pontos i{width:6px;height:6px;border-radius:50%;background:#cfd6de}.pontos i.on{background:#0F62FE}
.leg{white-space:pre-wrap;font:13px/1.55 Poppins,system-ui;margin:0;padding:4px 16px 18px;color:#222}
.vazio{color:#fff;margin:auto}
.reel{display:block;width:100%;aspect-ratio:9/16;background:#000}
.sec{font-weight:600;font-size:18px;margin:26px 0 12px;color:#E8DDA8}
.feed{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;max-width:520px;background:#000}
.cel{position:relative;aspect-ratio:3/4;overflow:hidden;background:#142639}
.cel img{width:100%;height:100%;object-fit:cover}
.cel span{position:absolute;left:6px;bottom:6px;font-size:11px;background:rgba(0,0,0,.55);padding:2px 6px;border-radius:6px}
@media (max-width:480px){.grade{grid-template-columns:1fr}}
</style></head><body><main>
<h1>Biomagistral Santaluz · prévia</h1><p class="sub">Arraste os slides de cada post. Slides em vídeo tocam sozinhos. Gerado em ${new Date().toLocaleString("pt-BR", { timeZone: "America/Bahia" })}.</p>
<h2 class="sec">Veja o seu feed</h2><div class="feed">${feed}</div><h2 class="sec">Posts</h2><div class="grade">${blocos}</div></main>
<script>document.querySelectorAll('.trilho').forEach(t=>{const p=t.parentElement.querySelectorAll('.pontos i');t.addEventListener('scroll',()=>{const k=Math.round(t.scrollLeft/t.clientWidth);p.forEach((x,j)=>x.classList.toggle('on',j===k))})})</script>
</body></html>`);
console.log(`prévia: ${join(PASTA, "index.html")} (${lista.length} post(s))`);
if (args.includes("--abrir")) execFile("cmd", ["/c", "start", "chrome", pathToFileURL(join(PASTA, "index.html")).href]);
