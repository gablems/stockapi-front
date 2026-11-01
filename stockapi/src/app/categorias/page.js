"use client";

import { useEffect, useState } from "react";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const res = await fetch("https://stock.dev.vilhena.ifro.edu.br/api/categorias");
        const dados = await res.json();
        setCategorias(Array.isArray(dados) ? dados : []);
      } catch (erro) {
        console.error(erro);
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  return (
    <div>
      <div className="card">
        <h1 className="titulo-pagina">Categorias</h1>
        <p className="subtitulo">Categorias de produtos cadastradas na loja</p>

        {carregando ? (
          <p className="mensagem-carregando">Carregando categorias...</p>
        ) : categorias.length === 0 ? (
          <p className="mensagem-vazia">Nenhuma categoria encontrada.</p>
        ) : (
          <div className="tabela-container">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "80px" }}>ID</th>
                  <th>Nome da Categoria</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((cat) => (
                  <tr key={cat.id}>
                    <td>{cat.id}</td>
                    <td>{cat.nome}</td>
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

