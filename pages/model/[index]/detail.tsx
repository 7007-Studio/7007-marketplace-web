import { Inter } from "next/font/google";
import ModelDetail from "@/components/modelDetail";
import ModelCard from "@/components/modelCard";
import NFTCard from "@/components/nftCard";
import { useRouter } from "next/router";
import { MOCK_MARKETPLACE_DATA } from "@/constants";
import { isModel ,isNFT} from "@/helpers";

const inter = Inter({ subsets: ["latin"] });

export default function Detail() {
  const router = useRouter();
  const { index } = router.query;

  const mockItems = MOCK_MARKETPLACE_DATA;
  const targModel = mockItems.find((item) => {
    return isModel(item) && item.modelIndex === Number(index);
  })
  
  return (
    <main className=" mx-auto w-[85vw]">
      <div className="flex items-center justify-center flex-col my-10">
        <ModelDetail imageUrl={targModel?.imageUrl as string}/>
      </div>
      <h2 className="text-white font-bold text-2xl mb-10">More</h2>
      <div className="flex items-start flex-wrap justify-center gap-6 mb-10">
      {mockItems.map((item) => {
          if (isModel(item)){
            return (
              <ModelCard 
                modelName="NOV 012"
                modelAddress="0x123...abc"
                totalSupply={1000}
                nftMint={500}
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
                modelIndex={item.modelIndex}
                key={item.modelIndex}
              /> 
            )
          }else if(isNFT(item)){
            return (
              <NFTCard 
                key={item.tokenID}
                title={item.title}
                description={item.description}
                nftAddress={item.nftAddress}
                tokenID={item.tokenID}
                openseaLink={item.openseaLink}
                imageUrl={item.imageUrl}
                nftName={item.nftName}
                modelName={item.modelName}
              />
            )
        }})}
      </div>
    </main>
  );
}
