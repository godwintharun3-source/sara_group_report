import React from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Float, Sphere, MeshTransmissionMaterial, Html } from '@react-three/drei'
import useStore from '../../store'

function CrystalShield() {
  return (
    <group position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh>
          {/* A diamond/shield shape */}
          <octahedronGeometry args={[2, 0]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={2}
            chromaticAberration={0.025}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color="#00ffff"
            attenuationDistance={0.5}
            attenuationColor="#ffffff"
          />
        </mesh>
        <Html center position={[0, 0, 0]}>
          <div className="text-6xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">🎓</div>
        </Html>
      </Float>
      
      {/* Floating Icons */}
      {['🔐', '🛡️', '💻', '☁️', '📝', '🔑', '🌐'].map((icon, i) => {
        const angle = (i / 7) * Math.PI * 2
        return (
          <Float key={i} speed={1.5 + Math.random()} rotationIntensity={2} floatIntensity={2}>
            <Html position={[Math.cos(angle) * 4, Math.sin(angle) * 3, -2]}>
              <div className="text-4xl opacity-70 blur-[1px] hover:blur-0 transition-all cursor-default">
                {icon}
              </div>
            </Html>
          </Float>
        )
      })}
    </group>
  )
}

export default function Slide1() {
  const { nextSlide, setFullscreen, togglePlay } = useStore()

  const lifecycle = ['Registration', 'Authentication', 'Scheduling', 'Distribution', 'Examination', 'Submission', 'Evaluation', 'Results']

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      
      {/* 3D Element Container Removed as per request */}

      <div className="z-10 w-full max-w-5xl flex flex-col gap-8 mt-24">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="crystal-card p-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-4">
            Digital Examination System for Universities Using the Zero Trust Model
          </h1>
          <h2 className="text-xl md:text-2xl font-light text-cyan-100/80 mb-6">
            A Cybersecurity Architecture Proposal for Secure University Examinations
          </h2>
          
          <p className="text-sm md:text-base text-slate-300 max-w-4xl mx-auto leading-relaxed">
            A Digital Examination System is a centralized platform that manages the complete university examination lifecycle, including student registration, authentication, exam scheduling, secure question-paper distribution, online examination delivery, answer submission, evaluation, result generation, and academic record management.
          </p>
        </motion.div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full"
        >
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-xs md:text-sm font-semibold text-cyan-200">
            {lifecycle.map((step, idx) => (
              <React.Fragment key={step}>
                <span className="bg-slate-900/80 px-3 py-1.5 rounded-full border border-cyan-500/30 shadow-[0_0_10px_rgba(0,255,255,0.1)]">
                  {step}
                </span>
                {idx < lifecycle.length - 1 && <span className="text-cyan-500">→</span>}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-6 mt-8"
        >
          <button 
            onClick={() => { togglePlay(); nextSlide(); }}
            className="flex items-center gap-2 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-bold transition-all shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:shadow-[0_0_30px_rgba(0,255,255,0.6)]"
          >
            <span>▶</span> Start Presentation
          </button>
          <button 
            onClick={() => document.documentElement.requestFullscreen().then(() => setFullscreen(true))}
            className="flex items-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-cyan-100 rounded-full font-bold transition-all border border-cyan-500/30"
          >
            <span>⛶</span> Enter Full Screen
          </button>
        </motion.div>
      </div>
    </div>
  )
}
