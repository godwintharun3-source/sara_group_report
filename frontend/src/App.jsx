import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'
import useStore from './store'
import PresentationController from './components/PresentationController'

// We will import slides dynamically or statically.
import Slide1 from './components/slides/Slide1'
import Slide2 from './components/slides/Slide2'
import Slide3 from './components/slides/Slide3'
import Slide4 from './components/slides/Slide4'
import Slide5 from './components/slides/Slide5'
import Slide6 from './components/slides/Slide6'
import Slide7 from './components/slides/Slide7'
import Slide8 from './components/slides/Slide8'
import Slide9 from './components/slides/Slide9'
import Slide10 from './components/slides/Slide10'

// Background component that runs continuous Three.js liquid-water
import Background3D from './components/Background3D'

function SlideRenderer({ currentSlide }) {
  const slides = {
    1: <Slide1 />,
    2: <Slide2 />,
    3: <Slide3 />,
    4: <Slide4 />,
    5: <Slide5 />,
    6: <Slide6 />,
    7: <Slide7 />,
    8: <Slide8 />,
    9: <Slide9 />,
    10: <Slide10 />
  }

  // Define the varied transitions requested
  const getTransition = (slideNum) => {
    switch (slideNum) {
      case 1: return { initial: { scale: 0.8, opacity: 0, filter: 'blur(20px)' }, animate: { scale: 1, opacity: 1, filter: 'blur(0px)' }, exit: { scale: 1.2, opacity: 0 } } // Cinematic Crystal Reveal
      case 2: return { initial: { rotateY: -90, opacity: 0 }, animate: { rotateY: 0, opacity: 1 }, exit: { rotateY: 90, opacity: 0 } } // 3D Horizontal Flip
      case 3: return { initial: { opacity: 0, filter: 'brightness(2)' }, animate: { opacity: 1, filter: 'brightness(1)' }, exit: { opacity: 0, filter: 'brightness(0)' } } // Crystal Dissolve
      case 4: return { initial: { rotateX: 45, opacity: 0 }, animate: { rotateX: 0, opacity: 1 }, exit: { rotateX: -45, opacity: 0 } } // Perspective Rotation
      case 5: return { initial: { opacity: 0, backdropFilter: 'blur(0px)' }, animate: { opacity: 1, backdropFilter: 'blur(10px)' }, exit: { opacity: 0 } } // Glass Morph
      case 6: return { initial: { rotate3d: [1,1,0, 90], opacity: 0 }, animate: { rotate3d: [1,1,0, 0], opacity: 1 }, exit: { rotate3d: [1,1,0, -90], opacity: 0 } } // 3D Cube Rotation
      case 7: return { initial: { clipPath: 'inset(100% 0 0 0)' }, animate: { clipPath: 'inset(0% 0 0 0)' }, exit: { clipPath: 'inset(0 0 100% 0)' } } // Security Scanner Reveal
      case 8: return { initial: { scale: 3, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } } // Depth Zoom
      case 9: return { initial: { y: '100%', opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: '-100%', opacity: 0 } } // Liquid Wave Reveal
      case 10: return { initial: { filter: 'hue-rotate(90deg)', opacity: 0 }, animate: { filter: 'hue-rotate(0deg)', opacity: 1 }, exit: { scale: 0.8, opacity: 0 } } // Cinematic Crystal Closing
      default: return { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    }
  }

  const anim = getTransition(currentSlide)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSlide}
        initial={anim.initial}
        animate={anim.animate}
        exit={anim.exit}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-10 flex items-center justify-center p-4 pb-20"
        style={{ perspective: 1000 }}
      >
        {slides[currentSlide]}
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  const { currentSlide, theme } = useStore()
  
  // Theme application
  React.useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme')
    } else {
      document.body.classList.remove('light-theme')
    }
  }, [theme])

  return (
    <div className={`relative w-full h-screen overflow-hidden ${theme === 'dark' ? 'liquid-bg text-slate-100' : 'bg-slate-50 text-slate-900'}`}>

      {/* Flowing Image Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-no-repeat animate-wave-pan"
        style={{ 
          backgroundImage: "url('/assets/smooth_wave.jpg')",
          opacity: theme === 'dark' ? 0.6 : 0.4,
        }}
      />
      
      {/* Dynamic Flowing Color Gradient Overlay */}
      <div className="absolute inset-0 z-0 opacity-80 mix-blend-color animate-gradient-flow" />

      <SlideRenderer currentSlide={currentSlide} />
      <PresentationController />
      <Loader />
    </div>
  )
}

export default App
