import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'
import useStore from '../store'

// Target Colors from the prompt:
// Deep Blue -> Cyan -> Purple -> Magenta -> Aqua -> Sunset Gold
const colors = [
  new THREE.Color('#031b4e'), // Deep Blue
  new THREE.Color('#00f0ff'), // Cyan
  new THREE.Color('#7c3aed'), // Purple
  new THREE.Color('#d946ef'), // Magenta
  new THREE.Color('#22d3ee'), // Aqua
  new THREE.Color('#f59e0b'), // Sunset Gold
]

export default function Background3D({ slide }) {
  const { theme } = useStore();
  const isDark = theme === 'dark';

  const waveRef1 = useRef();
  const waveRef2 = useRef();
  const waveRef3 = useRef();
  
  const currentColor = useMemo(() => new THREE.Color(), [])

  useFrame((state) => {
    // We want a slow, seamless 30 second loop
    const t = state.clock.elapsedTime;
    const cycleDuration = 30; 
    const progress = (t % cycleDuration) / cycleDuration;
    
    // Determine which two colors in the array we are interpolating between
    const totalSegments = colors.length;
    const scaledProgress = progress * totalSegments;
    const currentIndex = Math.floor(scaledProgress) % totalSegments;
    const nextIndex = (currentIndex + 1) % totalSegments;
    const lerpFactor = scaledProgress - currentIndex;

    // Smoothly interpolate the color
    currentColor.lerpColors(colors[currentIndex], colors[nextIndex], lerpFactor);

    // Apply soft, elegant wave motion and dynamic colors
    if (waveRef1.current) {
      waveRef1.current.material.emissive.copy(currentColor);
      waveRef1.current.material.color.copy(currentColor);
      waveRef1.current.position.y = -3 + Math.sin(t * 0.3) * 0.8;
      waveRef1.current.rotation.z = Math.sin(t * 0.15) * 0.05;
    }
    if (waveRef2.current) {
      waveRef2.current.material.emissive.copy(currentColor);
      waveRef2.current.position.y = -1 + Math.cos(t * 0.25) * 0.8;
      waveRef2.current.rotation.z = Math.cos(t * 0.1) * 0.05;
    }
    if (waveRef3.current) {
      waveRef3.current.material.emissive.copy(currentColor);
      waveRef3.current.position.y = 1 + Math.sin(t * 0.2) * 0.8;
    }
  });

  return (
    <>
      <color attach="background" args={[isDark ? '#000000' : '#f8fafc']} />
      
      {/* High-contrast lighting for silky reflections */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />

      {/* Layer 1: Background Base Wave (Darker, slower) */}
      <mesh ref={waveRef1} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -3, -15]}>
        <planeGeometry args={[70, 40, 128, 128]} />
        <MeshDistortMaterial 
          distort={0.3} 
          speed={0.8} // Ultra smooth motion
          roughness={0.1} 
          metalness={1} 
          emissiveIntensity={isDark ? 0.6 : 0.3}
          transparent 
          opacity={0.5}
        />
      </mesh>

      {/* Layer 2: Mid-level Silky Flow */}
      <mesh ref={waveRef2} rotation={[-Math.PI / 2.1, 0, 0]} position={[0, -1, -10]}>
        <planeGeometry args={[70, 40, 128, 128]} />
        <MeshDistortMaterial 
          color="#000000" // Black base makes the emissive neon pop beautifully
          distort={0.4} 
          speed={1.2} // Fluid motion
          roughness={0} 
          metalness={1} 
          emissiveIntensity={isDark ? 0.8 : 0.5}
          transparent 
          opacity={0.6}
        />
      </mesh>

      {/* Layer 3: Foreground High-Detail Glowing Ribbons */}
      <mesh ref={waveRef3} rotation={[-Math.PI / 2, 0, 0]} position={[0, 1, -5]}>
        <planeGeometry args={[70, 40, 128, 128]} />
        <MeshDistortMaterial 
          color="#000000"
          distort={0.5} 
          speed={1.5} 
          roughness={0} 
          metalness={1} 
          emissiveIntensity={isDark ? 1.2 : 0.8}
          transparent 
          opacity={0.8}
          wireframe={false}
        />
      </mesh>

      {/* Very faint glowing wireframe to catch the light exactly like silky streaks */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 2, -3]}>
          <planeGeometry args={[70, 40, 64, 64]} />
          <MeshDistortMaterial 
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.1}
            distort={0.4} 
            speed={1} 
            wireframe={true}
            transparent
            opacity={0.1}
          />
        </mesh>
      </Float>
    </>
  )
}
