import {combineReducers} from "redux";
import themeReducer from './theme'


//汇总所有的reducer
export default  combineReducers(
	{
		theme: themeReducer
}
)
