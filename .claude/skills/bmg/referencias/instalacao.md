# Instalação (uma vez por computador)

Faça tudo sozinho. Do operador você só precisa dos logins (ele digita, você nunca vê nem guarda a senha).

1. **Programas.** Node.js 18+ e Google Chrome. Python 3 é opcional: só serve para desenhar moléculas novas.
   - Sem Node, peça numa frase que ele instale o "LTS" em nodejs.org e reabra o Claude Code.
   - Sem Python, siga normalmente: as 25 moléculas prontas funcionam.
   - Com Python, rode `pip install rdkit`.
2. **Dependências:** `npm install`. Depois `node motor/checar.mjs`, que reinstala o ffmpeg se o download veio cortado.
3. **Músicas:** `node motor/instalar-musicas.mjs` baixa as trilhas do Mixkit para `musicas/`, que fica fora do git.
4. **Chrome da máquina (porta 9344, perfil `.chrome-biomagistral/`):** rode `node motor/navegador.mjs abrir` e diga:
   "Abri uma janela do Chrome só da máquina. Entra nela, uma vez só, no ChatGPT (a sua conta paga) e no Claude
   (claude.ai). Me avisa quando terminar."
   - Confira o login nos dois sites.
   - No ChatGPT, a geração de imagem precisa estar disponível. Faça um teste com `node motor/fila-fotos.mjs` usando um pedido simples.
5. **Design system BMG no Claude Design dele:**
   1. Rode `node motor/claude-design.mjs ds-criar`. Ele envia a descrição, as notas, os 6 logos recortados e 8 peças aprovadas.
   2. Acompanhe na janela até o Claude Design terminar (pode levar de 10 a 20 minutos).
   3. Confira se ele usou os **logos recortados**, sem redesenhar nada.
   4. Rode `node motor/claude-design.mjs ds-publicar`.
   5. O nome precisa começar com "BMG" e bater com `perfil/perfil.json` › `claude_design_ds`. Se o Claude Design der outro nome, ajuste o perfil.
   - Se o script falhar porque a interface mudou, faça o mesmo pelo Playwright MCP, olhando a tela:
     1. Abra Design system › Create.
     2. Na descrição, cole `design-system/claude-design-descricao.txt`.
     3. Nas notas, cole `design-system/claude-design-notas.txt`.
     4. Anexe os logos de `marca/logo/` e os exemplos de `design-system/exemplos/`.
     5. Clique em Generate e, no fim, ligue "Published".
6. **Chrome do radar (porta 9355, perfil `.chrome-radar/`):** rode `node motor/radar.mjs --login` e diga:
   "Abri outra janela do Chrome, só para o radar. Entra no SEU Instagram nela (uma vez). O radar só lê, nunca
   segue, curte nem comenta."
7. **Primeira coleta:** `node motor/radar.mjs`. Leva uns 20 minutos e roda em segundo plano. No fim, sai o `radar/MODELOS.md`.
8. **Radar 3× por semana:** `node motor/agendar-radar.mjs` agenda segunda, quarta e sexta às 8h. Se o computador
   estiver desligado nesse horário, o radar roda quando ele ligar.
9. **Atalho global da skill:** crie `~/.claude/skills/bmg/SKILL.md` para que pedidos feitos em qualquer pasta cheguem aqui.
   - Frontmatter: `name: bmg` e a mesma `description` do `.claude/skills/bmg/SKILL.md` do projeto.
   - Corpo: "A Máquina de Conteúdo BMG fica em <CAMINHO COMPLETO>. Vá para essa pasta e siga o
     .claude/skills/bmg/SKILL.md de lá (a instalação já foi feita)."
10. **Marque como instalado:** grave `.estudio/instalado.json` com `{ "data": "<hoje>", "pasta": "<caminho>" }`.
11. **Avise o operador** em 3 linhas: o que ficou pronto, que novembro já está feito e só falta programar, e como
    pedir um post novo (exemplo: "gere um carrossel sobre creatina Clonapure").

## Atualizações
A gestão pode mandar melhorias pelo repositório. Para receber, rode `git pull` na pasta. Rode também quando o
operador disser "atualiza a máquina".
