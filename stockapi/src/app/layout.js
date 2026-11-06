import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "StockApi — Controle de Estoque",
  description: "Aplicação para controle de estoque e pedidos",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
