import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Float, Box, Text } from '@react-three/drei'
import { ChevronDown, ChevronUp, Trophy } from 'lucide-react'

const advantages = [
  { title: 'Confidential Examination Data Protection', desc: 'Ensures encrypted, just-in-time delivery of question papers.' },
  { title: 'Continuous Authentication', desc: 'Validates identity not just at login, but throughout the entire exam session.' },
  { title: 'Least Privilege Access', desc: 'Users only access what they strictly need for their current task.' },
  { title: 'Strong Identity Verification', desc: 'MFA and biometric integrations are native to the architecture.' },
  { title: 'Insider Threat Protection', desc: 'Assumes the network is already compromised; even internal nodes are untrusted.' },
  { title: 'Secure Remote Examinations', desc: 'Location-agnostic security allows safe off-campus exams.' },
  { title: 'Alignment with Modern Standards', desc: 'Complies with NIST SP 800-207 and modern cybersecurity mandates.' }
]

const models = [
  { name: 'TCB', desc: 'Focuses mainly on trusted hardware/software components.', color: '#ef4444', height: 1.5 },
  { name: 'Implicit Trust', desc: 'Trusts users implicitly after the initial login barrier.', color: '#f97316', height: 1 },
  { name: 'Explicit Trust', desc: 'Requires explicit rules but often lacks continuous dynamic verification.', color: '#eab308', height: 2 },
  { name: 'Hierarchical Trust', desc: 'Useful for roles but relies heavily on rigid organizational hierarchy.', color: '#3b82f6', height: 2.5 },
  { name: 'Zero Trust', desc: 'Recommended. Continuous, dynamic, least-privilege verification.', color: '#00ffff', height: 4, glow: true }
]

function BarGraph3D() {
  return (
    <group position={[0, -2, 0]}>
      {models.map((model, i) => {
        const xPos = (i - 2) * 1.5
        return (
          <Float key={model.name} speed={1.5} floatIntensity={0.5} position={[xPos, model.height / 2, 0]}>
            <Box args={[1, model.height, 1]}>
              <meshStandardMaterial 
                color={model.color} 
                emissive={model.glow ? model.color : '#000000'} 
                emissiveIntensity={model.glow ? 0.8 : 0} 
                wireframe={!model.glow}
              />
            </Box>
            <Text position={[0, model.height / 2 + 0.3, 0]} fontSize={0.2} color={model.glow ? '#00ffff' : '#ffffff'} anchorX="center">
              {model.name}
            </Text>
          </Float>
        )
      })}
    </group>
  )
}

export default function Slide5() {
  const [expandedIndex, setExpandedIndex] = useState(null)

  return (
    <div className="w-full h-full flex flex-col pt-6 relative">
      <h2 className="text-3xl font-bold text-cyan-400 text-center mb-6">Why Zero Trust Was Chosen</h2>
      
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        
        {/* Left: 7 Interactive Crystal Cards */}
        <div className="w-full lg:w-1/2 flex flex-col gap-3 overflow-y-auto pr-2 pb-20">
          {advantages.map((adv, i) => {
            const isExpanded = expandedIndex === i
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="crystal-card cursor-pointer border border-cyan-800/50 hover:border-cyan-400"
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
              >
                <div className="p-4 flex justify-between items-center">
                  <h3 className="font-semibold text-cyan-100">{adv.title}</h3>
                  {isExpanded ? <ChevronUp className="text-cyan-500" /> : <ChevronDown className="text-cyan-700" />}
                </div>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4 text-sm text-slate-300"
                    >
                      {adv.desc}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Right: Trust Model Comparison & 3D Visualization */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="crystal-card p-6 flex flex-col justify-center items-center relative h-64 border-t-4 border-t-cyan-400 overflow-hidden">
            <h3 className="text-xl font-bold text-white mb-2 z-10 flex items-center gap-2">
              <Trophy className="text-yellow-400" /> ZERO TRUST — RECOMMENDED
            </h3>
            
            <div className="absolute inset-0 z-0 opacity-80">
              <Canvas camera={{ position: [0, 2, 8] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 10, 5]} intensity={1} />
                <BarGraph3D />
              </Canvas>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 overflow-y-auto pb-20">
            {models.filter(m => !m.glow).map(model => (
              <div key={model.name} className="bg-slate-900/60 border border-slate-700 p-3 rounded-xl text-sm">
                <span className="font-bold text-slate-200">{model.name}:</span> <span className="text-slate-400">{model.desc}</span>
              </div>
            ))}
            <div className="bg-slate-900/60 border border-slate-700 p-3 rounded-xl text-sm">
              <span className="font-bold text-slate-200">Web of Trust:</span> <span className="text-slate-400">Better suited for decentralized peer trust, not centralized universities.</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-700 p-3 rounded-xl text-sm">
              <span className="font-bold text-slate-200">Hybrid Trust:</span> <span className="text-slate-400">Flexible but introduces massive architectural complexity.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
