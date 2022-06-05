import apiHelper from "../helpers/ApiHelper";

class AuthService {
	login(
		username: string,
		password: string
	): Promise<any> {
		return apiHelper.post('/auth/login', {
			username,
			password
		});
	}

	register(user: any) {
		return apiHelper.post('/auth/register', user);
	}

	forgotPassword(email: string) {
		return apiHelper.post('/auth/forgot-password', { email });
	}

	resetPassword(
		token: string,
		password: string,
		passwordConfirm: string
	) {
		return apiHelper.post('/auth/reset-password', { token, password, passwordConfirm });
	}
}
export default new AuthService();
