import { RefObject } from "react";
import React from "react";

const ConnectToSPModal = React.forwardRef(
  ({ onConnect }: { onConnect?: () => void }, ref) => (
    <dialog ref={ref as RefObject<HTMLDialogElement> | null} className="modal">
      <div className="modal-box max-w-[604px]">
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="px-10 pt-16 text-center">
            <h2 className="text-lg">
              You are connecting your account to Story Protocol
            </h2>
            <div className="p-10">
              <ul className="w-fit mx-auto text-left list-disc">
                <li>Protect your intellectual Property</li>
                <li>Prove ownership of your artworks</li>
                <li>Disclose AI Usage</li>
                <li>Publish and monetize your art</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-row w-full px-32 gap-4">
            <div className="flex-1">
              <button
                type="button"
                className="btn btn-secondary w-full"
                onClick={() => {
                  (ref as RefObject<HTMLDialogElement>)?.current?.close();
                }}
              >
                Cancel
              </button>
            </div>
            <div className="flex-1">
              <button
                type="button"
                className="btn btn-primary w-full"
                onClick={() => {
                  onConnect?.();
                  (ref as RefObject<HTMLDialogElement>)?.current?.close();
                }}
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  )
);

ConnectToSPModal.displayName = "ConnectToSPModal";

export default ConnectToSPModal;
