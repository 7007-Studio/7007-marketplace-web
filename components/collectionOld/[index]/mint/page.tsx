// "use client";

// import { useParams } from "next/navigation";
// // import { useAccount } from "wagmi";
// import FormAIGC from "@/components/formAIGC";
// import useNftContracts from "@/hooks/useNftContracts";
// import { useAccount } from "wagmi";
// // import useNftContracts from "@/hooks/useNftContracts";

// export default function MintPage() {
//   const { index } = useParams<{ index: string }>() || {};
//   // console.log('index', index)

//   const { chain } = useAccount();
//   //TODO: hardcode modelIndex
//   const { nftContract } = useNftContracts({
//     chainId: chain?.id,
//   });

//   return (
//     <div className="h-full w-[80%]">
//       {nftContract && <FormAIGC modelIndex={index} nftContract={nftContract} />}
//     </div>
//   );
// }
