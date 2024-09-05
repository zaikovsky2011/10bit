import { create } from 'zustand';

const useOnScreenStore = create((set) => ({
  visibleId: "",
  setVisibleId: (id) => set({ visibleId: id }),
}));

export default useOnScreenStore;