/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReturnId } from "@/classes/interfaces";
import { find } from "lodash";

interface Wishlist {
  [key: string]: { [key: string]: string } | any;
}

export class WishlistItem implements ReturnId {
  private item: Wishlist;
  private address: any;

  constructor(item: Wishlist) {
    this.item = item;
    this.address = find(item.address, { mainAddress: true }) || item.address[0];
  }

  get() {
    return {
      id: this.item["id"],
      title: this.item["name"],
      zip: this.address["zip"],
      city: this.address["city"],
      county: this.address["county"],
      street: this.address["street"],
      houseNumber: this.address["houseNumber"],
      type: "rooms" in this.item ? "house" : "campsite"
    };
  }

  id() {
    return this.item["id"];
  }
}
