"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("todas");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [resProdutos, resCategorias] = await Promise.all([
          fetch("https://stock.dev.vilhena.ifro.edu.br/api/produtos"),
          fetch("https://stock.dev.vilhena.ifro.edu.br/api/categorias"),
        ]);

        const dadosProdutos = await resProdutos.json();
        const dadosCategorias = await resCategorias.json();

        setProdutos(Array.isArray(dadosProdutos) ? dadosProdutos : []);
        setCategorias(Array.isArray(dadosCategorias) ? dadosCategorias : []);
      } catch (erro) {
        console.error(erro);
        setErro(true);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  function obterNomeCategoria(categoriaId) {
    const categoria = categorias.find((c) => Number(c.id) === Number(categoriaId));
    return categoria ? categoria.nome : "Geral";
  }

  const produtosFiltrados = produtos.filter((p) => {
    const termo = busca.toLowerCase();
    const nome = (p.nome || "").toLowerCase();
    const descricao = (p.descricao || "").toLowerCase();
    const bateuBusca = nome.includes(termo) || descricao.includes(termo);
    const bateuCategoria =
      categoriaSelecionada === "todas" ||
      Number(p.categoria_id) === Number(categoriaSelecionada);
    return bateuBusca && bateuCategoria;
  });

  return (
    <div>
      <div className="card">
        <div className="card-cabecalho">
          <div>
            <h1 className="titulo-pagina">Catálogo de Produtos</h1>
            <p className="subtitulo">
              Consulta de produtos disponíveis, preços unitários e quantidade em estoque.
            </p>
          </div>
          <Link href="/criar-pedido" className="btn btn-sucesso">
            + Criar Pedido com Produto
          </Link>
        </div>

        <div className="barra-filtros">
          <input
            type="text"
            className="input-busca"
            placeholder="Buscar produto por nome ou descrição..."
            aria-label="Buscar produto por nome ou descrição"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label htmlFor="filtroCategoria" style={{ fontSize: "0.85rem", fontWeight: 600, color: "#7b586e" }}>
              Categoria:
            </label>
            <select
              id="filtroCategoria"
              value={categoriaSelecionada}
              onChange={(e) => setCategoriaSelecionada(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #fbcfe8", color: "#2d1222" }}
            >
              <option value="todas">Todas as categorias</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>

          <div style={{ fontSize: "0.85rem", color: "#7b586e" }}>
            Total exibido: <strong>{produtosFiltrados.length}</strong> de {produtos.length}
          </div>
        </div>

        {carregando ? (
          <div className="aviso-carregando">
            Carregando produtos da API...
          </div>
        ) : erro ? (
          <div className="aviso-erro">
            Não foi possível carregar os produtos da API. Verifique a conexão com o servidor.
          </div>
        ) : produtosFiltrados.length === 0 ? (
          <div className="aviso-vazio">
            Nenhum produto encontrado com os termos pesquisados.
          </div>
        ) : (
          <div className="tabela-container">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>ID</th>
                  <th>Produto</th>
                  <th>Categoria</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                {produtosFiltrados.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <span style={{ color: "#7b586e", fontWeight: 600 }}>#{p.id}</span>
                    </td>
                    <td>
                      <strong>{p.nome}</strong>
                    </td>
                    <td>
                      <span className="badge" style={{ backgroundColor: "#fdf2f8", color: "#9d174d", border: "1px solid #fbcfe8" }}>
                        {obterNomeCategoria(p.categoria_id)}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: "#16a34a" }}>
                        R$ {Number(p.preco || 0).toFixed(2)}
                      </strong>
                    </td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: p.quantidade_estoque > 5 ? "#dcfce7" : "#fee2e2",
                          color: p.quantidade_estoque > 5 ? "#166534" : "#991b1b",
                        }}
                      >
                        {p.quantidade_estoque} un.
                      </span>
                    </td>
                    <td style={{ color: "#7b586e" }}>{p.descricao || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
