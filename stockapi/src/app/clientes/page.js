"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      try {
        const res = await fetch("https://stock.dev.vilhena.ifro.edu.br/api/clientes");
        const dados = await res.json();
        setClientes(Array.isArray(dados) ? dados : []);
      } catch (erro) {
        console.error(erro);
        setErro(true);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  const clientesFiltrados = clientes.filter((c) => {
    const termo = busca.toLowerCase();
    const nome = (c.nome || "").toLowerCase();
    const email = (c.email || "").toLowerCase();
    const telefone = (c.telefone || "").toLowerCase();
    return nome.includes(termo) || email.includes(termo) || telefone.includes(termo);
  });

  return (
    <div>
      <div className="card">
        <div className="card-cabecalho">
          <div>
            <h1 className="titulo-pagina">Lista de Clientes</h1>
            <p className="subtitulo">
              Clientes cadastrados na loja disponíveis para compras e pedidos.
            </p>
          </div>
          <Link href="/criar-pedido" className="btn btn-sucesso">
            + Criar Pedido
          </Link>
        </div>

        <div className="barra-filtros">
          <input
            type="text"
            className="input-busca"
            placeholder="Buscar por nome, e-mail ou telefone..."
            aria-label="Buscar por nome, e-mail ou telefone"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
            Total exibido: <strong>{clientesFiltrados.length}</strong> de {clientes.length}
          </div>
        </div>

        {carregando ? (
          <div className="aviso-carregando">
            Carregando clientes da API...
          </div>
        ) : erro ? (
          <div className="aviso-erro">
            Não foi possível carregar os clientes da API. Verifique a conexão com o servidor.
          </div>
        ) : clientesFiltrados.length === 0 ? (
          <div className="aviso-vazio">
            Nenhum cliente encontrado com os termos pesquisados.
          </div>
        ) : (
          <div className="tabela-container">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>ID</th>
                  <th>Cliente</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                </tr>
              </thead>
              <tbody>
                {clientesFiltrados.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <span style={{ color: "#64748b", fontWeight: 600 }}>#{c.id}</span>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            backgroundColor: "#eff6ff",
                            color: "#2563eb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: "0.85rem",
                          }}
                        >
                          {(c.nome || "C").charAt(0).toUpperCase()}
                        </div>
                        <strong>{c.nome}</strong>
                      </div>
                    </td>
                    <td>{c.email || <span style={{ color: "#64748b" }}>Não informado</span>}</td>
                    <td>{c.telefone || <span style={{ color: "#64748b" }}>Não informado</span>}</td>
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
