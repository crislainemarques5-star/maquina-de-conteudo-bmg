// Plano de conteúdo da Biomagistral Santaluz: fonte única dos posts (carrossel, microreel, roteiro de reel).
// Regras: perfil/respostas.md e perfil/regras-publicidade.md. Nada de produto manipulado anunciado, preço, promessa,
// depoimento, "tome/use", GLP-1. Cada post tem começo, meio e fim sozinho.

export const POSTS = [
  { id: "2026-11-09-reel", formato: "microreel", data: "09/11 (seg)", hora: "12:15", pilar: "Novembro Azul", musica: "mixkit-839.mp3", musicaInicio: 18, fotoArquivo: "2026-11-07.png", cenas: [
      { t: "foto", dur: 3.2, foto: "2026-11-07.png", eyebrow: "Novembro Azul", titulo: `Um número que
**pede atenção**.` },
      { t: "numero", dur: 3.4, eyebrow: "Casos novos por ano no Brasil", numero: "77.920", unidade: "de câncer de próstata", titulo: "Fonte: INCA, 2026–2028." },
      { t: "numero", dur: 3, eyebrow: "Na Bahia, em 2026", numero: "6.540", unidade: "casos estimados" },
      { t: "palavra", dur: 3, palavra: "CONSULTA", titulo: "prevenir começa **por ela**", claro: true },
      { t: "final", dur: 4.2, titulo: "Ao seu lado **pela sua saúde**." }
    ], legenda: `Um número que pede atenção: 77.920 casos novos de câncer de próstata por ano no Brasil, e 6.540 estimados na Bahia em 2026 (INCA). 💙

Prevenir começa pela consulta. Converse com o seu médico sobre o que é indicado para você. E conte com a Biomagistral Santaluz nessa caminhada.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#novembroazul #saudedohomem #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-13-reel", formato: "microreel", data: "13/11 (sex)", hora: "12:15", pilar: "Ativo explicado", musica: "mixkit-13.mp3", musicaInicio: 20, fotoArquivo: "2026-11-13.png", cenas: [
      { t: "foto", dur: 3.2, foto: "2026-11-13.png", eyebrow: "Ômega-3", titulo: `Benefícios que
vêm **do mar**.` },
      { t: "molecula", dur: 3.8, molecula: "eicosapentaenoic acid", titulo: "**EPA**", sub: "com o DHA, contribui para o normal funcionamento do coração" },
      { t: "palavra", dur: 3, palavra: "PUREZA", titulo: "medida **em laboratório**", textura: "2026-11-13.png" },
      { t: "lista", dur: 4, eyebrow: "O padrão Biomagistral", itens: ["Alta concentração de EPA e DHA","Forma triglicerídeo","Laudo e rastreabilidade"] },
      { t: "final", dur: 4.2, titulo: "Pureza que **você sente**." }
    ], legenda: `Ômega-3: benefícios que vêm do mar. 🌊 O EPA e o DHA contribuem para o normal funcionamento do coração, e pureza faz toda a diferença.

Na Biomagistral Santaluz: alta concentração de EPA e DHA, forma triglicerídeo, laudo e rastreabilidade.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#omega3 #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-16-reel", formato: "microreel", data: "16/11 (seg)", hora: "12:15", pilar: "Parecidos, mas não iguais", musica: "mixkit-662.mp3", musicaInicio: 15, fotoArquivo: "2026-11-16.png", cenas: [
      { t: "elemento", dur: 3.2, simbolo: "Mg", numero: "12", massa: "24,305", nome: "Magnésio", titulo: "qual é o **seu**?" },
      { t: "barras", dur: 4.4, claro: true, eyebrow: "Magnésio de verdade em 100 mg", max: 60, itens: [
          ["Óxido",60,"≈ 60 mg"],
          ["Bisglicinato",14,"≈ 14 mg",true]
        ] },
      { t: "lista", dur: 4.6, eyebrow: "Cada forma, um perfil", itens: ["Bisglicinato: quelado e bem tolerado","Treonato: estudado no cérebro","Citrato: mais absorvido que o óxido"] },
      { t: "final", dur: 4.2, titulo: "O magnésio certo **para você**." }
    ], legenda: `Magnésio: qual é o seu? Bisglicinato, treonato, citrato, dimalato, taurato… A forma muda quanto magnésio há em cada grama e quanto o corpo aproveita. ✨

Na Biomagistral Santaluz, você encontra todas as formas, com insumos de primeira linha e rigor de manipulação.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#magnesio #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-18-reel", formato: "microreel", data: "18/11 (qua)", hora: "12:15", pilar: "Ativo explicado", musica: "mixkit-493.mp3", musicaInicio: 12, fotoArquivo: "2026-11-18.png", cenas: [
      { t: "foto", dur: 3.2, foto: "2026-11-18.png", eyebrow: "Era das canetinhas", titulo: `Emagreceu e o
**cabelo caiu**?` },
      { t: "palavra", dur: 3.2, palavra: "EFLÚVIO", titulo: `uma queda que costuma
ser **passageira**` },
      { t: "pictograma", dur: 4, claro: true, eyebrow: "Nos estudos com GLP-1", titulo: "**3 a 5** em cada 100", on: 5 },
      { t: "texto", dur: 3.2, titulo: `Seus fios merecem
**cuidado sob medida**.`, corpo: "Óleo de painço, silício orgânico, zinco quelato e mais." },
      { t: "final", dur: 4.2, titulo: "Emagreça **sem abrir mão dos fios**." }
    ], legenda: `Emagreceu e o cabelo caiu? Tem nome: eflúvio telógeno, uma queda que costuma ser passageira. Nos estudos com remédios da classe GLP-1, ela apareceu em 3 a 5 em cada 100 pessoas, contra 1 em 100 no placebo. 💆‍♀️

Na Biomagistral Santaluz, seus fios ganham cuidado sob medida: óleo de painço (Keranat®), silício orgânico (Exsynutriment®), zinco quelato e mais.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#quedadecabelo #emagrecimento #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-25-reel", formato: "microreel", data: "25/11 (qua)", hora: "12:15", pilar: "Mito ou verdade", musica: "mixkit-26.mp3", musicaInicio: 20, fotoArquivo: "2026-11-25.png", cenas: [
      { t: "palavra", dur: 3, palavra: "IGUAL?", titulo: "Suplemento é **tudo igual**?", claro: true },
      { t: "numero", dur: 3.4, eyebrow: "O que um estudo encontrou", numero: "41–165%", unidade: "do teor do rótulo", titulo: "em suplementos de vitamina D." },
      { t: "pictograma", dur: 4, eyebrow: "No Brasil", titulo: "**7 de 10** marcas de whey com menos proteína", on: 70 },
      { t: "lista", dur: 4, eyebrow: "O padrão Biomagistral", itens: ["Laudo em cada lote","Análise de teor em laboratório","Insumos de primeira linha"] },
      { t: "final", dur: 4.2, titulo: "Quem já usou sabe: **é diferente**." }
    ], legenda: `Suplemento é tudo igual? Não! Um estudo encontrou suplementos de vitamina D com 41% a 165% do teor prometido no rótulo. 💡

Na Biomagistral Santaluz: laudo em cada lote, análise de teor em laboratório e insumos de primeira linha. Quem já usou sabe: a qualidade é diferente!

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#suplementos #qualidade #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-27-reel", formato: "microreel", data: "27/11 (sex)", hora: "12:15", pilar: "Ativo explicado", musica: "mixkit-27.mp3", musicaInicio: 15, fotoArquivo: "2026-11-27.png", cenas: [
      { t: "foto", dur: 3, foto: "2026-11-27.png", eyebrow: "Vitamina D", titulo: `Cinco benefícios
**que a ciência reconhece**.` },
      { t: "molecula", dur: 3.6, molecula: "cholecalciferol", titulo: "**Colecalciferol**", sub: "a vitamina D3" },
      { t: "lista", dur: 6, eyebrow: "A vitamina D auxilia", itens: ["na formação de ossos e dentes","na absorção de cálcio e fósforo","no funcionamento do sistema imune","no funcionamento muscular","na manutenção do cálcio no sangue"] },
      { t: "palavra", dur: 3, palavra: "SÓ SUA", titulo: "a dose é **individual**", claro: true },
      { t: "final", dur: 4.2, titulo: "Sua vitamina D, **sob medida**." }
    ], legenda: `Vitamina D: cinco benefícios que a ciência reconhece. ☀️ A vitamina D auxilia na formação de ossos e dentes, na absorção de cálcio e fósforo, no funcionamento do sistema imune e muscular e na manutenção dos níveis de cálcio no sangue.

Na Biomagistral Santaluz, ela sai na dose que é sua, definida pelo seu médico.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#vitaminad #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-30-reel", formato: "microreel", data: "30/11 (seg)", hora: "12:15", pilar: "Ativo explicado", musica: "mixkit-753.mp3", musicaInicio: 15, fotoArquivo: "2026-11-30.png", cenas: [
      { t: "foto", dur: 3.2, foto: "2026-11-30.png", eyebrow: "Ativo explicado", titulo: `Morosil®: a laranja
**vermelha da Sicília**.` },
      { t: "molecula", dur: 3.6, molecula: "cyanidin 3-glucoside", titulo: "**Antocianinas**", sub: "o pigmento vermelho da laranja moro" },
      { t: "barras", dur: 4.4, eyebrow: "6 meses, com dieta e exercício", max: 4, itens: [
          ["Placebo",1.7,"−1,7 cm"],
          ["Laranja Moro",3.9,"−3,9 cm",true]
        ] },
      { t: "palavra", dur: 3, palavra: "ALIADO", titulo: "**não atalho**", textura: "2026-11-30.png" },
      { t: "final", dur: 4.2, titulo: "Seu metabolismo, **sob medida**." }
    ], legenda: `Morosil®: o ativo da laranja vermelha da Sicília, rica em antocianinas. 🍊 Num estudo de 6 meses, com dieta e exercício, a cintura diminuiu em média 3,9 cm no grupo do extrato, contra 1,7 cm no placebo (estudo financiado pelo fabricante).

Aliado, não atalho. Na Biomagistral Santaluz, com avaliação individual e rigor de manipulação.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#morosil #metabolismo #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-15", capa: "moldura", formato: "carrossel", data: "15/11 (dom)", hora: "19:00", pilar: "Teste rápido", slides: [
      { t: "capa", f: "noite", eyebrow: "Teste rápido", titulo: `Onde você guarda
seus **medicamentos**?`, sub: "Responda nos comentários antes de arrastar. A resposta pode surpreender." },
      { t: "quiz", f: "gelo", titulo: "Qual é o **pior lugar** para guardar remédio?", opcoes: ["Armário do quarto","Banheiro","Gaveta da sala"] },
      { t: "resposta", f: "noite", titulo: "O **banheiro**", opcoes: ["Armário do quarto","Banheiro","Gaveta da sala"], certa: 1, corpo: "A umidade do banho pode alterar o medicamento, mesmo dentro da validade. A cozinha também não serve, por causa do calor." },
      { t: "lista", f: "gelo", eyebrow: "Guarde do jeito certo", titulo: "Seco, fresco e **longe da luz**", itens: [
          ["Embalagem original","Ela protege e mostra a validade."],
          ["Geladeira só se o rótulo pedir","E nunca na porta, onde a temperatura oscila."],
          ["Fora do alcance das crianças","Sempre, inclusive vitaminas e suplementos."]
        ] },
      { t: "texto", f: "noite", eyebrow: "E o manipulado?", titulo: "A validade é **definida para você**", corpo: "Manipulado não tem validade de fábrica: a farmacêutica define o prazo de cada fórmula, e ele vem impresso no rótulo. Mudou cor, cheiro ou aspecto? Fale com a gente antes de usar." },
      { t: "texto", f: "gelo", eyebrow: "Venceu ou sobrou?", titulo: "Lixo comum **não**", corpo: "Remédio vencido ou sem uso, inclusive manipulado, vai para um ponto de coleta. Nem lixo comum, nem vaso sanitário." },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "Ficou com dúvida? **Pergunte à gente**", corpo: "Chame no WhatsApp: a nossa equipe farmacêutica orienta você." }
    ], legenda: `Teste rápido: qual é o pior lugar para guardar remédio? Responda nos comentários antes de arrastar! 👇

Resposta: o banheiro! A umidade do banho pode alterar o medicamento, mesmo dentro da validade. A cozinha também não serve, por causa do calor.

O ideal é um lugar seco, fresco e sem luz direta, na embalagem original e fora do alcance das crianças. E o manipulado tem validade definida pela farmacêutica para a sua fórmula, impressa no rótulo.

