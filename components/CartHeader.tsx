import React from 'react';
import { RiShoppingCartFill } from 'react-icons/ri';
import { useCart } from '@/context/ProductContext';
import { useRouter } from 'next/navigation';

type Props = {};

const CartHeader = (props: Props) => {
  const router = useRouter();
  const { cart } = useCart();

  return (
    <header className="w-screen max-w-screen bg-black text-white h-16 flex justify-between px-10 items-center">
      <h1 className="capitalize text-lg">Products</h1>

      <button
        className={`flex ${cart.length ? 'text-green-200' : 'text-green-100'} items-center gap-1 italic`}
        onClick={() => router.push('/cart')}
      >
        <span>{cart.length}</span>
        <RiShoppingCartFill className="text-lg" />
      </button>
    </header>
  );
};

export default CartHeader;
