import apiHelper from "../helpers/ApiHelper";

class FinanceService {
	getTransactions() {
		return apiHelper.get("/user/finance/account-extract?initialDate=2022-06-03&finalDate=2022-06-04&page=1&results=20&order_type=DESC");
	}
}

export default new FinanceService();
