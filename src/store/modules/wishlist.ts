/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-explicit-any, no-debugger */
import { wishlistItem } from "@/helper/wishlistItem";
import { find, isEmpty } from "lodash";
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
  }
};

export const actions = {
  addToWishList({ commit }: any, campsite: any) {
    const wishlist: any = [...state.wishlist];
    const item = wishlistItem(campsite);
    const existingItem = find(wishlist, { id: item.id });
    const itemExists = !isEmpty(existingItem);

    if (itemExists) {
      commit("REMOVE_ITEM_FROM_WISHLIST", item);
    } else {
      commit("ADD_ITEM_TO_WISHLIST", item);
    }
  },
  deleteFromWishlist({ commit }: any, id: any) {
    const item: any = find(state.wishlist, { id });
    const newlist = state.wishlist.filter((value: any) => value.id !== item.id);
    commit("DELETE_FROM_WISHLIST", newlist);
  }
};

export const getters = {};
