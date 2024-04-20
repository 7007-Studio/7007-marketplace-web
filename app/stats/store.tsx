import create from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

const useModelInfoStore = create(
    // Add the persist middleware with the storage engine
    persist(
      (set) => ({
        model: {},
        setModel: (modelData) => set({ model: modelData }),
      }),
      {
        name: 'model-info-store', // Name for the persisted storage
        storage: createJSONStorage(() => sessionStorage), 
      }
    )
  );
  
  export { useModelInfoStore };