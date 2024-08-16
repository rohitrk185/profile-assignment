import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });
import { Toaster } from 'react-hot-toast';
import { CartProvider, ProductsProvider } from '@/context/ProductContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProductsProvider>
          <CartProvider>
            <Toaster />
            {children}
          </CartProvider>
        </ProductsProvider>
      </body>
    </html>
  );
}
