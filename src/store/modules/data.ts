/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-explicit-any */
import campsiteService from "@/services/campsiteService";
import { renderAddressItems } from "@/helper/renderItems";
import { find, pull, random } from "lodash";
import { registerFilter } from "@/helper/registerFilter";
import { Status } from "@/helper/status";
import { getRequestUrl } from "@/helper/routes";
import {
  CreateCampsite,
  RelatedIds,
  CreateHouse,
  CreateAddress,
  CreateGallery
} from "@/classes/classes";
import {
  ChangePageInterface,
  PageLimitInterface,
  ApplyFilterInterface
} from "@/interfaces/interfaces";

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
  houses: [],
  gallery: [],
  ranges: []
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
  SET_PAGE_LIMIT(state: any, count: number) {
    state.limit = count;
  },
  RESET_FILTER(state: any) {
    state.activeFilter = [];
  },
  REGISTER_ACTIVE_FILTER(state: any, activeFilter: Array<object>) {
    state.activeFilter = activeFilter;
  },
  CHANGE_OFFSET(state: any, pageOffset: any) {
    state.offset = pageOffset;
  },
  SAVE_GALLERY(state: any, gallery: any) {
    state.gallery = gallery;
  },
  SET_RANGES(state: any, ranges: Array<object>) {
    state.ranges = ranges;
  }
};

