import { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, TransformControls } from '@react-three/drei'

function Box(props) {
  return (
    <mesh {...props}>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  )
}

function Main() {
  const orbit = useRef()
  const transform = useRef()

  useEffect(() => {
    const controls = transform.current
    const callback = (event) => (orbit.current.enabled = !event.value)
    controls.addEventListener('dragging-changed', callback)
    return () => controls.removeEventListener('dragging-changed', callback)
  }, [])

  return (
    <>
      <Box position={[2, 2, 0]} />
      <TransformControls ref={transform} mode="scale">
        <Box />
      </TransformControls>
      <OrbitControls ref={orbit} />
    </>
  )
}

export default function BlockMixing() {
  return (
    <Canvas dpr={[1, 2]} style={{height:"1500px"}}>
      <Main />
    </Canvas>
  )
}
