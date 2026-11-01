"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CriarPedidoPage() {
  const router = useRouter();

  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [clienteId, setClienteId] = useState("");
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [itens, setItens] = useState([]);

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    async function carregar() {
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
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  function adicionarItem() {
    if (!produtoId) {
      alert("Selecione um produto.");
      return;
    }

    if (Number(quantidade) <= 0) {
      alert("A quantidade deve ser maior que zero.");
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

  async function handleSubmit(e) {
    e.preventDefault();

    if (!clienteId) {
      alert("Selecione o cliente para o pedido.");
      return;
    }

    if (itens.length === 0) {
      alert("Adicione pelo menos um produto ao pedido.");
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
          status: "pendente",
        }),
      });

      if (!resPedido.ok) {
        throw new Error("Erro ao criar o pedido");
      }

      const pedidoCriado = await resPedido.json();

      for (const item of itens) {
        await fetch("https://stock.dev.vilhena.ifro.edu.br/api/itens_pedido", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pedido_id: pedidoCriado.id,
            produto_id: Number(item.produto_id),
            quantidade: Number(item.quantidade),
            preco_unitario: Number(item.preco_unitario),
          }),
        });
      }

      alert(`Pedido #${pedidoCriado.id} criado com sucesso!`);
      router.push("/pedidos");
    } catch (erro) {
      console.error(erro);
      alert("Ocorreu um erro ao salvar o pedido.");
    } finally {
      setSalvando(false);
    }
  }

  const valorTotal = itens.reduce((total, item) => {
    return total + item.quantidade * item.preco_unitario;
  }, 0);

  if (carregando) {
    return (
      <div className="card">
        <p className="mensagem-carregando">Carregando dados para criação do pedido...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <h1 className="titulo-pagina">Criar Novo Pedido</h1>
        <p className="subtitulo">
          Selecione o cliente e adicione os produtos com suas respectivas quantidades.
        </p>

        <form onSubmit={handleSubmit} className="formulario">
          <div className="campo">
            <label htmlFor="selectCliente">Cliente:</label>
            <select
              id="selectCliente"
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

          <div className="card" style={{ backgroundColor: "#f8fafc", marginTop: "10px" }}>
            <h3 style={{ marginBottom: "15px", color: "#334155" }}>Adicionar Produtos ao Pedido</h3>

            <div className="linha-formulario">
              <div className="campo" style={{ flex: 2 }}>
                <label htmlFor="selectProduto">Produto:</label>
                <select
                  id="selectProduto"
                  value={produtoId}
                  onChange={(e) => setProdutoId(e.target.value)}
                >
                  <option value="">-- Selecione um produto --</option>
                  {produtos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome} - R$ {Number(p.preco).toFixed(2)} (Estoque: {p.quantidade_estoque})
                    </option>
                  ))}
                </select>
              </div>

              <div className="campo" style={{ flex: 1 }}>
                <label htmlFor="inputQuantidade">Quantidade:</label>
                <input
                  id="inputQuantidade"
                  type="number"
                  min="1"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </div>

              <div>
                <button
                  type="button"
                  className="btn"
                  onClick={adicionarItem}
                >
                  Adicionar Item
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "15px" }}>
            <h3 style={{ marginBottom: "10px", color: "#334155" }}>
              Itens Adicionados ({itens.length})
            </h3>

            {itens.length === 0 ? (
              <p className="mensagem-vazia">Nenhum produto adicionado até o momento.</p>
            ) : (
              <div className="tabela-container">
                <table>
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Quantidade</th>
                      <th>Preço Unitário</th>
                      <th>Subtotal</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itens.map((item, index) => {
                      const subtotal = item.quantidade * item.preco_unitario;
                      return (
                        <tr key={index}>
                          <td>{item.nome}</td>
                          <td>{item.quantidade}</td>
                          <td>R$ {item.preco_unitario.toFixed(2)}</td>
                          <td>R$ {subtotal.toFixed(2)}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-perigo"
                              style={{ padding: "4px 8px", fontSize: "0.8rem" }}
                              onClick={() => removerItem(index)}
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

            <div style={{ textAlign: "right", marginTop: "15px", fontSize: "1.1rem" }}>
              <strong>Total do Pedido: R$ {valorTotal.toFixed(2)}</strong>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button
              type="submit"
              className="btn btn-sucesso"
              disabled={salvando}
            >
              {salvando ? "Salvando Pedido..." : "Finalizar e Salvar Pedido"}
            </button>
            <Link href="/pedidos" className="btn btn-secundario">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

