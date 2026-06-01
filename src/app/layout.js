import "./globals.css";

export const metadata = {
  title: "TrendBox | Descubra o que está em alta.",
  description: "A TrendBox é sua curadoria definitiva de tendências. Encontre o que há de mais novo e desejado em moda, beleza, gadgets e utilidades para o seu dia a dia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
