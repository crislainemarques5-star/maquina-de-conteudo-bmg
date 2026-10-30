# Referências e técnicas: microreels e carrosséis da Biomagistral Santaluz-BA

Pesquisa de 29/10/2026 para responder ao retorno da dona: microreels "pouco criativos" e "letras pequenas".
Vale junto com `DESIGN.md`, `claude-design-notas.txt`, `perfil/regras-publicidade.md` e os arquivos de fatos em `conteudo/`.

**Base que já existe e não é repetida aqui** (estudo anterior de técnicas de carrossel):
esqueleto de prompt do Claude Design (B1), quadro 0 cheio (B2), lista de transições por nome (B3), princípios de movimento
com `cubic-bezier(0.16,1,0.3,1)` e "nada nasce do zero" (B4), som e BPM (B5), área segura e quadro de capa 1080×1440 (B6),
painel de Tweaks (B7), exportação (B8), e no carrossel: panorâmico, espiada, arco de Duarte, duotone, malha com dither,
vidro, grade editorial, eco tipográfico e slide "cola". Este arquivo **aprofunda** esses pontos com números, código e roteiros.
O que é assinatura de outros perfis (feixe de luz, faixa dourada atrás da palavra, título em caixa alta 200/800) continua proibido aqui.

**Legenda de fonte:** [aberto] = página aberta e lida nesta pesquisa · [busca] = visto só no resultado de busca (página
bloqueada ou não aberta; o resumo vem do trecho da busca) · **não confirmado** = não achei fonte pública.

---

## 0. Diagnóstico do motor atual (`motor/microreel.mjs`)

