import { useState } from "react";
import { useRouter } from "next/navigation";
import { Address } from "viem";

import PromptStep from "./promptStepNoContract";
import MintStep from "./mintStep";
import CompleteStep from "./completeStep";
import { useListingModal } from "@/utils/modalProvider";
import { useReadAigcName } from "@/generated";

export interface AIGCContent {
  name: string;
  prompt: string;
  seed?: number;
  imageUrl?: string;
}

interface FormAIGCProps {
  nftContract: Address;
}

// export default function FormAIGC({ nftContract }: FormAIGCProps) {
//   const [aigcContent, setAigcContent] = useState<AIGCContent>();
//   const [mintedTokenId, setMintedTokenId] = useState<bigint>();

//   const { data: name } = useReadAigcName({
//     address: nftContract,
//   });

//   const { showListingModal } = useListingModal();

//   if (!aigcContent) {
//     return (
//       <PromptStep
//         nftContract={nftContract}
//         setAigcContent={setAigcContent}
//         onArtGenerated={(_aigcContent) => {
//           setAigcContent(_aigcContent);
//         }}
//       />
//     );
//   }

//   if (!mintedTokenId) {
//     return (
//       <MintStep
//         nftContract={nftContract}
//         aigcContent={aigcContent}
//         setAigcContent={setAigcContent}
//         onMintSuccess={(tokenId) => {
//           setMintedTokenId(tokenId);
//         }}
//       />
//     );
//   }

//   return (
//     <>
//       <CompleteStep
//         nftContract={nftContract}
//         mintedTokenId={mintedTokenId}
//         onList={() => {
//           showListingModal({
//             nftContract: nftContract,
//             name: name || "",
//             tokenId: mintedTokenId,
//             metadata: { name: aigcContent.name },
//           });
//         }}
//         onGenerateAgain={() => {
//           setAigcContent(undefined);
//           setMintedTokenId(undefined);
//         }}
//       />
//     </>
//   );
// }

export default function FormAIGC() {
  const [aigcContent, setAigcContent] = useState<AIGCContent>();
  const [mintedTokenId, setMintedTokenId] = useState<bigint>();

  // const { data: name } = useReadAigcName({
  //   address: nftContract,
  // });

  const { showListingModal } = useListingModal();

  // if (!aigcContent) {
  //   return (
  //     <PromptStep />
  //   );
  // }

  // if (!mintedTokenId) {
  //   return (
  //     <MintStep
  //       // nftContract={nftContract}
  //       aigcContent={aigcContent}
  //       setAigcContent={setAigcContent}
  //       onMintSuccess={(tokenId) => {
  //         setMintedTokenId(tokenId);
  //       }}
  //     />
  //   );
  // }

  return (
    <>
      <PromptStep />
    </>
  );
}
