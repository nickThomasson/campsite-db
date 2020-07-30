/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-explicit-any */
export const state = {
  page: {}
};

export const mutations = {
  SAVE_PAGE(state: any, page: any) {
    state.page = page;
  }
};

export const actions = {
  savePage({ commit }: any, page: object) {
    commit("SAVE_PAGE", page);
  }
};

export const getters = {};
