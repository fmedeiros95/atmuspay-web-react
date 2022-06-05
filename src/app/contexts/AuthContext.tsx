import { createContext, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import * as authHelper from '../helpers/AuthHelper';
import useAuth from '../hooks/useAuth';
import userService from '../services/UserService';

type AuthContextProps = {
	token: any;
	saveToken: (auth: any) => void;
	currentUser: any;
	setCurrentUser: Dispatch<SetStateAction<any>>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
	token: authHelper.getToken(),
	saveToken: () => {},
	currentUser: undefined,
	setCurrentUser: () => {},
	logout: () => {}
});

const AuthProvider = ({ children }: any): JSX.Element => {
	const [ token, setToken ] = useState<any>(authHelper.getToken());
	const [ currentUser, setCurrentUser ] = useState<any>(undefined);

	const saveToken = (_token: any): void => {
		setToken(_token);
		if (_token) authHelper.setToken(_token);
		else authHelper.removeToken();
	};

	const logout = (): void => {
		saveToken(undefined);
		setCurrentUser(undefined);
	};

	return (
		<AuthContext.Provider value={{ token, saveToken, currentUser, setCurrentUser, logout }}>
			{ children }
		</AuthContext.Provider>
	)
}

const AuthInit = ({ children }: any): JSX.Element => {
	const { token, logout, setCurrentUser } = useAuth();
	const didRequest = useRef(false)

	useEffect(() => {
		const requestUser = async () => {
			try {
				if (!didRequest.current) {
					const { data } = await userService.get();
					if (data) setCurrentUser(data.user);
				}
			} catch (err) {
				if (!didRequest.current) {
					logout();
				}
			}

			return () => (didRequest.current = true);
		}

		if (token) requestUser();
		else logout();

		// eslint-disable-next-line
	}, []);

	return <>{ children }</>
}

export {
	AuthInit,
	AuthContext,
	AuthProvider
};
