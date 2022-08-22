import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Loader from './components/loader/Loader';
import { AuthInit } from './contexts/AuthContext';
import { LayoutProvider } from './contexts/LayoutContext';
import socketIOClient, { Socket } from "socket.io-client";
import { useEffect} from 'react';

const App = (): JSX.Element => {
	useEffect((): any => {
		const wsUrl: string = process.env.REACT_APP_WS_URL || '';
		const newSocket: Socket = socketIOClient(wsUrl);
		newSocket.on('connect', () => {
			console.log('[SOCKET] Connected to server!');
		});
		newSocket.on('disconnect', () => {
			console.log('[SOCKET] Disconnected from server!');
		});
		newSocket.emit('auth', {
			command: "authenticate",
			payload: {
				name: 'Jhon Doe',
				username: 'jdoe'
			}
		});
		newSocket.on('authenticated', (data: any) => {
			console.log('[SOCKET] Authenticated! ', data);
		});
		return () => newSocket.close();
	}, []);

	return <LayoutProvider>
		<Loader />
		<AuthInit>
			<Outlet />
		</AuthInit>

		<Toaster />
	</LayoutProvider>;
};

export default App;
