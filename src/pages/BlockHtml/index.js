import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import './index.css'

function Box({ text, color, ...props }) {
  const [hovered, set] = useState(false)
  return (
    <mesh {...props} onPointerOver={(e) => set(true)} onPointerOut={(e) => set(false)}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : color} />
      {/* <Html position={[0, 0, 1]} className="label" center>
        {text}
      </Html> */}
			<Html distanceFactor={15}>
        <div class="content">
				 {text}
        </div>
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
      <Box text={<div><h3>12916</h3></div>} color="aquamarine" />
      <Box text={<div><h3>16228</h3></div>} color="lightblue" position={[0, -viewport.height / 2, 0]} />
    </>
  )
}

export default function BlockHtml() {
  const scrollRef = useRef()
  const scroll = useRef(0)
	// const viewport = useThree((state) => state.viewport)
  const doScroll = (e) => (scroll.current = e.target.scrollTop / e.target.scrollHeight)
  return (
    <>
      <Canvas
        onCreated={(state) => state.events.connect(scrollRef.current)}
        raycaster={{ computeOffsets: ({ clientX, clientY }) => ({ offsetX: clientX, offsetY: clientY }) }}>
        <ambientLight />
        <pointLight position={[10, 0, 10]} />
        <ScrollContainer scroll={scroll}>
          <Scene />
					{/* <Box text={<div><span>This is HTML</span><span>This is HTML</span></div>} color="aquamarine" /> */}
        </ScrollContainer>
      </Canvas>
      <div ref={scrollRef} onScroll={doScroll} className="scroll">
        <div style={{ height: `200vh`, pointerEvents: 'none' }}></div>
      </div>
    </>
  )
}

