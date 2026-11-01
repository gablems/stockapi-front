# Product

## Platform

web

## Users
- Aluna desenvolvedora (Gabriela Lemes) apresentando o trabalho e defendendo a implementação perante o avaliador.
- Professor/avaliador da disciplina de Front-End inspecionando código, estrutura de componentes, responsividade e integração com API.
- Usuário final simulado (atendente/lojista) consultando categorias, produtos e clientes, além de registrar e visualizar pedidos.

## Product Purpose
Aplicação web responsiva para controle de estoque e gestão de pedidos de uma loja comercial, cumprindo a avaliação prática de Front-End do 4º Bimestre via consumo dinâmico da API pública de referência.

## Positioning
Interface direta, intuitiva e desprovida de artifícios desnecessários. Código enxuto, transparente e compreensível à primeira vista ("bater o olho e saber dizer o que é"), priorizando facilidade de manutenção e explicação técnica sobre complexidades de engenharia.

## Operating Context
- Avaliação acadêmica no contexto do IFRO Campus Vilhena.
- Execução em ambiente web moderno via Next.js (App Router).
- Ambientes de visualização: telas móveis (largura até 768px) e desktops (largura a partir de 769px).
- Comunicação de rede via requisições Fetch diretas à API remota `https://stock.dev.vilhena.ifro.edu.br/api`.

## Capabilities and Constraints
- Rotas de API consumidas dinamicamente: `/categorias`, `/produtos`, `/clientes`, `/pedidos` e `/itens_pedido`.
- Páginas obrigatórias: Home (apresentando identificação da desenvolvedora), Listar Pedidos, Criar Pedido (com seleção de cliente, produtos e quantidades), além das páginas de consulta de Produtos, Clientes e Categorias.
- Cabeçalho responsivo com menu de navegação funcional para todas as seções (modo hambúrguer em dispositivos móveis).
- Restrição obrigatória: código e CSS o mais simples e diretos possíveis, atendendo estritamente ao escopo exigido.
- Restrição obrigatória: ZERO comentários no código, em qualquer parte do projeto.

## Brand Commitments
- Nome: StockApi.
- Identidade: Gabriela Lemes (Desenvolvedora Front-End • Trabalho Individual).
- Símbolo: Caixa de encomenda (📦).

## Evidence on Hand
- Especificação completa e critérios de avaliação definidos em `guia.txt`.
- Aplicação de referência funcional: `https://stock.dev.vilhena.ifro.edu.br/`.
- API REST pública de referência: `https://stock.dev.vilhena.ifro.edu.br/api`.
- Código-fonte já estruturado em Next.js em `stockapi/src/`.

## Product Principles
1. **Simplicidade e Legibilidade:** O código e a interface devem ser descomplicados para que qualquer linha ou estilo possa ser imediatamente explicado e compreendido.
2. **Aderência Estrita às Regras:** Cumprimento rigoroso de todos os itens de `guia.txt`, especialmente ausência de comentários e cobertura dos endpoints obrigatórios.
3. **Responsividade Fluida:** Adaptação natural entre telas mobile (<= 768px) e desktop (>= 769px) sem quebras de layout.
4. **Fidelidade aos Dados da API:** Interface sempre orientada aos dados reais retornados pelos endpoints, com estados adequados de carregamento e resposta.

## Accessibility & Inclusion
- Marcação semântica com foco em legibilidade de dados tabulares e de formulários.
- Rótulos e atributos acessíveis (`aria-label`) em controles interativos como o menu móvel.
- Contraste visual adequado para visualização confortável em telas variadas.

