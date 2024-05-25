"use client";

import BuyNFTModal, { BuyNFT } from "@/components/modal/buyNFTModal";
import ListingNFTModal, {
  ListingNFT,
} from "@/components/modal/listingNFTModal";
import { ReactNode, createContext, useContext, useRef, useState } from "react";

let ModalContext = createContext({
  showListingModal: (l: ListingNFT) => {},
  showBuyModal: (l: BuyNFT) => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const listingNFTModalRef = useRef<HTMLDialogElement>(null); // Initialize listingNFTModalRef
  const buyNFTModalRef = useRef<HTMLDialogElement>(null); // Initialize listingNFTModalRef

  const [listingNFT, setListingNFT] = useState<ListingNFT>();
  const [buyNFT, setBuyNFT] = useState<BuyNFT>();
  const showListingModal = (l: ListingNFT) => {
    setListingNFT(l);
    listingNFTModalRef.current?.showModal();
  };
  const showBuyModal = (l: BuyNFT) => {
    setBuyNFT(l);
    buyNFTModalRef.current?.showModal();
  };

  return (
    <ModalContext.Provider value={{ showListingModal, showBuyModal }}>
      {children}

      <ListingNFTModal ref={listingNFTModalRef} listingNFT={listingNFT} />
      <BuyNFTModal ref={buyNFTModalRef} buyNFT={buyNFT} />
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
export const useBuyModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
