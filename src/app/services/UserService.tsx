import apiHelper from "../helpers/ApiHelper";

class UserService {
	get() {
		return apiHelper.get('/user');
	}

	getByID(
		userId: string | number
	) {
		return apiHelper.get(`/user/${userId}`);
	}
}

export default new UserService();
