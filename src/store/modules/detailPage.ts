/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-explicit-any */
import campsiteService from "@/services/campsiteService";
import { find, isEmpty } from "lodash";
import { Status } from "@/helper/status";
import { getRequestUrl } from "@/helper/routes";

export const state = {
  page: {},
  addresses: [],
  houses: [],
  gallery: []
};

export const mutations = {
  SAVE_PAGE(state: any, page: any) {
    state.page = page;
  },
  SAVE_ADDRESSES(state: any, addresses: any) {
    state.addresses = addresses;
  },
  SAVE_HOUSES(state: any, houses: any) {
    state.houses = houses;
  },
  SAVE_GALLERY(state: any, gallery: any) {
    state.gallery = gallery;
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

  fetchPageData({ dispatch, commit }: any, payload: any) {
    commit("CHANGE_STATUS", Status.Loading);
    dispatch("fetchPage", payload).then(() => {
      dispatch("fetchAddresses", payload.token).then(() => {
        dispatch("fetchHouses", payload.token).then(() => {
          dispatch("fetchGalleries", payload.token).then(() => {
            commit("CHANGE_STATUS", Status.Ready);
          });
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
    const houses = state.houses;
    const houseIds = [];
    const mergedPageData: any = {};

    if (campsite && addresses) {
      if ("adresse" in campsite) {
        const address = find(addresses, { id: campsite.adresse[0].address_id });
        for (const haus of campsite.haus) {
          houseIds.push(haus.house_id);
        }
        mergedPageData["campsite"] = campsite;
        mergedPageData["address"] = address;
      }
      if ("haus" in campsite) {
        if (!isEmpty(campsite.haus)) {
          const getHouses = [];
          for (const houseId of houseIds) {
            const house = find(houses, { id: houseId });
            getHouses.push(house);
          }

          mergedPageData["house"] = getHouses;
        }
      }

      return mergedPageData;
    }
    return undefined;
  },
  gallery: (state: any) => {
    const gallery = [...state.gallery];
    const pageGallery = gallery.filter(
      item => item.campsite_id.id === state.page.id
    );
    const filteredItems = [];
    for (const item of pageGallery) {
      filteredItems.push(item.directus_files_id.data);
    }
    return filteredItems;
  }
};
