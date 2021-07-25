import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics, usePlane, useBox,useSphere} from '@react-three/cannon'

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh receiveShadow ref={ref}>
      <planeGeometry args={[20, 20, 1]} />
      <meshStandardMaterial color="#171717" />
    </mesh>
  )
}

function Ball(props) {
	const [ref] = useSphere(() => ({
    mass: 1,
    position: [0, 20, 0],
    args: 1
  }))
  return (
    <mesh castShadow receiveShadow ref={ref}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshLambertMaterial color="red" />
    </mesh>
  )
}

export default function PopBall() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 100)
    return () => clearTimeout(timeout)
  }, [])

	const blockList = [
		{
			blockhash:
				'6880fc2e3fcebbe7964335ee4f617c94ba9afb176fade022aa6573d85539129f',
			blocknum: 20,
			channelname: 'jasmy-dev-channel',
			createdt: '2018-04-26T20:32:13.000Z',
			datahash:
				'2802f7e70ca3a6479b1c3dd16f4bac1a55b213f6cff10a96e60977bc8ef9166e',
			id: 21,
			prehash: '5880fc2e3fcebbe7964335ee4f617c94ba9afb176fade022aa6573d85539129f',
			prev_blockhash: null,
			txcount: 33,
			txhash: [
				'308a24cc218085f16e12af38bf54a72beec0b85e98f971b1e0819592f74deb80',
				'9abc8cb27439b256fa38384ee98e34da75f5433cfc21a45a77f98dcbc6bddbb1'
			]
		},
		{
			blockhash:
				'7880fc2e3fcebbe7964335ee4f617c94ba9afb176fade022aa6573d85539129f',
			blocknum: 19,
			channelname: 'jasmy-dev-channel',
			createdt: '2018-04-26T20:32:11.000Z',
			datahash:
				'1adc2b51cb7d7df44f114fc42df1f6fdca64a5da3f9a07edbd3b0d8060bb2edf',
			id: 20,
			prehash: '68f4481e0caec16a5aceebabd01cb31635d9f0a8cf9f378f86e06b76c21c633d',
			prev_blockhash: null,
			txcount: 6,
			txhash: [
				'912cd6e7624313675cb1806e2ce0243bbeff247792f2c7aae857a8c5436074f6',
				'a9cc2d309967fbba0d9575319ea0c7eb75e7c003142e6c43060015e59909d91d',
				'85770c2057e4b63504de6fa8b0c711f33ec897d9e8fc10659d7712e51d57c513'
			]
		},
		{
			blockhash:
				'7880fc2e3fcebbe7964335ee4f617c94ba9afb176fade022aa6573d85539129f',
			blocknum: 18,
			channelname: 'jasmy-dev-channel',
			createdt: '2018-04-26T20:32:11.000Z',
			datahash:
				'1adc2b51cb7d7df44f114fc42df1f6fdca64a5da3f9a07edbd3b0d8060bb2edf',
			id: 19,
			prehash: '68f4481e0caec16a5aceebabd01cb31635d9f0a8cf9f378f86e06b76c21c633d',
			prev_blockhash: null,
			txcount: 17,
			txhash: [
				'912cd6e7624313675cb1806e2ce0243bbeff247792f2c7aae857a8c5436074f6',
				'a9cc2d309967fbba0d9575319ea0c7eb75e7c003142e6c43060015e59909d91d',
				'85770c2057e4b63504de6fa8b0c711f33ec897d9e8fc10659d7712e51d57c513'
			]
		},
		{
			blockhash:
				'7880fc2e3fcebbe7964335ee4f617c94ba9afb176fade022aa6573d85539129f',
			blocknum: 17,
			channelname: 'jasmy-dev-channel',
			createdt: '2018-04-26T20:32:11.000Z',
			datahash:
				'1adc2b51cb7d7df44f114fc42df1f6fdca64a5da3f9a07edbd3b0d8060bb2edf',
			id: 18,
			prehash: '68f4481e0caec16a5aceebabd01cb31635d9f0a8cf9f378f86e06b76c21c633d',
			prev_blockhash: null,
			txcount: 15,
			txhash: [
				'912cd6e7624313675cb1806e2ce0243bbeff247792f2c7aae857a8c5436074f6',
				'a9cc2d309967fbba0d9575319ea0c7eb75e7c003142e6c43060015e59909d91d',
				'85770c2057e4b63504de6fa8b0c711f33ec897d9e8fc10659d7712e51d57c513'
			]
		}
	]
	const [balls, setBalls] = useState([])
	const createBall = () => {
		setTimeout(() => {
			blockList.map((element,zAxis) =>{					
				console.log("ball", zAxis)	
				return <Ball  key={element.id} position={[2*zAxis, zAxis, 10-zAxis*5]} />						
			})
		}, 100)
	}

	


  return (
    <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 2, 20], fov: 80 }}>
      <ambientLight />
      <spotLight angle={0.25} penumbra={0.5} position={[100, 100, 50]} castShadow />
      <Physics>
        <Plane rotation={[-Math.PI / 2, 0, 0]} />
			  {balls.map((element) =>{
				return element	
			  })}
        {/* <Ball position={[0, 5, 0]} />
        <Ball position={[2, 7, -0.25]} />
        <Ball position={[-20, 9, 0.25]} /> */}
        {/* {ready && <Ball position={[-0.45, 10, 0.25]} />} */}
      </Physics>
    </Canvas>
  )
}
