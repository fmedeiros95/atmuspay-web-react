import axios, { AxiosRequestHeaders } from "axios";
import { setupAxios } from "./AuthHelper";

// Axios Interceptor
setupAxios(axios);

class ApiHelper {
	get(endpoint: string, headers?: AxiosRequestHeaders): Promise<any> {
		return axios.get(endpoint, { headers });
	}
	post(endpoint: string, body: any, headers?: AxiosRequestHeaders): Promise<any> {
		return axios.post(endpoint, body, { headers });
	}
	put(endpoint: string, body: any, headers?: AxiosRequestHeaders): Promise<any> {
		return axios.put(endpoint, body, { headers });
	}
	delete(endpoint: string, headers?: AxiosRequestHeaders): Promise<any> {
		return axios.delete(endpoint, { headers });
	}
}

export default new ApiHelper();
