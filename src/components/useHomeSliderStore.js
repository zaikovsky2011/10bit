import { create } from 'zustand';

const useHomeSliderStore = create((set) => ({
  animateHomeSlider: true, // изначально true, чтобы запускать анимацию автоматически
  exitAnimationComplete: false, // изначально true, так как считаем, что анимация выхода завершена при первом входе
  toggleAnimateHomeSlider: () => set((state) => ({
    animateHomeSlider: !state.animateHomeSlider,
  })),
  setExitAnimationComplete: (complete) => set({ exitAnimationComplete: complete }),
  setAnimateHomeSlider: (value) => set({ animateHomeSlider: value }),
}));

export default useHomeSliderStore;