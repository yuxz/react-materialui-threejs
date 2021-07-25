import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { Suspense, useState, useEffect } from 'react'
import { Canvas, useThree, useLoader } from '@react-three/fiber'
import { Html, OrbitControls, Loader } from '@react-three/drei'
import Button from '@material-ui/core/Button';
// import { Popconfirm } from '@material-ui/core'
import PopDialog from '../../components/PopDialog'
// import 'antd/dist/antd.css'
import './index.css'

const store = [
  { name: 'outside', color: 'lightpink', position: [10, 0, -15], url: '/livingroom.jpg', link: 1 },
  { name: 'inside', color: 'lightblue', position: [15, 0, 0], url: '/yard.jpg', link: 0 }
  // ...
]

function Dome({ name, position, texture, onClick }) {
	const [open, setOpen] = useState(true)

	const handleClickOpen = ()=>{
		setOpen(true);
	};

	
  return (
    <group>
      <mesh>
        <sphereBufferGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      <mesh position={position}>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshBasicMaterial color="white" />
        <Html center>		
					<Button onClick={handleClickOpen} variant="contained" color="primary" href="#contained-buttons">
						{name}
					</Button>		  
          <PopDialog title="Are you sure you want to leave?" onClick={onClick} isOpen={open} okText="Yes" cancelText="No">
          </PopDialog>
        </Html>
      </mesh>
    </group>
  )
}

function Portals() {
  const [which, set] = useState(0)
  const { link, ...props } = store[which]
  const maps = useLoader(THREE.TextureLoader, store.map((entry) => entry.url)) // prettier-ignore
  return <Dome onClick={() => set(link)} {...props} texture={maps[which]} />
}

function Preload() {
  // This component pre-loads textures in order to lessen loading impact when clicking portals
  const { gl } = useThree()
  const maps = useLoader(THREE.TextureLoader, store.map((entry) => entry.url)) // prettier-ignore
  useEffect(() => maps.forEach(gl.initTexture), [maps])
  return null
}

export default function SkyDome() {
  return (
  <Canvas frameloop="demand" camera={{ position: [0, 0, 0.1] }}>
    <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2} autoRotate={false} rotateSpeed={-0.5} />
    <Suspense
      fallback={
        <Html>
          <Loader />
        </Html>
      }>
      <Preload />
      <Portals />
    </Suspense>
  </Canvas>
  )
}
