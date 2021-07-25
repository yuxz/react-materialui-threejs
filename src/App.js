import {Fragment} from 'react';
import { Route,Redirect, Switch } from 'react-router-dom';

import './App.css';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import BlockCube from './pages/BlockCube';
import BlockMulti from './pages/BlockMulti';
import BlockSimple from './pages/BlockSimple';
import BlockMixing from './pages/BlockMixing';
import BlockHtml from './pages/BlockHtml';
import BlockBall from './pages/BlockBall';
import PopBall from './pages/PopBall';
import SkyDome from './pages/SkyDome';
import CustomizedRoute from './components/CustomerRoute';

function App() {	
  return (
    <Fragment>			
			<Header />			
      <Switch>				 
					<Route exact path="/home"component={Home}/>					
					<Route path="/three" component={BlockCube}/>
					<Route path="/blockmulti" component={BlockMulti}/>
					<Route path="/blocksimple" component={BlockSimple}/>
					<Route path="/blockmixing" component={BlockMixing}/>
					<Route path="/blockhtml" component={BlockHtml}/>
					<Route path="/blockball" component={BlockBall}/>
					<Route path="/popball" component={PopBall}/>
					<Route path="/skydome" component={SkyDome}/>
					<Redirect to="/dashboard" />
				</Switch>	
			<Footer/>
    </Fragment>
  );
}

export default App;
