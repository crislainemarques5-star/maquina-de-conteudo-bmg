# Pedido de post novo (ex.: "gere um carrossel sobre creatina Clonapure")

O padrão de qualidade é novembro: abra `novembro-2026/index.html` e o post `2026-11-05` em `conteudo/plano.mjs` antes
de começar. Siga os passos na ordem. Só pergunte ao operador o que mudar o resultado (data e hora, se ele não disse).

## 1. Radar e modelo validado
- `node motor/radar.mjs --se-velho` → leia `radar/MODELOS.md`.
- Escolha **um formato** do ranking que combine com o tema. Exemplos:
  - Creatina Clonapure: "Parecidos, mas não iguais" (monohidratada × Clonapure) ou "Ativo explicado" com prova.
  - Magnésio: "Parecidos, mas não iguais" (formas).
  - Bastidores: "Como sua fórmula é feita".
- Pegue o melhor exemplo desse formato de uma fonte **fora dos últimos 10 usados** e de grupo diferente do último.
- Diga a ele numa linha: "Vou no formato *Parecidos, mas não iguais*, que deu 17× a média num perfil nacional, com
  2.900 comentários." Registre em `conteudo/modelos-usados.json`.
- Copie a **estrutura**: gancho, ordem, tipo de prova e chamada. **Nunca o texto ou a arte.**

## 2. Fatos e regras
- Procure em `conteudo/fatos-ativos-novembro.md`, que já cobre os ativos da casa. Se o ativo for novo, pesquise:
  - PubMed: metanálise ou ensaio clínico. Anote autor, ano e PMID.
  - Anvisa: a IN 28/2018 tem as frases oficiais de alegação, que devem ser usadas **literalmente**.
  - Fabricante do insumo: o que é tecnologia própria. Escreva "segundo o fabricante".
- Anote as fontes no fim de `conteudo/fatos-ativos-novembro.md`, numa seção nova com a data.
- Confira `perfil/regras-publicidade.md` e `perfil/linha-editorial.md`. Pontos que pegam:
  - sem dose ou posologia, sem "tome", sem promessa e sem preço;
  - insumo de marca só em contexto educativo, com o benefício do estudo;
  - aviso legal só no último slide.
- Na dúvida sobre uma alegação, escolha a frase mais conservadora e diga isso ao operador.

## 3. Escrever o post
- Em `conteudo/plano.mjs`, acrescente o objeto no fim da lista `POSTS`, no formato de `referencias/formato-dos-posts.md`.
- **Data:** a que ele pediu, ou a próxima livre. **Capa:** diferente das capas vizinhas.
- 6 a 9 slides, com pelo menos um infográfico (barras, anel, pictograma, bento, número, palavra ou molécula).
- Alterne `f: "noite"` e `f: "gelo"`.
- Títulos curtos com 1 palavra-chave. Legenda completa, com CTA e hashtags.
- Escreva com gatilhos de venda sem clichê:
  - benefício concreto e prova (estudo);
  - diferencial da casa (insumo de primeira linha, laudo em cada lote, rigor, a melhor da região);
  - chamada para a avaliação personalizada no WhatsApp.
- Se ele pediu microreel, escreva também o `<id>-reel`. Se pediu roteiro para a equipe, acrescente em
  `conteudo/roteiros.mjs`, no mesmo formato dos de novembro.

## 4. Foto (ChatGPT)
- Escreva `conteudo/fotos/<id>.txt` no padrão de `design-system/FOTOS.md` e rode `node motor/fila-fotos.mjs <id>`.
  Leva de 3 a 10 minutos. Uma de cada vez: **não use outra aba desse Chrome enquanto a fila roda.**
- Se falhar, rode `node motor/resgatar-fotos.mjs`. Se não houver imagem, rode a fila de novo.
- **Olhe a foto** (Read em `fotos/<id>.png`):
  - mãos com 5 dedos e rosto natural;
  - pessoa bonita e alegre;
  - nenhum texto, rótulo ou logotipo;
  - luxo e luz dourada;
  - nada de cápsula gigante, seringa ou ambiente hospitalar.
- Reprovou: ajuste o pedido e gere de novo (apague a foto antes).

## 5. Molécula
Acrescente o ativo em `conteudo/moleculas.json` e rode `python motor/moleculas.py`. Para slides com `molecula`, use
`python motor/moleculas.py "<nome>"`.

## 6. Prévia e revisão visual (obrigatória)
- Rode `node motor/carrossel.mjs <id>`, que gera os PNGs em `saida/carrosseis/<id>/`.
- Abra **cada PNG** e passe o checklist de `referencias/qualidade.md`.
- Corrija o texto ou a estrutura e gere de novo até tudo passar. Texto que estoura ou fica minúsculo é corte de texto, não letra menor.
- Rode `node motor/carrossel.mjs <id> --animado` para gravar os vídeos (1 a 2 minutos por slide; rode em segundo plano).
- Microreel:
  1. Rode `node motor/microreel.mjs <id>-reel --rapido` e revise as cenas.
  2. Rode `node motor/microreel.mjs <id>-reel` para gerar o MP4 com música e efeitos.
  3. Confira o vídeo pelo tempo de leitura de cada cena.

## 7. Mostrar e programar
- Rode `node motor/previa.mjs <id> --abrir` e diga em 3 linhas o que foi feito, de onde veio o formato e a data e hora sugeridas.
- Quando ele disser "pode programar", siga `referencias/programar.md`, usando os arquivos de
  `saida/carrosseis/<id>/NN.mp4` (ou `saida/microreels/<id>.mp4`) e a legenda do plano.
- Para vários posts, ou um mês: `node motor/entrega.mjs AAAA-MM` cria a pasta `entregas/AAAA-MM/`, igual à de novembro.
