import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Loader from './components/loader/Loader';
import { AuthInit } from './contexts/AuthContext';
import { LayoutProvider } from './contexts/LayoutContext';

const App = (): JSX.Element => {
	return (
		<>
			<LayoutProvider>
				<Loader />
				<AuthInit>
					<Outlet />
				</AuthInit>

				<Toaster />
			</LayoutProvider>
		</>
	)
};

export default App;
