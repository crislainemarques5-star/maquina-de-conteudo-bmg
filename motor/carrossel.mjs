/**
 * Carrosséis da Biomagistral em 1080×1350 (PNG e, com --animado, MP4 de 5 s nos slides que se mexem).
 *
 *   node motor/carrossel.mjs                      todos os carrosséis do plano (conteudo/plano.mjs)
 *   node motor/carrossel.mjs <id> [<id>...]       só os citados
 *   node motor/carrossel.mjs <id> --animado       grava também os vídeos dos slides animados
 *
 * Linguagem visual própria (design-system/DESIGN.md), diferente da de outro projeto de propósito: título em caixa normal
 * Poppins 600/300, detalhes técnicos de laboratório (régua, etiqueta de lote, grade fina), grafismo do ícone
 * cortado na borda (como no manual) e duas assinaturas que atravessam o carrossel:
 *   capsula   a cápsula do rodapé se enche de grânulos a cada slide e fecha no último
 *   borboleta o ícone dourado se revela aos poucos e fica inteiro no último slide
 * O logo é sempre um dos recortes de marca/logo/ (nunca redesenhado), num dos 5 lugares do manual.
 *
 * Campos por slide: t (capa|texto|lista|numero|mito|passos|ficha|quiz|resposta|compara|cola|cta), f (noite|gelo),
 * eyebrow, titulo (**destaque**, ==sublinhado dourado==, \n), sub, corpo, itens, nota, prox, numero, unidade, ...
 */
import { mkdirSync, readFileSync, existsSync, rmSync, mkdtempSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { RAIZ } from "./comum.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright-core");
const CHROME = process.env.CHROME_EXE ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const FF = process.env.FFMPEG ?? (() => { try { return require("ffmpeg-static"); } catch { return "ffmpeg"; } })();
const WA = { numero: "(75) 99878-6349", link: "wa.me/5575998786349" };

