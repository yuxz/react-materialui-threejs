import {DARK,LIGHT} from '../constant';

//初始化 TODO
const initState= {mode: LIGHT};

export default function themeReducer(preState=initState, action={}){

	const {type, data} = action;
	switch (type) {
		case DARK:
			return {
				...preState,
				mode: data
			};
	  case LIGHT:
				return  {
					...preState,
					mode: data
				};
		default:
			return preState;
	}
}