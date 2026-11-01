"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();

  function fecharMenu() {
    setAberto(false);
  }

  return (
    <header className="header">
      <div className="nav-container">
        <Link href="/" className="logo" onClick={fecharMenu}>
          Estoque
        </Link>

        <button
          className="btn-hamburguer"
          onClick={() => setAberto(!aberto)}
          aria-label="Alternar Menu"
        >
          {aberto ? "✕" : "☰"}
        </button>

        <nav className={`nav-menu ${aberto ? "aberto" : ""}`}>
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
            Listar Pedidos
          </Link>
          <Link
            href="/criar-pedido"
            className={`nav-link ${pathname === "/criar-pedido" ? "ativo" : ""}`}
            onClick={fecharMenu}
          >
            Criar Pedido
          </Link>
        </nav>
      </div>
    </header>
  );
}

