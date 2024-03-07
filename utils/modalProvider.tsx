"use client";

import ListingNFTModal, {
  ListingNFT,
} from "@/components/modal/listingNFTModal";
import { ReactNode, createContext, useContext, useRef, useState } from "react";

let ModalContext = createContext({
  showListingModal: (l: ListingNFT) => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const listingNFTModalRef = useRef<HTMLDialogElement>(null); // Initialize listingNFTModalRef

  const [listingNFT, setListingNFT] = useState<ListingNFT>();
  const showListingModal = (l: ListingNFT) => {
    setListingNFT(l);
    listingNFTModalRef.current?.showModal();
  };

  return (
    <ModalContext.Provider value={{ showListingModal }}>
      {children}

      <ListingNFTModal ref={listingNFTModalRef} listingNFT={listingNFT} />
    </ModalContext.Provider>
  );
};

export const useListingModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
