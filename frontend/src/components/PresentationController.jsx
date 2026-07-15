import React, { useEffect } from 'react'
import useStore from '../store'
import { Play, Pause, Maximize, SkipForward, SkipBack, RotateCcw, Moon, Sun, Home } from 'lucide-react'

export default function PresentationController() {
  const { 
    currentSlide, totalSlides, nextSlide, prevSlide, setSlide,
    isPlaying, togglePlay, isFullscreen, setFullscreen, theme, toggleTheme 
  } = useStore()

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowRight':
        case ' ':
          nextSlide(); break;
        case 'ArrowLeft':
          prevSlide(); break;
        case 'Home':
          setSlide(1); break;
        case 'End':
          setSlide(totalSlides); break;
        case 'p':
        case 'P':
          togglePlay(); break;
        case 'f':
        case 'F':
          toggleFullscreen(); break;
        case 'Escape':
          if (isFullscreen) toggleFullscreen(); break;
        default:
          break;
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, setSlide, totalSlides, togglePlay, isFullscreen])

  // Auto-play logic
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        if (currentSlide < totalSlides) {
          nextSlide();
        } else {
          togglePlay(); // Stop when reaching the end
        }
      }, 5000); // 5 seconds per slide for demo purposes
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentSlide, totalSlides, nextSlide, togglePlay])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setFullscreen(true))
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setFullscreen(false))
      }
    }
  }

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-4 flex flex-col gap-2 pointer-events-none">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-md">
        <div 
          className="h-full bg-cyan-400 shadow-[0_0_10px_#00ffff] transition-all duration-500 ease-out"
          style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center px-4 py-3 crystal-card pointer-events-auto">
        <div className="flex items-center gap-4 text-cyan-50 font-medium">
          <button onClick={() => setSlide(1)} className="hover:text-cyan-400 transition-colors" title="Home">
            <Home size={20} />
          </button>
          <span>Slide {currentSlide} / {totalSlides}</span>
        </div>
        
        <div className="flex items-center gap-6 text-cyan-100">
          <button onClick={prevSlide} disabled={currentSlide === 1} className="hover:text-cyan-400 transition-colors disabled:opacity-30">
            <SkipBack size={24} />
          </button>
          
          <button onClick={togglePlay} className="hover:text-cyan-400 transition-colors bg-white/5 p-2 rounded-full">
            {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
          </button>
          
          <button onClick={nextSlide} disabled={currentSlide === totalSlides} className="hover:text-cyan-400 transition-colors disabled:opacity-30">
            <SkipForward size={24} />
          </button>
        </div>
        
        <div className="flex items-center gap-4 text-cyan-50">
          <button onClick={() => { setSlide(1); if(!isPlaying) togglePlay(); }} className="hover:text-cyan-400 transition-colors" title="Restart">
            <RotateCcw size={20} />
          </button>
          <button onClick={toggleTheme} className="hover:text-cyan-400 transition-colors" title="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={toggleFullscreen} className="hover:text-cyan-400 transition-colors" title="Fullscreen">
            <Maximize size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
