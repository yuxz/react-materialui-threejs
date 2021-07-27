import {Fragment , useState, useEffect} from 'react';
import { Route,Redirect, Switch } from 'react-router-dom';

import './App.css';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import ThreeBlock from './pages/ThreeBlock';
import ThreeText from './pages/ThreeText';
import BlockTrain from './pages/BlockTrain';
import BlockMulti from './pages/BlockMulti';
import BlockSimple from './pages/BlockSimple';
import BlockMixing from './pages/BlockMixing';
import BlockHtml from './pages/BlockHtml';
import BlockBall from './pages/BlockBall';
import PopBall from './pages/PopBall';
import SkyDome from './pages/SkyDome';
import CustomizedRoute from './components/CustomerRoute';
import Waters from './pages/Waters';
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
	}
]
const newblockList =[
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
	},		
	{
		blockhash:
			'7880fc2e3fcebbe7964335ee4f617c94ba9afb176fade022aa6573d85539129f',
		blocknum: 16,
		channelname: 'jasmy-dev-channel',
		createdt: '2018-04-26T20:32:11.000Z',
		datahash:
			'1adc2b51cb7d7df44f114fc42df1f6fdca64a5da3f9a07edbd3b0d8060bb2edf',
		id: 17,
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
		blocknum: 16,
		channelname: 'jasmy-dev-channel',
		createdt: '2018-04-26T20:32:11.000Z',
		datahash:
			'1adc2b51cb7d7df44f114fc42df1f6fdca64a5da3f9a07edbd3b0d8060bb2edf',
		id: 16,
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
		blocknum: 14,
		channelname: 'jasmy-dev-channel',
		createdt: '2018-04-26T20:32:11.000Z',
		datahash:
			'1adc2b51cb7d7df44f114fc42df1f6fdca64a5da3f9a07edbd3b0d8060bb2edf',
		id: 15,
		prehash: '68f4481e0caec16a5aceebabd01cb31635d9f0a8cf9f378f86e06b76c21c633d',
		prev_blockhash: null,
		txcount: 15,
		txhash: [
			'912cd6e7624313675cb1806e2ce0243bbeff247792f2c7aae857a8c5436074f6',
			'a9cc2d309967fbba0d9575319ea0c7eb75e7c003142e6c43060015e59909d91d',
			'85770c2057e4b63504de6fa8b0c711f33ec897d9e8fc10659d7712e51d57c513'
		]
	},
	{
		blockhash:
			'7880fc2e3fcebbe7964335ee4f617c94ba9afb176fade022aa6573d85539129f',
		blocknum: 13,
		channelname: 'jasmy-dev-channel',
		createdt: '2018-04-26T20:32:11.000Z',
		datahash:
			'1adc2b51cb7d7df44f114fc42df1f6fdca64a5da3f9a07edbd3b0d8060bb2edf',
		id: 14,
		prehash: '68f4481e0caec16a5aceebabd01cb31635d9f0a8cf9f378f86e06b76c21c633d',
		prev_blockhash: null,
		txcount: 66,
		txhash: [
			'912cd6e7624313675cb1806e2ce0243bbeff247792f2c7aae857a8c5436074f6',
			'a9cc2d309967fbba0d9575319ea0c7eb75e7c003142e6c43060015e59909d91d',
			'85770c2057e4b63504de6fa8b0c711f33ec897d9e8fc10659d7712e51d57c513'
		]
	},
	{
		blockhash:
			'7880fc2e3fcebbe7964335ee4f617c94ba9afb176fade022aa6573d85539129f',
		blocknum: 12,
		channelname: 'jasmy-dev-channel',
		createdt: '2018-04-26T20:32:11.000Z',
		datahash:
			'1adc2b51cb7d7df44f114fc42df1f6fdca64a5da3f9a07edbd3b0d8060bb2edf',
		id: 13,
		prehash: '68f4481e0caec16a5aceebabd01cb31635d9f0a8cf9f378f86e06b76c21c633d',
		prev_blockhash: null,
		txcount: 66,
		txhash: [
			'912cd6e7624313675cb1806e2ce0243bbeff247792f2c7aae857a8c5436074f6',
			'a9cc2d309967fbba0d9575319ea0c7eb75e7c003142e6c43060015e59909d91d',
			'85770c2057e4b63504de6fa8b0c711f33ec897d9e8fc10659d7712e51d57c513'
		]
	},
	{
		blockhash:
			'7880fc2e3fcebbe7964335ee4f617c94ba9afb176fade022aa6573d85539129f',
		blocknum: 11,
		channelname: 'jasmy-dev-channel',
		createdt: '2018-04-26T20:32:11.000Z',
		datahash:
			'1adc2b51cb7d7df44f114fc42df1f6fdca64a5da3f9a07edbd3b0d8060bb2edf',
		id: 12,
		prehash: '68f4481e0caec16a5aceebabd01cb31635d9f0a8cf9f378f86e06b76c21c633d',
		prev_blockhash: null,
		txcount: 66,
		txhash: [
			'912cd6e7624313675cb1806e2ce0243bbeff247792f2c7aae857a8c5436074f6',
			'a9cc2d309967fbba0d9575319ea0c7eb75e7c003142e6c43060015e59909d91d',
			'85770c2057e4b63504de6fa8b0c711f33ec897d9e8fc10659d7712e51d57c513'
		]
	}
]	
// 
const newBlock = {
	blockhash:
		'7880fc2e3fcebbe7964335ee4f617c94ba9afb176fade022aa6573d85539129f',
	blocknum: 16,
	channelname: 'jasmy-dev-channel',
	createdt: '2018-04-26T20:32:11.000Z',
	datahash:
		'1adc2b51cb7d7df44f114fc42df1f6fdca64a5da3f9a07edbd3b0d8060bb2edf',
	id: 16,
	prehash: '68f4481e0caec16a5aceebabd01cb31635d9f0a8cf9f378f86e06b76c21c633d',
	prev_blockhash: null,
	txcount: 17,
	txhash: [
		'912cd6e7624313675cb1806e2ce0243bbeff247792f2c7aae857a8c5436074f6',
		'a9cc2d309967fbba0d9575319ea0c7eb75e7c003142e6c43060015e59909d91d',
		'85770c2057e4b63504de6fa8b0c711f33ec897d9e8fc10659d7712e51d57c513'
	]
}
const blockX = [];
	
