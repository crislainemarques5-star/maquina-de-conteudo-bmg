/**
 * Fila única de fotos no ChatGPT (uma de cada vez; duas ao mesmo tempo no mesmo Chrome travam as duas).
 * Pula as que já existem em fotos/ e tenta de novo, em conversa nova, a que falhar.
 *
 *   node motor/fila-fotos.mjs <id> [<id>...]     (pedido em conteudo/fotos/<id>.txt; Chrome do estúdio, porta CDP_PORTA ou 9344)
 * Não use o Claude Design nem outra aba desse Chrome enquanto a fila roda.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { RAIZ } from "./comum.mjs";

const ids = process.argv.slice(2);
for (const id of ids) {
  for (let tentativa = 1; tentativa <= 2 && !existsSync(join(RAIZ, "fotos", `${id}.png`)); tentativa++) {
    const r = spawnSync(process.execPath, [join(RAIZ, "motor", "chatgpt.mjs"), "enviar", `--conversa=bio-${id}-t${Date.now()}`, `--texto=conteudo/fotos/${id}.txt`, "--salvar=fotos", "--imagem=1", `--prefixo=${id}`],
      { cwd: RAIZ, encoding: "utf8", timeout: 15 * 60e3, env: process.env });
    // falhou? a imagem pode ter ficado pronta na aba: resgata antes de fechar as abas
    if (!existsSync(join(RAIZ, "fotos", `${id}.png`))) spawnSync(process.execPath, [join(RAIZ, "motor", "resgatar-fotos.mjs")], { cwd: RAIZ, encoding: "utf8", timeout: 10 * 60e3, env: process.env });
    const ok = existsSync(join(RAIZ, "fotos", `${id}.png`));
    const erro = (r.stderr || "").split("\n").filter((l) => /Error|erro|esgotado/i.test(l)).slice(0, 2).join(" | ");
    console.log(`${new Date().toLocaleTimeString("pt-BR")} ${id} tentativa ${tentativa}: ${ok ? "ok" : "falhou " + erro}`);
    // fecha as abas antigas do ChatGPT (cada imagem abre uma; acumuladas, deixam o Chrome lento e dão "tempo esgotado")
    try {
      const porta = process.env.CDP_PORTA ?? 9344;
      const abas = (await (await fetch(`http://127.0.0.1:${porta}/json/list`)).json()).filter((t) => t.type === "page" && t.url.startsWith("https://chatgpt.com"));
      for (const t of abas.slice(1)) await fetch(`http://127.0.0.1:${porta}/json/close/${t.id}`);
    } catch {}
  }
}
console.log("fila concluída");
