import { ReturnId } from "@/classes/interfaces";

interface Wishlist {
  [key: string]: { [key: string]: string };
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
      zip: this.item["address"]["zip"],
      city: this.item["address"]["city"],
      county: this.item["address"]["county"],
      street: this.item["address"]["street"],
      houseNumber: this.item["address"]["houseNumber"],
      type: "rooms" in this.item ? "house" : "campsite"
    };
  }

  id() {
    return this.item["id"];
  }
}
