import Tabs from "@/components/tabs";
import Card from "@/components/card";

export default function Home() {
  const items = [1, 2, 3]; // get from contract

  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="text-2xl font-bold">Marketplace</h1>
      <Tabs />
      <div className="flex gap-4">
        {items.map((item) => (
          <Card key={item} />
        ))}
      </div>
    </main>
  );
}