const png = (f) => "data:image/png;base64," + readFileSync(join(RAIZ, "marca", "logo", f)).toString("base64");
const IMG = {
  logoDourado: png("logo-dourado-site-limpo.png"),
  logoBranco: png("logo-horizontal-branco-suave.png"),
  logoAzul: png("logo-horizontal-azul-suave.png"),
  iconeDourado: png("icone-dourado-site.png"),
  iconeAzul: png("icone-azul-suave.png"),
  grafismo: png("grafismo-icone-branco.png"),
};
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const md = (s) => esc(s).replace(/==([\s\S]+?)==/g, "<u>$1</u>").replace(/\*\*([\s\S]+?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");
const dois = (n) => String(n).padStart(2, "0");

const CSS = `
:root{--noite:#0F1C2C;--noite2:#0A1420;--apoio:#142639;--gelo:#F3F5F8;--gelo2:#E7ECF2;--branco:#FFFFFF;
  --ouro-e:#7E6131;--ouro-m:#A07F45;--ouro-c:#F4F2BE;--ouro:linear-gradient(100deg,#F4F2BE 0%,#D9C78E 22%,#A07F45 50%,#D9C78E 78%,#F4F2BE 100%);
  --ouro-v:linear-gradient(180deg,#F4F2BE,#A07F45);--tinta:#0F1C2C;--tinta2:#4F5D70;--linha:rgba(15,28,44,.14);--linha-n:rgba(244,242,190,.16);
  --verde:#25A35A}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px}
body{position:relative;overflow:hidden;font-family:Poppins,sans-serif;-webkit-font-smoothing:antialiased;background:var(--gelo);color:var(--tinta)}
body.noite{background:var(--noite);color:#fff}
/* fundo: grafismo do manual cortado na borda + grade fina de laboratório */
.graf{position:absolute;width:880px;height:1011px;right:-150px;top:-60px;-webkit-mask:url(${IMG.grafismo}) center/contain no-repeat;mask:url(${IMG.grafismo}) center/contain no-repeat;z-index:0}
.noite .graf{background:#1A2A3E}
.gelo .graf{background:#E4E9F0}
.graf.esq{right:auto;left:-260px;top:auto;bottom:-120px;transform:scaleX(-1)}
.grade{position:absolute;inset:0;z-index:0;background-image:linear-gradient(var(--gl) 1px,transparent 1px),linear-gradient(90deg,var(--gl) 1px,transparent 1px);background-size:54px 54px;
  -webkit-mask:radial-gradient(120% 90% at 20% 30%,#000 0%,transparent 75%);mask:radial-gradient(120% 90% at 20% 30%,#000 0%,transparent 75%)}
.noite .grade{--gl:rgba(244,242,190,.045)}.gelo .grade{--gl:rgba(15,28,44,.05)}
.luz{position:absolute;inset:0;z-index:0;background:radial-gradient(60% 45% at 85% 8%,rgba(160,127,69,.20),transparent 70%),radial-gradient(70% 50% at 0% 100%,rgba(20,38,57,.9),transparent 70%)}
.gelo .luz{background:radial-gradient(60% 45% at 90% 5%,rgba(244,242,190,.55),transparent 70%)}
/* topo: logo no canto superior esquerdo (posição 1 do manual) + etiqueta técnica à direita */
.topo{position:absolute;top:64px;left:84px;right:84px;height:64px;display:flex;justify-content:space-between;align-items:center;z-index:9}
.topo img.logo{height:58px;display:block}
.topo img.ic{height:62px;display:block}
.etq{display:flex;align-items:center;gap:14px;font:500 19px Poppins;letter-spacing:.2em;text-transform:uppercase;color:var(--tinta2)}
.noite .etq{color:rgba(255,255,255,.78)}
.etq b{font-weight:700;color:var(--tinta)}.noite .etq b{background:var(--ouro);-webkit-background-clip:text;background-clip:text;color:transparent}
.etq i{width:34px;height:1px;background:currentColor;opacity:.5}
/* área útil e ajuste automático */
.area{position:absolute;left:84px;right:84px;top:176px;bottom:236px;display:flex;flex-direction:column;justify-content:center;z-index:5}
.area.alto{justify-content:flex-start}
.fit{display:flex;flex-direction:column;gap:30px;width:100%}
/* tipografia */
.eyebrow{display:flex;align-items:center;gap:16px;font:700 23px Poppins;letter-spacing:.26em;text-transform:uppercase;color:var(--ouro-e)}
.eyebrow::before{content:"";width:46px;height:2px;background:var(--ouro);border-radius:2px}
.noite .eyebrow{color:#E8DDA8}
h1,h2{font-family:Poppins;letter-spacing:-.025em;color:var(--tinta)}
.noite h1,.noite h2{color:#fff}
h1{font-weight:300;font-size:112px;line-height:.98}
h2{font-weight:300;font-size:88px;line-height:1.02;letter-spacing:-.03em}
h1 b,h2 b{font-weight:800}
.noite h1 b,.noite h2 b{background:var(--ouro);-webkit-background-clip:text;background-clip:text;color:transparent;padding-bottom:.06em}
u{text-decoration:none;background:var(--ouro) no-repeat 0 92%/100% .1em;padding-bottom:.02em;font-weight:600}
.sub{font:400 34px/1.42 Poppins;color:var(--tinta2);max-width:880px}
.noite .sub{color:rgba(255,255,255,.84)}
.corpo{font:400 36px/1.48 Poppins;color:var(--tinta2)}
.corpo b{font-weight:600;color:var(--tinta)}
.noite .corpo{color:rgba(255,255,255,.84)}.noite .corpo b{color:#fff}
.nota{font:400 23px/1.5 Poppins;color:var(--tinta2);padding-top:18px;border-top:1px solid var(--linha)}
.noite .nota{color:rgba(255,255,255,.72);border-top-color:var(--linha-n)}
.prox{display:flex;align-items:center;gap:16px;font:600 22px Poppins;letter-spacing:.18em;text-transform:uppercase;color:var(--ouro-e)}
.noite .prox{color:#E8DDA8}
.prox::after{content:"";width:70px;height:2px;background:var(--ouro)}
/* capa */
.t-capa h1{font-size:124px}
.t-capa .sub{font-size:35px}
.t-capa .area{justify-content:flex-end;bottom:270px}
.t-capa .topo img.logo{height:76px}
.t-capa .graf{width:1100px;height:1264px;right:-280px;top:-120px}
.foto-capa{position:absolute;inset:0;background-size:cover;background-position:center;z-index:0}
.veu{position:absolute;inset:0;z-index:1;background:linear-gradient(0deg,var(--noite) 0%,rgba(15,28,44,.94) 40%,rgba(15,28,44,.2) 66%,rgba(15,28,44,.35) 84%,rgba(15,28,44,.9) 100%)}
.arraste{position:absolute;right:84px;bottom:84px;z-index:9;display:flex;align-items:center;gap:14px;font:600 19px Poppins;letter-spacing:.24em;text-transform:uppercase;color:#E8DDA8}
.gelo .arraste{color:var(--ouro-e)}
.arraste svg{width:26px;height:26px}
/* etiqueta de lote (detalhe técnico) */
.lote{display:inline-flex;align-self:flex-start;align-items:center;gap:18px;padding:12px 20px;border:1px solid var(--linha);border-radius:10px;font:500 18px Poppins;letter-spacing:.18em;text-transform:uppercase;color:var(--tinta2)}
.noite .lote{border-color:var(--linha-n);color:rgba(255,255,255,.78)}
.lote b{font-weight:700;color:var(--verde)}
/* lista */
.lista{display:flex;flex-direction:column}
.item{display:grid;grid-template-columns:86px 1fr;gap:26px;align-items:start;padding:26px 0;border-top:1px solid var(--linha)}
.item:last-child{border-bottom:1px solid var(--linha)}
.noite .item{border-color:var(--linha-n)}
.item i{font:200 64px/1 Poppins;font-style:normal;letter-spacing:-.03em;background:var(--ouro);-webkit-background-clip:text;background-clip:text;color:transparent}
.item div b{display:block;font:700 42px/1.18 Poppins;color:var(--tinta);letter-spacing:-.01em}
.item div span{display:block;font:400 29px/1.42 Poppins;color:var(--tinta2);margin-top:8px}
.noite .item div b{color:#fff}.noite .item div span{color:rgba(255,255,255,.8)}
/* número grande com régua de precisão */
.numero{display:flex;align-items:flex-end;gap:24px;font:200 300px/.8 Poppins;flex-wrap:wrap;letter-spacing:-.05em}
.numero .n{background:var(--ouro);-webkit-background-clip:text;background-clip:text;color:transparent}
.gelo .numero .n{background:none;color:var(--tinta);-webkit-text-fill-color:var(--tinta)}
.numero small{font:500 40px/1.2 Poppins;max-width:420px;letter-spacing:0;padding-bottom:24px;color:var(--tinta2)}
.noite .numero small{color:rgba(255,255,255,.7)}
.regua{position:relative;height:46px;margin-top:6px}
.regua::before{content:"";position:absolute;left:0;right:0;top:0;height:46px;background:repeating-linear-gradient(90deg,currentColor 0 2px,transparent 2px 18px);-webkit-mask:linear-gradient(180deg,#000 0 18px,transparent 18px);mask:linear-gradient(180deg,#000 0 18px,transparent 18px);opacity:.35}
.regua::after{content:"";position:absolute;left:0;right:0;top:0;height:46px;background:repeating-linear-gradient(90deg,currentColor 0 2px,transparent 2px 90px);opacity:.5;-webkit-mask:linear-gradient(180deg,#000 0 34px,transparent 34px);mask:linear-gradient(180deg,#000 0 34px,transparent 34px)}
.regua .marca{position:absolute;top:-6px;left:var(--p);width:4px;height:58px;border-radius:2px;background:var(--ouro-v);box-shadow:0 0 18px rgba(244,242,190,.6)}
/* mito x verdade */
.mito{display:flex;flex-direction:column;gap:26px}
.selo-mv{display:inline-flex;align-self:flex-start;align-items:center;gap:12px;font:700 22px Poppins;letter-spacing:.22em;text-transform:uppercase;padding:10px 20px;border-radius:999px}
.selo-mv.m{color:#C2410C;background:rgba(194,65,12,.1);border:1.5px solid rgba(194,65,12,.4)}
.noite .selo-mv.m{color:#FDBA74;background:rgba(253,186,116,.08);border-color:rgba(253,186,116,.35)}
.selo-mv.v{color:var(--verde);background:rgba(37,163,90,.1);border:1.5px solid rgba(37,163,90,.4)}
.frase-mito{position:relative;font:300 74px/1.1 Poppins;letter-spacing:-.02em;color:var(--tinta2)}
.noite .frase-mito{color:rgba(255,255,255,.72)}
.frase-mito s{text-decoration:none;background:linear-gradient(currentColor,currentColor) no-repeat 0 55%/100% 4px}
.cartao{border-radius:28px;padding:44px 48px;display:flex;flex-direction:column;gap:18px;background:#fff;box-shadow:0 30px 70px rgba(15,28,44,.12);border:1px solid var(--linha)}
.noite .cartao{background:rgba(255,255,255,.05);border-color:var(--linha-n);box-shadow:none}
.cartao p{font:400 34px/1.46 Poppins;color:var(--tinta2)}.cartao p b{font-weight:600;color:var(--tinta)}
.noite .cartao p{color:rgba(255,255,255,.78)}.noite .cartao p b{color:#fff}
/* passos (linha do tempo vertical, como um protocolo) */
.passos{position:relative;display:flex;flex-direction:column;gap:40px;padding-left:4px}
.passos::before{content:"";position:absolute;left:31px;top:24px;bottom:24px;width:2px;background:var(--ouro-v)}
.passo{position:relative;display:grid;grid-template-columns:64px 1fr;gap:26px;align-items:start}
.passo>i{width:58px;height:58px;border-radius:50%;display:grid;place-items:center;font:600 22px Poppins;font-style:normal;color:var(--ouro-e);background:var(--gelo);border:2px solid var(--ouro-e);z-index:2}
.noite .passo>i{background:var(--noite);color:#E8DDA8;border-color:#C9B57A}
.passo.on>i{background:var(--ouro);color:var(--noite);border-color:transparent}
.passo b{display:block;font:700 46px/1.15 Poppins;color:var(--tinta)}
.passo span{display:block;font:400 31px/1.45 Poppins;color:var(--tinta2);margin-top:4px}
.noite .passo b{color:#fff}.noite .passo span{color:rgba(255,255,255,.8)}
/* ficha técnica do ativo */
.ficha{border-radius:28px;overflow:hidden;border:1px solid var(--linha);background:#fff;box-shadow:0 30px 70px rgba(15,28,44,.10)}
.noite .ficha{background:rgba(255,255,255,.04);border-color:var(--linha-n);box-shadow:none}
.ficha .cab{display:flex;justify-content:space-between;align-items:center;padding:30px 40px;background:var(--noite);color:#fff}
.noite .ficha .cab{background:rgba(244,242,190,.08)}
.ficha .cab b{font:800 54px Poppins;letter-spacing:-.02em}
.ficha .cab small{font:500 18px Poppins;letter-spacing:.2em;text-transform:uppercase;color:#E8DDA8}
.ficha .lin{display:grid;grid-template-columns:250px 1fr;gap:24px;padding:24px 40px;border-top:1px solid var(--linha);align-items:baseline}
.noite .ficha .lin{border-color:var(--linha-n)}
.ficha .lin small{font:600 18px Poppins;letter-spacing:.18em;text-transform:uppercase;color:var(--ouro-e)}
.noite .ficha .lin small{color:#E8DDA8}
.ficha .lin span{font:400 29px/1.42 Poppins;color:var(--tinta2)}.ficha .lin span b{font-weight:600;color:var(--tinta)}
.noite .ficha .lin span{color:rgba(255,255,255,.78)}.noite .ficha .lin span b{color:#fff}
/* quiz (interativo: a resposta vem no slide seguinte) */
.opcoes{display:flex;flex-direction:column;gap:18px}
.op{display:grid;grid-template-columns:70px 1fr;align-items:center;gap:22px;padding:30px 32px;border-radius:22px;border:1.5px solid var(--linha);background:#fff;font:600 38px/1.25 Poppins;color:var(--tinta)}
.noite .op{background:rgba(255,255,255,.04);border-color:var(--linha-n);color:#fff}
.op i{width:62px;height:62px;border-radius:50%;display:grid;place-items:center;font:600 26px Poppins;font-style:normal;border:2px solid var(--ouro-e);color:var(--ouro-e)}
.noite .op i{border-color:#C9B57A;color:#E8DDA8}
.op.certa{border-color:var(--verde);background:rgba(37,163,90,.08)}
.op.certa i{background:var(--verde);border-color:var(--verde);color:#fff}
.op.errada{opacity:.45}
/* compara */
.compara{display:grid;grid-template-columns:1fr 1fr;border-radius:26px;overflow:hidden;border:1px solid var(--linha)}
.noite .compara{border-color:var(--linha-n)}
.compara div{padding:24px 28px;font:400 28px/1.35 Poppins;color:var(--tinta2);background:#fff;border-bottom:1px solid var(--linha)}
.noite .compara div{background:rgba(255,255,255,.03);color:rgba(255,255,255,.72);border-color:var(--linha-n)}
.compara .cab{font:600 20px Poppins;letter-spacing:.18em;text-transform:uppercase;color:var(--tinta2);background:var(--gelo2)}
.compara .dest{background:var(--noite);color:#fff}
.noite .compara .dest{background:rgba(244,242,190,.1);color:#fff}
.compara .cab.dest{color:#E8DDA8}
/* cola (resumo para salvar) */
.cola{display:flex;flex-direction:column}
.cola .lc{display:grid;grid-template-columns:64px 1fr;gap:24px;align-items:center;padding:24px 0;border-top:1px solid var(--linha)}
.cola .lc:last-child{border-bottom:1px solid var(--linha)}
.noite .cola .lc{border-color:var(--linha-n)}
.cola .ck{width:56px;height:56px;border-radius:50%;background:var(--ouro);display:grid;place-items:center}
.cola .ck svg{width:30px;height:30px}
.cola span{font:600 37px/1.3 Poppins;color:var(--tinta)}.noite .cola span{color:#fff}
.cola span b{font-weight:700}
.salvar{display:inline-flex;align-self:flex-start;align-items:center;gap:12px;font:600 20px Poppins;letter-spacing:.22em;text-transform:uppercase;color:var(--ouro-e)}
.noite .salvar{color:#E8DDA8}.salvar svg{width:30px;height:30px}
/* variações de capa (feed alternado): foto · arco (clara) · moldura (escura) · tipo (símbolo) */
.c-arco .arco-foto{position:absolute;left:170px;right:170px;top:150px;height:560px;border-radius:400px 400px 30px 30px;background-size:100% auto;background-position:center 8%;z-index:2;
  box-shadow:0 40px 80px rgba(15,28,44,.22)}
.c-arco .arco-fio{position:absolute;left:148px;right:148px;top:128px;height:604px;border-radius:420px 420px 40px 40px;border:1.5px solid #C9AE6E;z-index:1;opacity:.85}
.c-arco .area{top:750px;bottom:150px;justify-content:flex-start}
.c-arco .lote,.c-moldura .lote{display:none}
.c-arco .fit,.c-moldura .fit{gap:24px}
.c-arco h1{font-size:88px}.c-arco .sub{font-size:31px}
.c-arco .arraste{bottom:70px}
.c-moldura .mold-foto{position:absolute;left:84px;right:84px;top:170px;height:590px;border-radius:30px;background-size:100% auto;background-position:center 6%;z-index:2;box-shadow:0 40px 80px rgba(0,0,0,.45)}
.c-moldura .mold-fio{position:absolute;left:66px;right:66px;top:152px;height:626px;border-radius:40px;border:1.5px solid rgba(244,242,190,.55);z-index:2}
.c-moldura .mold-fio::after{content:"";position:absolute;right:-1px;top:60px;width:2px;height:140px;background:linear-gradient(180deg,transparent,#F4F2BE,transparent)}
.c-moldura .area{top:810px;bottom:170px;justify-content:flex-start}
.c-moldura h1{font-size:88px}.c-moldura .sub{font-size:31px}
.c-tipo .simbolo{position:absolute;right:84px;top:170px;z-index:3;width:400px;height:440px;border:1.5px solid rgba(244,242,190,.5);border-radius:26px;padding:28px 30px;display:flex;flex-direction:column;justify-content:space-between;
  background:linear-gradient(160deg,rgba(20,38,57,.92),rgba(15,28,44,.86));backdrop-filter:blur(10px);box-shadow:0 30px 70px rgba(0,0,0,.45)}
.c-tipo .simbolo small{font:500 20px Poppins;letter-spacing:.14em;color:#E8DDA8;display:flex;justify-content:space-between;gap:16px}
.c-tipo .simbolo b{font:200 210px/.9 Poppins;letter-spacing:-.04em;background:var(--ouro);-webkit-background-clip:text;background-clip:text;color:transparent}
.c-tipo .simbolo b sub{font-size:.42em;vertical-align:baseline;letter-spacing:0}
.c-tipo .simbolo span{font:500 28px Poppins;color:#fff}
.c-tipo .area{bottom:260px}
/* ===== infográficos e layouts de impacto ===== */
/* barras */
.barras{display:flex;flex-direction:column;gap:30px}
.barra-l{display:flex;flex-direction:column;gap:12px}
.barra-l .rot{display:flex;justify-content:space-between;align-items:baseline;gap:20px}
.barra-l .rot span{font:600 32px/1.2 Poppins;color:var(--tinta)}
.noite .barra-l .rot span{color:#fff}
.barra-l .rot b{font:200 76px/1 Poppins;letter-spacing:-.03em;color:var(--tinta)}
.noite .barra-l .rot b{color:#fff}
.barra-l.dest .rot b{font-weight:300;background:var(--ouro);-webkit-background-clip:text;background-clip:text;color:transparent}
.gelo .barra-l.dest .rot b{background:none;-webkit-text-fill-color:var(--ouro-e)}
.barra-l .trilho{position:relative;height:30px;border-radius:999px;background:var(--linha);overflow:hidden}
.noite .barra-l .trilho{background:rgba(255,255,255,.08)}
.barra-l .enche{position:absolute;inset:0;width:var(--v);border-radius:999px;background:linear-gradient(90deg,rgba(15,28,44,.35),rgba(15,28,44,.55))}
.noite .barra-l .enche{background:linear-gradient(90deg,rgba(255,255,255,.2),rgba(255,255,255,.38))}
.barra-l.dest .enche{background:var(--ouro);box-shadow:0 0 30px rgba(244,242,190,.35)}
.barra-l .enche::after{content:"";position:absolute;right:6px;top:50%;width:14px;height:14px;margin-top:-7px;border-radius:50%;background:#fff;opacity:.9}
/* anel de porcentagem */
.anel-w{display:grid;grid-template-columns:auto 1fr;gap:46px;align-items:center}
.anel{position:relative;width:420px;height:420px}
.anel svg{width:420px;height:420px;transform:rotate(-90deg)}
.anel .num{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.anel .num b{font:200 150px/.9 Poppins;letter-spacing:-.05em;background:var(--ouro);-webkit-background-clip:text;background-clip:text;color:transparent}
.gelo .anel .num b{background:none;-webkit-text-fill-color:var(--tinta)}
.anel .num small{font:600 22px Poppins;letter-spacing:.2em;text-transform:uppercase;color:var(--ouro-e);margin-top:8px}
.noite .anel .num small{color:#E8DDA8}
.anel-w .lado{display:flex;flex-direction:column;gap:20px}
.anel-w.empilhado{grid-template-columns:1fr;justify-items:center;text-align:center}
/* pictograma */
.picto{display:grid;grid-template-columns:repeat(10,1fr);gap:16px;width:100%;max-width:760px}
.picto i{aspect-ratio:1;border-radius:50%;background:var(--linha)}
.noite .picto i{background:rgba(255,255,255,.12)}
.picto i.on{background:var(--ouro);box-shadow:0 0 18px rgba(244,242,190,.6)}
.picto i.meio{background:rgba(160,127,69,.45)}
.picto-leg{display:flex;gap:30px;flex-wrap:wrap;font:500 24px Poppins;color:var(--tinta2)}
.noite .picto-leg{color:rgba(255,255,255,.8)}
.picto-leg span{display:flex;align-items:center;gap:10px}.picto-leg span::before{content:"";width:18px;height:18px;border-radius:50%;background:var(--c)}
/* palavra gigante */
.t-palavra .area{justify-content:center}
.palavra{font:800 220px/1.05 Poppins;letter-spacing:-.05em;white-space:nowrap;padding-top:.05em;background:var(--ouro);-webkit-background-clip:text;background-clip:text;color:transparent}
.gelo .palavra{background:linear-gradient(100deg,#0F1C2C,#24384F 50%,#0F1C2C);-webkit-background-clip:text;background-clip:text}
.palavra-sub{font:300 52px/1.15 Poppins;letter-spacing:-.02em;color:#fff}
.gelo .palavra-sub{color:var(--tinta)}
.palavra-sub b{font-weight:800}
/* foto com cartão de vidro */
.t-foto .foto-fundo{position:absolute;inset:0;background-size:cover;background-position:center;z-index:0}
.t-foto .foto-veu{position:absolute;inset:0;z-index:1;background:linear-gradient(0deg,rgba(15,28,44,.92) 0%,rgba(15,28,44,.55) 45%,rgba(15,28,44,.15) 75%,rgba(15,28,44,.55) 100%)}
.t-foto .area{justify-content:flex-end;bottom:220px}
.vidro-c{border-radius:30px;padding:44px 46px;display:flex;flex-direction:column;gap:18px;background:rgba(15,28,44,.55);backdrop-filter:blur(18px) saturate(140%);
  border:1px solid rgba(244,242,190,.28);box-shadow:0 30px 70px rgba(0,0,0,.35)}
.vidro-c h2{font-size:76px}
.vidro-c .corpo{color:rgba(255,255,255,.88)}
/* bento */
.bento{display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:auto;gap:18px}
.bento .bc{border-radius:26px;padding:30px 32px;display:flex;flex-direction:column;gap:10px;background:#fff;border:1px solid var(--linha);box-shadow:0 18px 40px rgba(15,28,44,.06)}
.noite .bento .bc{background:rgba(255,255,255,.05);border-color:var(--linha-n);box-shadow:none}
.bento .bc.grande{grid-column:span 2;background:var(--noite);border:none}
.noite .bento .bc.grande{background:linear-gradient(135deg,rgba(244,242,190,.14),rgba(160,127,69,.08));border:1px solid rgba(244,242,190,.3)}
.bento .bc b{font:200 96px/.9 Poppins;letter-spacing:-.04em;color:var(--tinta)}
.noite .bento .bc b,.bento .bc.grande b{background:var(--ouro);-webkit-background-clip:text;background-clip:text;color:transparent}
.bento .bc.grande b{font-size:150px}
.bento .bc span{font:500 27px/1.35 Poppins;color:var(--tinta2)}
.noite .bento .bc span,.bento .bc.grande span{color:rgba(255,255,255,.82)}
.bento .bc small{font:700 18px Poppins;letter-spacing:.2em;text-transform:uppercase;color:var(--ouro-e)}
.noite .bento .bc small,.bento .bc.grande small{color:#E8DDA8}
/* câmera: zoom in e zoom out */
.camera{position:absolute;inset:0;z-index:4}

.anel .trilho-a{stroke:var(--linha)}.noite .anel .trilho-a{stroke:rgba(255,255,255,.1)}
/* a molécula que se monta */
.mol-slide{align-self:center;width:760px;height:620px;color:#EADBA0;filter:drop-shadow(0 0 16px rgba(244,242,190,.35))}
.gelo .mol-slide{color:#0F1C2C;filter:none}
.mol-slide svg{width:100%;height:100%;overflow:visible}
.mol-slide path[pathLength]{stroke-width:5px !important;stroke-linecap:round !important}
.mol-legenda{text-align:center;display:flex;flex-direction:column;gap:12px}
.mol-legenda h2{font-size:80px}
/* grade de áreas */
.areas{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.area-c{display:flex;flex-direction:column;gap:8px;padding:26px 28px;border-radius:22px;border:1px solid var(--linha);background:#fff;box-shadow:0 18px 40px rgba(15,28,44,.06)}
.noite .area-c{background:rgba(255,255,255,.045);border-color:var(--linha-n);box-shadow:none}
.area-c small{font:600 16px Poppins;letter-spacing:.2em;color:var(--ouro-e)}.noite .area-c small{color:#E8DDA8}
.area-c b{font:700 37px/1.15 Poppins;color:var(--tinta)}.noite .area-c b{color:#fff}
.area-c span{font:400 27px/1.4 Poppins;color:var(--tinta2)}.noite .area-c span{color:rgba(255,255,255,.8)}
/* chamada final */
.botao{display:inline-flex;align-self:flex-start;align-items:center;gap:22px;border-radius:999px;padding:26px 44px 26px 30px;background:var(--verde);color:#fff;font:600 34px Poppins;box-shadow:0 22px 50px rgba(37,163,90,.35)}
.botao svg{width:52px;height:52px}
.botao span{display:flex;flex-direction:column;line-height:1.1}.botao small{font:400 24px Poppins;opacity:.92;margin-top:6px}
.beneficios{display:flex;flex-wrap:wrap;gap:14px}
.beneficios span{display:inline-flex;align-items:center;gap:10px;font:500 24px Poppins;padding:12px 22px;border-radius:999px;border:1px solid var(--linha-n);color:rgba(255,255,255,.85)}
.gelo .beneficios span{border-color:var(--linha);color:var(--tinta)}
.beneficios span::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--ouro)}
.aviso{position:absolute;left:84px;right:84px;bottom:30px;z-index:9;font:400 17px/1.45 Poppins;color:rgba(255,255,255,.66);text-align:center}
.gelo .aviso{color:rgba(15,28,44,.66)}
.logo-centro{position:absolute;left:50%;transform:translateX(-50%);z-index:9}
.unidade{position:absolute;left:0;right:0;top:270px;text-align:center;z-index:9;font:500 19px Poppins;letter-spacing:.32em;text-transform:uppercase;color:#E8DDA8}
.gelo .unidade{color:var(--ouro-e)}
/* ===== assinaturas ===== */
.mol{position:absolute;z-index:0;color:#EADBA0;opacity:.34;pointer-events:none;filter:drop-shadow(0 0 10px rgba(244,242,190,.25))}
.gelo .mol{color:#0F1C2C;opacity:.13;filter:none}
.mol svg{width:100%;height:100%;overflow:visible}
.mol path[pathLength]{stroke-width:4.6px !important;stroke-linecap:round !important}
.mol-capa{width:1150px;height:1150px;right:-300px;top:-120px;rotate:-14deg;opacity:.42}
.mol-a{width:940px;height:940px;right:-330px;top:-170px;rotate:-10deg}
.mol-b{width:940px;height:940px;left:-360px;bottom:-230px;rotate:16deg}
.mol-c{width:840px;height:840px;right:-280px;bottom:-200px;rotate:-24deg}
.t-capa.c-arco .mol,.t-capa.c-moldura .mol{opacity:.14}
.plexo{position:absolute;inset:0;width:1080px;height:1350px;z-index:0;-webkit-mask:radial-gradient(70% 55% at 80% 18%,#000 0%,transparent 80%);mask:radial-gradient(70% 55% at 80% 18%,#000 0%,transparent 80%)}
.plexo .hub{filter:drop-shadow(0 0 6px var(--cor))}
.t-capa .plexo{-webkit-mask:radial-gradient(85% 60% at 65% 28%,#000 0%,transparent 85%);mask:radial-gradient(85% 60% at 65% 28%,#000 0%,transparent 85%)}
.bokeh{position:absolute;inset:0;z-index:1;pointer-events:none}
.bokeh i{position:absolute;border-radius:50%;background:radial-gradient(circle at 35% 30%,#FFFBE6,#E6CF86 45%,rgba(160,127,69,.2) 75%)}
.gelo .bokeh{display:none}
/* capa: grafismo em ouro translúcido + reflexo de luz + anel de precisão */
.capafx{position:absolute;inset:0;z-index:1;pointer-events:none}
.capafx .halo{position:absolute;width:900px;height:900px;right:-260px;top:-180px;border-radius:50%;background:radial-gradient(circle,rgba(244,242,190,.16),rgba(160,127,69,.06) 45%,transparent 70%);filter:blur(10px)}
.capafx .ouro-graf{position:absolute;width:1150px;height:1321px;right:-330px;top:-170px;
  -webkit-mask:url(${IMG.grafismo}) center/contain no-repeat;mask:url(${IMG.grafismo}) center/contain no-repeat;
  background:linear-gradient(135deg,rgba(160,127,69,.20),rgba(244,242,190,.34) 50%,rgba(160,127,69,.16))}
.capafx .ouro-graf.reflexo{background:linear-gradient(115deg,transparent 0%,transparent 42%,rgba(255,251,230,.95) 50%,transparent 58%,transparent 100%) no-repeat;background-size:260% 100%;background-position:var(--rx,38%) 0;mix-blend-mode:screen;opacity:.75}
.capafx .anel{position:absolute;width:860px;height:860px;right:-110px;top:20px;opacity:.9}
.t-capa .graf{display:none}
.t-capa .area{bottom:250px}
/* assinatura: mostrador de precisão no canto inferior direito */
.mostrador{position:absolute;right:76px;bottom:64px;width:128px;height:128px;z-index:9}
.mostrador svg{width:128px;height:128px;overflow:visible}
.mostrador .num{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:400 15px Poppins;letter-spacing:.06em;color:var(--tinta2)}
.mostrador .num b{font:600 26px Poppins;letter-spacing:-.01em;color:var(--tinta);margin-right:2px}
.noite .mostrador .num{color:rgba(255,255,255,.72)}
.noite .mostrador .num b{background:var(--ouro);-webkit-background-clip:text;background-clip:text;color:transparent}
.mostrador .ponta{filter:drop-shadow(0 0 6px #F4F2BE)}
.mostrador.fim svg{filter:drop-shadow(0 0 16px rgba(244,242,190,.55))}
.t-capa .arraste{right:230px;bottom:112px}
.t-cta .mostrador{right:50%;transform:translateX(50%);bottom:84px}
`;

// Carrossel animado: cada slide marcado vira MP4 de 5 s; o último quadro é o slide parado (igual ao PNG).
const CSS_ANIM = `
.anim .fit>*{animation:entra .9s cubic-bezier(.16,1,.3,1) both}
/* títulos: cortina de luz da esquerda para a direita */
.anim .fit>h2,.anim .fit>h1{animation:cortina 1.15s cubic-bezier(.65,0,.35,1) .15s both}
@keyframes cortina{from{clip-path:inset(-15% 100% -15% -2%);filter:blur(6px)}to{clip-path:inset(-15% -4% -15% -2%);filter:blur(0)}}
.anim .eyebrow::before{transform-origin:left;animation:traco .9s cubic-bezier(.65,0,.35,1) .1s both}@keyframes traco{from{transform:scaleX(0)}}
/* varredura de luz: uma vez por slide, discreta */
.varredura{position:absolute;inset:-30% -60%;z-index:8;pointer-events:none;mix-blend-mode:screen;opacity:.55;
  background:linear-gradient(105deg,transparent 42%,rgba(244,242,190,.0) 45%,rgba(244,242,190,.22) 49%,rgba(255,251,230,.38) 50%,rgba(244,242,190,.22) 51%,rgba(244,242,190,0) 55%,transparent 58%);
  animation:varre 1.8s cubic-bezier(.45,0,.25,1) .25s both}
.gelo .varredura{mix-blend-mode:normal;opacity:.5;background:linear-gradient(105deg,transparent 44%,rgba(160,127,69,.10) 49%,rgba(244,242,190,.35) 50%,rgba(160,127,69,.10) 51%,transparent 56%)}
@keyframes varre{from{transform:translateX(-45%)}to{transform:translateX(45%)}}
.anim .lote{animation:entra .8s 1s both}
.anim .fit>*:nth-child(2){animation-delay:.12s}.anim .fit>*:nth-child(3){animation-delay:.24s}.anim .fit>*:nth-child(4){animation-delay:.36s}
.anim .fit>*:nth-child(5){animation-delay:.48s}.anim .fit>*:nth-child(n+6){animation-delay:.6s}
@keyframes entra{from{opacity:0;transform:translateY(30px);filter:blur(10px)}}
.anim.t-capa .fit>*{animation:none}
.anim .foto-capa{animation:kb 5s linear both}@keyframes kb{from{transform:scale(1.08)}}
.anim.t-capa h1 b{background-size:250% 100%;animation:brilho 2.4s .3s ease-out both}@keyframes brilho{from{background-position:100% 0}to{background-position:0 0}}
.anim .graf{animation:graf 5s ease-out both}@keyframes graf{from{transform:translateY(24px) rotate(-3deg);opacity:.4}}
.anim .graf.esq{animation:none}
.anim .arraste{animation:arr 1.6s 2.4s ease-in-out both}@keyframes arr{0%,100%{transform:none}35%{transform:translateX(-14px)}65%{transform:translateX(4px)}}
.anim .mol path[pathLength]{stroke-dasharray:1;animation:liga 1.3s calc(.15s + var(--k) * .035s) cubic-bezier(.45,0,.2,1) both}@keyframes liga{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
.anim .mol path:not([pathLength]){animation:atomo .7s 1.1s ease-out both}@keyframes atomo{from{opacity:0}}
.anim .mol{animation:mol-z 5s cubic-bezier(.4,0,.2,1) both}@keyframes mol-z{from{transform:scale(1.12)}to{transform:scale(1)}}
.anim .plexo line{stroke-dasharray:1;animation:desenha 1.6s calc(var(--k) * .025s) ease-out both}@keyframes desenha{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
.anim .plexo circle{animation:pisca 2.2s calc(.4s + var(--k) * .06s) ease-in-out both}@keyframes pisca{0%{opacity:0}50%{opacity:1}100%{opacity:.85}}
.anim .bokeh i{animation:deriva 5s linear both}@keyframes deriva{from{transform:translateY(40px)}to{transform:translateY(-30px)}}
.anim .capafx .reflexo{animation:reflexo 2.6s .4s cubic-bezier(.45,0,.25,1) both}@keyframes reflexo{from{background-position:100% 0}to{background-position:var(--rx,38%) 0}}
.anim .capafx .ouro-graf:not(.reflexo){animation:surge 2s ease-out both}@keyframes surge{from{opacity:0;transform:scale(1.04)}}
.anim .capafx .anel{animation:gira 5s cubic-bezier(.2,.6,.3,1) both}@keyframes gira{from{transform:rotate(-24deg);opacity:0}to{transform:none;opacity:.9}}
.anim .capafx .arco{animation:arco 2.4s .5s cubic-bezier(.45,0,.2,1) both}@keyframes arco{from{stroke-dasharray:0 100}}
.anim .mostrador .arco{animation:avanca 1.4s .35s cubic-bezier(.45,0,.2,1) both}@keyframes avanca{from{stroke-dasharray:var(--p0) 100}}
.anim .mostrador .ponta{animation:aparece .5s 1.6s both}@keyframes aparece{from{opacity:0}}
.anim .mostrador.fim svg{animation:brilha 1.6s 1.4s ease-out both}@keyframes brilha{0%{filter:none}40%{filter:drop-shadow(0 0 26px rgba(244,242,190,.9))}100%{filter:drop-shadow(0 0 16px rgba(244,242,190,.55))}}
.anim .regua .marca{animation:mede 1.6s .4s cubic-bezier(.45,0,.2,1) both}@keyframes mede{from{left:0}}
.anim .numero .n{animation:entra 1s .1s cubic-bezier(.16,1,.3,1) both}
.anim .frase-mito s{animation:risca .8s 1.1s cubic-bezier(.65,0,.35,1) both}@keyframes risca{from{background-size:0% 4px}}
.anim .mito .cartao{animation:entra .8s 1.9s cubic-bezier(.16,1,.3,1) both}
.anim .passos::before{transform-origin:top;animation:linha 1.8s .3s cubic-bezier(.45,0,.2,1) both}@keyframes linha{from{transform:scaleY(0)}}
.anim .passo{animation:lado .7s calc(.35s + var(--k) * .28s) cubic-bezier(.16,1,.3,1) both}@keyframes lado{from{opacity:0;transform:translateX(-30px)}}
.anim .op{animation:lado .6s calc(.4s + var(--k) * .2s) cubic-bezier(.16,1,.3,1) both}
.anim .op.certa{animation:lado .6s calc(.4s + var(--k) * .2s) cubic-bezier(.16,1,.3,1) both,acende 1s 1.6s ease-out both}
@keyframes acende{from{box-shadow:0 0 0 0 rgba(37,163,90,.5)}to{box-shadow:0 0 0 18px rgba(37,163,90,0)}}
.anim .ficha .lin{animation:lado .6s calc(.4s + var(--k) * .2s) cubic-bezier(.16,1,.3,1) both}
.anim .compara>div{animation:entra .55s calc(.35s + var(--k) * .12s) cubic-bezier(.16,1,.3,1) both}
.anim .cola .lc{animation:lado .6s calc(.35s + var(--k) * .25s) cubic-bezier(.16,1,.3,1) both}
.anim .cola .ck{animation:pop .5s calc(.6s + var(--k) * .25s) cubic-bezier(.3,1.5,.5,1) both}@keyframes pop{from{transform:scale(0)}}
/* infográficos animados */
.anim .barra-l .enche{transform-origin:left;animation:cresce 1.5s calc(.5s + var(--k) * .35s) cubic-bezier(.22,1,.36,1) both}@keyframes cresce{from{transform:scaleX(0)}}
.anim .barra-l .rot b{animation:entra .8s calc(.6s + var(--k) * .35s) cubic-bezier(.16,1,.3,1) both}
.anim .anel .arco-a{animation:anel 1.8s .4s cubic-bezier(.22,1,.36,1) both}@keyframes anel{from{stroke-dasharray:0 100}}
.anim .anel .num b{animation:pop2 .9s 1s cubic-bezier(.16,1,.3,1) both}@keyframes pop2{from{opacity:0;transform:scale(.7);filter:blur(10px)}}
.anim .picto i.on,.anim .picto i.meio{animation:acende-p .5s calc(.6s + var(--k) * .12s) cubic-bezier(.3,1.5,.5,1) both}@keyframes acende-p{from{transform:scale(0);opacity:0}}
.anim .picto i{animation:surge-p .4s calc(var(--j) * .006s) ease-out both}@keyframes surge-p{from{opacity:0}}
.anim .bento .bc{animation:entra .7s calc(.3s + var(--k) * .15s) cubic-bezier(.16,1,.3,1) both}
/* câmera: zoom out que revela (palavra, número, anel) e zoom in lento na foto */
.anim.cam-out .camera{animation:cam-out 1.6s cubic-bezier(.16,1,.3,1) both}@keyframes cam-out{from{transform:scale(1.55);filter:blur(8px)}to{transform:none;filter:none}}
.anim.cam-in .camera{animation:cam-in 5s cubic-bezier(.4,0,.2,1) both}@keyframes cam-in{from{transform:scale(.92)}to{transform:scale(1.02)}}
.anim .foto-fundo{animation:kb2 5s linear both}@keyframes kb2{from{transform:scale(1.18) translateY(20px)}to{transform:scale(1.02)}}
.anim .palavra{animation:palavra-z 1.5s cubic-bezier(.16,1,.3,1) both}@keyframes palavra-z{from{transform:scale(2.2);opacity:0;filter:blur(14px)}}
.anim .palavra-sub{animation:entra .9s .9s cubic-bezier(.16,1,.3,1) both}

.anim .mol-slide{animation:mol-gira 4s cubic-bezier(.2,.7,.2,1) both}@keyframes mol-gira{from{transform:rotate(-12deg) scale(.85)}to{transform:none}}
.anim .mol-slide path[pathLength]{stroke-dasharray:1;animation:liga 1.6s calc(.2s + var(--k) * .045s) cubic-bezier(.45,0,.2,1) both}
.anim .mol-slide path:not([pathLength]){animation:atomo .7s 1.5s ease-out both}
.anim .area-c{animation:entra .6s calc(.3s + var(--k) * .12s) cubic-bezier(.16,1,.3,1) both}
.anim .item{animation:lado .6s calc(.35s + var(--k) * .2s) cubic-bezier(.16,1,.3,1) both}
.anim .botao{animation:entra .8s .5s cubic-bezier(.16,1,.3,1) both,pulsa 1.6s 1.6s ease-in-out 2}@keyframes pulsa{50%{transform:scale(1.04)}}
`;

const ICONE = {
  zap: `<svg viewBox="0 0 32 32"><path fill="#fff" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6c-2 0-3.9-.5-5.6-1.5l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.8 5.1 2.1.9 3 1 4 .8.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>`,
  check: `<svg viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="#0F1C2C" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  salvar: `<svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4.5L6 21z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  seta: `<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};


// ===== fundo de bioquímica: a fórmula estrutural do ativo do post (marca/moleculas, gerada do PubChem com RDKit) =====
const MOLS = existsSync(join(RAIZ, "conteudo", "moleculas.json")) ? JSON.parse(readFileSync(join(RAIZ, "conteudo", "moleculas.json"), "utf8")) : {};
const slugMol = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
function molSvg(id) {
  const nome = MOLS[String(id).slice(0, 10)];
  if (!nome) return null;
  const f = join(RAIZ, "marca", "moleculas", slugMol(nome) + ".svg");
  return existsSync(f) ? readFileSync(f, "utf8") : null;
}
const molNome = (nome) => { const f = join(RAIZ, "marca", "moleculas", slugMol(nome) + ".svg"); return existsSync(f) ? readFileSync(f, "utf8") : null; };
function molecula(post, i, capa) {
  const svg = molSvg(post.id);
  if (!svg) return "";
  return `<div class="mol ${capa ? "mol-capa" : ["mol-a", "mol-b", "mol-c"][i % 3]}">${svg}</div>`;
}
// ===== efeitos (tecnologia e sofisticação, abstratos) =====
// gerador pseudoaleatório com semente: o mesmo post gera sempre o mesmo desenho
function rng(seed) { let x = 0; for (const c of String(seed)) x = (x * 31 + c.charCodeAt(0)) >>> 0; return () => ((x = (x * 1664525 + 1013904223) >>> 0) / 4294967296); }

// rede molecular: nós e ligações finas que se desenham no vídeo
function plexo(seed, { n = 26, dist = 200, cor = "#F4F2BE", op = 0.2 } = {}) {
  const r = rng(seed), nos = Array.from({ length: n }, () => [r() * 1080, r() * 1350, r()]);
  let linhas = "", k = 0;
  for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) {
    const d = Math.hypot(nos[a][0] - nos[b][0], nos[a][1] - nos[b][1]);
    if (d < dist) linhas += `<line pathLength="1" style="--k:${k++}" x1="${nos[a][0].toFixed(1)}" y1="${nos[a][1].toFixed(1)}" x2="${nos[b][0].toFixed(1)}" y2="${nos[b][1].toFixed(1)}" stroke-opacity="${(op * (1 - d / dist) + 0.04).toFixed(3)}"/>`;
  }
  const pts = nos.map(([x, y, z], j) => `<circle style="--k:${j}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${z > 0.85 ? 4.5 : 2.4}"${z > 0.85 ? ' class="hub"' : ""}/>`).join("");
  return `<svg class="plexo" viewBox="0 0 1080 1350" style="--cor:${cor}"><g stroke="${cor}" stroke-width="1.1">${linhas}</g><g fill="${cor}">${pts}</g></svg>`;
}

// partículas douradas desfocadas (profundidade)
function bokeh(seed, n = 7) {
  const r = rng(seed + "b");
  return `<div class="bokeh">${Array.from({ length: n }, (_, j) => {
    const t = 40 + r() * 90;
    return `<i style="--k:${j};left:${(r() * 100).toFixed(1)}%;top:${(r() * 100).toFixed(1)}%;width:${t.toFixed(1)}px;height:${t.toFixed(1)}px;filter:blur(${(t / 3).toFixed(1)}px);opacity:${(0.08 + r() * 0.16).toFixed(2)}"></i>`;
  }).join("")}</div>`;
}

// Capa: o grafismo do manual (ícone gigante cortado na borda) em ouro translúcido, com um reflexo de luz que passa
// por ele, um halo e um anel de precisão fino.
function capaFx() {
  const marcas = Array.from({ length: 72 }, (_, j) => {
    const a = (j / 72) * Math.PI * 2, r1 = 470, r2 = j % 6 ? 478 : 492;
    return `<line x1="${(Math.cos(a) * r1).toFixed(1)}" y1="${(Math.sin(a) * r1).toFixed(1)}" x2="${(Math.cos(a) * r2).toFixed(1)}" y2="${(Math.sin(a) * r2).toFixed(1)}"/>`;
  }).join("");
  return `<div class="capafx"><div class="halo"></div><div class="ouro-graf"></div><div class="ouro-graf reflexo"></div>
<svg class="anel" style="display:none" viewBox="-520 -520 1040 1040"><circle r="470" fill="none" stroke="#F4F2BE" stroke-opacity=".22" stroke-width="1.2"/>
<circle class="arco" r="430" fill="none" stroke="url(#arcoG)" stroke-width="2" pathLength="100" stroke-dasharray="34 100" transform="rotate(-140)"/>
<defs><linearGradient id="arcoG"><stop offset="0" stop-color="#F4F2BE" stop-opacity="0"/><stop offset="1" stop-color="#F4F2BE"/></linearGradient></defs>
<g stroke="#F4F2BE" stroke-opacity=".35" stroke-width="1.4">${marcas}</g></svg></div>`;
}

// Assinatura "mostrador": anel fino de precisão no canto inferior direito; o arco dourado avança a cada slide,
// com o número da página no centro. No último slide o anel se completa e brilha.
function mostrador(i, n, noite) {
  const p = ((i + 1) / n) * 100, p0 = (i / n) * 100, ultimo = i === n - 1;
  const trilho = noite ? "rgba(244,242,190,.16)" : "rgba(15,28,44,.12)";
  const marcas = Array.from({ length: n }, (_, j) => {
    const a = (j / n) * Math.PI * 2 - Math.PI / 2, c = Math.cos(a), s2 = Math.sin(a);
    return `<line x1="${(c * 52).toFixed(2)}" y1="${(s2 * 52).toFixed(2)}" x2="${(c * 58).toFixed(2)}" y2="${(s2 * 58).toFixed(2)}" stroke="${j <= i ? "#D9C78E" : trilho}" stroke-width="2"/>`;
  }).join("");
  const a = (p / 100) * Math.PI * 2 - Math.PI / 2;
  return `<div class="mostrador${ultimo ? " fim" : ""}"><svg viewBox="-64 -64 128 128">
<defs><linearGradient id="mg${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4F2BE"/><stop offset=".55" stop-color="#A07F45"/><stop offset="1" stop-color="#F4F2BE"/></linearGradient></defs>
<circle r="44" fill="none" stroke="${trilho}" stroke-width="2"/>
<circle class="arco" r="44" fill="none" stroke="url(#mg${i})" stroke-width="3.2" stroke-linecap="round" pathLength="100" stroke-dasharray="${p.toFixed(2)} 100" style="--p0:${p0.toFixed(2)}" transform="rotate(-90)"/>
${marcas}<circle class="ponta" cx="${(Math.cos(a) * 44).toFixed(2)}" cy="${(Math.sin(a) * 44).toFixed(2)}" r="4.5" fill="#FFFBE6"/></svg>
<span class="num"><b>${dois(i + 1)}</b>/${dois(n)}</span></div>`;
}

