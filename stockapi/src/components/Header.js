"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();

  function alternarMenu() {
    setAberto(!aberto);
  }

  function fecharMenu() {
    setAberto(false);
  }

  return (
    <header className="header" onKeyDown={(e) => { if (e.key === "Escape") fecharMenu(); }}>
      <div className="nav-container">
        <Link href="/" className="logo" onClick={fecharMenu}>
          <div className="logo-icone">📦</div>
          <span>StockApi</span>
        </Link>

        <button
          className="btn-hamburguer"
          onClick={alternarMenu}
          aria-label={aberto ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          aria-expanded={aberto}
          aria-controls="menu-principal"
        >
          {aberto ? "✕" : "☰"}
        </button>

        <nav id="menu-principal" className={`nav-menu ${aberto ? "aberto" : ""}`}>
          <Link
            href="/"
            className={`nav-link ${pathname === "/" ? "ativo" : ""}`}
            onClick={fecharMenu}
          >
            Início
          </Link>
          <Link
            href="/categorias"
            className={`nav-link ${pathname === "/categorias" ? "ativo" : ""}`}
            onClick={fecharMenu}
          >
            Categorias
          </Link>
          <Link
            href="/produtos"
            className={`nav-link ${pathname === "/produtos" ? "ativo" : ""}`}
            onClick={fecharMenu}
          >
            Produtos
          </Link>
          <Link
            href="/clientes"
            className={`nav-link ${pathname === "/clientes" ? "ativo" : ""}`}
            onClick={fecharMenu}
          >
            Clientes
          </Link>
          <Link
            href="/pedidos"
            className={`nav-link ${pathname === "/pedidos" ? "ativo" : ""}`}
            onClick={fecharMenu}
          >
            Pedidos
          </Link>
          <Link
            href="/criar-pedido"
            className={`nav-link nav-link-destaque ${pathname === "/criar-pedido" ? "ativo" : ""}`}
            onClick={fecharMenu}
          >
            + Criar Pedido
          </Link>
        </nav>
      </div>
    </header>
  );
}
