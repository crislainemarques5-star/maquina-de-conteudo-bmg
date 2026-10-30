# MÁQUINA DE CONTEÚDO BMG

Gerador de carrosséis animados, microreels, fotos (ChatGPT) e roteiros de reels para o Instagram
**@biomagistral_santaluz** (Biomagistral Farmacêutica, farmácia de manipulação franqueada em **Santaluz · BA**),
operado pelo Claude Code. O roteiro completo de trabalho está na skill **`.claude/skills/bmg/SKILL.md`**: leia antes de
qualquer tarefa e siga as referências de cada fase.

## Com quem você fala
O operador entende pouco de programação. Fale em português simples, peça só o indispensável (um login, um "pode
programar", uma escolha entre opções) e **nunca peça que ele rode comandos**: você roda. Autonomia total para instalar,
pesquisar, gerar, conferir e corrigir.

## Regras que nunca mudam
1. **Os posts são só da Biomagistral Santaluz · BA.** Nunca citar, marcar ou cruzar com outras empresas, profissionais
   ou perfis pessoais (inclusive o de quem opera a máquina).
2. **Toda peça cita "Santaluz · BA"** (nunca "Unidade Santaluz"). "Desde 1979" é da rede.
3. **Logo nunca é recriado, redesenhado, vetorizado ou gerado por IA.** Só os recortes de `marca/logo/`.
4. **Nunca ilustração literal de cápsula, frasco ou pílula.** Fundo de bioquímica (fórmula estrutural), nunca rede de
   pontos/constelação.
5. **Sem preço, sem promoção (só quando a gestão pedir), sem sorteio, sem depoimento, sem antes e depois, sem promessa.**
   CTA: "Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada" + "Entrega grátis para toda a Bahia".
6. **Fatos só com fonte** e alegações com a frase oficial quando existir (`perfil/regras-publicidade.md`,
   `conteudo/fatos-ativos-novembro.md`). Farmacêutica que aparece em vídeo: nome + CRF-BA na tela.
7. **Senhas nunca em arquivo.** Os logins ficam salvos nas janelas do Chrome da máquina.
8. **Radar só de leitura:** nunca seguir, curtir, comentar nem abrir stories. Do radar se copia a **estrutura**, nunca
   o texto, a arte ou a foto.
9. **Nada é publicado ou programado sem o "pode programar" do operador.**

Linha editorial completa: `perfil/linha-editorial.md`. Visual: `design-system/DESIGN.md` e `marca/MARCA.md`.

## Mapa
| Pasta | O quê |
|---|---|
| `novembro-2026/` | o mês de novembro **pronto**: um post por pasta, `agenda.csv`, `index.html`, `COMO-PROGRAMAR.md` |
| `conteudo/plano.mjs` | todos os posts (carrosséis e microreels, com legenda); posts novos entram aqui |
| `conteudo/fotos/<id>.txt` | pedido de foto ao ChatGPT de cada post · `conteudo/roteiros.mjs`: roteiros da equipe |
| `fotos/` | fotos geradas (uma por post) · `marca/` logos recortados e fórmulas estruturais |
| `radar/` | perfis (rodízio), coletas, `MODELOS.md` (formatos validados) |
| `motor/` | os scripts (abaixo) · `saida/` vídeos gerados (fora do git) · `entregas/` meses novos |

## Comandos (você roda; ele não)
- Ambiente: `node motor/checar.mjs` · músicas: `node motor/instalar-musicas.mjs`
- Chrome da máquina (ChatGPT + Claude + Meta Business Suite, porta 9344): `node motor/navegador.mjs abrir`
- Radar: `node motor/radar.mjs` (coleta rotativa) · `--se-velho` (antes de cada post) · `--status` · `--login`
  (Chrome do radar, porta 9355) · agendar 3× por semana: `node motor/agendar-radar.mjs`
- Fotos: `node motor/fila-fotos.mjs <id> [<id>…]` (uma de cada vez; não use outra aba desse Chrome enquanto roda) ·
  resgate: `node motor/resgatar-fotos.mjs`
- Molécula nova: `python motor/moleculas.py` (lê `conteudo/moleculas.json`; precisa de RDKit)
- Carrossel: `node motor/carrossel.mjs <id>` (prévia PNG) · `--animado` (vídeos) → `saida/carrosseis/<id>/`
- Microreel: `node motor/microreel.mjs <id>-reel --rapido` (PNG por cena) · sem flag = MP4 com música e efeitos
- Claude Design: `node motor/claude-design.mjs ds-criar | ds-publicar | criar <id> | exportar <id>` + `node motor/sonorizar.mjs`
- Página de revisão: `node motor/previa.mjs <ids> --abrir` · Entrega de um mês: `node motor/entrega.mjs AAAA-MM --abrir`
- Roteiros da equipe: `node motor/roteiros-pagina.mjs`

## Se a sessão cair
Tudo fica nos arquivos. Volte para esta pasta, leia `.claude/skills/bmg/SKILL.md` e continue de onde parou
(`conteudo/plano.mjs`, `novembro-2026/agenda.json` › `programado`, `radar/rotacao.json`).
