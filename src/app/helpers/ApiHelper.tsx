import axios from "axios";
import { setupAxios } from "./AuthHelper";

// Axios Interceptor
setupAxios(axios);

class ApiHelper {
	get(endpoint: string): Promise<any> {
		return axios.get(endpoint);
	}
	post(endpoint: string, body: any): Promise<any> {
		return axios.post(endpoint, body);
	}
	put(endpoint: string, body: any): Promise<any> {
		return axios.put(endpoint, body);
	}
	delete(endpoint: string): Promise<any> {
		return axios.delete(endpoint);
	}
}

export default new ApiHelper();
