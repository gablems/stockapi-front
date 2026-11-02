# Guia de Estudos Rápido — Sistema de Estoque (Front-End)

Guia feito por Smolak


---

## 1. Métodos de Array e Manipulação de Dados (O que ele mais pergunta)

Esses são os métodos de JavaScript que a gente usou pra manipular as listas que vieram da API:

| Comando | O que é / O que responder | Onde e como a gente usou no código |
| :--- | :--- | :--- |
| **`.map()`** | **Transforma uma lista em outra.** Percorre cada item e devolve um pedaço de HTML (JSX) pra desenhar na tela. | Pra desenhar as linhas da tabela de produtos/pedidos: `produtos.map((p) => <tr key={p.id}>...</tr>)`. |
| **`key={...}`** *(no map)* | **Identificador único do React.** Serve pro React saber exatamente qual linha da tabela mudou sem precisar redesenhar a tela inteira. | `key={cat.id}` ou `key={pedido.id}`. Se o Wagner perguntar: *"é a chave única pro React não se perder na renderização"*. |
| **`.filter()`** | **Filtra a lista.** Só devolve os itens que passarem no teste (`true`). Não altera a lista original. | Nas barras de busca (pra achar cliente/produto pelo nome) e pra pegar só os itens de um pedido específico. |
| **`.find()`** | **Busca e devolve o PRIMEIRO item** que bater com a condição. Se não achar, devolve `undefined`. | Pra pegar o nome do cliente pelo ID dele (`clientes.find(c => c.id === pedido.cliente_id)`). |
| **`.reduce()`** | **Acumulador.** Passa por todos os itens da lista e soma tudo num número só. | Pra calcular o valor total do pedido multiplicando `quantidade * preco` de cada item e somando o total. |
| **`.sort()`** | **Ordena a lista.** | Na listagem de pedidos, pra deixar os mais novos no topo: `(a, b) => Number(b.id) - Number(a.id)`. |
| **`Array.isArray()`** | **Checa se a variável é um array de verdade.** | Pra validar a resposta da API antes de usar `.map()` ou `.length`, evitando que o sistema trave com erro se a API falhar. |
| **Spread `...`** | **Copia o array ou objeto.** Cria uma cópia nova sem mexer na original (conceito de imutabilidade). | Ao adicionar item no carrinho: `setItens([...itens, novoItem])`. |
| **`Number(...)`** | **Converte texto em número.** | Input de formulário entrega tudo em texto. Usamos pra garantir conta certa: `Number(preco) * Number(quantidade)`. |
| **`.toFixed(2)`** | **Trava o número em duas casas decimais.** | Formatar preço de moeda: `15.5` vira `15.50`. |
| **`.toLowerCase()`** | **Passa o texto pra minúsculo.** | Na busca: pra "ARROZ" bater com "arroz" sem dar erro de digitação. |
| **`.includes(...)`** | **Checa se um texto está dentro de outro.** | Pra verificar se o que o usuário digitou no campo de busca existe no nome do produto/cliente. |

---

## 2. React e Next.js (Hooks e Estrutura)

| Conceito / Hook | O que é / O que responder | O que faz no nosso projeto |
| :--- | :--- | :--- |
| **`"use client"`** | **Avisa o Next.js que o arquivo roda no navegador** (Client Component). | Obrigatório no topo de arquivos que usam cliques, formulários e hooks (`useState`, `useEffect`). Sem isso dá erro. |
| **`useState`** | **Variável reativa (estado).** Quando o valor dela muda, o React atualiza o pedaço da tela na hora. | Guarda os dados da API (`produtos`, `clientes`), textos de busca (`busca`), avisos de tela (`carregando`, `erro`) e itens do carrinho. |
| **`useEffect`** | **Efeito colateral / ciclo de vida.** Executa uma função automaticamente quando a página abre. | O array vazio `[]` no final faz ele rodar **só uma vez** assim que a tela abre, disparando o `fetch` pra buscar os dados no servidor. |
| **`useRouter`** | **Navegação via código.** | Usamos o `router.push("/pedidos")` pra redirecionar o usuário pra página de pedidos logo depois de salvar o formulário. |
| **`usePathname`** | **Pega a rota atual do navegador.** | Usado no Header pra saber em qual página o usuário tá e pintar o link do menu de vermelho/ativo (`pathname === "/produtos"`). |
| **`<Link href="...">`** | **Link rápido do Next.js.** | Substitui a tag `<a>` comum. Não recarrega a página do zero, troca de tela instantaneamente (SPA). |
| **Renderização Condicional** | **Mostrar ou esconder algo na tela com base numa regra.** | `{carregando ? (<p>Carregando...</p>) : (<tabela>)}` ou `{erro && (<p>Deu ruim</p>)}`. |

