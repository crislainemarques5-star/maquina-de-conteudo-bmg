---
name: bmg
description: MÁQUINA DE CONTEÚDO BMG — carrosséis animados, microreels, fotos do ChatGPT, roteiros de reels, radar de concorrentes e programação do Instagram @biomagistral_santaluz (Biomagistral, farmácia de manipulação de Santaluz-BA). Use para QUALQUER pedido de conteúdo sobre a Biomagistral, farmácia de manipulação, ativos, insumos, suplementos, manipulados ou dermocosméticos (ex.: "gere um carrossel sobre creatina Clonapure", "faz um microreel de magnésio", "programa novembro", "roda o radar", "/bmg", "máquina BMG").
---

# MÁQUINA DE CONTEÚDO BMG

Você opera a máquina de conteúdo do Instagram **@biomagistral_santaluz**. Leia `CLAUDE.md` (regras que nunca mudam) e
`perfil/linha-editorial.md` antes de qualquer fase. Fale com o operador em português simples, sem pedir que ele rode
comandos. Autonomia total para executar; peça a ele só logins, escolhas e o "pode programar".

## Em que fase estamos?
1. **Primeira vez** (não existe `.estudio/instalado.json`) → **Fase 1, instalação**.
2. Pedido para **programar novembro** (ou primeira conversa depois da instalação) → **Fase 2**.
3. **Pedido de post novo** ("gere um carrossel sobre…", "faz um microreel de…", "roteiro de reel sobre…") → **Fase 3**.
4. "Roda o radar", "o que está funcionando?" → **Fase 4**.
5. Mês novo inteiro ("monta dezembro") → **Fase 5**.

---

## Fase 1 · Instalação (uma vez) — `referencias/instalacao.md`
Resumo: `npm install` → `node motor/checar.mjs` (conserta o que der) → `node motor/instalar-musicas.mjs` → abrir o
Chrome da máquina (`node motor/navegador.mjs abrir`) e pedir UM login de cada: **ChatGPT** (conta paga dele),
**Claude** (claude.ai, conta dele com Claude Design) e, quando for programar, **Meta Business Suite** da Biomagistral →
criar o **design system BMG** no Claude Design dele (`node motor/claude-design.mjs ds-criar`, depois `ds-publicar`) →
Chrome do radar com o **Instagram pessoal dele** (`node motor/radar.mjs --login`, só leitura) → primeira coleta
(`node motor/radar.mjs`) → agendar o radar 3× por semana (`node motor/agendar-radar.mjs`) → atalho global da skill →
gravar `.estudio/instalado.json` com a data. Diga a ele, no fim, o que ficou pronto em 3 linhas.

## Fase 2 · Novembro já está pronto: só programar — `referencias/programar.md`
O conteúdo de novembro/2026 **já foi produzido e aprovado**: 30 carrosséis animados + 13 microreels, com legenda,
data e hora, em `novembro-2026/` (`index.html` para ver, `agenda.csv`/`agenda.json`, uma pasta por post).
**Não regenere nada de novembro.** Passos:
1. Abra `novembro-2026/index.html` para ele (`start "" novembro-2026\index.html`) e peça o "pode programar".
2. Programe pelo **Meta Business Suite** no Chrome da máquina, post a post, na ordem da agenda (carrossel = os vídeos
   `01.mp4`, `02.mp4`… na ordem; microreel = `reel.mp4` como Reel; legenda de `legenda.txt`; data e hora da agenda,
   fuso de Brasília). Marque `programado: true` em `novembro-2026/agenda.json` a cada post confirmado.
3. O que falhar duas vezes vai para o guia manual (`novembro-2026/COMO-PROGRAMAR.md`), que ele faz pelo celular.
4. Microreels 11/11 e 23/11: se aparecer `2026-11-11-runway.mp4` ou `2026-11-23-runway.mp4` em Downloads, regrave
   (`node motor/microreel.mjs 2026-11-11-reel`) e atualize a entrega (`node motor/entrega.mjs 2026-11 --destino=novembro-2026`)
   antes de programar esses dois. Sem o vídeo, eles já estão prontos com a imagem.
5. Roteiros da equipe de novembro: `node motor/roteiros-pagina.mjs` → mande a página para ele repassar à equipe.

## Fase 3 · Pedido de post novo — `referencias/pedido-de-post.md` (leia inteiro)
O fluxo que garante a mesma qualidade de novembro:
1. **Radar em dia:** `node motor/radar.mjs --se-velho`. Leia `radar/MODELOS.md`.
2. **Escolha o modelo validado** que combina com o tema (formato, estrutura, tipo de prova, chamada), de uma fonte
   que **não** está nos últimos 10 posts (`conteudo/modelos-usados.json`). Mostre a ele em 2 linhas: "Vou usar o
   formato X, que deu Y× a média em @fonte (região)". Registre em `conteudo/modelos-usados.json`.
3. **Fatos com fonte** (PubMed, Anvisa, IN 28, fabricante do insumo) e regras (`perfil/regras-publicidade.md`).
4. **Escreva o post** em `conteudo/plano.mjs` (formato em `referencias/formato-dos-posts.md`; use o post de creatina
   `2026-11-05` como modelo de qualidade), com legenda completa.
5. **Foto** no ChatGPT: pedido em `conteudo/fotos/<id>.txt` (padrão `design-system/FOTOS.md`) →
   `node motor/fila-fotos.mjs <id>` → **olhe a foto** (mãos, rosto, texto na imagem, luxo e alegria). Reprovou, refaz.
6. **Molécula** do ativo: `conteudo/moleculas.json` + `python motor/moleculas.py`.
7. **Prévia** (`node motor/carrossel.mjs <id>`) → **revisão visual de cada slide** com o checklist de
   `referencias/qualidade.md` → corrija até passar → `--animado`.
8. Microreel pedido: `node motor/microreel.mjs <id>-reel --rapido` → revisão → MP4.
9. Mostre a ele (`node motor/previa.mjs <id> --abrir`), pergunte data e hora e se pode programar → Fase 2, passo 2.

## Fase 4 · Radar — `referencias/radar.md`
Rotativo e agendado (seg, qua, sex, 8h). Para rodar na hora: `node motor/radar.mjs`. Para responder "o que está
funcionando?": resuma o ranking de `radar/MODELOS.md` em 5 linhas, com 2 exemplos e de onde vieram.

## Fase 5 · Mês novo inteiro
Mesmo padrão de novembro: plano de temas por dia (1 carrossel/dia, 3 microreels/semana, 3 roteiros/semana) a partir
das datas do mês e do ranking do radar → aprovação dos temas por ele → Fase 3 em lote (fotos em fila única) →
`node motor/entrega.mjs AAAA-MM --abrir` → "pode programar" → Fase 2.

## Antes de dizer "pronto"
Nada sai sem passar no checklist de `referencias/qualidade.md` e na sua revisão visual (abra os PNGs e olhe).
