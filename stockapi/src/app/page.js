import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="card">
        <h1 className="titulo-pagina">Sistema de Controle de Estoque</h1>
        <p className="subtitulo">
          Aplicação web para gerenciamento de estoque, produtos, clientes e pedidos.
        </p>

        <div className="dupla-box">
          <h3>Integrantes da Dupla</h3>
          <ul>
            <li>Gabriela Lemes</li>
            <li>[Nome da Dupla]</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h2 className="titulo-pagina">Acesso Rápido</h2>
        <div className="atalhos-grid">
          <Link href="/pedidos" className="atalho-card">
            <h3>Listar Pedidos</h3>
            <p>Visualizar pedidos cadastrados e seus respectivos itens.</p>
          </Link>

          <Link href="/criar-pedido" className="atalho-card">
            <h3>Criar Pedido</h3>
            <p>Cadastrar novo pedido selecionando cliente e produtos.</p>
          </Link>

          <Link href="/produtos" className="atalho-card">
            <h3>Produtos</h3>
            <p>Consultar lista de produtos, preços e quantidade em estoque.</p>
          </Link>

          <Link href="/clientes" className="atalho-card">
            <h3>Clientes</h3>
            <p>Visualizar relação de clientes cadastrados no sistema.</p>
          </Link>

          <Link href="/categorias" className="atalho-card">
            <h3>Categorias</h3>
            <p>Consultar as categorias de produtos existentes na loja.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