---

## 3. Requisições HTTP e Fetch API (Comunicação com a API do IFRO)

| Termo | Resposta curta pro Wagner |
| :--- | :--- |
| **`fetch(...)`** | Função nativa do JavaScript usada pra fazer requisições HTTP (conversar com a API). |
| **`async / await`** | Faz o JavaScript esperar a resposta da internet chegar antes de continuar rodando a próxima linha, sem travar o navegador. |
| **`Promise.all([...])`** | **Dispara várias requisições ao mesmo tempo.** Em vez de esperar uma API responder pra depois chamar outra, chamamos pedidos, clientes e produtos juntos pra tela carregar muito mais rápido. |
| **`res.json()`** | Converte a resposta bruta que veio da rede em um formato de lista/objeto que o JavaScript entende. |
| **`method: "POST"`** | Usado na página Criar Pedido. Avisa que não estamos apenas lendo dados (GET), mas sim enviando um registro novo pro banco. |
| **`headers: { "Content-Type": "application/json" }`** | Avisa a API que os dados que a gente tá enviando no corpo da requisição estão empacotados como JSON. |
| **`JSON.stringify(...)`** | Converte nosso objeto JavaScript em texto puro JSON pra poder trafegar pela internet. |
| **`try / catch / finally`** | Bloco de segurança: `try` tenta rodar a requisição; se o servidor cair, o `catch` segura o erro sem a tela quebrar; e o `finally` roda no final de tudo pra desligar o aviso de "Carregando...". |

---

## 4. Tags de Tabela (HTML)

Se o Wagner apontar pra qualquer tabela de listagem, as respostas são bem literais:

* **`<table>`**: Cria a estrutura da tabela.
* **`<thead>`**: Cabeça da tabela (onde ficam os títulos das colunas).
* **`<tbody>`**: Corpo da tabela (onde ficam os dados de fato, as linhas com produtos/pedidos).
* **`<tr>`** *(Table Row)*: Uma linha da tabela.
* **`<th>`** *(Table Header)*: Célula de título/cabeçalho (já vem em negrito por padrão).
* **`<td>`** *(Table Data)*: Célula de dado comum (onde fica o texto normal de cada coluna).

> **Pulo do gato pro CSS da tabela:** A classe `.tabela-container` tem a regra `overflow-x: auto;`. Ela serve pra tabela não vazar da tela nem quebrar o layout no celular — se a tabela for larga, cria uma barrinha de rolagem só nela.

---

## 5. Formulários e Inputs

Usados na tela de **Criar Pedido** e nas **Barras de Busca**:

* **`<form onSubmit={salvarPedido}>`**: Agrupa os campos e dispara a função ao apertar salvar ou enter.
* **`e.preventDefault()`**: **Muito perguntado!** Cancela o comportamento padrão do navegador de recarregar a página toda vez que envia um formulário.
* **`<select>` e `<option>`**: Caixa de seleção suspensa (dropdown). Usado pra escolher cliente, produto e status.
* **`value` e `onChange` (Componente Controlado)**: Significa que quem manda no input é o React. O `value` mostra o estado e o `onChange` atualiza o estado a cada tecla digitada (`e.target.value`).
* **`button type="button"` vs `button type="submit"`**: O botão com `type="button"` só roda um clique solto (ex: adicionar item na lista ou fechar menu). O botão com `type="submit"` valida e envia o formulário inteiro.

---

## 6. CSS e Responsividade (Se ele perguntar de estilo)

* **Flexbox (`display: flex`)**: Usado pra colocar coisas lado a lado e alinhar itens no centro (ex: cabeçalho, botões, ícones com texto).
* **CSS Grid (`display: grid`)**: Usado nas grades de cards da Home (`grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`). Isso faz os cards se ajustarem sozinhos ao tamanho da tela sem precisar quebrar regras na mão.
* **Media Queries (`@media`)**:
  * `@media (max-width: 768px)`: Regras que só funcionam em celular (ativa o botão hambúrguer `☰` e esconde o menu comum).
  * `@media (min-width: 769px)`: Regras pra computador/desktop (esconde o hambúrguer e exibe a barra de links completa).
* **Variáveis CSS (`:root`)**: Guarda cores padrões no topo do CSS (como `--cor-primaria`), facilitando trocar a cor do sistema inteiro num só lugar.
* **`position: sticky; top: 0`**: Faz a barra do cabeçalho ficar presa no topo da página quando a gente rola a tela pra baixo.