for(let i=0;i<100;i++){
	blockX.push(newBlock);
}

function App() {
	// const [blocks, setBlocks] = useState(blockList);
	const [blocks, setBlocks] = useState(blockX);

	useEffect(()=>{		
		console.log("blockX", blockX);
		setBlocks(blockX);							
		const timer = setInterval(()=>{	
			// console.log("newblockList", newblockList)							
		  // setBlocks(newblockList);
		  // console.log("blocks", blocks)			
		}, 3000);
		
		return ()=>{
			clearInterval(timer);
		}

	},[])

  return (
    <Fragment>			
			{/* <Header />			 */}
      <Switch>				 
					<Route exact path="/home"component={Home}/>					
					<Route path="/threeblock" component={ThreeBlock}/>
					<Route path="/blocktrain" component={BlockTrain}/>
					<Route path="/threetext" component={ThreeText}/>
					<Route path="/blockmulti" component={BlockMulti}/>
					<Route path="/blocksimple" component={BlockSimple}/>
					<Route path="/blockmixing" component={BlockMixing}/>
					<Route path="/blockhtml" component={BlockHtml}/>
					<Route path="/blockball" component={BlockBall}/>
					<Route path="/popball" component={PopBall}/>
					<Route path="/skydome" component={SkyDome}/>
					{/* <Redirect to="/blocktrain" /> */}
			</Switch>	
			<BlockTrain blocks={blocks}/>
			{/* <Waters /> */}
			<Footer/>
    </Fragment>
  );
}

export default App;
