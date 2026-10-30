/**
 * Instagram da Biomagistral pelo Chrome do estúdio (porta 9344, perfil .chrome-biomagistral/, separado de outro projeto).
 * A senha nunca fica em arquivo: o login lê IG_USUARIO e IG_SENHA do ambiente uma única vez e a sessão fica salva.
 *
 *   node motor/instagram.mjs login                 entra na conta (IG_USUARIO / IG_SENHA)
 *   node motor/instagram.mjs status                diz se está logado e em qual conta
 *   node motor/instagram.mjs perfil <@> [--saida=arquivo.json]   dados públicos do perfil + últimos posts
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { abrirChrome, abas, novaAba, ativar, ligar, pausa } from "./navegador.mjs";

const IG = "https://www.instagram.com/";
const [cmd, alvo] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const flags = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => a.slice(2).split("=")));

let sessao = null;
async function abaIG() {
  await abrirChrome([IG]);
  let t = (await abas()).find((a) => a.url.includes("instagram.com"));
  if (!t) { t = await novaAba(IG); await pausa(4000); }
  await ativar(t.id);
  const s = await ligar(t.webSocketDebuggerUrl);
  sessao = s;
  await s.esperar(() => location.hostname.endsWith("instagram.com") && document.readyState === "complete", { tempo: 45000 });
  return s;
}

async function contaLogada(s) {
  return await s.ev(async () => {
    const r = await fetch("https://www.instagram.com/api/v1/accounts/current_user/?edit=true", { headers: { "x-ig-app-id": "936619743392459" }, credentials: "include" });
    const j = r.ok ? await r.json().catch(() => null) : null;
    if (j?.user?.username) return j.user.username;
    const id = (document.cookie.match(/ds_user_id=(\d+)/) || [])[1];
    return id ? `id ${id}` : null;
  });
}

async function login() {
  const { IG_USUARIO: u, IG_SENHA: p } = process.env;
  if (!u || !p) throw new Error("defina IG_USUARIO e IG_SENHA no ambiente");
  const s = await abaIG();
  const ja = await contaLogada(s);
  if (ja) { console.log(`já logado como @${ja}`); return; }
  await s.send("Page.navigate", { url: IG + "accounts/login/" });
  await s.esperar(() => document.querySelector('input[name="username"], input[name="email"]'), { tempo: 30000 });
  await pausa(1500);
  await s.clicar(() => document.querySelector('input[name="username"], input[name="email"]'));
  await s.digitar(u);
  await s.clicar(() => document.querySelector('input[name="password"], input[name="pass"]'));
  await s.digitar(p);
  await pausa(600);
  await s.tecla("Enter");
  for (let k = 0; k < 30; k++) {
    await pausa(2000);
    const conta = await contaLogada(s).catch(() => null);
    if (conta) { console.log(`logado como @${conta}`); return; }
    const url = await s.ev(() => location.href);
    if (/challenge|two_factor|checkpoint|auth_platform/.test(url)) { console.log(`o Instagram pediu verificação: ${url}`); return; }
  }
  const aviso = await s.ev(() => document.body.innerText.slice(0, 600));
  console.log("não confirmou o login. Texto da página:\n" + aviso);
}

async function perfilPublico(user) {
  const s = await abaIG();
  const dados = await s.ev(async (user) => {
    const r = await fetch(`https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(user)}`, { headers: { "x-ig-app-id": "936619743392459" }, credentials: "include" });
    if (!r.ok) return { erro: `HTTP ${r.status}` };
    const u = (await r.json())?.data?.user;
    if (!u) return { erro: "perfil não encontrado" };
    const midia = (e) => ({
      codigo: e.shortcode, link: `https://www.instagram.com/p/${e.shortcode}/`,
      tipo: e.__typename === "GraphSidecar" ? "carrossel" : e.is_video ? (e.product_type === "clips" ? "reel" : "video") : "foto",
      data: new Date(e.taken_at_timestamp * 1000).toISOString().slice(0, 10),
      curtidas: e.edge_liked_by?.count ?? e.edge_media_preview_like?.count ?? null,
      comentarios: e.edge_media_to_comment?.count ?? null,
      visualizacoes: e.video_view_count ?? null,
      slides: e.edge_sidecar_to_children?.edges?.length ?? null,
      legenda: e.edge_media_to_caption?.edges?.[0]?.node?.text ?? "",
    });
    return {
      usuario: u.username, nome: u.full_name, bio: u.biography, link: u.external_url,
      seguidores: u.edge_followed_by?.count, seguindo: u.edge_follow?.count, posts: u.edge_owner_to_timeline_media?.count,
      comercial: u.is_business_account, profissional: u.is_professional_account, categoria: u.category_name ?? u.business_category_name,
      verificado: u.is_verified, privado: u.is_private, foto: u.profile_pic_url_hd,
      destaques: u.highlight_reel_count,
      ultimos: (u.edge_owner_to_timeline_media?.edges ?? []).map((x) => midia(x.node)),
      reels: (u.edge_felix_video_timeline?.edges ?? []).map((x) => midia(x.node)),
    };
  }, user.replace(/^@/, ""));
  return dados;
}

// código de verificação em duas etapas (chega no WhatsApp da farmácia); marca "confiar neste dispositivo"
async function codigo(n) {
  const s = await abaIG();
  await s.clicar(() => document.querySelector('input[name="verificationCode"], input[autocomplete="one-time-code"], input[inputmode="numeric"], input[type="text"]'));
  await s.digitar(String(n));
  await s.ev(() => {
    const cb = [...document.querySelectorAll('input[type="checkbox"]')][0];
    if (cb && !cb.checked) cb.click();
  });
  await pausa(500);
  await s.clicar(() => [...document.querySelectorAll('button, div[role="button"]')].find((b) => /^(Continuar|Confirmar|Enviar)$/i.test(b.innerText.trim())));
  for (let k = 0; k < 20; k++) {
    await pausa(2000);
    const conta = await contaLogada(s).catch(() => null);
    if (conta) { console.log(`logado como @${conta}`); return; }
  }
  console.log("ainda não entrou. Texto da página:\n" + (await s.ev(() => document.body.innerText.slice(0, 600))));
}

if (cmd === "login") await login();
else if (cmd === "codigo" && alvo) await codigo(alvo);
else if (cmd === "status") { const s = await abaIG(); console.log((await contaLogada(s)) ?? "não logado"); }
else if (cmd === "perfil" && alvo) {
  const d = await perfilPublico(alvo);
  const txt = JSON.stringify(d, null, 2);
  if (flags.saida) { mkdirSync(dirname(flags.saida), { recursive: true }); writeFileSync(flags.saida, txt); console.log(`salvo em ${flags.saida}`); }
  else console.log(txt);
} else console.log("uso: node motor/instagram.mjs login | status | perfil <@> [--saida=arq.json]");
sessao?.fechar();
await pausa(200);
process.exit(0);
