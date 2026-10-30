/**
 * Radar de concorrentes pelo Instagram: abre cada perfil como uma pessoa abriria (sem seguir, curtir, comentar
 * nem abrir stories) e lê os dados que a própria página carrega (perfil + últimos posts com curtidas,
 * comentários e visualizações). Grava radar/dados/AAAA-MM-DD/<perfil>.json.
 *
 *   CDP_PORTA=9355 CHROME_PERFIL=.chrome-radar node motor/radar-ig.mjs @perfil1 @perfil2 ... [--pausa=25] [--compra=2]
 * --compra=N: abre os N posts mais curtidos dos últimos 90 dias de cada perfil e conta quantos comentários pedem preço,
 * compra ou contato (aproximação de vendas). Só a contagem é guardada; o texto dos comentários de terceiros, nunca.
 * Precisa de uma conta logada no Chrome indicado (normalmente via node motor/radar.mjs, que faz o rodízio).
 */
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { abrirChrome, abas, novaAba, ativar, ligar, pausa } from "./navegador.mjs";
import { RAIZ } from "./comum.mjs";

const args = process.argv.slice(2);
const flags = Object.fromEntries(args.filter((a) => a.startsWith("--")).map((a) => a.slice(2).split("=")));
const perfis = args.filter((a) => !a.startsWith("--")).map((a) => a.replace(/^@/, ""));
const PAUSA = Number(flags.pausa ?? 25) * 1000;
const hoje = new Date().toLocaleDateString("sv-SE", { timeZone: "America/Bahia" });
const PASTA = join(RAIZ, "radar", "dados", flags.dia ?? hoje);
mkdirSync(PASTA, { recursive: true });

await abrirChrome(["https://www.instagram.com/"]);
let t = (await abas()).find((a) => /instagram\.com/.test(a.url));
if (!t) { t = await novaAba("https://www.instagram.com/"); await pausa(4000); }
await ativar(t.id);
const s = await ligar(t.webSocketDebuggerUrl);
await s.send("Network.enable", { maxResourceBufferSize: 20_000_000, maxTotalBufferSize: 100_000_000 });
await s.send("Page.enable");

let respostas = [];
s.on((m) => {
  if (m.method === "Network.responseReceived" && /api\/graphql|graphql\/query|api\/v1\/(feed\/user|users\/web_profile_info|media\/\d+\/comments)/.test(m.params.response.url)) respostas.push(m.params.requestId);
});

// percorre o JSON e devolve todo objeto que pareça um post ou um usuário
function varrer(o, posts, usuarios) {
  if (!o || typeof o !== "object") return;
  if (Array.isArray(o)) { o.forEach((x) => varrer(x, posts, usuarios)); return; }
  if ((o.code || o.shortcode) && (o.taken_at || o.taken_at_timestamp)) posts.push(o);
  if (o.username && (o.follower_count !== undefined || o.edge_followed_by)) usuarios.push(o);
  for (const v of Object.values(o)) varrer(v, posts, usuarios);
}

// comentários (para a contagem de intenção de compra): texto + data + autor, e não é um post
function varrerComentarios(o, lista) {
  if (!o || typeof o !== "object") return;
  if (Array.isArray(o)) { o.forEach((x) => varrerComentarios(x, lista)); return; }
  if (typeof o.text === "string" && (o.created_at || o.created_at_utc) && (o.user || o.owner) && !o.code && !o.shortcode)
    lista.push({ id: String(o.pk ?? o.id ?? o.text.slice(0, 40)), texto: o.text, autor: o.user?.username ?? o.owner?.username });
  for (const v of Object.values(o)) varrerComentarios(v, lista);
}
const COMPRA = /\b(valor|pre[çc]o|quanto (custa|é|e|fica|sai)|quero|como (compr|pe[çc]o|fa[çc]o (pra|para) (compr|pedir)|adquir)|onde (compr|encontr|acho)|vende|entrega|encomend|or[çc]amento|direct|dm|inbox|whats|zap|link|comprar|pedido|me chama|chama no|dispon[íi]vel|price|how much|buy|order|precio|cu[aá]nto)\b/i;

const tipo = (p) => p.carousel_media_count || p.__typename === "GraphSidecar" || p.media_type === 8 ? "carrossel"
  : p.product_type === "clips" || p.media_type === 2 || p.is_video ? "reel" : "foto";

