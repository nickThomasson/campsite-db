/* eslint-disable @typescript-eslint/no-explicit-any */
const campsiteModel = (campsite: any) => {
  return {
    id: campsite["id"],
    status: campsite["status"],
    name: campsite["name"],
    previewImage: campsite["vorschaubild"],
    persons: campsite["personen"],
    kitchen: campsite["kueche"],
    sanitary: campsite["sanitaeranlagen"],
    price: campsite["preis"],
    rating: campsite["bewertung"]
  };
};

const addressModel = (address: any) => {
  return {
    street: address["strasse"],
    houseNumber: address["hausnummer"],
    zip: address["plz"],
    city: address["stadt"],
    name: address["name"],
    website: address["website"],
    email: address["email"],
    phone: address["telefon"],
    fax: address["fax"],
    state: address["bundesland"],
    county: address["landkreis"]
  };
};

const houseModel = (house: any) => {
  const houses = [];
  for (const item of house) {
    houses.push({
      name: item["name"],
      beds: item["betten"],
      rooms: item["seminarraeume"],
      price: item["preis"],
      annotations: item["bemerkungen"]
    });
  }

  return houses;
};

export const combinedCampsiteModel = (
  campsite: any,
  address = {},
  house = {},
  gallery = {}
) => {
  const campsiteM = campsiteModel(campsite);
  const addressM = addressModel(address);
  const houseM = houseModel(house);
  const combinedCampsiteObject = {
    ...campsiteM,
    //combinedPrice: campsiteM.price + houseM.price,
    address: addressM,
    house: houseM,
    gallery
  };
  return combinedCampsiteObject;
};