Salve para lembrar e mande para quem guarda remédio no banheiro! 😉

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#saude #medicamentos #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-16", capa: "arco", formato: "carrossel", data: "16/11 (seg)", hora: "19:30", pilar: "Parecidos, mas não iguais", slides: [
      { t: "capa", f: "noite", eyebrow: "Parecidos, mas não iguais", titulo: `Magnésio:
**qual é o seu**?`, sub: "Por que existem tantas formas e o que muda de uma para outra." },
      { t: "texto", f: "noite", eyebrow: "O mineral de mil funções", titulo: `Nem todo magnésio
é **igual**`, corpo: "O magnésio auxilia no funcionamento muscular. Mas a **forma** em que ele vem muda quanto magnésio há em cada grama e quanto o corpo aproveita." },
      { t: "areas", f: "gelo", eyebrow: "As formas mais usadas", titulo: "Cada forma, **um perfil**", itens: [
          ["Bisglicinato","Magnésio ligado à glicina: forma quelada e bem tolerada."],
          ["Treonato","Estudado em pesquisas sobre o magnésio no cérebro."],
          ["Dimalato","Magnésio ligado ao ácido málico."],
          ["Citrato","Nos estudos, mais bem absorvido que o óxido."],
          ["Taurato","Magnésio ligado ao aminoácido taurina."],
          ["Óxido","Muito magnésio por grama, menor absorção."]
        ] },
      { t: "barras", f: "noite", eyebrow: "Magnésio de verdade em 100 mg", titulo: "A forma muda **o quanto vem**", max: 60, itens: [
          ["Óxido de magnésio",60,"≈ 60 mg"],
          ["Bisglicinato de magnésio",14,"≈ 14 mg",true]
        ], nota: "Cálculo pela fórmula química. Por isso, na manipulação, a dose é calculada pelo magnésio que você precisa." },
      { t: "texto", f: "gelo", eyebrow: "Padrão Biomagistral", titulo: "Todas as formas, **com rigor**", corpo: "Na Biomagistral Santaluz você encontra os principais tipos de magnésio, com insumos de primeira linha, laudo de análise e a forma escolhida para o seu objetivo." },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "O magnésio certo **para você**", corpo: "Chame no WhatsApp: a nossa equipe farmacêutica ajuda na escolha." }
    ], legenda: `Magnésio: qual é o seu? ✨

O magnésio auxilia no funcionamento muscular. Mas nem todo magnésio é igual: bisglicinato, treonato, dimalato, citrato, taurato, óxido… A forma muda quanto magnésio há em cada grama e quanto o corpo aproveita.

Um exemplo: 100 mg de óxido têm cerca de 60 mg de magnésio; de bisglicinato, cerca de 14 mg. Por isso, na manipulação, a dose é calculada pelo que você realmente precisa.

Na Biomagistral Santaluz, você encontra os principais tipos de magnésio, com insumos de primeira linha e rigor de manipulação.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#magnesio #farmaciademanipulacao #biomagistral #santaluz #santaluzba #suplementos` },
  { id: "2026-11-17", capa: "foto", formato: "carrossel", data: "17/11 (ter)", hora: "19:30", pilar: "Novembro Azul", slides: [
      { t: "capa", f: "noite", eyebrow: "Novembro Azul", titulo: `Cuidar de si
é **coisa de homem**`, sub: "O que os números do câncer de próstata dizem e por que a prevenção começa pela consulta." },
      { t: "numero", f: "gelo", eyebrow: "No Brasil", numero: "77.920", unidade: "casos novos por ano", regua: 78, titulo: "É o câncer mais frequente entre **os homens**", nota: "Fonte: INCA, Estimativa 2026–2028." },
      { t: "numero", f: "noite", eyebrow: "Na Bahia", numero: "6.540", unidade: "casos estimados em 2026", regua: 65, titulo: "Um número que mora **perto de nós**", nota: "Fonte: INCA, Estimativa 2026, Bahia." },
      { t: "texto", f: "gelo", eyebrow: "O que fazer com isso", titulo: "A decisão é **sua com o seu médico**", corpo: "As sociedades médicas recomendam conversar sobre o exame de PSA a partir dos 50 anos, ou dos 40 a 50 para quem tem fatores de risco. O Ministério da Saúde orienta decidir junto com o médico. O primeiro passo é **marcar a consulta**.", nota: "Fontes: SBU/SBOC/SBRT, 2023; INCA, 2023." },
      { t: "lista", f: "noite", eyebrow: "Do seu lado", titulo: "Como a Biomagistral **caminha com você**", itens: [
          ["Fórmulas na dose da sua receita","Do jeito que o seu médico prescreveu."],
          ["Atendimento farmacêutico","Dúvidas respondidas pelo WhatsApp."],
          ["Entrega grátis para toda a Bahia","A sua fórmula chega até você."]
        ] },
      { t: "cta", f: "noite", eyebrow: "Novembro Azul", titulo: "Ao seu lado **pela sua saúde**", corpo: "Chame no WhatsApp para uma avaliação personalizada da nossa equipe farmacêutica." }
    ], legenda: `Cuidar de si é coisa de homem. 💙

O câncer de próstata é o mais frequente entre os homens no Brasil: são 77.920 casos novos por ano, e 6.540 estimados na Bahia em 2026 (INCA).

O que fazer com isso? Marcar a consulta. As sociedades médicas recomendam conversar sobre o exame de PSA a partir dos 50 anos (ou dos 40 a 50 para quem tem fatores de risco), e a decisão é sua com o seu médico.

E conte com a Biomagistral Santaluz nessa caminhada. Marque aqui um homem que precisa ver isso! 👇

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#novembroazul #saudedohomem #prevencao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-18", capa: "arco", formato: "carrossel", data: "18/11 (qua)", hora: "19:30", pilar: "Ativo explicado", slides: [
      { t: "capa", f: "noite", eyebrow: "Emagrecimento e cabelo", titulo: `Emagreceu e
o **cabelo caiu**?`, sub: "Por que isso acontece, quanto tempo dura e o que a manipulação oferece aos seus fios." },
      { t: "texto", f: "noite", eyebrow: "Tem nome", titulo: `Eflúvio telógeno:
a queda **passageira**`, corpo: "Emagrecer rápido é um estresse para o corpo e pode empurrar muitos fios ao mesmo tempo para a fase de queda. Ela costuma começar **2 a 3 meses** depois e, na maioria das vezes, passa." },
      { t: "pictograma", f: "gelo", eyebrow: "Na era das canetas", titulo: "**3 a 5** em cada 100", on: 3, meio: 2, legenda: [
          ["#C9AE6E","queda de cabelo nos estudos com GLP-1"],
          ["rgba(15,28,44,.15)","1 em 100 no placebo"]
        ], corpo: "As pesquisas ligam a queda à velocidade da perda de peso e à alimentação.", nota: "Fontes: bulas FDA e EMA." },
      { t: "lista", f: "noite", eyebrow: "O que entra na investigação", titulo: "Nutrientes que **pedem atenção**", itens: [
          ["Proteína","Base para fios fortes durante o emagrecimento."],
          ["Ferro e zinco","O zinco contribui para a manutenção do cabelo, da pele e das unhas."],
          ["Vitamina D e biotina","A biotina contribui para a manutenção do cabelo e da pele."]
        ] },
      { t: "areas", f: "gelo", eyebrow: "O que a manipulação oferece", titulo: "Cuidado sob medida **para os fios**", itens: [
          ["Óleo de painço · Keranat®","Estudado na saúde dos fios em mulheres com eflúvio telógeno."],
          ["Silício orgânico · Exsynutriment®","Na forma ortossilícica, a mais bem absorvida."],
          ["Zinco quelato","Forma quelada, bem tolerada."],
          ["Fórmula completa","Associada ao que o seu médico prescrever."]
        ] },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "Emagreça **sem abrir mão dos fios**", corpo: "Chame no WhatsApp e receba uma avaliação personalizada da nossa equipe farmacêutica." }
    ], legenda: `Emagreceu e o cabelo caiu? Você não está sozinha. 💆‍♀️

Tem nome: eflúvio telógeno. Emagrecer rápido é um estresse para o corpo e pode levar muitos fios para a fase de queda ao mesmo tempo. Ela costuma começar 2 a 3 meses depois e, na maioria das vezes, é passageira.

Nos estudos com remédios para obesidade da classe GLP-1, a queda apareceu em cerca de 3 a 5 em cada 100 pessoas, contra 1 em 100 no placebo, ligada principalmente à velocidade da perda de peso e à alimentação.

Na Biomagistral Santaluz, você encontra cuidado sob medida para os fios: óleo de painço (Keranat®), silício orgânico (Exsynutriment®), zinco quelato e muito mais, com rigor de manipulação.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#quedadecabelo #emagrecimento #cabelo #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-19", capa: "tipo", formato: "carrossel", data: "19/11 (qui)", hora: "19:30", pilar: "Parecidos, mas não iguais", slides: [
      { t: "capa", f: "noite", simbolo: "D·Ω3", simboloN: "Dupla", simboloNome: "Vitamina D + Ômega-3", eyebrow: "A dupla de benefícios", titulo: `Vitamina D
+ **ômega-3**`, sub: "Dois ativos que estão entre os mais estudados do mundo. A Biomagistral está pronta te esperando." },
      { t: "compara", f: "gelo", eyebrow: "Cada um com o seu papel", titulo: "O que **cada um faz**", cab: ["Vitamina D","Ômega-3 (EPA e DHA)"], linhas: [
          ["Auxilia na formação de ossos e dentes","Contribui para o normal funcionamento do coração"],
          ["Auxilia no funcionamento do sistema imune","Em doses médicas, reduziu triglicérides altos"],
          ["Auxilia no funcionamento muscular","Forma triglicerídeo: a natural do óleo de peixe"]
        ] },
      { t: "texto", f: "noite", eyebrow: "Por que juntos", titulo: `Duas rotinas,
**um cuidado**`, corpo: "Vitamina D e ômega-3 fazem parte da rotina de muita gente. Na manipulação, cada um sai **na dose da sua prescrição**, com insumo de qualidade e a forma que combina com você." },
      { t: "mito", f: "gelo", mito: "Vitamina D e ômega-3 previnem câncer de próstata.", verdade: "**Os grandes estudos não mostraram isso.** Os benefícios de cada um são outros, e é por eles que eles fazem parte do cuidado. Prevenção do câncer de próstata começa pela consulta com o médico." },
      { t: "cola", f: "noite", titulo: "A dupla em **quatro pontos**", itens: ["Vitamina D: ossos, músculos e imunidade","Ômega-3: coração e triglicérides","Dose individual, a partir da prescrição","Pureza e laudo em cada lote"] },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "A Biomagistral está **pronta te esperando**", corpo: "Chame no WhatsApp para uma avaliação personalizada da nossa equipe farmacêutica." }
    ], legenda: `Vitamina D + ômega-3: a dupla de benefícios. ☀️🌊

A vitamina D auxilia na formação de ossos e dentes e no funcionamento do sistema imune e muscular. O EPA e o DHA, do ômega-3, contribuem para o normal funcionamento do coração.

Ah, e um mito: os grandes estudos não mostraram que eles previnem câncer de próstata. Os benefícios de cada um são outros, e prevenção começa pela consulta!

Na Biomagistral Santaluz, cada um sai na dose da sua prescrição, com insumo de primeira linha e laudo em cada lote. Estamos prontos te esperando! 💙

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#vitaminad #omega3 #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-20", capa: "arco", formato: "carrossel", data: "20/11 (sex)", hora: "18:30", pilar: "Ativo explicado", slides: [
      { t: "capa", f: "noite", eyebrow: "Energia celular", titulo: `Energia que vem
**de dentro da célula**`, sub: "CoQ10, resveratrol e curcumina nas formas mais avançadas que a manipulação oferece." },
      { t: "texto", f: "noite", eyebrow: "Onde nasce a energia", titulo: "As **usinas** do corpo", corpo: "Dentro de cada célula, as mitocôndrias transformam o que você come em energia. Alguns ativos participam desse processo, e a tecnologia da forma faz diferença." },
      { t: "ficha", f: "gelo", ativo: "Coenzima Q10", tipoAtivo: "Fitossoma e nanoemulsão", linhas: [
          ["O que faz","Participa da produção de energia dentro das mitocôndrias."],
          ["O que os estudos mostram","Uma meta-análise de 13 estudos encontrou redução da sensação de fadiga."],
          ["Por que a forma importa","É pouco solúvel em água: fitossoma e nanoemulsão foram criados para melhorar a absorção."]
        ] },
      { t: "ficha", f: "noite", ativo: "Resveratrol trans", tipoAtivo: "Polifenol da uva", linhas: [
          ["O que é","Polifenol presente na casca da uva, estudado no envelhecimento saudável."],
          ["O que a ciência diz","É transformado rapidamente pelo organismo, e os estudos em pessoas ainda mostram efeitos variáveis."]
        ] },
      { t: "ficha", f: "gelo", ativo: "Curcumina", tipoAtivo: "Forma de alta absorção", linhas: [
          ["O que é","O ativo da cúrcuma, em formas desenvolvidas para ser mais bem absorvidas."],
          ["Cuidado importante","Pede avaliação individual: medicamentos em uso e saúde do fígado entram na conta."]
        ] },
      { t: "texto", f: "noite", eyebrow: "Padrão Biomagistral", titulo: `Tecnologia de ponta,
**com critério**`, corpo: "Na Biomagistral Santaluz, trabalhamos com as formas mais avançadas desses ativos, sempre na dose da sua prescrição e com avaliação farmacêutica." },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "Mais energia, **do jeito certo**", corpo: "Chame no WhatsApp e receba uma avaliação personalizada da nossa equipe farmacêutica." }
    ], legenda: `Energia que vem de dentro da célula. ⚡

Nas mitocôndrias, as "usinas" do corpo, o que você come vira energia. E alguns ativos participam desse processo:

🔸 Coenzima Q10: participa da produção de energia nas mitocôndrias. Uma meta-análise de 13 estudos encontrou redução da sensação de fadiga. Nas formas fitossoma e nanoemulsão, criadas para melhorar a absorção.
🔸 Resveratrol trans: polifenol da uva, estudado no envelhecimento saudável.
🔸 Curcumina de alta absorção: pede avaliação individual, porque medicamentos em uso e a saúde do fígado entram na conta.

