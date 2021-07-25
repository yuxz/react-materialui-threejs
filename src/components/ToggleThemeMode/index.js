import * as React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import {connect} from 'react-redux';
import { darkAction, lightAction } from '../../redux/actions/theme';
import {DARK,LIGHT} from '../../redux/constant';

class ToggleThemeMode extends React.PureComponent {

	// const {darkAction, lightAction} = this.props;

	toggleColorMode=(mode,e)=>{	
		// console.log('mode----',mode)
		if(mode===DARK){
			this.props.lightAction(LIGHT);
			localStorage.setItem('theme-mode',LIGHT);
		}else{
			this.props.darkAction(DARK);
			localStorage.setItem('theme-mode',DARK);
		}
		
	}

  render(){
    const mode = this.props.theme.mode;
		return (
		 <IconButton sx={{ ml: 1 }} onClick={this.toggleColorMode.bind(this,mode)} color="inherit">
			{ mode === DARK ? <Brightness7Icon /> : <Brightness4Icon />}
		 </IconButton>
  );
	}
}

export default connect(
state =>({theme:state.theme}),
	{
		darkAction,
		lightAction
	}
)(ToggleThemeMode)