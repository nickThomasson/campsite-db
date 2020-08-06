/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-explicit-any */
import campsiteService from "@/services/campsiteService";
import { Status } from "@/helper/status";
import { isEmpty } from "lodash";
import { AuthenticationInterface } from "@/interfaces/interfaces";

export const state = {
  token: null,
  userData: {},
  userAuthStatus: Status.Init
};

export const mutations = {
  SET_TOKEN(state: any, token: string) {
    state.token = token;
  },
  CHANGE_AUTH_STATUS(state: any, status: any) {
    state.userAuthStatus = status;
  },
  SET_USER(state: any, data: any) {
    state.userData = data;
  },
  REMOVE_USER(state: any) {
    state.userData = {};
  }
};

export const actions = {
  authenticateClient({ commit, dispatch }: any) {
    return new Promise((resolve, reject) => {
      campsiteService
        .authenticate()
        .then((response: any) => {
          if (response.status === 200) {
            const { data } = response;
            commit("SET_TOKEN", data.data.token);
            resolve();
          }
        })
        .catch((err: any) => {
          const { message } = err.response.data.error;
          commit("CHANGE_STATUS", Status.Error);
          dispatch("activateError", message);
          console.error(err);
          reject();
        });
    });
  },

  refreshToken({ commit }: any, token: string) {
    campsiteService
      .refresh(token)
      .then((response: any) => {
        if (response.status === 200) {
          const { data } = response;
          commit("SET_TOKEN", data.data.token);
        }
      })
      .catch((err: any) => {
        console.error(err);
      });
  },

  authenticateUser(
    { commit, dispatch }: any,
    authData: AuthenticationInterface
  ) {
    commit("CHANGE_AUTH_STATUS", Status.Loading);
    campsiteService
      .authenticateUser(authData)
      .then((response: any) => {
        if (response.status === 200) {
          const { data } = response;
          commit("SET_USER", data.data);
          dispatch("deactivateError");
        } else {
          commit("CHANGE_AUTH_STATUS", Status.Error);
        }
      })
      .catch((err: any) => {
        const { message } = err.response.data.error;
        commit("CHANGE_AUTH_STATUS", Status.Error);
        dispatch("activateError", message);
      });
  },

  logoutUser({ commit }: any, token: string) {
    commit("CHANGE_AUTH_STATUS", Status.Loading);
    campsiteService
      .logoutUser(token)
      .then((response: any) => {
        if (response.status === 200) {
          commit("REMOVE_USER");
          commit("CHANGE_AUTH_STATUS", Status.Init);
        }
      })
      .catch((err: any) => {
        commit("CHANGE_AUTH_STATUS", Status.Error);
        console.log(err);
      });
  }
};

export const getters = {
  userIsLoggedIn: (state: any) => {
    return !isEmpty(state.userData);
  }
};
