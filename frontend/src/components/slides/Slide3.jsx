import React from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Float, Sphere, Text } from '@react-three/drei'
import { ShieldAlert, Fingerprint, MapPin, Laptop, Activity, Network, AlertTriangle } from 'lucide-react'

const threats = [
  'Question-paper leakage', 'Student impersonation', 'Credential theft', 
  'Session hijacking', 'Result manipulation', 'Insider threats', 
  'Malware', 'Phishing', 'DDoS attacks', 'Unauthorized access'
]

const evaluates = [
  { icon: Fingerprint, label: 'User Identity' },
  { icon: Laptop, label: 'Device Security' },
  { icon: Activity, label: 'User Role' },
  { icon: MapPin, label: 'Location' },
  { icon: Network, label: 'Network' },
  { icon: Activity, label: 'Behavior' },
  { icon: AlertTriangle, label: 'Risk Score' },
]

function PolicyEngine3D() {
  return (
    <group position={[0, -1, 0]}>
      {/* Central Engine */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1.5, 32, 32]}>
          <meshStandardMaterial color="#00ffff" wireframe />
        </Sphere>
        <Text position={[0, 2.5, 0]} fontSize={0.5} color="#00ffff" anchorX="center">
          Zero Trust Policy Engine
        </Text>
      </Float>

      {/* Decision Nodes */}
      <Float speed={1.5} floatIntensity={2} position={[-4, 0, 0]}>
        <Sphere args={[0.5]}><meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.5} /></Sphere>
        <Text position={[0, -1, 0]} fontSize={0.3} color="#22c55e">ACCESS GRANTED</Text>
      </Float>
      
      <Float speed={1.2} floatIntensity={1.5} position={[0, -3, 0]}>
        <Sphere args={[0.5]}><meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={0.5} /></Sphere>
        <Text position={[0, -1, 0]} fontSize={0.3} color="#eab308">RE-AUTHENTICATION</Text>
      </Float>

      <Float speed={2.5} floatIntensity={3} position={[4, 0, 0]}>
        <Sphere args={[0.5]}><meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.8} /></Sphere>
        <Text position={[0, -1, 0]} fontSize={0.3} color="#ef4444">ACCESS DENIED</Text>
      </Float>
    </group>
  )
}

export default function Slide3() {
  return (
    <div className="w-full h-full flex flex-col pt-10 px-8 relative">
      <div className="absolute inset-0 -z-10 opacity-30">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
          <PolicyEngine3D />
        </Canvas>
      </div>

      <div className="flex flex-col lg:flex-row h-full gap-8">
        {/* Section A: Challenges */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
            <ShieldAlert /> Cybersecurity Challenges
          </h2>
          <div className="crystal-card p-6 flex-1 flex flex-col relative overflow-hidden">
            {/* Animated Threat visual */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-3xl rounded-full mix-blend-screen animate-pulse" />
            
            <div className="grid grid-cols-2 gap-3 z-10">
              {threats.map((threat, i) => (
                <motion.div 
                  key={threat}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-red-950/40 border border-red-900/50 text-red-200 text-sm py-2 px-3 rounded-lg flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" /> {threat}
                </motion.div>
              ))}
            </div>
            
            <div className="mt-auto pt-6 text-center z-10">
              <p className="text-slate-400 text-sm">Traditional perimeter defenses fail because threats exist both outside and inside the network.</p>
            </div>
          </div>
        </div>

        {/* Section B: Zero Trust Solution */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-right">
            Zero Trust Solution
          </h2>
          <div className="crystal-card p-6 flex-1 border-t-4 border-t-cyan-500 relative">
            <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent mb-8">
              “Never Trust, Always Verify.”
            </h1>
            
            <p className="text-center text-slate-300 mb-6">Zero Trust continuously evaluates before granting access:</p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {evaluates.map((ev, i) => (
                <motion.div 
                  key={ev.label}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex flex-col items-center justify-center p-3 bg-slate-900/60 rounded-xl border border-cyan-800 shadow-[0_0_10px_rgba(0,255,255,0.05)] w-24 h-24"
                >
                  <ev.icon size={28} className="text-cyan-400 mb-2" />
                  <span className="text-[10px] text-center text-cyan-100 font-medium">{ev.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Architecture Flow */}
            <div className="mt-8 flex items-center justify-between text-xs font-mono text-cyan-500 bg-slate-950 p-3 rounded-lg border border-cyan-900 overflow-hidden">
               <span className="text-cyan-200">User/Device</span> <span className="animate-pulse">→</span>
               <span>Verify</span> <span className="animate-pulse">→</span>
               <span>Analyze Context</span> <span className="animate-pulse">→</span>
               <span className="text-cyan-200">Policy Engine</span> <span className="animate-pulse">→</span>
               <span>Decision</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
