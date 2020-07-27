import axios from "axios";
import { ROUTE, CREDENTIALS } from "@/helper/routes";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

const authData = {
  email: CREDENTIALS.EMAIL,
  password: CREDENTIALS.PASSWORD
};

export default {
  authenticate() {
    return apiClient.post(ROUTE.AUTH, authData);
  },
  fetchCollectionItems(requestUrl: string, token: string) {
    return apiClient.get(requestUrl, {
      headers: {
        Authorization: `bearer ${token}`
      }
    });
  }
};
