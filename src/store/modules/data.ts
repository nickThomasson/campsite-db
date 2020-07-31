/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-explicit-any */
import campsiteService from "@/services/campsiteService";
import { renderItems, renderAddressItems } from "@/helper/renderItems";
import { max, min, find, pull, random, isEmpty } from "lodash";
import { registerFilter } from "@/helper/registerFilter";
import { Status } from "@/helper/status";
import { getRequestUrl } from "@/helper/routes";
import {
  combinedCampsiteModel,
  combinedHouseModel
} from "@/helper/campsiteModel";

export const state = {
  collectionName: "campsite",
  itemId: "",
  limit: 10,
  offset: 0,
  sort: "id",
  status: "published",
  search: "",
  fields: "*.*",
  activeFilter: [],
  results: [],
  addresses: [],
  personFilter: null,
  campsiteCount: 0,
  houses: [],
  gallery: []
};

export const mutations = {
  SAVE_RESULTS(state: any, results: Array<object>) {
    state.results = results;
  },
  SAVE_ADDRESSES(state: any, addresses: Array<object>) {
    state.addresses = addresses;
  },
  SAVE_HOUSES(state: any, houses: Array<object>) {
    state.houses = houses;
  },
  SET_PERSON_COUNT(state: any, count: number) {
    state.personFilter = count;
  },
  SET_PAGE_LIMIT(state: any, count: number) {
    state.limit = count;
  },
  RESET_FILTER(state: any) {
    state.activeFilter = [];
  },
  REGISTER_ACTIVE_FILTER(state: any, activeFilter: Array<object>) {
    state.activeFilter = activeFilter;
  },
  SET_CAMPSITE_COUNT(state: any, count: any) {
    state.campsiteCount = count;
  },
  CHANGE_OFFSET(state: any, pageOffset: any) {
    state.offset = pageOffset;
  },
  SAVE_GALLERY(state: any, gallery: any) {
    state.gallery = gallery;
  }
};

