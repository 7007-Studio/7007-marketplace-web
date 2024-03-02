import { RefObject } from "react";
import React from "react";
import { Address, Hash, Hex, http, stringToHex } from "viem";
// import {
//   useAddPolicyToIp,
//   useRegisterRootIp,
//   useWatchPolicyAddedToIpId,
//   useWatchRootIpRegistered,
// } from "@story-protocol/react";

interface ConnectToSPModalProps {
  tokenId: bigint;
  nftContract: Address;
  ipName?: string;
  contentHash?: Hash;
  externalURL?: string;
  onConnect?: () => void;
}

const ConnectToSPModal = React.forwardRef(
  (
    {
      tokenId,
      nftContract,
      ipName = "",
      contentHash = stringToHex("0x", { size: 32 }),
      externalURL = "",
      onConnect,
    }: ConnectToSPModalProps,
    ref
  ) => {
    // const { writeContract: registerRootIp } = useRegisterRootIp();

    // useWatchRootIpRegistered({
    //   onLogs(logs) {
    //     console.log("Root IP registered", logs);
    //     registerRootIp({
    //       args: [
    //         policyId,
    //         nftContract,
    //         tokenId,
    //         ipName,
    //         contentHash,
    //         externalURL,
    //       ],
    //     });
    //   },
    // });

    // const { writeContract: addPolicyToIp } = useAddPolicyToIp();

    // useWatchPolicyAddedToIpId({
    //   onLogs(logs) {
    //     console.log("Root IP registered", logs);
    //     const events = logs as unknown as {
    //       args: { caller: Address; ipId: Address; policyId: bigint };
    //     }[];

    //     addPolicyToIp({
    //       args: [events[0].args.ipId, events[0].args.policyId],
    //     });
    //   },
    // });

    // const {
    //   writeContract: registerRootIp,
    // } = use();

    const handleOnConnect = () => {
      // registerRootIp({
      //   args: [
      //     policyId,
      //     nftContract,
      //     tokenId,
      //     ipName,
      //     contentHash,
      //     externalURL,
      //   ],
      // });
    };

    return (
      <dialog
        ref={ref as RefObject<HTMLDialogElement> | null}
        className="modal"
      >
        <div className="modal-box max-w-[604px] bg-white">
          <div className="flex flex-col justify-center items-center gap-10">
            <div className="px-10 pt-16 text-center">
              <h2 className="text-lg">
                You are registering this asset to Story Protocol
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
                    handleOnConnect();
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
    );
  }
);

ConnectToSPModal.displayName = "ConnectToSPModal";

export default ConnectToSPModal;
