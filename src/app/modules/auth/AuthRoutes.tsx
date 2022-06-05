import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './Auth';
import PageNotFound from './pages/PageNotFound';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';

const AuthRoutes = (): JSX.Element => (
	<Routes>
		<Route element={<Auth />}>
			<Route path="/" element={<Navigate to="login" />} />
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />
			<Route path="forgot-password" element={<ForgotPassword />} />
			<Route path="reset-password/:token" element={<ResetPassword />} />
			<Route path="*" element={<PageNotFound />} />
		</Route>
	</Routes>
);

export default AuthRoutes;
