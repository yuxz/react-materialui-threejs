import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import reducers from "./reducers";


export default function configureStore(initState) {

	return createStore(
		reducers,
		{ ...initState},
		applyMiddleware(thunk)
	);
}