Na Biomagistral Santaluz, as formas mais avançadas, com critério e na dose da sua prescrição.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#energia #coenzimaq10 #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-20-reel", formato: "microreel", origem: "claude-design", pedido: "conteudo/design/2026-11-20-reel.txt", data: "20/11 (sex)", hora: "12:15", pilar: "Ativo explicado", legenda: `Cansaço não se resolve com pressa. ⚡

A energia de verdade nasce dentro da célula. E a Biomagistral Santaluz tem os ativos nas formas mais avançadas para fazer parte desse cuidado: coenzima Q10 em fitossoma, resveratrol trans e curcumina de alta absorção.

Tudo com critério, insumos de primeira linha e orientação da nossa equipe farmacêutica.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#energia #coenzimaq10 #resveratrol #curcumina #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-21", capa: "moldura", formato: "carrossel", data: "21/11 (sáb)", hora: "10:00", pilar: "Ativo explicado", slides: [
      { t: "capa", f: "noite", eyebrow: "Saúde intestinal", titulo: `Seu intestino
**pede ajuda**?`, sub: "Probióticos manipulados: o que a ciência mostra e quando fazem sentido." },
      { t: "texto", f: "gelo", eyebrow: "Não é tudo igual", titulo: `Cada probiótico,
**uma linhagem**`, corpo: "Cada resultado estudado vale para uma linhagem específica, identificada por um código depois do nome. Por isso a escolha da linhagem e da quantidade é **individual**." },
      { t: "barras", f: "noite", eyebrow: "Durante o antibiótico", titulo: `Diarreia em
**21 estudos**`, max: 20, itens: [
          ["Grupo controle",18.7,"18,7%"],
          ["Com Saccharomyces boulardii",8.5,"8,5%",true]
        ], nota: "Revisão de 21 estudos com pessoas em uso de antibiótico." },
      { t: "areas", f: "gelo", eyebrow: "Quando faz sentido conversar", titulo: "Momentos em que o probiótico **entra em pauta**", itens: [
          ["Uso de antibiótico","Onde a evidência é mais consistente."],
          ["Diarreia aguda","A ciência ainda mostra resultados variados."],
          ["Mudança de rotina","Dieta nova, emagrecimento, intestino desregulado."],
          ["Avaliação primeiro","Imunidade muito baixa pede orientação médica."]
        ] },
      { t: "texto", f: "noite", eyebrow: "Na manipulação", titulo: `A linhagem certa,
**na dose certa**`, corpo: "Trabalhamos com cepas isoladas de primeira linha, combinadas conforme a sua prescrição, em cápsula ou sachê." },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "Seu intestino **em boas mãos**", corpo: "Chame no WhatsApp para uma avaliação personalizada da nossa equipe farmacêutica." }
    ], legenda: `Probióticos: quando o intestino pede ajuda. 🌿

Probiótico não é tudo igual: cada resultado vale para uma linhagem específica. Um exemplo: numa revisão de 21 estudos com pessoas em uso de antibiótico, 8,5% do grupo com Saccharomyces boulardii teve diarreia, contra 18,7% do grupo controle.

Uso de antibiótico, mudanças de rotina, intestino desregulado: são momentos em que vale conversar sobre probióticos. Na Biomagistral Santaluz, trabalhamos com cepas isoladas de primeira linha, na combinação e na dose da sua prescrição.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#probioticos #saudeintestinal #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-22", capa: "foto", formato: "carrossel", data: "22/11 (dom)", hora: "19:00", pilar: "Ativo explicado", slides: [
      { t: "capa", f: "noite", eyebrow: "Pele no verão", titulo: `Verão baiano
com **pele protegida**`, sub: "Protetor solar sempre e os ativos que a ciência estuda para uma pele mais bonita no sol." },
      { t: "bento", f: "gelo", eyebrow: "O básico que não pode faltar", titulo: "Protetor **todos os dias**", itens: [
          { n: "FPS 30+", t: "todo dia, faça sol ou não", rot: "Proteção", grande: true },
          { n: "2 h", t: "reaplicação no sol e depois da água", rot: "Ritmo" },
          { n: "9h–15h", t: "cuidado redobrado no Nordeste", rot: "Horário" }
        ], nota: "Fonte: Sociedade Brasileira de Dermatologia." },
      { t: "texto", f: "noite", eyebrow: "De dentro para fora", titulo: "Pele bonita **também se nutre**", corpo: "Estudos com **betacaroteno e licopeno**, por 10 a 12 semanas, observaram menos vermelhidão na pele após exposição controlada à luz UV." },
      { t: "mito", f: "gelo", mito: "Com cápsula de sol, posso dispensar o protetor.", verdade: "**Nenhum ativo oral substitui o protetor solar.** Os estudos mostram que eles funcionam, no máximo, como complemento. Chapéu, óculos e sombra continuam valendo." },
      { t: "foto", eyebrow: "Verão baiano", titulo: `Brilhe no sol,
**com cuidado**`, corpo: "Proteção por fora, nutrição por dentro." },
      { t: "areas", f: "noite", eyebrow: "Na manipulação", titulo: "Seu verão, **sob medida**", itens: [
          ["Protetor personalizado","Textura e veículo ajustados ao seu tipo de pele."],
          ["Ativos orais","Betacaroteno e licopeno, na dose da sua avaliação."],
          ["Pós-sol","Hidratação e cuidado depois da praia."],
          ["Corpo e rosto","Cada área com a fórmula que ela pede."]
        ] },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "Brilhe no verão, **com cuidado**", corpo: "Chame no WhatsApp para uma avaliação personalizada da nossa equipe farmacêutica." }
    ], legenda: `Verão baiano com pele protegida! ☀️

O básico não pode faltar: protetor com FPS 30 ou mais todos os dias, reaplicação a cada 2 horas e cuidado redobrado das 9h às 15h (SBD).

E a pele também se nutre de dentro para fora: estudos com betacaroteno e licopeno observaram menos vermelhidão na pele após exposição controlada ao sol. Mas atenção: nenhum ativo oral substitui o protetor!

Na Biomagistral Santaluz, o seu verão é sob medida: protetor personalizado, ativos orais, pós-sol e cuidados para rosto e corpo.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#verao #protetorsolar #pele #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-23", capa: "arco", formato: "carrossel", data: "23/11 (seg)", hora: "19:30", pilar: "Como sua fórmula é feita", slides: [
      { t: "capa", f: "noite", eyebrow: "Dermocosméticos sob medida", titulo: `Sua pele merece
uma fórmula **só dela**`, sub: "Cremes, séruns, peelings e cuidados de rosto e corpo, manipulados para você." },
      { t: "texto", f: "noite", eyebrow: "Por que manipular", titulo: `Textura, veículo e ativos
**ajustados a você**`, corpo: "Na farmácia de manipulação, a fórmula de um cosmético pode ter textura, veículo e fragrância ajustados ao seu tipo de pele. Nada de adaptar a sua pele ao que está na prateleira." },
      { t: "areas", f: "gelo", eyebrow: "O que manipulamos", titulo: "Cuidado completo, **rosto e corpo**", itens: [
          ["Cremes e séruns","Hidratação, firmeza e luminosidade."],
          ["Peelings de uso em casa","Renovação da pele, em concentração segura."],
          ["Clareadores","Para manchas, na fórmula da sua avaliação."],
          ["Corpo","Hidratantes, firmadores e cuidados específicos."]
        ] },
      { t: "texto", f: "noite", eyebrow: "Cuidado importante", titulo: "Ácido pede **protetor solar**", corpo: "Ativos esfoliantes deixam a pele mais sensível ao sol. Por isso o protetor faz parte da rotina de quem usa esse tipo de fórmula." },
      { t: "lista", f: "gelo", eyebrow: "Rigor em cada pote", titulo: "Qualidade **que se vê**", itens: [
          ["Controle de qualidade","Aspecto, características, pH e peso conferidos."],
          ["Concentrações seguras","Dentro dos limites definidos pela Anvisa."],
          ["Insumos de primeira linha","Com laudo e rastreabilidade."]
        ] },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "Sua pele, **do seu jeito**", corpo: "Chame no WhatsApp e receba uma avaliação personalizada da nossa equipe farmacêutica." }
    ], legenda: `Sua pele merece uma fórmula só dela. ✨

Na Biomagistral Santaluz, manipulamos cremes, séruns, peelings de uso em casa, clareadores e cuidados para o corpo, com textura, veículo e ativos ajustados ao seu tipo de pele.

Cada pote passa por controle de qualidade, com concentrações seguras e insumos de primeira linha. E lembre: ácido pede protetor solar!

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#skincare #dermocosmeticos #pele #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-23-reel", formato: "microreel", data: "23/11 (seg)", hora: "12:15", pilar: "Como sua fórmula é feita", musica: "mixkit-988.mp3", musicaInicio: 10, cenas: [
      { t: "foto", dur: 4, video: "2026-11-23-runway.mp4", foto: "2026-11-23-runway.png", eyebrow: "Dermocosméticos sob medida", titulo: `Sua pele,
**do seu jeito**.` },
      { t: "palavra", dur: 2.8, palavra: "SOB MEDIDA", titulo: "textura, veículo e **ativos**", textura: "2026-11-23-runway.png" },
      { t: "lista", dur: 4.6, eyebrow: "Rosto e corpo", itens: ["Cremes e séruns","Peelings de uso em casa","Clareadores","Cuidados para o corpo"] },
      { t: "foto", dur: 3.4, video: "2026-11-23-runway.mp4", videoInicio: 5, foto: "2026-11-23-runway.png", titulo: `Excelência que
**se sente na pele**.` },
      { t: "final", dur: 4.2, titulo: "Cuidado **sob medida** para a sua pele." }
    ], legenda: `Sua pele não precisa se adaptar ao que está na prateleira. ✨

Na Biomagistral Santaluz, cremes, séruns, peelings de uso em casa, clareadores e cuidados para o corpo são manipulados com textura, veículo e ativos ajustados a você, com insumos de primeira linha e controle de qualidade em cada pote.

Usa ácido? Protetor solar faz parte da rotina!

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#skincare #dermocosmeticos #pele #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-24", capa: "moldura", formato: "carrossel", data: "24/11 (ter)", hora: "19:30", pilar: "Parecidos, mas não iguais", slides: [
      { t: "capa", f: "noite", eyebrow: "Parecidos, mas não iguais", titulo: `Biotina, queratina
ou **colágeno**?`, sub: "Os três aparecem em todo lugar quando o assunto é cabelo, pele e unha. Mas cada um tem um papel." },
      { t: "texto", f: "gelo", eyebrow: "Do que somos feitos", titulo: "Fio e unha são **queratina**", corpo: "Cabelo e unha são feitos de queratina. O colágeno é a proteína que dá sustentação à pele. E a biotina é uma vitamina que participa do metabolismo." },
      { t: "ficha", f: "noite", ativo: "Biotina", tipoAtivo: "Vitamina B7", linhas: [
          ["O que diz a Anvisa","A biotina contribui para a manutenção do cabelo e da pele."],
          ["Para quem faz mais diferença","Os estudos mostram benefício principalmente em quem tem falta dela."],
          ["Bom saber","Em dose alta, pode alterar exames de sangue. Avise o médico e o laboratório."]
        ] },
      { t: "ficha", f: "gelo", ativo: "Queratina", tipoAtivo: "Proteína do fio", linhas: [
          ["No xampu","Age na superfície do fio já formado."],
          ["Por dentro","Keranat® é o óleo de painço estudado na saúde dos fios, um caminho diferente da queratina pronta."]
        ] },
      { t: "ficha", f: "noite", ativo: "Colágeno", tipoAtivo: "Peptídeos bioativos", linhas: [
          ["Na pele","Verisol® reduziu, em média, 20% o volume das rugas ao redor dos olhos, em 8 semanas."],
          ["Nas unhas","Peptídeos de colágeno foram avaliados no crescimento e na resistência das unhas."]
        ] },
      { t: "cola", f: "gelo", titulo: "Cada um, **o seu papel**", itens: ["Biotina: manutenção do cabelo e da pele","Queratina: a matéria-prima do fio","Colágeno: sustentação e firmeza da pele","Juntos, na fórmula da sua avaliação"] },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "O melhor do mercado, **ao seu alcance**", corpo: "Chame no WhatsApp para uma avaliação personalizada da nossa equipe farmacêutica." }
    ], legenda: `Biotina, queratina ou colágeno? ✨

Os três aparecem em todo lugar, mas cada um tem um papel:
🔸 Biotina: contribui para a manutenção do cabelo e da pele, com mais benefício em quem tem falta dela.
🔸 Queratina: a matéria-prima do fio e da unha.
🔸 Colágeno: sustentação e firmeza da pele. O Verisol® reduziu, em média, 20% o volume das rugas ao redor dos olhos em 8 semanas.

Na Biomagistral Santaluz, você encontra o melhor do mercado ao seu alcance, combinado na fórmula da sua avaliação.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#biotina #colageno #cabelo #unhas #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-25", capa: "arco", formato: "carrossel", data: "25/11 (qua)", hora: "19:30", pilar: "Mito ou verdade", slides: [
      { t: "capa", f: "noite", eyebrow: "Mito ou verdade", titulo: `Suplemento
