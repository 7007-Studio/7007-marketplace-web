import Tabs from "@/components/tabs";
import Card from "@/components/card";

export default function Home() {
  const items = [1, 2, 3,4,5,6,7];

  return (
    <main className="flex min-h-screen jus flex-col p-20 py-16 mx-auto w-[85vw] ">
      <h1 className="text-2xl font-bold">Marketplace</h1>
      <Tabs />
      <div className="flex flex-wrap justify-center gap-6 ">
        {items.map((item) => (
            <Card key={item} />
        ))}
      </div>
    </main>
  );
}
