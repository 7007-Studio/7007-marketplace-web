import React from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

import { useReadAigcFactoryDeployedAigTs, useReadAigtName } from "@/generated";
import { getContractAddress } from "@/helpers";

interface TableRowProps {
  modelIndex: number;
}

const AIGTEntry: React.FC<TableRowProps> = ({ modelIndex }) => {
  const router = useRouter();

  const { chainId } = useAccount();
  const aigcFactory = getContractAddress("AIGCFactory", chainId);

  const { data: deployedAigt } = useReadAigcFactoryDeployedAigTs({
    address: aigcFactory,
    args: [BigInt(modelIndex)],
  });

  const { data: modelName } = useReadAigtName({
    address: deployedAigt,
  });

  return (
    <tr
      className="hover:cursor-pointer hover:text-primary"
      onClick={() => router.push(`/model/${modelIndex}/governance`)}
    >
      <td>{modelName}</td>
      <td>2</td>
      <td>5</td>
      <td>3</td>
    </tr>
  );
};

export default AIGTEntry;
