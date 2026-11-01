"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [itens, setItens] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [resPedidos, resClientes, resItens, resProdutos] = await Promise.all([
          fetch("https://stock.dev.vilhena.ifro.edu.br/api/pedidos"),
          fetch("https://stock.dev.vilhena.ifro.edu.br/api/clientes"),
          fetch("https://stock.dev.vilhena.ifro.edu.br/api/itens_pedido"),
          fetch("https://stock.dev.vilhena.ifro.edu.br/api/produtos"),
        ]);

        const dadosPedidos = await resPedidos.json();
        const dadosClientes = await resClientes.json();
        const dadosItens = await resItens.json();
        const dadosProdutos = await resProdutos.json();

        setPedidos(Array.isArray(dadosPedidos) ? dadosPedidos : []);
        setClientes(Array.isArray(dadosClientes) ? dadosClientes : []);
        setItens(Array.isArray(dadosItens) ? dadosItens : []);
        setProdutos(Array.isArray(dadosProdutos) ? dadosProdutos : []);
      } catch (erro) {
        console.error(erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  function obterNomeCliente(clienteId) {
    const cliente = clientes.find((c) => c.id === clienteId);
    return cliente ? cliente.nome : `Cliente #${clienteId}`;
  }

  function obterNomeProduto(produtoId) {
    const produto = produtos.find((p) => p.id === produtoId);
    return produto ? produto.nome : `Produto #${produtoId}`;
  }

  function obterItensDoPedido(pedidoId) {
    return itens.filter(
      (item) => item.pedido_numero === pedidoId || item.pedido_id === pedidoId
    );
  }

  function formatarData(dataString) {
    if (!dataString) return "-";
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR") + " " + data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <h1 className="titulo-pagina">Listar Pedidos</h1>
            <p className="subtitulo">Visualização dos pedidos registrados na API</p>
          </div>
          <Link href="/criar-pedido" className="btn btn-sucesso">
            + Criar Novo Pedido
          </Link>
        </div>
      </div>

      {carregando ? (
        <div className="card">
          <p className="mensagem-carregando">Carregando pedidos da API...</p>
        </div>
      ) : pedidos.length === 0 ? (
        <div className="card">
          <p className="mensagem-vazia">Nenhum pedido encontrado.</p>
        </div>
      ) : (
        pedidos.map((pedido) => {
          const itensDoPedido = obterItensDoPedido(pedido.id);
          const totalPedido = itensDoPedido.reduce((total, item) => {
            return total + Number(item.preco_unitario || 0) * Number(item.quantidade || 0);
          }, 0);

          return (
            <div key={pedido.id} className="pedido-card">
              <div className="pedido-cabecalho">
                <div>
                  <strong style={{ fontSize: "1.1rem" }}>Pedido #{pedido.id}</strong>
                  <span style={{ margin: "0 10px", color: "#94a3b8" }}>|</span>
                  <span>Cliente: <strong>{obterNomeCliente(pedido.cliente_id)}</strong></span>
                </div>
                <div>
                  <span style={{ marginRight: "10px", fontSize: "0.85rem", color: "#64748b" }}>
                    {formatarData(pedido.data_pedido)}
                  </span>
                  <span className={`badge badge-${pedido.status || "pendente"}`}>
                    {pedido.status || "pendente"}
                  </span>
                </div>
              </div>

              <div>
                <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "#475569", marginTop: "10px" }}>
                  Itens do Pedido ({itensDoPedido.length}):
                </p>

                {itensDoPedido.length === 0 ? (
                  <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginTop: "5px" }}>
                    Nenhum item cadastrado para este pedido.
                  </p>
                ) : (
                  <div className="tabela-container">
                    <table className="item-pedido-tabela">
                      <thead>
                        <tr>
                          <th>Produto</th>
                          <th>Quantidade</th>
                          <th>Preço Unitário</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {itensDoPedido.map((item) => {
                          const subtotal = Number(item.quantidade) * Number(item.preco_unitario);
                          return (
                            <tr key={item.id}>
                              <td>{obterNomeProduto(item.produto_id)}</td>
                              <td>{item.quantidade}</td>
                              <td>R$ {Number(item.preco_unitario).toFixed(2)}</td>
                              <td>R$ {subtotal.toFixed(2)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="pedido-total">
                  Total: R$ {totalPedido.toFixed(2)}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

