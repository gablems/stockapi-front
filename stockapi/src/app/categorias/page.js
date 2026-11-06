"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      try {
        const res = await fetch("https://stock.dev.vilhena.ifro.edu.br/api/categorias");
        const dados = await res.json();
        setCategorias(Array.isArray(dados) ? dados : []);
      } catch (erro) {
        console.error(erro);
        setErro(true);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  const categoriasFiltradas = categorias.filter((cat) => {
    return (cat.nome || "").toLowerCase().includes(busca.toLowerCase());
  });

  return (
    <div>
      <div className="card">
        <div className="card-cabecalho">
          <div>
            <h1 className="titulo-pagina">Categorias de Produtos</h1>
            <p className="subtitulo">
              Classificação e organização dos itens cadastrados no estoque da loja.
            </p>
          </div>
          <Link href="/produtos" className="btn btn-primario">
            Ver Produtos
          </Link>
        </div>

        <div className="barra-filtros">
          <input
            type="text"
            className="input-busca"
            placeholder="Buscar categoria..."
            aria-label="Buscar categoria"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <div style={{ fontSize: "0.85rem", color: "#7b586e" }}>
            Total exibido: <strong>{categoriasFiltradas.length}</strong> de {categorias.length}
          </div>
        </div>

        {carregando ? (
          <div className="aviso-carregando">
            Carregando categorias da API...
          </div>
        ) : erro ? (
          <div className="aviso-erro">
            Não foi possível carregar as categorias da API. Verifique a conexão com o servidor.
          </div>
        ) : categoriasFiltradas.length === 0 ? (
          <div className="aviso-vazio">
            Nenhuma categoria encontrada com o termo pesquisado.
          </div>
        ) : (
          <div className="tabela-container">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "80px" }}>ID</th>
                  <th>Nome da Categoria</th>
                  <th style={{ width: "120px" }}>Ação</th>
                </tr>
              </thead>
              <tbody>
                {categoriasFiltradas.map((cat) => (
                  <tr key={cat.id}>
                    <td>
                      <span style={{ color: "#7b586e", fontWeight: 600 }}>#{cat.id}</span>
                    </td>
                    <td>
                      <strong>{cat.nome}</strong>
                    </td>
                    <td>
                      <Link
                        href="/produtos"
                        style={{ fontSize: "0.85rem", color: "#db2777", fontWeight: 600 }}
                      >
                        Ver produtos →
                      </Link>
                    </td>
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
