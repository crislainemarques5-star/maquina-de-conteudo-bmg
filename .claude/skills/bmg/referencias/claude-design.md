# Microreels no Claude Design e no Runway

Os microreels saem de três jeitos. Varie entre eles ao longo da semana:
1. **Motor próprio** (`motor/microreel.mjs`), o padrão: texto animado, moléculas, infográficos, música e efeitos.
   É o mais rápido e o mais seguro.
2. **Claude Design:** animação livre feita a partir do design system BMG da conta do operador.
3. **ChatGPT + Runway:** a foto do ChatGPT vira vídeo no Runway e o motor monta o texto por cima.

## Design system (uma vez)
`node motor/claude-design.mjs ds-criar` e depois `ds-publicar`. Os detalhes estão em `referencias/instalacao.md`, passo 5.
O nome do design system precisa bater com `perfil/perfil.json` › `claude_design_ds`.

## Um microreel no Claude Design
1. Escreva o pedido em `conteudo/design/<id>-reel.txt`. Use como modelo `conteudo/design/2026-11-06-reel.txt`:
   - formato 9:16, 1080×1920, 15 s, 30 fps;
   - quadro 0 já cheio, 4 cenas e o fecho com WhatsApp;
   - área segura, contraste e as proibições.
2. Rode `node motor/claude-design.mjs criar <id>-reel`. Ele abre um projeto novo com o design system BMG e o modelo Animation.
3. Acompanhe com `node motor/claude-design.mjs ver <id>-reel <print.jpg>`. Peça ajustes com
   `node motor/claude-design.mjs ajustar <id>-reel <arquivo.txt>` até ficar no padrão de `referencias/qualidade.md`.
4. Rode `node motor/claude-design.mjs exportar <id>-reel`. O vídeo sai em `artes/<id>-reel.mp4`, sem som.
5. Som: `node motor/sonorizar.mjs artes/<id>-reel.mp4 saida/microreels/<id>-reel.mp4 --cenas=2.8,2.4,4.4,2.4,3 --musica=mixkit-801.mp3 --inicio=15`.
   Em `--cenas`, use as durações das cenas do pedido.
6. No plano, o post fica com `origem: "claude-design"` e sem `cenas`. Veja `2026-11-06-reel` como exemplo.
7. Gere a capa com `node motor/claude-design.mjs quadro <id>-reel 1` e copie para `saida/microreels/<id>-reel-capa.png`.

## ChatGPT + Runway
1. Gere a imagem inicial vertical (9:16) no ChatGPT, pela fila, com um pedido próprio em `conteudo/fotos/<id>-runway.txt`.
2. Escreva o pedido do Runway em `conteudo/runway/<id>.md`. Use `2026-11-11.md` como modelo: movimento lento de
   câmera, luz dourada, sem texto e sem logo.
3. **O operador gera no Runway** (Gen-4, Image to Video, 10 s, 9:16) e salva o vídeo em Downloads como `<id>-runway.mp4`.
4. No microreel, as cenas `foto` recebem `video: "<id>-runway.mp4"` (e `videoInicio` para usar outro trecho). Grave
   com `node motor/microreel.mjs <id>-reel`. Sem o vídeo, o motor usa a imagem com zoom lento, então o reel nunca trava.
