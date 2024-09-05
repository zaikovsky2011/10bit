import { create } from 'zustand';

const useSliderStore = create((set) => ({
  currentSlide: 0,
  totalSlides: 5,
  isPaused: false,
  nextSlide: () =>
    set((state) => ({
      currentSlide: (state.currentSlide + 1) % state.totalSlides,
    })),
  prevSlide: () =>
    set((state) => ({
      currentSlide: (state.currentSlide - 1 + state.totalSlides) % state.totalSlides,
    })),
  pauseSlideShow: () => set({ isPaused: true }), // Обновляем isPaused на true
  playSlideShow: () => set({ isPaused: false }), // Обновляем isPaused на false
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  goToSlide: (index) => set({ currentSlide: index }),
}));

export default useSliderStore;
