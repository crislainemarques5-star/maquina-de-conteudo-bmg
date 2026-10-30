/**
 * Microreels de texto animado da Biomagistral Santaluz-BA (1080×1920, 30 fps, 10 a 30 s), com efeitos sonoros
 * nas trocas de cena e música por baixo. Mesma linguagem visual dos carrosséis (design-system/DESIGN.md).
 *
 *   node motor/microreel.mjs <id> [<id>...] [--rapido]   (--rapido: só o quadro final de cada cena, em PNG)
 *
 * Post no conteudo/plano.mjs com formato "microreel" e cenas: [{ t, dur, ... }]:
 *   gancho  { eyebrow, titulo, sub }          título entra palavra por palavra (a 1ª cena vira a capa do reel)
 *   texto   { eyebrow, titulo, corpo }
 *   numero  { eyebrow, numero, unidade, titulo }   número sobe contando (inteiro) ou aparece (com vírgula)
 *   lista   { eyebrow, titulo, itens: [..] }  itens entram um a um
 *   final   { titulo }                        logo, WhatsApp, entrega grátis, Santaluz-BA e o aviso
 * Campo do post: musica (arquivo em musicas/), foto (fotos/<id>.png entra atrás do gancho).
 */
import { mkdirSync, readFileSync, existsSync, rmSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir, homedir } from "node:os";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { RAIZ, ffmpegPath } from "./comum.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright-core");
const CHROME = process.env.CHROME_EXE ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const FF = ffmpegPath() ?? "ffmpeg";
const FPS = 30;
const DOWNLOADS = join(homedir(), "Downloads"); // onde se baixam os vídeos do Runway
const WA = "(75) 99878-6349";
const png = (f) => "data:image/png;base64," + readFileSync(join(RAIZ, "marca", "logo", f)).toString("base64");
const IMG = { logo: png("logo-dourado-site-limpo.png"), icone: png("icone-dourado-site.png"), graf: png("grafismo-icone-branco.png") };
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const md = (s) => esc(s).replace(/\*\*([\s\S]+?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");

const CSS = `
:root{--noite:#0F1C2C;--ouro:linear-gradient(100deg,#F4F2BE 0%,#D9C78E 22%,#A07F45 50%,#D9C78E 78%,#F4F2BE 100%);--verde:#25A35A}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden;background:var(--noite);font-family:Poppins,sans-serif;color:#fff;-webkit-font-smoothing:antialiased}
.fundo{position:absolute;inset:0;background:radial-gradient(70% 40% at 85% 10%,rgba(160,127,69,.22),transparent 70%),radial-gradient(80% 50% at 0% 100%,rgba(20,38,57,.95),transparent 70%),var(--noite)}
.grade{position:absolute;inset:0;background-image:linear-gradient(rgba(244,242,190,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(244,242,190,.04) 1px,transparent 1px);background-size:60px 60px;
  -webkit-mask:radial-gradient(120% 80% at 30% 30%,#000,transparent 75%);mask:radial-gradient(120% 80% at 30% 30%,#000,transparent 75%)}
.graf{position:absolute;width:1300px;height:1494px;right:-420px;top:-160px;-webkit-mask:url(${IMG.graf}) center/contain no-repeat;mask:url(${IMG.graf}) center/contain no-repeat;
  background:linear-gradient(135deg,rgba(160,127,69,.08),rgba(244,242,190,.14) 50%,rgba(160,127,69,.06));animation:graf 30s linear both}
@keyframes graf{from{transform:translateY(0) rotate(0)}to{transform:translateY(-80px) rotate(-4deg)}}
.foto{position:absolute;inset:0;background-size:cover;background-position:center;animation:kb var(--dur) linear both}
@keyframes kb{from{transform:scale(1.12)}to{transform:scale(1)}}
.veu{position:absolute;inset:0;background:linear-gradient(0deg,var(--noite) 0%,rgba(15,28,44,.9) 42%,rgba(15,28,44,.25) 68%,rgba(15,28,44,.85) 100%)}
.mol{position:absolute;z-index:0;color:#EADBA0;opacity:.34;pointer-events:none;filter:drop-shadow(0 0 12px rgba(244,242,190,.3))}
.mol svg{width:100%;height:100%;overflow:visible}
.mol path[pathLength]{stroke-width:4.4px !important;stroke-linecap:round !important}
.mol-reel{width:1500px;height:1500px;right:-560px;top:120px;rotate:-12deg;opacity:.42}
.mol path[pathLength]{stroke-dasharray:1;animation:liga 2.2s calc(.2s + var(--k) * .05s) cubic-bezier(.45,0,.2,1) both}@keyframes liga{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
.mol path:not([pathLength]){animation:atomo .9s 1.6s ease-out both}@keyframes atomo{from{opacity:0}}
.mol-reel{animation:mol-deriva var(--dur) linear both}@keyframes mol-deriva{from{transform:translateY(60px) scale(1.06)}to{transform:translateY(-120px) scale(1)}}
.plexo{position:absolute;inset:0;width:1080px;height:1920px;-webkit-mask:radial-gradient(75% 45% at 80% 22%,#000,transparent 80%);mask:radial-gradient(75% 45% at 80% 22%,#000,transparent 80%)}
.plexo line{stroke-dasharray:1;animation:desenha 2.4s calc(var(--k) * .03s) ease-out both}@keyframes desenha{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
.plexo circle{animation:pisca 3s calc(.6s + var(--k) * .08s) ease-in-out both}@keyframes pisca{0%{opacity:0}50%{opacity:1}100%{opacity:.8}}
.plexo .hub{filter:drop-shadow(0 0 8px #F4F2BE)}
.bokeh i{position:absolute;border-radius:50%;background:radial-gradient(circle at 35% 30%,#FFFBE6,#E6CF86 45%,rgba(160,127,69,.2) 75%);animation:sobe-b 30s linear both}
@keyframes sobe-b{from{transform:translateY(80px)}to{transform:translateY(-260px)}}
.topo{position:absolute;top:120px;left:80px;right:80px;display:flex;justify-content:space-between;align-items:center;z-index:9}
.topo img{height:66px}
.topo span{font:600 22px Poppins;letter-spacing:.3em;text-transform:uppercase;background:var(--ouro);-webkit-background-clip:text;background-clip:text;color:transparent}
.barra{position:absolute;left:80px;right:80px;top:210px;height:3px;border-radius:3px;background:rgba(244,242,190,.14);z-index:9;overflow:hidden}
.barra i{position:absolute;inset:0;background:var(--ouro);transform-origin:left;animation:progresso var(--dur) linear both}
@keyframes progresso{from{transform:scaleX(0)}}
.cena{position:absolute;left:80px;right:110px;top:300px;bottom:420px;display:flex;flex-direction:column;justify-content:center;gap:40px;z-index:5;
  animation:cena-in .7s cubic-bezier(.16,1,.3,1) var(--t0) both,cena-out .45s ease-in calc(var(--t1) - .45s) forwards}
@keyframes cena-in{from{opacity:0;transform:scale(1.32);filter:blur(14px)}}
@keyframes cena-out{from{opacity:1}to{opacity:0;transform:scale(.8);filter:blur(16px)}}
.cena.ultima{animation:cena-in .7s cubic-bezier(.16,1,.3,1) var(--t0) both}
.eyebrow{display:flex;align-items:center;gap:18px;font:700 36px Poppins;letter-spacing:.26em;text-transform:uppercase;color:#E8DDA8}
.eyebrow::before{content:"";width:60px;height:2px;background:var(--ouro)}
h1{font:300 142px/.98 Poppins;letter-spacing:-.04em}
h2{font:300 124px/1 Poppins;letter-spacing:-.035em}
h1 b,h2 b{font-weight:800}
h1 b .p,h2 b .p{background:var(--ouro);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;padding-bottom:.08em;
  animation:palavra .55s cubic-bezier(.16,1,.3,1) calc(var(--t0) + .15s + var(--k) * .09s) both,brilho 2.2s ease-out calc(var(--t0) + .6s) both}
@keyframes brilho{from{background-position:100% 0}to{background-position:0 0}}
.p{display:inline-block;animation:palavra .55s cubic-bezier(.16,1,.3,1) calc(var(--t0) + .15s + var(--k) * .09s) both}
@keyframes palavra{from{opacity:0;transform:translateY(36px);filter:blur(8px)}}
.sub,.corpo{font:400 58px/1.32 Poppins;color:rgba(255,255,255,.9)}
.corpo b,.sub b{color:#fff;font-weight:600}
.sub{animation:entra .7s cubic-bezier(.16,1,.3,1) calc(var(--t0) + .9s) both}
.corpo{animation:entra .7s cubic-bezier(.16,1,.3,1) calc(var(--t0) + .5s) both}
@keyframes entra{from{opacity:0;transform:translateY(30px)}}
.numero{display:flex;align-items:flex-end;gap:24px;flex-wrap:wrap}
.numero .n{font:200 300px/.85 Poppins;letter-spacing:-.05em;background:var(--ouro);-webkit-background-clip:text;background-clip:text;color:transparent}
@property --c{syntax:'<integer>';inherits:false;initial-value:0}
.numero .n.conta{counter-reset:c var(--c);animation:conta 1.6s cubic-bezier(.2,.7,.2,1) calc(var(--t0) + .3s) both}
.numero .n.conta::after{content:counter(c)}
@keyframes conta{from{--c:0}to{--c:var(--alvo)}}
.numero small{font:500 46px/1.2 Poppins;color:rgba(255,255,255,.75);padding-bottom:30px;max-width:520px}
.itens{display:flex;flex-direction:column;gap:26px}
.it{display:grid;grid-template-columns:72px 1fr;gap:26px;align-items:center;padding:26px 30px;border-radius:26px;background:rgba(255,255,255,.05);border:1px solid rgba(244,242,190,.16);
  font:500 54px/1.22 Poppins;animation:lado .6s cubic-bezier(.16,1,.3,1) calc(var(--t0) + .45s + var(--k) * .45s) both}
.it i{width:64px;height:64px;border-radius:50%;background:var(--ouro);display:grid;place-items:center}
.it i svg{width:34px;height:34px}
@keyframes lado{from{opacity:0;transform:translateX(-50px)}}
.fim-logo{height:120px;align-self:center;animation:entra .8s cubic-bezier(.16,1,.3,1) calc(var(--t0) + .1s) both}
.unidade{align-self:center;font:500 26px Poppins;letter-spacing:.34em;text-transform:uppercase;color:#E8DDA8;animation:entra .8s calc(var(--t0) + .3s) both}
.botao{align-self:center;display:inline-flex;align-items:center;gap:24px;border-radius:999px;padding:32px 52px 32px 36px;background:var(--verde);font:600 46px Poppins;box-shadow:0 26px 60px rgba(37,163,90,.4);
  animation:entra .8s cubic-bezier(.16,1,.3,1) calc(var(--t0) + .7s) both,pulsa 1.4s ease-in-out calc(var(--t0) + 1.6s) 3}
@keyframes pulsa{50%{transform:scale(1.05)}}
.botao svg{width:66px;height:66px}.botao span{display:flex;flex-direction:column;line-height:1.1}.botao small{font:400 30px Poppins;opacity:.92;margin-top:8px}
.selos{align-self:center;display:flex;gap:16px;flex-wrap:wrap;justify-content:center;animation:entra .8s calc(var(--t0) + 1s) both}
.selos span{font:500 30px Poppins;padding:14px 26px;border-radius:999px;border:1px solid rgba(244,242,190,.3);color:rgba(255,255,255,.9)}
.aviso{position:absolute;left:90px;right:90px;bottom:300px;text-align:center;font:400 22px/1.45 Poppins;color:rgba(255,255,255,.68);z-index:9;animation:entra .8s calc(var(--t0) + 1.2s) both}
.final h2{text-align:center}
.palavra{font:800 300px/1.05 Poppins;letter-spacing:-.055em;white-space:nowrap;padding-top:.06em;background:var(--ouro);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;
  animation:palavra-z 1.6s cubic-bezier(.16,1,.3,1) var(--t0) both,brilho 2.4s ease-out calc(var(--t0) + .8s) both}
@keyframes palavra-z{from{transform:scale(2.6);opacity:0;filter:blur(18px)}}
.palavra-sub{font:300 76px/1.1 Poppins;letter-spacing:-.02em;animation:entra .8s calc(var(--t0) + 1s) both}.palavra-sub b{font-weight:800}
.barras{display:flex;flex-direction:column;gap:46px;width:100%}
.barra-l .rot{display:flex;justify-content:space-between;align-items:baseline;gap:20px}
.barra-l .rot span{font:600 50px/1.2 Poppins}
.barra-l .rot b{font:200 110px/1 Poppins;letter-spacing:-.04em}
.barra-l.dest .rot b{font-weight:300;background:var(--ouro);-webkit-background-clip:text;background-clip:text;color:transparent}
.barra-l .trilho{position:relative;height:40px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;margin-top:14px}
.barra-l .enche{position:absolute;inset:0;width:var(--v);border-radius:999px;background:rgba(255,255,255,.35);transform-origin:left;animation:cresce 1.6s calc(var(--t0) + .5s + var(--k) * .4s) cubic-bezier(.22,1,.36,1) both}
.barra-l.dest .enche{background:var(--ouro);box-shadow:0 0 34px rgba(244,242,190,.45)}
@keyframes cresce{from{transform:scaleX(0)}}
.barra-l{animation:entra .7s calc(var(--t0) + .3s + var(--k) * .4s) cubic-bezier(.16,1,.3,1) both}
.anel{position:relative;width:640px;height:640px;align-self:center}
.anel svg{width:640px;height:640px;transform:rotate(-90deg)}
.anel .arco-a{animation:anel 2s calc(var(--t0) + .3s) cubic-bezier(.22,1,.36,1) both}@keyframes anel{from{stroke-dasharray:0 100}}
.anel .num{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.anel .num b{font:200 230px/.9 Poppins;letter-spacing:-.05em;background:var(--ouro);-webkit-background-clip:text;background-clip:text;color:transparent;animation:entra .9s calc(var(--t0) + .8s) both}
.anel .num small{font:600 28px Poppins;letter-spacing:.2em;text-transform:uppercase;color:#E8DDA8;margin-top:10px}
.picto{display:grid;grid-template-columns:repeat(10,1fr);gap:22px;width:100%}
.picto i{aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,.12);animation:surge .4s calc(var(--t0) + var(--j) * .006s) both}@keyframes surge{from{opacity:0}}
.picto i.on{background:var(--ouro);box-shadow:0 0 22px rgba(244,242,190,.7);animation:acende .5s calc(var(--t0) + .8s + var(--k) * .15s) cubic-bezier(.3,1.5,.5,1) both}@keyframes acende{from{transform:scale(0)}}
.foto-cena{position:absolute;inset:0;background-size:cover;background-position:center;z-index:2;animation:foto-in .6s var(--t0) both,kb3 var(--d) linear var(--t0) both,cena-out .5s ease-in calc(var(--t1) - .45s) forwards}
@keyframes foto-in{from{opacity:0}}@keyframes kb3{from{transform:scale(1.25)}to{transform:scale(1.04)}}
.video-cena{animation:foto-in .6s var(--t0) both,cena-out .5s ease-in calc(var(--t1) - .45s) forwards}
.video-cena video{width:100%;height:100%;object-fit:cover}
.foto-cena::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(15,28,44,.95) 0%,rgba(15,28,44,.55) 40%,rgba(15,28,44,.1) 70%,rgba(15,28,44,.5) 100%)}
.cena.sobre-foto{justify-content:flex-end;bottom:460px;z-index:6}
.fundo-claro{position:absolute;inset:0;z-index:3;background:radial-gradient(70% 45% at 85% 8%,rgba(244,242,190,.7),transparent 70%),#F3F5F8;
  opacity:0;animation:claro-on .01s var(--t0) forwards,claro-off .01s var(--t1) forwards}
@keyframes claro-on{to{opacity:1}}@keyframes claro-off{to{opacity:0}}
.cena.clara{color:#0F1C2C}
.cena.clara .eyebrow{color:#7E6131}
.cena.clara .sub,.cena.clara .corpo{color:#4F5D70}
.cena.clara h1 b .p,.cena.clara h2 b .p{background:none;-webkit-text-fill-color:#0F1C2C;color:#0F1C2C}
.cena.clara .palavra{background:linear-gradient(100deg,#0F1C2C,#2A4060 50%,#0F1C2C);-webkit-background-clip:text;background-clip:text}
.cena.clara .barra-l .trilho{background:rgba(15,28,44,.1)}.cena.clara .barra-l .enche{background:rgba(15,28,44,.35)}
.cena.clara .picto i{background:rgba(15,28,44,.12)}
.cena.clara .it{background:#fff;border-color:rgba(15,28,44,.12)}
.palavra.textura{background-size:cover;background-position:center;-webkit-background-clip:text;background-clip:text;color:transparent;filter:saturate(1.2) brightness(1.15)}
.mol-cena{position:relative;width:860px;height:860px;align-self:center;color:#F4F2BE;filter:drop-shadow(0 0 22px rgba(244,242,190,.45));
  animation:mol-gira 4s cubic-bezier(.2,.7,.2,1) var(--t0) both}
@keyframes mol-gira{from{transform:rotate(-14deg) scale(.82)}to{transform:none}}
.mol-cena svg{width:100%;height:100%;overflow:visible}
.mol-cena path[pathLength]{stroke-width:5px !important;stroke-linecap:round !important;stroke-dasharray:1;animation:liga2 1.8s calc(var(--t0) + .2s + var(--k) * .045s) cubic-bezier(.45,0,.2,1) both}
@keyframes liga2{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
.mol-cena path:not([pathLength]){animation:atomo2 .8s calc(var(--t0) + 1.6s) ease-out both}@keyframes atomo2{from{opacity:0}}
.mol-nome{text-align:center;font:300 96px/1 Poppins;letter-spacing:-.03em;animation:entra .8s calc(var(--t0) + 1.2s) both}
.mol-nome b{font-weight:800;background:var(--ouro);-webkit-background-clip:text;background-clip:text;color:transparent}
.mol-sub{text-align:center;font:400 52px/1.3 Poppins;color:rgba(255,255,255,.88);animation:entra .8s calc(var(--t0) + 1.5s) both}
.elemento{align-self:center;width:640px;height:720px;border:2px solid rgba(244,242,190,.6);border-radius:40px;padding:44px 50px;display:flex;flex-direction:column;justify-content:space-between;
  background:linear-gradient(160deg,rgba(20,38,57,.95),rgba(15,28,44,.9));box-shadow:0 40px 90px rgba(0,0,0,.5),inset 0 0 60px rgba(244,242,190,.06);
  animation:el-zoom 1.6s cubic-bezier(.16,1,.3,1) var(--t0) both}
@keyframes el-zoom{from{transform:scale(2.4);opacity:0;filter:blur(16px)}}
.elemento .topo-el{display:flex;justify-content:space-between;font:500 40px Poppins;color:#E8DDA8}
.elemento b{font:200 300px/1.1 Poppins;padding-bottom:.04em;letter-spacing:-.04em;background:var(--ouro);-webkit-background-clip:text;background-clip:text;color:transparent}
.elemento span{font:600 56px Poppins}
.reflexo{position:absolute;inset:-20%;z-index:8;pointer-events:none;background:linear-gradient(115deg,transparent 40%,rgba(255,251,230,.0) 44%,rgba(255,251,230,.35) 50%,rgba(255,251,230,0) 56%,transparent 60%);
  transform:translateX(-120%);animation:varre .9s cubic-bezier(.45,0,.25,1) var(--tc) both}
@keyframes varre{to{transform:translateX(120%)}}
`;
const CHECK = `<svg viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="#0F1C2C" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ZAP = `<svg viewBox="0 0 32 32"><path fill="#fff" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6c-2 0-3.9-.5-5.6-1.5l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.8 5.1 2.1.9 3 1 4 .8.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>`;

// título que entra palavra por palavra (o **destaque** continua dourado)
function palavras(titulo) {
  let k = 0;
  return md(titulo).split(/(<br>|<b>|<\/b>)/).map((pedaco) => (/^<\/?b>$|^<br>$/.test(pedaco) ? pedaco
    : pedaco.split(/(\s+)/).map((w) => (w.trim() ? `<span class="p" style="--k:${k++}">${w}</span>` : w)).join(""))).join("");
}

function cenaHtml(c, t0, t1, ultima) {
  const st = `style="--t0:${t0}s;--t1:${t1}s"`;
  const eb = c.eyebrow ? `<div class="eyebrow">${esc(c.eyebrow)}</div>` : "";
  let corpo = "";
  if (c.t === "gancho") corpo = `${eb}<h1>${palavras(c.titulo)}</h1>${c.sub ? `<p class="sub">${md(c.sub)}</p>` : ""}`;
  else if (c.t === "texto") corpo = `${eb}<h2>${palavras(c.titulo)}</h2>${c.corpo ? `<p class="corpo">${md(c.corpo)}</p>` : ""}`;
  else if (c.t === "numero") {
    const inteiro = /^\d+$/.test(String(c.numero));
    corpo = `${eb}<div class="numero">${inteiro ? `<span class="n conta" style="--alvo:${c.numero}"></span>` : `<span class="n">${esc(c.numero)}</span>`}${c.unidade ? `<small>${esc(c.unidade)}</small>` : ""}</div>${c.titulo ? `<h2>${palavras(c.titulo)}</h2>` : ""}`;
  } else if (c.t === "lista") corpo = `${eb}${c.titulo ? `<h2>${palavras(c.titulo)}</h2>` : ""}<div class="itens">${c.itens.map((it, k) => `<div class="it" style="--k:${k}"><i>${CHECK}</i><span>${md(it)}</span></div>`).join("")}</div>`;
  else if (c.t === "palavra") {
    const tam = Math.min(300, Math.floor(890 / (String(c.palavra).length * 0.62)));
    const tex = c.textura && existsSync(join(RAIZ, "fotos", c.textura)) ? `;background-image:url(data:image/png;base64,${readFileSync(join(RAIZ, "fotos", c.textura)).toString("base64")})` : "";
    corpo = `${eb}<div class="palavra${tex ? " textura" : ""}" style="font-size:${tam}px${tex}">${esc(c.palavra)}</div>${c.titulo ? `<p class="palavra-sub">${md(c.titulo)}</p>` : ""}`;
  } else if (c.t === "barras") {
    const max = c.max ?? Math.max(...c.itens.map((i) => i[1]));
    corpo = `${eb}${c.titulo ? `<h2>${palavras(c.titulo)}</h2>` : ""}<div class="barras">${c.itens.map(([rot, v, txt, dest], k) => `<div class="barra-l${dest ? " dest" : ""}" style="--k:${k}"><div class="rot"><span>${md(rot)}</span><b>${esc(txt ?? v)}</b></div><div class="trilho"><i class="enche" style="--k:${k};--v:${Math.max(3, (v / max) * 100).toFixed(1)}%"></i></div></div>`).join("")}</div>`;
  } else if (c.t === "anel") {
    corpo = `<div class="anel"><svg viewBox="0 0 100 100"><defs><linearGradient id="ag" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4F2BE"/><stop offset=".55" stop-color="#A07F45"/><stop offset="1" stop-color="#F4F2BE"/></linearGradient></defs><circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="4.5"/><circle class="arco-a" cx="50" cy="50" r="44" fill="none" stroke="url(#ag)" stroke-width="5" stroke-linecap="round" pathLength="100" stroke-dasharray="${c.porcento} 100"/></svg><div class="num"><b>${esc(c.numero)}</b>${c.legenda ? `<small>${esc(c.legenda)}</small>` : ""}</div></div>${c.titulo ? `<h2 style="text-align:center">${palavras(c.titulo)}</h2>` : ""}`;
  } else if (c.t === "pictograma") {
    corpo = `${eb}${c.titulo ? `<h2>${palavras(c.titulo)}</h2>` : ""}<div class="picto">${Array.from({ length: 100 }, (_, j) => `<i class="${j < c.on ? "on" : ""}" style="--j:${j};--k:${j}"></i>`).join("")}</div>`;
  } else if (c.t === "foto") {
    corpo = `${eb}${c.titulo ? `<h2>${palavras(c.titulo)}</h2>` : ""}${c.corpo ? `<p class="corpo">${md(c.corpo)}</p>` : ""}`;
  } else if (c.t === "molecula") {
    const svg = c.molecula ? molNome(c.molecula) : molSvg(c.molId ?? "");
    corpo = `${eb}<div class="mol-cena">${svg ?? ""}</div>${c.titulo ? `<p class="mol-nome">${md(c.titulo)}</p>` : ""}${c.sub ? `<p class="mol-sub">${md(c.sub)}</p>` : ""}`;
  } else if (c.t === "elemento") {
    corpo = `<div class="elemento"><div class="topo-el"><span>${esc(c.numero)}</span><span>${esc(c.massa ?? "")}</span></div><b>${esc(c.simbolo)}</b><span>${esc(c.nome)}</span></div>${c.titulo ? `<h2 style="text-align:center">${palavras(c.titulo)}</h2>` : ""}`;
  } else if (c.t === "final") corpo = `<img class="fim-logo" src="${IMG.logo}" alt=""><span class="unidade">Santaluz · BA</span>${c.titulo ? `<h2>${palavras(c.titulo)}</h2>` : ""}
    <span class="botao">${ZAP}<span>Chame no WhatsApp<small>${WA} · avaliação personalizada</small></span></span><div class="selos"><span>Entrega grátis para toda a Bahia</span></div>`;
  else throw new Error(`cena desconhecida: ${c.t}`);
  const fundoClaro = c.claro ? `<div class="fundo-claro" style="--t0:${t0}s;--t1:${t1}s"></div>` : "";
  // c.video (Runway): o vídeo entra no lugar da foto; sem o vídeo ainda, fica a imagem inicial (c.foto) com zoom lento
  const video = c.t === "foto" && c.video ? [join(RAIZ, "fotos", c.video), join(DOWNLOADS, c.video)].find((f) => existsSync(f)) : null;
  const fotoCena = video ? `<div class="foto-cena video-cena" style="--t0:${t0}s;--t1:${t1}s"><video muted preload="auto" data-t0="${t0}" data-span="${t1 - t0}" data-inicio="${c.videoInicio ?? 0}" src="data:video/mp4;base64,${readFileSync(video).toString("base64")}"></video></div>`
    : c.t === "foto" && c.foto && existsSync(join(RAIZ, "fotos", c.foto)) ? `<div class="foto-cena" style="--t0:${t0}s;--t1:${t1}s;--d:${(t1 - t0 + 0.5).toFixed(2)}s;background-image:url(data:image/png;base64,${readFileSync(join(RAIZ, "fotos", c.foto)).toString("base64")})"></div>` : "";
  return `${fundoClaro}${fotoCena}<section class="cena${c.claro ? " clara" : ""}${ultima ? " ultima" : ""}${c.t === "final" ? " final" : ""}${c.t === "foto" ? " sobre-foto" : ""}" ${st}>${corpo}</section>`;
}

