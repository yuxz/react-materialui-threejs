import React, { Component,useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Box(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 0 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
			>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}


export default class BlockMulti extends Component {
	
	render() {
		const blockList =[
			{
				datetime:'2021-07-22 10:10:00',
				blocks:[15,18,26,44,66]
			},
			{
				datetime:'2021-07-22 10:11:00',
				blocks:[18,11,25,34,22,66,15,7,9,21]
			},
			{
				datetime:'2021-07-22 10:12:00',
				blocks:[56,54]
			},
			{
				datetime:'2021-07-22 10:13:00',
				blocks:[72,32,11,17]
			},
			{
				datetime:'2021-07-22 10:14:00',
				blocks:[25,34,22,66,15,7]
			},
		]

		return (
			<Canvas camera={{ position: [5, 5, 20], fov: 20 }}>
				<ambientLight />
				<pointLight position={[50, 50, 50]} />
				{
					
					blockList.map((element,zAxis) =>{	
						return element.blocks.map((el,xAxis) =>{
							return <Box key={(xAxis+1)*(zAxis+1)} position={[xAxis*4, 0, -zAxis*2]} />
						})	
					})	
				}		
		</Canvas>
		)
	}
}
