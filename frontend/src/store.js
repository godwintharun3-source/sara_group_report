import { create } from 'zustand'

const useStore = create((set) => ({
  currentSlide: 1,
  totalSlides: 10,
  isPlaying: false,
  isFullscreen: false,
  theme: 'dark',
  demoActive: false,
  
  nextSlide: () => set((state) => ({ 
    currentSlide: Math.min(state.currentSlide + 1, state.totalSlides) 
  })),
  
  prevSlide: () => set((state) => ({ 
    currentSlide: Math.max(state.currentSlide - 1, 1) 
  })),
  
  setSlide: (slideNum) => set({ currentSlide: slideNum }),
  
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  setFullscreen: (val) => set({ isFullscreen: val }),
  
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  
  setDemoActive: (val) => set({ demoActive: val, isPlaying: val ? false : false })
}))

export default useStore
