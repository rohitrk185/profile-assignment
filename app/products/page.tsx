import { Product } from '@/types/product';

export default async function Products() {
  const productsData: Product[] = await fetch(
    'https://fakestoreapi.com/products'
  )
    .then((res) => res.json())
    .then((json) => json)
    .catch(() => [] as Product[]);

  console.log(productsData);

  const rupee = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  function getRandomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  return (
    <div className="grid gap-5 gap-y-8 md:gap-y-10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 w-full h-full p-4 mt-4">
      {productsData.map(
        ({ id, title, price, description, category, image }) => {
          const discount = getRandomBetween(0.2, 0.99);
          return (
            <div
              key={id}
              className="bg-white items-center w-50 md:w-60 lg:w-80 pt-2 pb-4 hover:shadow-xl shadow-black hover:relative rounded-sm group"
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
                  <button className="text-orange-500 hover:scale-105 bg-orange-50 p-1 hover:bg-orange-100 hover:rounded-sm rounded-md hover:text-orange-600">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
