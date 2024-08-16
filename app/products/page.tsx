'use client';
import CartHeader from '@/components/CartHeader';
import { useCart, useProducts } from '@/context/ProductContext';
import { Product } from '@/types/product';
import { useCallback, useEffect, useState } from 'react';
import { RiLoader4Line } from 'react-icons/ri';
import { toast } from 'react-hot-toast';

export default function Products() {
  const { products, setProducts } = useProducts();
  const { cart, setCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  // const { data: productsData, isLoading } = useQuery<Product[]>({
  //   queryKey: ['products'],
  //   queryFn: async () => {
  //     try {
  //       const productsJSON = await fetch('https://fakestoreapi.com/products');
  //       const products: Product[] = await productsJSON.json();

  //       return products;
  //     } catch (error) {
  //       console.error('Error in fetching products');
  //       return [] as Product[];
  //     }
  //   },
  //   initialData: [] as Product[],
  //   refetchOnWindowFocus: false,
  // });

  useEffect(() => {
    const fetchHelper = async () => {
      const productsData: Product[] = [];
      try {
        const productsJSON = await fetch('https://fakestoreapi.com/products');
        const products: Product[] = await productsJSON.json();

        productsData.push(
          ...products.map((product) => {
            const discount = getRandomBetween(0.2, 0.99);

            return {
              ...product,
              discount,
            };
          })
        );
      } catch (error) {
        console.error('Error in fetching products');
        return [] as Product[];
      }
      setProducts(productsData);
      setIsLoading(false);
    };
    fetchHelper();
  }, []);

  const rupee = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  function getRandomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const toggleCartItem = useCallback((id: number, title: string) => {
    console.log('in toggleCartItem');

    setCart((prev) => {
      console.log('in toggleCartItem - setCart');
      const newCart = prev.filter((item) => item.id !== id);
      if (newCart.length === prev.length) {
        newCart.push({
          id,
          quantity: 1,
        });
        const uiCardId = `product-card-${id}`;
        const uiCardElement = document.getElementById(uiCardId);
        if (uiCardElement) {
          uiCardElement.classList.add('animate-shake');
          setTimeout(() => {
            uiCardElement.classList.remove('animate-shake');
          }, 1000);
        }
        toast.success(
          `${title
            .substring(0, 20)
            .trim()
            .concat(title.length > 20 ? '...' : '')} Added to Cart`
        );
      } else {
        toast.success(
          `${title
            .substring(0, 20)
            .trim()
            .concat(title.length > 20 ? '...' : '')} Removed from Cart`,
          {
            iconTheme: {
              primary: '#f97316',
              secondary: '#fff',
            },
            style: {
              color: '#f97316',
            },
          }
        );
      }

      return newCart;
    });
  }, []);

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
      <CartHeader />
      <div className="grid gap-5 gap-y-8 md:gap-y-10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 w-full max-w-full h-full p-4 mt-4">
        {products.map(({ id, title, price, category, image, discount }) => {
          const isInCart = cart.findIndex((item) => item.id === id);
          return (
            <div
              key={id}
              className="bg-white items-center w-50 md:w-60 xl:w-64 pt-2 pb-4 hover:shadow-xl shadow-black hover:relative rounded-sm group relative"
              id={`product-card-${id}`}
            >
              <div className="w-5/6 mx-auto">
                <img src={image} className="w-full h-full" />
              </div>

              <div className="w-4/5 mx-auto mt-5">
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

                <div className="text-end mt-4 flex justify-end">
                  {isInCart >= 0 ? (
                    <button
                      className="text-red-500 hover:scale-105 bg-red-50 p-1 hover:bg-red-100 hover:rounded-sm rounded-md hover:text-red-600"
                      onClick={() => toggleCartItem(id, title)}
                    >
                      Remove from Cart
                    </button>
                  ) : (
                    <button
                      className="text-orange-500 hover:scale-105 bg-orange-50 p-1 hover:bg-orange-100 hover:rounded-sm rounded-md hover:text-orange-600"
                      onClick={() => toggleCartItem(id, title)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
