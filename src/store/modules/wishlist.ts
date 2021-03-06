/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-explicit-any, no-debugger */
import { find, isEmpty } from "lodash";
import { readFromStorage } from "@/helper/localStorage";
import { WishlistItem } from "@/classes/wishlist";
export const state = {
  wishlist: []
};

export const mutations = {
  ADD_ITEM_TO_WISHLIST(state: any, wishlist: any) {
    state.wishlist.push(wishlist);
  },
  REMOVE_ITEM_FROM_WISHLIST(state: any, wishlist: any) {
    state.wishlist = state.wishlist.filter(
      (value: any) => value.id !== wishlist.id
    );
  },
  DELETE_FROM_WISHLIST(state: any, wishlist: any) {
    state.wishlist = wishlist;
  },
  INITIALIZE_WISHLIST(state: any, cachedStore: any) {
    state.wishlist = cachedStore.wishlist;
  }
};

export const actions = {
  addToWishList({ commit }: any, campsite: any) {
    const wishlist: any = [...state.wishlist];
    const item = new WishlistItem(campsite);
    const existingItem = find(wishlist, { id: item.id() });
    const itemExists = !isEmpty(existingItem);

    if (itemExists) {
      commit("REMOVE_ITEM_FROM_WISHLIST", item.get());
    } else {
      commit("ADD_ITEM_TO_WISHLIST", item.get());
    }
  },

  deleteFromWishlist({ commit }: any, id: any) {
    const item: any = find(state.wishlist, { id });
    const newlist = state.wishlist.filter((value: any) => value.id !== item.id);
    commit("DELETE_FROM_WISHLIST", newlist);
  },

  initializeWishlist({ commit }: any) {
    const storage = readFromStorage({ key: "wishlist" });
    if (storage) {
      commit("INITIALIZE_WISHLIST", storage);
    }
  }
};

export const getters = {};