export const actions = {
  fetchCampsites({ state, commit, getters }: any, payload: any) {
    const urlstatic = getRequestUrl("campsite", false);
    const urldynamic = getRequestUrl(
      "campsite",
      getters.combinedFilter,
      state.sort,
      state.offset,
      state.limit,
      true,
      true
    );
    return new Promise((resolve, reject) => {
      campsiteService
        .fetchCollectionItems(
          payload.dynamic ? urldynamic : urlstatic,
          payload.token
        )
        .then((response: any) => {
          if (response.status === 200) {
            commit("SAVE_RESULTS", response.data.data);
            resolve();
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

  fetchCampsiteCount({ commit }: any, token: string) {
    return new Promise((resolve, reject) => {
      campsiteService
        .fetchCollectionItems(
          getRequestUrl(
            "campsite",
            false,
            undefined,
            undefined,
            -1,
            true,
            true
          ),
          token
        )
        .then((response: any) => {
          if (response.status === 200) {
            commit("SET_CAMPSITE_COUNT", response.data.data.length);
            resolve();
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

  fetchAddresses({ commit }: any, token: string) {
    return new Promise((resolve, reject) => {
      campsiteService
        .fetchCollectionItems(getRequestUrl("address", false), token)
        .then((response: any) => {
          if (response.status === 200) {
            commit("SAVE_ADDRESSES", response.data.data);
            resolve();
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

  fetchHouses({ commit, getters }: any, payload: any) {
    const urlstatic = getRequestUrl("house", false);
    const urldynamic = getRequestUrl(
      "house",
      getters.combinedFilter,
      state.sort,
      state.offset,
      state.limit,
      true,
      true
    );
    return new Promise((resolve, reject) => {
      campsiteService
        .fetchCollectionItems(
          payload.dynamic ? urldynamic : urlstatic,
          payload.token
        )
        .then((response: any) => {
          if (response.status === 200) {
            commit("SAVE_HOUSES", response.data.data);
            resolve();
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

  fetchGalleries({ commit }: any, token: string) {
    return new Promise((resolve, reject) => {
      campsiteService
        .fetchCollectionItems(getRequestUrl("campsite_gallery", false), token)
        .then((response: any) => {
          if (response.status === 200) {
            commit("SAVE_GALLERY", response.data.data);
            resolve();
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

  initActiveFilter({ commit }: any, filter: any) {
    const activeFilter: Array<object> = [...state.activeFilter];
    const existingFilter: any = find(activeFilter, {
      filterName: filter["filterName"]
    });

    if (existingFilter) {
      if (filter.rawValue === null) {
        pull(activeFilter, existingFilter);
      } else if (filter.rawValue !== null) {
        if (filter.rawValue.length === 0) {
          pull(activeFilter, existingFilter);
        }
      }
    } else {
      if (filter["isActive"]) {
        activeFilter.push(filter);
      }
    }

    commit("REGISTER_ACTIVE_FILTER", activeFilter);
  },

  registerPersonFilter({ dispatch }: any, filterValues: any) {
    return new Promise(resolve => {
      const filterContent = `&filter[personen][between]=${filterValues.join(
        ","
      )}`;
      dispatch(
        "initActiveFilter",
        registerFilter("personFilter", true, filterContent)
      );
      resolve();
    });
  },

  registerKitchenFilter({ dispatch }: any, filterValue: boolean) {
    return new Promise(resolve => {
      const filterContent = `&filter[kueche][neq]=${filterValue}`;
      dispatch(
        "initActiveFilter",
        registerFilter("kitchenFilter", filterValue, filterContent)
      );
      resolve();
    });
  },

  registerSanitaryFilter({ dispatch }: any, filterValue: boolean) {
    return new Promise(resolve => {
      const filterContent = `&filter[sanitaeranlagen][neq]=${filterValue}`;
      dispatch(
        "initActiveFilter",
        registerFilter("sanitaryFilter", filterValue, filterContent)
      );
      resolve();
    });
  },

  registerStateFilter({ dispatch }: any, payload: any) {
    return new Promise(resolve => {
      const filterContent = `&filter[id][in]=${payload.value}`;
      dispatch(
        "initActiveFilter",
        registerFilter(
          "stateFilter",
          payload.rawValue !== null ? true : false,
          filterContent,
          payload.rawValue
        )
      );
      resolve();
    });
  },

  registerCountyFilter({ dispatch }: any, payload: any) {
    return new Promise(resolve => {
      const filterContent = `&filter[id][in]=${payload.value}`;
      dispatch(
        "initActiveFilter",
        registerFilter(
          "countyFilter",
          payload.rawValue !== null ? true : false,
          filterContent,
          payload.rawValue
        )
      );
      resolve();
    });
  },

  registerCityFilter({ dispatch }: any, payload: any) {
    return new Promise(resolve => {
      const filterContent = `&filter[id][in]=${payload.value}`;
      dispatch(
        "initActiveFilter",
        registerFilter(
          "cityFilter",
          payload.rawValue !== null ? true : false,
          filterContent,
          payload.rawValue
        )
      );
      resolve();
    });
  },

  applyFilter({ dispatch, commit }: any, payload: any) {
    if (payload.type === "personFilter") {
      dispatch("registerPersonFilter", payload.value).then(() => {
        dispatch("fetchCampsites", { dynamic: true, token: payload.token });
      });
    }

    if (payload.type === "kitchenFilter") {
      dispatch("registerKitchenFilter", payload.value).then(() => {
        dispatch("fetchCampsites", { dynamic: true, token: payload.token });
      });
    }

    if (payload.type === "sanitaryFilter") {
      dispatch("registerSanitaryFilter", payload.value).then(() => {
        dispatch("fetchCampsites", { dynamic: true, token: payload.token });
      });
    }

    if (payload.type === "stateFilter") {
      dispatch("registerStateFilter", payload).then(() => {
        dispatch(payload.dispatchName, { dynamic: true, token: payload.token });
      });
    }

    if (payload.type === "countyFilter") {
      dispatch("registerCountyFilter", payload).then(() => {
        dispatch(payload.dispatchName, { dynamic: true, token: payload.token });
      });
    }

    if (payload.type === "cityFilter") {
      dispatch("registerCityFilter", payload).then(() => {
        dispatch(payload.dispatchName, { dynamic: true, token: payload.token });
      });
    }

    commit("CHANGE_RESET_KEY", random(5, true));
  },

  resetFilter({ commit }: any) {
    return new Promise(resolve => {
      commit("RESET_FILTER");
      commit("CHANGE_OFFSET", 0);
      commit("CHANGE_FILTER_KEY", random(5, true));
      resolve();
    });
  },

  applyReset({ dispatch, commit }: any, payload: any) {
    dispatch("resetFilter").then(() => {
      commit("CHANGE_OFFSET", 0);
      dispatch(payload.dispatchName, { dynamic: true, token: payload.token });
    });
  },

  changePageLimit({ commit }: any, limit: any) {
    return new Promise(resolve => {
      commit("SET_PAGE_LIMIT", limit);
      commit("CHANGE_OFFSET", 0);
      resolve();
    });
  },

  applyPageLimit({ dispatch }: any, limit: any) {
    dispatch("changePageLimit", limit.value).then(() => {
      dispatch(limit.dispatchName, { dynamic: true, token: limit.token });
    });
  },

  fetchData({ dispatch }: any, token: string) {
    return new Promise(resolve => {
      dispatch("fetchTranslations", token).then(() => {
        dispatch("fetchCampsiteCount", token);
        dispatch("fetchCampsites", { dynamic: false, token }).then(() => {
          dispatch("fetchAddresses", token).then(() => {
            dispatch("fetchHouses", { dynamic: false, token }).then(() => {
              dispatch("fetchGalleries", token).then(() => {
                resolve();
              });
            });
          });
        });
      });
    });
  },

  changePage({ commit, dispatch }: any, payload: any) {
    return new Promise(resolve => {
      commit("CHANGE_OFFSET", payload.pageOffset);
      resolve();
    }).then(() => {
      dispatch(payload.dispatchName, { dynamic: true, token: payload.token });
    });
  }
};

export const getters = {
  pageCount: (state: any) => {
    return Math.ceil(state.campsiteCount / state.limit);
  },
  campsiteStates: (state: any, getters: any) => {
    return renderAddressItems(getters.campsites, "state");
  },
  campsiteCounties: (state: any, getters: any) => {
    return renderAddressItems(getters.campsites, "county");
  },
  campsiteCities: (state: any, getters: any) => {
    return renderAddressItems(getters.campsites, "city");
  },
  houseStates: (state: any, getters: any) => {
    return renderAddressItems(getters.houses, "state");
  },
  houseCounties: (state: any, getters: any) => {
    return renderAddressItems(getters.houses, "county");
  },
  houseCities: (state: any, getters: any) => {
    return renderAddressItems(getters.houses, "city");
  },
  personCount: (state: any) => {
    const values = renderItems(state.results, "personen");
    return [min(values), max(values)];
  },
  campsites: (state: any) => {
    const mergedResults: Array<object> = [];

    const campsites = state.results;
    const addresses = state.addresses;
    const houses = state.houses;
    const galleries = state.gallery;

    for (const campsite of campsites) {
      const address = find(addresses, { id: campsite.adresse[0].address_id });

      const housesArray = [];

      if (!isEmpty(campsite.haus)) {
        for (const house of campsite.haus) {
          const houseItem = find(houses, { id: house.house_id });
          housesArray.push(houseItem);
        }
      }

      const gallery: any = [];
      if (!isEmpty(campsite.galerie)) {
        for (const image of campsite.galerie) {
          const imageObject = find(galleries, { id: image.id });
          gallery.push(imageObject.directus_files_id.data);
        }
      }

      mergedResults.push(
        combinedCampsiteModel(campsite, address, housesArray, gallery)
      );
    }

    return mergedResults;
  },
  houses: (state: any) => {
    const mergedResults: Array<object> = [];

    const addresses = state.addresses;
    const houses = state.houses;

    for (const house of houses) {
      const address = find(addresses, { id: house.adresse[0].address_id });

      mergedResults.push(combinedHouseModel(house, address));
    }

    return mergedResults;
  },
  combinedFilter: (state: any) => {
    const combinedFilter: Array<string> = [];

    for (const filter of state.activeFilter) {
      combinedFilter.push(filter.filterRequest);
    }

    return combinedFilter.length === 0 ? undefined : combinedFilter.join("");
  },
  hasActiveFilter: (state: any) => {
    return state.activeFilter.length > 0;
  }
};
