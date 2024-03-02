import React, { RefObject } from "react";
import PromptForm from "../formAIGC/promptForm";
import { AIGCContent } from "../formAIGC";

interface EditPromptModalProps {
  aigcContent: AIGCContent;
  setAigcContent: (aigcContent: AIGCContent) => void;
}

const EditPromptModal = React.forwardRef(
  ({ aigcContent, setAigcContent }: EditPromptModalProps, ref) => {
    return (
      <dialog
        ref={ref as RefObject<HTMLDialogElement> | null}
        className="modal"
      >
        <div className="modal-box max-w-[904px] py-16 px-20 bg-white">
          <h2 className="heading-lg mb-12">Edit prompt</h2>
          <PromptForm
            submitText="Generate"
            defaultValues={{
              name: aigcContent.name,
              prompt: aigcContent.prompt,
            }}
            onArtGenerated={(_aigcContent) => {
              setAigcContent(_aigcContent);
              (ref as RefObject<HTMLDialogElement>)?.current?.close();
            }}
          />
        </div>
      </dialog>
    );
  }
);

EditPromptModal.displayName = "EditPromptModal";

export default EditPromptModal;
