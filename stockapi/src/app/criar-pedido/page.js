"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CriarPedidoPage() {
  const router = useRouter();

  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [clienteId, setClienteId] = useState("");
  const [status, setStatus] = useState("pendente");

  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [itens, setItens] = useState([]);

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [resClientes, resProdutos] = await Promise.all([
          fetch("https://stock.dev.vilhena.ifro.edu.br/api/clientes"),
          fetch("https://stock.dev.vilhena.ifro.edu.br/api/produtos"),
        ]);

        const dadosClientes = await resClientes.json();
        const dadosProdutos = await resProdutos.json();

        setClientes(Array.isArray(dadosClientes) ? dadosClientes : []);
        setProdutos(Array.isArray(dadosProdutos) ? dadosProdutos : []);
      } catch (erro) {
        console.error(erro);
        setErro(true);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  function adicionarItem() {
    if (!produtoId) {
      alert("Por favor, selecione um produto.");
      return;
    }

    if (Number(quantidade) <= 0) {
      alert("A quantidade deve ser maior do que zero.");
      return;
    }

    const produtoEncontrado = produtos.find((p) => p.id === Number(produtoId));
    if (!produtoEncontrado) return;

    const itemExistente = itens.find((i) => i.produto_id === produtoEncontrado.id);

    if (itemExistente) {
      setItens(
        itens.map((item) => {
          if (item.produto_id === produtoEncontrado.id) {
            return {
              ...item,
              quantidade: Number(item.quantidade) + Number(quantidade),
            };
          }
          return item;
        })
      );
    } else {
      setItens([
        ...itens,
        {
          produto_id: produtoEncontrado.id,
          nome: produtoEncontrado.nome,
          preco_unitario: Number(produtoEncontrado.preco),
          quantidade: Number(quantidade),
        },
      ]);
    }

    setProdutoId("");
    setQuantidade(1);
  }

  function removerItem(indexParaRemover) {
    setItens(itens.filter((_, index) => index !== indexParaRemover));
  }

  async function salvarPedido(e) {
    e.preventDefault();

    if (!clienteId) {
      alert("Selecione o cliente responsável pelo pedido.");
      return;
    }

    if (itens.length === 0) {
      alert("Adicione pelo menos um produto ao pedido antes de salvar.");
      return;
    }

    setSalvando(true);

    try {
      const resPedido = await fetch("https://stock.dev.vilhena.ifro.edu.br/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cliente_id: Number(clienteId),
          status: status,
        }),
      });

      if (!resPedido.ok) {
        throw new Error("Falha ao registrar o pedido");
      }

      const pedidoCriado = await resPedido.json();

      const promisesItens = itens.map(async (item) => {
        const resItem = await fetch("https://stock.dev.vilhena.ifro.edu.br/api/itens_pedido", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pedido_id: Number(pedidoCriado.id),
            produto_id: Number(item.produto_id),
            quantidade: Number(item.quantidade),
            preco_unitario: Number(item.preco_unitario),
          }),
        });

        if (!resItem.ok) {
          throw new Error("Falha ao registrar item");
        }

        return resItem.json();
      });

      await Promise.all(promisesItens);

      alert(`Pedido #${pedidoCriado.id} criado com sucesso!`);
      router.push("/pedidos");
    } catch (erro) {
      console.error(erro);
      alert("Ocorreu um erro ao salvar o pedido na API.");
    } finally {
      setSalvando(false);
    }
  }

  const valorTotal = itens.reduce((total, item) => {
    return total + item.quantidade * item.preco_unitario;
  }, 0);

  const produtoAtual = produtos.find((p) => p.id === Number(produtoId));

  if (carregando) {
    return (
      <div className="card aviso-carregando">
        Carregando dados para criação de pedido...
      </div>
    );
  }

  if (erro) {
    return (
      <div className="card aviso-erro">
        Não foi possível carregar os clientes e produtos da API. Verifique a conexão com o servidor.
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <div className="card-cabecalho">
          <div>
            <h1 className="titulo-pagina">Criar Novo Pedido</h1>
            <p className="subtitulo">
              Selecione o cliente comprador e inclua os produtos desejados com as quantidades.
            </p>
          </div>
          <Link href="/pedidos" className="btn btn-secundario">
            ← Voltar para a lista
          </Link>
        </div>

        <form onSubmit={salvarPedido} className="formulario">
          <div className="linha-formulario">
            <div className="campo" style={{ flex: 2 }}>
              <label htmlFor="campoCliente">Cliente Comprador *</label>
              <select
                id="campoCliente"
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
                required
              >
                <option value="">-- Selecione o Cliente --</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome} ({c.email || c.telefone || "Sem contato"})
                  </option>
                ))}
              </select>
            </div>

            <div className="campo" style={{ flex: 1 }}>
              <label htmlFor="campoStatus">Status do Pedido</label>
              <select
                id="campoStatus"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pendente">Pendente</option>
                <option value="enviado">Enviado</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>
          </div>

          <div className="caixa-cinza">
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b", marginBottom: "12px" }}>
              Adicionar Produtos ao Carrinho
            </h3>

            <div className="linha-formulario">
              <div className="campo" style={{ flex: 2 }}>
                <label htmlFor="campoProduto">Selecione o Produto:</label>
                <select
                  id="campoProduto"
                  value={produtoId}
                  onChange={(e) => setProdutoId(e.target.value)}
                >
                  <option value="">-- Escolha um produto --</option>
                  {produtos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome} — R$ {Number(p.preco).toFixed(2)} (Estoque: {p.quantidade_estoque})
                    </option>
                  ))}
                </select>
              </div>

              <div className="campo" style={{ flex: 1 }}>
                <label htmlFor="campoQtd">Quantidade:</label>
                <input
                  id="campoQtd"
                  type="number"
                  min="1"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </div>

              <div>
                <button
                  type="button"
                  className="btn btn-primario"
                  onClick={adicionarItem}
                >
                  + Adicionar Item
                </button>
              </div>
            </div>

            {produtoAtual && (
              <div style={{ marginTop: "12px", fontSize: "0.85rem", color: "#475569" }}>
                Preço Unitário: <strong>R$ {Number(produtoAtual.preco).toFixed(2)}</strong> | Estoque disponível: <strong>{produtoAtual.quantidade_estoque} un.</strong>
              </div>
            )}
          </div>

          <div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e293b", marginBottom: "8px" }}>
              Itens Adicionados ({itens.length})
            </h3>

            {itens.length === 0 ? (
              <div className="aviso-vazio" style={{ border: "1px dashed #cbd5e1", borderRadius: "8px" }}>
                Nenhum produto foi adicionado ainda. Escolha os itens acima para montar o pedido.
              </div>
            ) : (
              <div className="tabela-container">
                <table>
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Quantidade</th>
                      <th>Preço Unitário</th>
                      <th>Subtotal</th>
                      <th style={{ width: "90px" }}>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itens.map((item, index) => {
                      const subtotal = item.quantidade * item.preco_unitario;
                      return (
                        <tr key={item.produto_id}>
                          <td><strong>{item.nome}</strong></td>
                          <td>{item.quantidade} un.</td>
                          <td>R$ {item.preco_unitario.toFixed(2)}</td>
                          <td><strong>R$ {subtotal.toFixed(2)}</strong></td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-perigo"
                              style={{ padding: "6px 12px", fontSize: "0.85rem" }}
                              onClick={() => removerItem(index)}
                              aria-label={`Remover ${item.nome} do pedido`}
                            >
                              Remover
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <div style={{ textAlign: "right", marginTop: "16px", padding: "12px 0", borderTop: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "0.95rem", color: "#64748b", marginRight: "8px" }}>Valor Total:</span>
              <span style={{ fontSize: "1.3rem", fontWeight: 700, color: "#16a34a" }}>
                R$ {valorTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
            <button
              type="submit"
              className="btn btn-sucesso"
              disabled={salvando}
              style={{ padding: "12px 24px", fontSize: "1rem" }}
            >
              {salvando ? "Salvando Pedido..." : "✓ Finalizar e Salvar Pedido"}
            </button>
            <Link href="/pedidos" className="btn btn-secundario" style={{ padding: "12px 20px" }}>
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
