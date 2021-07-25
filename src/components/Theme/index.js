import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import _ from 'lodash'
// import {createHashHistory} from "history";
// import { browserHistory } from 'react-router';

import conf from '../../config';
import {DARK,LIGHT} from '../../redux/constant';
import { darkAction, lightAction } from '../../redux/actions/theme';
import createStore from '../../redux/store'

// 从浏览器localStorage中读取用户配置的theme-mode
const mode = !_.isNull(localStorage.getItem('theme-mode'))? 
localStorage.getItem('theme-mode') : !_.isUndefined(global.constants.themeMode)? global.constants.themeMode:"dark";

// const history = createHashHistory();


//theme
const darkTheme = createTheme({
	status: {
    danger: '#e53e3e',
  },

  palette: {
		type: DARK,
		background: {
      default: "#1F2933"
    },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#3E4C59',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: '#0066ff',
      main: '#616e7C',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // 使用下面的函数用于将颜色的亮度在其调色板中
    // 移动大约两个指数。
    // 例如，从红色 500（Red 500）切换到 红色 300（Red 300）或 红色 700（Red 700）。
    tonalOffset: 0.2,
  },
});

const lightTheme = createTheme({
	status: {
    danger: '#e4f0e2',
  },
	background: {
		paper: "#01579B",
	},
  palette: {
		type: LIGHT,
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#0288d1',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      // light: '#0066ff',
      main: '#03a9f4',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // 使用下面的函数用于将颜色的亮度在其调色板中
    // 移动大约两个指数。
    // 例如，从红色 500（Red 500）切换到 红色 300（Red 300）或 红色 700（Red 700）。
    tonalOffset: 0.2,
  },
});

class Theme extends PureComponent {

	render(){		
		const { children } = this.props;	
		//如果请求根路径，读取配置文件、localStorage中theme-mode
		const mode = this.props.theme.mode;	
	  // console.log(this.props)
		return (				 
		  <MuiThemeProvider theme={mode===DARK? darkTheme: lightTheme}>			
		  	<CssBaseline />
			
				{children}
			</MuiThemeProvider>
		);
	}
}

export default connect(
	state =>({theme:state.theme}),
	{
		darkAction,
		lightAction
	}
	)(Theme)