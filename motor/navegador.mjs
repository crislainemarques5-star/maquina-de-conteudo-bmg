/**
 * Chrome do estúdio + cliente mínimo do protocolo de depuração (CDP), aba por aba.
 * O Chrome roda com um perfil só do projeto (.chrome-biomagistral/, fora do git): ele entra UMA vez no ChatGPT e no
 * Claude (claude.ai/design) e a sessão fica salva. Usamos CDP direto em vez do connectOverCDP do Playwright, que
 * trava ao se ligar a todas as abas e workers do ChatGPT (aprendido no projeto de outro projeto).
 *
 *   node motor/navegador.mjs abrir     abre o Chrome do estúdio com ChatGPT e Claude Design (para ele fazer login)
 *   node motor/navegador.mjs status    diz se o Chrome está aberto e se ChatGPT e Claude estão logados
 */
import { spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { RAIZ } from "./comum.mjs";

export const PORTA = Number(process.env.CDP_PORTA ?? 9344);
const BASE = `http://127.0.0.1:${PORTA}`;
export const pausa = (ms) => new Promise((r) => setTimeout(r, ms));

function chromeExe() {
  if (process.env.CHROME_EXE && existsSync(process.env.CHROME_EXE)) return process.env.CHROME_EXE;
  const c = process.platform === "win32"
    ? [`${process.env.PROGRAMFILES}\\Google\\Chrome\\Application\\chrome.exe`, `${process.env["PROGRAMFILES(X86)"]}\\Google\\Chrome\\Application\\chrome.exe`,
       `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`, `${process.env["PROGRAMFILES(X86)"]}\\Microsoft\\Edge\\Application\\msedge.exe`]
    : process.platform === "darwin"
      ? ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"]
      : ["/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium", "/usr/bin/chromium-browser"];
  return c.find((x) => x && existsSync(x)) ?? null;
}

export async function aberto() {
  try { return !!(await (await fetch(`${BASE}/json/version`)).json()); } catch { return false; }
}

// Abre (ou reaproveita) o Chrome do estúdio. Flags anticongelamento: sem elas o Chrome pausa abas de fundo.
export async function abrirChrome(urls = ["https://chatgpt.com/", "https://claude.ai/design"]) {
  if (await aberto()) return true;
  const exe = chromeExe();
  if (!exe) throw new Error("Chrome não encontrado. Instale o Google Chrome (google.com/chrome).");
  const perfil = resolve(RAIZ, process.env.CHROME_PERFIL ?? ".chrome-biomagistral");
  mkdirSync(perfil, { recursive: true });
  const p = spawn(exe, [`--remote-debugging-port=${PORTA}`, `--user-data-dir=${perfil}`, "--no-first-run", "--no-default-browser-check",
    "--disable-background-timer-throttling", "--disable-backgrounding-occluded-windows", "--disable-renderer-backgrounding",
    "--disable-features=CalculateNativeWinOcclusion,IntensiveWakeUpThrottling,HighEfficiencyModeAvailable,BackForwardCache", ...urls], { detached: true, stdio: "ignore" });
  p.unref();
  for (let k = 0; k < 40; k++) { await pausa(500); if (await aberto()) return true; }
  throw new Error("o Chrome abriu, mas a porta de automação não respondeu");
}

export async function abas() { return (await (await fetch(`${BASE}/json/list`)).json()).filter((t) => t.type === "page"); }
export async function novaAba(url = "about:blank") { return await (await fetch(`${BASE}/json/new?${encodeURIComponent(url)}`, { method: "PUT" })).json(); }
export async function ativar(id) { await fetch(`${BASE}/json/activate/${id}`); }
export async function fechar(id) { await fetch(`${BASE}/json/close/${id}`); }
export async function navegador() { const v = await (await fetch(`${BASE}/json/version`)).json(); return await ligar(v.webSocketDebuggerUrl); }

export async function ligar(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((ok, erro) => { ws.onopen = ok; ws.onerror = () => erro(new Error(`não conectou: ${wsUrl}`)); });
  let n = 0;
  const pend = new Map(), ouvintes = [];
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pend.has(m.id)) { const { ok, erro } = pend.get(m.id); pend.delete(m.id); m.error ? erro(new Error(`${m.error.message} ${m.error.data ?? ""}`)) : ok(m.result); }
    else if (m.method) for (const f of ouvintes) f(m);
  };
  const send = (method, params = {}, timeout = 120000) => new Promise((ok, erro) => {
    const id = ++n;
    const t = setTimeout(() => { pend.delete(id); erro(new Error(`tempo esgotado: ${method}`)); }, timeout);
    pend.set(id, { ok: (r) => { clearTimeout(t); ok(r); }, erro: (x) => { clearTimeout(t); erro(x); } });
    ws.send(JSON.stringify({ id, method, params }));
  });
  const s = {
    send,
    on: (f) => ouvintes.push(f),
    fechar: () => ws.close(),
    async ev(fn, ...args) {
      const r = await send("Runtime.evaluate", { expression: `(${fn})(...${JSON.stringify(args)})`, awaitPromise: true, returnByValue: true, userGesture: true });
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
      return r.result.value;
    },
    async esperar(fn, { tempo = 60000, passo = 1000, args = [] } = {}) {
      const t0 = Date.now();
      const teste = `(...a) => { const v = (${fn})(...a); return v instanceof Node ? true : v; }`;
      while (Date.now() - t0 < tempo) {
        const v = await s.ev(teste, ...args).catch(() => null);
        if (v) return v;
        await pausa(passo);
      }
      throw new Error(`esperou ${tempo} ms: ${String(fn).slice(0, 80)}`);
    },
    async clicar(fnElemento, ...args) {
      const r = await s.ev(`(...a) => { const e = (${fnElemento})(...a); if (!e) return null; e.scrollIntoView({ block: "center" }); const q = e.getBoundingClientRect(); return { x: q.x + q.width / 2, y: q.y + q.height / 2 }; }`, ...args);
      if (!r) throw new Error(`elemento não encontrado: ${String(fnElemento).slice(0, 80)}`);
      for (const type of ["mouseMoved", "mousePressed", "mouseReleased"]) await send("Input.dispatchMouseEvent", { type, x: r.x, y: r.y, button: "left", clickCount: 1 });
      return r;
    },
    async digitar(texto) { await send("Input.insertText", { text: texto }); },
    async tecla(key, code = key, keyCode = 13) {
      await send("Input.dispatchKeyEvent", { type: "keyDown", key, code, windowsVirtualKeyCode: keyCode, text: key === "Enter" ? "\r" : undefined });
      await send("Input.dispatchKeyEvent", { type: "keyUp", key, code, windowsVirtualKeyCode: keyCode });
    },
    // anexa arquivos ao primeiro <input type=file> que aceite imagem (sem abrir a janela do sistema)
    async anexar(caminhos) {
      const { root } = await send("DOM.getDocument", { depth: -1, pierce: true });
      const { nodeIds } = await send("DOM.querySelectorAll", { nodeId: root.nodeId, selector: 'input[type="file"]' });
      if (!nodeIds.length) throw new Error("campo de anexo não encontrado");
      let alvo = nodeIds[0];
      for (const id of nodeIds) {
        const { attributes = [] } = await send("DOM.getAttributes", { nodeId: id });
        const accept = attributes[attributes.indexOf("accept") + 1] ?? "";
        if (attributes.includes("accept") && /image/.test(accept)) { alvo = id; break; }
      }
      await send("DOM.setFileInputFiles", { nodeId: alvo, files: caminhos });
    },
  };
  return s;
}

