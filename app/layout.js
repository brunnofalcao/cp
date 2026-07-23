import './globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FBF7F4'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
