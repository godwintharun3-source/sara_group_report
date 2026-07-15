import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Box, Sphere, Text, Float, Line, Html, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import useStore from '../../store'

// 1. 3D Security Comparison Graph (Bar Graph)
const graphData = [
  { label: 'Access Protection', traditional: 4, zeroTrust: 9 },
  { label: 'Credential Theft', traditional: 3, zeroTrust: 9 },
  { label: 'Insider Threat', traditional: 2, zeroTrust: 8 },
  { label: 'Question Leakage', traditional: 5, zeroTrust: 9 },
  { label: 'Session Hijacking', traditional: 3, zeroTrust: 10 },
  { label: 'Remote Security', traditional: 4, zeroTrust: 9 },
]

function BarGraph3D() {
  const [hovered, setHovered] = useState(null)

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={[-5, -1, 0]} scale={[0.4, 0.4, 0.4]}>
        {/* Title */}
        <Text position={[0, 12, 0]} fontSize={1.2} color="#00ffff" anchorX="center">Security Metrics</Text>
        
        {/* Base Grid */}
        <gridHelper args={[24, 12, '#334155', '#1e293b']} position={[0, -0.01, 0]} />
        
        {/* Legend */}
        <group position={[0, 0, -8]}>
          <Box args={[0.8, 0.8, 0.8]} position={[-4, 0.4, 0]}><meshStandardMaterial color="#ef4444" /></Box>
          <Text position={[-3.2, 0.4, 0]} fontSize={0.8} anchorX="left" color="white">Traditional</Text>
          
          <Box args={[0.8, 0.8, 0.8]} position={[2, 0.4, 0]}><meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} /></Box>
          <Text position={[2.8, 0.4, 0]} fontSize={0.8} anchorX="left" color="white">Zero Trust</Text>
        </group>

        {graphData.map((data, i) => {
          // Increased spacing dramatically to prevent label overlap
          const xPos = (i - 2.5) * 3.8
          const isHovered = hovered === data.label

          return (
            <group key={data.label} position={[xPos, 0, 0]}>
              {/* Traditional Bar */}
              <Box 
                args={[1.2, data.traditional, 1.2]} 
                position={[-0.7, data.traditional / 2, 0]}
                onPointerOver={(e) => { e.stopPropagation(); setHovered(data.label) }}
                onPointerOut={() => setHovered(null)}
              >
                <meshStandardMaterial color={isHovered ? '#f87171' : '#ef4444'} roughness={0.2} metalness={0.5} />
              </Box>
              
              {/* Zero Trust Bar */}
              <Box 
                args={[1.2, data.zeroTrust, 1.2]} 
                position={[0.7, data.zeroTrust / 2, 0]}
                onPointerOver={(e) => { e.stopPropagation(); setHovered(data.label) }}
                onPointerOut={() => setHovered(null)}
              >
                <meshStandardMaterial color={isHovered ? '#67e8f9' : '#00ffff'} emissive="#00ffff" emissiveIntensity={0.6} roughness={0.1} metalness={0.8} />
              </Box>
              
              {/* Label - Tilted beautifully on the ground for perfect readability */}
              <Text 
                position={[0, 0.1, 2.5]} 
                fontSize={0.6} 
                anchorX="left" 
                anchorY="middle"
                color="#cbd5e1" 
                rotation={[-Math.PI/2, 0, -Math.PI/4]} // Diagonal on the floor
              >
                {data.label}
              </Text>

              {/* High-end Glassmorphic Tooltip */}
              {isHovered && (
                <Html position={[0, Math.max(data.traditional, data.zeroTrust) + 2, 0]} center zIndexRange={[100,0]}>
                  <div className="crystal-card !rounded-lg !border-cyan-500/50 p-3 text-xs whitespace-nowrap text-white pointer-events-none transform scale-125">
                    <strong className="text-cyan-300 block mb-1">{data.label}</strong>
                    Traditional: <span className="text-red-400">{data.traditional}/10</span><br/>
                    Zero Trust: <span className="text-cyan-400">{data.zeroTrust}/10</span>
                  </div>
                </Html>
              )}
            </group>
          )
        })}
      </group>
    </Float>
  )
}