é **tudo igual**?`, sub: "Quem já usou uma vez sabe: a qualidade da matéria-prima e da manipulação faz diferença." },
      { t: "mito", f: "noite", mito: "Se o nome no rótulo é igual, o suplemento é igual.", verdade: "**O mesmo nome não garante o mesmo teor, a mesma forma nem a mesma absorção.** Por isso a matéria-prima precisa de especificação e laudo." },
      { t: "numero", f: "gelo", eyebrow: "O que um estudo encontrou", numero: "41% a 165%", unidade: "do teor do rótulo", regua: 70, titulo: "Em 11 suplementos de vitamina D, o teor real variou de **41% a 165%**", nota: "Fonte: Wan et al., Br J Clin Pharmacol, 2021 (Inglaterra)." },
      { t: "pictograma", f: "noite", eyebrow: "E no Brasil", titulo: "**7 de 10** marcas brasileiras de whey", on: 70, legenda: [
          ["#C9AE6E","tinham menos proteína do que o rótulo dizia"]
        ], nota: "Fonte: Almeida et al., J Diet Suppl, 2016." },
      { t: "lista", f: "gelo", eyebrow: "O padrão Biomagistral", titulo: "Material de **excelência**", itens: [
          ["Laudo em cada lote","Toda matéria-prima chega com certificado de análise."],
          ["Análise de teor","Fórmulas analisadas em laboratório periodicamente."],
          ["Forma certa","Quelatos, fitossomas, peptídeos de marca."]
        ] },
      { t: "texto", f: "noite", eyebrow: "Quem já usou sabe", titulo: `A qualidade
**é diferente**`, corpo: "Matéria-prima de primeira linha e rigor de manipulação em cada etapa: é isso que você sente na sua fórmula Biomagistral." },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "Excelência em **cada cápsula**", corpo: "Chame no WhatsApp e receba uma avaliação personalizada da nossa equipe farmacêutica." }
    ], legenda: `Suplemento é tudo igual? Não! 💡

O mesmo nome no rótulo não garante o mesmo teor, a mesma forma nem a mesma absorção. Um estudo na Inglaterra encontrou suplementos de vitamina D com 41% a 165% do teor prometido. E, no Brasil, 7 de 10 marcas de whey avaliadas tinham menos proteína do que o rótulo dizia.

Na Biomagistral Santaluz, trabalhamos com material de excelência: laudo em cada lote, análise de teor em laboratório e as formas certas de cada ativo. Quem já usou uma vez sabe: a qualidade é diferente! 💙

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#suplementos #qualidade #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-26", capa: "tipo", formato: "carrossel", data: "26/11 (qui)", hora: "19:30", pilar: "Ativo explicado", slides: [
      { t: "capa", f: "noite", simbolo: "Fe", simboloN: "26", simboloNome: "Ferro", eyebrow: "Saúde da mulher", titulo: `Ferro na **dose
que você precisa**`, sub: "Por que tantas mulheres precisam de atenção ao ferro e por que a dose é individual." },
      { t: "texto", f: "gelo", eyebrow: "Mais comum do que parece", titulo: `Falta de ferro
**sem anemia**`, corpo: "A deficiência de ferro pode existir mesmo com o hemograma normal. Só exames, como a **ferritina**, mostram se o estoque está baixo. Por isso a avaliação vem antes de tudo." },
      { t: "texto", f: "noite", eyebrow: "O que um estudo mostrou", titulo: "Menos cansaço com o **estoque em dia**", corpo: "Um estudo publicado em 2012 observou menos fadiga com ferro em mulheres sem anemia, mas com ferritina baixa no exame." },
      { t: "ficha", f: "gelo", ativo: "Ferro bisglicinato", tipoAtivo: "Ferro quelato", linhas: [
          ["O que é","Ferro ligado ao aminoácido glicina: uma forma quelada."],
          ["Tolerância","Em gestantes, estudos registraram menos desconforto gastrointestinal que com o sulfato ferroso."],
          ["Dose individual","O corpo regula a absorção conforme o estoque: dose e esquema são personalizados."]
        ] },
      { t: "texto", f: "noite", eyebrow: "Atenção", titulo: `Ferro demais
**também faz mal**`, corpo: "Por isso o ferro entra com indicação e acompanhamento, na dose que o seu médico definir. E a manipulação prepara **exatamente** essa dose." },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "Seu ferro, **na dose certa**", corpo: "Chame no WhatsApp: a Biomagistral tem para você, com avaliação personalizada da nossa equipe farmacêutica." }
    ], legenda: `Ferro na dose que você precisa. 💪

A falta de ferro pode existir mesmo sem anemia, e só exames, como a ferritina, mostram se o estoque está baixo. Um estudo de 2012 observou menos cansaço com ferro em mulheres sem anemia, mas com ferritina baixa.

Mas atenção: ferro demais também faz mal. Por isso ele entra com indicação e acompanhamento.

Na Biomagistral Santaluz, você encontra ferro bisglicinato, uma forma quelada, preparado exatamente na dose que o seu médico definir.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#ferro #saudedamulher #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-27", capa: "arco", formato: "carrossel", data: "27/11 (sex)", hora: "18:30", pilar: "Ativo explicado", slides: [
      { t: "capa", f: "noite", eyebrow: "Ativo explicado", titulo: `Vitamina D3 + K2:
por que **andam juntas**?`, sub: "Os benefícios da vitamina D e o papel da K2 no caminho do cálcio." },
      { t: "areas", f: "gelo", eyebrow: "Vitamina D", titulo: "O que a **ciência reconhece**", itens: [
          ["Ossos e dentes","A vitamina D auxilia na formação de ossos e dentes."],
          ["Cálcio e fósforo","Auxilia na absorção de cálcio e fósforo."],
          ["Imunidade","Auxilia no funcionamento do sistema imune."],
          ["Músculos","Auxilia no funcionamento muscular."]
        ] },
      { t: "palavra", f: "noite", eyebrow: "A dupla", palavra: "D3 + K2", titulo: "no **metabolismo do cálcio**", corpo: "A K2 (MK-7) ativa proteínas que participam do metabolismo do cálcio no osso." },
      { t: "texto", f: "noite", eyebrow: "E a K2?", titulo: "A vitamina que **guia o cálcio**", corpo: "A vitamina K2, na forma **MK-7**, ativa proteínas que participam do metabolismo do cálcio no osso. Por isso ela aparece com frequência ao lado da vitamina D." },
      { t: "molecula", f: "gelo", molecula: "menaquinone 7", eyebrow: "A molécula", titulo: "**Vitamina K2** (MK-7)", corpo: "A forma menaquinona-7, de cadeia longa." },
      { t: "texto", f: "gelo", eyebrow: "Dose individual", titulo: `A sua dose depende
do **seu exame**`, corpo: "A dose de vitamina D depende do exame, da idade e da história de cada pessoa. E quem usa anticoagulante precisa de orientação médica antes de qualquer suplemento com vitamina K." },
      { t: "cola", f: "noite", titulo: "D3 + K2 **em quatro pontos**", itens: ["D3: ossos, músculos e imunidade","K2 (MK-7): participa do caminho do cálcio","Dose definida pelo seu médico","Manipulada na dose exata, juntas ou separadas"] },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "Sua vitamina D, **sob medida**", corpo: "Chame no WhatsApp para uma avaliação personalizada da nossa equipe farmacêutica." }
    ], legenda: `Vitamina D3 + K2: por que andam juntas? ☀️

A vitamina D auxilia na formação de ossos e dentes, na absorção de cálcio e fósforo e no funcionamento do sistema imune e muscular. E a vitamina K2, na forma MK-7, ativa proteínas que participam do metabolismo do cálcio no osso.

A dose depende do seu exame e da sua história, e quem usa anticoagulante precisa de orientação médica antes de qualquer suplemento com vitamina K.

Na Biomagistral Santaluz, a sua vitamina D sai sob medida, na dose exata da sua prescrição.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#vitaminad #vitaminak2 #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-28", capa: "moldura", formato: "carrossel", data: "28/11 (sáb)", hora: "10:00", pilar: "Ativo explicado", slides: [
      { t: "capa", f: "noite", eyebrow: "Saúde da mulher", titulo: `Desejo, menopausa
e **qualidade de vida**`, sub: "O que a ciência diz sobre a testosterona em creme para mulheres." },
      { t: "texto", f: "gelo", eyebrow: "Uma queixa que merece cuidado", titulo: `Não é frescura:
é **saúde**`, corpo: "Desejo sexual baixo que traz sofrimento depois da menopausa é uma queixa médica. Merece avaliação completa, sem tabu." },
      { t: "foto", eyebrow: "Qualidade de vida", titulo: `Bem-estar também
é **saúde**`, corpo: "Com avaliação médica e cuidado sob medida." },
      { t: "texto", f: "noite", eyebrow: "O que diz a ciência", titulo: "Existe **indicação**", corpo: "Um consenso internacional de 2019 aponta uma indicação com evidência para a testosterona em mulheres: o **transtorno do desejo sexual hipoativo na pós-menopausa**, após avaliação médica." },
      { t: "texto", f: "gelo", eyebrow: "Por que manipulada", titulo: `A dose feminina
é **muito menor**`, corpo: "A dose usada por mulheres é uma fração da masculina, preparada sob medida em creme, a partir da prescrição médica. É por isso que ela é feita na farmácia de manipulação." },
      { t: "lista", f: "noite", eyebrow: "Com responsabilidade", titulo: "O que você **precisa saber**", itens: [
          ["Só com prescrição","Indicação e acompanhamento médico, sempre."],
          ["Foco definido","Os estudos não mostram benefício para bem-estar geral, memória, ossos ou músculos."],
          ["Acompanhamento","Os dados de segurança vão até 24 meses."]
        ] },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "Elegância e qualidade **na palma da sua mão**", corpo: "Tem a sua prescrição? Chame no WhatsApp para uma avaliação personalizada." }
    ], legenda: `Desejo, menopausa e qualidade de vida. 🌹

Desejo sexual baixo que traz sofrimento depois da menopausa é uma queixa médica e merece avaliação completa, sem tabu. Um consenso internacional de 2019 aponta uma indicação com evidência para a testosterona em mulheres: o transtorno do desejo sexual hipoativo na pós-menopausa, após avaliação médica.

A dose feminina é uma fração da masculina, preparada sob medida em creme, a partir da prescrição. Na Biomagistral Santaluz, usamos o que há de melhor, com elegância e qualidade na palma da sua mão.

Sempre com prescrição e acompanhamento médico. 💙

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#saudedamulher #menopausa #qualidadedevida #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-29", capa: "tipo", formato: "carrossel", data: "29/11 (dom)", hora: "19:00", pilar: "Ativo explicado", slides: [
      { t: "capa", f: "noite", simbolo: "Q10", simboloN: "Energia", simboloNome: "Coenzima Q10 e mais", eyebrow: "Cansaço constante", titulo: "Cansada **o tempo todo**?", sub: "As causas que valem investigar e os ativos que a manipulação oferece contra a fadiga." },
      { t: "texto", f: "gelo", eyebrow: "Primeiro, a causa", titulo: "Cansaço tem **muitas causas**", corpo: "Falta de ferro, de vitamina B12, alterações da tireoide, sono ruim. Por isso a **avaliação vem antes** de qualquer suplemento." },
      { t: "areas", f: "noite", eyebrow: "Ativos estudados na fadiga", titulo: "O que a Biomagistral **tem para você**", itens: [
          ["Ferro","Menos fadiga em mulheres com ferritina baixa, mesmo sem anemia (2012)."],
          ["Vitamina B12","Faz diferença em quem tem falta: idosos, vegetarianos, quem usa metformina."],
          ["Coenzima Q10","Revisão de 13 estudos: redução dos escores de fadiga."],
          ["Magnésio","O magnésio auxilia no funcionamento muscular."],
          ["Rhodiola e ginseng","Plantas estudadas na fadiga, com estudos ainda pequenos."],
          ["Formas avançadas","Metilcobalamina, quelatos e fitossomas."]
        ] },
      { t: "texto", f: "gelo", eyebrow: "Por que tantas opções", titulo: "Cada cansaço, **uma fórmula**", corpo: "O ativo certo depende da causa. Na manipulação, eles podem ser combinados numa só fórmula, na dose da sua prescrição." },
      { t: "texto", f: "noite", eyebrow: "Padrão Biomagistral", titulo: "Sempre **com qualidade**", corpo: "Insumos de primeira linha, laudo em cada lote e rigor de manipulação: energia que vem do cuidado certo." },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "Mais disposição, **do jeito certo**", corpo: "Chame no WhatsApp para uma avaliação personalizada da nossa equipe farmacêutica." }
    ], legenda: `Cansada o tempo todo? 😮‍💨

Cansaço tem muitas causas: falta de ferro, de vitamina B12, alterações da tireoide, sono ruim. Por isso a avaliação vem antes de qualquer suplemento.

