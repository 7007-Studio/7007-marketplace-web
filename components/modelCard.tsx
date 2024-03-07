import { useRouter } from "next/router";
import { useAccount } from "wagmi";

import { useReadAigcFactoryDeployedAigTs, useReadAigtName } from "@/generated";
import { concatAddress, getContractAddress } from "@/helpers";

import Card from "./ui/card";

export interface ModelCardProps {
  modelIndex: number;
}

const ModelCard: React.FC<ModelCardProps> = ({ modelIndex }) => {
  const router = useRouter();

  const { chainId } = useAccount();
  const aigcFactory = getContractAddress("AIGCFactory", chainId);
  const { data: aigtAddress } = useReadAigcFactoryDeployedAigTs({
    address: aigcFactory,
    args: modelIndex ? [BigInt(modelIndex)] : undefined,
  });

  const { data: modelName } = useReadAigtName({
    address: aigtAddress,
  });

  return (
    <Card className="max-w-[390px]">
      <div
        className="p-6 hover:cursor-pointer"
        onClick={() => router.push(`/collection/${modelIndex}`)}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg mb-4">{modelName}</h2>
        </div>
        {aigtAddress && (
          <div>
            <a
              href={`https://sepolia.etherscan.io/address/${aigtAddress}`}
              target="_blank"
            >
              {concatAddress(aigtAddress)}
            </a>
          </div>
        )}

        <div className="py-6">{/* tags */}</div>

        <div>
          Use stable diffusion model to generate image and music from text
        </div>
        <div className="py-6 grid grid-cols-2 gap-8 border-b border-b-neutral-50">
          <div>
            <div className="pb-1 text-xl leading-6 font-bold text-neutral-300">
              N/A
            </div>
            <div className="text-sm  text-neutral-200">Token Price</div>
          </div>
          <div>
            <div className="pb-1 text-xl leading-6 font-bold text-neutral-300">
              N/A
            </div>
            <div className="text-sm  text-neutral-200">
              24 hrs Trading Volume
            </div>
          </div>
          <div>
            <div className="pb-1 text-xl leading-6 font-bold text-neutral-300">
              N/A
            </div>
            <div className="text-sm  text-neutral-200">AIGC NFT Minted</div>
          </div>
          <div>
            <div className="pb-1 text-xl leading-6 font-bold text-neutral-300">
              N/A
            </div>
            <div className="text-sm  text-neutral-200">Token Holders</div>
          </div>
          <div>
            <div className="pb-1 text-xl leading-6 font-bold text-neutral-300">
              N/A
            </div>
            <div className="text-sm  text-neutral-200">Inference Time</div>
          </div>
        </div>
        <div className="py-6">
          <button
            className="btn btn-secondary w-full"
            onClick={() => router.push(`/collection/${modelIndex}`)}
          >
            Learn More
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ModelCard;