function topo(post, s, i, n, noite) {
  const capa = s.t === "capa";
  const logo = capa ? `<img class="logo" src="${noite ? IMG.logoDourado : IMG.logoAzul}" alt="">` : `<img class="ic" src="${noite ? IMG.iconeDourado : IMG.iconeAzul}" alt="">`;
  const etq = capa ? "<b>Santaluz · BA</b>" : esc(s.etq ?? post.etq ?? "Santaluz · BA");
  return `<div class="topo">${s.t === "cta" ? "<span></span>" : logo}<span class="etq">${etq}</span></div>`;
}

const ZMAX = { molecula: 1, barras: 1.15, anel: 1, pictograma: 1.1, palavra: 1, foto: 1.1, bento: 1.15, areas: 1.2, capa: 1, texto: 1.4, lista: 1.3, numero: 1.1, mito: 1.35, passos: 1.25, ficha: 1.25, quiz: 1.25, resposta: 1.25, compara: 1.25, cola: 1.35, cta: 1.2 };

function corpoSlide(post, s, i, n) {
  const k = (j) => `style="--k:${j}"`;
  const eb = s.eyebrow ? `<div class="eyebrow">${esc(s.eyebrow)}</div>` : "";
  const tit = (tag = "h2") => (s.titulo ? `<${tag}>${md(s.titulo)}</${tag}>` : "");
  const sub = s.sub ? `<p class="sub">${md(s.sub)}</p>` : "";
  const corpo = s.corpo ? `<p class="corpo">${md(s.corpo)}</p>` : "";
  const nota = s.nota ? `<p class="nota">${md(s.nota)}</p>` : "";
  const prox = s.prox ? `<div class="prox">${esc(s.prox)}</div>` : "";
  switch (s.t) {
    case "capa":
      return `${eb}${tit("h1")}${sub}${s.lote ? `<span class="lote">${esc(s.lote)}</span>` : ""}`;
    case "texto":
      return `${eb}${tit()}${corpo}${nota}${prox}`;
    case "lista":
      return `${eb}${tit()}<div class="lista">${s.itens.map((it, j) => `<div class="item" ${k(j)}><i>${dois(j + 1)}</i><div><b>${md(it[0])}</b>${it[1] ? `<span>${md(it[1])}</span>` : ""}</div></div>`).join("")}</div>${nota}${prox}`;
    case "numero":
      return `${eb}<div class="numero"><span class="n"${String(s.numero).length > 6 ? ' style="font-size:180px"' : ""}>${esc(s.numero)}</span>${s.unidade ? `<small>${esc(s.unidade)}</small>` : ""}</div><div class="regua"><span class="marca" style="--p:${s.regua ?? 62}%"></span></div>${tit()}${corpo}${nota}${prox}`;
    case "mito":
      return `<div class="mito"><span class="selo-mv m">Mito</span><p class="frase-mito"><s>${md(s.mito)}</s></p><div class="cartao"><span class="selo-mv v">Verdade</span><p>${md(s.verdade)}</p></div></div>${nota}${prox}`;
    case "passos":
      return `${eb}${tit()}<div class="passos">${s.itens.map((it, j) => `<div class="passo${j === s.itens.length - 1 && !s.prox ? " on" : ""}" ${k(j)}><i>${dois((s.inicio ?? 1) + j)}</i><div><b>${md(it[0])}</b>${it[1] ? `<span>${md(it[1])}</span>` : ""}</div></div>`).join("")}</div>${nota}${prox}`;
    case "ficha":
      return `${eb}${tit()}<div class="ficha"><div class="cab"><b>${esc(s.ativo)}</b><small>${esc(s.tipoAtivo ?? "Ficha do ativo")}</small></div>${s.linhas.map((l, j) => `<div class="lin" ${k(j)}><small>${esc(l[0])}</small><span>${md(l[1])}</span></div>`).join("")}</div>${nota}${prox}`;
    case "quiz":
      return `${eb || '<div class="eyebrow">Teste rápido</div>'}${tit()}<div class="opcoes">${s.opcoes.map((o, j) => `<div class="op" ${k(j)}><i>${"ABCD"[j]}</i><span>${md(o)}</span></div>`).join("")}</div>${prox || '<div class="prox">Arraste para ver a resposta</div>'}`;
    case "resposta":
      return `${eb || '<div class="eyebrow">Resposta</div>'}${tit()}<div class="opcoes">${s.opcoes.map((o, j) => `<div class="op ${j === s.certa ? "certa" : "errada"}" ${k(j)}><i>${"ABCD"[j]}</i><span>${md(o)}</span></div>`).join("")}</div>${corpo}${nota}${prox}`;
    case "compara":
      return `${eb}${tit()}<div class="compara">${s.cab.map((c, j) => `<div class="cab${j === 1 ? " dest" : ""}" ${k(0)}>${esc(c)}</div>`).join("")}${s.linhas.flatMap((l, j) => [`<div ${k(j + 1)}>${md(l[0])}</div>`, `<div class="dest" ${k(j + 1)}>${md(l[1])}</div>`]).join("")}</div>${nota}${prox}`;
    case "cola":
      return `<span class="salvar">${ICONE.salvar} Salve para consultar</span>${tit()}<div class="cola">${s.itens.map((it, j) => `<div class="lc" ${k(j)}><span class="ck">${ICONE.check}</span><span>${md(it)}</span></div>`).join("")}</div>${prox}`;
    case "areas":
      return `${eb}${tit()}<div class="areas">${s.itens.map((it, j) => `<div class="area-c" ${k(j)}><small>${dois(j + 1)}</small><b>${md(it[0])}</b><span>${md(it[1])}</span></div>`).join("")}</div>${nota}${prox}`;
    case "barras": {
      const max = s.max ?? Math.max(...s.itens.map((i) => i[1]));
      return `${eb}${tit()}<div class="barras">${s.itens.map(([rot, v, txt, dest], j) => `<div class="barra-l${dest ? " dest" : ""}" ${k(j)}><div class="rot"><span>${md(rot)}</span><b>${esc(txt ?? v)}</b></div><div class="trilho"><i class="enche" style="--v:${Math.max(3, (v / max) * 100).toFixed(1)}%"></i></div></div>`).join("")}</div>${nota}${prox}`;
    }
    case "anel": {
      const p = Math.max(1, Math.min(100, s.porcento ?? parseFloat(String(s.numero).replace(",", "."))));
      return `<div class="anel-w${s.lado ? "" : " empilhado"}"><div class="anel"><svg viewBox="0 0 100 100"><defs><linearGradient id="ag" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4F2BE"/><stop offset=".55" stop-color="#A07F45"/><stop offset="1" stop-color="#F4F2BE"/></linearGradient></defs><circle class="trilho-a" cx="50" cy="50" r="44" fill="none" stroke-width="5"/><circle class="arco-a" cx="50" cy="50" r="44" fill="none" stroke="url(#ag)" stroke-width="5.5" stroke-linecap="round" pathLength="100" stroke-dasharray="${p} 100"/></svg><div class="num"><b>${esc(s.numero)}</b>${s.legenda ? `<small>${esc(s.legenda)}</small>` : ""}</div></div><div class="lado">${eb}${tit()}${corpo}${nota}</div></div>${prox}`;
    }
    case "pictograma": {
      const on = s.on ?? 0, meio = s.meio ?? 0;
      return `${eb}${tit()}<div class="picto">${Array.from({ length: 100 }, (_, j) => `<i class="${j < on ? "on" : j < on + meio ? "meio" : ""}" style="--j:${j};--k:${j}"></i>`).join("")}</div>${s.legenda ? `<div class="picto-leg">${s.legenda.map(([c, t]) => `<span style="--c:${c}">${esc(t)}</span>`).join("")}</div>` : ""}${corpo}${nota}`;
    }
    case "palavra": {
      const tam = Math.min(250, Math.floor(912 / (String(s.palavra).length * 0.64)));
      return `${eb}<div class="palavra" style="font-size:${tam}px">${esc(s.palavra)}</div>${s.titulo ? `<p class="palavra-sub">${md(s.titulo)}</p>` : ""}${corpo}${nota}`;
    }
    case "foto":
      return `<div class="vidro-c">${eb}${tit()}${corpo}</div>${nota}`;
    case "bento":
      return `${eb}${tit()}<div class="bento">${s.itens.map((c, j) => `<div class="bc${c.grande ? " grande" : ""}" ${k(j)}>${c.rot ? `<small>${esc(c.rot)}</small>` : ""}<b>${esc(c.n)}</b><span>${md(c.t)}</span></div>`).join("")}</div>${nota}${prox}`;
    case "molecula": {
      const svg = s.molecula ? molNome(s.molecula) : molSvg(post.id);
      return `${eb}<div class="mol-slide">${svg ?? ""}</div><div class="mol-legenda">${tit()}${corpo}</div>${nota}`;
    }
    case "cta":
      return `${eb}${tit()}${corpo}<span class="botao">${ICONE.zap}<span>${esc(s.botao ?? "Chame no WhatsApp")}<small>${WA.numero} · avaliação personalizada</small></span></span><div class="beneficios">${(s.beneficios ?? ["Entrega grátis para toda a Bahia", "Atendimento farmacêutico"]).map((b) => `<span>${esc(b)}</span>`).join("")}</div>`;
    default:
      throw new Error(`tipo de slide desconhecido: ${s.t}`);
  }
}

