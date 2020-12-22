/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-explicit-any */
import campsiteService from "@/services/campsiteService";
import { Status } from "@/helper/status";
import { isEmpty } from "lodash";
import { Authentication } from "@/interfaces/interfaces";
import { ERROR } from "@/helper/errorMessages";

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
    return new Promise<void>((resolve, reject) => {
      campsiteService
        .authenticate()
        .then((response: any) => {
          if (response.status === 200) {
            const { data } = response;
            commit("SET_TOKEN", data.data.token);
            dispatch("deactivateError");
            resolve();
          }
        })
        .catch((err: any) => {
          console.error(err);
          commit("CHANGE_STATUS", Status.Error);
          dispatch("activateError", ERROR.AUTHENTICATION);
          reject();
        });
    });
  },

  refreshToken({ commit, dispatch }: any, token: string) {
    campsiteService
      .refresh(token)
      .then((response: any) => {
        if (response.status === 200) {
          const { data } = response;
          commit("SET_TOKEN", data.data.token);
          dispatch("deactivateError");
        }
      })
      .catch((err: any) => {
        console.error(err);
        dispatch("activateError", ERROR.AUTHENTICATION_TOKEN_REFRESH);
      });
  },

  authenticateUser({ commit, dispatch }: any, authData: Authentication) {
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
        console.error(err);
        commit("CHANGE_AUTH_STATUS", Status.Error);
        dispatch("activateError", ERROR.AUTHENTICATE_USER);
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
        console.error(err);
      });
  }
};

export const getters = {
  userIsLoggedIn: (state: any) => {
    return !isEmpty(state.userData);
  }
};
