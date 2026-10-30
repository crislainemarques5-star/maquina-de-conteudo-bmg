# Formato dos posts em `conteudo/plano.mjs`

Todo post é um objeto na lista `POSTS`. Texto com `**negrito**` vira a palavra-chave (dourada no fundo escuro, azul no
claro); `\n` quebra a linha (use template string para títulos de 2 linhas). **Modelo de qualidade: o post
`2026-11-05` (creatina).** Copie a densidade, o tom e o ritmo dele.

## Carrossel
```js
{ id: "2026-12-03", capa: "foto", formato: "carrossel", data: "03/12 (qui)", hora: "19:30", pilar: "Ativo explicado",
  slides: [ /* 6 a 9 slides */ ], legenda: `...` }
```
- `id` = data AAAA-MM-DD (um carrossel por dia). A foto do post é `fotos/<id>.png` (gerada pela fila).
- `capa`: `foto` (foto inteira com véu), `arco` (foto num arco, fundo claro), `moldura` (foto emoldurada) ou `tipo`
  (só tipografia + símbolo; use `simbolo`, `simboloNome`, `simboloN` no slide de capa, ex.: "Mg", "Magnésio", "12").
  **Alterne** com os posts vizinhos para o feed ficar harmônico; em dia de microreel, prefira `arco` (clara).
- Horários usados: 19h30 (seg a qui), 18h30 (sex), 10h (sáb), 19h (dom). Microreel: 12h15.
- `pilar`: Ativo explicado · Mito ou verdade · Parecidos, mas não iguais · Como sua fórmula é feita · Teste rápido ·
  Saúde da mulher · Saúde do homem · Datas.

### Campos comuns a todo slide
`t` (tipo) · `f`: `"noite"` (azul) ou `"gelo"` (claro), **alterne** · `eyebrow` (rótulo curto, 2 a 5 palavras) ·
`titulo` (até ~6 palavras por linha, 1 ou 2 linhas, com 1 palavra-chave em `**`) · `corpo` (até ~35 palavras) ·
`nota` (letra pequena) · `prox` (gancho para o próximo slide).

### Tipos de slide
| `t` | Para quê | Campos próprios |
|---|---|---|
| `capa` | primeiro slide | `sub`, `estilo` (troca a capa do post), `simbolo`… (capa tipo) |
| `texto` | ideia central | — |
| `lista` | 3 a 4 itens com título e explicação | `itens: [["Título","explicação"], …]` |
| `passos` | processo numerado | `itens` como lista, `inicio` |
| `areas` | grade de 4 cartões | `itens: [["Título","texto curto"], …]` |
| `cola` | checklist "salve para consultar" | `itens: ["frase", …]` |
| `numero` | número gigante | `numero`, `unidade`, `regua` (0-100) |
| `barras` | comparação em barras que crescem | `itens: [["rótulo", valor, "texto do valor", destaque?]]`, `max` |
| `anel` | percentual num anel | `numero`, `porcento`, `legenda`, `lado` |
| `pictograma` | 100 pontos (x em 100) | `on`, `meio`, `legenda: [["#cor","texto"]]` |
| `bento` | 3 a 5 cartões com números | `itens: [{ n, t, rot, grande }]` |
| `palavra` | palavra gigante de impacto | `palavra` (1 palavra, MAIÚSCULA), `titulo` como subtítulo |
| `molecula` | a fórmula estrutural se desenhando | `molecula` (nome em inglês do PubChem, ex.: "creatine") |
| `mito` | mito riscado + verdade | `mito`, `verdade` |
| `compara` | duas colunas | `cab: ["A","B"]`, `linhas: [["a","b"], …]` |
| `quiz` / `resposta` | teste rápido em dois slides | `opcoes: ["…","…","…"]`, `certa` (índice, na resposta) |
| `ficha` | ficha técnica do ativo | `ativo`, `tipoAtivo`, `linhas: [["rótulo","valor"]]` |
| `foto` | a foto do post, com cartão de vidro | `foto` (opcional, outro arquivo de fotos/) |
| `cta` | último slide (logo, WhatsApp, aviso legal) | `botao`, `beneficios` |

Estrutura que funciona (6 a 9 slides): capa → o que é/por que importa → molécula ou infográfico → prova (lista,
barras, compara, mito) → foto → cuidado/"bom saber" → cta. Um infográfico por post, no mínimo.

### Legenda
Gancho na 1ª linha (com 1 emoji) → 2 ou 3 parágrafos curtos com o benefício e a prova → "na Biomagistral Santaluz…" →
`Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.` →
`📍 Biomagistral Santaluz · Bahia` → 5 a 8 hashtags (sempre `#farmaciademanipulacao #biomagistral #santaluz #santaluzba`).

## Microreel (10 a 30 s)
```js
{ id: "2026-12-03-reel", formato: "microreel", data: "03/12 (qui)", hora: "12:15", pilar: "…",
  musica: "mixkit-645.mp3", musicaInicio: 20, cenas: [ … ], legenda: `…` }
```
Cada cena tem `t` e `dur` (segundos; leitura = caracteres ÷ 15 + 0,5 s). A primeira cena é o gancho e vira a capa.
| `t` | Campos |
|---|---|
| `foto` | `foto` (arquivo em fotos/), `video` (mp4 em fotos/ ou Downloads; ex. Runway), `videoInicio`, `eyebrow`, `titulo`, `corpo` |
| `gancho` / `texto` | `eyebrow`, `titulo`, `sub` / `corpo` |
| `palavra` | `palavra`, `titulo`, `textura` (foto de fotos/ dentro das letras), `claro` (fundo claro) |
| `numero` | `numero` (inteiro conta subindo), `unidade`, `titulo` |
| `lista` | `eyebrow`, `titulo`, `itens: ["…"]` (até 4) |
| `barras` / `anel` / `pictograma` | como no carrossel |
| `molecula` | `molecula`, `titulo`, `sub` |
| `elemento` | quadro da tabela periódica: `simbolo`, `numero`, `massa`, `nome`, `titulo` |
| `final` | `titulo` (logo, WhatsApp, "Entrega grátis para toda a Bahia" e aviso entram sozinhos) |
Música: escolha uma de `musicas/` diferente das usadas na semana; `musicaInicio` = segundo onde a trilha já está cheia.
Use 4 a 6 cenas; varie os tipos entre um microreel e outro.

## Foto (conteudo/fotos/<id>.txt)
Comece com `Gere uma imagem (não responda com texto): ` + a cena (pessoa bonita, alegre, em ambiente de alto padrão
coerente com o tema, ou o ativo/natureza sem pessoas) + o bloco fixo de `design-system/FOTOS.md` (inclui "sem texto,
sem logotipos" e "metade de baixo mais limpa e escura"). Uma foto por post.

## Molécula
Acrescente `"<id>": "<nome em inglês>"` em `conteudo/moleculas.json` (fundo do post) e rode `python motor/moleculas.py`
(+ nomes avulsos usados em slides/cenas: `python motor/moleculas.py "creatine"`). Sem RDKit, use uma das 25 que já
existem em `marca/moleculas/` (a do ativo mais próximo) ou deixe sem.
