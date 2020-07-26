/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-explicit-any */
import campsiteService from "@/services/campsiteService";

export const state = {
  token: null
};

export const mutations = {
  SET_TOKEN(state: any, token: string) {
    state.token = token;
  }
};

export const actions = {
  authenticateClient({ commit }: any) {
    return new Promise((resolve, reject) => {
      campsiteService
        .authenticate()
        .then((response: any) => {
          if (response.status === 200) {
            const { data } = response;
            resolve();
            commit("SET_TOKEN", data.data.token);
          }
        })
        .catch((err: any) => {
          console.error(err);
          reject();
        });
    });
  }
};

export const getters = {};