function rng(seed) { let x = 0; for (const ch of String(seed)) x = (x * 31 + ch.charCodeAt(0)) >>> 0; return () => ((x = (x * 1664525 + 1013904223) >>> 0) / 4294967296); }


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
function plexo(seed) {
  const r = rng(seed + "p"), n = 30, nos = Array.from({ length: n }, () => [r() * 1080, r() * 1920, r()]);
  let linhas = "", k = 0;
  for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) { const d = Math.hypot(nos[a][0] - nos[b][0], nos[a][1] - nos[b][1]); if (d < 260) linhas += `<line pathLength="1" style="--k:${k++}" x1="${nos[a][0].toFixed(1)}" y1="${nos[a][1].toFixed(1)}" x2="${nos[b][0].toFixed(1)}" y2="${nos[b][1].toFixed(1)}" stroke-opacity="${(0.26 * (1 - d / 260) + 0.04).toFixed(3)}"/>`; }
  const pts = nos.map(([x, y, z], j) => `<circle style="--k:${j}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${z > 0.85 ? 5 : 2.6}"${z > 0.85 ? ' class="hub"' : ""}/>`).join("");
  return `<svg class="plexo" viewBox="0 0 1080 1920"><g stroke="#F4F2BE" stroke-width="1.2">${linhas}</g><g fill="#F4F2BE">${pts}</g></svg>`;
}

