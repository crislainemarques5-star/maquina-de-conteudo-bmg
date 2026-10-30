/**
 * Baixa as trilhas dos microreels do Mixkit para musicas/ (fora do git: a licença permite usar nos vídeos, não
 * redistribuir os arquivos). Licença "Mixkit Stock Music Free License": uso comercial em rede social, sem crédito.
 *
 *   node motor/instalar-musicas.mjs            baixa as que faltam
 *   node motor/instalar-musicas.mjs 645 801    só essas
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { RAIZ } from "./comum.mjs";

// trilhas já aprovadas (pop leve, house, R&B, "vibe boa"): o plano de cada microreel escolhe uma delas em `musica`
const TRILHAS = [13, 26, 27, 40, 130, 200, 228, 234, 250, 288, 443, 474, 493, 645, 662, 664, 695, 729, 752, 753, 801, 837, 839, 935, 963, 988, 1001, 1012];
const pedidas = process.argv.slice(2).map(Number).filter(Boolean);
const pasta = join(RAIZ, "musicas");
mkdirSync(pasta, { recursive: true });
let novas = 0;
for (const n of pedidas.length ? pedidas : TRILHAS) {
  const arq = join(pasta, `mixkit-${n}.mp3`);
  if (existsSync(arq)) continue;
  const r = await fetch(`https://assets.mixkit.co/music/${n}/${n}.mp3`);
  if (!r.ok) { console.log(`✗ mixkit-${n}: ${r.status}`); continue; }
  writeFileSync(arq, Buffer.from(await r.arrayBuffer()));
  novas++;
  console.log(`✓ mixkit-${n}.mp3`);
}
console.log(`${novas} trilha(s) nova(s) em musicas/`);
