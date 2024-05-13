import { useState } from "react";
import PromptStep from "./promptStep";
import { useListingModal } from "@/utils/modalProvider";
import { useReadAigcName } from "@/generated";
import { ModelDetail } from "@/types";

export interface AIGCContent {
  name: string;
  prompt: string;
  seed?: number;
  imageUrl?: string;
}

interface FormAIGCProps {
  modelData: ModelDetail;
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

export default function FormAIGC({ modelData }: FormAIGCProps) {
  const [aigcContent, setAigcContent] = useState<AIGCContent>();
  const [mintedTokenId, setMintedTokenId] = useState<bigint>();

  // const { data: name } = useReadAigcName({
  //   address: modelData.NFTContract as Address,
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
      <PromptStep modelData={modelData} />
    </>
  );
}
