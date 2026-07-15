import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Maximize2, Home, BookOpen, ChevronUp, ChevronDown } from 'lucide-react'
import useStore from '../../store'

const futureScope = [
  '🤖 AI-Based Behavioral Anomaly Detection', '🔑 Passwordless Authentication', 
  '🧬 Biometric Verification', '🧠 Adaptive Authentication', 
  '👁️ Advanced Remote Proctoring', '🤖 AI-Assisted Cheating Detection', 
  '⛓️ Blockchain-Backed Audit Trails', '☁️ Cloud-Native Zero Trust', 
  '🔐 Post-Quantum Cryptography Readiness'
]

const references = [
  '1. NIST SP 800-207 — Zero Trust Architecture',
  '2. CISA Zero Trust Maturity Model',
  '3. Google BeyondCorp',
  '4. Microsoft Zero Trust Guidance',
  '5. OMB Memorandum M-22-09',
  '6. Sandhu et al. — Role-Based Access Control Models',
  '7. NIST SP 800-63B — Digital Identity Guidelines'
]

export default function Slide10() {
  const [refsOpen, setRefsOpen] = useState(false)
  const { setSlide, setFullscreen } = useStore()

  const conclusionSteps = ['Identity Verification', 'Continuous Authentication', 'Least Privilege', 'Risk-Based Access', 'Continuous Monitoring']

  return (
    <div className="w-full h-full flex flex-col items-center pt-8 relative overflow-hidden">
      
      {/* Background Decorative */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent pointer-events-none -z-10" />

      <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 text-center mb-8 max-w-4xl leading-tight">
        Zero Trust provides a strong, scalable, and future-ready security foundation for Digital Examination Systems.
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl h-full pb-20">
        
        {/* Left: Future Scope */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 text-center">Future Scope / Potential Enhancements</h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
            {futureScope.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="crystal-card p-3 text-sm text-cyan-100 hover:text-white"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Center: Conclusion Animation */}
        <div className="w-full lg:w-1/3 flex flex-col items-center justify-center crystal-card p-8 border-t-4 border-t-cyan-500">
          <div className="flex flex-col items-center gap-2 mb-6">
            {conclusionSteps.map((step, i) => (
              <React.Fragment key={step}>
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.5 }}
                  className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-full text-sm font-bold text-slate-300"
                >
                  {step}
                </motion.div>
                {i < conclusionSteps.length - 1 && <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: (i*0.5)+0.2 }} className="text-cyan-500 font-bold">+</motion.div>}
              </React.Fragment>
            ))}
          </div>
          
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 3, type: 'spring' }} className="text-cyan-500 text-2xl font-bold mb-4">↓</motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 3.5, type: 'spring' }}
            className="text-2xl font-extrabold text-white text-center mb-8 drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]"
          >
            🛡️ SECURE DIGITAL EXAMINATIONS
          </motion.h2>

          <motion.h3 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5 }}
            className="text-lg font-bold text-cyan-300 text-center uppercase tracking-wider"
          >
            “Never Trust. Always Verify. Secure Every Examination.”
          </motion.h3>
        </div>

        {/* Right: References & Controls */}
        <div className="w-full lg:w-1/3 flex flex-col justify-end gap-4">
          
          <div className="crystal-card overflow-hidden">
             <button onClick={() => setRefsOpen(!refsOpen)} className="w-full p-4 flex justify-between items-center bg-slate-900/50 hover:bg-slate-800 transition-colors text-cyan-200 font-bold">
               <span className="flex items-center gap-2"><BookOpen size={18}/> References</span>
               {refsOpen ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
             </button>
             <AnimatePresence>
               {refsOpen && (
                 <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="px-4 pb-4 bg-slate-900/50">
                   <ul className="text-xs text-slate-400 space-y-2 mt-2">
                     {references.map((ref, i) => <li key={i}>{ref}</li>)}
                   </ul>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button onClick={() => setSlide(1)} className="crystal-card p-3 flex flex-col items-center justify-center gap-2 text-cyan-200 hover:text-white hover:border-cyan-500 transition-colors">
              <Home size={24} /> <span className="text-xs font-bold">Return to Start</span>
            </button>
            <button onClick={() => {setSlide(1); window.location.reload();}} className="crystal-card p-3 flex flex-col items-center justify-center gap-2 text-cyan-200 hover:text-white hover:border-cyan-500 transition-colors">
              <RotateCcw size={24} /> <span className="text-xs font-bold">Restart Presentation</span>
            </button>
            <button onClick={() => document.documentElement.requestFullscreen().then(() => setFullscreen(true))} className="crystal-card p-3 flex flex-col items-center justify-center gap-2 text-cyan-200 hover:text-white hover:border-cyan-500 transition-colors col-span-2">
              <Maximize2 size={24} /> <span className="text-xs font-bold">Full Screen</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
