/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-explicit-any */
import { Status } from "@/helper/status";

export const state = {
  filterMenu: false,
  loadingStatus: Status.Init,
  filterKey: 1,
  resetKey: 1,
  activePage: "",
  showError: false,
  errorMessage: ""
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
  },
  SWITCH_ERROR(state: any, status: boolean) {
    state.showError = status;
  },
  SET_ERROR_MESSAGE(state: any, message: string) {
    state.errorMessage = message;
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
  },
  activateError({ commit }: any, message: string) {
    console.log(message);
    return new Promise(resolve => {
      commit("SET_ERROR_MESSAGE", message);
      resolve();
    }).then(() => {
      commit("SWITCH_ERROR", true);
    });
  },
  deactivateError({ commit }: any) {
    commit("SWITCH_ERROR", false);
  }
};

export const getters = {};
