export const wishlistItem = (item: {
  [key: string]: { [key: string]: string };
}) => {
  return {
    id: item["id"],
    title: item["name"],
    zip: item["address"]["zip"],
    city: item["address"]["city"],
    county: item["address"]["county"],
    street: item["address"]["street"],
    houseNumber: item["address"]["houseNumber"],
    type: "rooms" in item ? "house" : "campsite"
  };
};
