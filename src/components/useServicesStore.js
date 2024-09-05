// useServicesStore.js
import { create } from 'zustand';

const useServicesStore = create((set) => ({
  animateServices: true, // изначально true, чтобы запускать анимацию автоматически
  exitAnimationComplete: true, // изначально true, так как считаем, что анимация выхода завершена при первом входе
  toggleAnimateServices: () => set((state) => ({
    animateServices: !state.animateServices,
  })),
  setExitAnimationComplete: (complete) => {
    set({ exitAnimationComplete: complete });
    // После завершения анимации выхода установим animateServices в true для повторного запуска анимации
    if (complete) {
      set({ animateServices: true });
    }
  },
}));

export default useServicesStore;