E, quando indicado, a Biomagistral Santaluz tem para você: ferro, vitamina B12 (metilcobalamina), coenzima Q10, magnésio, Rhodiola, ginseng e muito mais, combinados numa só fórmula, na dose da sua prescrição. Sempre com qualidade!

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#cansaco #energia #disposicao #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-30", capa: "arco", formato: "carrossel", data: "30/11 (seg)", hora: "19:30", pilar: "Ativo explicado", slides: [
      { t: "capa", f: "noite", eyebrow: "Ativo explicado", titulo: `Morosil®:
o ativo da **laranja moro**`, sub: "Da Sicília para a sua fórmula: o que os estudos mostram." },
      { t: "texto", f: "noite", eyebrow: "De onde vem", titulo: `A laranja
**vermelha da Sicília**`, corpo: "A laranja Moro cresce aos pés do vulcão Etna, na Itália, e é rica em **antocianinas**, os pigmentos que deixam a polpa vermelha. O Morosil® é o extrato padronizado dessa fruta." },
      { t: "molecula", f: "gelo", molecula: "cyanidin 3-glucoside", eyebrow: "A molécula", titulo: "**Antocianinas**", corpo: "Os pigmentos que deixam a polpa da laranja moro vermelha." },
      { t: "barras", f: "gelo", eyebrow: "O que um estudo de 6 meses mostrou", titulo: `Cintura a menos,
**com dieta e exercício**`, max: 4, itens: [
          ["Placebo",1.7,"−1,7 cm"],
          ["Extrato de laranja Moro",3.9,"−3,9 cm",true]
        ], nota: "Peso: −4,2% contra −2,2%. Estudo financiado pelo fabricante do extrato." },
      { t: "texto", f: "noite", eyebrow: "Com o pé no chão", titulo: "Aliado, **não atalho**", corpo: "Os estudos avaliaram o extrato **junto com** mudança de alimentação e atividade física, não no lugar delas. E se ele faz sentido para você, quem define é a avaliação individual." },
      { t: "cola", f: "gelo", titulo: "Morosil® **em quatro pontos**", itens: ["Extrato da laranja Moro, rica em antocianinas","Estudado na cintura e no peso","Sempre junto de dieta e exercício","Com avaliação e acompanhamento"] },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "Seu metabolismo, **sob medida**", corpo: "Chame no WhatsApp para uma avaliação personalizada da nossa equipe farmacêutica." }
    ], legenda: `Morosil®: o ativo da laranja moro. 🍊

A laranja Moro, da Sicília, é rica em antocianinas, os pigmentos que deixam a polpa vermelha. O Morosil® é o extrato padronizado dessa fruta.

Num estudo de 6 meses, com dieta e exercício, a cintura diminuiu em média 3,9 cm no grupo do extrato, contra 1,7 cm no placebo (estudo financiado pelo fabricante). Aliado, não atalho: os estudos avaliaram o extrato junto com mudança de hábitos.

Na Biomagistral Santaluz, o Morosil® entra na sua fórmula com avaliação individual e rigor de manipulação.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#morosil #metabolismo #emagrecimento #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-08", capa: "foto", formato: "carrossel", data: "08/11 (dom)", hora: "19:00", pilar: "Ativo explicado", slides: [
      { t: "capa", f: "noite", eyebrow: "Sono e bem-estar", titulo: `Noites melhores
começam **de dia**`, sub: "Os hábitos que a ciência associa a um sono de qualidade e os ativos que a manipulação oferece." },
      { t: "anel", f: "gelo", numero: "7h", porcento: 29, legenda: "por noite, no mínimo", eyebrow: "O que os especialistas recomendam", titulo: `Sono suficiente
é **saúde**`, corpo: "Dormir menos com frequência se associa a obesidade, diabetes, hipertensão e depressão.", nota: "Fonte: consenso AASM/SRS, Sleep, 2015." },
      { t: "lista", f: "noite", eyebrow: "Hábitos com respaldo científico", titulo: "Cinco hábitos para **dormir melhor**", itens: [
          ["Horário fixo","Deitar e acordar no mesmo horário, inclusive no fim de semana."],
          ["Quarto escuro e fresco","Silêncio, pouca luz e temperatura agradável."],
          ["Telas longe da cama","Desligar eletrônicos 30 minutos antes de deitar."],
          ["Cafeína só cedo","Mesmo 6 horas antes, ela ainda pode atrapalhar o sono."],
          ["Corpo em movimento","Exercício regular melhora a qualidade do sono."]
        ] },
      { t: "ficha", f: "gelo", ativo: "Melatonina", tipoAtivo: "Hormônio da noite", linhas: [
          ["O que é","Um hormônio que o próprio corpo produz à noite e que ajuda a marcar o **relógio biológico**."],
          ["O que a ciência mostra","A evidência mais consistente está no ajuste do relógio, como no jet lag de viagens longas."],
          ["Na manipulação","Preparada na dose e na forma definidas na sua avaliação."]
        ] },
      { t: "molecula", f: "noite", molecula: "melatonin", eyebrow: "A molécula", titulo: "**Melatonina**", corpo: "O hormônio que o corpo produz à noite e que marca o relógio biológico." },
      { t: "areas", f: "noite", eyebrow: "Ativos da rotina da noite", titulo: "O que a Biomagistral **tem para você**", itens: [
          ["Prosleep®","Ativo à base de extratos de frutas vermelhas, usado em fórmulas para a rotina noturna."],
          ["Magnésio bisglicinato","Magnésio ligado à glicina. O magnésio auxilia no funcionamento muscular."],
          ["Magnésio treonato","Forma estudada em pesquisas sobre o magnésio no cérebro."],
          ["Melatonina","O hormônio do relógio biológico, na dose da sua avaliação."]
        ] },
      { t: "texto", f: "gelo", eyebrow: "Importante", titulo: "Insônia que não passa merece **avaliação**", corpo: "Dificuldade para dormir três ou mais noites por semana, por três meses ou mais, precisa de avaliação médica. Hábito ajuda muito, mas não resolve tudo sozinho." },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "Sua noite, **do seu jeito**", corpo: "Chame no WhatsApp e receba uma avaliação personalizada da nossa equipe farmacêutica." }
    ], legenda: `Noites melhores começam de dia. 🌙

Adultos precisam de 7 horas ou mais de sono por noite. E alguns hábitos fazem diferença: horário fixo, quarto escuro e fresco, telas longe da cama, cafeína só cedo e corpo em movimento.

Na Biomagistral Santaluz, você também encontra ativos da rotina da noite, como Prosleep®, melatonina e magnésio em diferentes formas, sempre na dose definida na sua avaliação e com rigor de manipulação.

Insônia que não passa merece avaliação médica, combinado? 💙

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#sono #dormirbem #bemestar #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-09", capa: "arco", formato: "carrossel", data: "09/11 (seg)", hora: "19:30", pilar: "Como sua fórmula é feita", slides: [
      { t: "capa", f: "noite", eyebrow: "Transparência", titulo: "Você sabe o que tem **na sua fórmula**?", sub: "A gente mostra: o caminho da matéria-prima até chegar em você." },
      { t: "texto", f: "noite", eyebrow: "Começa antes da manipulação", titulo: "Cada insumo chega com **certidão de nascimento**", corpo: "É o **laudo de análise**: o documento do fornecedor que diz o que é aquela matéria-prima, de onde vem e se ela está dentro do padrão. Sem laudo, não entra no laboratório." },
      { t: "passos", f: "gelo", eyebrow: "O que acontece na chegada", titulo: "Conferido, **não só arquivado**", itens: [
          ["Laudo conferido","A farmacêutica compara o laudo com as especificações exigidas."],
          ["Testes próprios","Aspecto, pH, peso e outros, conforme o tipo de matéria-prima."],
          ["Quarentena","O insumo só é liberado depois de aprovado; o reprovado é devolvido."]
        ] },
      { t: "texto", f: "noite", eyebrow: "Insumos de primeira linha", titulo: "Marcas que você **pode reconhecer**", corpo: "Trabalhamos com insumos de fabricantes reconhecidos e com ativos de marca, como **Verisol®, Keranat®, Clonapure® e Prosleep®**, sempre com laudo e rastreabilidade." },
      { t: "lista", f: "gelo", eyebrow: "Rastreabilidade", titulo: "Da matéria-prima **até você**", itens: [
          ["Registro de cada lote","Sabemos de onde veio cada insumo da sua fórmula."],
          ["Fornecedores avaliados","Regularidade sanitária, laudos e histórico de entregas."],
          ["Seu nome no rótulo","E a farmacêutica responsável por cada etapa."]
        ] },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "Qualidade que **você vê**", corpo: "Quer saber mais sobre a sua fórmula? Chame no WhatsApp para uma avaliação personalizada." }
    ], legenda: `Você sabe o que tem na sua fórmula? A gente mostra! 🔍

Cada insumo que chega à Biomagistral Santaluz vem com o laudo de análise, a "certidão de nascimento" da matéria-prima. E a gente não só arquiva: confere o laudo, faz testes próprios e só libera depois de aprovado.

Trabalhamos com insumos de primeira linha e ativos de marca, como Verisol®, Keranat®, Clonapure® e Prosleep®, com rastreabilidade do lote até você.

Transparência e rigor: é assim que uma farmácia de manipulação de excelência trabalha. 💙

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#qualidade #transparencia #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-10", capa: "moldura", formato: "carrossel", data: "10/11 (ter)", hora: "19:30", pilar: "Parecidos, mas não iguais", slides: [
      { t: "capa", f: "noite", eyebrow: "Parecidos, mas não iguais", titulo: `Qual colágeno
é **para você**?`, sub: "Pele ou músculo: cada peptídeo de colágeno foi estudado para um objetivo." },
      { t: "texto", f: "gelo", eyebrow: "Colágeno não é tudo igual", titulo: `Cada peptídeo,
**um objetivo**`, corpo: "Existem peptídeos de colágeno específicos, desenvolvidos e estudados para resultados diferentes. Dois dos mais estudados do mundo são do mesmo fabricante alemão: **Verisol® e Bodybalance®**." },
      { t: "ficha", f: "noite", ativo: "Verisol®", tipoAtivo: "Peptídeos para a pele", linhas: [
          ["Foco","Beleza da pele, de dentro para fora."],
          ["O que os estudos mostram","Em mulheres de 45 a 65 anos, o volume das rugas ao redor dos olhos ficou, em média, **20% menor** que no grupo placebo após 8 semanas."],
          ["Para quem","Quem quer cuidar da firmeza e da aparência da pele."]
        ] },
      { t: "anel", f: "gelo", numero: "20%", porcento: 20, legenda: "menos volume de rugas", eyebrow: "Verisol® em números", titulo: "Em **8 semanas**", corpo: "Mulheres de 45 a 65 anos, ao redor dos olhos, em média, comparado ao grupo placebo." },
      { t: "ficha", f: "gelo", ativo: "Bodybalance®", tipoAtivo: "Peptídeos para o músculo", linhas: [
          ["Foco","Composição corporal, junto com o treino."],
          ["O que os estudos mostram","Quem treinou e recebeu os peptídeos ganhou, em média, **mais massa magra** do que quem treinou e recebeu placebo."],
          ["Detalhe","Ele acompanha o treino de força, não substitui."]
        ] },
      { t: "compara", f: "noite", eyebrow: "Lado a lado", titulo: "Verisol® × **Bodybalance®**", cab: ["Verisol®","Bodybalance®"], linhas: [
          ["Pele: rugas e firmeza","Músculo: massa magra e força"],
          ["Rotina de beleza","Rotina de treino"],
          ["Sachê ou cápsula","Sachê (dose maior)"]
        ] },
      { t: "areas", f: "gelo", eyebrow: "Do seu jeito", titulo: "Manipulado em **várias formas**", itens: [
          ["Sachê","Dissolve na água, no suco ou no café."],
          ["Cápsula","Prática para quem prefere não sentir sabor."],
          ["Associado","Junto com outros ativos da sua fórmula."],
          ["Na dose certa","A quantidade muda conforme o objetivo."]
        ] },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "O colágeno certo, **na dose certa**", corpo: "Chame no WhatsApp: a nossa equipe farmacêutica ajuda você a escolher." }
    ], legenda: `Qual colágeno é para você? ✨

Colágeno não é tudo igual. Existem peptídeos específicos, cada um estudado para um objetivo. E dois dos mais estudados do mundo estão aqui na Biomagistral Santaluz:

🌟 Verisol®: para a pele. Nos estudos, mulheres de 45 a 65 anos tiveram, em média, volume de rugas ao redor dos olhos 20% menor que o grupo placebo após 8 semanas.
💪 Bodybalance®: para o músculo, junto com o treino. Quem treinou e recebeu os peptídeos ganhou, em média, mais massa magra.

