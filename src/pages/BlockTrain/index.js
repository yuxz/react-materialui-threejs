import { useEffect, useRef, useState, Suspense, useMemo } from 'react'
import * as THREE  from 'three'
import { Canvas,useFrame, extend, useThree, useLoader,  } from '@react-three/fiber'
import { Physics, usePlane, useBox,useSphere} from '@react-three/cannon'
// import Fireflies from '../../components/Three/Fireflies'
import { Billboard, Loader,Html, Sky, OrbitControls, useTexture} from '@react-three/drei'
import _ from 'lodash'
import { Water } from 'three-stdlib'

extend({ Water })

function Ocean() {
  const ref = useRef()
  const gl = useThree((state) => state.gl)
  const waterNormals = useLoader(THREE.TextureLoader, '/waternormals.jpeg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), [])
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding
    }),
    [waterNormals]
  )
  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta))
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
}


function Plane({ color, ...props }) {
  return (
    <mesh receiveShadow castShadow {...props}>
      <boxBufferGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
function RoadBrand(props){
 
	return(
		<>		
			<Brand texture="/b2.jpg" position={[-5, 1.4, 1]} />
			<Pole  position={[-5, 0.4, 1]} />	
			<Brand texture="/b1.jpg" position={[-5, 1.4, -100]} />
			<Pole  position={[-5, 0.4, -100]} />
			<Brand texture="/b3.jpg" position={[-5, 1.4, -200]} />
			<Pole  position={[-5, 0.4, -200]} />	
			<Brand texture="/b4.jpg" position={[-5, 1.4, -300]} />
			<Pole  position={[-5, 0.4, -300]} />
		</>	
	)
}
function Brand(props) {  
	const {position} = props;
  const ref = useRef();
	useFrame((state, delta) => 
	{
    ref.current.position.z = ref.current.position.z + 0.005  
  })
	const texture = useTexture(props.texture);

  return (	
		<mesh ref={ref} position={position}>
			<boxGeometry args={[0.05,1,3]} />
			<meshStandardMaterial map={texture} color='#ffffff' />			
			<Html position={[0, 0, 0]} className="label" center>
				{/* 大阪 */}
        {/* {text} */}
      </Html>
		</mesh>	
  )
}
function Pole(props) {  
	const {position} = props;
	const ref = useRef();
	useFrame((state, delta) => 
	{
    ref.current.position.z = ref.current.position.z + 0.005  
  })
  return (	
		<mesh ref={ref}  position={position}>
		<cylinderGeometry args={[0.05, 0.05, 1, 50]} />
		<meshStandardMaterial color='#90caf9' />								
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
    ref.current.position.z = ref.current.position.z + 0.06  
  })
	const texture = useTexture('/m03.jpg')

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
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={texture}  color={hovered ? '#ffa000' : '#29b6f6'} />
			<Html position={[0, 0, 1]} className="label" center>
        {/* {text} */}
      </Html>
    </mesh>
  )
}
function Cloud({ size = 0.1, opacity = 0.5, speed = 0.4, spread = 1, length = 1, segments = 10, dir = 1, ...props }) {
  const group = useRef()
  const texture = useTexture("/cloud.png")
  const clouds = useMemo(
    () =>
      [...new Array(segments)].map((_, index) => ({
        x: spread / 2 - Math.random() * spread,
        y: spread / 2 - Math.random() * spread,
        scale: 0.4 + Math.sin(((index + 1) / segments) * Math.PI) * ((0.2 + Math.random()) * 10) * size,
        density: Math.max(0.2, Math.random()),
        rotation: Math.max(0.002, 0.005 * Math.random()) * speed,
      })),
    [spread, segments, speed, size],
  )
  useFrame((state) =>
    group.current?.children.forEach((cloud, index) => {
      cloud.rotation.z += clouds[index].rotation * dir
      cloud.scale.setScalar(clouds[index].scale + (((1 + Math.sin(state.clock.getElapsedTime() / 10)) / 2) * index) / 10)
    }),
  )
  return (
    <group {...props}>
      <group position={[0, 0, (segments / 2) * length]} ref={group}>
        {clouds.map(({ x, y, scale, density }, index) => (
          <Billboard key={index} scale={[scale, scale, scale]} position={[x, y, -index * length]} lockZ>
            <meshStandardMaterial map={texture} transparent opacity={(scale / 6) * density * opacity} depthTest={false} />
          </Billboard>
        ))}
      </group>
    </group>
  )
}
function HillView({ size = 0.1, opacity = 0.5, speed = 0.4, spread = 1, length = 1, segments = 10, dir = 1, ...props }){
	const texture = useTexture("/fuj.jpg")
	return (
		<Billboard scale={[15, 15, 15]} position={[-2,2,3]} lockZ>
			<meshStandardMaterial map={texture} transparent opacity={( 10 / 6) * 1 * 1} depthTest={false} />
		</Billboard>
	)
}
function Clouds() {
  return <Cloud size={2} rotation={[0, Math.PI / 2, 0]} position={[-30, 80, -100]} scale={[10, 10, 10]} />
}
export default function BlockTrain(props) {
  const [ready, setReady] = useState(false);
	const [inputBlocks, setInputBlocks] = useState(props.blocks);
	const [displayBlocks, setDisplayBlocks] = useState([]);
	const [hasBlocks, setHasBlocks] = useState(false);

	let indexInputBlocks = 1;
	let maxInputBlocks = props.blocks.length;
	useEffect(()=>{
		setDisplayBlocks(inputBlocks.slice(0,indexInputBlocks));
		const blocksTimer = setInterval(()=>{
			//一秒钟从props.blocks取1个block，添加一个blocks；
			if (indexInputBlocks <= maxInputBlocks){						
				indexInputBlocks ++;	
				setDisplayBlocks(inputBlocks.slice(0,indexInputBlocks));
			}		
		},2000);
		return ()=>{
			clearInterval(blocksTimer);
		}
	},[])

	if(!_.isUndefined(displayBlocks) && _.size(displayBlocks)>0){	
		return (
			<>      
			<Suspense fallback={<span>loading...</span>}>
			<Canvas dpr={[1, 2]} shadows  camera={{ fov: 45, position: [6, 3.5, 15] }} style={{height:"1500px"}}>
				{/* <color attach="background" args={['#323F4B']} /> */}
				{/* <fog attach="fog" args={['#cc7b32', 0, 500]} /> */}
				<ambientLight intensity={0.8} />
				<directionalLight color="#000000" position={[50, 50, -50]} />
				<spotLight angle={0.25} penumbra={0.5} position={[100, 150, 55]} castShadow />		
				<Ocean />	
				<RoadBrand />					
				<Physics>				  
					<Plane color="#bdbdbd" rotation-x={-Math.PI / 2} position={[-6, 0, 0]} scale={[8, 10000, 0.1]} />	
					<Plane color="#ffcc80" rotation-x={-Math.PI / 2} position={[-1.5, 0, 0]} scale={[1, 10000, 0.1]} />	

					<Plane color="#757575" rotation-x={-Math.PI / 2} position={[-0.9, 0, 0]} scale={[0.15, 10000, 0.1]} />
					<Plane color="#616161" rotation-x={-Math.PI / 2} position={[-0.7, 0, 0]} scale={[0.1, 10000, 0.1]} />
					<Plane color="#757575" rotation-x={-Math.PI / 2} position={[0, 0, 0]} scale={[1.3, 10000, 0.1]} />
					<Plane color="#616161" rotation-x={-Math.PI / 2} position={[0.7, 0, 0]} scale={[0.1, 10000, 0.1]} />
					<Plane color="#757575" rotation-x={-Math.PI / 2} position={[0.9, 0, 0]} scale={[0.15, 10000, 0.1]} />

					<Plane color="#ffcc80" rotation-x={-Math.PI / 2} position={[1.5, 0, 0]} scale={[1, 10000, 0.1]} />	
					<Plane color="#bdbdbd" rotation-x={-Math.PI / 2} position={[6, 0, 0]} scale={[8, 10000, 0.1]} />			
					{/* <Fireflies count={36} />				 */}
					{/* <div style={{visibility:(hasBlocks?"visible":"hidden")}}> */}
					{						
						displayBlocks.map((element,zAxis) =>{									
							return <Cube text={<span>{element.id}</span>} color="#607d8b" key={element.id} position={[0, 0.6, -0.3*zAxis-2]} />;
						})
					}					
					{/* </div>					   */}
				</Physics>	
				<Suspense fallback={null}>
					<Clouds />
				</Suspense>
				{/* <OrbitControls minPolarAngle={Math.PI / 1.5} maxPolarAngle={Math.PI / 1.5} />       */}
				{/* <Sky azimuth={0.5} turbidity={10} rayleigh={0.5} inclination={0.6} distance={100000} />	 */}
				<Sky scale={1000} sunPosition={[-160, 50, -1000]} turbidity={0.1} />
				{/* <HillView /> */}
			</Canvas>
			<Loader/>
			</Suspense>
			</>
		)
	}else{
		return <span>Please verify your network!</span>
	}	

}
