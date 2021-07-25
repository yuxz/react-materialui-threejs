import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas,useFrame } from '@react-three/fiber'
import { usePlane, useBox } from '@react-three/cannon'
import Fireflies from '../../components/Three/Fireflies'
import { Loader,Html} from '@react-three/drei'
import { nanoid } from 'nanoid'

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh receiveShadow ref={ref}>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color="#f0f0f0" />
    </mesh>
  )
}

function Cube({text,color, ...props}) {
  //const [ref] = useBox(() => ({ mass: 1, ...props }))
	 const ref = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
	// useFrame((state, delta) => (ref.current.rotation.y += 0.01))
	useFrame((state, delta) => 
	{
    ref.current.position.z = ref.current.position.z + 0.01  
  })
  return (
    <mesh 
			// castShadow 
			mass={1}
			{...props }
			ref={ref} 
			scale={1}
			// scale={active ? 0 : 1}
			onClick={(event) => setActive(!active)}
			onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
			>		
      <boxGeometry />
      <meshStandardMaterial color={hovered ? '#FF6633' : '#FF9933'} />
			<Html position={[0, 0, 1]} className="label" center>
        {text}
      </Html>
    </mesh>
  )
}

export default function BlockSimple(props) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 5000)
    return () => clearTimeout(timeout)
  }, [])

const blocks ={
	dataMax:22,
	displayData:
	[
		{
			datetime:'10:10',
			count:10
		},
		{
			datetime:'10:11',
			count:9
		},
		{
			datetime:'10:12',
			count:15
		},
		{
			datetime:'10:13',
			count:44
		},		
		{
			datetime:'10:14',
			count:9
		},
		{
			datetime:'10:15',
			count:13
		},
		{
			datetime:'10:16',
			count:22
		}		
	]}
  return (
		<>      
      {/* <h1 style={{marginTop:"0px",marginBottom:"0px",backgroundColor:"#323F4B",color:"#ffffff"}} >
        Blocks 
      </h1> */}
		<Suspense fallback={<span>loading...</span>}>
    <Canvas dpr={[1, 2]} shadows  camera={{ fov: 45, position: [-6, 2, -5] }} style={{height:"1500px"}}>
			 <color attach="background" args={['#323F4B']} />
      <ambientLight />
      <spotLight angle={0.25} penumbra={0.5} position={[100, 150, 55]} castShadow />
			<Fireflies count={36} />
				{
					
					// blockList.map((element,zAxis) =>{	
					// 	return element.blocks.map((el,xAxis) =>{							
					// 		return <Cube key={(xAxis+1)*(zAxis+1)} position={[xAxis*2, 0, 10-zAxis*5]} />
					// 	})	
					// })	
					blocks.displayData.map((element,zAxis) =>{
						const cubes=[];	
						for(var cube =0; cube < element.count; cube++){	
							cubes.push(<Cube text={<span>hoho</span>} color="aquamarine" key={nanoid()} position={[2*cube, 0, 10-zAxis*5]} />)
						}					
						return cubes;
					})					
				}  
    </Canvas>
		<Loader/>
		</Suspense>
		</>
  )
}
