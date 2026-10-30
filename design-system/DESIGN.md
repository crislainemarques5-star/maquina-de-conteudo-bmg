# Design system: Biomagistral Santaluz (Instagram)

Base: o manual de marca (`marca/MARCA.md`). Norte da gestão: sofisticação, elegância, tecnologia, farmácia de excelência.
**Identidade própria** (não se parece com nenhum outro perfil). Por isso não usamos título em caixa alta
200/800, faixa dourada atrás da palavra, feixe de luz nem cúpula clara, que são marcas de outros perfis.

## Cores
| Papel | Cor |
|---|---|
| Fundo "noite" (principal) | `#0F1C2C` · apoio `#142639` |
| Fundo "gelo" (claro) | `#F3F5F8` · `#E7ECF2` · cartões `#FFFFFF` |
| Dourado (degradê metálico, claro → escuro → claro) | `#F4F2BE` → `#A07F45` → `#F4F2BE` |
| Texto em fundo claro | `#0F1C2C` · secundário `#4F5D70` |
| Verde só para WhatsApp e "verdade/certo" | `#25A35A` |

## Tipografia (só Poppins, como o manual)
- Título: Poppins **300** com a palavra-chave em **700** (em fundo noite, a palavra-chave ganha o dourado). Caixa normal, nunca tudo em maiúsculas.
- Eyebrow e etiquetas técnicas: Poppins 500 a 600, maiúsculas espaçadas, pequenas.
- Texto corrido: Poppins 400, de 31 a 35 px no slide de 1080.
- `**palavra**` = destaque · `==palavra==` = sublinhado dourado fino.

## Linguagem visual
- **Grafismo do manual:** o ícone gigante, cortado na borda, tom sobre tom (`marca/logo/grafismo-icone-branco.png` como máscara).
- **Laboratório de precisão:** grade fina de fundo, régua graduada, etiqueta de protocolo ("Protocolo de manipulação · 6 etapas"), linha do tempo de passos.
- **Assinaturas que atravessam o carrossel** (alternar conforme o tema):
  - **Cápsula** no rodapé: grânulos dourados entram a cada slide e ela fecha no último.
  - **Borboleta**: o ícone dourado (recorte do manual) se revela em giro e fica inteiro no último slide.
- **Interatividade:** quiz numa tela e resposta na seguinte; "arraste"; slide final "salve para consultar".

## Logo
- Só recortes de `marca/logo/` (nunca recriado). Branco ou dourado no noite, azul no gelo.
- Capa: logo horizontal no canto superior esquerdo. Slides de dentro: só o ícone, no mesmo canto. Slide final: logo centralizado.

## Impacto (pedido da gestão em 29/10: "saia desse básico")
- **Hierarquia forte:** título de 88 px (capa de 124 px), palavra-chave em 800 e o resto em 300; etiqueta de 23 px; título de cartão e de lista de 37 a 46 px, bem maior que a descrição.
- **Infográficos:** barras animadas, anel de porcentagem, pictograma "X em 100", bento grid, palavra gigante ocupando a largura.
- **Câmera:** zoom out que revela (palavra, número, anel, barras, pictograma, bento), zoom lento na foto, foto com cartão de vidro.
- **Microreels:** transição de zoom entre as cenas (a câmera atravessa), cenas de foto com zoom, palavra gigante, barras, anel e pictograma; títulos de 100 a 132 px.
- Referências e técnicas em `design-system/REFERENCIAS-MICROREELS.md`.

## Slides (motor/carrossel.mjs)
`capa · texto · lista · numero · mito · passos · ficha (ativo) · quiz · resposta · compara · cola · cta`.
O último slide é sempre o `cta`: WhatsApp (75) 99878-6349, "avaliação personalizada", "Entrega grátis para toda a Bahia" e o aviso fixo.
