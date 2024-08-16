'use client';

import { CartProvider, ProductsProvider } from '@/context/ProductContext';
import Products from './products/page';
import Link from 'next/link';

export default function Home() {
  return (
    <ProductsProvider>
      <CartProvider>
        <main className="flex min-h-screen w-screen max-w-screen flex-col items-center justify-center gap-6 bg-green-200 text-black">
          <Link href={'/products'}>All Products</Link>
          <Link href={'/cart'}>Cart</Link>
        </main>
      </CartProvider>
    </ProductsProvider>
  );
}
