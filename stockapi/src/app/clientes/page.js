"use client";

import { useEffect, useState } from "react";

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const res = await fetch("https://stock.dev.vilhena.ifro.edu.br/api/clientes");
        const dados = await res.json();
        setClientes(Array.isArray(dados) ? dados : []);
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
        <h1 className="titulo-pagina">Clientes</h1>
        <p className="subtitulo">Clientes cadastrados na loja</p>

        {carregando ? (
          <p className="mensagem-carregando">Carregando clientes...</p>
        ) : clientes.length === 0 ? (
          <p className="mensagem-vazia">Nenhum cliente encontrado.</p>
        ) : (
          <div className="tabela-container">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td><strong>{c.nome}</strong></td>
                    <td>{c.email || "-"}</td>
                    <td>{c.telefone || "-"}</td>
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