for (const [i, u] of perfis.entries()) {
  const arq = join(PASTA, `${u}.json`);
  if (existsSync(arq) && !flags.refazer) { console.log(`= ${u} (já coletado)`); continue; }
  respostas = [];
  await s.send("Page.navigate", { url: `https://www.instagram.com/${u}/` });
  await pausa(7000);
  await s.ev(() => window.scrollBy(0, 1400)).catch(() => {});
  await pausa(4000);
  await s.ev(() => window.scrollBy(0, 1400)).catch(() => {});
  await pausa(4000);
  const posts = [], usuarios = [];
  for (const id of respostas) {
    try {
      const { body, base64Encoded } = await s.send("Network.getResponseBody", { requestId: id }, 15000);
      const txt = base64Encoded ? Buffer.from(body, "base64").toString("utf8") : body;
      for (const linha of txt.split("\n")) { try { varrer(JSON.parse(linha), posts, usuarios); } catch {} }
    } catch {}
  }
  const embutidos = await s.ev(() => [...document.querySelectorAll("script[type=\"application/json\"]")].map((x) => x.textContent).filter((x) => /taken_at|follower_count/.test(x))).catch(() => []);
  for (const txt of embutidos) { try { varrer(JSON.parse(txt), posts, usuarios); } catch {} }
  const tela = await s.ev(() => ({ url: location.href, texto: document.querySelector("header")?.innerText ?? document.body.innerText.slice(0, 400) })).catch(() => ({}));
  const dono = usuarios.find((x) => x.username === u) ?? {};
  const vistos = new Set();
  const lista = posts.filter((p) => {
    const c = p.code ?? p.shortcode;
    const autor = p.user?.username ?? p.owner?.username;
    if (vistos.has(c) || (autor && autor !== u)) return false;
    vistos.add(c); return true;
  }).map((p) => ({
    codigo: p.code ?? p.shortcode,
    link: `https://www.instagram.com/p/${p.code ?? p.shortcode}/`,
    tipo: tipo(p),
    data: new Date((p.taken_at ?? p.taken_at_timestamp) * 1000).toISOString().slice(0, 10),
    curtidas: p.like_count ?? p.edge_liked_by?.count ?? p.edge_media_preview_like?.count ?? null,
    comentarios: p.comment_count ?? p.edge_media_to_comment?.count ?? null,
    visualizacoes: p.play_count ?? p.ig_play_count ?? p.view_count ?? p.video_view_count ?? null,
    slides: p.carousel_media_count ?? p.edge_sidecar_to_children?.edges?.length ?? null,
    fixado: !!(p.timeline_pinned_user_ids?.length || p.pinned),
    legenda: p.caption?.text ?? p.edge_media_to_caption?.edges?.[0]?.node?.text ?? "",
  })).sort((a, b) => b.data.localeCompare(a.data));
  // intenção de compra nos posts mais fortes (só a contagem)
  const NCOMPRA = Number(flags.compra ?? 0);
  if (NCOMPRA > 0) {
    const limite = new Date(Date.now() - 90 * 864e5).toISOString().slice(0, 10);
    const alvos = lista.filter((x) => !x.fixado && x.data >= limite && (x.comentarios ?? 0) > 0)
      .sort((a, b) => (b.curtidas ?? 0) - (a.curtidas ?? 0)).slice(0, NCOMPRA);
    for (const p of alvos) {
      respostas = [];
      try {
        await s.send("Page.navigate", { url: p.link });
        await pausa(6500);
        const cs = [];
        for (const id of respostas) {
          try {
            const { body, base64Encoded } = await s.send("Network.getResponseBody", { requestId: id }, 15000);
            const txt = base64Encoded ? Buffer.from(body, "base64").toString("utf8") : body;
            for (const linha of txt.split("\n")) { try { varrerComentarios(JSON.parse(linha), cs); } catch {} }
          } catch {}
        }
        const emb = await s.ev(() => [...document.querySelectorAll('script[type="application/json"]')].map((x) => x.textContent).filter((x) => /created_at/.test(x))).catch(() => []);
        for (const txt of emb) { try { varrerComentarios(JSON.parse(txt), cs); } catch {} }
        const unicos = [...new Map(cs.filter((c) => c.autor !== u && c.texto !== p.legenda).map((c) => [c.id, c])).values()];
        p.intencao = { lidos: unicos.length, compra: unicos.filter((c) => COMPRA.test(c.texto)).length };
      } catch {}
      await pausa(3000 + Math.random() * 4000);
    }
  }
  const dados = {
    usuario: u, coletado: new Date().toISOString(),
    seguidores: dono.follower_count ?? dono.edge_followed_by?.count ?? null,
    seguindo: dono.following_count ?? dono.edge_follow?.count ?? null,
    posts: dono.media_count ?? dono.edge_owner_to_timeline_media?.count ?? null,
    nome: dono.full_name ?? null, bio: dono.biography ?? null, categoria: dono.category ?? dono.category_name ?? null,
    // sem "Seguido(a) por …": essa linha mostra quem a conta logada segue, e não pode ficar nos dados
    cabecalho: tela.texto ? tela.texto.split("\n").filter((l) => !/^(Seguido\(a\) por|Followed by|Seguir|Seguindo|Enviar mensagem|Follow|Following|Message)\b/i.test(l.trim())).join("\n") : null, existe: !/(Esta página não está disponível|Sorry, this page)/i.test(tela.texto ?? ""),
    ultimos: lista,
  };
  writeFileSync(arq, JSON.stringify(dados, null, 2));
  console.log(`${i + 1}/${perfis.length} ${u}: ${dados.seguidores ?? "?"} seguidores, ${lista.length} posts lidos`);
  if (i < perfis.length - 1) await pausa(PAUSA + Math.random() * 8000);
}
s.fechar();
await pausa(200);
process.exit(0);
