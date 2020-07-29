/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-explicit-any */
import { Status } from "@/helper/status";

export const state = {
  filterMenu: false,
  loadingStatus: Status.Init,
  filterKey: 1,
  resetKey: 1,
  activePage: ""
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
  },
  SWITCH_FILTER_MENU(state: any) {
    state.filterMenu = !state.filterMenu;
  },
  SET_ACTIVE_PAGE(state: any, activePage: string) {
    state.activePage = activePage;
  }
};

export const actions = {
  changeStatus({ commit }: any, status: any) {
    commit("CHANGE_STATUS", status);
  },
  switchFilterMenu({ commit }: any) {
    commit("SWITCH_FILTER_MENU");
  },
  setActivePage({ commit }: any, activePage: string) {
    commit("SET_ACTIVE_PAGE", activePage);
  }
};

export const getters = {};
