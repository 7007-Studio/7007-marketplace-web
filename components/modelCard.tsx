import { useRouter } from "next/router";

export interface ModelCardProps {
  modelName: string;
  modelAddress: string;
  totalSupply: number;
  nftMint: number;
  title: string;
  description: string;
  imageUrl: string;
}

const ModelCard: React.FC<ModelCardProps> = ({
  modelName,
  modelAddress,
  totalSupply,
  nftMint,
  title,
  description,
  imageUrl,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/model/${modelAddress}/aigc/1/detail`)}
      className="card w-80 max-w-full h-fit bg-black text-white shadow-lg overflow-hidden hover:scale-[1.02] hover:outline outline-cyan-500 outline-2 transition hover:cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <h2 className="card-title p-4">{modelName}</h2>
        <div className="badge badge-info m-4 p-3">{modelAddress}</div>
      </div>
      <figure>
        <img
          src={imageUrl}
          alt={`Image of ${modelName}`}
          className="w-full object-cover"
        />
      </figure>

      <div className="p-4 mt-7">
        <h2 className="text-2xl mb-4 font-bold">{title}</h2>
        <p className="mb-4 text-zinc-400">{description}</p>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="">Token Supply</h2>
          <span className="text-primary text-sm">
            {nftMint} / {totalSupply}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
