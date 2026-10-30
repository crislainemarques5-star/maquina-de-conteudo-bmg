# Radar rotativo de farmácias magistrais

**Para quê:** todo post novo parte de um formato **já validado** em alcance, engajamento e pedidos de compra, em vez de
ideia solta. **Rotativo:** cada coleta lê uma fatia diferente de cada grupo, para os modelos virem de lugares variados.
Assim nenhum post vira cópia de um mesmo perfil ou de um mesmo lugar.

## Como funciona
- `radar/perfis.json`: cerca de 155 perfis em 4 grupos.
  - Bahia (rede Biomagistral e concorrentes).
  - Nordeste.
  - Brasil (grandes referências e redes).
  - Internacional (farmácias de manipulação e marcas premium de suplementos, como referência de estética).
- Cada coleta lê 6 + 6 + 6 + 5 perfis, mais a nossa conta. O cursor de cada grupo fica em `radar/rotacao.json`.
- Perfil que não existe mais sai sozinho do rodízio. Para incluir perfis novos, acrescente no grupo certo.
- `motor/radar-ig.mjs` abre cada perfil como uma pessoa faria e lê curtidas, comentários, visualizações e legendas.
- **Intenção de compra:** nos 2 posts mais fortes de cada perfil, conta quantos comentários pedem preço, compra ou
  contato. Guarda só a contagem, nunca o texto de terceiros.
- `motor/radar-modelos.mjs` junta 120 dias de coletas e ranqueia os formatos.
  - **Força** = curtidas ÷ mediana do próprio perfil. Fora da curva é 1,5× ou mais.
  - **Nota** = força × peso dos comentários × peso dos pedidos de compra.
  - Sai em `radar/MODELOS.md`, que é o que você lê, e em `radar/modelos.json`.
- **Proibidos para farmácia** são descartados mesmo que tenham bombado: sorteio, preço, promoção, antes e depois e depoimento.

## Agenda
Segunda, quarta e sexta às 8h, pela tarefa "Maquina BMG - Radar" do Agendador de Tarefas do Windows.
- Para verificar: `node motor/agendar-radar.mjs --status`.
- Antes de cada post: `node motor/radar.mjs --se-velho`, que só coleta se a última coleta tiver 2 dias ou mais.
- Log da última coleta: `radar/ultimo.log`.

## Regras
- **Só leitura:** nunca seguir, curtir, comentar, salvar nem abrir stories. A sessão é a do Instagram pessoal do
  operador, na janela própria do radar.
- Do modelo se copia a **estrutura**: gancho, ordem dos slides, tipo de prova e chamada. Nunca o texto, a arte, a foto ou a música.
- Não repita a fonte dos últimos 10 posts (`conteudo/modelos-usados.json`) e alterne os grupos.
- Se o Instagram pedir verificação ou bloquear, pare o radar e avise o operador. Não insista.

## Registro de uso
Acrescente em `conteudo/modelos-usados.json` a cada post: `{ "post": "<id>", "fonte": "<perfil>", "grupo": "...", "formato": "...", "link": "..." }`.
