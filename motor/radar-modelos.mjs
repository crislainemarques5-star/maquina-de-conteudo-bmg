/**
 * Modelos validados: junta as coletas do radar dos últimos 120 dias e ranqueia os posts que funcionaram de verdade
 * (alcance, engajamento e intenção de compra), por FORMATO. É o cardápio que a máquina oferece a cada pedido de post.
 * Grava radar/modelos.json e radar/MODELOS.md.
 *
 *   node motor/radar-modelos.mjs
 *
 * Força do post = curtidas ÷ mediana do próprio perfil (fora da curva ≥ 1,5). Nota = força × peso dos comentários ×
 * peso da intenção de compra (comentários pedindo preço, compra ou contato, contados pelo radar-ig --compra).
 * Regra de uso (em radar/MODELOS.md): copiar a ESTRUTURA, nunca o texto; não repetir a mesma fonte nos últimos 10 posts
 * (conteudo/modelos-usados.json) e alternar os grupos (Bahia, Nordeste, Brasil, internacional).
 */
import { existsSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { RAIZ, lerJson } from "./comum.mjs";

const base = join(RAIZ, "radar", "dados");
const cfg = lerJson(join(RAIZ, "radar", "perfis.json"));
const grupoDe = Object.fromEntries(Object.entries(cfg.grupos).flatMap(([g, l]) => l.map((p) => [p.h, g])));
const localDe = Object.fromEntries(Object.values(cfg.grupos).flatMap((l) => l.map((p) => [p.h, p.local])));
const usados = existsSync(join(RAIZ, "conteudo", "modelos-usados.json")) ? lerJson(join(RAIZ, "conteudo", "modelos-usados.json")) : [];
const recentes = new Set(usados.slice(-10).map((u) => u.fonte));
const corte = new Date(Date.now() - 120 * 864e5).toISOString().slice(0, 10);
const mediana = (v) => { const a = v.filter((x) => x != null).sort((x, y) => x - y); return a.length ? (a.length % 2 ? a[(a.length - 1) / 2] : (a[a.length / 2 - 1] + a[a.length / 2]) / 2) : null; };
const gancho = (t) => String(t ?? "").split("\n").map((l) => l.trim()).find((l) => l.length > 3)?.slice(0, 140) ?? "";

// formatos reconhecidos pela legenda (um post pode ter mais de um)
const FORMATOS = [
  ["quiz", "Quiz / teste rápido (resposta no slide seguinte, comentário A, B ou C)", /\bquiz\b|teste r[áa]pido|acert(ou|a)|qual (desses|dessas|é a resposta)|responda|\bA\)|\bB\)|verdadeiro ou falso/i],
  ["parecidos", "Parecidos, mas não iguais (comparação de formas e ativos)", /parecid|diferen[çc]a entre|\bx\b.*\?|\bvs\.?\b|versus|n[ãa]o s[ãa]o iguais|mesma fam[íi]lia|qual escolher/i],
  ["mito-verdade", "Mito ou verdade", /\bmito|verdade\b|fake|[ée] verdade que|desmistific/i],
  ["bastidores", "Bastidores / como a fórmula é feita", /bastidor|por tr[áa]s|laborat[óo]rio|antes de (um manipulado )?chegar|como (é|e|são|sao) (feit|manipulad|produzid)|processo|controle de qualidade|pesagem|barulhinho|asmr/i],
  ["pergunta-polemica", "Pergunta que divide opiniões no gancho", /^[^\n]{0,120}\?\s*$/m],
  ["lista", "Lista numerada (sinais, benefícios, erros, dicas)", /\b\d+\s+(dicas|motivos|sinais|benef[íi]cios|erros|ativos|coisas|mitos|h[áa]bitos|vitaminas)|dicas? (para|de)|sinais de/i],
  ["ativo-explicado", "Ativo explicado (o que é, para que serve, forma certa)", /vitamina|col[áa]geno|magn[ée]sio|creatina|[ôo]mega|ativo|suplement|biotina|probi[óo]tic|coenzima|melatonina|ferro|zinco|whey|cafe[íi]na/i],
  ["comunidade", "Comunidade e cidade (presença local, equipe, eventos)", /cidade|chegamos|evento|corrida|equipe|anivers[áa]rio|inaugur|nossa unidade|visita/i],
  ["identificacao", "Identificação com a rotina (\"você também…?\")", /voc[êe] (tamb[ée]m|j[áa]|sente)|nos dias de|quem nunca|sabe aquele|acontece com voc[êe]/i],
  ["cta-comentario", "Isca de comentário (\"comenta X que eu te mando\")", /comenta|comente|digite|escreve? (aqui|nos coment)|me (manda|chama) no direct/i],
  ["humor", "Humor leve de rotina", /kkk|😂|🤣|\bpov\b|quando (o|a) client/i],
];

