import React, { Component, Fragment } from 'react'
import * as THREE from 'three';
import fontJson from './font.json';

export default class index extends Component {
	constructor(props) {
		super(props);
		this.state = {blockList:props.blockList};
		console.log('blockList',this.state.blockList[0].blocks);
}

// 初始化Three
initThree(threeOptions, blockList){

	var baseMeshes=[[]];
	var lineMeshes=[[]];
	var colorVar = 1.2;
	const SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 1024;
	const NEAR = 10, FAR = 3000;
	let SCREEN_WIDTH = window.innerWidth;
	let SCREEN_HEIGHT = window.innerHeight;
	const FLOOR = - 250;

	threeStart();	

	//scene
	var scene;
	function initScene() {
			scene = new THREE.Scene();
			
			scene.background = new THREE.Color( 0x59472b );
			scene.fog = new THREE.Fog( 0x59472b, 1000, FAR );
	}
	
	//light
	var spotLight,ambientLight,direLight
	function initLight() {

		//创建自然光源
		ambientLight = new THREE.AmbientLight(threeOptions.light.color);			
		//light.position.set(...threeOptions.light.position);
		scene.add(ambientLight);
	

		// 创建点光源 需要照亮场景
		spotLight = new THREE.SpotLight(0xffffff, 1,0,Math.PI /5, 0.3);
		spotLight.position.set(0, 1500, 1000);
		spotLight.target.position.set( 0, 0, 0 );
		spotLight.castShadow = true;
		spotLight.shadow.camera.near = 1200;
		spotLight.shadow.camera.far = 2500;
		spotLight.shadow.bias = 0.0001;
		spotLight.shadow.mapSize.width = SHADOW_MAP_WIDTH;
		spotLight.shadow.mapSize.height = SHADOW_MAP_HEIGHT;
		scene.add(spotLight);

		// 创建方向光 金属感强烈
		direLight = new THREE.DirectionalLight(0xffe502, 1000);
		direLight.position.set(50, 50, 50);
		direLight.castShadow = true;
		scene.add(direLight);
	
	
	}
  // var lightShadowMapViewer
	// function createHUD() {
	// 	lightShadowMapViewer = new ShadowMapViewer( spotLight );
	// 	lightShadowMapViewer.position.x = 10;
	// 	lightShadowMapViewer.position.y = SCREEN_HEIGHT - ( SHADOW_MAP_HEIGHT / 4 ) - 10;
	// 	lightShadowMapViewer.size.width = SHADOW_MAP_WIDTH / 4;
	// 	lightShadowMapViewer.size.height = SHADOW_MAP_HEIGHT / 4;
	// 	lightShadowMapViewer.update();

	// }

	//geometry
	// var geometryEdges,geometry;		
	function initGeometry() {
		const geometry = new THREE.PlaneGeometry( 100, 100 );
		const planeMaterial = new THREE.MeshPhongMaterial( { color: 0xffb851 } );

		const ground = new THREE.Mesh( geometry, planeMaterial );

		ground.position.set( 0, FLOOR, 0 );
		ground.rotation.x = - Math.PI / 2;
		ground.scale.set( 100, 100, 100 );

		ground.castShadow = false;
		ground.receiveShadow = true;

		scene.add( ground );

		const cubes1 = new THREE.Mesh( new THREE.BoxGeometry( 1500, 220, 150 ), planeMaterial );

		cubes1.position.y = FLOOR - 50;
		cubes1.position.z = 20;

		cubes1.castShadow = true;
		cubes1.receiveShadow = true;

		scene.add( cubes1 );

		const cubes2 = new THREE.Mesh( new THREE.BoxGeometry( 1600, 170, 250 ), planeMaterial );

		cubes2.position.y = FLOOR - 50;
		cubes2.position.z = 20;

		cubes2.castShadow = true;
		cubes2.receiveShadow = true;

		scene.add( cubes2 );
	}	
	
	function initText(){
		const loader = new THREE.FontLoader();
		loader.load( 'helvetiker_bold.typeface.json', function ( font ) {

			const textGeo = new THREE.TextGeometry( "THREE.JS", {

				font: font,

				size: 500,
				height: 50,
				curveSegments: 12,

				bevelThickness: 2,
				bevelSize: 5,
				bevelEnabled: true

			} );

			textGeo.computeBoundingBox();
			const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

			const textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );

			const mesh = new THREE.Mesh( textGeo, textMaterial );
			mesh.position.x = centerOffset;
			mesh.position.y = FLOOR + 67;

			mesh.castShadow = true;
			mesh.receiveShadow = true;

			scene.add( mesh );
		} );
	
	}
	//camera
	var camera;
	function initCamera() {
			camera = new THREE.PerspectiveCamera(
				threeOptions.camera.args.fov, 
				threeOptions.camera.args.aspect, 
				threeOptions.camera.args.near, 
				threeOptions.camera.args.far);

			// camera.position.set(...threeOptions.camera.position);
			camera.position.z = 25;
			camera.up.set(...threeOptions.camera.up);
			camera.lookAt(...threeOptions.camera.lookAt);
	}	

