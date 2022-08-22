import apiHelper from "../helpers/ApiHelper";

class FinanceService {
	getTransactions() {
		// Get current date and format to YYYY-MM-DD
		const currentDate = new Date();
		const formattedDate = currentDate.toISOString().split("T")[0];
		return apiHelper.get(`/user/finance/transactions?initialDate=${formattedDate}&finalDate=${formattedDate}&page=1&results=20&order_type=DESC`);
	}

	getDeposits(type: string) {
		return apiHelper.get(`/user/finance/deposits/${type}`);
	}

	getWithdrawals(type: string) {
		return apiHelper.get(`/user/finance/withdrawals/${type}`);
	}

	getBalance() {
		return apiHelper.get("/user/finance/balance");
	}

	makeDeposit(
		type: string,
		data: { amount: number; }
	) {
		return apiHelper.post(`/user/finance/new-deposit/${type}`, data);
	}

	makeWithdrawal(data: {
		amount: number;
		bank_account_id: string | number;
	}) {
		return apiHelper.post("/user/finance/new-withdrawal", data);
	}

	makeTransfer(data: {
		amount: number;
		user_id: string | number;
	}) {
		return apiHelper.post("/user/finance/new-transfer", data);
	}

}

export default new FinanceService();