// 2. 3D Zero Trust Pie Chart
const pieData = [
  { label: 'Computer Science', value: 40, color: '#06b6d4' }, // cyan-500
  { label: 'Administration', value: 30, color: '#3b82f6' }, // blue-500
  { label: 'Engineering', value: 20, color: '#8b5cf6' }, // violet-500
  { label: 'Library', value: 10, color: '#10b981' }, // emerald-500
]

function PieChart3D() {
  const [hovered, setHovered] = useState(null)
  
  const slices = []
  let currentStart = 0
  pieData.forEach(data => {
    const angle = (data.value / 100) * Math.PI * 2
    slices.push({ ...data, startAngle: currentStart, angle })
    currentStart += angle
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group position={[5, -1, 0]} scale={[0.45, 0.45, 0.45]}>
        {/* Title */}
        <Text position={[0, 10.5, 0]} fontSize={1.1} color="#00ffff" anchorX="center">Adoption by Department</Text>
        
        {/* Base Grid */}
        <gridHelper args={[16, 12, '#334155', '#1e293b']} position={[0, -0.01, 0]} />

        <group position={[0, 2, 0]} rotation={[Math.PI / 4, 0, 0]}>
          {slices.map((slice) => {
            const isHovered = hovered === slice.label
            const midAngle = slice.startAngle + slice.angle / 2
            // Pull the slice outward slightly if hovered for a nice interactive effect
            const offset = isHovered ? 0.8 : 0
            const x = Math.cos(midAngle) * offset
            const z = -Math.sin(midAngle) * offset

            return (
              <group 
                key={slice.label} 
                position={[x, 0, z]}
                onPointerOver={(e) => { e.stopPropagation(); setHovered(slice.label) }}
                onPointerOut={() => setHovered(null)}
              >
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[4, 4, 2, 64, 1, false, slice.startAngle, slice.angle]} />
                  <meshStandardMaterial 
                    color={slice.color} 
                    metalness={0.6} 
                    roughness={0.1} 
                    emissive={slice.color} 
                    emissiveIntensity={isHovered ? 0.8 : 0.3} 
                  />
                </mesh>
                
                {/* Tooltip */}
                {isHovered && (
                  <Html position={[Math.cos(midAngle) * 5, 3, -Math.sin(midAngle) * 5]} center zIndexRange={[100,0]}>
                    <div className="crystal-card !rounded-lg !border-cyan-500/50 p-3 text-xs whitespace-nowrap text-white pointer-events-none transform scale-125">
                      <strong style={{color: slice.color}} className="block mb-1">{slice.label}</strong>
                      Adoption Rate: {slice.value}%
                    </div>
                  </Html>
                )}
              </group>
            )
          })}
        </group>

        {/* Pie Chart Legend */}
        <group position={[-4, 0, 8]}>
          {pieData.map((data, i) => (
            <group key={data.label} position={[0, 0, i * 2]}>
              <Box args={[0.8, 0.8, 0.8]} position={[0, 0.4, 0]}>
                <meshStandardMaterial color={data.color} emissive={data.color} emissiveIntensity={0.6} />
              </Box>
              <Text position={[1.2, 0.4, 0]} fontSize={0.7} anchorX="left" color="white">{data.label} ({data.value}%)</Text>
            </group>
          ))}
        </group>
      </group>
    </Float>
  )
}

// 3. 3D Zero Trust Network
const nodes = [
  { id: 'students', label: 'Students 🧑‍🎓', pos: [-5, 2, 2], color: '#3b82f6' },
  { id: 'faculty', label: 'Faculty 👨‍🏫', pos: [-5, -2, -2], color: '#3b82f6' },
  { id: 'admin', label: 'Admins 🧑‍💼', pos: [-3, 4, -5], color: '#3b82f6' },
  { id: 'invigilator', label: 'Invigilators 👁️', pos: [3, 4, -5], color: '#3b82f6' },
  { id: 'cloud', label: 'Cloud ☁️', pos: [5, 2, 2], color: '#8b5cf6' },
  { id: 'qbank', label: 'Question Bank 📝', pos: [5, -2, -2], color: '#f59e0b' },
  { id: 'results', label: 'Result DB 📊', pos: [0, -5, 5], color: '#f59e0b' },
]

