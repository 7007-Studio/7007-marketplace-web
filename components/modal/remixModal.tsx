import React, { RefObject, useState } from "react";
import { Address } from "viem";
import { AIGCContent } from "../formAIGC";
import MintStep from "../formAIGC/mintStep";

export interface RemixModalProp {
  modelIndex: number | string;
  aigtAddress: Address;
  aigcAddress: Address;
  aigcContent: AIGCContent;
  setAigcContent: (aigcContent?: AIGCContent) => void;
  onMintSuccess: (tokenId: string | number) => void;
}

const RemixModal = React.forwardRef(
  (
    {
      modelIndex,
      aigtAddress,
      aigcAddress,
      aigcContent,
      setAigcContent,
      onMintSuccess,
    }: RemixModalProp,
    ref
  ) => {
    const [mintedTokenId, setMintedTokenId] = useState<string | number>();

    return (
      <dialog
        ref={ref as RefObject<HTMLDialogElement> | null}
        className="modal"
      >
        <MintStep
          modelIndex={modelIndex}
          aigtAddress={aigtAddress}
          aigcAddress={aigcAddress}
          aigcContent={aigcContent}
          setAigcContent={setAigcContent}
          onMintSuccess={(tokenId) => {
            setMintedTokenId(tokenId);
          }}
        />
      </dialog>
    );
  }
);

RemixModal.displayName = "RemixModal";

export default RemixModal;
