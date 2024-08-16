'use client';
import CartHeader from '@/components/CartHeader';
import { useCart, useProducts } from '@/context/ProductContext';
import { Product } from '@/types/product';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { RiLoader4Line } from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import { Cart } from '@/types/cart';
import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

export default function Products() {
  const { products } = useProducts();
  const { cart, setCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const cartItems: Array<Cart & Product> = useMemo(() => {
    return cart.map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      return { ...cartItem, ...product } as Cart & Product;
    });
  }, [cart]);

  console.log(cartItems);

  const rupee = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  const updateCartItemQuantity = (id: number, step: number) => {
    setCart((prev) => {
      const newCartItems: Cart[] = [];
      prev.forEach((item) => {
        if (item.quantity + (item.id === id ? step : 0) > 0) {
          newCartItems.push({
            ...item,
            quantity: item.quantity + (item.id === id ? step : 0),
          });
        }
      });
      return newCartItems;
    });
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-green-200 text-black">
        <h1 className="flex items-center gap-2">
          <RiLoader4Line size={30} className="animate-spin" />
          <span className="animate-pulse">Please Wait...</span>
        </h1>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen w-screen max-w-screen flex-col items-center justify-between bg-green-200 text-black">
      <div className="grid gap-5 gap-y-8 md:gap-y-10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-full max-w-full h-full p-4 mt-4">
        {cartItems.map(
          ({ id, title, price, category, image, discount, quantity }) => {
            return (
              <div
                key={id}
                className="bg-white items-center w-50 md:w-60 xl:w-64 pt-2 pb-4 hover:shadow-xl shadow-black hover:relative rounded-sm group relative"
                id={`product-card-${id}`}
              >
                <div className="w-5/6 mx-auto">
                  <img src={image} className="w-full h-full" />
                </div>

                <div className="w-4/5 mx-auto mt-5 flex flex-col">
                  <p className="text-ellipsis overflow-hidden whitespace-nowrap font-semibold group-hover:text-wrap group-hover:whitespace-normal group-hover:overflow-auto">
                    {title}
                  </p>
                  <p className="text-ellipsis overflow-hidden whitespace-nowrap text-gray-400">
                    {category}
                  </p>

                  <p className="flex gap-2 items-center">
                    <span>{rupee.format(Math.round(price))}</span>
                    <span className="text-gray-400 line-through text-[15px] leading-5">
                      {rupee.format(Math.round(price + price * discount))}
                    </span>
                  </p>

                  <p className="text-green-500">{`${Math.round(discount * 100)}% off`}</p>

                  <p className="text-purple-500">
                    {discount > 0.8 ? 'Super Saver Deal' : 'Saver Deal'}
                  </p>

                  <div className="text-end mt-4 flex justify-end gap-2">
                    <button onClick={() => updateCartItemQuantity(id, -1)}>
                      <FaMinusSquare className="text-green-600" />
                    </button>

                    <span className="text-lg">{quantity}</span>

                    <button onClick={() => updateCartItemQuantity(id, 1)}>
                      <FaPlusSquare className="text-green-600" />
                    </button>
                  </div>

                  <button
                    className="mt-4 flex justify-end gap-2"
                    onClick={() => updateCartItemQuantity(id, -quantity)}
                  >
                    <MdDelete
                      className="text-red-400 hover:text-red-600"
                      size={24}
                    />
                  </button>
                </div>
              </div>
            );
          }
        )}
      </div>
    </main>
  );
}
