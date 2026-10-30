/**
 * Página do plano do mês (saida/plano-novembro.html): grade do mês com carrossel, microreel e roteiro de cada dia.
 *   node motor/calendario.mjs [--abrir]
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { execFile } from "node:child_process";
import { RAIZ } from "./comum.mjs";

const { NOVEMBRO } = await import(pathToFileURL(join(RAIZ, "conteudo", "plano-novembro.mjs")).href);
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;");
const PIL = { F: "Como sua fórmula é feita", A: "Ativo explicado", M: "Mito ou verdade", P: "Parecidos, mas não iguais", Q: "Teste rápido", D: "Data", NA: "Novembro Azul" };
const COR = { F: "#E2C77E", A: "#7FB7E0", M: "#E7A07A", P: "#B9A7E8", Q: "#7DD3B0", D: "#C9CED6", NA: "#3B82F6" };
const MIC = { texto: "Texto animado", "claude-design": "Claude Design", "chatgpt-runway": "ChatGPT + Runway" };
const SEM = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const dias = NOVEMBRO.map((x) => {
  const n = Number(x.d), sem = (n - 1) % 7;
  return `<div class="dia"><div class="num">${n}<small>${SEM[sem]}</small></div>
  <div class="it c" style="--c:${COR[x.c[0]]}"><em>${PIL[x.c[0]]}</em>${esc(x.c[1])}</div>
  ${x.m ? `<div class="it m"><em>Microreel · ${MIC[x.m[0]]}</em>${esc(x.m[1])}</div>` : ""}
  ${x.r ? `<div class="it r"><em>Reel da equipe · ${esc(x.r[0])}</em>${esc(x.r[1])}</div>` : ""}</div>`;
}).join("");
const cont = (f) => NOVEMBRO.filter(f).length;
const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Plano de Novembro</title><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}body{margin:0;background:#0F1C2C;color:#E9EEF4;font-family:Poppins,system-ui,sans-serif}
main{max-width:1400px;margin:0 auto;padding:36px 16px 70px}
h1{margin:0;font-weight:700;font-size:clamp(28px,4vw,44px);background:linear-gradient(100deg,#F4F2BE,#A07F45 50%,#F4F2BE);-webkit-background-clip:text;background-clip:text;color:transparent}
.sub{color:#9FB0C2;font-size:14px;margin:6px 0 18px}
.resumo{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:18px}
.resumo span{font-size:13px;padding:6px 12px;border-radius:99px;border:1px solid #22364d}
.leg{display:flex;flex-wrap:wrap;gap:12px;font-size:12px;color:#9FB0C2;margin-bottom:16px}
.leg i{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px;vertical-align:-1px}
.grade{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}
.vazio{visibility:hidden}
.dia{background:#142639;border:1px solid #22364d;border-radius:10px;padding:8px;min-height:150px}
.num{font-weight:700;font-size:18px;margin-bottom:4px}.num small{font-weight:400;font-size:11px;color:#9FB0C2;margin-left:6px}
.it{font-size:11.5px;line-height:1.35;margin-top:6px;padding:5px 7px;border-radius:6px;background:rgba(255,255,255,.04)}
.it em{display:block;font-style:normal;font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:#9FB0C2;margin-bottom:2px}
.it.c{border-left:3px solid var(--c)}.it.m{border-left:3px solid #F4F2BE}.it.r{border-left:3px solid #25A35A}
@media (max-width:900px){.grade{grid-template-columns:1fr}.vazio{display:none}.dia{min-height:0}}
</style></head><body><main>
<h1>Plano de novembro · Biomagistral Santaluz-BA</h1>
<p class="sub">Para aprovar os temas. Cada carrossel e microreel tem começo, meio e fim sozinho e termina no WhatsApp para avaliação personalizada.</p>
<div class="resumo"><span>${cont((x) => x.c)} carrosséis</span><span>${cont((x) => x.m)} microreels</span><span>${cont((x) => x.r)} roteiros de reel para a equipe</span>
<span>Novembro Azul: ${cont((x) => x.c[0] === "NA") + cont((x) => x.m && /Novembro Azul/.test(x.m[1])) + cont((x) => x.r && /Novembro Azul/.test(x.r[1]))} peças (limite 12)</span></div>
<div class="leg">${Object.entries(PIL).map(([k, v]) => `<span><i style="background:${COR[k]}"></i>${v}</span>`).join("")}<span><i style="background:#F4F2BE"></i>Microreel</span><span><i style="background:#25A35A"></i>Reel da equipe</span></div>
<div class="grade">${dias}</div></main></body></html>`;
mkdirSync(join(RAIZ, "saida"), { recursive: true });
const arq = join(RAIZ, "saida", "plano-novembro.html");
writeFileSync(arq, html);
console.log(arq);
if (process.argv.includes("--abrir")) execFile("cmd", ["/c", "start", "chrome", pathToFileURL(arq).href]);
