import React, { RefObject, useState } from "react";
import { Address, stringToHex } from "viem";
import { AIGCContent } from "../formAIGC";
import MintStep from "../formAIGC/mintStep";
import { useRegisterDerivativeIp } from "@story-protocol/react";

export interface RemixModalProp {
  modelIndex: number | string;
  aigtAddress: Address;
  nftContract: Address;
  original: AIGCContent;
  licenseId?: bigint;
}

const RemixModal = React.forwardRef(
  (
    {
      modelIndex,
      aigtAddress,
      nftContract,
      original,
      licenseId,
    }: RemixModalProp,
    ref
  ) => {
    const [aigcContent, setAigcContent] = useState<AIGCContent>(original);
    const [mintedTokenId, setMintedTokenId] = useState<string | number>();

    const { writeContract: registerDerivativeIp } = useRegisterDerivativeIp();

    return (
      <dialog
        ref={ref as RefObject<HTMLDialogElement> | null}
        className="modal"
      >
        <MintStep
          modelIndex={modelIndex}
          aigtAddress={aigtAddress}
          aigcAddress={nftContract}
          aigcContent={aigcContent}
          setAigcContent={(a) => {
            if (a) setAigcContent(a);
          }}
          onMintSuccess={(tokenId) => {
            setMintedTokenId(tokenId);
            if (!licenseId) return;

            registerDerivativeIp({
              args: [
                [licenseId],
                nftContract as Address, // nftContract
                BigInt(tokenId),
                "7007 AIGC Derivative", //ipName,
                stringToHex("0x", { size: 32 }), //contentHash,
                "https://www.7007.studio/", //externalURL,
                stringToHex("0x", { size: 32 }), //royaltyContext
              ],
            });
          }}
        />
      </dialog>
    );
  }
);

RemixModal.displayName = "RemixModal";

export default RemixModal;
