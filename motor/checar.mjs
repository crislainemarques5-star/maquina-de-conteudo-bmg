/**
 * Confere o ambiente da Máquina de Conteúdo BMG e conserta o que der sozinho. Rode na instalação e sempre que algo
 * falhar: node motor/checar.mjs
 * ✓/✗ para: Node, dependências, ffmpeg com H.264, Chrome, Python + RDKit (moléculas novas), músicas, marca, fotos,
 * plano, Chrome do estúdio (ChatGPT e Claude logados), Chrome do radar e a tarefa do radar.
 */
import { existsSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { RAIZ, ffmpegPath } from "./comum.mjs";

const require = createRequire(import.meta.url);
const linhas = [];
const marca = (ok, txt, dica = "") => { linhas.push(`${ok === null ? "•" : ok ? "✓" : "✗"} ${txt}${ok === false && dica ? `\n    → ${dica}` : ""}`); return ok; };

const [maj] = process.versions.node.split(".").map(Number);
marca(maj >= 18, `Node.js ${process.versions.node}`, "instale o Node.js LTS em nodejs.org e reabra o Claude Code");

let deps = true;
for (const d of ["playwright-core", "ffmpeg-static"]) { try { require.resolve(d); } catch { deps = false; } }
marca(deps, "dependências (playwright-core, ffmpeg-static)", "rode: npm install");

// ffmpeg: o download do ffmpeg-static às vezes vem cortado (o Windows recusa o .exe): baixa de novo
let ff = ffmpegPath(), h264 = false;
const testa = () => { try { h264 = /libx264/.test(execFileSync(ff, ["-hide_banner", "-encoders"], { encoding: "utf8" })); } catch { h264 = false; } };
if (ff) testa();
if (deps && !h264) {
  try {
    const bin = require("ffmpeg-static");
    rmSync(bin, { force: true });
    execFileSync(process.execPath, [join(RAIZ, "node_modules", "ffmpeg-static", "install.js")], { stdio: "ignore", cwd: join(RAIZ, "node_modules", "ffmpeg-static") });
    ff = ffmpegPath(); testa();
  } catch {}
}
marca(h264, "ffmpeg com H.264", "rode: npm install (ou instale o ffmpeg e defina FFMPEG)");

const chrome = [`${process.env.PROGRAMFILES}\\Google\\Chrome\\Application\\chrome.exe`, `${process.env["PROGRAMFILES(X86)"]}\\Google\\Chrome\\Application\\chrome.exe`,
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`, "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].find((x) => x && existsSync(x));
marca(!!chrome, "Google Chrome", "instale o Google Chrome (google.com/chrome)");

const py = ["python", "py", "python3"].find((p) => spawnSync(p, ["-c", "import rdkit"], { stdio: "ignore" }).status === 0);
marca(py ? true : null, py ? "Python + RDKit (fórmulas estruturais novas)" : "Python + RDKit ausente: as 25 moléculas prontas funcionam; para moléculas novas: instale Python 3 (python.org) e rode pip install rdkit");

const n = (p, re) => (existsSync(join(RAIZ, p)) ? readdirSync(join(RAIZ, p)).filter((f) => re.test(f)).length : 0);
const mus = n("musicas", /\.mp3$/);
marca(mus >= 20, `músicas: ${mus}`, "rode: node motor/instalar-musicas.mjs");
marca(n("marca/logo", /\.png$/) >= 6, `logos recortados: ${n("marca/logo", /\.png$/)}`, "a pasta marca/logo veio incompleta: rode git pull");
marca(n("marca/moleculas", /\.svg$/) >= 20, `fórmulas estruturais: ${n("marca/moleculas", /\.svg$/)}`);
marca(true, `fotos geradas: ${n("fotos", /\.png$/)}`);
try {
  const { POSTS } = await import(pathToFileURL(join(RAIZ, "conteudo", "plano.mjs")).href);
  marca(true, `plano: ${POSTS.filter((p) => p.formato === "carrossel").length} carrosséis e ${POSTS.filter((p) => p.formato === "microreel").length} microreels`);
} catch (e) { marca(false, "conteudo/plano.mjs não abre", e.message.split("\n")[0]); }

async function chromeEm(porta) { try { return (await (await fetch(`http://127.0.0.1:${porta}/json/list`)).json()).filter((t) => t.type === "page"); } catch { return null; } }
const est = await chromeEm(9344);
if (!est) marca(null, "Chrome do estúdio fechado (abre com: node motor/navegador.mjs abrir)");
else {
  marca(true, `Chrome do estúdio aberto (${est.length} aba(s))`);
  marca(est.some((t) => /chatgpt\.com/.test(t.url)) ? null : null, `abas: ${[...new Set(est.map((t) => new URL(t.url).hostname))].join(", ")}`);
}
const rad = await chromeEm(9355);
marca(null, rad ? "Chrome do radar aberto" : "Chrome do radar fechado (login: node motor/radar.mjs --login)");
if (existsSync(join(RAIZ, "radar", "rotacao.json"))) {
  const r = JSON.parse((await import("node:fs")).readFileSync(join(RAIZ, "radar", "rotacao.json"), "utf8"));
  marca(null, `radar: última coleta ${r.coletas?.at(-1)?.dia ?? "nenhuma"}`);
}
if (process.platform === "win32") {
  const t = spawnSync("powershell", ["-NoProfile", "-Command", "Get-ScheduledTask -TaskName 'Maquina BMG - Radar' -ErrorAction SilentlyContinue | Select-Object -ExpandProperty State"], { encoding: "utf8" });
  marca(!!t.stdout?.trim(), `radar agendado 3× por semana${t.stdout?.trim() ? ` (${t.stdout.trim()})` : ""}`, "rode: node motor/agendar-radar.mjs");
}
console.log(linhas.join("\n"));
