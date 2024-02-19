import { AIGC_FACTORY_CONTRACT_ADDRESS } from "@/constants";
import { useReadAigcFactoryDeployedAigTs, useReadAigtName } from "@/generated";
import { useRouter } from "next/router";
import React from "react";

interface TableRowProps {
  modelIndex: number;
}

const AIGTEntry: React.FC<TableRowProps> = ({ modelIndex }) => {
  const router = useRouter();

  const { data: deployedAigt } = useReadAigcFactoryDeployedAigTs({
    address: AIGC_FACTORY_CONTRACT_ADDRESS,
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
