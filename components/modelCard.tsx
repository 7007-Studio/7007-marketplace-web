import Link from "next/link";

export interface ModelCardProps {
  modelName: string;
  modelAddress: string;
  totalSupply: number;
  nftMint: number;
  title: string;
  description: string;
}

const ModelCard: React.FC<ModelCardProps> = ({
  modelName,
  modelAddress,
  totalSupply,
  nftMint,
  title,
  description,
}) => {
  return (
    <Link href={`/model/1/detail`}>
      <div className="card w-80 bg-black text-white rounded-lg shadow-lg overflow-hidden hover:scale-[1.02] hover:outline outline-cyan-500 outline-2	 transition">
        <div className="flex justify-between items-center">
          <h2 className="card-title p-4">{modelName}</h2>
          <div className="badge badge-info m-4 p-3">{modelAddress}</div>
        </div>
        <figure>
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>

        {/* Content */}
        <div className="p-4 mt-7">
          <h2 className="text-2xl mb-4 font-bold">{title}</h2>
          <p className="mb-4 text-zinc-400">{description}</p>
          <div className="bg-black text-white  flex items-center justify-between ">
            <h2 className="">Token Supply</h2>
            <span className="text-cyan-400 text-sm">
              {nftMint} / {totalSupply}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ModelCard;
