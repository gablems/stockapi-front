---
name: StockApi
description: Sistema limpo e direto para controle de estoque e pedidos
colors:
  primary: "#e11d48"
  primary-hover: "#be123c"
  primary-gradient-start: "#f43f5e"
  success: "#10b981"
  success-hover: "#047857"
  header-bg: "#181119"
  header-border: "#2d1f2f"
  surface: "#ffffff"
  surface-ground: "#faf5f7"
  surface-muted: "#f8f1f4"
  border-subtle: "#f1e4e8"
  text-primary: "#1e1119"
  text-muted: "#6d5d6b"
typography:
  headline:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  title:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.05em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  full: "9999px"
spacing:
  xs: "6px"
  sm: "12px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "9px 18px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "9px 18px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: StockApi

## Overview

**Creative North Star: "The Clean Inventory Workshop"**

O StockApi adota a metáfora de uma oficina de estoque limpa, moderna e transparente. A interface valoriza a simplicidade absoluta e a legibilidade imediata, permitindo ao usuário bater o olho em qualquer tela ou componente e compreender sua função sem esforço cognitivo. A paleta é ancorada em tons acolhedores de porcelana suave no fundo, contrastados pela sobriedade do grafite amora no cabeçalho e pontuados pelo carmim rubi nas ações prioritárias.

O design rejeita decorações gratuitas, gradientes pesados ou bibliotecas visuais complexas. O propósito estético é servir com clareza à avaliação acadêmica e ao operador de estoque: dados tabulares nítidos, campos com limites óbvios, hierarquia tipográfica precisa e transições táteis diretas.

**Key Characteristics:**
- Foco em simplicidade estrutural e transparência de código ("o mínimo exigido com máxima clareza").
- Camadas tonais suaves em vez de sombras pesadas ou skeumorfismo.
- Cabeçalho escuro fixo que ancora a navegação com logo destacada e suporte responsivo natural.
- Ações primárias e de sucesso com alta visibilidade e contraste confortável.

## Colors

A paleta combina uma base neutra clara e acolhedora com acentos pontuais de alta intenção em carmim e verde.

### Primary
- **Carmim Rubi** (`#e11d48`): Acento principal de ação. Utilizado em botões primários, links ativos da navegação, destaques numéricos e anéis de foco.
- **Carmim Profundo** (`#be123c`): Variação para estado hover e botões de perigo/remoção de itens.
- **Rosa Coral** (`#f43f5e`): Ponto inicial para gradientes pontuais no botão de criar pedido e no ícone da marca.

### Secondary
- **Verde Esmeralda** (`#10b981` / `#059669`): Cor de confirmação e criação bem-sucedida, aplicada em ações finais de envio ("+ Criar Pedido", "Finalizar Pedido").
- **Verde Estoque** (`#16a34a`): Usado para preços unitários e valores totais positivos de pedidos.

### Neutral
- **Grafite Amora** (`#181119`): Fundo da barra de navegação no topo, garantindo ancoragem firme e excelente contraste com texto branco.
- **Porcelana Suave** (`#faf5f7`): Fundo geral da aplicação (`body`), oferecendo visual aconchegante e descansado aos olhos.
- **Branco Puro** (`#ffffff`): Superfície de cartões (`.card`), tabelas e campos de formulário.
- **Texto Principal** (`#1e1119`): Cor base de títulos e conteúdos com máxima legibilidade.
- **Texto Muted** (`#6d5d6b`): Subtítulos, rótulos secundários e legendas de apoio.
- **Borda Suave** (`#f1e4e8`): Delimitação sutil de cartões e divisórias de tabelas.

### Named Rules
**The Single Accent Rule.** O carmim rubi (`#e11d48`) é reservado para intenção e foco ativo; ele nunca deve cobrir grandes superfícies de fundo.  
**The Grounded Surface Rule.** Cartões de dados sempre repousam sobre fundo branco (`#ffffff`), apoiados sobre a porcelana suave (`#faf5f7`), garantindo separação visual sem ruído.

## Typography

**Display Font:** `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`  
**Body Font:** `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`  
**Label/Mono Font:** `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

**Character:** Tipografia nativa e previsível do sistema operacional, garantindo carregamento instantâneo zero-CLS, rendering nítido e zero dependência de fontes externas.

### Hierarchy
- **Headline** (Bold 700, `1.5rem` [24px], line-height `1.3`, letter-spacing `-0.02em`): Título principal de cada página (`.titulo-pagina`).
- **Title** (Semibold 600, `1.15rem` [18.4px], line-height `1.4`): Títulos de atalhos e subtítulos de seções nos cartões.
- **Body** (Regular 400, `0.95rem` [15.2px], line-height `1.5`): Corpo de texto em parágrafos, células de tabela e valores comuns.
- **Label** (Semibold 600, `0.75rem` [12px], uppercase, letter-spacing `0.05em`): Badges de status, cabeçalhos de tabela (`th`) e tags de identificação.

### Named Rules
**The Native Stack Rule.** A pilha tipográfica mantém-se exclusivamente em fontes de sistema, assegurando performance imediata e visual nativo em qualquer plataforma.

## Layout

O layout segue um modelo centralizado e fluido com largura máxima restrita:
- **Container Principal:** Largura máxima de `1100px`, centralizado com margem automática (`margin: 24px auto`) e preenchimento lateral seguro (`padding: 0 20px`).
- **Grid de Cartões:** Grids responsivos com `repeat(auto-fit, minmax(200px, 1fr))` para estatísticas e `minmax(240px, 1fr)` para atalhos.
- **Tabelas com Scroll Seguro:** Toda tabela reside dentro de `.tabela-container` com `overflow-x: auto`, impedindo estouro horizontal em qualquer resolução.
- **Breakpoints Rigorosos:**
  - *Mobile:* Até `768px` (menu hambúrguer ativo, layout de formulário em coluna única, paddings reduzidos).
  - *Desktop:* A partir de `769px` (links de navegação horizontais visíveis, formulários com campos lado a lado).

## Elevation & Depth

O sistema utiliza predominantemente camadas tonais (Tonal Layering), onde a profundidade é comunicada pelo contraste entre o fundo porcelana (`#faf5f7`) e os cartões brancos (`#ffffff`) cercados por bordas delicadas (`#f1e4e8`). Sombras existem apenas como suporte sutil de repouso ou resposta a interação.

