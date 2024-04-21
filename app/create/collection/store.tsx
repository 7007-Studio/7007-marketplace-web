import create from 'zustand';

interface ImageStoreState {
  uploadImages: string[]; // Assuming you store image URLs or paths
  setUploadImages: (newImages: string[]) => void;
}

const useGetImageStore = create<ImageStoreState>((set) => ({
    uploadImages: [],
    setUploadImages: (newImages) => { set({ uploadImages: newImages }) },
}));


  export { useGetImageStore };