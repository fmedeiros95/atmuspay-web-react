import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import PageNotFound from './pages/PageNotFound';
import AuthRoutes from './modules/auth/AuthRoutes';
import AccountRoutes from './modules/account/AccountRoutes';
import useAuth from './hooks/useAuth';
import ComingSoon from './components/ComingSoon';

const AppRoutes = (): JSX.Element => {
	const { token, currentUser } = useAuth();

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<App />}>
					<Route path="/" element={<Navigate to={ token ? '/account' : '/auth' } />} />
					{ !token && <Route path="auth/*" element={<AuthRoutes />} /> }
					{ token && <Route path="account/*" element={<AccountRoutes />} /> }
					{ currentUser?.admin.is_admin && <Route path='admin/*' element={<ComingSoon />} /> }
					<Route path='*' element={<PageNotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRoutes;