E tudo manipulado na forma que combina com você: sachê, cápsula ou associado à sua fórmula.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#colageno #verisol #bodybalance #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-11", capa: "arco", formato: "carrossel", data: "11/11 (qua)", hora: "19:30", pilar: "Ativo explicado", slides: [
      { t: "capa", f: "noite", eyebrow: "Força depois dos 60", titulo: `Músculo forte
em **qualquer idade**`, sub: "O que a ciência recomenda para manter a força e os ativos que podem fazer parte do cuidado." },
      { t: "palavra", f: "noite", eyebrow: "Depois dos 60", palavra: "FORÇA", titulo: "é **independência**", corpo: "Subir escada, carregar as compras, levantar da cadeira. A boa notícia: dá para cuidar." },
      { t: "lista", f: "gelo", eyebrow: "O que as diretrizes recomendam", titulo: "A base do **cuidado**", itens: [
          ["Treino de força","As diretrizes internacionais colocam o exercício resistido como base."],
          ["Mais proteína","Pessoas mais velhas precisam de mais proteína por dia que adultos jovens."],
          ["Acompanhamento","Médico e nutricionista ajustam o plano para cada pessoa."]
        ] },
      { t: "areas", f: "noite", eyebrow: "Ativos que podem fazer parte", titulo: "O que a manipulação **oferece**", itens: [
          ["Creatina","Associada ao treino de resistência, pode aumentar o efeito do treino na força muscular em adultos com mais de 55 anos."],
          ["Proteínas","As proteínas auxiliam na formação dos músculos e ossos."],
          ["Vitamina D","A vitamina D auxilia no funcionamento muscular."],
          ["Bodybalance®","Peptídeos de colágeno estudados junto com o treino de força."]
        ] },
      { t: "texto", f: "gelo", eyebrow: "Na dose de cada um", titulo: "Cada pessoa tem **necessidades diferentes**", corpo: "Idade, rotina, alimentação e medicamentos em uso entram na conta. Por isso a fórmula é feita **sob medida**, a partir da sua prescrição." },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "A Biomagistral **caminha ao seu lado**", corpo: "Chame no WhatsApp e receba uma avaliação personalizada da nossa equipe farmacêutica." }
    ], legenda: `Músculo forte em qualquer idade. 💪

Depois dos 60, a perda de força é comum, e ela pesa no dia a dia. A boa notícia: dá para cuidar! As diretrizes colocam o treino de força e a proteína como base.

E alguns ativos podem fazer parte do cuidado: o consumo diário de creatina associado ao treino de resistência regular pode aumentar o efeito do treinamento de resistência na força muscular em adultos com mais de 55 anos; as proteínas auxiliam na formação dos músculos e ossos; e a vitamina D auxilia no funcionamento muscular.

Na Biomagistral Santaluz, tudo é preparado sob medida, a partir da sua prescrição. Marque aqui alguém que você quer ver forte por muitos anos! 👇

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#saude60mais #forca #envelhecimentosaudavel #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-11-reel", formato: "microreel", data: "11/11 (qua)", hora: "12:15", pilar: "Como sua fórmula é feita", musica: "mixkit-935.mp3", musicaInicio: 10, cenas: [
      { t: "foto", dur: 4, video: "2026-11-11-runway.mp4", foto: "2026-11-11-runway.png", eyebrow: "Biomagistral Santaluz", titulo: `O rigor
**que você não vê**.` },
      { t: "palavra", dur: 2.8, palavra: "PRECISÃO", titulo: "em cada **miligrama**", textura: "2026-11-11-runway.png" },
      { t: "lista", dur: 4.6, eyebrow: "Antes de chegar até você", itens: ["Insumo com laudo de análise","Pesagem em balança calibrada","Conferência farmacêutica","Controle de qualidade"] },
      { t: "foto", dur: 3.4, video: "2026-11-11-runway.mp4", videoInicio: 5, foto: "2026-11-11-runway.png", titulo: `A Biomagistral
**caminha ao seu lado**.` },
      { t: "final", dur: 4.2, titulo: "**Rigor** em cada fórmula." }
    ], legenda: `Tem uma parte do seu manipulado que você nunca vê: o laboratório. ✨

É lá que cada insumo chega com laudo de análise, cada miligrama é pesado em balança calibrada e cada fórmula passa por conferência farmacêutica e controle de qualidade antes de chegar até você.

Na Biomagistral Santaluz, esse rigor é o padrão. A Biomagistral caminha ao seu lado pela sua saúde.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#farmaciademanipulacao #biomagistral #santaluz #santaluzba #manipulados #qualidade #bastidores` },
  { id: "2026-11-12", capa: "tipo", formato: "carrossel", data: "12/11 (qui)", hora: "19:30", pilar: "Como sua fórmula é feita", slides: [
      { t: "capa", f: "noite", simbolo: "Qc", simboloN: "12 · 11", simboloNome: "Dia Mundial da Qualidade", eyebrow: "Dia Mundial da Qualidade", titulo: `Qualidade
que **se comprova**`, sub: "Os controles por trás de cada fórmula que sai da Biomagistral Santaluz." },
      { t: "texto", f: "gelo", eyebrow: "12 de novembro", titulo: `Qualidade não é promessa:
é **rotina**`, corpo: "Na farmácia de manipulação, a qualidade segue um sistema documentado e monitorado, com controles diários, mensais e anuais." },
      { t: "passos", f: "noite", eyebrow: "Os controles da rotina", titulo: "Todo dia, todo mês, **todo ano**", itens: [
          ["Todo dia","Balanças e instrumentos verificados antes do trabalho."],
          ["Todo mês","Água purificada analisada em testes físico-químicos e microbiológicos."],
          ["A cada dois meses","Uma fórmula analisada em laboratório: teor e uniformidade do ativo."],
          ["Todo ano","Calibração por empresa certificada e autoinspeção completa."]
        ] },
      { t: "anel", f: "gelo", numero: "100%", porcento: 100, legenda: "das fórmulas rastreáveis", eyebrow: "Rastreabilidade", titulo: `Da matéria-prima
**até você**`, corpo: "Lote de cada insumo, quem pesou, quem manipulou e quem aprovou." },
      { t: "texto", f: "noite", eyebrow: "Padrão de rede", titulo: "Uma rede com **padrão de excelência**", corpo: "Como unidade da rede Biomagistral, seguimos protocolos de qualidade compartilhados, com a experiência de quem está no mercado desde 1979." },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "Excelência em **cada detalhe**", corpo: "Chame no WhatsApp e conheça de perto a nossa forma de trabalhar." }
    ], legenda: `Hoje é o Dia Mundial da Qualidade, e aqui ela não é promessa: é rotina. ✨

Balanças verificadas todos os dias. Água purificada analisada todo mês. Uma fórmula analisada em laboratório a cada dois meses. Calibração e autoinspeção todo ano. E 100% das fórmulas rastreáveis, da matéria-prima até você.

Como unidade da rede Biomagistral, no mercado desde 1979, seguimos protocolos de qualidade de uma rede de excelência. 💙

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#diamundialdaqualidade #qualidade #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-13", capa: "arco", formato: "carrossel", data: "13/11 (sex)", hora: "18:30", pilar: "Ativo explicado", slides: [
      { t: "capa", f: "noite", eyebrow: "Ativo explicado", titulo: `Ômega-3: benefícios
que vêm **do mar**`, sub: "O que a ciência mostra e por que a pureza faz toda a diferença." },
      { t: "texto", f: "noite", eyebrow: "O que é", titulo: `Gordura do bem,
**de origem natural**`, corpo: "O ômega-3 vem de peixes de águas frias. Os dois mais importantes são o **EPA e o DHA**, que o corpo produz pouco e precisa receber da alimentação ou de suplementos." },
      { t: "molecula", f: "gelo", molecula: "eicosapentaenoic acid", eyebrow: "A molécula", titulo: "**EPA**", corpo: "Ácido eicosapentaenoico: com o DHA, contribui para o normal funcionamento do coração." },
      { t: "areas", f: "gelo", eyebrow: "O que a ciência mostra", titulo: "Benefícios **estudados**", itens: [
          ["Coração","O EPA e o DHA contribuem para o normal funcionamento do coração."],
          ["Triglicérides","Em doses definidas por médico, estudos mostraram redução em quem tem triglicérides altos."],
          ["Gestação","Uma revisão de 70 estudos associou o ômega-3 a menos partos prematuros (decisão do pré-natal)."],
          ["Forma importa","Triglicerídeo ou etil éster: a forma química muda a absorção."]
        ] },
      { t: "foto", eyebrow: "De origem natural", titulo: `Do mar
para a **sua rotina**`, corpo: "Ômega-3 de alta concentração, na forma triglicerídeo." },
      { t: "palavra", f: "noite", eyebrow: "Nem todo óleo de peixe é igual", palavra: "PUREZA", titulo: `Oxidação e metais pesados
**medidos em laboratório**`, corpo: "Por isso a procedência e o laudo fazem toda a diferença." },
      { t: "lista", f: "gelo", eyebrow: "O padrão Biomagistral", titulo: "O que você **leva para casa**", itens: [
          ["Forma triglicerídeo","A forma natural do óleo de peixe."],
          ["Alta concentração de EPA e DHA","Mais ativo em cada cápsula."],
          ["Laudo de pureza","Matéria-prima analisada e rastreável."]
        ] },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "Pureza que **você sente**", corpo: "Chame no WhatsApp e receba uma avaliação personalizada da nossa equipe farmacêutica." }
    ], legenda: `Ômega-3: benefícios que vêm do mar. 🌊

O EPA e o DHA contribuem para o normal funcionamento do coração. E, em doses definidas por médico, estudos mostraram redução dos triglicérides em quem tem esse índice alto.

Mas nem todo óleo de peixe é igual: oxidação e metais pesados são medidos em laboratório. Na Biomagistral Santaluz, o ômega-3 é de alta concentração de EPA e DHA, na forma triglicerídeo, com laudo e rastreabilidade. Pureza que faz diferença!

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#omega3 #saudedocoracao #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-14", capa: "foto", formato: "carrossel", data: "14/11 (sáb)", hora: "10:00", pilar: "Data", slides: [
      { t: "capa", f: "noite", eyebrow: "Dia Mundial do Diabetes", titulo: `Ao seu lado
**todos os dias**`, sub: "Como a farmácia de manipulação pode apoiar o cuidado de quem convive com o diabetes." },
      { t: "texto", f: "gelo", eyebrow: "Tema de 2026", titulo: "Agir **cedo** faz diferença", corpo: "O tema do Dia Mundial do Diabetes é ação precoce: diagnóstico cedo e redução de risco. Consulta em dia e exames na hora certa são o primeiro passo." },
      { t: "lista", f: "noite", eyebrow: "Como a Biomagistral caminha com você", titulo: "Apoio no **tratamento**", itens: [
          ["Medicamentos sob medida","Com a receita em mãos, preparamos a dose e a forma que o médico prescreveu."],
          ["Vitamina B12","As diretrizes orientam avaliar a B12 em quem usa metformina por muito tempo."],
          ["Nutracêuticos e suplementos","Ativos complementares, quando indicados pelo seu médico."]
        ] },
      { t: "mito", f: "gelo", mito: "Fórmula natural substitui o remédio do diabetes.", verdade: "**Diabetes se trata com acompanhamento médico.** Nenhuma fórmula substitui o tratamento prescrito. A manipulação complementa e facilita a rotina, do jeito que o seu médico orientar." },
      { t: "areas", f: "noite", eyebrow: "Facilidades da manipulação", titulo: "Mais **praticidade** na rotina", itens: [
          ["Dose exata","Sem arredondar para o que existe na prateleira."],
          ["Associações","Mais de um ativo na mesma cápsula, quando prescrito."],
          ["Formas variadas","Cápsula, sachê ou gotas, conforme a sua rotina."],
          ["Entrega grátis","Para toda a Bahia."]
        ] },
      { t: "cta", f: "noite", eyebrow: "Santaluz · BA", titulo: "A Biomagistral **caminha ao seu lado**", corpo: "Chame no WhatsApp e receba uma avaliação personalizada da nossa equipe farmacêutica." }
    ], legenda: `Hoje é o Dia Mundial do Diabetes. 💙

O tema de 2026 é ação precoce: diagnóstico cedo e redução de risco. Consulta em dia e exames na hora certa são o primeiro passo.

E no dia a dia, a Biomagistral Santaluz caminha ao seu lado: medicamentos na dose exata que o seu médico prescreveu, associações na mesma cápsula, formas que combinam com a sua rotina e entrega grátis para toda a Bahia. Lembrando: nenhuma fórmula substitui o tratamento médico; a manipulação complementa e facilita.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada.

📍 Biomagistral Santaluz · Bahia

#diamundialdodiabetes #diabetes #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-04", capa: "arco", formato: "carrossel", data: "04/11 (qua)", hora: "19:30", pilar: "Mito ou verdade", slides: [
      { t: "capa", f: "noite", eyebrow: "Mito ou verdade", titulo: "Queda de cabelo é sempre **falta de vitamina**?", sub: "A resposta curta é não. E a manipulação tem muito a oferecer aos seus fios." },
      { t: "mito", f: "noite", mito: "Toda queda de cabelo é falta de vitamina.", verdade: "**A queda tem várias causas:** genética, hormônios, estresse, emagrecimento rápido e falta de nutrientes. Por isso, o primeiro passo é entender a sua causa com o médico." },
      { t: "foto", eyebrow: "Cuidado sob medida", titulo: `Fios fortes começam
**por dentro**`, corpo: "Ativos na forma mais estudada e na dose definida para você." },
      { t: "areas", f: "gelo", eyebrow: "O que a manipulação oferece", titulo: "Ativos que os estudos **ligam aos fios**", itens: [
          ["Óleo de painço · Keranat®","Rico em miliacina. Num estudo com 65 mulheres, menos fios em fase de queda após 12 semanas."],
          ["Silício orgânico · Exsynutriment®","Na forma ortossilícica, a que os estudos apontam como mais bem absorvida."],
          ["Zinco quelato","O zinco contribui para a manutenção do cabelo, da pele e das unhas."],
          ["Biotina","A biotina contribui para a manutenção do cabelo e da pele."]
        ] },
      { t: "texto", f: "noite", eyebrow: "Tecnologia a favor dos fios", titulo: `Forma certa,
