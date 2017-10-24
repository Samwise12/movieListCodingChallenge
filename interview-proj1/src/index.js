import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';

import rootReducer from './rootReducer';
import App from './App';

const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(thunk)
		)
	);

ReactDOM.render(<BrowserRouter>
		<Provider store={store}>
			<Route component={App} />
		</Provider>
	</BrowserRouter>,
 document.getElementById('root'));
registerServiceWorker();