const posts = [];
if (existsSync(base)) for (const dia of readdirSync(base).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort()) {
  for (const f of readdirSync(join(base, dia)).filter((x) => x.endsWith(".json"))) {
    let p; try { p = JSON.parse(readFileSync(join(base, dia, f), "utf8")); } catch { continue; }
    if (p.usuario === "biomagistral_santaluz") continue; // a nossa conta não é modelo de si mesma
    const ps = (p.ultimos ?? []).filter((x) => !x.fixado);
    const med = mediana(ps.map((x) => x.curtidas));
    for (const x of ps) {
      if (!med || x.curtidas == null || x.data < corte) continue;
      const forca = x.curtidas / med;
      const eng = p.seguidores ? (x.curtidas + (x.comentarios ?? 0)) / p.seguidores : null;
      const intencao = x.intencao?.compra ?? 0;
      const nota = Math.min(forca, 30) * (1 + Math.min(1, (x.comentarios ?? 0) / Math.max(1, x.curtidas)) * 3) * (1 + Math.min(intencao, 20) * 0.15);
      const leg = String(x.legenda ?? "");
      const formatos = FORMATOS.filter(([, , re]) => re.test(leg)).map(([k]) => k);
      posts.push({ fonte: p.usuario, grupo: grupoDe[p.usuario] ?? "outro", local: localDe[p.usuario] ?? "", seguidores: p.seguidores, coleta: dia,
        link: x.link, tipo: x.tipo, slides: x.slides, data: x.data, curtidas: x.curtidas, comentarios: x.comentarios, visualizacoes: x.visualizacoes,
        _leg: leg, forca: +forca.toFixed(1), engajamento: eng == null ? null : +(eng * 100).toFixed(2), intencao, nota: +nota.toFixed(1), gancho: gancho(leg), formatos });
    }
  }
}
// o mesmo post aparece em várias coletas: fica a leitura mais recente
const porLink = new Map();
for (const p of posts) porLink.set(p.link, p);
const todos = [...porLink.values()];
// o que farmácia não pode fazer não vira modelo, por mais que tenha bombado (RDC 96/2008, RDC 67/2007, Res. CFF)
const PROIBIDO = /sorteio|sorteando|giveaway|ganhador|R$s?d|antes e depois|depoimento|promo[çc][ãa]o|desconto|black friday|cupom|% off/i;
for (const p of todos) p.proibido = PROIBIDO.test(porLink.get(p.link)?._leg ?? "");
const validados = todos.filter((p) => !p.proibido && p.forca >= 1.5 && p.curtidas >= 15).sort((a, b) => b.nota - a.nota);

// ranking dos formatos: média das notas dos validados, com quantos grupos diferentes comprovam
const ranking = FORMATOS.map(([k, nome]) => {
  const l = validados.filter((p) => p.formatos.includes(k));
  return { formato: k, nome, posts: l.length, grupos: [...new Set(l.map((p) => p.grupo))], nota: l.length ? +(l.reduce((a, p) => a + p.nota, 0) / l.length).toFixed(1) : 0,
    compra: l.reduce((a, p) => a + p.intencao, 0), tipos: [...new Set(l.map((p) => p.tipo))] };
}).filter((r) => r.posts).sort((a, b) => b.nota * Math.sqrt(b.posts) - a.nota * Math.sqrt(a.posts));

writeFileSync(join(RAIZ, "radar", "modelos.json"), JSON.stringify({ atualizado: new Date().toISOString(), ranking, validados: validados.slice(0, 200).map(({ _leg, ...p }) => p) }, null, 2));

const fmt = (n) => (n == null ? "?" : n.toLocaleString("pt-BR"));
const linha = (p) => `- **${p.forca}×** · ${p.tipo}${p.slides ? ` (${p.slides} slides)` : ""} · @${p.fonte} [${p.grupo}${p.local ? `, ${p.local}` : ""}] · ${fmt(p.curtidas)} curtidas, ${fmt(p.comentarios)} coment.${p.visualizacoes ? `, ${fmt(p.visualizacoes)} views` : ""}${p.intencao ? ` · **${p.intencao} pedindo compra**` : ""}${recentes.has(p.fonte) ? " · ⚠ fonte usada nos últimos 10 posts" : ""}\n  > ${p.gancho.replace(/\n/g, " ")}\n  ${p.link} (${p.data})`;
const md = [`# Modelos validados pelo radar (${new Date().toLocaleDateString("pt-BR", { timeZone: "America/Bahia" })})`, "",
  `${todos.length} posts lidos de ${new Set(todos.map((p) => p.fonte)).size} perfis (últimos 120 dias); ${validados.length} fora da curva (≥ 1,5× a mediana do próprio perfil); ${todos.filter((p) => p.proibido).length} descartados por serem proibidos para farmácia (sorteio, preço, promoção, antes e depois, depoimento).`, "",
  "## Como usar (regra da máquina)",
  "- Em todo pedido de post, escolha o formato no ranking abaixo que combina com o tema e mostre ao operador de onde ele veio.",
  "- Copie a **estrutura** (gancho, ordem dos slides, tipo de prova, chamada), **nunca o texto, a arte ou a foto**. Tudo é reescrito no tom e no visual da Biomagistral Santaluz · BA.",
  "- Não use a mesma fonte se ela aparece nos últimos 10 posts (`conteudo/modelos-usados.json`); alterne os grupos (Bahia, Nordeste, Brasil, internacional).",
  "- Formato proibido para farmácia, mesmo que bombe: sorteio, preço, antes e depois, depoimento, nome de fórmula à venda.",
  "- \"Pedindo compra\" = comentários que perguntam preço, como comprar ou pedem contato: é a melhor aproximação de vendas que dá para medir de fora.", "",
  "## Ranking dos formatos", "", "| # | Formato | Nota média | Posts | Grupos que comprovam | Pedidos de compra | Tipos |", "|---|---|---|---|---|---|---|",
  ...ranking.map((r, i) => `| ${i + 1} | ${r.nome} | ${r.nota} | ${r.posts} | ${r.grupos.join(", ")} | ${r.compra} | ${r.tipos.join(", ")} |`), "",
  "## Os melhores de cada formato", "",
  ...ranking.flatMap((r) => [`### ${r.nome}`, ...validados.filter((p) => p.formatos.includes(r.formato)).slice(0, 5).map(linha), ""]),
  "## Top 25 geral", "", ...validados.slice(0, 25).map(linha), ""].join("\n");
writeFileSync(join(RAIZ, "radar", "MODELOS.md"), md);
console.log(`modelos: ${validados.length} validados de ${todos.length} posts · formato nº 1: ${ranking[0]?.nome ?? "—"} · radar/MODELOS.md`);
