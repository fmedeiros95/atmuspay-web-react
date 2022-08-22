import { Axios, AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

const getToken = (): string | null => {
	if (!localStorage) return null;

	const token: string | null = localStorage.getItem('token');
	if (!token) return null;

	return token;
}

const setToken = (token: string): void => {
	if (!localStorage) return;

	localStorage.setItem('token', token);
}

const removeToken = () => {
	if (!localStorage) return

	localStorage.removeItem('token')
}

const setupAxios = (axios: Axios) => {
	axios.defaults.baseURL = process.env.REACT_APP_API_URL || '';

	// Request interceptor
	axios.interceptors.request.use(
		(config: AxiosRequestConfig) => {
			const token = getToken();
			if (token) config.headers = { 'Authorization': token }

			return config;
		}
	);

	// Response interceptor
	axios.interceptors.response.use(
		(res: any) => res,
		(err: any) => {
			if (err.response.status === 401) removeToken();

			toast.remove();
			toast.error(err.response.data?.message?.message || err.message || 'Something went wrong');
			return Promise.reject(err);
		}
	);
}

export {
	getToken,
	setToken,
	removeToken,
	setupAxios
}
