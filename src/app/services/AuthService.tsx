import apiHelper from "../helpers/ApiHelper";

class AuthService {
	login(
		document: string,
		password: string
	): Promise<any> {
		return apiHelper.post('/auth/login', {
			document,
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
		return apiHelper.post('/auth/reset-password', { password, passwordConfirm }, {
			'Authorization': token
		});
	}
}
export default new AuthService();