**absorção melhor**`, corpo: "Na manipulação, cada ativo entra na forma mais estudada: **quelatos, óleos em cápsula mole, silício estabilizado**. E sempre na dose definida para você, junto com o que o seu médico prescrever." },
      { t: "lista", f: "gelo", eyebrow: "Antes de começar", titulo: "Três cuidados que **fazem diferença**", itens: [
          ["Entender a causa","A queda tem várias origens: o diagnóstico vem primeiro."],
          ["Respeitar o ciclo do fio","O cabelo cresce devagar: a avaliação se faz em meses."],
          ["Biotina e exames","Em dose alta, pode alterar exames de sangue. Avise o médico e o laboratório."]
        ] },
      { t: "cta", f: "noite", eyebrow: "Biomagistral Santaluz · BA", titulo: "Seus fios merecem **tecnologia de primeira**", corpo: "Chame no WhatsApp: a nossa equipe farmacêutica faz a sua avaliação personalizada." }
    ], legenda: `Queda de cabelo é sempre falta de vitamina? Não! 💆‍♀️

A queda tem várias causas: genética, hormônios, estresse, emagrecimento rápido e falta de nutrientes. Por isso o primeiro passo é entender a sua causa com o médico.

E quando o assunto é cuidado sob medida, a manipulação tem muito a oferecer: óleo de painço rico em miliacina (Keranat®), silício orgânico (Exsynutriment®), zinco quelato e biotina, cada um na forma mais estudada e na dose definida para você.