function paginaHtml(post) {
  const dur = post.cenas.reduce((a, c) => a + c.dur, 0);
  let t = 0;
  const cenas = post.cenas.map((c, i) => { const h = cenaHtml(c, t, t + c.dur, i === post.cenas.length - 1); t += c.dur; return h; }).join("");
  const cortes = []; t = 0;
  for (const c of post.cenas.slice(0, -1)) { t += c.dur; cortes.push(t); }
  const r = rng(post.id);
  const bokeh = Array.from({ length: 7 }, () => { const s = 60 + r() * 120; return `<i style="left:${(r() * 100).toFixed(1)}%;top:${(r() * 100).toFixed(1)}%;width:${s.toFixed(0)}px;height:${s.toFixed(0)}px;opacity:${(0.06 + r() * 0.14).toFixed(2)};filter:blur(${(s / 3).toFixed(1)}px)"></i>`; }).join("");
  const arqFoto = join(RAIZ, "fotos", post.fotoArquivo ?? `${post.id}.png`);
  const foto = post.fotoFundo && existsSync(arqFoto) ? "data:image/png;base64," + readFileSync(arqFoto).toString("base64") : null;
  const final = post.cenas.at(-1).t === "final";
  const tFinal = dur - post.cenas.at(-1).dur;
  return {
    dur, cortes,
    html: `<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=block" rel="stylesheet">
<style>${CSS}</style></head><body style="--dur:${dur}s">
<div class="fundo"></div>${foto ? `<div class="foto" style="background-image:url(${foto});animation-duration:${post.cenas[0].dur + 0.5}s"></div><div class="veu" style="animation:cena-out .6s ease-in ${post.cenas[0].dur - 0.5}s forwards"></div>` : ""}
<div class="grade"></div>${molSvg(post.id) ? `<div class="mol mol-reel">${molSvg(post.id)}</div>` : ""}<div class="graf"></div><div class="bokeh">${bokeh}</div>
<div class="topo"><img src="${IMG.icone}" alt=""><span>Santaluz · BA</span></div><div class="barra"><i></i></div>
${cenas}${cortes.map((tc) => `<div class="reflexo" style="--tc:${tc - 0.35}s"></div>`).join("")}
${final ? `<p class="aviso" style="--t0:${tFinal}s">Conteúdo informativo. Não substitui a orientação do seu médico ou farmacêutico.</p>` : ""}
</body></html>`,
  };
}

