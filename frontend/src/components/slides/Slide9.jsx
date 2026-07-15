import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Float, Tetrahedron, Text } from '@react-three/drei'
import { CheckCircle2 } from 'lucide-react'

const advantages = [
  'Protects confidential question papers', 'Prevents student impersonation', 
  'Detects suspicious logins', 'Supports secure remote examinations', 
  'Reduces insider threats', 'Enforces RBAC', 'Supports MFA', 
  'Protects examination results', 'Improves cybersecurity compliance', 'Strengthens the CIA Triad'
]

const roadmapPhases = [
  { id: 1, title: 'Requirements Analysis', goal: 'Define Scope', tasks: 'Analyze current system, identify security gaps.', outcome: 'Detailed Architecture Document' },
  { id: 2, title: 'System Architecture', goal: 'Design ZT Framework', tasks: 'Map data flows, define micro-perimeters.', outcome: 'Zero Trust Blueprint' },
  { id: 3, title: 'Identity & Access Management', goal: 'Establish Identities', tasks: 'Deploy SSO, directory services integration.', outcome: 'Centralized IAM' },
  { id: 4, title: 'MFA + RBAC', goal: 'Secure Access', tasks: 'Configure policies for roles, enforce MFA.', outcome: 'Strict Access Controls' },
  { id: 5, title: 'Zero Trust Policy Engine', goal: 'Dynamic Decisioning', tasks: 'Deploy policy engine, integrate risk signals.', outcome: 'Automated Access Engine' },
  { id: 6, title: 'Digital Exam Module', goal: 'Build Core App', tasks: 'Develop examination portal, secure storage.', outcome: 'Functional Exam App' },
  { id: 7, title: 'Continuous Monitoring', goal: 'Visibility', tasks: 'Setup SIEM, log analytics.', outcome: 'Real-time Security Dashboard' },
  { id: 8, title: 'Security Testing', goal: 'Validation', tasks: 'Pen testing, threat modeling, audits.', outcome: 'Vulnerability Report' },
  { id: 9, title: 'Pilot Deployment', goal: 'Beta Testing', tasks: 'Run mock exams with select departments.', outcome: 'Performance Metrics' },
  { id: 10, title: 'University Deployment', goal: 'Go Live', tasks: 'Migrate all departments, train staff.', outcome: 'Fully Operational System' },
  { id: 11, title: 'AI Risk Detection', goal: 'Enhance Intelligence', tasks: 'Integrate ML models for anomaly detection.', outcome: 'Predictive Security' },
  { id: 12, title: 'Future Enhancement', goal: 'Continuous Improvement', tasks: 'Post-quantum readiness, biometric auth.', outcome: 'Future-proof Architecture' }
]

function CIATriad() {
  return (
    <group position={[0, -1, 0]}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <Tetrahedron args={[2, 0]}>
          <meshPhysicalMaterial 
            color="#00ffff"
            transmission={0.9}
            opacity={1}
            metalness={0.1}
            roughness={0.1}
            ior={1.5}
            thickness={2}
          />
        </Tetrahedron>
        
        {/* Labels on vertices conceptually */}
        <Text position={[0, 2.5, 0]} fontSize={0.3} color="#ffffff">Integrity 🛡️</Text>
        <Text position={[-2, -1.5, 2]} fontSize={0.3} color="#ffffff">Confidentiality 🔒</Text>
        <Text position={[2, -1.5, 2]} fontSize={0.3} color="#ffffff">Availability ⚡</Text>
      </Float>
    </group>
  )
}

export default function Slide9() {
  const [activePhase, setActivePhase] = useState(roadmapPhases[0])

  return (
    <div className="w-full h-full flex flex-col pt-6">
      <h2 className="text-3xl font-bold text-cyan-400 text-center mb-6">Advantages & Implementation Roadmap</h2>
      
      <div className="flex flex-col lg:flex-row gap-6 h-full max-h-[75vh]">
        
        {/* Left: Advantages & CIA Triad */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="crystal-card p-4 flex-1 overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">Key Advantages</h3>
            <ul className="space-y-2">
              {advantages.map((adv, i) => (
                <motion.li 
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  key={i} className="flex items-start gap-2 text-sm text-cyan-100"
                >
                  <CheckCircle2 size={16} className="text-cyan-500 shrink-0 mt-0.5" />
                  <span>{adv}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div className="crystal-card h-64 relative border-t-2 border-t-cyan-500 overflow-hidden">
             <div className="absolute top-2 left-0 w-full text-center text-sm font-bold text-cyan-300 z-10">The CIA Triad</div>
             <Canvas camera={{ position: [0, 0, 8] }}>
               <ambientLight intensity={1} />
               <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" />
               <CIATriad />
             </Canvas>
          </div>
        </div>

        {/* Right: Interactive Roadmap */}
        <div className="w-full lg:w-2/3 crystal-card p-6 flex flex-col relative overflow-hidden">
          <h3 className="text-xl font-bold text-white mb-6">Implementation Roadmap</h3>
          
          {/* Curved glowing path representation (simplified for 2D UI) */}
          <div className="flex-1 flex flex-col md:flex-row gap-6">
             <div className="flex-1 overflow-y-auto pr-4 relative">
               {/* Line */}
               <div className="absolute left-[15px] top-4 bottom-4 w-1 bg-slate-800 rounded-full">
                 <div className="w-full bg-cyan-400 shadow-[0_0_10px_#00ffff]" style={{ height: `${(activePhase.id / 12) * 100}%`, transition: 'height 0.5s ease' }} />
               </div>
               
               <div className="space-y-4">
                 {roadmapPhases.map((phase, i) => {
                   const isPast = activePhase.id >= phase.id
                   const isActive = activePhase.id === phase.id
                   return (
                     <div key={phase.id} className="relative pl-10 cursor-pointer" onClick={() => setActivePhase(phase)}>
                       <div className={`absolute left-0 top-1 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all z-10 ${isActive ? 'bg-cyan-500 border-cyan-300 text-slate-900 shadow-[0_0_15px_#00ffff] scale-110' : isPast ? 'bg-cyan-900 border-cyan-500 text-cyan-300' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>
                         {phase.id}
                       </div>
                       <div className={`transition-all ${isActive ? 'text-cyan-300 font-bold text-lg' : isPast ? 'text-cyan-100/80 text-base' : 'text-slate-500 text-sm'}`}>
                         Phase {phase.id}: {phase.title}
                       </div>
                     </div>
                   )
                 })}
               </div>
             </div>

             <div className="flex-1 flex flex-col justify-center">
               <motion.div 
                 key={activePhase.id}
                 initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                 className="bg-slate-900/80 border border-cyan-800 rounded-2xl p-6 shadow-xl"
               >
                 <div className="inline-block bg-cyan-950 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold mb-4 border border-cyan-800">Phase {activePhase.id}</div>
                 <h4 className="text-2xl font-bold text-white mb-2">{activePhase.title}</h4>
                 <div className="space-y-4 mt-6">
                   <div><strong className="text-slate-400 text-sm uppercase">Goal</strong><p className="text-cyan-100">{activePhase.goal}</p></div>
                   <div><strong className="text-slate-400 text-sm uppercase">Main Tasks</strong><p className="text-cyan-100">{activePhase.tasks}</p></div>
                   <div><strong className="text-slate-400 text-sm uppercase">Expected Outcome</strong><p className="text-green-400 font-bold">{activePhase.outcome}</p></div>
                 </div>
               </motion.div>
             </div>
          </div>
        </div>

      </div>
    </div>
  )
}
