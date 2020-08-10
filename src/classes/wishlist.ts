/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReturnId } from "@/classes/interfaces";

interface Wishlist {
  [key: string]: { [key: string]: string } | any;
}

export class WishlistItem implements ReturnId {
  private item: Wishlist;

  constructor(item: Wishlist) {
    this.item = item;
  }

  get() {
    return {
      id: this.item["id"],
      title: this.item["name"],
      zip: this.item["mainAddress"]["zip"],
      city: this.item["mainAddress"]["city"],
      state: this.item["mainAddress"]["state"],
      street: this.item["mainAddress"]["street"],
      houseNumber: this.item["mainAddress"]["houseNumber"],
      type: "rooms" in this.item ? "house" : "campsite"
    };
  }

  id() {
    return this.item["id"];
  }
}
