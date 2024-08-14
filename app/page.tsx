import Products from './products/page';

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-between bg-green-200 text-black">
      <Products />
    </main>
  );
}