let ANIMADO = false;
function slideHtml(post, s, i, n, foto) {
  const estiloCapa = s.t === "capa" ? (s.estilo ?? post.capa) : null;
  const noite = s.t === "foto" ? true : estiloCapa === "arco" ? false : (s.f ?? (i % 2 === 0 ? "noite" : "gelo")) === "noite";
  const classe = [noite ? "noite" : "gelo", `t-${s.t}`, s.t === "capa" ? `c-${s.estilo ?? post.capa ?? (foto ? "foto" : "tipo")}` : "", /^(palavra|numero|anel|bento|barras|pictograma)$/.test(s.t) ? "cam-out" : "", s.t === "foto" ? "cam-in" : "", ANIMADO ? "anim" : ""].join(" ");
  const estilo = s.t === "capa" ? (s.estilo ?? post.capa ?? (foto ? "foto" : "tipo")) : null;
  const temFoto = estilo === "foto" && foto;
  const fotoSlide = s.t === "foto" ? (s.foto && existsSync(join(RAIZ, "fotos", s.foto)) ? "data:image/png;base64," + readFileSync(join(RAIZ, "fotos", s.foto)).toString("base64") : foto) : null;
  const extraCapa = estilo === "arco" && foto ? `<div class="arco-fio"></div><div class="arco-foto" style="background-image:url(${foto})"></div>`
    : estilo === "moldura" && foto ? `<div class="mold-fio"></div><div class="mold-foto" style="background-image:url(${foto})"></div>`
    : estilo === "tipo" && s.simbolo ? `<div class="simbolo"><small><span>${esc(s.simboloN ?? "")}</span><span>${esc(s.simboloTag ?? "Santaluz · BA")}</span></small><b style="font-size:${String(s.simbolo).replace(/<[^>]+>/g, "").length <= 2 ? 210 : String(s.simbolo).length <= 3 ? 160 : 118}px">${s.simbolo}</b><span>${esc(s.simboloNome ?? "")}</span></div>`
    : "";
  const fundo = s.t === "foto" && fotoSlide
    ? `<div class="foto-fundo" style="background-image:url(${fotoSlide})"></div><div class="foto-veu"></div>`
    : temFoto
    ? `<div class="foto-capa" style="background-image:url(${foto})"></div><div class="veu"></div>`
    : `<div class="luz"></div><div class="grade"></div><div class="graf${s.t === "capa" || i % 3 === 0 ? "" : " esq"}"></div>${molecula(post, i, s.t === "capa")}${noite ? bokeh(post.id + i) : ""}${s.t === "capa" && !temFoto && !/arco|moldura/.test(estilo ?? "") ? capaFx() : ""}${extraCapa ?? ""}`;
  const assinatura = mostrador(i, n, noite);
  const final = s.t === "cta"
    ? `<img class="logo-centro" style="top:140px;height:104px" src="${noite ? IMG.logoDourado : IMG.logoAzul}" alt=""><span class="unidade">Santaluz · BA</span><p class="aviso">${esc(post.aviso ?? "Conteúdo informativo. Não substitui a orientação do seu médico ou farmacêutico. Toda fórmula manipulada é preparada a partir da sua prescrição.")}</p>`
    : "";
  const arraste = s.t === "capa" ? `<span class="arraste">Arraste ${ICONE.seta}</span>` : "";
  const area = `<div class="camera"><div class="area${s.alto ? " alto" : ""}"${s.t === "cta" ? ' style="top:310px;bottom:250px"' : ""}><div class="fit">${corpoSlide(post, s, i, n)}</div></div></div>`;
  return {
    z: ZMAX[s.t] ?? 1.2,
    html: `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=block" rel="stylesheet">
<style>${CSS}${ANIMADO ? CSS_ANIM : ""}</style></head><body class="${classe}">${fundo}${topo(post, s, i, n, noite)}${area}${assinatura}${arraste}${final}${ANIMADO ? '<div class="varredura"></div>' : ""}</body></html>`,
  };
}