### Shadow Vocabulary
- **Card Rest** (`box-shadow: 0 2px 6px rgba(225, 29, 72, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02)`): Apoio de repouso para os blocos brancos.
- **Card Hover** (`box-shadow: 0 10px 15px -3px rgba(225, 29, 72, 0.08); transform: translateY(-3px)`): Elevação tátil suave ao interagir com atalhos.
- **Sticky Header** (`box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)`): Separação entre a barra fixa do topo e a área de rolagem.

### Named Rules
**The Flat-By-Default Rule.** Superfícies mantêm-se planas e nítidas em repouso. Sombras marcantes e deslocamento vertical só ocorrem como feedback de foco ou hover.

## Shapes

O vocabulário geométrico é amigável e consistente, adotando cantos suavemente curvados:
- **Bordas Pequenas (6px):** Links da navegação, botão hambúrguer.
- **Bordas Médias (8px):** Botões de ação, inputs de formulário, caixas de seleção, itens informativos.
- **Bordas Grandes (10px a 12px):** Cartões principais, blocos de pedidos e contêineres de tabela.
- **Pills / Arredondamento Total (9999px):** Badges de status, tags de identificação e contadores.

## Components

### Buttons
- **Shape:** Raio médio de 8px (`border-radius: 8px`).
- **Primary (`.btn-primario`):** Fundo carmim (`#e11d48`), texto branco, padding `9px 18px`. Hover escurece para `#be123c`.
- **Success (`.btn-sucesso`):** Gradiente esmeralda (`#10b981` a `#059669`), texto branco. Hover escurece para `#047857`.
- **Secondary (`.btn-secundario`):** Fundo cinza suave (`#f8f1f4`), borda `#ecdbe1`, texto `#4a3b47`.
- **Danger (`.btn-perigo`):** Fundo rosa claro (`#fff1f2`), borda `#fecdd3`, texto `#be123c`.

### Cards / Containers
- **Corner Style:** 12px de raio.
- **Background:** Fundo branco puro com borda de 1px em `#f1e4e8`.
- **Internal Padding:** 24px em desktop, 16px em mobile.

### Inputs / Fields
- **Style:** Fundo branco, borda de 1px em `#e7d5dc`, cantos de 8px, padding `10px 14px`.
- **Focus:** Anel rosado sem outline agressivo (`box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.15); border-color: #e11d48`).

### Navigation
- **Style:** Barra fixa (`position: sticky`) com fundo escuro grafite amora (`#181119`).
- **Logo:** Ícone 📦 em caixa quadrada de 32px com gradiente carmim, acompanhado do texto StockApi em negrito branco.
- **Mobile:** Botão hambúrguer com alternância de ícone (`☰` / `✕`), abrindo menu vertical recolhível.

### Badges
- **Style:** Pílula (`border-radius: 9999px`), fonte em caixa alta de 12px com espaçamento entre letras.
- **Variantes Semânticas:**
  - *Concluído:* Fundo `#dcfce7`, texto `#15803d`.
  - *Pendente:* Fundo `#fff1f2`, texto `#be123c`, borda `#fecdd3`.
  - *Cancelado:* Fundo `#fee2e2`, texto `#991b1b`.

## Do's and Don'ts

### Do:
- **Do** manter todos os botões e campos de formulário com `border-radius: 8px` e foco visível em tons de carmim.
- **Do** garantir que toda tabela esteja dentro de um container com `overflow-x: auto` para manter a integridade mobile.
- **Do** preservar a regra acadêmica de **zero comentários** em todo o código-fonte da aplicação.
- **Do** manter a simplicidade dos estilos em CSS nativo legível para que qualquer propriedade possa ser explicada com facilidade.

### Don't:
- **Don't** aplicar fundos escuros no corpo das páginas ou nos cartões de dados (o fundo escuro é exclusivo do cabeçalho).
- **Don't** utilizar caixas de sombra pesadas ou bordas com espessura maior que 1px.
- **Don't** criar elementos decorativos sem propósito funcional na listagem ou cadastro de pedidos.
- **Don't** introduzir fontes externas pesadas via Google Fonts ou scripts de terceiros.

