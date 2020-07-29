/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-explicit-any */
import { Status } from "@/helper/status";
import campsiteService from "@/services/campsiteService";
import { getRequestUrl } from "@/helper/routes";
import { find } from "lodash";

export const state = {
  dictionary: {},
  language: "de-DE"
};

export const mutations = {
  SAVE_TRANSLATIONS(state: any, translations: object) {
    state.dictionary = translations;
  }
};

export const actions = {
  fetchTranslations({ commit, state }: any, token: string) {
    return new Promise((resolve, reject) => {
      campsiteService
        .fetchCollectionItems(getRequestUrl("translations", false), token)
        .then((response: any) => {
          if (response.status === 200) {
            const lang = find(response.data.data, { language: state.language });
            if (lang) {
              resolve();
              commit("SAVE_TRANSLATIONS", lang.dictionary);
            } else {
              commit("CHANGE_STATUS", Status.Error);
              reject();
            }
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
  }
};

export const getters = {
  i18n: (state: any) => {
    return state.dictionary;
  }
};
