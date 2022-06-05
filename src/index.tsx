import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import './scss/app.scss';
import './scss/icons.scss';
import './style.scss';

// Import bootstrap
import 'bootstrap/dist/js/bootstrap.js';

import AppRoutes from './app/AppRoutes';
import { AuthProvider } from './app/contexts/AuthContext';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	// <React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<AppRoutes />
			</AuthProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
