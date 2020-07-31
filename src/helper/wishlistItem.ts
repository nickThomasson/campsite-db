/* eslint-disable  @typescript-eslint/no-explicit-any */
export const wishlistItem = (item: any) => {
  return {
    id: item["id"],
    title: item["name"],
    zip: item["address"]["zip"],
    city: item["address"]["city"],
    county: item["address"]["county"],
    street: item["address"]["street"],
    housenumber: item["address"]["houseNumber"],
    type: "rooms" in item ? "house" : "campsite"
  };
};
