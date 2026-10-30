/**
 * Claude Design pelo Chrome do estúdio (logado na conta Claude dele) — microreels semanais e infográficos médicos.
 * Adaptado da automação validada no projeto de outro projeto.
 *
 *   node motor/claude-design.mjs criar    <nome> [<nome>…]    projeto novo: design system do perfil + modelo Animation + conteudo/design/<nome>.txt
 *   node motor/claude-design.mjs ajustar  <nome> <arquivo.txt> manda um ajuste no chat do projeto
 *   node motor/claude-design.mjs ver      <nome> <saida.jpg>   print do projeto + fim da conversa (para revisar)
 *   node motor/claude-design.mjs exportar <nome>               Share › MP4 of this animation › Original size › Export → artes/<nome>.mp4
 *   node motor/claude-design.mjs quadro   <nome> [segundos]    tira um PNG do MP4 exportado (artes/<nome>.png) para usar como slide parado
 *
 * O design system escolhido é perfil.claude_design_ds (o nome exato que aparece no Claude Design).
 * Links dos projetos em .estudio/claude-design.json. O export renderiza no navegador: a aba fica em primeiro plano até o fim.
 */
import { existsSync, readFileSync, writeFileSync, renameSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { P, RAIZ, perfil, lerJson, garantir, ff } from "./comum.mjs";
import { abrirChrome, abas, novaAba, ativar, ligar, navegador, pausa } from "./navegador.mjs";

const pf = perfil();
const DS = pf.claude_design_ds ?? pf.nome;
const REG = join(garantir(join(RAIZ, ".estudio")), "claude-design.json");
const reg = existsSync(REG) ? lerJson(REG) : {};
const salva = () => writeFileSync(REG, JSON.stringify(reg, null, 2));
garantir(P.artes);

async function abrirProjeto(nome) {
  await abrirChrome();
  const r = reg[nome];
  if (!r?.projeto) throw new Error(`sem projeto do Claude Design registrado para ${nome} (rode criar antes)`);
  let t = (await abas()).find((x) => x.url.includes(`/design/p/${r.projeto}`));
  if (!t) t = await novaAba(`https://claude.ai/design/p/${r.projeto}`);
  await ativar(t.id);
  const s = await ligar(t.webSocketDebuggerUrl);
  await s.esperar(() => document.querySelectorAll(".ProseMirror").length > 0, { tempo: 90000 });
  await pausa(3000);
  return { t, s };
}
const botaoTexto = (re) => `() => [...document.querySelectorAll("button, [role=menuitem], [role=option]")].find((b) => ${re}.test(b.innerText.trim()))`;
async function escrever(s, ultimo, texto) {
  await s.ev((ultimo) => { const eds = document.querySelectorAll(".ProseMirror"); const e = ultimo ? eds[eds.length - 1] : eds[0]; e.focus(); document.execCommand("selectAll", false, null); document.execCommand("delete", false, null); return true; }, ultimo);
  await s.digitar(texto);
  await pausa(800);
}

const [cmd, ...args] = process.argv.slice(2);
if (cmd === "criar") {
  await abrirChrome();
  for (const nome of args) {
    const arq = [join(P.design, `${nome}.txt`), join(P.design, `${nome}.md`)].find(existsSync);
    if (!arq) throw new Error(`falta o prompt conteudo/design/${nome}.txt`);
    const t = await novaAba("https://claude.ai/design");
    await ativar(t.id);
    const s = await ligar(t.webSocketDebuggerUrl);
    await s.esperar(() => [...document.querySelectorAll("button")].some((b) => /Design system/.test(b.innerText)), { tempo: 90000 })
      .catch(() => { throw new Error("o Claude Design não abriu logado — rode node motor/navegador.mjs abrir e faça login no claude.ai"); });
    await pausa(2500);
    const dsTxt = () => [...document.querySelectorAll("button")].find((b) => /Design system/.test(b.innerText))?.innerText.replace(/\s+/g, " ").trim();
    if (!(await s.ev(dsTxt)).includes(DS)) {
      await s.clicar(() => [...document.querySelectorAll("button")].find((b) => /Design system/.test(b.innerText)));
      await pausa(1500);
      await s.clicar((ds) => [...document.querySelectorAll('[data-testid="ds-dropdown-row"]')].find((e) => e.innerText.trim().startsWith(ds)), DS)
        .catch(() => { throw new Error(`o design system "${DS}" não aparece no Claude Design — crie-o antes (referencias/design-system.md) ou ajuste perfil.claude_design_ds`); });
      await pausa(1500);
    }
    const ds = await s.ev(dsTxt);
    if (!ds.includes(DS)) throw new Error(`design system errado: ${ds}`);
    await s.clicar(botaoTexto("/^Animation$/")).catch(() => console.log("aviso: botão Animation não encontrado; seguindo com o modelo padrão"));
    await pausa(1200);
    await escrever(s, false, readFileSync(arq, "utf8"));
    await s.clicar(() => document.querySelector('[data-testid="home-composer-send"]'));
    const url = await s.esperar(() => (/\/design\/p\//.test(location.href) ? location.href : null), { tempo: 120000 });
    reg[nome] = { projeto: url.match(/\/design\/p\/([0-9a-f-]{36})/)?.[1], criado: new Date().toISOString(), ds };
    salva();
    console.log(`ok ${nome} → https://claude.ai/design/p/${reg[nome].projeto}`);
    s.fechar();
  }
} else if (cmd === "ajustar") {
  const [nome, arq] = args;
  const { s } = await abrirProjeto(nome);
  await escrever(s, true, readFileSync(arq, "utf8"));
  try { await s.clicar(() => { const b = document.querySelector('[data-testid="chat-send-button"]'); return b && !b.disabled ? b : null; }); }
  catch { await s.tecla("Enter"); }
  reg[nome] = { ...reg[nome], ajustado: new Date().toISOString() }; salva();
  console.log(`ajuste enviado: ${nome}`);
} else if (cmd === "ver") {
  const [nome, saida] = args;
  const { s } = await abrirProjeto(nome);
  const txt = await s.ev(() => document.body.innerText.slice(-2500));
  const shot = await s.send("Page.captureScreenshot", { format: "jpeg", quality: 75 });
  writeFileSync(saida, Buffer.from(shot.data, "base64"));
  console.log(txt);
} else if (cmd === "exportar") {
  const [nome] = args;
  const { t, s } = await abrirProjeto(nome);
  await s.esperar(() => !!document.querySelector('[data-testid="chat-send-button"]'), { tempo: 25 * 60e3, passo: 5000 });
  await s.tecla("Escape", "Escape", 27);
  await pausa(800);
  const b = await navegador();
  const inicio = Date.now();
  let arquivo = null, pronto = false;
  b.on((m) => {
    if (m.method === "Browser.downloadWillBegin") arquivo = m.params.suggestedFilename;
    if (m.method === "Browser.downloadProgress" && m.params.state === "completed") pronto = true;
  });
  await b.send("Browser.setDownloadBehavior", { behavior: "allow", downloadPath: P.artes, eventsEnabled: true });
  const itemMp4 = () => [...document.querySelectorAll("body *")].find((e) => e.children.length === 0 && /MP4 of this animation/.test(e.textContent));
  for (let k = 0; k < 4; k++) {
    await ativar(t.id);
    await s.clicar(() => [...document.querySelectorAll('[role="dialog"] button')].find((x) => /^(Done|Close|Fechar)$/.test(x.innerText.trim()))).then(() => pausa(800)).catch(() => {});
    await s.clicar(() => document.querySelector('[data-testid="toolbar-share"]') ?? [...document.querySelectorAll("button")].find((x) => /Share/.test(x.innerText)));
    try { await s.esperar(itemMp4, { tempo: 8000, passo: 500 }); break; } catch { await s.tecla("Escape", "Escape", 27); await pausa(4000); }
  }
  await s.clicar(itemMp4);
  await pausa(1500);
  const tamanho = () => [...document.querySelectorAll('[role="dialog"] *')].find((e) => e.children.length === 0 && /Original size/.test(e.textContent));
  // menu novo (out/2026): Share › Export › Video › Download baixa direto; o antigo pedia "Original size" › Export
  const temTamanho = await s.esperar(tamanho, { tempo: 6000, passo: 500 }).then(() => true).catch(() => false);
  if (temTamanho) {
    await s.clicar(tamanho);
    await pausa(800);
    await s.clicar(() => [...document.querySelectorAll('[role="dialog"] button')].find((x) => /^Export$/.test(x.innerText.trim())));
  }
  for (let k = 0; k < 360 && !pronto; k++) { await pausa(2500); if (k % 8 === 0) await ativar(t.id); }
  if (!pronto) throw new Error("o download não terminou");
  await pausa(1500);
  const novo = arquivo && existsSync(join(P.artes, arquivo)) ? arquivo : readdirSync(P.artes).filter((f) => f.endsWith(".mp4") && statSync(join(P.artes, f)).mtimeMs > inicio).pop();
  const destino = join(P.artes, `${nome}.mp4`);
  renameSync(join(P.artes, novo), destino);
  await s.clicar(() => [...document.querySelectorAll('[role="dialog"] button')].find((x) => /^Done$/.test(x.innerText.trim()))).catch(() => s.tecla("Escape", "Escape", 27));
  reg[nome] = { ...reg[nome], exportado: new Date().toISOString() }; salva();
  console.log(`ok artes/${nome}.mp4 — o MP4 do Claude Design sai sem som; confira com node motor/verificar.mjs`);
} else if (cmd === "quadro") {
  const [nome, seg] = args;
  const mp4 = join(P.artes, `${nome}.mp4`);
  if (!existsSync(mp4)) throw new Error(`falta artes/${nome}.mp4`);
  ff([...(seg ? ["-ss", String(seg)] : ["-sseof", "-0.2"]), "-i", mp4, "-frames:v", "1", "-update", "1", join(P.artes, `${nome}.png`)]);
  console.log(`ok artes/${nome}.png`);
} else if (cmd === "ds-criar") {
  // cria o design system da marca na conta Claude logada (uma vez por conta): descrição + notas + logos + exemplos
  const LOGOS = ["logo-dourado-site-limpo.png", "logo-horizontal-branco-suave.png", "logo-horizontal-azul-suave.png", "icone-dourado-site.png", "icone-azul-suave.png", "grafismo-icone-branco.png"]
    .map((f) => join(RAIZ, "marca", "logo", f));
  const EX = join(RAIZ, "design-system", "exemplos");
  const arquivos = [...LOGOS, ...(existsSync(EX) ? readdirSync(EX).filter((f) => /\.(jpg|png)$/.test(f)).map((f) => join(EX, f)) : [])];
  const descricao = readFileSync(join(RAIZ, "design-system", "claude-design-descricao.txt"), "utf8").trim();
  const notas = readFileSync(join(RAIZ, "design-system", "claude-design-notas.txt"), "utf8");
  await abrirChrome();
  const t = await novaAba("https://claude.ai/design");
  await ativar(t.id);
  const s = await ligar(t.webSocketDebuggerUrl);
  await s.esperar(() => [...document.querySelectorAll("button")].some((b) => /Design system/.test(b.innerText)), { tempo: 90000 })
    .catch(() => { throw new Error("o Claude Design não abriu logado — rode node motor/navegador.mjs abrir e faça login no claude.ai"); });
  await pausa(2000);
  if (!(await s.ev(() => !!document.querySelector('[data-testid="create-design-system-button"]')))) {
    await s.clicar(() => [...document.querySelectorAll("button")].find((b) => /Design system/.test(b.innerText)));
    await pausa(1200);
  }
  await s.clicar(() => document.querySelector('[data-testid="create-design-system-button"]'));
  await s.esperar(() => document.querySelectorAll("textarea").length >= 2, { tempo: 30000 });
  for (const [i, txt] of [[0, descricao], [1, notas]]) {
    await s.ev((k) => { const e = document.querySelectorAll("textarea")[k]; e.focus(); e.select(); return true; }, i);
    await s.digitar(txt);
    await pausa(500);
  }
  // os arquivos pelo formulário (se o formulário não aceitar, vão depois pelo chat do projeto)
  try {
    const { root } = await s.send("DOM.getDocument", { depth: -1, pierce: true });
    const { nodeIds } = await s.send("DOM.querySelectorAll", { nodeId: root.nodeId, selector: 'input[type="file"]' });
    if (nodeIds.length) { await s.send("DOM.setFileInputFiles", { nodeId: nodeIds[0], files: arquivos }); await pausa(6000); }
  } catch {}
  await s.clicar(() => [...document.querySelectorAll("button")].find((b) => /^(Generate|Continue to generation|Continue|Gerar)$/i.test(b.innerText.trim())));
  const url = await s.esperar(() => (/\/design\/p\//.test(location.href) ? location.href : null), { tempo: 180000 });
  const projeto = url.match(/\/design\/p\/([0-9a-f-]{36})/)?.[1];
  reg._ds = { projeto, criado: new Date().toISOString() }; salva();
  console.log(`design system em criação: ${url}`);
  // anexa os logos e exemplos no chat do projeto (o caminho que funciona sempre): botão + › Attach file
  await s.esperar(() => !!document.querySelector('[data-testid="chat-send-button"]'), { tempo: 30 * 60e3, passo: 5000 });
  await s.send("Page.enable");
  await s.send("Page.setInterceptFileChooserDialog", { enabled: true });
  let escolha = null;
  s.on((m) => { if (m.method === "Page.fileChooserOpened") escolha = m.params; });
  await s.clicar(() => document.querySelector('[data-testid="composer-import-button"]'));
  for (let k = 0; k < 20 && !escolha; k++) await pausa(250);
  if (!escolha) { await s.clicar(botaoTexto("/attach|upload|file|arquivo/i")).catch(() => {}); for (let k = 0; k < 20 && !escolha; k++) await pausa(250); }
  if (escolha) {
    await s.send("DOM.setFileInputFiles", { files: arquivos, backendNodeId: escolha.backendNodeId });
    await pausa(8000);
    await escrever(s, true, "Seguem os recortes oficiais do logo (dourado, branco e azul, os ícones e o grafismo) e exemplos de peças já aprovadas. Copie os logos para os assets do design system e use SEMPRE estes arquivos, nunca uma versão redesenhada. Use os exemplos como referência de hierarquia, tipografia e fundo de bioquímica. Atualize os componentes e o README.");
    await s.tecla("Enter");
    console.log("logos e exemplos enviados no chat do projeto");
  } else console.log("⚠ não abriu a janela de arquivo: anexe os logos de marca/logo/ à mão no chat do projeto");
  console.log("Quando o Claude Design terminar: node motor/claude-design.mjs ds-publicar");
} else if (cmd === "ds-publicar") {
  // liga a chave "Published" do projeto do design system (só publicado ele aparece na lista dos projetos novos)
  const r = reg._ds;
  if (!r?.projeto) throw new Error("rode antes: node motor/claude-design.mjs ds-criar");
  await abrirChrome();
  let t = (await abas()).find((x) => x.url.includes(r.projeto)) ?? await novaAba(`https://claude.ai/design/p/${r.projeto}`);
  await ativar(t.id);
  const s = await ligar(t.webSocketDebuggerUrl);
  await pausa(5000);
  const chave = () => { const l = [...document.querySelectorAll("label, div, span")].find((e) => e.innerText?.trim() === "Published"); return l?.closest("label, div")?.querySelector('input[type="checkbox"], [role="checkbox"], button[role="switch"]') ?? null; };
  const ligado = await s.ev(`() => { const c = (${chave})(); return c ? String(c.checked ?? c.getAttribute("aria-checked")) : "?"; }`);
  if (ligado !== "true") {
    await s.clicar(chave).catch(() => { throw new Error('não achei a chave "Published"; ligue à mão no topo do projeto do design system'); });
    await pausa(3000);
  }
  reg._ds = { ...r, publicado: new Date().toISOString() }; salva();
  console.log(`design system publicado: https://claude.ai/design/p/${r.projeto}`);
} else {
  console.log("uso: node motor/claude-design.mjs criar|ajustar|ver|exportar|quadro|ds-criar|ds-publicar …");
}
process.exit(0);
