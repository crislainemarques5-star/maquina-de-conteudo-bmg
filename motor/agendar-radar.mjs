/**
 * Agenda o radar rotativo 3× por semana (segunda, quarta e sexta, 8h) no Agendador de Tarefas do Windows. Se o
 * computador estiver desligado no horário, roda assim que ligar. O log fica em radar/ultimo.log.
 *
 *   node motor/agendar-radar.mjs            cria (ou atualiza) a tarefa "Maquina BMG - Radar"
 *   node motor/agendar-radar.mjs --remover  apaga a tarefa
 *   node motor/agendar-radar.mjs --status   mostra a próxima execução
 * Fora do Windows não há agendador: a máquina roda `node motor/radar.mjs --se-velho` antes de cada post.
 */
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { RAIZ } from "./comum.mjs";

const NOME = "Maquina BMG - Radar";
const ps = (cmd) => execFileSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", "[Console]::OutputEncoding=[Text.Encoding]::UTF8; " + cmd], { encoding: "utf8" });
if (process.platform !== "win32") { console.log("fora do Windows: use `node motor/radar.mjs --se-velho` antes de cada post"); process.exit(0); }

if (process.argv.includes("--remover")) {
  ps(`Unregister-ScheduledTask -TaskName '${NOME}' -Confirm:$false -ErrorAction SilentlyContinue`);
  console.log(`tarefa "${NOME}" removida`);
} else if (process.argv.includes("--status")) {
  console.log(ps(`$t = Get-ScheduledTask -TaskName '${NOME}' -ErrorAction SilentlyContinue; if ($t) { $i = Get-ScheduledTaskInfo -TaskName '${NOME}'; "próxima: " + $i.NextRunTime + " · última: " + $i.LastRunTime + " (resultado " + $i.LastTaskResult + ")" } else { "tarefa não existe: rode node motor/agendar-radar.mjs" }`).trim());
} else {
  const log = join(RAIZ, "radar", "ultimo.log");
  const acao = `"${process.execPath}" motor\\radar.mjs > "${log}" 2>&1`.replace(/'/g, "''");
  ps([
    `$a = New-ScheduledTaskAction -Execute 'cmd.exe' -Argument '/c ${acao}' -WorkingDirectory '${RAIZ.replace(/'/g, "''")}'`,
    "$g = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday,Wednesday,Friday -At 8:00",
    "$c = New-ScheduledTaskSettingsSet -StartWhenAvailable -ExecutionTimeLimit (New-TimeSpan -Hours 3) -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries",
    `Register-ScheduledTask -TaskName '${NOME}' -Action $a -Trigger $g -Settings $c -Description 'Radar rotativo de farmácias magistrais (Máquina de Conteúdo BMG). Só leitura.' -Force | Out-Null`,
  ].join("; "));
  console.log(`✓ radar agendado: segunda, quarta e sexta às 8h (tarefa "${NOME}"; log em radar/ultimo.log)`);
}