	//renderer
	var renderer,width,height;
	function initRenderer() {
			width = document.getElementById('three-frame1').offsetWidth;
			height = document.getElementById('three-frame1').offsetHeight;	
			renderer = new THREE.WebGLRenderer({
					antialias: true
			});
			renderer.setClearColor(threeOptions.renderer.color);
			renderer.setSize(width, height);
			document.getElementById('three-frame1').appendChild(renderer.domElement);
			
	}
	
	function animation() {     
		requestAnimationFrame(animation);  
		// for (let i = 0; i < baseMeshes.length; i++) {
		// 	for(let j =0; j <baseMeshes[i].length; j++){
		// 			//baseMeshes[i].rotation.x += 0.01;
		// 		baseMeshes[i][j].rotation.y += 0.002; 
		// 		lineMeshes[i][j].rotation.y += 0.002; 
		// 		//动态更改material的颜色
			 
		// 		// baseMeshes[i][j].material.color = new THREE.Color(`rgb(${22*i*colorNum},${22*i*colorNum},${22*i*colorNum})`);
		// 		baseMeshes[i][j].material.color = new THREE.Color(`rgb(${100+25*i},0,0)`);
		// 		baseMeshes[i][j].position.x -= 0.002; 
		// 		lineMeshes[i][j].position.x -= 0.002;
		// 		baseMeshes[i][j].position.y -= 0.002; 
		// 		lineMeshes[i][j].position.y -= 0.002;
		// 	}
		// 	colorVar = colorVar>10? 1.2 : colorVar*2;			
		// }
		renderer.render(scene, camera);		
	}

	function threeStart() {			
			initRenderer();
			initScene();
			initLight();			
			initGeometry();
			initText();
			initCamera();			
			animation();
		}	
	}	
	//
	componentDidMount(){
		const threeOptions = {
			light:{
				color: 0x444444,
				position:[300, 300, 0]
			},
			geometry:{
				args:{
					width: 1,
					height: 1,
					depth: 1
					//widthSegments: ,	//heightSegments: ,//	depthSegments: 
				},
				material:{ color: '#00FF00', wireframe: true },
				position:[-5, -5, -5]
			},
			camera:{
				args:{
					fov: 23, 
					aspect: 1.5, 
					near: 10, 
					far:3000
				},
				position:[700, 50, 1900],
				up:[0,0,0],
				lookAt:[0,0,0]
			},
			renderer:{
				width:2000,
				height:300,
				color:"#263238",
				id:document.getElementById('three-frame2')
			}
		};
		
		this.initThree(threeOptions,this.state.blockList);
	}



	render() {
		
		return (
			<Fragment>
			<div id="three-frame1" style={{backgroundColor:"#000000",width:"100%",height:"1000px"}}>				
				</div>				
			</Fragment>		
		)
	}
}