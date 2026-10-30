/**
 * Página dos roteiros da equipe (saida/roteiros.html): um cartão por reel, com cenas, texto na tela, áudio, dicas e
 * legenda pronta. Feita para abrir no celular da equipe.   node motor/roteiros-pagina.mjs [--abrir]
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { execFile } from "node:child_process";
import { RAIZ } from "./comum.mjs";

const { ROTEIROS, FARMACEUTICAS } = await import(pathToFileURL(join(RAIZ, "conteudo", "roteiros.mjs")).href);
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;");
const cards = ROTEIROS.slice().sort((a, b) => a.id.localeCompare(b.id)).map((r) => `<article>
<header><span class="data">${esc(r.data)} · ${esc(r.hora)}</span><h2>${esc(r.titulo)}</h2>
<p class="meta"><b>Quem grava:</b> ${esc(r.quem)} · <b>Duração:</b> ${esc(r.duracao)}</p>
<p class="meta"><b>Formato:</b> ${esc(r.formato)}</p><p class="meta"><b>Objetivo:</b> ${esc(r.objetivo)}</p>
<p class="ins">Inspiração do radar: ${esc(r.inspiracao)}</p></header>
<ol>${r.cenas.map(([acao, tela]) => `<li><span class="acao">${esc(acao)}</span><span class="tela">Na tela: “${esc(tela)}”</span></li>`).join("")}</ol>
<p><b>Áudio:</b> ${esc(r.audio)}</p>
<ul class="dicas">${r.dicas.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
<details><summary>Legenda pronta</summary><pre>${esc(r.legenda)}</pre></details>
</article>`).join("");
const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Roteiros da Equipe</title><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}body{margin:0;background:#0F1C2C;color:#E9EEF4;font-family:Poppins,system-ui,sans-serif}
main{max-width:860px;margin:0 auto;padding:32px 16px 70px}
h1{margin:0 0 4px;font-size:clamp(26px,5vw,38px);background:linear-gradient(100deg,#F4F2BE,#A07F45 50%,#F4F2BE);-webkit-background-clip:text;background-clip:text;color:transparent}
.sub{color:#9FB0C2;font-size:14px;margin:0 0 20px}
.regra{background:#142639;border:1px solid #A07F45;border-radius:12px;padding:12px 16px;font-size:14px;margin-bottom:22px}
article{background:#142639;border:1px solid #22364d;border-radius:16px;padding:18px 18px 10px;margin-bottom:18px}
.data{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#E8DDA8}
h2{margin:4px 0 8px;font-size:22px;font-weight:600}
.meta{margin:2px 0;font-size:14px;color:#C9D3DE}.ins{font-size:12.5px;color:#9FB0C2;margin:6px 0 0}
ol{padding-left:20px;margin:14px 0}li{margin-bottom:10px}
.acao{display:block;font-size:15px}.tela{display:block;font-size:13.5px;color:#E8DDA8;margin-top:2px}
.dicas{font-size:13.5px;color:#C9D3DE;padding-left:18px}
details{margin:8px 0 6px}summary{cursor:pointer;color:#E8DDA8;font-size:14px}
pre{white-space:pre-wrap;font:13px/1.55 Poppins,system-ui;background:#0F1C2C;border-radius:10px;padding:12px}
</style></head><body><main>
<h1>Roteiros da equipe · novembro</h1><p class="sub">Biomagistral Santaluz · BA. Gravem na vertical, com luz boa e bancada organizada. Mandem os vídeos brutos que nós editamos.</p>
<div class="regra"><b>Regra de ouro:</b> sempre que a farmacêutica aparecer, entra na tela o nome e o CRF-BA dela (${FARMACEUTICAS.map((f) => `${esc(f.nome)} · ${esc(f.crf)}`).join("; ")}). Receita e rótulo só fake e borrados. Nada de preço, depoimento de cliente ou nome de paciente.</div>
${cards}</main></body></html>`;
mkdirSync(join(RAIZ, "saida"), { recursive: true });
const arq = join(RAIZ, "saida", "roteiros.html");
writeFileSync(arq, html);
console.log(arq);
if (process.argv.includes("--abrir")) execFile("cmd", ["/c", "start", "chrome", pathToFileURL(arq).href]);