| Elemento | Hoje | No celular (1080 px viram ~390 pt, fator 0,36) | Problema |
|---|---|---|---|
| Título do gancho `h1` | 112 px, peso 300 | ~40 pt, traço fino | Peso 300 some depois da compressão do Reels |
| Título das cenas `h2` | 84 px, peso 300 | ~30 pt | Parece legenda, não manchete |
| Corpo e subtítulo | 42 px, peso 400 | ~15 pt | **Menor que os 17 pt do texto padrão do iOS** [busca](https://developer.apple.com/design/human-interface-guidelines/typography.md) |
| Eyebrow | 27 px | ~10 pt | Ilegível no polegar |
| Aviso final | 22 px | ~8 pt | Ilegível |

Além do tamanho, a falta de criatividade vem de **uma composição só**: toda cena é eyebrow + título + corpo, alinhada à
esquerda, no mesmo fundo noite, entrando de baixo com desfoque. Não há troca de escala, de fundo, de ritmo nem de tipo de
transição. As técnicas da seção 3 atacam exatamente isso: cada cena muda pelo menos **uma** de quatro variáveis
(escala, fundo, composição, tipo de movimento).

---

## 1. Referências reais (15) de motion curto e premium

Para cada uma: link, o que tem de especial e a técnica que dá para copiar na Biomagistral (sempre abstrata, sem cápsula).

### 1. illo · Found (app de cuidado com o peso) [aberto]
- **Link:** https://illo.tv/found
- **O que faz:** formas abstratas delicadas que fluem e mudam de contorno ("A shape for every body"), sobre o verde profundo
  da marca com degradês; os dados aparecem em ilustrações simples. Objetivo declarado: tratar o tema "de forma positiva e
  gentil" sem perder o lado científico.
- **Copiar:** **metáfora por forma abstrata em vez de ilustração literal.** Para colágeno, magnésio ou sono, uma forma
  orgânica dourada que se reorganiza (fio que vira malha, pontos que viram cristal) carrega a ideia sem desenhar produto.

### 2. SecondKind · motion científico para lançamento de pós-biótico (Contra) [aberto]
- **Link:** https://contra.com/p/PUlXYBOm-scientific-motion-graphics-for-a-postbiotic-brand-launch
- **O que faz:** "Using particles, dots, and flow instead of literal anatomy": sistemas de pontos representam a ação do
  ingrediente; tipografia cinética sutil, ritmo calmo, transições suaves; peças modulares (filme, site, cortes sociais).
- **Copiar:** **sistema de pontos dourados** que se agrupam, se separam e formam números. É a resposta direta ao veto da
  cápsula: o ativo vira partícula, não objeto. Ver T8 e o roteiro do colágeno.

### 3. Multiverse Studio · Ecolor [aberto]
- **Link:** https://the-brandidentity.com/project/breaking-beauty-codes-multiverse-studio-channels-pigment-energy-in-ecolors-precise-identity
- **O que faz:** o filme da marca desfaz rostos e cabelos em micropartículas de pigmento; paleta de preto a cinza-aço com
  acentos fortes "como pigmentos vistos ao microscópio"; elementos fluidos (rastros, ondas, partículas).
- **Copiar:** **fundo escuro técnico + cor só no "material"**. No nosso caso, noite #0F1C2C e o dourado aparecendo apenas
  nas partículas e na palavra-chave. Transição em que a palavra se desfaz em pó dourado e o pó forma a cena seguinte.

### 4. Parker · Milamend (suplemento para saúde hormonal feminina) [aberto]
- **Link:** https://the-brandidentity.com/project/with-its-branding-for-milamend-parker-makes-you-think-about-what-a-health-supplement-can-look-like
- **O que faz:** foge do clichê clínico buscando códigos de beleza, luxo e editorial para "suavizar o lado científico";
  tipografia leve e elegante, natureza-morta fotográfica com espaço para respirar, elementos animados contidos para não
  disputar com a foto.
- **Copiar:** **regra de contenção**: um elemento animado por vez sobre foto de estilo de vida (as fotos do ChatGPT), com a
  tipografia grande e leve ocupando o espaço negativo.

### 5. IRPR 3D · motion graphics para indústria farmacêutica [aberto]
- **Link:** https://3d.irpr.agency/3d-for/pharma/motion-graphics/
- **O que faz:** tipografia cinética ("lands a headline harder than a static caption"), gráficos animados ("tells a data
  story a table never could"), mecanismo de ação, cortes verticais para redes; tudo referenciado e pronto para revisão
  regulatória.
- **Copiar:** **dado animado com fonte na mesma tela** (rótulo de 30 px: "INCA, Estimativa 2026"). É o jeito de ser técnico
  e ainda caber na regra da Anvisa/CFF.

### 6. Spotify Wrapped (histórias verticais de dados) [aberto]
- **Links:** https://engineering.atspotify.com/2024/1/exploring-the-animation-landscape-of-2023-wrapped [aberto] ·
  https://luckydumpling.github.io/motion-archive/entries/spotify-wrapped-2022-vucko/ [aberto] ·
  https://medium.com/active-theory/spotify-wrapped-2018-technical-case-study-5b7cfb7e9d3a [busca]
- **O que faz:** é a referência mundial de "data viz" em 9:16. O dado controla a forma: frequência vira intensidade de cor,
  preferência vira coordenada num mapa; tipografia com sensação de abertura de filme; um único conjunto de princípios de
  movimento para todas as peças ("coherence at scale").
- **Copiar:** **o número manda no desenho** (um anel que fecha em 95%, um mapa da Bahia que acende em Santaluz) e **uma
  regra de movimento fixa para o mês inteiro**, para o feed parecer uma série.

### 7. Landor & Fitch · Orchestra Sinfonica di Milano [aberto]
- **Link:** https://the-brandidentity.com/project/6-identities-driven-by-motion-featuring-projects-by-landor-fitch-iya-studio-dia-and-more
- **O que faz:** o logotipo "alarga e estreita conforme a intensidade da música".
- **Copiar:** **pulso de áudio** (T12): a espessura do anel ou o brilho do dourado segue o volume da música, quadro a quadro.
  O logo da Biomagistral não pode ser deformado, então o pulso vai num elemento gráfico nosso (anel, linha, partículas).

### 8. DIA, Studio Dumbar/DEPT e Connor Campbell · motion como base da marca [aberto]
- **Link:** https://the-brandidentity.com/insight/how-to-meaningfully-incorporate-motion-into-branding-with-studio-dumbar-dia-and-connor-campbell
- **O que faz:** DIA ("Time is Form, Form is Time") cria identidades de tipografia cinética; o que fica constante é "the
  frame where everything lives". Studio Dumbar: "motion should enhance communication" e "this doesn't mean that everything
  should always move".
- **Copiar:** **moldura fixa, conteúdo que muda**: margens, posição do rótulo e do contador de progresso iguais em todos os
  reels; o que varia é a escala e o tipo de revelação. E a regra de ouro: uma coisa se move de cada vez.

### 9. ManvsMachine · Oura Ring "Horizon" [busca]
- **Link:** https://www.behance.net/gallery/155432183/Oura-Ring-Horizon?locale=en_US (Behance devolveu 403 na leitura)
- **O que faz (segundo a busca):** CGI de lançamento da 4ª geração do anel, com design, direção e animação do estúdio
  (Cinema 4D, Houdini, Redshift). Estética de tecnologia de bem-estar: luz rasante, material polido, fundo escuro.
- **Copiar:** **anéis de precisão com luz rasante** (já previstos no DS) como objeto-herói abstrato. Pode ser gerado no
  Runway/Kling a partir de uma imagem do ChatGPT ("anel dourado fino girando devagar sobre azul-marinho, luz rasante").

### 10. ManvsMachine · Canva/Affinity "hype film" [aberto]
- **Link:** https://www.stashmedia.tv/?p=119582
- **O que faz:** mistura "3D, 2D motion, kinetic typography and hand-drawn illustration" numa peça de ritmo alto; frases
  curtas em tipografia cinética alternando com cenas de produto.
- **Copiar:** **alternância de linguagem a cada cena** (tipografia pura → textura → gráfico → tipografia), que é o oposto do
  "mesma cena 6 vezes" de hoje.

### 11. Media.Work · SkinCeuticals Brand Assets [busca]
- **Link:** https://www.behance.net/gallery/188696343/SkinCeuticals-Brand-Assets (403 na leitura)
- **O que faz (segundo a busca):** série de visualizações para a mensagem central da marca, com um conjunto de metáforas
  "to demonstrate a clear commitment to research and evidence-based validity" e linguagem visual constante entre produtos.
- **Copiar:** **uma metáfora fixa por ativo** (vitamina D = luz; magnésio = cristal; ômega-3 = gota de óleo dourado;
  colágeno = fibra/malha; sono = anel que fecha), sempre a mesma, para o público reconhecer a série.

### 12. skovran · "Vitamin C Serum – Promo Video" (Dribbble) [aberto: lista do perfil]
- **Link:** https://dribbble.com/shots/20324577-Vitamin-C-Serum-Promo-Video · perfil https://dribbble.com/skovran
- **O que faz:** filme 3D em Blender com gotas e simulação de fluido (tags: droplets, fluid, simulation). O vídeo em si não
  foi assistido; a descrição vem do título e das tags.
- **Copiar:** **macro de gota em câmera lenta como fundo vivo** atrás da palavra (T10). Para ômega-3: gotas douradas de
  óleo se juntando em água escura.

### 13. Beetroot Design · SPL 2.0 Nutrition Supplements [busca]
- **Link:** https://www.behance.net/gallery/122431217/SPL-20-Nutrition-Supplements?locale=en_US (403 na leitura)
- **O que faz (segundo a busca):** série 3D em After Effects, um vídeo por produto, e "each product video introduces new
  visual elements, manipulating their motion in unexpected ways".
- **Copiar:** **série com regra fixa e um elemento novo por episódio** (mesma moldura, mesma música, um "brinquedo" visual
  diferente em cada tema). Resolve o "pouco criativo" sem perder a identidade.

### 14. Vitabear · animação para Vitafor Nutrientes (marca brasileira) [busca]
- **Link:** https://www.behance.net/gallery/181709869/Vitabear-Product-Motion (403 na leitura)
- **O que faz (segundo a busca):** animação 3D em Blender para redes sociais de uma marca nacional de suplementos.
- **Copiar:** prova de que marca brasileira de suplemento já usa 3D próprio no feed. **Não copiar** o produto em cena (regra
  de manipulado); copiar o acabamento de material e luz para os objetos abstratos.

### 15. Innocean Berlin · "Glory over Pain" (Motionographer) [aberto]
- **Link:** https://motionographer.com/quickie/innocean-berlin-glory-over-pain
- **O que faz:** tipografia inspirada em rótulos clínicos; prescrições que correm como traçado de eletrocardiograma;
  transições "ciber-médicas" (raio-X revelando a planta da peça).
- **Copiar:** **rótulo técnico que corre** (fita fina de 34 px no topo da cena: "LOTE · LAUDO · QUARENTENA · LIBERADO")
  para os reels de qualidade de manipulação. Sem a parte de pílulas e frascos, que é vetada aqui.

### Complementares (úteis, mas fora da lista principal)
- **Motion Array · Mirage Typography Stories** (6 layouts verticais 1080×1920 de tipografia) [busca]:
  https://motionarray.com/after-effects-templates/mirage-typography-stories-1251191/ . Bom para ver ritmo de texto vertical.
- **School of Motion · Stretch and smear text** (match cut entre palavras com corte escalonado letra a letra) [busca]:
  https://schoolofmotion.com/blog/stretch-and-smear-text-tutorial . E a série de tipografia cinética:
  https://schoolofmotion.com/blog/kinetic-typography-after-effects-part-1
- **Contra · produto premium em 3D, ritmo "fast-slow-fast"** com gancho nos primeiros segundos [busca]:
  https://contra.com/community/0dhrddQS-transform-your-product-with-premium-3-d
- **Mainframe · Augustinus Bader**: estética "entre sessão de fotos e laboratório real", filme modular [busca; 401 na
  leitura]: https://mainframeuk.squarespace.com/augustinus-bader-case-study
- **Little Troop · Bon Elliot**: as iniciais se movem e formam um diagrama das três camadas da pele [busca]:
  https://www.itsnicethat.com/articles/little-troop-bon-elliot-branding-graphic-design-project-150426
- **Unsaid Studio · Future Health**: campanha de saúde que evita jaleco, microscópio e "código flutuando" [busca; 403]:
  https://lbbonline.com/news/unsaid-studio-dreams-up-a-healthcare-campaign-you-could-hang-in-a-gallery
- **George Railean · animação de painel médico** (contadores e gráficos) [busca]:
  https://dribbble.com/shots/10478889-UI-Animation-for-Medical-Dashboard

---

## 2. Criadores que produzem com IA (fonte de ideias pedida pela dona)

| Criador ou fonte | Ferramentas | O que aproveitar | Link | Status |
|---|---|---|---|---|
| **Amanda Diniz** (Divos da IA) | Claude Design, Claude, Canva | "Quem decide é você; a IA executa"; design system configurado antes; referência de exemplo; chat novo quando "emburrece" (já aplicado antes) | post no Instagram `instagram.com/p/DdUUNuuFI9L` | **Não confirmado na web** (Instagram exige login; nada público achado) |
| **@elismarvila** (parceria com a Amanda) | idem | idem | — | **Não confirmado** (busca sem resultado) |
| **Kevin Stratvert** | Claude Design + DaVinci Resolve | Claude Design gera títulos, gráficos, linhas do tempo, ícones e diagramas animados; sobe o SRT e os arquivos da marca para sincronizar; exporta MP4 | https://kevinstratvert.com/2026/08/10/how-to-create-motion-graphics-with-claude-ai/ | [aberto] |
| **MindStudio** (guia) | Claude Design | Contadores e gráficos só aparecem se o prompt pedir: "Animate the counter counting up from 0 to the target value", "Animate the bars growing up on slide entry" | https://www.mindstudio.ai/blog/claude-design-animated-prototypes-slide-decks | [aberto] |
| **Daria Cupareanu** (AI blew my mind) | Skill de carrossel no Claude + GPT Images 2 ou Nano Banana | Uma skill com vários estilos salvos; Claude propõe o conceito e o roteiro de slides antes de gerar; cerca de US$ 1 por 20 imagens | https://aiblewmymind.substack.com/p/claude-instagram-carousel-skill | [aberto] (passo a passo pago não lido) |
| **Lucas Petry** (Asimov Academy, BR) | Claude Design | Masterclass e curso "Dominando Claude Design" | https://hub.asimov.academy/curso/dominando-claude-design/ | [busca]; conteúdo **não confirmado** |
| **Rory Flynn** (Systematiq) | Midjourney + Runway | "Micro-moodboards" como fichas de estilo; Runway com "First Frame" a partir de foto em alta | https://systematiq.beehiiv.com/p/5-step-ad-creative-workflow-runway-releases-act-2 | [busca] |
| **AI for Real Life** | Higgsfield | Transição por quadro inicial e final: último quadro da cena A + primeiro da cena B, movimento "Super Dolly In" + "Mix" com outro efeito; manter luz e cor parecidas | https://ai-for-real-life.beehiiv.com/p/how-to-use-higgsfield-ai-to-create-seamless-transitions-between-scenes | [aberto] |
| **Higgsfield Ads** (guia oficial) | Higgsfield | Predefinições de câmera para produto; aviso: **texto pequeno distorce** nas predefinições que giram | https://higgsfield.ai/blog/Introducing-Higgsfield-Ads-2.0-The-Future-of-Ads-is-Here | [busca] |
| **Kapwing** (tutoriais) | Higgsfield | "Eye Zoom" e "Earth Zoom Out"; o vídeo sai na proporção da imagem de referência, então a imagem já deve ser 9:16 | https://www.kapwing.com/resources/ai-eye-zoom-tutorial-lost-in-your-iris-trend/ | [busca] |
| **Pencil** (comunidade) | Kling 3.0 e 2.5 | Testes de líquido, macro e beleza; pedir física do líquido, bolhas, luz e pouca profundidade de campo | https://community.trypencil.com/public/blogs/kling-is-now-on-pencil-2026-05-25 | [busca] |
| **Martini.art** (prompts) | Kling 3 | Gotas em câmera lenta e loops de detalhe de material; gerar várias variantes e escolher | https://martini.art/en/prompts/video/product-ad-prompts | [busca] |

**Já estudados antes (não repetidos):** xray.tech, WhyTryAI, João Queirós, Mejba (HyperFrames), eesel, InstantDM,
Mika Reyes, Ikjot Juneja, CreativeClaw, TryMyPost, PostNitro, Open Carrusel.

**O que esses criadores fazem que nós ainda não fazemos:**
1. **Pedem a animação explicitamente.** O Claude Design não anima contador nem gráfico se o prompt não mandar (MindStudio).
2. **Separam fundo gerado e texto.** Textura e vídeo vêm da IA (ChatGPT, Runway, Kling, Higgsfield) **sem texto**; a
   tipografia entra por cima no HTML. O aviso do Higgsfield confirma: texto pequeno gerado pela IA deforma.
3. **Transição por quadro inicial e final.** Em vez de corte seco, geram o "meio" entre duas imagens (Higgsfield, Runway).
4. **Mantêm um estilo salvo** (skill, moodboard, ficha de estilo) e mudam só o conteúdo. É a mesma lógica do "frame fixo"
   da DIA.

---

## 3. Técnicas de animação de alto impacto (15), com parâmetros

### 3.1 Tabela-mestra de parâmetros (1080×1920, 30 fps)

| Item | Valor | Base |
|---|---|---|
| **Palavra-herói** (1 a 2 palavras) | 220 a 480 px, ou ajustada à largura (ocupa 85 a 90% da largura útil, ~800 a 860 px); peso 700; caixa normal | Hopper: "Size the text for a thumbnail" [aberto](https://www.hopperhq.com/blog/instagram-reel-size/) |
| **Título-frase** | 120 a 150 px; peso 300 com a palavra-chave em 700; até 3 linhas de até 18 caracteres | DS (300 + 700) com piso maior |
| **Apoio** | 56 a 64 px; peso 400 a 500; até 2 linhas de até 30 caracteres | ~20 a 23 pt no celular, acima dos 17 pt do iOS |
| **Rótulo / eyebrow** | 34 a 38 px; peso 600; maiúsculas espaçadas .2em | |
| **Fonte citada** | 30 px; peso 400; 70% de opacidade | |
| **Aviso do cartão final** | 28 a 30 px; mínimo 2,5 s na tela | |
| **Peso 300** | só a partir de 120 px; abaixo disso, 400 ou mais | traço fino some na compressão |
| **Velocidade de leitura** | permanência (depois da entrada) = caracteres ÷ 15 + 0,5 s; mínimo 1,0 s; frase legal literal: caracteres ÷ 13 | Netflix pt-BR: legendas até 17 caracteres/s (adulto) [aberto](https://partnerhelp.netflixstudios.com/hc/en-us/articles/215600497-Portuguese-Brazil-Timed-Text-Style-Guide); usamos 15 porque o texto se move e disputa com a imagem |
| **Duração de cena** | gancho 1,2 a 1,8 s; cena de informação 2,0 a 3,0 s; "flash" de palavra 0,5 a 0,7 s; cartão final 3,0 a 3,5 s | |
| **Entrada do herói** | 500 a 700 ms, `cubic-bezier(0.05,0.7,0.1,1)` (emphasized decelerate) | Material [aberto](https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md) |
| **Entrada padrão** | 400 a 600 ms, `cubic-bezier(0.16,1,0.3,1)` (já no DS) ou `cubic-bezier(0,0,0.3,1)` | Carbon "expressive entrance" [aberto](https://carbondesignsystem.com/elements/motion/overview/) |
| **Saída** | 200 a 350 ms (50 a 60% da entrada), `cubic-bezier(0.3,0,0.8,0.15)` ou `cubic-bezier(0.4,0.14,1,1)` | Material / Carbon |
| **Movimento grande** (zoom, máscara de tela inteira) | 700 a 900 ms, `cubic-bezier(0.87,0,0.13,1)` (entra e sai acelerando) | Carbon: slow-02 = 700 ms |
| **Atraso entre palavras / linhas** | 60 a 90 ms por palavra; 70 ms por linha; sequência total até 450 ms | |
| **Atraso N1 → N2** | N2 entra 300 a 450 ms depois que N1 termina | |
| **Área do texto crítico** | x de 80 a 930; y de 280 a 1250. Canto inferior direito (x > 850 e y > 1150) livre | Hopper: topo ~270 px, base ~670 px (legenda), trilho de botões ~230 px à direita na parte de baixo |
| **Batida** | 1 tempo = 60 ÷ BPM. 90 BPM = 0,667 s · 100 = 0,6 s · 110 = 0,545 s · 120 = 0,5 s. Corte a cada 2 ou 4 tempos | |

### 3.2 Regras de hierarquia de texto

1. **No máximo 3 níveis por tela:** N1 (palavra-herói, número ou título-frase), N2 (apoio), N3 (rótulo ou fonte). O aviso
   legal só aparece no cartão final.
2. **Proporção entre níveis:** N1 ÷ N2 de pelo menos **2,5** (título-frase) e de pelo menos **4** (palavra-herói ou número).
   N2 ÷ N3 perto de **1,6**. Dois textos com tamanhos entre 1,0 e 1,4 vez um do outro na mesma tela são proibidos (o olho
   não sabe qual ler primeiro).
3. **Palavras por tela:** gancho de 1 a 4; tela de impacto (flash) de 1 a 2; tela de informação até **12 somando N1 e N2**.
   A frase literal da IN 28 pode ser dividida em 2 telas, sempre numa pausa natural.
4. **Uma ideia por tela** e **um dourado por tela** (só a palavra-chave ou o número).
5. **Ordem de entrada:** N1 primeiro, N2 depois, N3 por último (ou já fixo). Nunca duas coisas entrando ao mesmo tempo.
6. **Uma coisa se move de cada vez.** Enquanto o N1 entra, o fundo fica parado ou só respira (escala lenta).
7. **Contraste:** texto sobre textura sempre com véu noite de 45 a 60% atrás; 4,5:1 no mínimo. No fundo gelo, o dourado de
   texto vira #7E6131.
8. **Moldura fixa:** rótulo, barra de progresso e margens no mesmo lugar em todos os reels; o que muda é o miolo.

### 3.3 As 15 técnicas

**T1. Palavra-herói ajustada à largura + puxada de foco**
- Uma palavra ocupa 85 a 90% da largura útil. Entra com escala 1,12 → 1,00 e desfoque 14 → 0 px em 600 ms
  (`cubic-bezier(0.05,0.7,0.1,1)`), como lente focando. N2 entra 350 ms depois.
- Uso: gancho e virada. Uma a duas vezes por reel.
```js
// depois que a fonte carregar; el com display:inline-block e white-space:nowrap
function caber(el, largura = 860, teto = 520) {
  el.style.fontSize = "200px";
  el.style.fontSize = Math.min(teto, 200 * largura / el.getBoundingClientRect().width) + "px";
}
```

**T2. Revelação por fenda (linha que sobe de dentro de uma máscara)**
- Cada linha mora numa caixa com `overflow:hidden`; o texto sobe de 105% para 0 em 600 ms, 70 ms entre linhas.
  Parece impressão de luxo, não "fade".
```css
.linha{display:block;overflow:hidden;padding-bottom:.08em}
.linha>span{display:block;transform:translateY(105%);
  animation:fenda .6s cubic-bezier(.05,.7,.1,1) calc(var(--t0) + var(--k) * .07s) forwards}
@keyframes fenda{to{transform:none}}
```
- Saída espelhada: sobe mais 105% em 280 ms com `cubic-bezier(.3,0,.8,.15)`.

**T3. Palavra-janela (textura macro vista por dentro das letras)**
- A palavra-herói é recortada sobre uma textura macro (pó dourado, cristais, gotas, seda) que se move devagar dentro dela.
  Resolve "tecnologia + sofisticação" sem ilustrar nada.
```css
.janela{background:url(textura.jpg) center/130%;-webkit-background-clip:text;background-clip:text;color:transparent;
  font-weight:700;animation:janela var(--dur) linear both}
@keyframes janela{to{background-position:60% 45%;background-size:115%}}
```
- A textura vem do ChatGPT (imagem) sem texto. Para vídeo atrás das letras, gerar a sequência de quadros e trocar o
  `background-image` por quadro no motor.

**T4. Inversão claro ↔ escuro na batida**
- A cena seguinte entra em fundo gelo #F3F5F8 com texto noite, em corte seco exatamente num tempo forte. Opcional: 2 quadros
  de clarão branco a 40% antes. No máximo 2 a 3 inversões por reel de 15 s.
- Uso: "mito × verdade", "mais teor ≠ mais absorção", a frase que precisa de peso.

**T5. Match cut por forma**
- A forma do último quadro de uma cena é a forma do primeiro quadro da próxima, na mesma posição e tamanho: o "O" de
  "Ômega" vira o anel de porcentagem; o pingo do "i" vira a partícula que viaja até o mapa; o traço do rótulo vira a barra.
- Como fazer: medir a posição da letra (`Range.getBoundingClientRect()`) e nascer a forma nova ali com o mesmo
  `transform-origin`. Corte no tempo forte, sem transição: a continuidade é a transição.

**T6. Mergulho na letra (zoom-through) e recuo revelador (zoom-out)**
- **Mergulho:** a câmera entra no vazio de uma letra (o "o", o "a", o "0" de um número) e a cena seguinte já está lá dentro.
```css
.mergulho{transform-origin:var(--ox) var(--oy);animation:mergulho .8s cubic-bezier(.87,0,.13,1) var(--t) forwards}
@keyframes mergulho{60%{filter:blur(6px)}to{transform:scale(40);filter:blur(0);opacity:0}}
```
- **Recuo:** começa com a textura macro ocupando a tela (mistério) e recua até revelar que ela é o miolo de uma palavra,
  de um mapa ou de um anel. 900 ms, mesma curva. Ótimo para o gancho.
- Referências: tutvid (zoom através do texto com máscara e câmera) [busca](https://tutvid.com/after-effects/zoom-text-intro-transition-effect-effects-cc/) ·
  Toolfarm (zoom infinito) [busca](https://www.toolfarm.com/?p=61343).

**T7. Contador com dígitos fixos e frenagem**
- Número de 280 a 420 px, unidade com 30% do tamanho do número. Sobe em 0,9 a 1,4 s com desaceleração forte (os últimos 15%
  levam metade do tempo). No fim, pulso de escala 1,00 → 1,03 → 1,00 em 300 ms e um reflexo de luz.
- `font-variant-numeric: tabular-nums` para os dígitos não tremerem. Se a Poppins carregada não tiver `tnum` (conferir),
  envolver cada dígito num `inline-block` de largura fixa (`.62em`).
- Som: tique a cada passo, no máximo 12 por segundo; acima disso, um "zip" contínuo.

**T8. Gráfico que se desenha (anel, barras, pictograma "1 em cada N", mapa)**
- Ordem fixa: forma (900 a 1200 ms) → número (contador) → rótulo (300 ms). Segura 1,5 s com tudo completo.
```html
<svg viewBox="0 0 200 200" class="anel" style="--v:95">
  <circle cx="100" cy="100" r="88" pathLength="100" class="trilha"/>
  <circle cx="100" cy="100" r="88" pathLength="100" class="arco"/></svg>
```
```css
.anel{width:640px;transform:rotate(-90deg)}
.anel circle{fill:none;stroke-width:9}
.trilha{stroke:rgba(244,242,190,.14)}
.arco{stroke:#D9C78E;stroke-linecap:round;stroke-dasharray:100;stroke-dashoffset:100;
  animation:arco 1.2s cubic-bezier(.05,.7,.1,1) var(--t0) forwards}
@keyframes arco{to{stroke-dashoffset:calc(100 - var(--v))}}
```
- Pictograma: 10 ou 100 ícones (pontos de 34 px, espaço de 18 px); os destacados acendem em sequência com 20 a 30 ms entre
  eles. Barras: horizontais, rótulo à esquerda e valor à direita, crescem com 150 ms de diferença entre elas.

**T9. Tela dividida (split) 50/50**
- Em 9:16 a divisão boa é horizontal: metade de cima com textura ou foto, metade de baixo com tipografia (ou "D2" em cima
  e "D3" embaixo). A linha divisória se desenha em 400 ms; as metades entram em direções opostas em 500 ms.
- Variante "mito | verdade": a metade "mito" sai pela esquerda e a "verdade" ocupa a tela inteira (T4 junto).

**T10. Textura macro como palco (pó, cristais, gotas, seda, bolhas)**
- Clipe de 4 a 6 s gerado a partir de imagem do ChatGPT no Runway, Kling ou Higgsfield, câmera travada, câmera lenta, sem
  texto. Véu noite de 45 a 60% e o texto por cima.
- Prompt-base: "macro extremo de [cristais de magnésio translúcidos / pó dourado fino em suspensão / gotas de óleo dourado
  em água escura / fibras de seda perolada], fundo azul-marinho #0F1C2C, luz lateral rasante dourada, pouca profundidade
  de campo, câmera travada, movimento lento, sem texto, sem embalagem, sem cápsula, sem pílula, 9:16".
- Metáfora fixa por ativo: vitamina D = luz e poeira de luz; magnésio = cristal; ômega-3 = gota dourada; colágeno =
  fibra e malha; creatina = pulso de energia em linhas; sono = anel que fecha; cabelo = fios de luz finos.

**T11. Reflexo especular + grão vivo**
- Reflexo: uma faixa estreita de branco passa pelo dourado da palavra-chave **uma vez por cena**, em 900 a 1200 ms,
  `cubic-bezier(.45,0,.55,1)`. O motor já tem um "brilho"; a melhoria é um pico branco estreito (45 a 55%) em vez de um
  degradê largo.
```css
.reflexo{background:linear-gradient(100deg,#A07F45 0%,#D9C78E 40%,#FFFFFF 50%,#D9C78E 60%,#A07F45 100%);
  background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;
  animation:reflexo 1.1s cubic-bezier(.45,0,.55,1) var(--t) both}
@keyframes reflexo{from{background-position:100% 0}to{background-position:0 0}}
```
- Grão vivo (diferente do dither parado de outro projeto): a textura de ruído muda de posição a cada 2 quadros, 4 a 5% de opacidade.
```css
.grao{position:absolute;inset:-50%;background:var(--grao);opacity:.045;mix-blend-mode:overlay;pointer-events:none;
  animation:grao .2s steps(3) infinite}
@keyframes grao{33%{transform:translate(-7%,4%)}66%{transform:translate(5%,-6%)}}
```

**T12. Ritmo na batida + pulso de áudio**
- Escolher a música antes e anotar o BPM. Começo de cada cena num tempo forte: `t = n × 60 / BPM`. Palavras "flash" na
  caixa (tempos 2 e 4). Cartão final entra no começo de um compasso.
- Pulso (como o logo da orquestra de Milão): extrair o volume por quadro e ligar ao brilho ou à espessura de um elemento
  nosso. Para 30 fps e áudio de 44,1 kHz, 1470 amostras por quadro (testar no `sonorizar.mjs`):
```
ffmpeg -i musica.mp3 -af "asetnsamples=n=1470:p=0,astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level:file=rms.txt" -f null -
```
  Converter cada valor em dB para 0 a 1 com `(db + 40) / 40` (limitado) e passar como `--pulso` no quadro.

**T13. Aperto de espaçamento (tracking-in) com troca de peso**
- A palavra entra com espaçamento .25em e desfoque 6 px e fecha em -.03em em 700 a 900 ms (`cubic-bezier(.16,1,.3,1)`).
  Para "trocar o peso", duas cópias empilhadas (300 e 700); a de 700 aparece por opacidade em 250 ms quando o espaçamento
  fecha.
```css
@keyframes aperta{from{letter-spacing:.25em;opacity:0;filter:blur(6px)}to{letter-spacing:-.03em;opacity:1;filter:blur(0)}}
```
- É o efeito mais "joalheria" da lista. Uso: nome do ativo, "Santaluz-BA" no cartão final.

**T14. Estrutura rápida-lenta-rápida (3 atos)**
- Ato 1 (0 a 2 s): gancho rápido, cortes de 0,6 a 1,2 s. Ato 2 (2 a 11 s): informação com respiro, cenas de 2 a 3 s. Ato 3
  (últimos 3 a 4 s): aceleração curta (2 ou 3 flashes de 0,5 s) e cartão final parado.
- Referência de ritmo: produto premium em 3D com ritmo "fast-slow-fast" [busca](https://contra.com/community/0dhrddQS-transform-your-product-with-premium-3-d).

**T15. Câmera virtual com profundidade (paralaxe de 3 camadas)**
- Fundo, meio (partículas, anéis, grade) e texto se movem em velocidades diferentes: fundo 2%, meio 5%, texto 8% da altura
  ao longo da cena; o palco inteiro faz escala 1,00 → 1,04 e gira no máximo 0,5°. Nenhum quadro fica parado e a cena ganha
  volume sem 3D de verdade.
- Para 3D abstrato de verdade (anéis polidos, cristal girando), gerar o clipe no Runway ou Kling e usar como camada de fundo.

**Bônus: fita de rótulo técnico** (Innocean): uma fita de 34 px correndo devagar no topo da área segura com
"LOTE · LAUDO · QUARENTENA · LIBERADO". Só nos temas de qualidade.

### 3.4 Tipos de cena novos para o motor (sugestão)
`palavra` (T1/T13) · `fenda` (T2) · `janela` (T3) · `split` (T9) · `anel` / `barras` / `pictograma` / `mapa` (T8) ·
`mergulho` (T6) · `flash` (palavras na batida, T12) · `linha` (linha do tempo) · e no post: `bpm`, `inverte: true` por cena
(T4), `textura` por cena (T10), `camera: "paralaxe"` (T15). O tipo `final` ganha tamanhos novos (seção 4).

---

## 4. Dez roteiros-modelo (12 a 20 s)

**Cartão final padrão (CF), 3,0 a 3,5 s**, igual em todos: logo dourado inteiro no centro (opacidade e escala 0,96 → 1,
nunca animado por partes) · "Chame no WhatsApp" (N2, 56 px) · **(75) 99878-6349** (N1, 96 px, peso 600, botão verde) ·
"Avaliação personalizada · Entrega grátis para toda a Bahia" (40 px) · rótulo "SANTALUZ-BA" com T13 (34 px) · aviso (28 px).
Último quadro igual ao primeiro do reel quando der (loop).

Fatos tirados de `conteudo/fatos-novembro-2026.md` e `conteudo/fatos-ativos-novembro.md`. Frases da IN 28 entre aspas,
literais. Sem dose, sem "tome", sem produto em cena, sem cápsula desenhada.

### R1. Vitamina D · "D2 ou D3?" (15 s, 100 BPM, 1 tempo = 0,6 s)
| Tempo | Texto exato | Técnica |
|---|---|---|
| 0,0–1,8 | N1 em cima "D2", N1 embaixo "D3" (420 px cada) · N2 central "ou?" | T9 split já cheio no quadro 0; metade de cima gelo, de baixo noite (T4 dentro da mesma tela) |
| 1,8–4,2 | "Mesmo nome." (300, 130 px) / "**Origens diferentes.**" (700 dourado) | T2 fenda, linha a linha; T15 paralaxe com poeira de luz |
| 4,2–7,2 | Em cima: "D2 · fungos e leveduras + luz UV" · Embaixo: "D3 · forma-se na pele ao sol" (60 px) | T9 com T10: textura de luz difusa em cima, luz quente rasante embaixo |
| 7,2–10,2 | Barras: "D3" 100 · "D2" 60 · N2 "Em doses diárias, a D2 elevou cerca de 40% menos" · N3 "Revisão, Adv Nutr 2024" | T8 barras + T7 no "40%" |
| 10,2–12,0 | "A vitamina D auxilia na absorção de **cálcio** e fósforo." | T3 palavra-janela em "cálcio" com cristais; T11 reflexo |
| 12,0–15,0 | CF + N2 acima: "Qual e quanto: com seu médico." | CF |

### R2. Colágeno · "Parecidos, mas não iguais" (16 s, 96 BPM)
| Tempo | Texto exato | Técnica |
|---|---|---|
| 0,0–1,6 | "Colágeno" ajustado à largura | T1; aos 1,2 s a palavra se parte na horizontal (metade sobe, metade desce) abrindo a T9 |
| 1,6–4,6 | Em cima: "**Hidrolisado**" / "em pedaços · usado em gramas" · Embaixo: "**Tipo II não desnaturado**" / "inteiro · usado em miligramas" | T9; texturas: pó fino em cima, fibra translúcida embaixo (T10) |
| 4,6–7,0 | "Hidrolisado = peptídeos" | T6 mergulho no "o" de "pedaços" → dentro, a fibra se desfaz em pontos dourados (sistema SecondKind) |
| 7,0–9,6 | "O colágeno tipo II não desnaturado" | T2, tela 1 da frase literal |
| 9,6–12,6 | "auxilia na manutenção da **função articular**." | T2, tela 2; T11 reflexo |
| 12,6–16,0 | CF + N2 acima: "Qual faz sentido? Sua prescrição define." | CF |

### R3. Sono · "7 horas ou mais" (15 s, 90 BPM, 1 tempo = 0,667 s)
| Tempo | Texto exato | Técnica |
|---|---|---|
| 0,0–2,0 | "7 h" (N1 400 px) · "ou mais por noite" (N2) · N3 "Consenso AASM/SRS, 2015" | T7 contador 0 → 7 dentro de T8 anel que fecha 7/24 |
| 2,0–5,0 | "Café às 16 h?" (N1) · "Num estudo, cafeína 6 h antes ainda atrapalhou o sono." (N2) | T5: o anel vira mostrador; um arco de 6 h acende em dourado |
| 5,0–7,4 | "Tela acesa = sono mais tarde." | T4 inversão para gelo (a tela "acende"); N3 "PNAS, 2015" |
| 7,4–10,0 | Em cima "Álcool" · embaixo "Pega no sono rápido. Acorda mais." | T9 split |
| 10,0–12,0 | "Insônia 3× por semana, por 3 meses? **Merece avaliação.**" | T8 pictograma de 7 pontos com 3 acesos; T2 |
| 12,0–15,0 | CF | CF (sem melatonina, sem "para dormir") |

### R4. Creatina · "95% mora no músculo" (14 s, 110 BPM)
| Tempo | Texto exato | Técnica |
|---|---|---|
| 0,0–1,8 | "95%" (N1 420 px dourado) · "da creatina do corpo fica nos músculos" · N3 "ISSN, 2017" | T7 + T8 anel; quadro 0 já com o anel em 60% |
| 1,8–4,2 | "Seu corpo **já fabrica**." · N3 "fígado e rins" | T5: o anel se fecha num ponto que se divide em dois pontos ligados por linhas finas |
| 4,2–7,0 | "~2 g por dia" (N1) · "é o que um adulto de 70 kg gasta" (N2) · barra dividida "até metade vem da dieta · o resto o corpo produz" · N3 "Amino Acids, 2016" | T8 barra dividida; T12 a divisão pulsa na batida (é gasto do corpo, não dose: não usar fora desse contexto) |
| 7,0–8,8 | "A creatina auxilia no aumento do desempenho físico" | T2 tela 1; T10 linhas de energia ao fundo |
| 8,8–11,0 | "durante exercícios repetidos de curta duração e alta intensidade." | T2 tela 2 (frase literal da IN 28) |
| 11,0–14,0 | CF | CF |

### R5. Qualidade de manipulação · "Antes de virar a sua fórmula" (18 s, 100 BPM)
| Tempo | Texto exato | Técnica |
|---|---|---|
| 0,0–1,8 | "Laudo" ajustado à largura · N3 "CADA LOTE DE MATÉRIA-PRIMA" | T1 + T11 reflexo; fita de rótulo técnico no topo |
| 1,8–4,6 | "Chega com laudo de análise." / "**E é conferido.**" | T2; o dourado só em "conferido" |
| 4,6–7,4 | "Quarentena" (N1) · "até o controle de qualidade liberar" | T13 aperto; grade técnica aparece e se fecha em volta da palavra |
| 7,4–10,4 | Linha do tempo: "Laudo → Quarentena → Liberação → Pesagem" | T8 linha que se desenha; cada estação acende na batida (T12) |
| 10,4–13,4 | "Balanças verificadas **todo dia**." / "Calibradas ao menos 1× por ano." | T4 inversão para gelo; T7 no "1×" |
| 13,4–15,0 | "Na pesagem: lote, quantidade e quem pesou." | T2; N3 "RDC 67/2007" |
| 15,0–18,0 | CF | CF |

### R6. Queda de cabelo · "100 fios" (15 s, 120 BPM, 1 tempo = 0,5 s)
| Tempo | Texto exato | Técnica |
|---|---|---|
| 0,0–1,8 | "100" (N1) · "fios por dia" | T7 contador; ao fundo, 100 linhas finas douradas (fios de luz) que caem devagar (T8 pictograma vertical) |
| 1,8–4,2 | "Cerca de 100 por dia **é normal**." · N3 "SBD" | T2 |
| 4,2–7,2 | Flashes de 0,6 s: "Genética" · "Tireoide" · "Anemia" · "Estresse" · "Pós-parto" | T12 uma palavra por batida dupla, cada uma com T1 |
| 7,2–9,8 | "Vitamina só faz diferença **quando falta**." | T4 inversão para gelo |
| 9,8–12,0 | "O caminho começa por uma **avaliação**." | T2 + T11 |
| 12,0–15,0 | CF | CF |

### R7. Ômega-3 · "1.000 mg de óleo ≠ 1.000 mg de ômega-3" (17 s, 100 BPM)
| Tempo | Texto exato | Técnica |
|---|---|---|
| 0,0–1,8 | "1.000 mg" (N1) e, aos 1,2 s, um "≠" corta a tela | T1; o "≠" entra num tempo forte (T12) |
| 1,8–4,8 | Barra empilhada "1.000 mg de óleo de peixe típico" com o trecho "~180 EPA + ~120 DHA" aceso · N3 "NIH ODS" | T8; o resto da barra fica translúcido |
| 4,8–7,4 | "No rótulo, procure **EPA + DHA**." | T3 palavra-janela com gotas douradas em água escura (T10) |
| 7,4–10,4 | "Da linhaça (ALA) para EPA e DHA: menos de 15%." | T8 pictograma de 100 pontos, 14 acesos; T5 o último ponto vira gota |
| 10,4–12,4 | "Os ácidos graxos ômega 3 EPA e DHA" | T2 tela 1 |
| 12,4–14,4 | "auxiliam na redução dos triglicerídeos." | T2 tela 2 (literal da IN 28) |
| 14,4–17,4 | CF | CF (total 17,4 s) |

### R8. Magnésio · "O nome do sal muda a conta" (16 s, 110 BPM)
| Tempo | Texto exato | Técnica |
|---|---|---|
| 0,0–1,6 | "Magnésio" ajustado à largura | T3 palavra-janela com cristais translúcidos; T6 recuo: abre na textura e recua até a palavra |
| 1,6–5,0 | Barras: "Óxido ~60%" · "Citrato 12–16%" · "Bisglicinato ~14%" · "Treonato ~8%" · N2 "quanto de cada sal é magnésio" · N3 "cálculo pela fórmula química" | T8 barras com 150 ms entre elas + T7 em cada valor |
| 5,0–7,6 | "**Mais teor ≠ mais absorção.**" | T4 inversão para gelo |
| 7,6–10,0 | "O óxido, pouco solúvel, foi menos absorvido em estudos." · N3 "NIH ODS" | T2; a barra do óxido perde brilho (T5) |
| 10,0–12,6 | "O magnésio auxilia no **funcionamento muscular**." | T2 + T12 pulso no anel de fundo |
| 12,6–16,0 | CF | CF |

### R9. Novembro Azul · "3 em cada 10" (15 s, 90 BPM)
| Tempo | Texto exato | Técnica |
|---|---|---|
| 0,0–2,0 | "3 em cada 10" (N1) · "cânceres em homens são de próstata*" · N3 "*sem contar pele não melanoma · INCA" | T8 pictograma de 10 pontos, 3 acesos em dourado (um azul-claro só nesta peça depende de aprovação da gestão, porque não está no DS); quadro 0 já com os 10 pontos |
| 2,0–4,6 | "77.920" (N1) · "casos novos por ano no Brasil" · N3 "INCA, 2026–2028" | T7 contador |
| 4,6–7,4 | "6.540 na Bahia em 2026" | T5 o ponto aceso viaja e vira o pino num contorno da Bahia (T8 mapa) |
| 7,4–10,4 | "Exame da próstata: **decisão sua, com o seu médico**." | T4 inversão para gelo; T2 |
| 10,4–12,0 | "Converse." ajustado à largura | T1 |
| 12,0–15,0 | CF + N2 acima: "A Biomagistral Santaluz-BA apoia o Novembro Azul." | CF (sem logo do INCA, SBU ou Ministério) |

### R10. Da receita à sua porta (institucional, 14 s, 100 BPM)
| Tempo | Texto exato | Técnica |
|---|---|---|
| 0,0–1,6 | "Sua receita." ajustado à largura | T1 + T15; fundo com linhas manuscritas abstratas e ilegíveis |
| 1,6–4,0 | "Envie pelo **WhatsApp**." | T2; um ponto dourado nasce no pingo do "i" (T5) |
| 4,0–7,0 | "Manipulada em **Santaluz-BA**." | T6 recuo: macro de pó dourado recua até virar o pino de Santaluz no mapa |
| 7,0–10,0 | "Entrega grátis para toda a Bahia." | T8 mapa: linhas finas saem de Santaluz para o estado; T12 cada linha nasce numa batida |
| 10,0–14,0 | CF + N3 no aviso: "Exceto medicamentos controlados." | CF |

---

## 5. Carrossel: 12 técnicas de alto impacto (1080×1350)

Valem as mesmas regras de hierarquia da seção 3.2, com tamanhos de carrossel: palavra-herói 200 a 360 px, título 88 a
110 px, apoio 38 a 44 px, rótulo 26 a 30 px (outro projeto já usa título 48+ e corpo 24+ como piso; aqui o alvo é mais alto
porque a queixa é letra pequena).

**C1. Pictograma "1 em cada N"**
- 10 ícones para frações simples (3 em 10) ou 100 para porcentagens (14 em 100). Grade 10×10 de pontos de 44 px, 20 px de
  espaço; destacados em dourado, o resto em 14% de opacidade; número gigante ao lado.
- **Por que funciona:** em estudo com adultos, pictogramas melhoraram a compreensão de redução de risco tanto em quem tem
  pouca quanto em quem tem muita facilidade com números (Galesic e colegas, Health Psychology 2009)
  [busca](https://pure.mpg.de/pubman/item/item_2099767_5/component/file_2562291/MG_Using_2009.pdf).
- Uso: Novembro Azul (3 em 10), ômega-3 da linhaça (menos de 15 em 100).

**C2. Anel de porcentagem**
- Anel de 640 px, traço de 36 px com ponta arredondada, trilha a 14%; número de 200 px dentro, rótulo embaixo.
- Uso: "95% da creatina fica nos músculos". Versão animada com o CSS da T8.
- Referência: o dado definindo a forma (Spotify Wrapped) [aberto](https://engineering.atspotify.com/2024/1/exploring-the-animation-landscape-of-2023-wrapped).

**C3. Barras horizontais com rótulo direto**
- Sem eixo e sem legenda: nome à esquerda, valor à direita, uma barra dourada e as outras em gelo translúcido. Altura da
  barra de 56 px, 28 px entre elas.
- Uso: teor de magnésio por sal; "D3 × D2". Referência: "an animated chart tells a data story a table never could"
  (IRPR) [aberto](https://3d.irpr.agency/3d-for/pharma/motion-graphics/).

**C4. Linha do tempo com estações que atravessa os slides**
- Uma linha fina contínua passa pela emenda dos slides; cada slide tem uma estação (Laudo, Quarentena, Liberação, Pesagem,
  Conferência). É o "panorâmico" de outro projeto, mas com a linguagem de processo da Biomagistral, não com o feixe.
- Montagem: tela única de 1080 × n px de largura, cortada por slide, sempre em 1080×1350 para o Instagram não recortar
  [busca](https://mysocialboutique.co/seamless-instagram-carousel-canva).

**C5. Bento grid como slide "cola"**
- 4 a 6 compartimentos de tamanhos diferentes, um dado por compartimento, um só em dourado; espaço de 16 px, cantos de
  24 px. É o slide que se salva.
- Origem: popularizado pelos slides-resumo da Apple; organiza informação densa com ritmo previsível
  [busca](https://www.saasframe.io/blog/the-bento-layout-trend) · modelo de post [busca](https://linearity.io/templates/social-media/instagram-posts/pink-green-bento-grid-post).

**C6. Mapa da Bahia com Santaluz acesa**
- Contorno do estado em linha fina dourada, Santaluz como ponto com halo, linhas saindo para o estado (entrega) ou o número
  da Bahia em destaque (Novembro Azul: 6.540 casos em 2026).
- O contorno deve vir de malha oficial (IBGE); a URL da API de malhas **não foi conferida nesta pesquisa**.
- Referência de dado virando coordenada: "the animation lands on a coordinate on a map" (Spotify) [aberto](https://engineering.atspotify.com/2024/1/exploring-the-animation-landscape-of-2023-wrapped).

**C7. Palavra gigante que ocupa a largura e sangra para o próximo slide**
- Uma palavra em caixa normal (regra do DS), peso 700, 300 a 360 px, ajustada à largura (função da T1). Variante: a palavra
  é larga demais e continua no slide seguinte, obrigando o arraste.
- Referência: Studio Dumbar, identidade "powerful, simple and pure" [aberto](https://the-brandidentity.com/insight/how-to-meaningfully-incorporate-motion-into-branding-with-studio-dumbar-dia-and-connor-campbell).

**C8. Zoom progressivo entre slides (do todo ao detalhe, ou do detalhe ao todo)**
- **Zoom in:** slide 1 mostra a composição inteira; slide 2 é um recorte 2× de um detalhe; slide 3, 4×; no detalhe aparece o
  dado escondido ("o que tem dentro"). **Zoom out:** o contrário, começando por uma textura misteriosa que se revela.
- Montagem: renderizar uma cena-mestra grande (por exemplo 4320×5400) e exportar recortes com escala decrescente, sempre no
  mesmo ponto focal. Isso mantém a continuidade, como o "zoom infinito" do motion [busca](https://www.toolfarm.com/?p=61343).

**C9. Lupa técnica sobre a foto**
- Um círculo de 420 px mostra um trecho da foto ampliado 2,5×, ligado ao texto por uma linha fina com ponto (desenho
  técnico). Sobre as fotos de estilo de vida do ChatGPT: a lupa mostra textura (pele, fio, luz) e o texto traz o fato.
- Referência: revelar o mecanismo "at molecular level" (IRPR) e o "raio-X revelando a planta" (Innocean)
  [aberto](https://motionographer.com/quickie/innocean-berlin-glory-over-pain).

**C10. Foto com cartão de vidro de dado (ficha)**
- O vidro de outro projeto (A8), com uma regra nova: o cartão carrega **um número, uma linha e a fonte**, no terço de baixo; nada
  de parágrafo. Atrás do cartão, véu escuro local para o texto ter contraste.
- Base: texto sobre "solid shape or darkened overlay" e "If it isn't legible at the size of a postage stamp, it isn't
  legible" (Hopper) [aberto](https://www.hopperhq.com/blog/instagram-reel-size/).

**C11. Split com foto (50/50 ou diagonal)**
- Metade foto de estilo de vida, metade tipografia em fundo noite chapado. Diagonal de 8 a 12° para dar movimento. Variante
  "mito | verdade" com o slide seguinte invertendo os lados.
- Referência: códigos de beleza, luxo e editorial para suavizar o lado científico (Parker/Milamend)
  [aberto](https://the-brandidentity.com/project/with-its-branding-for-milamend-parker-makes-you-think-about-what-a-health-supplement-can-look-like).

**C12. Carrossel animado (slides em vídeo)**
- O Instagram aceita até 20 itens por carrossel, misturando fotos e vídeos, e música no carrossel
  [busca](https://www.lindseygamble.com/blog/instagram-now-allows-up-to-20-photos-or-videos-in-carousels). Cada slide pode
  ser um MP4 de 4 a 8 s em loop, com o primeiro quadro já completo (é o que aparece antes de tocar).
- O motor já tem `carrossel.mjs --animado`. Regra: só 1 movimento por slide (contador, anel, barra ou zoom), e o slide de
  capa é o que mais anima.
- Tutorial de keyframes de posição, escala e rotação por slide [busca](https://linearity.io/academy/tutorials/animate-with-move/how-to-animate-an-image-carousel-for-instagram/).

### 5.1 Como os criadores fazem zoom e transições

**No reel**
- **Empurrão contínuo:** escala 1,00 → 1,04 a 1,08 por cena (outro projeto já cita); o novo é somar a paralaxe de 3 camadas (T15).
- **Zoom seco (crash zoom):** 6 a 8 quadros, escala 1,00 → 1,25 com desfoque de 4 px no meio, no tempo forte. Uma vez por
  reel, na virada.
- **Mergulho e recuo:** T6. O mergulho entra numa letra; o recuo revela que a textura era o miolo de algo.
- **Quadro inicial e final com IA:** último quadro da cena A e primeiro da cena B no Higgsfield, com "Super Dolly In" e um
  segundo efeito por "Mix"; luz e cor parecidas nas duas imagens [aberto](https://ai-for-real-life.beehiiv.com/p/how-to-use-higgsfield-ai-to-create-seamless-transitions-between-scenes).
  Runway com "First Frame" faz o mesmo a partir de uma foto [busca](https://systematiq.beehiiv.com/p/5-step-ad-creative-workflow-runway-releases-act-2).
- **Predefinições de câmera da IA** ("Eye Zoom", "Earth Zoom Out"): a imagem de partida já deve estar em 9:16, porque o vídeo
  sai na proporção dela [busca](https://www.kapwing.com/resources/ai-eye-zoom-tutorial-lost-in-your-iris-trend/). Texto
  nunca vai dentro do vídeo gerado.

**No carrossel parado**
- Recortes progressivos de uma cena-mestra (C8); elemento na emenda (A1); espiada do próximo slide (A3);
  **escala que cresce slide a slide** (o mesmo objeto em 1×, 1,6× e 2,5×), que dá a sensação de aproximação ao arrastar.

**No carrossel animado**
- **Zoom contínuo entre vídeos:** o slide n termina com um empurrão até certa escala, e o slide n+1 começa exatamente
  naquela escala e continua. Ao arrastar, parece uma câmera só.
- **Match cut entre slides:** a forma que fecha o slide n (anel, ponto, linha) é a forma que abre o slide n+1, na mesma
  posição.

---

## 6. Ordem prática sugerida
1. Subir os tamanhos no `microreel.mjs` (tabela 3.1) e aplicar as regras 3.2. Resolve "letra pequena" sem mais nada.
2. Criar 4 tipos de cena: `palavra` (T1/T13), `fenda` (T2), `anel`/`barras`/`pictograma` (T8) e `split` (T9), mais o
   `inverte` por cena (T4). Com isso, cada reel já alterna escala, fundo e composição.
3. Pedir as texturas macro (T10) na fila de fotos do ChatGPT, uma metáfora por ativo, e animá-las no Runway (gerado no Runway).
4. Escolher as músicas com BPM anotado e ligar os tempos de cena à batida (T12).
5. Testar R5 (qualidade) e R4 (creatina) primeiro: usam quase todas as técnicas e têm fatos já conferidos.