// efeitos sonoros (feitos no ffmpeg) + música por baixo, mixados e nivelados em −14 LUFS
function audio(post, dur, cortes, destino) {
  const tmp = mkdtempSync(join(tmpdir(), "bio-som-"));
  const ff = (a) => execFileSync(FF, ["-v", "error", "-y", ...a]);
  const whoosh = join(tmp, "w.wav"), pop = join(tmp, "p.wav"), brilho = join(tmp, "b.wav");
  ff(["-f", "lavfi", "-i", "anoisesrc=color=pink:duration=0.7:amplitude=0.9:seed=11", "-af", "highpass=f=400,lowpass=f=5200,afade=t=in:d=0.3:curve=qsin,afade=t=out:st=0.3:d=0.4:curve=qsin,volume=0.5", whoosh]);
  ff(["-f", "lavfi", "-i", "sine=f=988:d=0.14", "-f", "lavfi", "-i", "sine=f=1480:d=0.14", "-filter_complex", "[0][1]amix=2,afade=t=out:st=0.01:d=0.13:curve=exp,volume=0.45", pop]);
  ff(["-f", "lavfi", "-i", "sine=f=1760:d=1.6", "-f", "lavfi", "-i", "sine=f=2637:d=1.6", "-f", "lavfi", "-i", "sine=f=3520:d=1.6", "-filter_complex", "[0][1][2]amix=3,tremolo=f=9:d=0.5,afade=t=in:d=0.08,afade=t=out:st=0.3:d=1.3,volume=0.32", brilho]);
  const ev = [[0.15, pop], ...cortes.map((t) => [t - 0.4, whoosh]), ...cortes.map((t) => [t + 0.2, pop]), [dur - post.cenas.at(-1).dur + 0.8, brilho]];
  const ins = ev.flatMap(([, f]) => ["-i", f]);
  const fil = ev.map(([t], k) => `[${k}]adelay=${Math.max(0, Math.round(t * 1000))}|${Math.max(0, Math.round(t * 1000))}[e${k}]`).join(";") + ";" + ev.map((_, k) => `[e${k}]`).join("") + `amix=inputs=${ev.length}:normalize=0,apad=whole_dur=${dur}[ef]`;
  const efeitos = join(tmp, "efeitos.wav");
  ff([...ins, "-filter_complex", fil, "-map", "[ef]", "-t", String(dur), efeitos]);
  const mus = post.musica && existsSync(join(RAIZ, "musicas", post.musica)) ? join(RAIZ, "musicas", post.musica) : null;
  const mix = join(tmp, "mix.wav");
  if (mus) ff(["-ss", String(post.musicaInicio ?? 0), "-i", mus, "-i", efeitos, "-filter_complex",
    `[0]atrim=0:${dur},afade=t=in:d=0.4,afade=t=out:st=${dur - 1.4}:d=1.4,volume=1[m];[1]volume=1.7[e];[m][e]amix=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[o]`, "-map", "[o]", "-t", String(dur), mix]);
  else ff(["-i", efeitos, "-af", "loudnorm=I=-16:TP=-1.5", "-t", String(dur), mix]);
  ff(["-i", destino + ".mudo.mp4", "-i", mix, "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", "-shortest", "-movflags", "+faststart", destino]);
  rmSync(tmp, { recursive: true, force: true });
  rmSync(destino + ".mudo.mp4", { force: true });
}

