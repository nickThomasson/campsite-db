import { splitAddresses } from "./../../helper/splitAddresses";
/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-explicit-any */
import campsiteService from "@/services/campsiteService";
import { renderAddressItems } from "@/helper/renderItems";
import { find, pull, random } from "lodash";
import { Status } from "@/helper/status";
import { getRequestUrl } from "@/helper/requestUrl";
import {
  CreateCampsite,
  RelatedIds,
  CreateHouse,
  CreateAddress,
  CreateGallery
} from "@/classes/data";
import { CreateFilter } from "@/classes/filter";
import {
  ChangePageInterface,
  PageLimitInterface,
  ApplyFilterInterface
} from "@/interfaces/interfaces";
import { ERROR } from "@/helper/errorMessages";

export const state = {
  collectionName: "campsites",
  itemId: "",
  limit: 10,
  offset: 0,
  sort: "id",
  status: "published",
  search: "",
  fields: "*.*",
  activeFilter: [],
  results: [],
  unfilteredResults: [],
  addresses: [],
  houses: [],
  unfilteredHouses: [],
  gallery: [],
  ranges: []
};

export const mutations = {
  SAVE_RESULTS(state: any, results: Array<object>) {
    state.results = results;
  },
  SAVE_UNFILTERED_RESULTS(state: any, results: Array<object>) {
    state.unfilteredResults = results;
  },
  SAVE_ADDRESSES(state: any, addresses: Array<object>) {
    state.addresses = addresses;
  },
  SAVE_HOUSES(state: any, houses: Array<object>) {
    state.houses = houses;
  },
  SAVE_UNFILTERED_HOUSES(state: any, houses: Array<object>) {
    state.unfilteredHouses = houses;
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
    const dynamicUrl = {
      collectionName: "campsites",
      filterQuery: getters.combinedFilter,
      sortCriteria: state.sort,
      offset: state.offset,
      limit: state.limit,
      detailedView: "*.*",
      onlyPublished: true
    };

    const urlstatic = getRequestUrl({
      collectionName: "campsites",
      detailedView: "*.*"
    });

    const urldynamic = getRequestUrl(dynamicUrl);

    const urlfilter = getRequestUrl({
      ...dynamicUrl,
      limit: -1,
      offset: 0
    });

    const requestType = () => {
      if (payload.dynamic) return urldynamic;
      if (payload.filterDynamic) return urlfilter;
      return urlstatic;
    };

    return new Promise<void>((resolve, reject) => {
      campsiteService
        .fetchCollectionItems(requestType(), payload.token)
        .then((response: any) => {
          if (response.status === 200) {
            if (payload.filterDynamic) {
              commit("SAVE_UNFILTERED_RESULTS", response.data.data);
            } else {
              commit("SAVE_RESULTS", response.data.data);
            }
            dispatch("deactivateError");
            resolve();
          } else {
            commit("CHANGE_STATUS", Status.Error);
            dispatch("activateError", ERROR.FETCH_DATA);
            reject();
          }
        })
        .catch((err: any) => {
          commit("CHANGE_STATUS", Status.Error);
          dispatch("activateError", ERROR.FETCH_DATA);
          console.error(err);
          reject();
        });
    });
  },

  fetchAddresses({ commit, dispatch }: any, token: string) {
    return new Promise<void>((resolve, reject) => {
      campsiteService
        .fetchCollectionItems(
          getRequestUrl({ collectionName: "addresses", detailedView: "*.*" }),
          token
        )
        .then((response: any) => {
          if (response.status === 200) {
            commit("SAVE_ADDRESSES", response.data.data);
            dispatch("deactivateError");
            resolve();
          } else {
            commit("CHANGE_STATUS", Status.Error);
            dispatch("activateError", ERROR.FETCH_DATA);
            reject();
          }
        })
        .catch((err: any) => {
          commit("CHANGE_STATUS", Status.Error);
          dispatch("activateError", ERROR.FETCH_DATA);
          console.error(err);
          reject();
        });
    });
  },

  fetchHouses({ commit, getters, dispatch }: any, payload: any) {
    const dynamicUrl = {
      collectionName: "houses",
      filterQuery: getters.combinedFilter,
      sortCriteria: state.sort,
      offset: state.offset,
      limit: state.limit,
      detailedView: "*.*",
      onlyPublished: true
    };

    const urlstatic = getRequestUrl({
      collectionName: "houses",
      detailedView: "*.*"
    });

    const urldynamic = getRequestUrl(dynamicUrl);

    const urlfilter = getRequestUrl({
      ...dynamicUrl,
      limit: -1,
      offset: 0
    });

    const requestType = () => {
      if (payload.dynamic) return urldynamic;
      if (payload.filterDynamic) return urlfilter;
      return urlstatic;
    };

    return new Promise<void>((resolve, reject) => {
      campsiteService
        .fetchCollectionItems(requestType(), payload.token)
        .then((response: any) => {
          if (response.status === 200) {
            if (payload.filterDynamic) {
              commit("SAVE_UNFILTERED_HOUSES", response.data.data);
            } else {
              commit("SAVE_HOUSES", response.data.data);
            }
            dispatch("deactivateError");
            resolve();
          } else {
            commit("CHANGE_STATUS", Status.Error);
            dispatch("activateError", ERROR.FETCH_DATA);
            reject();
          }
        })
        .catch((err: any) => {
          commit("CHANGE_STATUS", Status.Error);
          dispatch("activateError", ERROR.FETCH_DATA);
          console.error(err);
          reject();
        });
    });
  },

  fetchGalleries({ commit, dispatch }: any, token: string) {
    return new Promise<void>((resolve, reject) => {
      campsiteService
        .fetchCollectionItems(
          getRequestUrl({
            collectionName: "campsite_gallery",
            detailedView: "*.*"
          }),
          token
        )
        .then((response: any) => {
          if (response.status === 200) {
            commit("SAVE_GALLERY", response.data.data);
            dispatch("deactivateError");
            resolve();
          } else {
            commit("CHANGE_STATUS", Status.Error);
            dispatch("activateError", ERROR.FETCH_DATA);
            reject();
          }
        })
        .catch((err: any) => {
          commit("CHANGE_STATUS", Status.Error);
          dispatch("activateError", ERROR.FETCH_DATA);
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
    return new Promise<void>(resolve => {
      const query = {
        field: "persons",
        operator: "_between",
        value: payload.value.join(",")
      };
      const parameter = {
        filterName: "personFilter",
        isActive: true,
        rawValue: payload.rawValue
      };

      const filter = new CreateFilter(parameter, query);
      dispatch("initActiveFilter", filter.get());
      resolve();
    });
  },

  registerPriceFilter({ dispatch }: any, payload: any) {
    return new Promise<void>(resolve => {
      const query = {
        field: "price",
        operator: "_between",
        value: payload.value.join(",")
      };
      const parameter = {
        filterName: "priceFilter",
        isActive: true,
        rawValue: payload.rawValue
      };

      const filter = new CreateFilter(parameter, query);
      dispatch("initActiveFilter", filter.get());
      resolve();
    });
  },

  registerBedFilter({ dispatch }: any, payload: any) {
    return new Promise<void>(resolve => {
      const query = {
        field: "beds",
        operator: "_between",
        value: payload.value.join(",")
      };

      const parameter = {
        filterName: "bedFilter",
        isActive: true,
        rawValue: payload.rawValue
      };

      const filter = new CreateFilter(parameter, query);
      dispatch("initActiveFilter", filter.get());
      resolve();
    });
  },

  registerKitchenFilter({ dispatch }: any, payload: any) {
    return new Promise<void>(resolve => {
      const query = {
        field: "kitchen",
        operator: "_eq",
        value: payload.value
      };

      const parameter = {
        filterName: "kitchenFilter",
        isActive: payload.value,
        rawValue: payload.rawValue
      };

      const filter = new CreateFilter(parameter, query);
      dispatch("initActiveFilter", filter.get());
      resolve();
    });
  },

  registerSanitaryFilter({ dispatch }: any, payload: any) {
    return new Promise<void>(resolve => {
      const query = {
        field: "sanitary",
        operator: "_eq",
        value: payload.value
      };

      const parameter = {
        filterName: "sanitaryFilter",
        isActive: payload.value,
        rawValue: payload.rawValue
      };

      const filter = new CreateFilter(parameter, query);
      dispatch("initActiveFilter", filter.get());
      resolve();
    });
  },

  registerWifiFilter({ dispatch }: any, payload: any) {
    return new Promise<void>(resolve => {
      const query = {
        field: "wifi",
        operator: "_eq",
        value: payload.value
      };

      const parameter = {
        filterName: "wifiFilter",
        isActive: payload.value,
        rawValue: payload.rawValue
      };

      const filter = new CreateFilter(parameter, query);
      dispatch("initActiveFilter", filter.get());
      resolve();
    });
  },

  registerAvFilter({ dispatch }: any, payload: any) {
    return new Promise<void>(resolve => {
      const query = {
        field: "av",
        operator: "_eq",
        value: payload.value
      };

      const parameter = {
        filterName: "avFilter",
        isActive: payload.value,
        rawValue: payload.rawValue
      };

      const filter = new CreateFilter(parameter, query);
      dispatch("initActiveFilter", filter.get());
      resolve();
    });
  },

  registerRecreationalFilter({ dispatch }: any, payload: any) {
    return new Promise<void>(resolve => {
      const query = {
        field: "recreational_room",
        operator: "_eq",
        value: payload.value
      };

      const parameter = {
        filterName: "recreationalFilter",
        isActive: payload.value,
        rawValue: payload.rawValue
      };

      const filter = new CreateFilter(parameter, query);
      dispatch("initActiveFilter", filter.get());
      resolve();
    });
  },

  registerStateFilter({ dispatch }: any, payload: any) {
    return new Promise<void>(resolve => {
      const query = {
        field: "id",
        operator: "_in",
        value: payload.value
      };

      const parameter = {
        filterName: "stateFilter",
        isActive: payload.rawValue !== null ? true : false,
        rawValue: payload.rawValue
      };

      const filter = new CreateFilter(parameter, query);
      dispatch("initActiveFilter", filter.get());
      resolve();
    });
  },

  registerCountryFilter({ dispatch }: any, payload: any) {
    return new Promise<void>(resolve => {
      const query = {
        field: "id",
        operator: "_in",
        value: payload.value
      };

      const parameter = {
        filterName: "countryFilter",
        isActive: payload.rawValue !== null ? true : false,
        rawValue: payload.rawValue
      };

      const filter = new CreateFilter(parameter, query);
      dispatch("initActiveFilter", filter.get());
      resolve();
    });
  },

  registerCountyFilter({ dispatch }: any, payload: any) {
    return new Promise<void>(resolve => {
      const query = {
        field: "id",
        operator: "_in",
        value: payload.value
      };

      const parameter = {
        filterName: "countyFilter",
        isActive: payload.rawValue !== null ? true : false,
        rawValue: payload.rawValue
      };

      const filter = new CreateFilter(parameter, query);
      dispatch("initActiveFilter", filter.get());
      resolve();
    });
  },

  registerCityFilter({ dispatch }: any, payload: any) {
    return new Promise<void>(resolve => {
      const query = {
        field: "id",
        operator: "_in",
        value: payload.value
      };

      const parameter = {
        filterName: "cityFilter",
        isActive: payload.rawValue !== null ? true : false,
        rawValue: payload.rawValue
      };

      const filter = new CreateFilter(parameter, query);
      dispatch("initActiveFilter", filter.get());
      resolve();
    });
  },

  applyFilter({ dispatch, commit }: any, payload: ApplyFilterInterface) {
    const filterType = (type: string) => {
      return `register${type.charAt(0).toUpperCase()}${type.slice(1)}`;
    };

    dispatch(filterType(payload.type), payload).then(() => {
      dispatch(payload.dispatchName, { dynamic: true, token: payload.token });
      dispatch(payload.dispatchName, {
        dynamic: false,
        filterDynamic: true,
        token: payload.token
      });
    });

    commit("CHANGE_RESET_KEY", random(5, true));
  },

  resetFilter({ commit }: any) {
    return new Promise<void>(resolve => {
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
    return new Promise<void>(resolve => {
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
    return new Promise<void>(resolve => {
      dispatch("fetchTranslations", token).then(() => {
        dispatch("fetchCampsites", { dynamic: false, token }).then(() => {
          dispatch("fetchCampsites", {
            dynamic: false,
            filterDynamic: true,
            token
          });
          dispatch("fetchAddresses", token).then(() => {
            dispatch("fetchHouses", { dynamic: false, token }).then(() => {
              dispatch("fetchHouses", {
                filterDynamic: true,
                dynamic: false,
                token
              });
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
    return new Promise<void>(resolve => {
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

  campsiteCountries: (state: any, getters: any) => {
    if (!getters.campsites) return [];
    return renderAddressItems({
      source: getters.unfilteredCampsites,
      key: "country"
    });
  },

  campsiteStates: (state: any, getters: any) => {
    if (!getters.campsites) return [];
    return renderAddressItems({
      source: getters.unfilteredCampsites,
      key: "state"
    });
  },

  campsiteCounties: (state: any, getters: any) => {
    if (!getters.campsites) return [];
    return renderAddressItems({
      source: getters.unfilteredCampsites,
      key: "county"
    });
  },

  campsiteCities: (state: any, getters: any) => {
    if (!getters.campsites) return [];
    return renderAddressItems({
      source: getters.unfilteredCampsites,
      key: "city"
    });
  },

  houseCountries: (state: any, getters: any) => {
    if (!getters.houses) return [];
    return renderAddressItems({
      source: getters.unfilteredHouses,
      key: "country"
    });
  },

  houseStates: (state: any, getters: any) => {
    if (!getters.houses) return [];
    return renderAddressItems({
      source: getters.unfilteredHouses,
      key: "state"
    });
  },

  houseCounties: (state: any, getters: any) => {
    if (!getters.houses) return [];
    return renderAddressItems({
      source: getters.unfilteredHouses,
      key: "county"
    });
  },
  houseCities: (state: any, getters: any) => {
    if (!getters.houses) return [];
    return renderAddressItems({
      source: getters.unfilteredHouses,
      key: "city"
    });
  },

  campsites: (state: any) => {
    const combinedCampsites: Array<object> = [];

    for (const item of state.results) {
      const campsite: any = new CreateCampsite(item.id, state.results);
      const houseIds = new RelatedIds(
        item.id,
        state.results,
        "houses",
        "houses_id"
      );

      const addressIds = new RelatedIds(
        item.id,
        state.results,
        "addresses",
        "addresses_id"
      );

      const houses: Array<object> = [];
      for (const id of houseIds.getIds()) {
        const house = new CreateHouse(id, state.houses);
        houses.push(house.get());
      }

      const addresses: Array<object> = [];
      for (const id of addressIds.getIds()) {
        const address = new CreateAddress(id, state.addresses);
        addresses.push(address.get());
      }
      const addressItems: any = splitAddresses(addresses);

      const gallery = new CreateGallery(item.id, state.gallery, "campsites_id");

      combinedCampsites.push({
        ...campsite.get(),
        house: houses,
        address: addressItems.normalAddresses,
        mainAddress: addressItems.mainAddress,
        gallery: gallery.get()
      });
    }

    return combinedCampsites;
  },

  unfilteredCampsites: (state: any) => {
    const combinedCampsites: Array<object> = [];

    for (const item of state.unfilteredResults) {
      const campsite: any = new CreateCampsite(
        item.id,
        state.unfilteredResults
      );
      const houseIds = new RelatedIds(
        item.id,
        state.unfilteredResults,
        "houses",
        "houses_id"
      );

      const addressIds = new RelatedIds(
        item.id,
        state.unfilteredResults,
        "addresses",
        "addresses_id"
      );

      const houses: Array<object> = [];
      for (const id of houseIds.getIds()) {
        const house = new CreateHouse(id, state.houses);
        houses.push(house.get());
      }

      const addresses: Array<object> = [];
      for (const id of addressIds.getIds()) {
        const address = new CreateAddress(id, state.addresses);
        addresses.push(address.get());
      }
      const addressItems: any = splitAddresses(addresses);

      const gallery = new CreateGallery(item.id, state.gallery, "campsites_id");

      combinedCampsites.push({
        ...campsite.get(),
        house: houses,
        address: addressItems.normalAddresses,
        mainAddress: addressItems.mainAddress,
        gallery: gallery.get()
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
        "campsites",
        "campsites_id"
      );

      const addressIds = new RelatedIds(
        item.id,
        state.houses,
        "addresses",
        "addresses_id"
      );

      const campsites: Array<object> = [];
      for (const id of campsiteIds.getIds()) {
        const campsite = new CreateCampsite(id, state.results);
        campsites.push(campsite.get());
      }

      const addresses: Array<object> = [];
      for (const id of addressIds.getIds()) {
        const address = new CreateAddress(id, state.addresses);
        addresses.push(address.get());
      }
      const addressItems: any = splitAddresses(addresses);

      const gallery = new CreateGallery(item.id, state.gallery, "houses_id");

      combinedHouses.push({
        ...house.get(),
        campsites: campsites,
        address: addressItems.normalAddresses,
        mainAddress: addressItems.mainAddress,
        gallery: gallery.get()
      });
    }

    return combinedHouses;
  },

  unfilteredHouses: (state: any) => {
    const combinedHouses: Array<object> = [];

    for (const item of state.unfilteredHouses) {
      const house: any = new CreateHouse(item.id, state.unfilteredHouses);
      const campsiteIds = new RelatedIds(
        item.id,
        state.unfilteredHouses,
        "campsites",
        "campsites_id"
      );

      const addressIds = new RelatedIds(
        item.id,
        state.unfilteredHouses,
        "addresses",
        "addresses_id"
      );

      const campsites: Array<object> = [];
      for (const id of campsiteIds.getIds()) {
        const campsite = new CreateCampsite(id, state.results);
        campsites.push(campsite.get());
      }

      const addresses: Array<object> = [];
      for (const id of addressIds.getIds()) {
        const address = new CreateAddress(id, state.addresses);
        addresses.push(address.get());
      }
      const addressItems: any = splitAddresses(addresses);

      const gallery = new CreateGallery(item.id, state.gallery, "houses_id");

      combinedHouses.push({
        ...house.get(),
        campsites: campsites,
        address: addressItems.normalAddresses,
        mainAddress: addressItems.mainAddress,
        gallery: gallery.get()
      });
    }

    return combinedHouses;
  },

  combinedFilter: (state: any) => {
    const combinedFilter: Array<string> = [];

    for (const filter of state.activeFilter) {
      combinedFilter.push(filter.query);
    }

    return combinedFilter.length === 0 ? undefined : combinedFilter.join("");
  },

  hasActiveFilter: (state: any) => {
    return state.activeFilter.length > 0;
  }
};
