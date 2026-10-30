# Checklist de qualidade (cada slide, cada cena)

Abra o PNG e confira. Um item reprovado = corrigir e gerar de novo.

## Marca e regras
- [ ] Logo é o recorte de `marca/logo/` (o motor põe); nada redesenhado, nada de logo gerado pela IA na foto.
- [ ] "Santaluz · BA" aparece (etiqueta do topo, slide final) e na legenda. Nunca "Unidade Santaluz".
- [ ] Nenhuma menção a outras empresas, profissionais ou perfis pessoais.
- [ ] Sem preço, promoção, sorteio, depoimento, antes e depois, promessa ("cura", "garante", "elimina").
- [ ] Alegação = frase oficial (IN 28) ou estudo citado; nada de dose/posologia/"tome".
- [ ] Aviso legal só no último slide; CTA do WhatsApp (75) 99878-6349 e "Entrega grátis para toda a Bahia".

## Leitura e hierarquia
- [ ] Contraste alto: texto claro só no azul, texto escuro só no claro; nada de texto sobre área clara da foto.
- [ ] Título grande e curto (1 a 2 linhas), 1 palavra-chave em destaque; apoio bem menor que o título.
- [ ] Nenhum texto cortado, encostado na borda ou sobreposto à assinatura (mostrador) ou ao logo.
- [ ] Português correto, acentos e cedilhas visíveis (nada cortado em cima ou embaixo).
- [ ] Tempo de leitura nos microreels: cena com tempo ≥ caracteres ÷ 15 + 0,5 s.

## Visual
- [ ] Fundo de bioquímica (fórmula estrutural) sutil; nunca rede de pontos, estrelas ou constelação.
- [ ] Nenhuma ilustração de cápsula, frasco ou pílula.
- [ ] Ao menos um infográfico no post; animações em tudo, elegantes, sem poluir (o `--animado` cuida).
- [ ] Foto: pessoa bonita e alegre, mãos e rosto perfeitos, sem texto/marca, luxo e luz dourada.
- [ ] A capa difere das capas dos posts vizinhos (foto · arco · moldura · tipo) e funciona no recorte 3:4 do feed.

## Antes de entregar
- [ ] `node motor/previa.mjs <id> --abrir` aberto e conferido por você slide a slide.
- [ ] Legenda revisada (gancho, benefício, prova, CTA, local, hashtags).
- [ ] Registro do modelo usado em `conteudo/modelos-usados.json`.