const argv = process.argv.slice(2);
const ids = argv.filter((a) => !a.startsWith("--"));
const RAPIDO = argv.includes("--rapido");
const { POSTS } = await import(pathToFileURL(join(RAIZ, "conteudo", "plano.mjs")).href);
// os do Claude Design (origem) chegam prontos em saida/microreels/: não têm cenas para gravar
const alvo = POSTS.filter((p) => p.formato === "microreel" && p.cenas && (!ids.length || ids.includes(p.id)));
if (!alvo.length) { console.error("nenhum microreel"); process.exit(1); }
const browser = await chromium.launch({ executablePath: CHROME, args: ["--disable-gpu", "--force-color-profile=srgb"] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
try {
  for (const post of alvo) {
    const { html, dur, cortes } = paginaHtml(post);
    const pasta = join(RAIZ, "saida", "microreels"); mkdirSync(pasta, { recursive: true });
    await page.setContent(html, { waitUntil: "networkidle", timeout: 120000 });
    await page.evaluate(async () => { await Promise.all(["200 40px Poppins", "300 40px Poppins", "400 40px Poppins", "600 40px Poppins", "700 40px Poppins"].map((f) => document.fonts.load(f))); });
    await page.evaluate(() => document.getAnimations().forEach((a) => a.pause()));
    await page.waitForFunction(() => [...document.querySelectorAll("video")].every((v) => v.readyState >= 2), null, { timeout: 120000 });
    // o vídeo anda junto com o quadro: se a cena for mais longa que o vídeo, ele desacelera (até 0,6×) e depois para no último quadro
    const em = (t) => page.evaluate(async (ms) => {
      document.getAnimations().forEach((a) => { a.currentTime = ms; });
      for (const v of document.querySelectorAll("video")) {
        const resto = v.duration - +v.dataset.inicio - 0.05;
        const vel = Math.min(1, Math.max(0.6, resto / +v.dataset.span));
        const alvo = +v.dataset.inicio + Math.min(resto, Math.max(0, (ms / 1000 - +v.dataset.t0) * vel));
        if (Math.abs(v.currentTime - alvo) > 0.001) await new Promise((ok) => { v.addEventListener("seeked", ok, { once: true }); v.currentTime = alvo; });
      }
      await new Promise((ok) => requestAnimationFrame(() => ok()));
    }, t * 1000);
    if (RAPIDO) {
      let t = 0;
      for (const [i, c] of post.cenas.entries()) { t += c.dur; await em(t - 0.5); await page.screenshot({ path: join(pasta, `${post.id}-cena${i + 1}.png`) }); }
      console.log(`prévia ${post.id}: ${post.cenas.length} cenas, ${dur.toFixed(1)} s`);
      continue;
    }
    const tmp = mkdtempSync(join(tmpdir(), "bio-reel-"));
    const n = Math.round(dur * FPS);
    for (let f = 0; f < n; f++) { await em(f / FPS); await page.screenshot({ path: join(tmp, `${String(f).padStart(5, "0")}.png`) }); }
    // capa do reel = fim da primeira cena (título inteiro)
    await em(post.cenas[0].dur - 0.6); await page.screenshot({ path: join(pasta, `${post.id}-capa.png`) });
    const destino = join(pasta, `${post.id}.mp4`);
    execFileSync(FF, ["-v", "error", "-y", "-framerate", String(FPS), "-i", join(tmp, "%05d.png"), "-c:v", "libx264", "-preset", "slow", "-crf", "17", "-pix_fmt", "yuv420p", "-profile:v", "high", "-r", String(FPS), destino + ".mudo.mp4"]);
    rmSync(tmp, { recursive: true, force: true });
    audio(post, dur, cortes, destino);
    console.log(`ok ${post.id}: ${dur.toFixed(1)} s · ${destino}`);
  }
} finally { await browser.close(); }