Na Biomagistral Santaluz, trabalhamos com insumos de primeira linha e rigor em cada etapa da manipulação. Seus fios merecem!

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#quedadecabelo #cabelosaudavel #farmaciademanipulacao #biomagistral #santaluz #santaluzba #manipulados` },
  { id: "2026-11-04-reel", formato: "microreel", data: "04/11 (qua)", hora: "12:15", pilar: "Cabelo", musica: "mixkit-801.mp3", musicaInicio: 15, fotoArquivo: "2026-11-04.png", cenas: [
      { t: "foto", dur: 3.2, foto: "2026-11-04.png", eyebrow: "Biomagistral Santaluz", titulo: `Seu cabelo está
te **dando sinais**?` },
      { t: "lista", dur: 4.6, eyebrow: "Sinais que merecem avaliação", itens: ["Mais fios no travesseiro e no ralo","Fios mais finos e sem brilho","Couro cabeludo mais aparente"] },
      { t: "palavra", dur: 2.8, palavra: "CAUSA", titulo: "primeiro, **a investigação**", claro: true },
      { t: "molecula", dur: 3.4, molecula: "biotin", titulo: "**Biotina**", sub: "contribui para a manutenção do cabelo e da pele" },
      { t: "texto", dur: 3.4, titulo: `Tecnologia de **primeira**
para os seus fios.`, corpo: "Óleo de painço, silício orgânico, zinco quelato e mais." },
      { t: "final", dur: 4.2, titulo: "A Biomagistral está **pronta para você**." }
    ], legenda: `Seu cabelo está te dando sinais? Mais fios no travesseiro, fios mais finos, couro cabeludo mais aparente: tudo isso merece avaliação. ✨

A causa se investiga, e o cuidado se faz sob medida. Na Biomagistral Santaluz, você encontra tecnologia de primeira para os seus fios, com insumos de qualidade e rigor de manipulação.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#cabelo #quedadecabelo #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-05", capa: "foto", formato: "carrossel", data: "05/11 (qui)", hora: "19:30", pilar: "Ativo explicado", slides: [
      { t: "capa", f: "noite", eyebrow: "Ativo explicado", titulo: `Creatina:
**qualidade** faz diferença`, sub: "Uma das substâncias mais estudadas da nutrição esportiva. E nem toda creatina é igual." },
      { t: "texto", f: "gelo", eyebrow: "O que é", titulo: `Energia rápida
para o **músculo**`, corpo: "O corpo produz creatina e também a obtém da carne e do peixe. No músculo, ela vira uma **reserva de energia rápida** para esforços curtos e intensos." },
      { t: "molecula", f: "noite", molecula: "creatine", eyebrow: "A molécula", titulo: "**Creatina**", corpo: "Formada no corpo a partir de três aminoácidos: arginina, glicina e metionina." },
      { t: "lista", f: "noite", eyebrow: "O que a ciência reconhece", titulo: "O que os estudos **mostram**", itens: [
          ["Desempenho","A creatina auxilia no aumento do desempenho físico durante exercícios repetidos de curta duração e alta intensidade."],
          ["Força depois dos 55","O consumo diário de creatina associado ao treino de resistência regular pode aumentar o efeito do treinamento de resistência na força muscular em adultos com mais de 55 anos."],
          ["Das mais estudadas","A forma monohidratada é a que reúne mais estudos no mundo."]
        ] },
      { t: "compara", f: "gelo", eyebrow: "Duas creatinas de primeira linha", titulo: "Qual combina **com você**?", cab: ["Monohidratada de alta pureza","Clonapure®"], linhas: [
          ["A forma com mais estudos no mundo","Complexo de creatina com tecnologia exclusiva do fabricante"],
          ["Cada lote analisado: teor e contaminantes","Alta dispersão, segundo o fabricante"],
          ["Pó fino: sachê e cápsula","Vai bem em goma, sachê e cápsula"]
        ], nota: "Na Biomagistral Santaluz, a escolha é feita com você, a partir da sua prescrição." },
      { t: "foto", eyebrow: "Para quem treina e para quem quer força", titulo: `Energia rápida,
**qualidade de procedência**`, corpo: "Creatina de primeira linha, com laudo de análise em cada lote." },
      { t: "mito", f: "noite", mito: "Creatina é só para quem treina pesado.", verdade: "**Os estudos também incluem adultos acima dos 55 anos**, combinando creatina e treino de força. A indicação depende de cada pessoa: converse com o seu médico ou nutricionista." },
      { t: "lista", f: "gelo", eyebrow: "Bom saber", titulo: "Antes de **começar**", itens: [
          ["Avise nos exames","A creatina pode elevar a creatinina no exame de sangue, sem que isso indique doença nos rins."],
          ["Quem não deve consumir","Gestantes, lactantes e crianças."],
          ["Procedência importa","Laudo de análise em cada lote faz toda a diferença."]
        ] },
      { t: "cta", f: "noite", eyebrow: "Biomagistral Santaluz · BA", titulo: "Creatina de **primeira linha**, do jeito certo", corpo: "Chame no WhatsApp e receba uma avaliação personalizada da nossa equipe farmacêutica." }
    ], legenda: `Creatina: qualidade faz diferença. 💪

Ela é uma das substâncias mais estudadas da nutrição esportiva: a creatina auxilia no aumento do desempenho físico durante exercícios repetidos de curta duração e alta intensidade. E os estudos também incluem adultos acima dos 55 anos, combinando creatina e treino de força.

Mas nem toda creatina é igual. Na Biomagistral Santaluz, você encontra duas opções de primeira linha: a creatina monohidratada de alta pureza, a forma com mais estudos no mundo, e o Clonapure®, um complexo de creatina com tecnologia exclusiva do fabricante. A escolha é feita com você, a partir da sua prescrição.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#creatina #performance #treino #farmaciademanipulacao #biomagistral #santaluz #santaluzba` },
  { id: "2026-11-06", capa: "arco", formato: "carrossel", data: "06/11 (sex)", hora: "18:30", pilar: "Ativo explicado", slides: [
      { t: "capa", f: "noite", eyebrow: "Ativo explicado", titulo: "Vontade de **doce**?", sub: "Os ativos que a ciência estuda no apetite e as formas em que a manipulação pode prepará-los." },
      { t: "texto", f: "noite", eyebrow: "Antes de tudo", titulo: "A vontade de doce tem **muitas causas**", corpo: "Sono, estresse, rotina, alimentação e até hábitos de família. Por isso, a escolha de qualquer ativo começa por uma **avaliação individual**." },
      { t: "ficha", f: "gelo", ativo: "Gymnema sylvestre", tipoAtivo: "Planta indiana", linhas: [
          ["O que tem","Ácidos gimnêmicos, que diminuem por um tempo a percepção do sabor doce na língua."],
          ["O que um estudo mostrou","Com 56 adultos: depois de uma pastilha com Gymnema, comeram em média **menos chocolate** que com placebo."],
          ["Detalhe importante","O efeito depende do contato com a língua. Por isso a forma de pastilha faz sentido."]
        ] },
      { t: "ficha", f: "noite", ativo: "Picolinato de cromo", tipoAtivo: "Mineral quelato", linhas: [
          ["O que diz a Anvisa","O cromo auxilia no metabolismo de proteínas, carboidratos e gorduras."],
          ["O que um estudo mostrou","Em mulheres com desejo por carboidratos, o grupo do cromo comeu menos que o grupo placebo (estudo pequeno, 8 semanas)."]
        ] },
      { t: "ficha", f: "gelo", ativo: "5-HTP", tipoAtivo: "Griffonia simplicifolia", linhas: [
          ["O que é","Precursor da serotonina, substância ligada à saciedade e ao humor."],
          ["O que os estudos mostraram","Mais saciedade em pessoas com obesidade, em estudos pequenos."],
          ["Atenção","Exige avaliação, principalmente para quem usa antidepressivo."]
        ] },
      { t: "areas", f: "noite", eyebrow: "Do seu jeito", titulo: "Formas que a manipulação **prepara**", itens: [
          ["Pastilha","Dissolve na boca: contato direto com a língua."],
          ["Goma","Prática para levar na bolsa."],
          ["Chocolate funcional","Base sem açúcar, adoçada com stévia."],
          ["Cápsula","Discreta e fácil para a rotina."]
        ] },
      { t: "cta", f: "noite", eyebrow: "Biomagistral Santaluz · BA", titulo: "Sua fórmula, **no formato da sua rotina**", corpo: "Chame no WhatsApp para uma avaliação personalizada da nossa equipe farmacêutica." }
    ], legenda: `Vontade de doce? 🍫

Ela tem muitas causas: sono, estresse, rotina, alimentação. Por isso, a escolha de qualquer ativo começa por uma avaliação individual.

A ciência estuda alguns ativos no apetite: a Gymnema sylvestre, que diminui por um tempo a percepção do sabor doce na língua; o picolinato de cromo (o cromo auxilia no metabolismo de proteínas, carboidratos e gorduras); e o 5-HTP, precursor da serotonina, que exige avaliação, principalmente para quem usa antidepressivo.

E o melhor: na manipulação, a sua fórmula pode ser preparada no formato da sua rotina, em pastilha, goma, chocolate funcional sem açúcar ou cápsula.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#vontadededoce #farmaciademanipulacao #biomagistral #santaluz #santaluzba #manipulados #bemestar` },
  { id: "2026-11-06-reel", formato: "microreel", origem: "claude-design", pedido: "conteudo/design/2026-11-06-reel.txt", data: "06/11 (sex)", hora: "12:15", pilar: "Como sua fórmula é feita", legenda: `Excelência não se vê. Ela se comprova. ✨

Na Biomagistral Santaluz, cada lote de insumo chega com laudo de análise, cada pesagem é registrada e conferida e cada fórmula passa pelo controle de qualidade antes de ser liberada.

É esse rigor que faz da Biomagistral a farmácia de manipulação de excelência da região.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#farmaciademanipulacao #biomagistral #santaluz #santaluzba #manipulados #qualidade #excelencia` },
  { id: "2026-11-02-reel", formato: "microreel", data: "02/11 (seg)", hora: "12:15", pilar: "Como sua fórmula é feita", musica: "mixkit-645.mp3", musicaInicio: 20, fotoArquivo: "2026-11-02.png", cenas: [
      { t: "foto", dur: 3.4, foto: "2026-11-02.png", eyebrow: "Biomagistral Santaluz", titulo: `Toda fórmula começa
numa **receita**.` },
      { t: "palavra", dur: 2.8, palavra: "RIGOR", titulo: "em cada **etapa**", textura: "2026-11-02.png" },
      { t: "lista", dur: 4.6, eyebrow: "No caminho", itens: ["Avaliação farmacêutica","Insumo com laudo de análise","Pesagem conferida","Controle de qualidade"] },
      { t: "texto", dur: 2.8, titulo: `Feita
**só para você**.` },
      { t: "final", dur: 4.2, titulo: "Sua fórmula, **do jeito certo**." }
    ], legenda: `Toda fórmula começa numa receita e termina na sua mão. No meio do caminho: avaliação farmacêutica, insumo com laudo de análise, pesagem conferida e controle de qualidade. ✨

É assim que a Biomagistral Santaluz trabalha: rigor em cada etapa para entregar exatamente o que foi prescrito para você.

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#farmaciademanipulacao #biomagistral #santaluz #santaluzba #manipulados #qualidade` },
  { id: "2026-11-01", capa: "foto", formato: "carrossel", data: "01/11 (dom)", hora: "19:00", pilar: "Ativo explicado", slides: [
      { t: "capa", f: "noite", eyebrow: "Biomagistral Santaluz · BA", titulo: `Novembro chegou.
Cuide de **você**.`, sub: "Tudo o que a sua farmácia de manipulação pode fazer pela sua saúde." },
      { t: "texto", f: "gelo", eyebrow: "Por que manipular", titulo: `Cada pessoa é **única**.
A sua fórmula também.`, corpo: "Na manipulação, a dose, a combinação e a forma são feitas sob medida, a partir da sua prescrição: **cápsula, sachê, goma, creme ou gotas**. Nada de adaptar você ao que está na prateleira." },
      { t: "areas", f: "noite", eyebrow: "Onde caminhamos com você", titulo: "Cuidado completo, **de dentro para fora**", itens: [
          ["Cabelo e unhas","Keranat®, Exsynutriment® e zinco quelato"],
          ["Pele e beleza","Verisol® e dermocosméticos sob medida"],
          ["Sono e bem-estar","Prosleep® e magnésio em várias formas"],
          ["Energia e performance","Clonapure® e CoQ10 em fitossoma"],
          ["Metabolismo","Morosil®, cromo quelato e fibras"],
          ["Mulher e homem","Ferro bisglicinato, vitamina D3 + K2"]
        ] },
      { t: "lista", f: "gelo", eyebrow: "Padrão Biomagistral", titulo: "Qualidade que começa na **matéria-prima**", itens: [
          ["Insumos de primeira linha","Fornecedores certificados e laudo de análise em cada lote."],
          ["Formas avançadas","Quelatos, fitossomas e nanoemulsões, estudados para melhor absorção."],
          ["Rigor de manipulação","Conferência em cada etapa, do pedido até a entrega."]
        ] },
      { t: "quiz", f: "noite", eyebrow: "Sua vez", titulo: "Por onde você quer **começar** a se cuidar em novembro?", opcoes: ["Cabelo e pele","Sono e energia","Metabolismo","Saúde da mulher ou do homem"], prox: "Responda nos comentários: A, B, C ou D" },
      { t: "cta", f: "noite", eyebrow: "Sua melhor parceira", titulo: "A Biomagistral **caminha ao seu lado**", corpo: "Chame no WhatsApp e receba uma avaliação personalizada da nossa equipe farmacêutica." }
    ], legenda: `Novembro chegou e, com ele, um convite: colocar você no centro do cuidado. 💙

Na Biomagistral Santaluz, cada fórmula é feita sob medida, a partir da sua prescrição, na dose e na forma que combinam com a sua rotina: cápsula, sachê, goma, creme ou gotas.

Cabelo e unhas, pele, sono, energia, metabolismo, saúde da mulher e do homem: trabalhamos com insumos de primeira linha, como Keranat®, Verisol®, Prosleep®, Clonapure® e Morosil®, sempre com laudo de análise e rigor em cada etapa da manipulação.

E você, por onde quer começar? Conta pra gente nos comentários! 👇

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#farmaciademanipulacao #biomagistral #santaluz #santaluzba #manipulados #saudepersonalizada #bemestar` },
  { id: "2026-11-03", capa: "moldura", formato: "carrossel", data: "03/11 (ter)", hora: "19:30", pilar: "Ativo explicado", slides: [
      { t: "capa", f: "noite", eyebrow: "Ativo explicado", titulo: `Vitamina D:
a sua dose é **só sua**`, sub: "Os benefícios que a ciência reconhece e por que não existe dose igual para todo mundo." },
      { t: "areas", f: "gelo", eyebrow: "O que a ciência reconhece", titulo: "Seis funções da **vitamina D**", itens: [
          ["Ossos e dentes","Auxilia na formação de ossos e dentes."],
          ["Cálcio e fósforo","Auxilia na absorção de cálcio e fósforo."],
          ["Imunidade","Auxilia no funcionamento do sistema imune."],
          ["Músculos","Auxilia no funcionamento muscular."],
          ["Cálcio no sangue","Auxilia na manutenção dos níveis de cálcio no sangue."],
          ["Renovação celular","Auxilia no processo de divisão celular."]
        ] },
      { t: "molecula", f: "noite", molecula: "cholecalciferol", eyebrow: "A molécula", titulo: `Colecalciferol:
a **vitamina D3**`, corpo: "A mesma forma que a pele produz quando recebe o sol." },
      { t: "mito", f: "noite", mito: "Quanto mais vitamina D, melhor.", verdade: "**Pouca faz falta, e o excesso faz mal.** Em excesso, a vitamina D eleva o cálcio no sangue e pode causar náusea, fraqueza e até pedras nos rins. Por isso a dose é individual." },
      { t: "palavra", f: "noite", eyebrow: "Dose individualizada", palavra: "SÓ SUA", titulo: `Pouca faz falta.
**O excesso faz mal.**`, corpo: "Quem define a dose é o seu médico. A manipulação prepara **exatamente** essa dose." },
      { t: "compara", f: "noite", eyebrow: "Parecidas, mas não iguais", titulo: "Vitamina **D2** × **D3**", cab: ["Vitamina D2","Vitamina D3"], linhas: [
          ["Vem de fungos e leveduras","É a mesma forma que a pele produz ao sol"],
          ["Nos estudos, elevou menos o nível no sangue","Nos estudos, elevou mais o nível no sangue"]
        ], nota: "Fontes: Tripkovic et al., Am J Clin Nutr, 2012; van den Heuvel et al., Adv Nutr, 2024." },
      { t: "cola", f: "gelo", titulo: "Vitamina D **em quatro pontos**", itens: ["Auxilia em ossos, músculos e imunidade","Pouca faz falta; o excesso faz mal","A dose certa é individual","Manipulada, sai na dose exata da sua receita"] },
      { t: "cta", f: "noite", eyebrow: "Vitamina D sob medida", titulo: "Na **dose que você precisa**", corpo: "Mande a sua receita no WhatsApp. A Biomagistral Santaluz prepara a sua fórmula com insumo de qualidade e rigor em cada etapa." }
    ], legenda: `Vitamina D não é tudo igual, e a sua dose também não. ☀️

A ciência reconhece que a vitamina D auxilia na formação de ossos e dentes, na absorção de cálcio e fósforo, no funcionamento do sistema imune e muscular, na manutenção dos níveis de cálcio no sangue e no processo de divisão celular.

Mas atenção: pouca faz falta, e o excesso faz mal. A necessidade muda de pessoa para pessoa, por isso quem define a dose é o seu médico. E é aí que a manipulação faz diferença: a Biomagistral Santaluz prepara exatamente a dose da sua receita, com insumo de qualidade e conferência em cada etapa.

Salve para consultar e mande para quem vive falando de vitamina D. 💛

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entrega grátis para toda a Bahia.

📍 Biomagistral Santaluz · Bahia

#vitaminad #farmaciademanipulacao #biomagistral #santaluz #santaluzba #saudepersonalizada #manipulados` },
  { id: "2026-11-07", capa: "foto", formato: "carrossel", data: "07/11 (sáb)", hora: "10:00", pilar: "Novembro Azul", slides: [
      { t: "capa", f: "noite", eyebrow: "Novembro Azul", titulo: `Homem também
**se cuida**`, sub: "Os números mostram que eles vão menos ao médico. A Biomagistral caminha ao seu lado para mudar isso." },
      { t: "barras", f: "gelo", eyebrow: "O que os números mostram", titulo: `Quem foi ao médico
**no último ano**`, max: 100, itens: [
          ["Mulheres",82.3,"82,3%"],
          ["Homens",69.4,"69,4%",true]
        ], nota: "Fonte: IBGE, Pesquisa Nacional de Saúde 2019." },
      { t: "numero", f: "noite", eyebrow: "E isso pesa", numero: "6,6", unidade: "anos a menos de vida", regua: 44, titulo: "é a diferença entre **homens e mulheres** no Brasil", corpo: "Expectativa de vida de 73,3 anos para eles e 79,9 para elas.", nota: "Fonte: IBGE, Tábuas de Mortalidade 2024." },
      { t: "texto", f: "gelo", eyebrow: "O cuidado começa pela consulta", titulo: "Prevenir é **coisa de homem**", corpo: "Consulta de rotina, exames na hora certa e bons hábitos fazem diferença em qualquer idade. No Novembro Azul, o convite é simples: **marque a sua consulta** e converse com o seu médico sobre o que é indicado para você." },
      { t: "lista", f: "noite", eyebrow: "Do seu lado", titulo: "Como a Biomagistral **caminha com você**", itens: [
          ["Fórmulas na dose da sua receita","Do jeito que o seu médico prescreveu, sem arredondar."],
          ["Atendimento farmacêutico","Tire as suas dúvidas com a nossa equipe pelo WhatsApp."],
          ["Entrega grátis para toda a Bahia","A sua fórmula chega até você."]
        ] },
      { t: "cta", f: "noite", eyebrow: "Novembro Azul", titulo: "Ao seu lado **pela sua saúde**", corpo: "Precisa manipular uma receita? Chame no WhatsApp para uma avaliação personalizada." }
    ], legenda: `Homem também se cuida. 💙

Em 2019, 69,4% dos homens foram ao médico ao longo do ano; entre as mulheres, 82,3% (IBGE). E a expectativa de vida deles é 6,6 anos menor que a delas.

No Novembro Azul, o convite é simples: marque a sua consulta, faça os exames na hora certa e converse com o seu médico sobre o que é indicado para você.

E conte com a Biomagistral Santaluz nessa caminhada: fórmulas na dose exata da sua receita, atendimento farmacêutico e entrega grátis para toda a Bahia.

Marque aqui um homem que precisa ver este post. 👇

Chame no WhatsApp (75) 99878-6349 para uma avaliação personalizada.

📍 Biomagistral Santaluz · Bahia

#novembroazul #saudedohomem #biomagistral #santaluz #santaluzba #farmaciademanipulacao #cuidese` },
  { id: "2026-11-02", capa: "arco", formato: "carrossel", data: "02/11 (seg)", hora: "19:30", pilar: "Como sua fórmula é feita", assinatura: "mostrador", serie: "Como sua fórmula é feita", serieN: 1, slides: [
      { t: "capa", f: "noite", eyebrow: "Por trás do balcão", titulo: `Da sua receita
até a **cápsula**`, sub: "O caminho que a sua fórmula faz no laboratório, e por que nenhuma etapa pode ser pulada.", lote: "Protocolo de manipulação · 6 etapas" },
      { t: "quiz", f: "gelo", titulo: "Quantas vezes a sua fórmula é **conferida** antes de chegar até você?", opcoes: ["Uma vez, na hora de pesar","Duas: na pesagem e no rótulo","Várias, do começo ao fim"] },
      { t: "resposta", f: "noite", titulo: "**Várias**, do começo ao fim", opcoes: ["Uma vez, na hora de pesar","Duas: na pesagem e no rótulo","Várias, do começo ao fim"], certa: 2, corpo: "Na manipulação, conferir não é uma etapa: é um hábito. Acontece antes, durante e depois do preparo." },
      { t: "passos", f: "gelo", eyebrow: "O caminho da fórmula · 1 a 3", titulo: "Antes de **manipular**", itens: [
          ["Avaliação da receita","O farmacêutico confere dose, forma e compatibilidade dos ativos."],
          ["Matéria-prima com laudo","Cada insumo chega com o certificado de análise do fornecedor."],
          ["Pesagem registrada","Balança calibrada e conferência de cada pesagem."]
        ], prox: "Continua" },
      { t: "passos", f: "noite", eyebrow: "O caminho da fórmula · 4 a 6", titulo: "Até chegar **na sua mão**", inicio: 4, itens: [
          ["Manipulação","A técnica certa para cada forma: cápsula, creme, sachê."],
          ["Controle de qualidade","Peso, aspecto e uniformidade conferidos antes de liberar."],
          ["Rótulo e entrega","Seu nome, a fórmula e as orientações de uso, até a sua porta."]
        ] },
      { t: "numero", f: "gelo", eyebrow: "O que muda para você", numero: "1:1", unidade: "uma fórmula para cada pessoa", regua: 50, titulo: "Feita para você, **não para a prateleira**", corpo: "Dose, combinação e forma seguem a sua prescrição. Por isso duas pessoas com o mesmo objetivo podem levar fórmulas diferentes." },
      { t: "mito", f: "noite", mito: "Manipulado é mais fraco.", verdade: "**Quem define a força é a dose prescrita, não o lugar onde a fórmula é feita.** Com insumo de qualidade e conferência em cada etapa, a fórmula entrega exatamente o que foi prescrito." },
      { t: "cola", f: "noite", titulo: "O que garante uma **boa fórmula**", itens: ["Receita avaliada por farmacêutico","Insumos com laudo de análise","Pesagem registrada e conferida","Controle de qualidade antes de liberar","Orientação clara no rótulo"] },
      { t: "cta", f: "noite", eyebrow: "Sua fórmula, do jeito certo", titulo: "Tem uma receita para **manipular**?", corpo: "Mande a foto da receita no WhatsApp. A Biomagistral Santaluz caminha ao seu lado, com rigor em cada etapa." }
    ], legenda: `Você já parou para pensar no caminho que a sua fórmula faz antes de chegar até você? 🔬

Na manipulação, cada fórmula é única. Ela começa na avaliação da sua receita pelo farmacêutico e passa por matéria-prima com laudo de análise, pesagem registrada e conferida, manipulação com a técnica certa para cada forma e controle de qualidade antes de ser liberada.

É esse cuidado, etapa por etapa, que garante que você receba exatamente o que foi prescrito. Sem atalhos.

Tem uma receita para manipular? Chame a gente no WhatsApp (75) 99878-6349 para uma avaliação personalizada. Entregamos em toda a Bahia, com entrega grátis. 💙

Salve este post para consultar depois e mande para quem usa fórmula manipulada.

📍 Santaluz, Bahia

#farmaciademanipulacao #manipulados #formulamanipulada #santaluz #santaluzba #biomagistral #saudepersonalizada` },
];
