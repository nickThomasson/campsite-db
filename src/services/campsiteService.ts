import axios from "axios";
import { ROUTE } from "@/helper/routes";
import { Authentication } from "@/interfaces/interfaces";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

const authData: object = {
  email: process.env.VUE_APP_USERNAME,
  password: process.env.VUE_APP_PASSWORD
};

export default {
  authenticate() {
    return apiClient.post(ROUTE.AUTH, authData);
  },
  authenticateUser(authData: Authentication) {
    return apiClient.post(ROUTE.AUTH, authData);
  },
  logoutUser(token: string) {
    return apiClient.post(ROUTE.LOGOUT, {
      headers: {
        Authorization: `bearer ${token}`
      }
    });
  },
  refresh(token: string) {
    return apiClient.post(ROUTE.REFRESH, {
      token
    });
  },
  fetchCollectionItems(requestUrl: string, token: string) {
    return apiClient.get(requestUrl, {
      headers: {
        Authorization: `bearer ${token}`
      }
    });
  },

  updateItem(token: string, collection: string, id: number, item: object) {
    return apiClient.patch(`${ROUTE.ITEMS}${collection}/${id}`, item, {
      headers: {
        Authorization: `bearer ${token}`
      }
    });
  }
};
