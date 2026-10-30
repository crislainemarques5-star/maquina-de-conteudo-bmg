// Peças comuns do motor: pastas, perfil, posts, navegador, ffmpeg e utilidades de texto.
import { existsSync, readFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";

export const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const P = {
  perfil: join(RAIZ, "perfil", "perfil.json"),
  perfilExemplo: join(RAIZ, "perfil", "perfil.exemplo.json"),
  plano: join(RAIZ, "conteudo", "plano.json"),
  posts: join(RAIZ, "conteudo", "posts"),
  pedidosFoto: join(RAIZ, "conteudo", "fotos"),
  design: join(RAIZ, "conteudo", "design"),
  fotos: join(RAIZ, "fotos"),
  artes: join(RAIZ, "artes"),
  eu: join(RAIZ, "eu"),
  saida: join(RAIZ, "saida"),
  entrega: join(RAIZ, "entrega"),
  radar: join(RAIZ, "radar"),
};

const require = createRequire(import.meta.url);

export const lerJson = (arq) => JSON.parse(readFileSync(arq, "utf8").replace(/^﻿/, ""));

export function perfil() {
  if (existsSync(P.perfil)) return lerJson(P.perfil);
  console.warn("! perfil/perfil.json ainda não existe — usando o perfil de exemplo");
  return lerJson(P.perfilExemplo);
}

// Todos os posts de conteudo/posts/*.json, em ordem de data e hora.
export function posts({ incluirExemplos = false } = {}) {
  const dirs = [P.posts, ...(incluirExemplos ? [join(RAIZ, "conteudo", "exemplos")] : [])];
  const lista = [];
  for (const d of dirs) {
    if (!existsSync(d)) continue;
    for (const f of readdirSync(d).filter((f) => f.endsWith(".json")).sort()) {
      try {
        const p = lerJson(join(d, f));
        p.id ??= f.replace(/\.json$/, "");
        lista.push(p);
      } catch (e) {
        throw new Error(`JSON inválido em ${join(d, f)}: ${e.message}`);
      }
    }
  }
  return lista.sort((a, b) => `${a.data ?? ""}${a.hora ?? ""}`.localeCompare(`${b.data ?? ""}${b.hora ?? ""}`));
}

export const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// **negrito**, ==faixa de destaque==, ~~riscado~~, `mono`, \n
export const md = (s) => esc(s)
  .replace(/==([\s\S]+?)==/g, "<mark>$1</mark>")
  .replace(/\*\*([\s\S]+?)\*\*/g, "<b>$1</b>")
  .replace(/~~([\s\S]+?)~~/g, "<s>$1</s>")
  .replace(/`([^`]+?)`/g, '<code>$1</code>')
  .replace(/\n/g, "<br>");
export const semMd = (s) => String(s ?? "").replace(/==|\*\*|~~|`/g, "");
export const dois = (n) => String(n).padStart(2, "0");

const MIME = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".mp4": "video/mp4" };
export const dataUri = (arq) => `data:${MIME[extname(arq).toLowerCase()] ?? "application/octet-stream"};base64,${readFileSync(arq).toString("base64")}`;

// Resolve a foto de um slide. "a" → fotos/<id>-a.(png|jpg|webp); "banco/pose-03" → eu/banco/pose-03.*;
// qualquer coisa com "/" é caminho a partir da raiz do projeto. Devolve o caminho ou null.
export function acharFoto(post, ref) {
  if (!ref) return null;
  const tentativas = [];
  const base = String(ref);
  if (base.startsWith("banco/")) tentativas.push(join(P.eu, base));
  else if (base.includes("/")) tentativas.push(join(RAIZ, base));
  else tentativas.push(join(P.fotos, `${post.id}-${base}`), join(P.fotos, base));
  for (const t of tentativas) {
    if (extname(t) && existsSync(t)) return t;
    for (const ext of [".png", ".webp", ".jpg", ".jpeg"]) if (existsSync(t + ext)) return t + ext;
  }
  return null;
}

