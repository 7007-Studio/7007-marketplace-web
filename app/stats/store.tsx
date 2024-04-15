import create from 'zustand';

const useModelInfoStore = create((set) => ({
    model: {},
    setModel: (modelData) => { set({ model: modelData }) },
}));

export { useModelInfoStore };