import React, { Component,Fragment } from 'react'
// import * as THREE from 'three';
import ThreeBlock from '../../components/ThreeBlock'

class BlockCube extends Component {
		
	constructor(props) {
			super(props);
			this.state = {light:{}, geometry:{},camera:{},renderer:{}};
	}


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
			<div>			 
				<ThreeBlock blockList={blockList}/>
			</div>			
		)
	}
}

export default BlockCube;