// Logo sem fundo (a logo oficial dele — o motor nunca redesenha). perfil.logo: "marca/logo.png" ou { "claro": "...", "escuro": "..." }.
// Em fundo escuro, sem versão própria, a original é recolorida em branco (branca: true) — só a cor muda, o desenho não.
export function logoDe(perfil, modo = "escuro") {
  const l = perfil.logo;
  if (!l) return null;
  const existe = (c) => c && existsSync(join(RAIZ, c)) ? join(RAIZ, c) : null;
  if (typeof l === "string") { const f = existe(l); return f ? { path: f, branca: modo === "escuro" && perfil.logo_escuro !== "original" } : null; }
  const propria = existe(l[modo]);
  if (propria) return { path: propria, branca: false };
  const outra = existe(l.claro) ?? existe(l.escuro);
  return outra ? { path: outra, branca: modo === "escuro" && outra === existe(l.claro) && perfil.logo_escuro !== "original" } : null;
}
export const acharLogo = (perfil, modo) => logoDe(perfil, modo)?.path ?? null;

// Arte exportada do Claude Design: artes/<id>-<n>.(mp4|png|jpg) ou caminho direto.
export function acharArte(post, ref) {
  const base = String(ref).includes("/") ? join(RAIZ, String(ref)) : join(P.artes, String(ref).startsWith(post.id) ? String(ref) : `${post.id}-${ref}`);
  if (extname(base) && existsSync(base)) return base;
  for (const ext of [".mp4", ".png", ".jpg", ".jpeg", ".webp"]) if (existsSync(base + ext)) return base + ext;
  return null;
}

// ffmpeg: variável FFMPEG > pacote ffmpeg-static > ffmpeg do sistema.
export function ffmpegPath() {
  if (process.env.FFMPEG && existsSync(process.env.FFMPEG)) return process.env.FFMPEG;
  try {
    const p = require("ffmpeg-static");
    if (p && existsSync(p)) return p;
  } catch {}
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
    return "ffmpeg";
  } catch {}
  return null;
}
export function ff(args, opts = {}) {
  const bin = ffmpegPath();
  if (!bin) throw new Error("ffmpeg não encontrado. Rode `npm install` (instala o ffmpeg-static) ou instale o ffmpeg.");
  return execFileSync(bin, ["-v", "error", "-y", ...args], { maxBuffer: 1 << 26, ...opts });
}
// Duração de um vídeo em segundos (lida do próprio ffmpeg, sem ffprobe).
export function duracao(arq) {
  const bin = ffmpegPath();
  try {
    execFileSync(bin, ["-i", arq], { stdio: "pipe" });
  } catch (e) {
    const m = String(e.stderr ?? "").match(/Duration:\s*(\d+):(\d+):([\d.]+)/);
    if (m) return +m[1] * 3600 + +m[2] * 60 + +m[3];
  }
  return 0;
}

// Navegador: Chrome instalado > Edge > CHROME_EXE > Chromium baixado pelo playwright-core.
export async function abrirNavegador() {
  let chromium;
  try {
    ({ chromium } = require("playwright-core"));
  } catch {
    throw new Error("playwright-core não instalado. Rode `npm install` na pasta do projeto.");
  }
  const args = ["--disable-gpu", "--force-color-profile=srgb", "--font-render-hinting=none", "--hide-scrollbars"];
  const opcoes = [];
  if (process.env.CHROME_EXE) opcoes.push({ executablePath: process.env.CHROME_EXE });
  opcoes.push({ channel: "chrome" }, { channel: "msedge" }, {});
  let erro;
  for (const o of opcoes) {
    try {
      return await chromium.launch({ ...o, args });
    } catch (e) {
      erro = e;
    }
  }
  throw new Error("Nenhum navegador encontrado (Chrome, Edge ou Chromium). Instale o Google Chrome ou rode `npx playwright-core install chromium`.\n" + (erro?.message ?? ""));
}

export const garantir = (d) => (mkdirSync(d, { recursive: true }), d);

export function argumentos(argv = process.argv.slice(2)) {
  const ids = [], flags = {};
  for (const a of argv) {
    if (a.startsWith("--")) {
      const [k, v] = a.slice(2).split("=");
      flags[k] = v ?? true;
    } else ids.push(a);
  }
  return { ids, flags };
}

export const DIAS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
export const diaSemana = (d) => DIAS[new Date(`${d}T12:00:00Z`).getUTCDay()];
