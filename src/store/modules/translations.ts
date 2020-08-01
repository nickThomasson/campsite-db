/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-explicit-any */
import { Status } from "@/helper/status";
import campsiteService from "@/services/campsiteService";
import { getRequestUrl } from "@/helper/routes";
import { find } from "lodash";

export const state = {
  dictionary: {},
  activeLanguage: "de-DE",
  languages: [],
  importedLanguage: undefined,
  importStatus: Status.Init
};

export const mutations = {
  SAVE_TRANSLATIONS(state: any, translations: object) {
    state.dictionary = translations;
  },
  SAVE_LANGUAGES(state: any, languages: any) {
    state.languages = languages;
  },
  IMPORT_LANGUAGE(state: any, data: any) {
    state.importedLanguage = data;
  },
  CHANGE_IMPORT_STATUS(state: any, status: any) {
    state.importStatus = status;
  }
};

export const actions = {
  fetchTranslations({ commit }: any, token: string) {
    return new Promise((resolve, reject) => {
      campsiteService
        .fetchCollectionItems(getRequestUrl("translations", false), token)
        .then((response: any) => {
          if (response.status === 200) {
            resolve();
            commit("SAVE_LANGUAGES", response.data.data);
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

  setLanguage({ commit }: any, data: any) {
    return new Promise(resolve => {
      commit("IMPORT_LANGUAGE", data);
      resolve();
    });
  },

  patchLanguage({ commit }: any, payload: any) {
    return new Promise((resolve, reject) => {
      const item: any = state.importedLanguage || {};
      if (item.language === payload.iso) {
        campsiteService
          .updateItem(payload.token, "translations", item.id, item)
          .then((response: any) => {
            if (response.status === 200) {
              resolve();
            } else {
              commit("CHANGE_IMPORT_STATUS", Status.Error);
              reject();
            }
          })
          .catch((err: any) => {
            commit("CHANGE_IMPORT_STATUS", Status.Error);
            reject();
            console.log(err);
          });
      } else {
        commit("CHANGE_IMPORT_STATUS", Status.NonMatchingIds);
        reject();
      }
    });
  },

  updateLanguage({ dispatch, commit }: any, payload: any) {
    return new Promise((resolve, reject) => {
      commit("CHANGE_IMPORT_STATUS", Status.Loading);
      dispatch("setLanguage", payload.item)
        .then(() => {
          dispatch("patchLanguage", payload)
            .then(() => {
              dispatch("fetchTranslations", payload.token).then(() => {
                commit("CHANGE_IMPORT_STATUS", Status.Ready);
                resolve();
              });
            })
            .catch(() => {
              reject();
            });
        })
        .catch(() => {
          reject();
        });
    });
  }
};

export const getters = {
  i18n: (state: any, getters: any) => {
    return getters.currentLanguage.dictionary;
  },
  currentLanguage: (state: any) => {
    const currentLang = find(state.languages, {
      language: state.activeLanguage
    });
    return currentLang;
  }
};
