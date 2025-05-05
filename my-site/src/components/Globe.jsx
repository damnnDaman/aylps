import React, { useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

function Earth() {
  const earthRef = useRef()
  // Load the texture
  const [colorMap] = useLoader(THREE.TextureLoader, [
    '/textures/earth.gif'
  ])

  // Rotate the globe slowly
  useFrame(({ clock }) => {
    earthRef.current.rotation.y = clock.getElapsedTime() * 0.3
  })

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[1, 60, 64]} />
      <meshStandardMaterial
        map={colorMap}
        metalness={0.4}
        roughness={1}
      />
    </mesh>
  )
}

export default function GlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 50 }}
      style={{ width: '100%', height: '100vh' }}
    >
      {/* Ambient + directional light */}
      <ambientLight intensity={0.8} />
      <directionalLight
        color="white"
        intensity={0.8}
        position={[5, 3, 5]}
      />

      {/* Stars in the background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
      />

      {/* Earth mesh */}
      <Earth />

      {/* Mouse/touch controls */}
      <OrbitControls
        enableZoom={true}
        zoomSpeed={0.6}
        rotateSpeed={0.2}
      />
    </Canvas>
  )
}
