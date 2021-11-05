import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import { HelmetProvider } from 'react-helmet-async';
import './bootstrap.min.css';
import './index.css';

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<HelmetProvider>
				<App />
			</HelmetProvider>
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);
