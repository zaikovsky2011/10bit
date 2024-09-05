import { create } from 'zustand';

const useTransitionStore = create((set) => ({
  animateTransition: JSON.parse(localStorage.getItem('animateTransition')) ?? true,
  exitAnimationComplete: false,
  isTransitioning: false,
  isInitialAnimationAllowed: true,
  toggleAnimateTransition: () => set((state) => {
    const newAnimateTransition = !state.animateTransition;
    localStorage.setItem('animateTransition', JSON.stringify(newAnimateTransition));
    return { animateTransition: newAnimateTransition };
  }),
  setExitAnimationComplete: (complete) => set({ exitAnimationComplete: complete }),
  setAnimateTransition: (value) => {
    localStorage.setItem('animateTransition', JSON.stringify(value));
    set({ animateTransition: value });
  },
  setIsTransitioning: (value) => set({ isTransitioning: value }),
  setIsInitialAnimationAllowed: (value) => set({ isInitialAnimationAllowed: value }),
}));

export default useTransitionStore;