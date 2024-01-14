import { AIGC_FACTORY_CONTRACT_ADDRESS } from "@/constants";
import {
  useAigcFactoryDeployedAigCs,
  useAigcFactoryDeployedAigTs,
  useAigtMaxSupply,
  useAigtName,
} from "@/generated";
import { concatAddress } from "@/helpers";
import { useRouter } from "next/router";

export interface ModelCardProps {
  modelIndex: number;
}

const ModelCard: React.FC<ModelCardProps> = ({ modelIndex }) => {
  const router = useRouter();

  const { data: aigtAddress } = useAigcFactoryDeployedAigTs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
    args: [BigInt(modelIndex)],
  });

  const { data: modelName } = useAigtName({
    address: aigtAddress,
  });
  const { data: maxSupply } = useAigtMaxSupply({
    address: aigtAddress,
  });

  return (
    <div
      onClick={() => router.push(`/model/${modelIndex}`)}
      className="card w-full max-w-full h-fit bg-black text-white shadow-lg overflow-hidden hover:scale-[1.02] hover:outline outline-cyan-500 outline-2 transition hover:cursor-pointer"
    >
      <div className="flex justify-between items-center">
        {aigtAddress && (
          <div className="badge badge-info m-4 p-3">
            <a
              href={`https://sepolia.etherscan.io/address/${aigtAddress}`}
              target="_blank"
            >
              {concatAddress(aigtAddress)}
            </a>
          </div>
        )}
      </div>
      <figure>
        <img src="/nft1.png" alt={modelName} className="w-full object-cover" />
      </figure>

      <div className="p-4 mt-7">
        <h2 className="text-2xl mb-4 font-bold">{modelName}</h2>
        <p className="mb-4 text-zinc-400">
          Use stable diffusion model to generate image and music from text
        </p>
        {maxSupply !== undefined && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="">Token Supply</h2>
            <span className="text-primary text-sm">{Number(maxSupply)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelCard;
