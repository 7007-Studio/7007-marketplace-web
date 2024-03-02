import { useMemo } from "react";
import { useAccount } from "wagmi";

import { useReadAigcFactoryModelIndexCurrent } from "@/generated";
import AIGTEntry from "@/components/aigtEntry";
import { getContractAddress } from "@/helpers";

export default function MarketPlace() {
  const { chainId } = useAccount();
  const aigcFactory = getContractAddress("AIGCFactory", chainId);

  const { data: modelIndex } = useReadAigcFactoryModelIndexCurrent({
    address: aigcFactory,
  });

  const modelIndexList = useMemo(() => {
    const ids: number[] = [];
    if (!modelIndex) return ids;

    for (let i = 1; i <= Number(modelIndex); i++) {
      ids.push(i);
    }
    return ids;
  }, [modelIndex]);

  return (
    <div className="container mx-auto mt-12 flex min-h-screen flex-col p-4 lg:p-20 py-16">
      <h1 className="text-3xl mb-10 font-bold text-white">
        7007Lab Governance
      </h1>
      <div className="flex md:justify-center py-8 overflow-x-auto bg-[#191717]">
        <table className="table max-w-2xl">
          <thead>
            <tr>
              <th>Model name</th>
              <th>Proposals</th>
              <th>Holders</th>
              <th>Voters</th>
            </tr>
          </thead>
          <tbody>
            {modelIndexList.map((i) => (
              <AIGTEntry key={i} modelIndex={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
