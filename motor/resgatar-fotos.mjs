/**
 * Resgata imagens que o ChatGPT gerou mas a fila não salvou: percorre as abas do ChatGPT, identifica o pedido pelo
 * texto (conteudo/fotos/<id>.txt) e salva a última imagem grande da conversa em fotos/<id>.png, se ainda não existir.
 *   node motor/resgatar-fotos.mjs   (Chrome do estúdio: porta CDP_PORTA ou 9344)
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { RAIZ, ffmpegPath } from "./comum.mjs";
import { abas, ligar, pausa } from "./navegador.mjs";

const pedidos = readdirSync(join(RAIZ, "conteudo", "fotos")).filter((f) => f.endsWith(".txt")).map((f) => {
  const id = f.slice(0, -4);
  const txt = readFileSync(join(RAIZ, "conteudo", "fotos", f), "utf8").replace(/\s+/g, " ");
  return { id, chave: txt.replace(/^Gere uma imagem \(não responda com texto\): /, "").slice(0, 70) };
});
const lista = (await abas()).filter((a) => a.url.startsWith("https://chatgpt.com/c/"));
for (const t of lista) {
  const s = await ligar(t.webSocketDebuggerUrl);
  try {
    await s.send("Page.setWebLifecycleState", { state: "active" }, 10000).catch(() => {});
    const usuario = await s.ev(() => document.body.innerText.replace(/\s+/g, " "));
    const ped = pedidos.find((p) => usuario.includes(p.chave));
    if (!ped) { console.log("? aba sem pedido conhecido", t.url.slice(0, 60)); continue; }
    const destino = join(RAIZ, "fotos", `${ped.id}.png`);
    if (existsSync(destino)) { console.log(`= ${ped.id} já existe`); continue; }
    const r = await s.send("Runtime.evaluate", { awaitPromise: true, returnByValue: true, expression: `(async () => {
      const ims = [...document.querySelectorAll("img")].filter((i) => i.naturalWidth >= 700 && i.naturalHeight >= 700);
      if (!ims.length) return null;
      const img = ims[ims.length - 1];
      const b = await (await fetch(img.src)).blob();
      const buf = new Uint8Array(await b.arrayBuffer());
      let bin = ""; for (let k = 0; k < buf.length; k += 0x8000) bin += String.fromCharCode.apply(null, buf.subarray(k, k + 0x8000));
      return { tipo: b.type, w: img.naturalWidth, h: img.naturalHeight, b64: btoa(bin) };
    })()` }, 300000);
    const v = r.result?.value;
    if (!v) { console.log(`- ${ped.id}: sem imagem na aba (ainda gerando?)`); continue; }
    writeFileSync(destino.replace(/\.png$/, v.tipo.includes("png") ? ".png" : ".tmp"), Buffer.from(v.b64, "base64"));
    if (!v.tipo.includes("png")) {
      const { execFileSync } = await import("node:child_process");
      execFileSync(ffmpegPath() ?? "ffmpeg", ["-v", "error", "-y", "-i", destino.replace(/\.png$/, ".tmp"), destino]);
    }
    console.log(`ok ${ped.id} (${v.w}x${v.h})`);
  } catch (e) { console.log("erro", t.url.slice(0, 60), e.message); } finally { s.fechar(); }
}
await pausa(200);
process.exit(0);
