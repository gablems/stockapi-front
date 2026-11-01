"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [itens, setItens] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

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
        setErro(true);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  function obterNomeCliente(clienteId) {
    const cliente = clientes.find((c) => Number(c.id) === Number(clienteId));
    return cliente ? cliente.nome : `Cliente #${clienteId}`;
  }

  function obterNomeProduto(produtoId) {
    const produto = produtos.find((p) => Number(p.id) === Number(produtoId));
    return produto ? produto.nome : `Produto #${produtoId}`;
  }

  function obterItensDoPedido(pedidoId) {
    return itens.filter(
      (item) => Number(item.pedido_numero) === Number(pedidoId) || Number(item.pedido_id) === Number(pedidoId)
    );
  }

  function formatarData(dataString) {
    if (!dataString) return "-";
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR") + " às " + data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  }

  const pedidosFiltrados = pedidos
    .filter((pedido) => {
      const statusValido = filtroStatus === "todos" || pedido.status === filtroStatus;
      const nomeCliente = obterNomeCliente(pedido.cliente_id).toLowerCase();
      const buscaValida = nomeCliente.includes(busca.toLowerCase()) || String(pedido.id).includes(busca);
      return statusValido && buscaValida;
    })
    .sort((a, b) => Number(b.id) - Number(a.id));

  return (
    <div>
      <div className="card">
        <div className="card-cabecalho">
          <div>
            <h1 className="titulo-pagina">Listar Pedidos</h1>
            <p className="subtitulo">
              Exibição dos pedidos registrados no sistema com seus respectivos itens.
            </p>
          </div>
          <Link href="/criar-pedido" className="btn btn-sucesso">
            + Criar Novo Pedido
          </Link>
        </div>

        <div className="barra-filtros">
          <input
            type="text"
            className="input-busca"
            placeholder="Buscar por cliente ou ID..."
            aria-label="Buscar por cliente ou ID"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label htmlFor="filtroStatus" style={{ fontSize: "0.85rem", fontWeight: 600, color: "#475569" }}>
              Status:
            </label>
            <select
              id="filtroStatus"
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
            >
              <option value="todos">Todos os status</option>
              <option value="pendente">Pendente</option>
              <option value="enviado">Enviado</option>
              <option value="concluido">Concluído</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>

          <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
            Total exibido: <strong>{pedidosFiltrados.length}</strong> de {pedidos.length}
          </div>
        </div>
      </div>

      {carregando ? (
        <div className="card aviso-carregando">
          Carregando pedidos da API...
        </div>
      ) : erro ? (
        <div className="card aviso-erro">
          Não foi possível carregar os pedidos da API. Verifique a conexão com o servidor.
        </div>
      ) : pedidosFiltrados.length === 0 ? (
        <div className="card aviso-vazio">
          Nenhum pedido encontrado para os filtros selecionados.
        </div>
      ) : (
        pedidosFiltrados.map((pedido) => {
          const itensDoPedido = obterItensDoPedido(pedido.id);
          const totalPedido = itensDoPedido.reduce((total, item) => {
            return total + Number(item.preco_unitario || 0) * Number(item.quantidade || 0);
          }, 0);

          return (
            <div key={pedido.id} className="pedido-card">
              <div className="pedido-topo">
                <div>
                  <span className="pedido-id">Pedido #{pedido.id}</span>
                  <span style={{ margin: "0 10px", color: "#cbd5e1" }}>•</span>
                  <span className="pedido-cliente">
                    Cliente: <strong>{obterNomeCliente(pedido.cliente_id)}</strong>
                  </span>
                </div>
                <div>
                  <span className="pedido-data">
                    {formatarData(pedido.data_pedido)}
                  </span>
                  <span className={`badge badge-${pedido.status || "pendente"}`}>
                    {pedido.status || "pendente"}
                  </span>
                </div>
              </div>

              <div>
                <div className="pedido-itens-titulo">
                  Itens inclusos no pedido ({itensDoPedido.length}):
                </div>

                {itensDoPedido.length === 0 ? (
                  <div style={{ padding: "12px", color: "#64748b", fontSize: "0.85rem", textAlign: "center" }}>
                    Nenhum item vinculado a este pedido.
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
                        </tr>
                      </thead>
                      <tbody>
                        {itensDoPedido.map((item) => {
                          const subtotal = Number(item.quantidade) * Number(item.preco_unitario);
                          return (
                            <tr key={item.id}>
                              <td>
                                <strong>{obterNomeProduto(item.produto_id)}</strong>
                              </td>
                              <td>{item.quantidade} unidade(s)</td>
                              <td>R$ {Number(item.preco_unitario).toFixed(2)}</td>
                              <td>
                                <strong>R$ {subtotal.toFixed(2)}</strong>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="pedido-rodape">
                  <span className="pedido-total-rotulo">Valor Total do Pedido:</span>
                  <span className="pedido-total-valor">R$ {totalPedido.toFixed(2)}</span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
