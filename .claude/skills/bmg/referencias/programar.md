# Programar no Instagram (Meta Business Suite)

Só depois do **"pode programar"** do operador. A conta @biomagistral_santaluz precisa ser **profissional** (empresa ou
criador) e estar ligada à Página do Facebook da farmácia; quem programa precisa ter acesso a ela no Meta Business Suite.

## Caminho A · Meta Business Suite no Chrome da máquina (você faz)
1. `node motor/navegador.mjs abrir https://business.facebook.com/latest/content_calendar` e peça, uma vez:
   "Entra no Facebook da Biomagistral nesta janela e me avisa." (login dele; senha nunca em arquivo).
   Confira no seletor de contas, no topo, que está na **Biomagistral Santaluz** e no Instagram **@biomagistral_santaluz**.
2. Opere a página pelo **Playwright MCP** (`.mcp.json`, ligado ao Chrome da porta 9344): `browser_snapshot` para ler,
   `browser_click`/`browser_type` para agir, `browser_file_upload` para as mídias. Tire um print a cada post
   (`browser_take_screenshot`) para conferir.
3. Para cada linha de `novembro-2026/agenda.json` com `programado: false`, na ordem:
   - **Carrossel:** Criar post → marcar **só o Instagram** (desmarcar Facebook) → Adicionar foto/vídeo → enviar
     `01.mp4`, `02.mp4`… **na ordem** da pasta (até 10 itens) → colar o texto de `legenda.txt` → Programar → data e
     hora da agenda (**fuso de Brasília**) → Programar.
   - **Microreel:** Criar reel → só Instagram → enviar `reel.mp4` → capa: `capa.jpg` (ou o quadro do segundo 1) →
     legenda → Programar com data e hora.
   - Confira no **Planejador** (dia, hora, quantidade de mídias), marque `"programado": true` na agenda e siga.
4. **Limites:** o Business Suite aceita até 10 mídias por carrossel e programa com algumas semanas de antecedência
   (o limite varia; versões recentes aceitam até 75 dias). Se ele recusar as datas do fim do mês, programe até onde
   aceitar e avise o operador do dia em que você deve voltar para o resto. No máximo 25 posts por dia.
5. Se a mesma etapa falhar duas vezes (a interface do Meta muda), pare e passe aquele post para o Caminho B.
6. Ao terminar: "Programei X posts, de DD/MM a DD/MM. Falta: …". Anote em `novembro-2026/agenda.json`.

## Caminho B · App do Instagram no celular (ele faz, com o guia)
`novembro-2026/COMO-PROGRAMAR.md` tem o passo a passo para o operador. Mande a pasta do post para o celular dele
(Google Drive ou WhatsApp para ele mesmo) e acompanhe um a um, se ele quiser.

## Depois de programado
- Lembrete para ele: responder os comentários nas primeiras horas de cada post (o algoritmo valoriza).
- Na 3ª semana do mês, olhe os Insights junto com o radar e proponha os ajustes do mês seguinte.
