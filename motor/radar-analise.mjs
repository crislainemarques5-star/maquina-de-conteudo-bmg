/**
 * Analisa uma coleta do radar (radar/dados/<dia>/*.json) e grava radar/<dia>-analise.md:
 * por perfil, seguidores, ritmo, mistura de formatos, mediana de curtidas e engajamento; e os posts "fora da curva"
 * (curtidas ÷ mediana do próprio perfil ≥ 1,5), com o gancho (primeira linha da legenda). Só dados públicos.
 *
 *   node motor/radar-analise.mjs [<dia>]
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { RAIZ } from "./comum.mjs";

const base = join(RAIZ, "radar", "dados");
const dia = process.argv[2] ?? readdirSync(base).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort().at(-1);
const pasta = join(base, dia);
const mediana = (v) => { const a = v.filter((x) => x != null).sort((x, y) => x - y); return a.length ? (a.length % 2 ? a[(a.length - 1) / 2] : (a[a.length / 2 - 1] + a[a.length / 2]) / 2) : null; };
const gancho = (t) => String(t ?? "").split("\n").map((l) => l.trim()).find((l) => l.length > 3)?.slice(0, 110) ?? "";
const fmt = (n) => (n == null ? "?" : n.toLocaleString("pt-BR"));

const perfis = readdirSync(pasta).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(readFileSync(join(pasta, f), "utf8")));
const linhas = [], foraDaCurva = [];
for (const p of perfis) {
  const ps = (p.ultimos ?? []).filter((x) => !x.fixado);
  const med = mediana(ps.map((x) => x.curtidas));
  const tipos = ps.reduce((a, x) => ((a[x.tipo] = (a[x.tipo] ?? 0) + 1), a), {});
  const datas = ps.map((x) => x.data).sort();
  const dias = datas.length > 1 ? (new Date(datas.at(-1)) - new Date(datas[0])) / 864e5 : null;
  const ritmo = dias ? ((ps.length / dias) * 7).toFixed(1) : "?";
  const eng = p.seguidores && med != null ? ((med + (mediana(ps.map((x) => x.comentarios)) ?? 0)) / p.seguidores) * 100 : null;
  linhas.push({ u: p.usuario, seg: p.seguidores, n: ps.length, ultimo: datas.at(-1) ?? "-", ritmo, tipos, med, eng });
  for (const x of ps) if (med && x.curtidas != null && x.curtidas / med >= 1.5 && x.curtidas >= 20) foraDaCurva.push({ u: p.usuario, seg: p.seguidores, ...x, razao: x.curtidas / med });
}
linhas.sort((a, b) => (b.seg ?? 0) - (a.seg ?? 0));
foraDaCurva.sort((a, b) => b.razao - a.razao);

const tabela = linhas.map((l) => `| @${l.u} | ${fmt(l.seg)} | ${l.n} | ${l.ultimo} | ${l.ritmo} | ${Object.entries(l.tipos).map(([k, v]) => `${k} ${v}`).join(" · ")} | ${l.med ?? "?"} | ${l.eng == null ? "?" : l.eng.toFixed(2) + "%"} |`).join("\n");
const fora = foraDaCurva.slice(0, 60).map((x) => `| @${x.u} | ${x.data} | ${x.tipo}${x.slides ? ` (${x.slides})` : ""} | ${fmt(x.curtidas)} | ${fmt(x.comentarios)} | ${x.razao.toFixed(1)}× | ${gancho(x.legenda).replace(/\|/g, "/")} | ${x.link} |`).join("\n");
const porTipo = {};
for (const x of foraDaCurva) porTipo[x.tipo] = (porTipo[x.tipo] ?? 0) + 1;

const md = `# Radar de concorrentes: análise da coleta de ${dia}

${perfis.length} perfis lidos (só dados públicos, pelo Instagram logado na janela do radar). "Fora da curva" = curtidas ≥ 1,5× a mediana do próprio perfil (e pelo menos 20 curtidas). Posts fixados ficam de fora das contas.

## Perfis
| Perfil | Seguidores | Posts lidos | Último post | Posts/semana | Formatos | Mediana de curtidas | Engajamento (mediana ÷ seguidores) |
|---|---|---|---|---|---|---|---|
${tabela}

## Posts fora da curva (${foraDaCurva.length}; por formato: ${Object.entries(porTipo).map(([k, v]) => `${k} ${v}`).join(" · ")})
| Perfil | Data | Formato | Curtidas | Comentários | × mediana | Gancho (1ª linha) | Link |
|---|---|---|---|---|---|---|---|
${fora}
`;
const arq = join(RAIZ, "radar", `${dia}-analise.md`);
writeFileSync(arq, md);
console.log(`análise: ${arq}`);
console.log(linhas.slice(0, 50).map((l) => `@${l.u} ${fmt(l.seg)} seg · ${l.n} posts · ${l.ritmo}/sem · med ${l.med} · eng ${l.eng?.toFixed(2)}% · ${JSON.stringify(l.tipos)}`).join("\n"));
console.log("\nFORA DA CURVA:");
console.log(foraDaCurva.slice(0, 40).map((x) => `@${x.u} ${x.tipo}${x.slides ? `(${x.slides})` : ""} ${x.curtidas}♥ ${x.comentarios}💬 ${x.razao.toFixed(1)}× | ${gancho(x.legenda)}`).join("\n"));
