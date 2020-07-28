/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-explicit-any */
import { Status } from "@/helper/status";

export const state = {
  filterMenu: false,
  loadingStatus: Status.Init,
  filterKey: 1,
  resetKey: 1
};

export const mutations = {
  CHANGE_STATUS(state: any, status: any) {
    state.loadingStatus = status;
  },
  CHANGE_FILTER_KEY(state: any, value: number) {
    state.filterKey = value;
  },
  CHANGE_RESET_KEY(state: any, value: number) {
    state.resetKey = value;
  }
};

export const actions = {
  changeStatus({ commit }: any, status: any) {
    commit("CHANGE_STATUS", status);
  }
};

export const getters = {};