async function ajustar(page, zmax) {
  return await page.evaluate((zmax) => {
    const area = document.querySelector(".area"), fit = document.querySelector(".fit");
    const A = area.getBoundingClientRect(), H = A.height;
    const estoura = () => [...fit.querySelectorAll("*")].some((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.left < A.left - 4 || r.right > A.right + 4); });
    const cabe = () => fit.getBoundingClientRect().height <= H && !estoura();
    let lo = 0.6, hi = zmax;
    fit.style.zoom = hi;
    if (cabe()) return { z: hi, ok: true };
    for (let k = 0; k < 14; k++) { const m = (lo + hi) / 2; fit.style.zoom = m; if (cabe()) lo = m; else hi = m; }
    fit.style.zoom = lo;
    return { z: lo, ok: cabe(), culpado: `altura ${Math.round(fit.getBoundingClientRect().height)}/${Math.round(H)}` };
  }, zmax);
}

const QUADROS = 150, FPS = 30;
async function gravarVideo(page, destino) {
  const tmp = mkdtempSync(join(tmpdir(), "bio-slide-"));
  for (let f = 0; f < QUADROS; f++) {
    await page.evaluate((t) => document.getAnimations().forEach((a) => { a.currentTime = t; }), (f * 1000) / FPS);
    await page.screenshot({ path: join(tmp, `${String(f).padStart(4, "0")}.jpg`), type: "jpeg", quality: 98, timeout: 120000 });
  }
  execFileSync(FF, ["-v", "error", "-y", "-framerate", String(FPS), "-i", join(tmp, "%04d.jpg"), "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
    "-shortest", "-c:v", "libx264", "-preset", "slow", "-crf", "17", "-pix_fmt", "yuv420p", "-profile:v", "high", "-r", String(FPS),
    "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", destino]);
  rmSync(tmp, { recursive: true, force: true });
}

