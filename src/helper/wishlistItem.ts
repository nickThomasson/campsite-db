/* eslint-disable  @typescript-eslint/no-explicit-any */
export const wishlistItem = (item: any) => {
  return {
    id: item["campsite"]["id"],
    title: item["address"]["name"],
    zip: item["address"]["plz"],
    city: item["address"]["stadt"],
    county: item["address"]["bundesland"],
    street: item["address"]["strasse"],
    housenumber: item["address"]["hausnummer"]
  };
};