function Network3D() {
  const engineRef = useRef()
  
  useFrame((state) => {
    if (engineRef.current) {
      engineRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <group scale={[0.8, 0.8, 0.8]} position={[0, 1, 0]}>
      {/* Central Engine */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={engineRef} args={[2.5, 64, 64]} position={[0,0,0]}>
          <meshStandardMaterial color="#00ffff" wireframe emissive="#00ffff" emissiveIntensity={0.5} />
        </Sphere>
        <Text position={[0, 3.5, 0]} fontSize={0.6} color="#00ffff" anchorX="center">
          ZERO TRUST POLICY ENGINE
        </Text>
      </Float>

      {/* Nodes and Connections */}
      {nodes.map(node => (
        <group key={node.id}>
          {/* Connection Line */}
          <Line points={[[0,0,0], node.pos]} color="#1e293b" lineWidth={2} dashed dashSize={0.2} gapSize={0.1} />
          
          <Float speed={1.5} floatIntensity={1.5}>
            <Sphere args={[0.8, 32, 32]} position={node.pos}>
              <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.4} roughness={0.1} metalness={0.8} />
            </Sphere>
            <Html position={node.pos} center distanceFactor={25}>
              <div className="crystal-card !border-cyan-500/50 !rounded-full px-4 py-2 whitespace-nowrap text-white pointer-events-none">
                {node.label}
              </div>
            </Html>
            
            {/* Animated Packet */}
            <mesh position={node.pos}>
              <sphereGeometry args={[0.25]} />
              <meshBasicMaterial color="#22c55e" />
            </mesh>
          </Float>
        </group>
      ))}
    </group>
  )
}

export default function Slide8() {
  const [view, setView] = useState('graphs') // 'graphs' or 'network'
  const { theme } = useStore()

  // Determine ideal camera position based on view
  const cameraPos = view === 'graphs' ? [0, 8, 22] : [0, 4, 18]

  return (
    <div className="w-full h-full flex flex-col pt-4 pb-12">
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 text-center mb-6 drop-shadow-lg">
        3D Visualization & Analytics
      </h2>
      
      <div className="flex justify-center gap-6 mb-6 z-20">
        <button onClick={() => setView('graphs')} className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${view === 'graphs' ? 'bg-cyan-600 text-white shadow-[0_0_20px_rgba(0,255,255,0.6)] scale-105' : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 backdrop-blur-md'}`}>
          3D Graphs & Analytics
        </button>
        <button onClick={() => setView('network')} className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${view === 'network' ? 'bg-fuchsia-600 text-white shadow-[0_0_20px_rgba(217,70,239,0.6)] scale-105' : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 backdrop-blur-md'}`}>
          3D Zero Trust Network
        </button>
      </div>

      <div className="flex-1 crystal-card relative overflow-hidden group">
        <div className="absolute top-6 left-6 z-10 text-sm text-cyan-200 font-mono bg-slate-900/60 backdrop-blur-md p-3 rounded-xl border border-cyan-500/30 shadow-lg">
          {view === 'graphs' ? '📊 Illustrative Demo Data' : '🌐 Interactive Zero Trust Topology'}
          <br/><span className="text-slate-400 text-xs">(Drag to rotate, Scroll to zoom)</span>
        </div>

        {/* Adding key={view} forces Canvas to remount when switching views, guaranteeing proper camera reset */}
        <Canvas key={view} camera={{ position: cameraPos, fov: 45 }}>
          <ambientLight intensity={theme === 'dark' ? 0.6 : 1.2} />
          <directionalLight position={[10, 20, 10]} intensity={2} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#4338ca" />
          
          <OrbitControls 
            makeDefault 
            minDistance={8} 
            maxDistance={40} 
            maxPolarAngle={Math.PI/2 - 0.05} // Prevent camera from going strictly under the floor
            target={[0, 0, 0]}
            enableDamping
            dampingFactor={0.05}
          />
          
          {/* Beautiful glossy floor shadow reflection */}
          <ContactShadows 
            position={[0, -2.5, 0]} 
            opacity={0.8} 
            scale={40} 
            blur={2} 
            far={10} 
            resolution={512} 
            color="#000000" 
          />

          {view === 'graphs' ? (
            <group position={[0, -0.5, 0]}>
              <BarGraph3D />
              <PieChart3D />
            </group>
          ) : (
            <Network3D />
          )}
        </Canvas>
      </div>
    </div>
  )
}