const ANIMA = new Set(["molecula", "barras", "anel", "pictograma", "palavra", "foto", "bento", "texto", "areas", "capa", "numero", "mito", "passos", "ficha", "quiz", "resposta", "compara", "cola", "lista", "cta"]);
const argv = process.argv.slice(2);
const pedidos = argv.filter((a) => !a.startsWith("--"));
const COM_VIDEO = argv.includes("--animado");
const { POSTS } = await import(pathToFileURL(join(RAIZ, "conteudo", "plano.mjs")).href);
const alvo = POSTS.filter((p) => p.formato === "carrossel" && p.slides && (pedidos.length ? pedidos.includes(p.id) : true));
if (!alvo.length) { console.error("nenhum carrossel para gerar"); process.exit(1); }

const fotoDe = (id) => {
  const f = join(RAIZ, "fotos", `${id}.png`);
  return existsSync(f) ? "data:image/png;base64," + readFileSync(f).toString("base64") : null;
};

const browser = await chromium.launch({ executablePath: CHROME, args: ["--disable-gpu", "--force-color-profile=srgb"] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
let problemas = 0;
try {
  for (const post of alvo) {
    const saida = join(RAIZ, "saida", "carrosseis", post.id);
    mkdirSync(saida, { recursive: true });
    for (const f of readdirSync(saida)) if (f.endsWith(".png") || (COM_VIDEO && f.endsWith(".mp4"))) rmSync(join(saida, f));
    const foto = fotoDe(post.id), zs = [];
    for (const [i, s] of post.slides.entries()) {
      ANIMADO = COM_VIDEO && s.anima !== false && ANIMA.has(s.t);
      const { html, z } = slideHtml(post, s, i, post.slides.length, foto);
      await page.setContent(html, { waitUntil: "networkidle", timeout: 120000 });
      const ok = await page.evaluate(async () => {
        await Promise.all(["200 40px Poppins", "300 40px Poppins", "400 40px Poppins", "500 40px Poppins", "600 40px Poppins", "700 40px Poppins"].map((f) => document.fonts.load(f)));
        return document.fonts.check("300 40px Poppins") && document.fonts.check("600 40px Poppins");
      });
      if (!ok) throw new Error("a fonte Poppins não carregou (precisa de internet)");
      if (ANIMADO) await page.evaluate(() => document.getAnimations().forEach((a) => { a.pause(); a.currentTime = 60000; }));
      const r = await ajustar(page, z);
      zs.push(r.z.toFixed(2));
      if (!r.ok) { console.warn(`  ATENÇÃO: texto passa da área em ${post.id} slide ${i + 1} (${r.culpado})`); problemas++; }
      await page.screenshot({ path: join(saida, `${dois(i + 1)}.png`), timeout: 120000 });
      if (ANIMADO) { const t = Date.now(); await gravarVideo(page, join(saida, `${dois(i + 1)}.mp4`)); console.log(`  slide ${i + 1}: vídeo em ${Math.round((Date.now() - t) / 1000)} s`); }
    }
    console.log(`ok ${post.id}: ${post.slides.length} slides · zoom ${zs.join(" ")}`);
  }
} finally {
  await browser.close();
}
if (problemas) { console.error(`${problemas} slide(s) com texto vazando`); process.exitCode = 1; }
