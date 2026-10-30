/**
 * Põe música e efeitos sonoros num microreel que veio sem som (Claude Design ou Runway): whoosh em cada troca de cena,
 * pop na entrada do texto, brilho no fecho e a música por baixo, nivelados em −14 LUFS.
 *
 *   node motor/sonorizar.mjs <entrada.mp4> <saida.mp4> --cenas=2.8,2.4,4.4,2.4,3 [--musica=mixkit-801.mp3] [--inicio=15]
 * As durações das cenas aparecem na linha do tempo do Claude Design ("Gancho · 2.8s").
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { RAIZ, ffmpegPath, duracao } from "./comum.mjs";

const FF = ffmpegPath() ?? "ffmpeg";
const [entrada, saida] = process.argv.slice(2, 4).map((p) => resolve(p));
const flags = Object.fromEntries(process.argv.slice(4).map((a) => a.replace(/^--/, "").split("=")));
const cenas = String(flags.cenas ?? "").split(",").map(Number).filter((x) => x > 0);
const dur = duracao(entrada);
const tmp = mkdtempSync(join(tmpdir(), "bio-sonorizar-"));
const ff = (a) => execFileSync(FF, ["-v", "error", "-y", ...a]);
const whoosh = join(tmp, "w.wav"), pop = join(tmp, "p.wav"), brilho = join(tmp, "b.wav");
ff(["-f", "lavfi", "-i", "anoisesrc=color=pink:duration=0.7:amplitude=0.9:seed=11", "-af", "highpass=f=400,lowpass=f=5200,afade=t=in:d=0.3:curve=qsin,afade=t=out:st=0.3:d=0.4:curve=qsin,volume=0.5", whoosh]);
ff(["-f", "lavfi", "-i", "sine=f=988:d=0.14", "-f", "lavfi", "-i", "sine=f=1480:d=0.14", "-filter_complex", "[0][1]amix=2,afade=t=out:st=0.01:d=0.13:curve=exp,volume=0.45", pop]);
ff(["-f", "lavfi", "-i", "sine=f=1760:d=1.6", "-f", "lavfi", "-i", "sine=f=2637:d=1.6", "-f", "lavfi", "-i", "sine=f=3520:d=1.6", "-filter_complex", "[0][1][2]amix=3,tremolo=f=9:d=0.5,afade=t=in:d=0.08,afade=t=out:st=0.3:d=1.3,volume=0.32", brilho]);
const cortes = []; let t = 0;
for (const c of cenas.slice(0, -1)) { t += c; cortes.push(t); }
const ev = [[0.15, pop], ...cortes.map((c) => [c - 0.4, whoosh]), ...cortes.map((c) => [c + 0.2, pop]), ...(cenas.length ? [[dur - cenas.at(-1) + 0.8, brilho]] : [])];
const efeitos = join(tmp, "efeitos.wav");
ff([...ev.flatMap(([, f]) => ["-i", f]), "-filter_complex",
  ev.map(([s], k) => `[${k}]adelay=${Math.max(0, Math.round(s * 1000))}|${Math.max(0, Math.round(s * 1000))}[e${k}]`).join(";") + ";" + ev.map((_, k) => `[e${k}]`).join("") + `amix=inputs=${ev.length}:normalize=0,apad=whole_dur=${dur}[ef]`,
  "-map", "[ef]", "-t", String(dur), efeitos]);
const mus = flags.musica && existsSync(join(RAIZ, "musicas", flags.musica)) ? join(RAIZ, "musicas", flags.musica) : null;
const mix = join(tmp, "mix.wav");
if (mus) ff(["-ss", String(flags.inicio ?? 0), "-i", mus, "-i", efeitos, "-filter_complex",
  `[0]atrim=0:${dur},afade=t=in:d=0.4,afade=t=out:st=${Math.max(0, dur - 1.4)}:d=1.4,volume=1[m];[1]volume=1.7[e];[m][e]amix=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[o]`, "-map", "[o]", "-t", String(dur), mix]);
else ff(["-i", efeitos, "-af", "loudnorm=I=-16:TP=-1.5", "-t", String(dur), mix]);
ff(["-i", entrada, "-i", mix, "-map", "0:v:0", "-map", "1:a:0", "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k", "-shortest", "-movflags", "+faststart", saida]);
rmSync(tmp, { recursive: true, force: true });
console.log(`ok ${saida} (${dur.toFixed(1)} s, ${cenas.length} cenas${mus ? ", música " + flags.musica : ""})`);