// ChatGPT e Claude estão logados? (abre as abas se precisar)
export async function status() {
  const ok = await aberto();
  if (!ok) return { chrome: false };
  const out = { chrome: true };
  for (const [nome, url, teste] of [
    ["chatgpt", "https://chatgpt.com/", () => !!document.querySelector("#prompt-textarea, .ProseMirror") && !document.querySelector('[data-testid="login-button"]')],
    ["claude", "https://claude.ai/design", () => !/login|signin/.test(location.pathname) && !!document.querySelector("button")],
  ]) {
    let t = (await abas()).find((x) => x.url.startsWith(url.replace(/\/design$/, "")));
    if (!t) t = await novaAba(url);
    const s = await ligar(t.webSocketDebuggerUrl);
    out[nome] = await s.esperar(teste, { tempo: 20000 }).then(() => true).catch(() => false);
    s.fechar();
  }
  return out;
}

if (import.meta.url === `file:///${process.argv[1]?.replace(/\\/g, "/")}` || process.argv[1]?.endsWith("navegador.mjs")) {
  const cmd = process.argv[2];
  if (cmd === "abrir") {
    const urls = process.argv.slice(3);
    await abrirChrome(urls.length ? urls : undefined);
    console.log(urls.length ? `Chrome aberto (porta ${PORTA}) em ${urls.join(", ")}.` : "Chrome do estúdio aberto. Faça login no ChatGPT e no Claude nas abas que abriram (só na primeira vez) e me avise.");
  } else if (cmd === "status") {
    console.log(JSON.stringify(await status()));
  } else console.log("uso: node motor/navegador.mjs abrir [<url>…]|status");
  process.exit(0);
}
