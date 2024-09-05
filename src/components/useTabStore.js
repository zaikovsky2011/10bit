import { create } from 'zustand';

const useTabStore = create((set) => ({
  activeTab: 0,
  setActiveTab: (tab) => set({ activeTab: tab }),
  handleScroll: (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  },
}));

export default useTabStore;