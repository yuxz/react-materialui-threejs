import React, { Suspense,useRef } from 'react'
import { Canvas, extend, useLoader,useThree,useFrame} from '@react-three/fiber'
import { OrbitControls, Environment, Effects, Loader, useTexture,Html } from '@react-three/drei'
import { LUTPass } from 'three/examples/jsm/postprocessing/LUTPass'
import { LUTCubeLoader } from 'three/examples/jsm/loaders/LUTCubeLoader'
import * as THREE from 'three'

extend({ LUTPass })

function Grading() {
  const { texture3D } = useLoader(LUTCubeLoader, '/cubicle-99.CUBE')
  return <Effects children={<lUTPass attachArray="passes" lut={texture3D} />} />
}

function Sphere({ text, color, ...props }) {
  const texture = useTexture('/terrazo.png')
  return (
    <mesh {...props}>
      <sphereBufferGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial envMapIntensity={0.4} map={texture} clearcoat={0.8} clearcoatRoughness={0} roughness={1} metalness={0.9} />
			 <Html position={[0, 0, 1]} className="label" center>
        {text}
      </Html>
    </mesh>
  )
}

function ScrollContainer({ scroll, children }) {
  const { viewport } = useThree()
  const group = useRef()
  const vec = new THREE.Vector3()
  useFrame(() => group.current.position.lerp(vec.set(0, viewport.height * scroll.current, 0), 0.1))
  return <group ref={group}>{children}</group>
}

function Scene() {
  const viewport = useThree((state) => state.viewport)
  return (
    <>
      <Sphere text={<div><h3>12916</h3></div>} color="#ffffff" />
      {/* <Sphere text={<div><h3>16228</h3></div>} color="lightblue" position={[0, -viewport.height / 2, 0]} /> */}
    </>
  )
}

export default function BlockBall() {
	const scrollRef = useRef()
  const scroll = useRef(0)
	// const viewport = useThree((state) => state.viewport)
  const doScroll = (e) => (scroll.current = e.target.scrollTop / e.target.scrollHeight)

  return (
    <>
      <Canvas 
			frameloop="demand" 
			dpr={[1, 2]} 
			camera={{ position: [0, 0, 5], fov: 45 }}
			// onCreated={(state) => state.events.connect(scrollRef.current)}
			// raycaster={{ computeOffsets: ({ clientX, clientY }) => ({ offsetX: clientX, offsetY: clientY }) }}
			>
        <spotLight intensity={0.5} angle={0.2} penumbra={1} position={[5, 15, 10]} />
        <pointLight position={[-20, -5, -10]} color="red" intensity={0.8} />
        <Suspense fallback={null}>
          {/* <Sphere /> */}
					<ScrollContainer scroll={scroll}>
          <Scene />
         </ScrollContainer>

          <Grading />
          <Environment preset="warehouse" />
        </Suspense>
        <OrbitControls />
      </Canvas>
			{/* <div ref={scrollRef} onScroll={doScroll} className="scroll">
        <div style={{ height: `200vh`, pointerEvents: 'none' }}></div>
      </div> */}
      <Loader />
    </>
  )
}
