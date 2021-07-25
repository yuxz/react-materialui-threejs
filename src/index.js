import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Theme from './components/Theme';
import store from './redux/store'

ReactDOM.render(
  <React.StrictMode>		
		<HashRouter>
			<Provider store={store()}>
				<Theme>
					<App />
				</Theme>
			</Provider>
		</HashRouter> 
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
