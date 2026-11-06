"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [totais, setTotais] = useState({
    pedidos: 0,
    produtos: 0,
    clientes: 0,
    categorias: 0,
  });
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    async function carregarTotais() {
      try {
        const [resPedidos, resProdutos, resClientes, resCategorias] = await Promise.all([
          fetch("https://stock.dev.vilhena.ifro.edu.br/api/pedidos"),
          fetch("https://stock.dev.vilhena.ifro.edu.br/api/produtos"),
          fetch("https://stock.dev.vilhena.ifro.edu.br/api/clientes"),
          fetch("https://stock.dev.vilhena.ifro.edu.br/api/categorias"),
        ]);

        const dadosPedidos = await resPedidos.json();
        const dadosProdutos = await resProdutos.json();
        const dadosClientes = await resClientes.json();
        const dadosCategorias = await resCategorias.json();

        setTotais({
          pedidos: Array.isArray(dadosPedidos) ? dadosPedidos.length : 0,
          produtos: Array.isArray(dadosProdutos) ? dadosProdutos.length : 0,
          clientes: Array.isArray(dadosClientes) ? dadosClientes.length : 0,
          categorias: Array.isArray(dadosCategorias) ? dadosCategorias.length : 0,
        });
      } catch (erro) {
        console.error(erro);
        setErro(true);
      } finally {
        setCarregando(false);
      }
    }

    carregarTotais();
  }, []);

  return (
    <div>
      <div className="card">
        <h1 className="titulo-pagina">Sistema de Controle de Estoque</h1>
        <p className="subtitulo">
          Atividade Front-End • 4º Bimestre — Plataforma para controle de produtos, clientes e gerenciamento de pedidos de compra.
        </p>

        <div className="dupla-card">
          <div className="dupla-titulo">
            <span>👥</span>
            <span>Integrantes da Dupla</span>
          </div>
          <div className="dupla-grid">
            <div className="dupla-item">
              <span className="dupla-nome">Gabriela Lemes</span>
              <span className="dupla-papel">Desenvolvedora</span>
            </div>
          </div>
        </div>

        {erro && (
          <div className="aviso-erro" style={{ marginTop: "16px" }}>
            Não foi possível carregar os totais da API. Verifique a conexão com o servidor.
          </div>
        )}

        <div className="estatisticas-grid">
          <div className="estatistica-card">
            <div className="estatistica-icone" style={{ backgroundColor: "#fce7f3", color: "#db2777" }}>
              📑
            </div>
            <div>
              <div className="estatistica-valor">
                {carregando ? "..." : totais.pedidos}
              </div>
              <div className="estatistica-rotulo">Pedidos Registrados</div>
            </div>
          </div>

          <div className="estatistica-card">
            <div className="estatistica-icone" style={{ backgroundColor: "#ffe4e6", color: "#e11d48" }}>
              🛒
            </div>
            <div>
              <div className="estatistica-valor">
                {carregando ? "..." : totais.produtos}
              </div>
              <div className="estatistica-rotulo">Produtos em Estoque</div>
            </div>
          </div>

          <div className="estatistica-card">
            <div className="estatistica-icone" style={{ backgroundColor: "#fae8ff", color: "#c026d3" }}>
              👥
            </div>
            <div>
              <div className="estatistica-valor">
                {carregando ? "..." : totais.clientes}
              </div>
              <div className="estatistica-rotulo">Clientes Cadastrados</div>
            </div>
          </div>

          <div className="estatistica-card">
            <div className="estatistica-icone" style={{ backgroundColor: "#fdf2f8", color: "#9d174d" }}>
              🏷️
            </div>
            <div>
              <div className="estatistica-valor">
                {carregando ? "..." : totais.categorias}
              </div>
              <div className="estatistica-rotulo">Categorias Ativas</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="titulo-pagina">Acesso Rápido às Seções</h2>
        <p className="subtitulo">Selecione uma das opções abaixo para gerenciar os dados da loja:</p>

        <div className="atalhos-grid">
          <Link href="/pedidos" className="atalho-card">
            <div>
              <div className="atalho-cabecalho">
                <span className="atalho-icone">📑</span>
                <h3 className="atalho-titulo">Listar Pedidos</h3>
              </div>
              <p className="atalho-descricao">
                Visualize todos os pedidos cadastrados, dados dos clientes, itens e valor total.
              </p>
            </div>
            <span className="atalho-link-texto">Abrir pedidos →</span>
          </Link>

          <Link href="/criar-pedido" className="atalho-card">
            <div>
              <div className="atalho-cabecalho">
                <span className="atalho-icone">➕</span>
                <h3 className="atalho-titulo">Criar Pedido</h3>
              </div>
              <p className="atalho-descricao">
                Formulário para registrar uma nova venda selecionando o cliente e múltiplos produtos.
              </p>
            </div>
            <span className="atalho-link-texto">Novo pedido →</span>
          </Link>

          <Link href="/produtos" className="atalho-card">
            <div>
              <div className="atalho-cabecalho">
                <span className="atalho-icone">🛒</span>
                <h3 className="atalho-titulo">Produtos</h3>
              </div>
              <p className="atalho-descricao">
                Consulte o catálogo de itens, preços unitários e saldo atual de estoque.
              </p>
            </div>
            <span className="atalho-link-texto">Ver produtos →</span>
          </Link>

          <Link href="/clientes" className="atalho-card">
            <div>
              <div className="atalho-cabecalho">
                <span className="atalho-icone">👥</span>
                <h3 className="atalho-titulo">Clientes</h3>
              </div>
              <p className="atalho-descricao">
                Lista de clientes com dados de contato telefônico e endereço de e-mail.
              </p>
            </div>
            <span className="atalho-link-texto">Ver clientes →</span>
          </Link>

          <Link href="/categorias" className="atalho-card">
            <div>
              <div className="atalho-cabecalho">
                <span className="atalho-icone">🏷️</span>
                <h3 className="atalho-titulo">Categorias</h3>
              </div>
              <p className="atalho-descricao">
                Organização dos produtos da loja em categorias e departamentos.
              </p>
            </div>
            <span className="atalho-link-texto">Ver categorias →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
