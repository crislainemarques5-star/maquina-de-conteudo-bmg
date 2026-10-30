// Roteiros de reels para a equipe da Biomagistral Santaluz-BA gravar (vendedores e 2 farmacêuticas).
// Regra: quando a farmacêutica aparece, o nome e o CRF-BA dela vão na tela (Res. CFF 658/2018, art. 3º).
// Receitas e rótulos só "fake" e borrados; nunca nome de paciente; sem preço; sem depoimento.
export const FARMACEUTICAS = [
  { nome: "Maiane Clara", crf: "CRF-BA [nº a preencher]", insta: "" },
  { nome: "[2ª farmacêutica]", crf: "CRF-BA [nº a preencher]", insta: "" },
];

const LEG = (gancho, corpo) => `${gancho}

${corpo}

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#farmaciademanipulacao #biomagistral #santaluz #santaluzba #manipulados`;

export const ROTEIROS = [
  {
    id: "2026-11-10-equipe", data: "10/11 (ter)", hora: "12:15",
    titulo: "Um dia na Biomagistral Santaluz",
    quem: "Toda a equipe (vendedores e farmacêuticas)",
    duracao: "20 a 25 s",
    formato: "Vlog rápido de bastidores, um corte por batida da música, texto com a hora do dia",
    inspiracao: "Bastidores e equipe são os posts fora da curva dos concorrentes da região (Roval, Magispharma, Singular)",
    objetivo: "Humanizar a marca e mostrar organização, cuidado e equipe preparada.",
    cenas: [
      ["Porta abrindo, luzes acendendo, equipe chegando sorrindo.", "8h · Bom dia, Santaluz! ☀️"],
      ["Farmacêutica vestindo o jaleco e as luvas.", "8h15 · Prontas para manipular · Maiane Clara · CRF-BA [nº]"],
      ["Bancada organizada e balança sendo verificada.", "9h · Tudo conferido antes de começar"],
      ["Vendedora respondendo o WhatsApp com sorriso.", "10h · Seus pedidos chegando"],
      ["Mãos encapsulando, close no movimento.", "14h · Cada fórmula, uma pessoa"],
      ["Sacolas prontas para a entrega, alinhadas.", "17h · Saindo para toda a Bahia 🚚"],
      ["Equipe reunida acenando para a câmera.", "Até amanhã! Chame no WhatsApp (75) 99878-6349"],
    ],
    audio: "Áudio leve e alegre em alta no Instagram, com batida marcada.",
    dicas: ["Cada cena com 3 segundos; nós montamos no ritmo.", "Uniformes e bancada impecáveis.", "Nenhum rótulo ou receita legível."],
    legenda: LEG("Um dia na Biomagistral Santaluz. ✨", "Da balança conferida logo cedo às sacolas saindo para toda a Bahia: é assim que a nossa equipe cuida de cada fórmula, com rigor e carinho. Qual parte você não conhecia? 👇"),
  },
  {
    id: "2026-11-12-equipe", data: "12/11 (qui)", hora: "12:15",
    titulo: "Enredo: da produção até as suas mãos",
    quem: "Farmacêutica (protagonista) + vendedora + cliente (pode ser alguém da equipe)",
    duracao: "25 a 30 s",
    formato: "Mini-história com transições criativas (a mão passa o frasco para a cena seguinte)",
    inspiracao: "@biomagistral_seabra: \"Você já imaginou tudo o que acontece antes de um manipulado chegar até você?\" (16× a média)",
    objetivo: "Mostrar, como uma história, o caminho da fórmula e terminar na cliente feliz.",
    cenas: [
      ["Close na receita fake e borrada chegando no balcão.", "Toda história começa com uma receita…"],
      ["Farmacêutica avaliando a receita com atenção.", "Avaliação farmacêutica · Maiane Clara · CRF-BA [nº]"],
      ["Transição: a mão dela pega o frasco de matéria-prima; corta para a pesagem.", "Matéria-prima com laudo"],
      ["Encapsulação; a mão empurra o pote para fora do quadro.", "Feita sob medida"],
      ["A vendedora recebe o pote do outro lado do quadro e embala.", "Conferida e embalada com carinho"],
      ["A cliente abre a porta sorrindo e recebe a sacola.", "…e termina nas suas mãos 💙"],
      ["Tela final com o logo (nós montamos).", "Biomagistral Santaluz · BA · (75) 99878-6349"],
    ],
    audio: "Música instrumental elegante e emocional em alta no Instagram.",
    dicas: ["Planeje as transições: cada cena termina com a mão saindo do quadro numa direção e a próxima começa entrando pelo lado oposto.", "Luz suave, movimentos lentos."],
    legenda: LEG("Toda história começa com uma receita… e termina nas suas mãos. 💙", "Avaliação farmacêutica, matéria-prima com laudo, manipulação sob medida e conferência em cada etapa. É assim, com rigor e carinho, que a sua fórmula nasce na Biomagistral Santaluz."),
  },
  {
    id: "2026-11-14-equipe", data: "14/11 (sáb)", hora: "12:15",
    titulo: "Pergunte à farmacêutica: o que dá para manipular?",
    quem: "Farmacêutica + vendedor fazendo as perguntas",
    duracao: "25 a 30 s",
    formato: "Perguntas rápidas: o vendedor pergunta \"dá para manipular…?\", a farmacêutica responde em 1 frase",
    inspiracao: "Formato pergunta e resposta, que gera salvamento e comentário",
    objetivo: "Vender: mostrar a variedade de formas e de soluções da farmácia.",
    cenas: [
      ["Vendedor de frente para a câmera.", "Dá para manipular… em goma? 🍬"],
      ["Farmacêutica sorri e mostra gomas (sem rótulo).", "Dá! Goma, chocolate funcional, sachê… · Maiane Clara · CRF-BA [nº]"],
      ["Vendedor.", "E creme para o rosto?"],
      ["Farmacêutica mostra um pote elegante.", "Cremes, séruns e peelings sob medida"],
      ["Vendedor.", "E vitamina na dose exata da receita?"],
      ["Farmacêutica, convicta.", "Exatamente na dose que o médico prescreveu"],
      ["Os dois juntos apontando para a câmera.", "Quer saber o que dá para fazer por você? Chame no WhatsApp"],
    ],
    audio: "Áudio de pergunta e resposta em alta, animado.",
    dicas: ["Respostas curtas e sorrindo.", "Produtos sem rótulo legível.", "Nada de preço."],
    legenda: LEG("Dá para manipular em goma? E creme para o rosto? E vitamina na dose exata? Dá! ✨", "Na Biomagistral Santaluz, a sua fórmula sai na forma que combina com a sua rotina: cápsula, goma, chocolate funcional, sachê, gotas, cremes e séruns. Comenta aqui o que você quer saber se dá para manipular! 👇"),
  },
  {
    id: "2026-11-17-equipe", data: "17/11 (ter)", hora: "12:15",
    titulo: "O que tem na sacola da Biomagistral?",
    quem: "Vendedora",
    duracao: "20 a 25 s",
    formato: "Trend \"o que tem na minha bolsa\": ela tira da sacola cada forma farmacêutica e explica em 1 frase",
    inspiracao: "Trend \"what's in my bag\", adaptado para mostrar variedade",
    objetivo: "Mostrar as formas e despertar desejo de pedir.",
    cenas: [
      ["Vendedora com a sacola da Biomagistral no balcão, olhando para a câmera.", "O que tem na sacola da Biomagistral? 👀"],
      ["Tira um pote de cápsulas (sem rótulo).", "Cápsulas na dose exata da receita"],
      ["Tira um pote de gomas.", "Gomas, para levar na bolsa"],
      ["Tira um sachê.", "Sachê, que dissolve no suco"],
      ["Tira um pote de creme elegante.", "Creme sob medida para a sua pele"],
      ["Fecha a sacola com o laço e sorri.", "Tudo com entrega grátis para toda a Bahia 🚚"],
      ["Aponta para a câmera.", "Chame no WhatsApp (75) 99878-6349"],
    ],
    audio: "Áudio da trend \"what's in my bag\" ou um pop leve em alta.",
    dicas: ["Embalagens sem rótulo legível.", "Fundo limpo, luz boa, unhas e mãos bem cuidadas."],
    legenda: LEG("O que tem na sacola da Biomagistral? 👀", "Cápsulas na dose exata, gomas para levar na bolsa, sachês e cremes sob medida. Tudo com entrega grátis para toda a Bahia! Qual desses você ia querer?"),
  },
  {
    id: "2026-11-19-equipe", data: "19/11 (qui)", hora: "12:15",
    titulo: "Reação da equipe: mitos sobre manipulados",
    quem: "Vendedores + farmacêutica",
    duracao: "20 a 25 s",
    formato: "Alguém lê um mito no celular; a equipe reage (careta, risada) e a farmacêutica corrige",
    inspiracao: "Vídeos de reação e humor leve (@oficialfarma, 20× a média)",
    objetivo: "Engajar com humor e reforçar autoridade e qualidade.",
    cenas: [
      ["Vendedor lendo no celular, sério.", "\"Manipulado é mais fraco\" 🤨"],
      ["Equipe faz careta de \"oi?\".", "Mito 1"],
      ["Farmacêutica responde com calma.", "Quem define a força é a dose prescrita · Maiane Clara · CRF-BA [nº]"],
      ["Vendedor lendo outro.", "\"Suplemento é tudo igual\""],
      ["Equipe ri e balança a cabeça.", "Mito 2"],
      ["Farmacêutica.", "Laudo, teor e forma mudam tudo"],
      ["Todos juntos.", "Qual mito você já ouviu? Comenta aí! 👇"],
    ],
    audio: "Áudio de reação ou humor leve em alta.",
    dicas: ["Humor natural, sem deboche.", "A farmacêutica sempre fala com calma e sorrindo."],
    legenda: LEG("Reação da equipe aos mitos que a gente mais ouve! 😅", "\"Manipulado é mais fraco\"? Quem define a força é a dose prescrita. \"Suplemento é tudo igual\"? Laudo, teor e forma mudam tudo. Qual mito você já ouviu? Comenta aqui! 👇"),
  },
  {
    id: "2026-11-21-equipe", data: "21/11 (sáb)", hora: "12:15",
    titulo: "Probiótico: quando faz sentido?",
    quem: "Farmacêutica",
    duracao: "20 a 25 s",
    formato: "Farmacêutica fala para a câmera com textos de apoio na tela",
    inspiracao: "Vídeos educativos curtos com profissional, que geram salvamento",
    objetivo: "Autoridade e venda consultiva de probióticos manipulados.",
    cenas: [
      ["Farmacêutica em plano médio, no laboratório.", "Probiótico é tudo igual? · Maiane Clara · CRF-BA [nº]"],
      ["Ela explica.", "Não! Cada resultado vale para uma linhagem específica"],
      ["Ela conta nos dedos.", "Faz sentido conversar: durante antibiótico, em viagem, intestino desregulado"],
      ["Ela segura um pote sem rótulo.", "Aqui a gente manipula a linhagem certa, na dose certa"],
      ["Sorriso para a câmera.", "Chame no WhatsApp para uma avaliação personalizada"],
    ],
    audio: "Fala dela + música de fundo bem baixa (nós colocamos).",
    dicas: ["Gravar a fala em frases curtas; nós cortamos.", "Microfone de lapela, se tiver."],
    legenda: LEG("Probiótico é tudo igual? Não! 🌿", "Cada resultado estudado vale para uma linhagem específica. Uso de antibiótico, viagens, intestino desregulado: são momentos para conversar sobre probióticos. Na Biomagistral Santaluz, a linhagem certa, na dose certa."),
  },
  {
    id: "2026-11-24-equipe", data: "24/11 (ter)", hora: "12:15",
    titulo: "Pegadinha: manipulado é tudo igual?",
    quem: "Vendedor + farmacêutica",
    duracao: "20 a 25 s",
    formato: "Comparação lado a lado: vendedor mostra dois potes iguais por fora; a farmacêutica revela a diferença (laudo, insumo de marca)",
    inspiracao: "Formato \"parecidos, mas não iguais\" (@farmaciamapeada, 17× a média)",
    objetivo: "Vender qualidade: insumo de primeira linha e rigor fazem diferença.",
    cenas: [
      ["Vendedor com dois potes idênticos, sem rótulo.", "Pegadinha: esses dois são iguais? 🤔"],
      ["Ele balança a cabeça \"sim\".", "Por fora, sim…"],
      ["Farmacêutica pega um dos potes e mostra uma prancheta com o laudo desfocado.", "Por dentro: insumo de marca, com laudo de análise · Maiane Clara · CRF-BA [nº]"],
      ["Close no laudo desfocado e na balança.", "Teor conferido, pesagem registrada"],
      ["Os dois olham para a câmera.", "Na Biomagistral, qualidade não é sorte"],
      ["Tela final.", "Chame no WhatsApp (75) 99878-6349"],
    ],
    audio: "Áudio de suspense e revelação em alta.",
    dicas: ["O laudo aparece sempre desfocado.", "Não mostrar nem citar outras farmácias."],
    legenda: LEG("Pegadinha: esses dois potes são iguais? 🤔", "Por fora, até parecem. Por dentro, a diferença está no insumo de primeira linha, no laudo de análise e no rigor de cada etapa. Na Biomagistral Santaluz, qualidade não é sorte."),
  },
  {
    id: "2026-11-26-equipe", data: "26/11 (qui)", hora: "12:15",
    titulo: "Unboxing: a sua fórmula chegou",
    quem: "Alguém da equipe no papel de cliente",
    duracao: "15 a 20 s",
    formato: "Unboxing estético, câmera de cima, sons reais (ASMR)",
    inspiracao: "Unboxing e ASMR, que prendem a atenção e valorizam a embalagem",
    objetivo: "Mostrar o cuidado da entrega e o padrão premium.",
    cenas: [
      ["Sacola da Biomagistral chegando à mesa clara (câmera de cima).", "Chegou! 📦"],
      ["Mãos desfazendo o laço com calma.", "Embalado com carinho"],
      ["Pote saindo da sacola, rótulo virado.", "Feito só para você"],
      ["Abrindo o lacre (som do lacre).", "Lacre de segurança"],
      ["Mão segurando o pote com a luz da janela.", "Entrega grátis para toda a Bahia"],
      ["Tela final.", "Peça a sua: (75) 99878-6349"],
    ],
    audio: "Som real (ASMR) + música suave bem baixa.",
    dicas: ["Mesa clara, luz natural, celular firme acima da mesa.", "Rótulo sempre virado ou desfocado."],
    legenda: LEG("Unboxing da sua fórmula Biomagistral. 📦✨", "Embalada com carinho, lacrada com segurança e entregue grátis em toda a Bahia. Cada detalhe pensado para você."),
  },
  {
    id: "2026-11-28-equipe", data: "28/11 (sáb)", hora: "12:15",
    titulo: "O que vocês mais perguntaram em novembro",
    quem: "Farmacêutica (e a outra farmacêutica, se quiser dividir)",
    duracao: "25 a 30 s",
    formato: "Retrospectiva: a farmacêutica responde rapidinho as 3 dúvidas que mais chegaram no WhatsApp",
    inspiracao: "Retrospectivas e perguntas da audiência, que geram comentário e salvamento",
    objetivo: "Fechar o mês com autoridade e convite ao WhatsApp.",
    cenas: [
      ["Farmacêutica sorrindo, com um cartão na mão.", "As perguntas que vocês mais fizeram em novembro 💬 · Maiane Clara · CRF-BA [nº]"],
      ["Cartão 1 (preencher com dúvida real do WhatsApp).", "Pergunta 1"],
      ["Resposta curta.", "Resposta em uma frase"],
      ["Cartão 2.", "Pergunta 2"],
      ["Resposta curta.", "Resposta em uma frase"],
      ["Cartão 3.", "Pergunta 3"],
      ["Resposta e convite.", "Tem outra dúvida? Chame no WhatsApp (75) 99878-6349"],
    ],
    audio: "Música leve de fundo (nós colocamos).",
    dicas: ["As vendedoras separam as 3 dúvidas mais comuns do mês até o dia 25.", "Nada de nome de cliente nem de produto com preço."],
    legenda: LEG("As perguntas que vocês mais fizeram em novembro! 💬", "Separamos as dúvidas que mais chegaram no nosso WhatsApp e respondemos rapidinho. Tem outra? Manda pra gente!"),
  },
  {
    id: "2026-11-03-equipe",
    data: "03/11 (ter)", hora: "12:15",
    titulo: "Os barulhinhos do laboratório",
    quem: "Farmacêutica (Maiane) + mãos da equipe",
    duracao: "15 a 20 s",
    formato: "Bastidores sem fala, com o som real do laboratório (ASMR) e texto na tela",
    inspiracao: "@biomagistral_seabra: \"Esses são os barulhinhos que escutamos todos os dias\" (7× a média do perfil)",
    objetivo: "Mostrar rigor e cuidado de um jeito gostoso de assistir; gerar compartilhamento.",
    cenas: [
      ["Close das mãos de luva abrindo um frasco de matéria-prima (o som do lacre).", "Os sons que a gente ouve todo dia na Biomagistral Santaluz 🔊"],
      ["Espátula colocando o pó na balança de precisão (o bipe da balança).", "Pesagem conferida"],
      ["Cápsulas sendo fechadas na encapsuladora (o clique).", "Cápsula por cápsula"],
      ["Frasco sendo lacrado (o estalo da tampa).", "Lacre de segurança"],
      ["Etiqueta saindo da impressora, desfocada (o zumbido).", "Seu nome no rótulo"],
      ["Farmacêutica sorri para a câmera segurando a embalagem pronta, rótulo virado.", "Feito com rigor, só para você · Maiane Clara · Farmacêutica · CRF-BA [nº]"],
      ["Tela final com o logo (nós montamos).", "Chame no WhatsApp (75) 99878-6349 · Santaluz · BA"],
    ],
    audio: "Só o som ambiente de cada cena, sem música (o charme é o som).",
    dicas: ["Celular na vertical, câmera traseira, 4K se der.", "Grave cada cena com 4 a 5 segundos; nós cortamos.", "Microfone do celular bem perto da ação.", "Nenhum rótulo ou receita legível."],
    legenda: `Os sons que a gente ouve todo dia na Biomagistral Santaluz. 🔊✨

Pesagem conferida, cápsula por cápsula, lacre de segurança e o seu nome no rótulo: rigor em cada etapa para entregar exatamente o que foi prescrito para você.

Qual desses sons é o seu favorito? 👇

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#bastidores #farmaciademanipulacao #biomagistral #santaluz #santaluzba #asmr`,
  },
  {
    id: "2026-11-05-equipe",
    data: "05/11 (qui)", hora: "12:15",
    titulo: "POV: você mandou a sua receita no WhatsApp",
    quem: "Vendedora + farmacêutica + entregador (ou vendedor)",
    duracao: "20 a 25 s",
    formato: "POV com cortes rápidos no ritmo da música; texto na tela",
    inspiracao: "Formato POV e bastidores de pedido, que puxam pedido direto pelo WhatsApp",
    objetivo: "Vender: mostrar como é fácil pedir e que a entrega é grátis para toda a Bahia.",
    cenas: [
      ["Vendedora pega o celular e vê a notificação; na tela, uma receita fake e borrada.", "POV: você mandou a sua receita no WhatsApp da Biomagistral Santaluz"],
      ["Vendedora responde sorrindo, digitando rápido.", "Atendimento rápido e humano"],
      ["Farmacêutica analisa a receita (fake, borrada) com atenção.", "Avaliação farmacêutica · Maiane Clara · CRF-BA [nº]"],
      ["Cena rápida do laboratório: pesagem e cápsulas.", "Manipulação com rigor"],
      ["Mãos fechando a sacola da Biomagistral com a embalagem dentro.", "Embalado com carinho"],
      ["Entrega na porta de uma cliente sorridente (pode ser alguém da equipe).", "Entrega grátis para toda a Bahia 🚚"],
      ["Vendedora aponta para o texto na tela e pisca.", "Chame no WhatsApp (75) 99878-6349"],
    ],
    audio: "Um áudio animado que esteja em alta na biblioteca do Instagram (procure por \"em alta\"), com batida marcada.",
    dicas: ["Cortes de 2 a 3 segundos, cada um numa batida da música.", "Roupas e jaleco impecáveis; bancada organizada.", "Receita sempre fake e borrada."],
    legenda: `POV: você mandou a sua receita no WhatsApp da Biomagistral Santaluz. 📲

Atendimento rápido e humano, avaliação farmacêutica, manipulação com rigor e entrega grátis para toda a Bahia. Simples assim!

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada.

📍 Biomagistral Santaluz · Bahia

#pov #farmaciademanipulacao #biomagistral #santaluz #santaluzba #entregagratis`,
  },
  {
    id: "2026-11-07-equipe",
    data: "07/11 (sáb)", hora: "12:15",
    titulo: "Desafio do balcão: para que serve este ativo?",
    quem: "Dois vendedores + farmacêutica",
    duracao: "25 a 30 s",
    formato: "Jogo de perguntas: um mostra o cartão, o outro chuta, a farmacêutica revela",
    inspiracao: "Quiz com participação nos comentários (@farmaciamapeada: 69 mil curtidas, 20× a média)",
    objetivo: "Engajamento e autoridade: mostrar que a equipe conhece cada ativo e chamar comentários.",
    cenas: [
      ["Os dois vendedores frente a frente no balcão, com cartões na mão.", "Desafio do balcão: será que a equipe acerta? 🤔"],
      ["Vendedora mostra o cartão \"Keranat®\"; o vendedor chuta: \"É pra pele?\"", "Keranat® é para…?"],
      ["Farmacêutica entra no quadro e revela.", "Óleo de painço, estudado na saúde dos fios ✨ · Maiane Clara · CRF-BA [nº]"],
      ["Cartão \"Magnésio bisglicinato\"; chute engraçado.", "E este aqui?"],
      ["Farmacêutica revela.", "Magnésio ligado à glicina: uma das formas que a manipulação oferece"],
      ["Cartão \"Gymnema\"; o vendedor fica em dúvida.", "Último!"],
      ["Farmacêutica revela.", "Planta estudada na percepção do sabor doce 🍬"],
      ["Os três acenam para a câmera.", "Quer saber qual faz sentido para você? Chame no WhatsApp (75) 99878-6349"],
    ],
    audio: "Um áudio de jogo ou suspense em alta no Instagram; efeito de \"acerto\" e \"erro\" nos chutes.",
    dicas: ["Cartões impressos em fundo azul-marinho com letra dourada (nós mandamos o arquivo).", "Reações naturais e divertidas, sem exagero.", "A farmacêutica fala com calma e sorrindo."],
    legenda: `Desafio do balcão: será que a equipe acertou? 🤔

Keranat®, magnésio bisglicinato e Gymnema: você sabia para que serve cada um? Conta nos comentários quantos você acertaria! 👇

Na Biomagistral Santaluz, cada ativo é escolhido com critério e manipulado com rigor, na dose definida para você.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#desafio #farmaciademanipulacao #biomagistral #santaluz #santaluzba #manipulados`,
  },
];
