/**
 * Radar rotativo de farmácias magistrais (Bahia, Nordeste, Brasil e internacional). Cada coleta pega a próxima fatia de
 * cada grupo de radar/perfis.json (cursor em radar/rotacao.json), para os modelos virem de lugares variados e nenhum
 * post virar cópia de um mesmo perfil. Depois analisa a coleta e atualiza radar/MODELOS.md (os formatos validados por
 * alcance, engajamento e intenção de compra que a máquina oferece em cada pedido de post).
 *
 *   node motor/radar.mjs                coleta a próxima fatia + análise + modelos (agendado 3× por semana)
 *   node motor/radar.mjs --se-velho     só roda se a última coleta tem 2 dias ou mais (use antes de criar um post)
 *   node motor/radar.mjs --status       última coleta e próxima fatia, sem coletar
 *   node motor/radar.mjs --modelos      só refaz radar/MODELOS.md com o que já foi coletado
 *   node motor/radar.mjs --login        abre o Chrome do radar no Instagram para o login (uma vez)
 *
 * Chrome do radar: porta 9355, perfil .chrome-radar/ (Instagram pessoal de quem opera, logado uma vez; só leitura).
 */
import { existsSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { RAIZ, lerJson } from "./comum.mjs";

const args = process.argv.slice(2);
const PERFIS = join(RAIZ, "radar", "perfis.json");
const ROT = join(RAIZ, "radar", "rotacao.json");
const cfg = lerJson(PERFIS);
const rot = existsSync(ROT) ? lerJson(ROT) : { cursor: {}, coletas: [], inativos: [] };
rot.inativos ??= [];
const hoje = new Date().toLocaleDateString("sv-SE", { timeZone: "America/Bahia" });
const node = (script, extra = [], env = {}) => spawnSync(process.execPath, [join(RAIZ, "motor", script), ...extra], { cwd: RAIZ, stdio: "inherit", env: { ...process.env, ...env } });

// próxima fatia de cada grupo, pulando os perfis que não existem mais
function proximaFatia() {
  const fatia = [], novoCursor = {};
  for (const [grupo, lista] of Object.entries(cfg.grupos)) {
    const ativos = lista.filter((p) => !rot.inativos.includes(p.h));
    const n = Math.min(cfg.porColeta?.[grupo] ?? 5, ativos.length);
    const c = (rot.cursor[grupo] ?? 0) % Math.max(1, ativos.length);
    for (let k = 0; k < n; k++) fatia.push({ ...ativos[(c + k) % ativos.length], grupo });
    novoCursor[grupo] = (c + n) % Math.max(1, ativos.length);
  }
  for (const h of cfg.sempre ?? []) if (!fatia.some((p) => p.h === h)) fatia.unshift({ h, grupo: "nossa" });
  return { fatia, novoCursor };
}

const ultima = rot.coletas.at(-1)?.dia ?? null;
const dias = ultima ? Math.round((Date.parse(hoje) - Date.parse(ultima)) / 864e5) : Infinity;

if (args.includes("--status")) {
  const { fatia } = proximaFatia();
  console.log(`última coleta: ${ultima ?? "nenhuma"}${ultima ? ` (há ${dias} dia(s))` : ""} · ${rot.coletas.length} coleta(s) · ${rot.inativos.length} perfil(is) fora do rodízio`);
  console.log(`próxima fatia (${fatia.length}): ${fatia.map((p) => `@${p.h} [${p.grupo}]`).join(", ")}`);
  process.exit(0);
}
if (args.includes("--modelos")) { node("radar-modelos.mjs"); process.exit(0); }
// abre o Chrome do radar no Instagram para o login (uma vez só; a sessão fica salva em .chrome-radar/)
if (args.includes("--login")) { node("navegador.mjs", ["abrir", "https://www.instagram.com/"], { CDP_PORTA: process.env.CDP_PORTA_RADAR ?? "9355", CHROME_PERFIL: ".chrome-radar" }); process.exit(0); }
if (args.includes("--se-velho") && dias < 2) { console.log(`radar em dia (última coleta ${ultima}); seguindo com radar/MODELOS.md`); process.exit(0); }

const { fatia, novoCursor } = proximaFatia();
console.log(`radar ${hoje}: ${fatia.length} perfis (${Object.keys(cfg.grupos).map((g) => `${fatia.filter((p) => p.grupo === g).length} ${g}`).join(", ")})`);
const r = node("radar-ig.mjs", [...fatia.map((p) => p.h), `--dia=${hoje}`, "--pausa=20", "--compra=2"], { CDP_PORTA: process.env.CDP_PORTA_RADAR ?? "9355", CHROME_PERFIL: ".chrome-radar" });
if (r.status !== 0) { console.error("a coleta parou no meio; o que foi lido está em radar/dados/" + hoje); }

// perfis que não existem (ou sumiram) saem do rodízio
const pasta = join(RAIZ, "radar", "dados", hoje);
const lidos = existsSync(pasta) ? readdirSync(pasta).filter((f) => f.endsWith(".json")) : [];
for (const f of lidos) {
  const d = JSON.parse(readFileSync(join(pasta, f), "utf8"));
  if (d.existe === false || (!d.seguidores && !(d.ultimos ?? []).length)) {
    if (!rot.inativos.includes(d.usuario)) { rot.inativos.push(d.usuario); console.log(`  @${d.usuario} não encontrado: sai do rodízio`); }
  }
}
rot.cursor = { ...rot.cursor, ...novoCursor };
rot.coletas.push({ dia: hoje, perfis: fatia.map((p) => p.h), lidos: lidos.length });
rot.coletas = rot.coletas.slice(-60);
writeFileSync(ROT, JSON.stringify(rot, null, 2));

node("radar-analise.mjs", [hoje]);
node("radar-modelos.mjs");
