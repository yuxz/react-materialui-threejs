import { ThreeDRotation } from '@material-ui/icons';
import React, { Component, Fragment } from 'react'
import * as THREE from 'three';
import fontJson from './font.json';
class ThreeBlock extends Component {
		
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
		threeStart();	

		//scene
		var scene;
		function initScene() {
				scene = new THREE.Scene();
				scene.background = new THREE.CubeTextureLoader()
				.setPath( '/img/' )       // 地址
				//图片    顺序为 前 后 上 下 左 右
				.load( [ 'w04.png', 'w05.png', 'w06.png', 'w02.png', 'w01.png', 'w03.png' ] ); 
		}
		
		//light
		var light;
		function initLight() {
			// 创建点光源 需要照亮场景
			let pointLight = new THREE.PointLight(0xffe502, 1, 1000);
			pointLight.position.set(50, 50, 50);
			scene.add(pointLight);

			// 创建方向光 金属感强烈
			let direLight = new THREE.DirectionalLight(0xffe502, 1000);
        direLight.position.set(50, 50, 50);
        direLight.castShadow = true;
        scene.add(direLight);
			// light = new THREE.AmbientLight(threeOptions.light.color);			
			// light.position.set(...threeOptions.light.position);
			// scene.add(light);
		
		}

		//geometry
		var geometryEdges,geometry;		
		function initGeometry() {
				geometry = new THREE.BoxGeometry(
					threeOptions.geometry.args.width,
					threeOptions.geometry.args.height,
					threeOptions.geometry.args.depth
					); 	
					geometryEdges = new THREE.EdgesGeometry(geometry, 1);
		}	

		
	  var baseMesh,lineMesh;
		function initMesh(x) {	
				for(var i=0;i<blockList.length;i++){
					baseMeshes[i]=[];
					lineMeshes[i]=[];
					for (let j=0; j<blockList[i].blocks.length; j++){
						//const material = new THREE.LineBasicMaterial(threeOptions.geometry.material);
						// const material = new THREE.LineBasicMaterial({color:`rgb(${50*i},${40*i},${10*i})`,});
						const material = new THREE.MeshPhongMaterial({color:`rgb(${100+25*i},0,0)`,});					
						baseMesh= new THREE.Mesh(geometry, material);
						baseMesh.position.set(2*j,3*(i-1),5/(i+1));
						baseMesh.matrixAutoUpdate  = true;	

						const lineMaterial = new THREE.LineBasicMaterial({color: 0xffffff});
						lineMesh = new THREE.LineSegments(geometryEdges, lineMaterial);	
						lineMesh.position.set(2*j,3*(i-1),5/(i+1));
					
						baseMeshes[i].push(baseMesh);
						lineMeshes[i].push(lineMesh);

						scene.add(baseMesh,lineMesh);	
					}				
				}	
		}        
		
		function initText(){

		var loader= new THREE.FontLoader();

		loader.load(fontJson, function(font){

			const textGeo = new THREE.TextGeometry("2分钟", {

				font: THREE.Font,

				size: 1,
				height: 1,
				curveSegments: 12,

				bevelThickness: 20,
				bevelSize: 8,
				bevelEnabled: true,
				bevelSegments:3
			} );

			textGeo.computeBoundingBox();

			const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
			const materials = new THREE.MeshLambertMaterial({color:0x99AAFF});	
			const textMesh = new THREE.Mesh( textGeo, materials );

			textMesh.position.x = -7.4;
			textMesh.position.y = 4;
			textMesh.position.z = -2.5;

			// textMesh.rotation.x = 0;
			// textMesh.rotation.y = Math.PI * 2;

			scene.add( textMesh );
		});
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
			for (let i = 0; i < baseMeshes.length; i++) {
				for(let j =0; j <baseMeshes[i].length; j++){
						//baseMeshes[i].rotation.x += 0.01;
					baseMeshes[i][j].rotation.y += 0.002; 
					lineMeshes[i][j].rotation.y += 0.002; 
					//动态更改material的颜色
				 
				  // baseMeshes[i][j].material.color = new THREE.Color(`rgb(${22*i*colorNum},${22*i*colorNum},${22*i*colorNum})`);
				  baseMeshes[i][j].material.color = new THREE.Color(`rgb(${100+25*i},0,0)`);
					baseMeshes[i][j].position.x -= 0.002; 
					lineMeshes[i][j].position.x -= 0.002;
					baseMeshes[i][j].position.y -= 0.002; 
					lineMeshes[i][j].position.y -= 0.002;
				}
				colorVar = colorVar>10? 1.2 : colorVar*2;			
		  }
			renderer.render(scene, camera);		
		}

		function threeStart() {			
		    initRenderer();
				initScene();
				initLight();
				initText();
				initGeometry();
				initMesh(20);
				initCamera();
				
				animation();
		}	
	}	
	//
	componentDidMount(){
		const threeOptions = {
			light:{
				color:'#FFFF00',
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
					fov: 65, 
					aspect: 1.5, 
					near: 0.1, 
					far:1000
				},
				position:[10, 10, 10],
				up:[0,1,0],
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
			 <div id="three-frame1" style={{backgroundColor:"#ff4321",width:"100%",height:"1300px"}}>				
				</div>				
			</Fragment>
			
		)
	}
}

export default ThreeBlock;