export const actions = {
  fetchCampsites({ state, commit, getters, dispatch }: any, payload: any) {
    const urlstatic = getRequestUrl({ collectionName: "campsite" });
    const urldynamic = getRequestUrl({
      collectionName: "campsite",
      filterQuery: getters.combinedFilter,
      sortCriteria: state.sort,
      offset: state.offset,
      limit: state.limit,
      detailedView: true,
      onlyPublished: true
    });
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
          const { message } = err.response.data.error;
          commit("CHANGE_STATUS", Status.Error);
          dispatch("activateError", message);
          console.error(err);
          reject();
        });
    });
  },

  fetchAddresses({ commit, dispatch }: any, token: string) {
    return new Promise((resolve, reject) => {
      campsiteService
        .fetchCollectionItems(
          getRequestUrl({ collectionName: "address" }),
          token
        )
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
          const { message } = err.response.data.error;
          commit("CHANGE_STATUS", Status.Error);
          dispatch("activateError", message);
          console.error(err);
          reject();
        });
    });
  },

  fetchHouses({ commit, getters, dispatch }: any, payload: any) {
    const urlstatic = getRequestUrl({ collectionName: "house" });
    const urldynamic = getRequestUrl({
      collectionName: "house",
      filterQuery: getters.combinedFilter,
      sortCriteria: state.sort,
      offset: state.offset,
      limit: state.limit,
      detailedView: true,
      onlyPublished: true
    });
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
          const { message } = err.response.data.error;
          commit("CHANGE_STATUS", Status.Error);
          dispatch("activateError", message);
          console.error(err);
          reject();
        });
    });
  },

  fetchGalleries({ commit, dispatch }: any, token: string) {
    return new Promise((resolve, reject) => {
      campsiteService
        .fetchCollectionItems(
          getRequestUrl({ collectionName: "campsite_gallery" }),
          token
        )
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
          const { message } = err.response.data.error;
          commit("CHANGE_STATUS", Status.Error);
          dispatch("activateError", message);
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

    const rawValue = filter.rawValue;

    const checkValueType = (value: any) => {
      const valueType = typeof value;
      if (Array.isArray(value)) {
        return "array";
      }
      return valueType;
    };

    if (existingFilter) {
      if (!rawValue || checkValueType(rawValue) === "array") {
        pull(activeFilter, existingFilter);
      }

      if (checkValueType(rawValue) === "array") {
        activeFilter.push(filter);
      }
    } else if (filter["isActive"]) {
      activeFilter.push(filter);
    }

    commit("REGISTER_ACTIVE_FILTER", activeFilter);
  },

  registerPersonFilter({ dispatch }: any, payload: any) {
    return new Promise(resolve => {
      const filterContent = `&filter[persons][between]=${payload.value.join(
        ","
      )}`;
      dispatch(
        "initActiveFilter",
        registerFilter({
          filterName: "personFilter",
          isActive: true,
          filterRequest: filterContent,
          rawValue: payload.rawValue
        })
      );
      resolve();
    });
  },

  registerPriceFilter({ dispatch }: any, payload: any) {
    return new Promise(resolve => {
      const filterContent = `&filter[price][between]=${payload.value.join(
        ","
      )}`;
      dispatch(
        "initActiveFilter",
        registerFilter({
          filterName: "priceFilter",
          isActive: true,
          filterRequest: filterContent,
          rawValue: payload.rawValue
        })
      );
      resolve();
    });
  },

  registerBedFilter({ dispatch }: any, payload: any) {
    return new Promise(resolve => {
      const filterContent = `&filter[beds][between]=${payload.value.join(",")}`;
      dispatch(
        "initActiveFilter",
        registerFilter({
          filterName: "bedFilter",
          isActive: true,
          filterRequest: filterContent,
          rawValue: payload.rawValue
        })
      );
      resolve();
    });
  },

  registerKitchenFilter({ dispatch }: any, payload: any) {
    return new Promise(resolve => {
      const filterContent = `&filter[kitchen][neq]=${payload.value}`;
      dispatch(
        "initActiveFilter",
        registerFilter({
          filterName: "kitchenFilter",
          isActive: payload.value,
          filterRequest: filterContent,
          rawValue: payload.rawValue
        })
      );
      resolve();
    });
  },

  registerSanitaryFilter({ dispatch }: any, payload: any) {
    return new Promise(resolve => {
      const filterContent = `&filter[sanitary][neq]=${payload.value}`;
      dispatch(
        "initActiveFilter",
        registerFilter({
          filterName: "sanitaryFilter",
          isActive: payload.value,
          filterRequest: filterContent,
          rawValue: payload.rawValue
        })
      );
      resolve();
    });
  },

  registerWifiFilter({ dispatch }: any, payload: any) {
    return new Promise(resolve => {
      const filterContent = `&filter[wifi][neq]=${payload.value}`;
      dispatch(
        "initActiveFilter",
        registerFilter({
          filterName: "wifiFilter",
          isActive: payload.value,
          filterRequest: filterContent,
          rawValue: payload.rawValue
        })
      );
      resolve();
    });
  },

  registerAvFilter({ dispatch }: any, payload: any) {
    return new Promise(resolve => {
      const filterContent = `&filter[av][neq]=${payload.value}`;
      dispatch(
        "initActiveFilter",
        registerFilter({
          filterName: "avFilter",
          isActive: payload.value,
          filterRequest: filterContent,
          rawValue: payload.rawValue
        })
      );
      resolve();
    });
  },

  registerRecreationalFilter({ dispatch }: any, payload: any) {
    return new Promise(resolve => {
      const filterContent = `&filter[recreational_room][neq]=${payload.value}`;
      dispatch(
        "initActiveFilter",
        registerFilter({
          filterName: "recreationalFilter",
          isActive: payload.value,
          filterRequest: filterContent,
          rawValue: payload.rawValue
        })
      );
      resolve();
    });
  },

  registerStateFilter({ dispatch }: any, payload: any) {
    return new Promise(resolve => {
      const filterContent = `&filter[id][in]=${payload.value}`;
      dispatch(
        "initActiveFilter",
        registerFilter({
          filterName: "stateFilter",
          isActive: payload.rawValue !== null ? true : false,
          filterRequest: filterContent,
          rawValue: payload.rawValue
        })
      );
      resolve();
    });
  },

  registerCountyFilter({ dispatch }: any, payload: any) {
    return new Promise(resolve => {
      const filterContent = `&filter[id][in]=${payload.value}`;
      dispatch(
        "initActiveFilter",
        registerFilter({
          filterName: "countyFilter",
          isActive: payload.rawValue !== null ? true : false,
          filterRequest: filterContent,
          rawValue: payload.rawValue
        })
      );
      resolve();
    });
  },

  registerCityFilter({ dispatch }: any, payload: any) {
    return new Promise(resolve => {
      const filterContent = `&filter[id][in]=${payload.value}`;
      dispatch(
        "initActiveFilter",
        registerFilter({
          filterName: "cityFilter",
          isActive: payload.rawValue !== null ? true : false,
          filterRequest: filterContent,
          rawValue: payload.rawValue
        })
      );
      resolve();
    });
  },

  applyFilter({ dispatch, commit }: any, payload: ApplyFilterInterface) {
    const filterType = (type: string) => {
      return `register${type.charAt(0).toUpperCase()}${type.slice(1)}`;
    };

    dispatch(filterType(payload.type), payload).then(() => {
      dispatch(payload.dispatchName, { dynamic: true, token: payload.token });
    });

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
      dispatch("fetchCampsites", { dynamic: true, token: payload.token });
      dispatch("fetchHouses", { dynamic: true, token: payload.token });
    });
  },

  changePageLimit({ commit }: any, limit: number) {
    return new Promise(resolve => {
      commit("SET_PAGE_LIMIT", limit);
      commit("CHANGE_OFFSET", 0);
      resolve();
    });
  },

  applyPageLimit({ dispatch }: any, limit: PageLimitInterface) {
    dispatch("changePageLimit", limit.value).then(() => {
      dispatch(limit.dispatchName, { dynamic: true, token: limit.token });
    });
  },

  fetchData({ dispatch }: any, token: string) {
    return new Promise(resolve => {
      dispatch("fetchTranslations", token).then(() => {
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

  changePage({ commit, dispatch }: any, payload: ChangePageInterface) {
    return new Promise(resolve => {
      commit("CHANGE_OFFSET", payload.pageOffset);
      resolve();
    }).then(() => {
      dispatch(payload.dispatchName, { dynamic: true, token: payload.token });
    });
  },

  setRanges({ commit }: any, ranges: Array<object>) {
    commit("SET_RANGES", ranges);
  }
};

export const getters = {
  pageCountCampsites: (state: any) => {
    return Math.ceil(state.ranges.itemCountCampsites / state.limit);
  },
  pageCountHouses: (state: any) => {
    return Math.ceil(state.ranges.itemCountHouses / state.limit);
  },
  campsiteStates: (state: any, getters: any) => {
    if (getters.campsites) {
      return renderAddressItems({ source: getters.campsites, key: "state" });
    }
    return [];
  },
  campsiteCounties: (state: any, getters: any) => {
    if (getters.campsites) {
      return renderAddressItems({ source: getters.campsites, key: "county" });
    }
    return [];
  },
  campsiteCities: (state: any, getters: any) => {
    if (getters.campsites) {
      return renderAddressItems({ source: getters.campsites, key: "city" });
    }
    return [];
  },
  houseStates: (state: any, getters: any) => {
    if (getters.houses) {
      return renderAddressItems({ source: getters.houses, key: "state" });
    }
    return [];
  },
  houseCounties: (state: any, getters: any) => {
    if (getters.houses) {
      return renderAddressItems({ source: getters.houses, key: "county" });
    }
    return [];
  },
  houseCities: (state: any, getters: any) => {
    if (getters.houses) {
      return renderAddressItems({ source: getters.houses, key: "city" });
    }
    return [];
  },

  campsites: (state: any) => {
    const combinedCampsites: Array<object> = [];

    for (const item of state.results) {
      const campsite: any = new CreateCampsite(item.id, state.results);
      const houseIds = new RelatedIds(
        item.id,
        state.results,
        "houses",
        "house_id"
      );

      const addressIds = new RelatedIds(
        item.id,
        state.results,
        "addresses",
        "address_id"
      );

      const houses: Array<object> = [];
      for (const id of houseIds.getIds()) {
        const house = new CreateHouse(id, state.houses);
        houses.push(house.getItem());
      }

      const addresses: Array<object> = [];
      for (const id of addressIds.getIds()) {
        const address = new CreateAddress(id, state.addresses);
        addresses.push(address.getItem());
      }

      const gallery = new CreateGallery(item.id, state.gallery, "campsite_id");

      combinedCampsites.push({
        ...campsite.getItem(),
        house: houses,
        address: addresses[0],
        gallery: gallery.getItem()
      });
    }

    return combinedCampsites;
  },

  houses: (state: any) => {
    const combinedHouses: Array<object> = [];

    for (const item of state.houses) {
      const house: any = new CreateHouse(item.id, state.houses);
      const campsiteIds = new RelatedIds(
        item.id,
        state.houses,
        "campsite",
        "campsite_id"
      );

      const addressIds = new RelatedIds(
        item.id,
        state.houses,
        "addresses",
        "address_id"
      );

      const campsites: Array<object> = [];
      for (const id of campsiteIds.getIds()) {
        const campsite = new CreateCampsite(id, state.results);
        campsites.push(campsite.getItem());
      }

      const addresses: Array<object> = [];
      for (const id of addressIds.getIds()) {
        const address = new CreateAddress(id, state.addresses);
        addresses.push(address.getItem());
      }

      const gallery = new CreateGallery(item.id, state.gallery, "house_id");

      combinedHouses.push({
        ...house.getItem(),
        campsites: campsites,
        address: addresses[0],
        gallery: gallery.getItem()
      });
    }

    return combinedHouses;
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
