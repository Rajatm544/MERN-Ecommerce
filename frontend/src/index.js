import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './bootstrap.min.css';
import './index.css';
import App from './App';
import store from './store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);

serviceWorkerRegistration.unregister();
