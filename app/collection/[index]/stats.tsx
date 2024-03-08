import useReadAigcContracts from "@/hooks/useReadAigcContracts";
import { Address, zeroAddress } from "viem";

export default function Stats({
  nftContract = zeroAddress,
}: {
  nftContract?: Address;
}) {
  const statItems = [
    {
      name: "Total volume",
      value: "1000 eth",
    },
    {
      name: "Floor price",
      value: "0.49 eth",
    },
    {
      name: "Total quantity",
      value: "8888",
    },
    {
      name: "Listed",
      value: "8888",
    },
    {
      name: "Owners",
      value: "8888",
    },
    {
      name: "Accumulated profit",
      value: "500 eth",
    },
  ];
  const { tokenId: minted } = useReadAigcContracts({ nftContract });
  return (
    <div className="flex flex-row gap-4 py-8">
      {statItems.map((s) => {
        return (
          <div
            key={s.name}
            className="min-w-[120px] p-4 border border-black border-solid"
          >
            <div>{s.name}</div>
            <div className="font-bold">{s.value}</div>
          </div>
        );
      })}
    </div>
  );
}
