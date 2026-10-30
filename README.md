# MÁQUINA DE CONTEÚDO BMG

> **Claude Code, se você recebeu este link:** este repositório é um projeto completo para você instalar e operar.
> Clone em Documentos: `git clone https://github.com/crislainemarques5-star/maquina-de-conteudo-bmg.git`.
> Entre na pasta e rode `npm install`. Depois leia **`CLAUDE.md`** e **`.claude/skills/bmg/SKILL.md`** inteiros e
> siga a skill desde a fase de instalação. O texto completo de instrução está em **`COMECE-AQUI.txt`**.
> O mês de **novembro/2026 já está pronto** em `novembro-2026/`: falta só programar.

Gerador de conteúdo de Instagram para a **Biomagistral Santaluz · BA** (@biomagistral_santaluz), uma farmácia de
manipulação franqueada da rede Biomagistral Farmacêutica. O Claude Code opera a máquina; o operador só faz os logins e
diz o que quer.

## O que ela faz
- **Carrosséis animados** (1080×1350, um vídeo por slide). Identidade da marca: azul-marinho, dourado em degradê e
  Poppins. Fundo de bioquímica com a fórmula estrutural do ativo. Infográficos, zoom e capas alternadas no feed.
- **Microreels** de 10 a 30 s, com texto animado, música e efeitos sonoros. Também produz pelo Claude Design (design
  system BMG) e pelo Runway (ChatGPT + Runway).
- **Fotos geradas no ChatGPT:** imagens de luxo e bem-estar, revisadas uma a uma antes de usar.
- **Roteiros de reels** para a equipe gravar (vendedores e farmacêuticas), com foco em vender.
- **Radar rotativo** de farmácias magistrais da Bahia, do Nordeste, do Brasil e de fora, três vezes por semana. Todo post
  novo parte de um formato já validado em alcance, engajamento e pedidos de compra (`radar/MODELOS.md`).
- **Programação** no Meta Business Suite, com guia manual de reserva.

## Novembro/2026 (pronto)
`novembro-2026/index.html` mostra o mês inteiro. São 43 posts: 30 carrosséis e 13 microreels, cada um com vídeos,
legenda, data e hora. A agenda está em `agenda.csv` e o passo a passo em `COMO-PROGRAMAR.md`.

## Estrutura
`motor/` scripts · `conteudo/plano.mjs` posts · `fotos/` imagens · `marca/` logos recortados e moléculas ·
`design-system/` regras visuais · `perfil/` linha editorial e regras de publicidade · `radar/` concorrentes e modelos ·
`novembro-2026/` entrega pronta.

## Regras de base
Os posts são só da Biomagistral Santaluz · BA. Logo nunca recriado. Sem preço, sorteio, depoimento ou promessa. Fatos
só com fonte, dentro das regras da Anvisa e do CFF. Radar só de leitura. Detalhes em `CLAUDE.md` e
`perfil/linha-editorial.md`.

As trilhas musicais são baixadas do Mixkit na instalação (licença de uso em vídeo) e não ficam no repositório.
