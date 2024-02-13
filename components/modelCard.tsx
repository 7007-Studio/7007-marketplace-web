import { AIGC_FACTORY_CONTRACT_ADDRESS } from "@/constants";
import {
  useAigcFactoryDeployedAigTs,
  useAigtMaxSupply,
  useAigtName,
} from "@/generated";
import { concatAddress } from "@/helpers";
import { useRouter } from "next/router";
import Card from "./card";
import HeadingLarge from "./text/headingLarge";

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
    <Card className="max-w-[390px]">
      <div className="p-6">
        <div className="flex justify-between items-center">
          <HeadingLarge>{modelName}</HeadingLarge>
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
            onClick={() => router.push(`/model/${modelIndex}`)}
          >
            Learn More
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ModelCard;
