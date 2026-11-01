"use client";

import { useEffect, useState } from "react";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
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
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  function obterNomeCategoria(categoriaId) {
    const categoria = categorias.find((c) => c.id === categoriaId);
    return categoria ? categoria.nome : "-";
  }

  return (
    <div>
      <div className="card">
        <h1 className="titulo-pagina">Produtos</h1>
        <p className="subtitulo">Relação de produtos disponíveis no estoque</p>

        {carregando ? (
          <p className="mensagem-carregando">Carregando produtos...</p>
        ) : produtos.length === 0 ? (
          <p className="mensagem-vazia">Nenhum produto encontrado.</p>
        ) : (
          <div className="tabela-container">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>ID</th>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td><strong>{p.nome}</strong></td>
                    <td>{obterNomeCategoria(p.categoria_id)}</td>
                    <td>R$ {Number(p.preco).toFixed(2)}</td>
                    <td>{p.quantidade_estoque}</td>
                    <td>{p.descricao || "-"}</td>
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

