/**
 * ChatGPT pelo Chrome do estúdio (logado na conta dele). Três usos:
 *
 *   node motor/chatgpt.mjs fotos [<nome>…] [--par=2]
 *        gera as fotos pedidas em conteudo/fotos/<nome>.json: conversa nova, ANEXA as fotos de referência dele,
 *        cola a especificação e salva a imagem em fotos/<nome>.png (ou no "saida" do pedido). Sem nome: todas as que faltam.
 *   node motor/chatgpt.mjs enviar --conversa=<nome> --texto=<arquivo.txt> [--anexos=a.png,b.png] [--salvar=<pasta>]
 *        manda uma mensagem (nova conversa ou continuação), espera a resposta, imprime o texto e salva as imagens geradas.
 *   node motor/chatgpt.mjs ler --conversa=<nome> [--salvar=<pasta>]
 *        relê a última resposta da conversa.
 *
 * Antes: node motor/navegador.mjs abrir (e ele faz login uma vez). Toda foto gerada passa depois pela checagem visual
 * (referencias/fotos-dele.md) antes de ser aprovada em fotos/aprovadas.json.
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname, resolve } from "node:path";
import { P, RAIZ, lerJson, argumentos, garantir, ffmpegPath } from "./comum.mjs";
import { abrirChrome, abas, novaAba, ativar, fechar, ligar, pausa } from "./navegador.mjs";

const REG = join(garantir(join(RAIZ, ".estudio")), "chatgpt.json");
const reg = existsSync(REG) ? lerJson(REG) : {};
const salvaReg = () => writeFileSync(REG, JSON.stringify(reg, null, 2));

const ESTADO = () => {
  const ims = [...document.querySelectorAll("img")].filter((i) => i.naturalWidth >= 700 && i.naturalHeight >= 700 && !i.closest('[data-message-author-role="user"]'));
  const gerando = !!document.querySelector('[data-testid="stop-button"], button[aria-label*="Parar"], button[aria-label*="Stop"]');
  const msgs = [...document.querySelectorAll('[data-message-author-role="assistant"]')];
  return { imgs: ims.map((i) => ({ src: i.src, w: i.naturalWidth, h: i.naturalHeight })), gerando, n: msgs.length, texto: msgs.length ? msgs.at(-1).innerText : "" };
};
// baixa a imagem como data URL (se o src mudou, pega a última imagem grande da conversa)
const CAPTURA = async (src) => {
  const im = [...document.querySelectorAll("img")].find((i) => i.src === src) ?? [...document.querySelectorAll("img")].filter((i) => i.naturalWidth >= 700 && i.naturalHeight >= 700).at(-1);
  const b = await (await fetch(im.src)).blob();
  return await new Promise((ok) => { const r = new FileReader(); r.onload = () => ok(r.result); r.readAsDataURL(b); });
};
// a aba do ChatGPT às vezes fica congelada (Chrome em segundo plano) e o evaluate não volta: acorda e tenta de novo
async function capturar(s, src) {
  for (let k = 1; ; k++) {
    try {
      await s.send("Page.setWebLifecycleState", { state: "active" }, 10000).catch(() => {});
      const r = await s.send("Runtime.evaluate", { expression: `(${CAPTURA})(${JSON.stringify(src)})`, awaitPromise: true, returnByValue: true }, 60000);
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
      return r.result.value;
    } catch (e) { if (k >= 4) throw e; await pausa(15000); }
  }
}
// PNG de verdade (o ChatGPT às vezes entrega webp/jpeg)
function gravarPng(arq, dataUrl) {
  const [cab, b64] = dataUrl.split(",");
  if (cab.includes("image/png")) return writeFileSync(arq, Buffer.from(b64, "base64"));
  writeFileSync(arq + ".tmp", Buffer.from(b64, "base64"));
  execFileSync(ffmpegPath() ?? "ffmpeg", ["-v", "error", "-y", "-i", arq + ".tmp", arq]);
  rmSync(arq + ".tmp", { force: true });
}

async function abrirConversa(nome) {
  await abrirChrome();
  const url = reg[nome]?.url;
  let t = url ? (await abas()).find((x) => x.url.startsWith(url)) : null;
  if (!t) t = await novaAba(url ?? "https://chatgpt.com/");
  await ativar(t.id);
  const s = await ligar(t.webSocketDebuggerUrl);
  // a aba se comporta como se estivesse em primeiro plano, mesmo com a janela coberta ou a tela bloqueada
  await s.send("Page.setWebLifecycleState", { state: "active" }, 10000).catch(() => {});
  await s.send("Emulation.setFocusEmulationEnabled", { enabled: true }, 10000).catch(() => {});
  await s.esperar(() => !!document.querySelector("#prompt-textarea, .ProseMirror"), { tempo: 90000 })
    .catch(() => { throw new Error("o ChatGPT não abriu logado — rode node motor/navegador.mjs abrir e faça login"); });
  await pausa(2000);
  return { t, s };
}

async function mandar(t, s, texto, anexos = []) {
  await ativar(t.id);
  if (anexos.length) {
    await s.anexar(anexos.map((a) => resolve(RAIZ, a)));
    // espera as miniaturas dos anexos terminarem de subir
    await pausa(3000);
    await s.esperar(() => !document.querySelector('[role="progressbar"], [aria-label*="Carregando"], [aria-label*="Uploading"]'), { tempo: 120000, passo: 1500 }).catch(() => {});
    await pausa(1500);
  }
  await s.ev(() => { const e = document.querySelector("#prompt-textarea, .ProseMirror"); e.focus(); return true; });
  await s.digitar(texto);
  await pausa(900);
  const antes = await s.ev(() => location.href);
  await s.tecla("Enter");
  await pausa(2500);
  const enviou = await s.ev(() => !!document.querySelector('[data-testid="stop-button"], button[aria-label*="Parar"], button[aria-label*="Stop"]') || document.querySelectorAll('[data-message-author-role="user"]').length > 0);
  if (!enviou && (await s.ev(() => location.href)) === antes) await s.clicar(() => document.querySelector('[data-testid="send-button"], #composer-submit-button'));
}

// espera a resposta terminar (texto estável e sem o botão de parar); devolve o estado final
async function esperarResposta(s, { querImagem = false, limite = 12 * 60e3 } = {}) {
  const t0 = Date.now();
  let ult = null, estavel = 0;
  while (Date.now() - t0 < limite) {
    await pausa(4000);
    const st = await s.ev(ESTADO).catch(() => null);
    if (!st || st.gerando) { estavel = 0; continue; }
    const chave = `${st.n}|${st.texto.length}|${st.imgs.map((i) => i.src).join()}`;
    estavel = ult === chave ? estavel + 1 : 0;
    ult = chave;
    if (estavel >= 2 && (!querImagem || st.imgs.length || estavel >= 8)) return st;
  }
  throw new Error("tempo esgotado esperando a resposta do ChatGPT");
}

async function salvarImagens(s, st, pasta, prefixo) {
  const salvas = [];
  for (const [k, im] of st.imgs.entries()) {
    const dataUrl = await capturar(s, im.src);
    const arq = join(garantir(pasta), `${prefixo}${st.imgs.length > 1 ? `-${k + 1}` : ""}.png`);
    gravarPng(arq, dataUrl);
    salvas.push(`${arq.replace(RAIZ, "").replace(/\\/g, "/").replace(/^\//, "")} (${im.w}x${im.h})`);
  }
  return salvas;
}

// ---- fotos: texto que acompanha os anexos ----
function textoFoto(nome, ped) {
  const ident = existsSync(join(P.eu, "identidade.json")) ? lerJson(join(P.eu, "identidade.json")) : null;
  const refs = ped.referencias ?? [];
  return [
    `Gere UMA fotografia realista a partir das ${refs.length} fotos de referência anexadas, todas da mesma pessoa (a primeira é a principal do rosto).`,
    "PRESERVE 100% A IDENTIDADE: mesmo rosto, mesmos traços, mesmo tom e textura de pele, mesmo cabelo, barba e linha do cabelo, mesmas proporções e idade aparente. Não embeleze, não rejuvenesça, não troque traços.",
    "Mãos com 5 dedos naturais, olhos simétricos e alinhados, dentes naturais, nada distorcido ou derretido. Sem texto, sem logos, sem marca d'água.",
    ped.recorte ? "FUNDO TRANSPARENTE (PNG com canal alfa), recorte limpo em volta do cabelo e dos ombros, sem sombra no chão." : "",
    `Formato: ${ped.formato ?? "retrato vertical 4:5"}.`,
    ident ? `Descrição da pessoa (para manter a identidade): ${JSON.stringify(ident.pessoa ?? ident)}` : "",
    "Especificação do ensaio:",
    JSON.stringify(ped.prompt ?? ped, null, 2),
  ].filter(Boolean).join("\n\n");
}

async function gerarFoto(nome) {
  const ped = lerJson(join(P.pedidosFoto, `${nome}.json`));
  const refs = (ped.referencias ?? []).filter((r) => existsSync(resolve(RAIZ, r)));
  if (!refs.length) throw new Error(`${nome}: nenhuma foto de referência encontrada (${(ped.referencias ?? []).join(", ") || "campo referencias vazio"})`);
  const saida = ped.saida ? join(RAIZ, ped.saida) : join(P.fotos, `${nome}.png`);
  const conv = `foto-${nome}`;
  delete reg[conv];
  const { t, s } = await abrirConversa(conv);
  try {
    await mandar(t, s, textoFoto(nome, ped), refs.slice(0, 10));
    const url = await s.esperar(() => (/\/c\//.test(location.href) ? location.href : null), { tempo: 60000 });
    reg[conv] = { url, inicio: new Date().toISOString() }; salvaReg();
    const st = await esperarResposta(s, { querImagem: true });
    if (!st.imgs.length) throw new Error(`sem imagem; resposta: ${st.texto.slice(0, 300)}`);
    const im = st.imgs.at(-1);
    const dataUrl = await capturar(s, im.src);
    mkdirSync(dirname(saida), { recursive: true });
    gravarPng(saida, dataUrl);
    reg[conv] = { ...reg[conv], fim: new Date().toISOString(), arquivo: saida.replace(RAIZ, ""), tamanho: `${im.w}x${im.h}` }; salvaReg();
    console.log(`ok ${nome} → ${saida.replace(RAIZ, "").replace(/\\/g, "/")} (${im.w}x${im.h}) — falta a checagem visual antes de aprovar`);
    await fechar(t.id);
  } finally { s.fechar(); }
}

const [cmd] = process.argv.slice(2);
const { ids, flags } = argumentos(process.argv.slice(3));
if (cmd === "fotos") {
  const todos = existsSync(P.pedidosFoto) ? readdirSync(P.pedidosFoto).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5)) : [];
  const falta = (n) => { const p = lerJson(join(P.pedidosFoto, `${n}.json`)); const o = p.saida ? join(RAIZ, p.saida) : join(P.fotos, `${n}.png`); return !existsSync(o); };
  const fila = ids.length ? ids : todos.filter(falta);
  if (!fila.length) { console.log("nenhuma foto pendente"); process.exit(0); }
  const par = Math.max(1, Number(flags.par ?? 2));
  const erros = [];
  await Promise.all(Array.from({ length: Math.min(par, fila.length) }, async () => {
    while (fila.length) {
      const n = fila.shift();
      try { await gerarFoto(n); } catch (e) { erros.push(`${n}: ${e.message}`); console.log(`ERRO ${n}: ${e.message}`); }
    }
  }));
  if (erros.length) process.exitCode = 1;
} else if (cmd === "enviar" || cmd === "ler") {
  const nome = flags.conversa;
  if (!nome) { console.error("faltou --conversa=<nome>"); process.exit(1); }
  const { t, s } = await abrirConversa(nome);
  try {
    if (cmd === "enviar") {
      const texto = flags.texto && existsSync(resolve(RAIZ, flags.texto)) ? readFileSync(resolve(RAIZ, flags.texto), "utf8") : String(flags.texto ?? "");
      await mandar(t, s, texto, flags.anexos ? String(flags.anexos).split(",") : []);
      const url = await s.esperar(() => (/\/c\//.test(location.href) ? location.href : null), { tempo: 60000 }).catch(() => null);
      if (url) { reg[nome] = { ...(reg[nome] ?? {}), url }; salvaReg(); }
    }
    const st = await esperarResposta(s, { querImagem: !!flags.imagem });
    console.log(st.texto);
    if (flags.salvar && st.imgs.length) console.log(`\nimagens salvas:\n  ${(await salvarImagens(s, st, resolve(RAIZ, flags.salvar), flags.prefixo ?? nome)).join("\n  ")}`);
  } finally { s.fechar(); }
} else {
  console.log("uso: node motor/chatgpt.mjs fotos|enviar|ler …");
}
process.exit(process.exitCode ?? 0);
