/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-explicit-any */
import campsiteService from "@/services/campsiteService";
import { find } from "lodash";
import { Status } from "@/helper/status";
import { getRequestUrl } from "@/helper/routes";

export const state = {
  page: {},
  addresses: [],
  campsiteAddresses: [],
  loadingStatus: Status.Init
};

export const mutations = {
  CHANGE_STATUS(state: any, status: any) {
    state.loadingStatus = status;
  },
  SAVE_PAGE(state: any, page: any) {
    state.page = page;
  },
  SAVE_ADDRESSES(state: any, addresses: any) {
    state.addresses = addresses;
  },
  SAVE_CAMPSITE_ADDRESSES(state: any, campsiteAddresses: any) {
    state.campsiteAddresses = campsiteAddresses;
  }
};

export const actions = {
  fetchPage({ commit }: any, payload: any) {
    return new Promise((resolve, reject) => {
      campsiteService
        .fetchCollectionItems(
          getRequestUrl("campsite", `&filter[id][eq]=${payload.id}`),
          payload.token
        )
        .then((response: any) => {
          if (response.status === 200) {
            resolve();
            commit("SAVE_PAGE", response.data.data[0]);
          } else {
            commit("CHANGE_STATUS", Status.Error);
            reject();
          }
        })
        .catch((err: any) => {
          commit("CHANGE_STATUS", Status.Error);
          console.error(err);
          reject();
        });
    });
  },

  fetchPageAddresses({ commit }: any, token: string) {
    return new Promise((resolve, reject) => {
      campsiteService
        .fetchCollectionItems(getRequestUrl("address", false), token)
        .then((response: any) => {
          if (response.status === 200) {
            resolve();
            commit("SAVE_ADDRESSES", response.data.data);
          } else {
            commit("CHANGE_STATUS", Status.Error);
            reject();
          }
        })
        .catch((err: any) => {
          commit("CHANGE_STATUS", Status.Error);
          console.error(err);
          reject();
        });
    });
  },

  fetchPageCampsiteAddresses({ commit }: any, token: string) {
    return new Promise((resolve, reject) => {
      campsiteService
        .fetchCollectionItems(getRequestUrl("campsite_address", false), token)
        .then((response: any) => {
          if (response.status === 200) {
            commit("SAVE_CAMPSITE_ADDRESSES", response.data.data);
            resolve();
          } else {
            commit("CHANGE_STATUS", Status.Error);
            reject();
          }
        })
        .catch((err: any) => {
          commit("CHANGE_STATUS", Status.Error);
          reject();
          console.error(err);
        });
    });
  },

  fetchPageData({ dispatch, commit }: any, payload: any) {
    commit("CHANGE_STATUS", Status.Loading);
    dispatch("fetchPage", payload).then(() => {
      dispatch("fetchPageAddresses", payload.token).then(() => {
        dispatch("fetchPageCampsiteAddresses", payload.token).then(() => {
          commit("CHANGE_STATUS", Status.Ready);
        });
      });
    });
  },

  changePageStatus({ commit }: any) {
    commit("CHANGE_STATUS", status);
  }
};

export const getters = {
  mergedPageData: (state: any) => {
    const campsite = state.page;
    const addresses = state.addresses;

    if (campsite && addresses) {
      if ("adresse" in campsite) {
        const address = find(addresses, { id: campsite.adresse[0].address_id });
        return { campsite, address };
      }
    }
    return undefined;
  }
};
