import create from 'zustand';

const useGetImageStore = create((set) => ({
    uploadImages: [],
    setUploadImages: (newImages) => { set({ uploadImages: newImages }) },
}));

// Define a store for the collection description
const useCollectionDescriptionStore = create((set) => ({
    collectionDescription: '',
    setCollectionDescription: (description) => set({ collectionDescription: description }),
  }));
  
  // Define a store for the total supply
  const useTotalSupplyStore = create((set) => ({
    totalSupply: '',
    setTotalSupply: (supply) => set({ totalSupply: supply }),
  }));
  
  // Define a store for the creator earnings percentage
  const useCreatorEarningsStore = create((set) => ({
    creatorEarnings: '',
    setCreatorEarnings: (earnings) => set({ creatorEarnings: earnings }),
  }));

  // Define a store for the creator earnings percentage
  const useCreatorModelNameStore = create((set) => ({
    creatorModelName: '',
    setcreatorModelName: (name) => set({ creatorModelName: name }),
  }));
  
  export { useCollectionDescriptionStore, useTotalSupplyStore, useCreatorEarningsStore, useGetImageStore, useCreatorModelNameStore };