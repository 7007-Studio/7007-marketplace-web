import { Inter } from "next/font/google";
import ModelDetail from "@/components/modelDetail";
import ModelCard from "@/components/modelCard";

const inter = Inter({ subsets: ["latin"] });

export default function Detail() {
  const items = [1, 2, 3,4];

  return (
    <main className=" mx-auto w-[85vw]">
      <div className="flex items-center justify-center flex-col my-10">
        <ModelDetail />
      </div>
      <h2 className="text-white font-bold text-2xl mb-10">More</h2>
      <div className="flex items-start flex-wrap justify-center gap-6 mb-10">
        {items.map((item) => (
          <ModelCard 
            modelName="NOV 012"
            modelAddress="0x123...abc"
            totalSupply={1000}
            nftMint={500}
            title="Tama d’Amore Per Nata"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet pulvinar sit amet id. Venenatis auctor vel turpis quis integer at risus."
            key={item}
          /> 
          ))}
    </div>
    </main>
  );
}
