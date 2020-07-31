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
  return {
    id: house["id"],
    name: house["name"],
    beds: house["betten"],
    rooms: house["seminarraeume"],
    price: house["preis"],
    annotations: house["bemerkungen"],
    rating: house["rating"]
  };
};

const houseModelMultiple = (house: any) => {
  const houses = [];
  for (const item of house) {
    houses.push(houseModel(item));
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
  const houseM = houseModelMultiple(house);
  const combinedCampsiteObject = {
    ...campsiteM,
    address: addressM,
    house: houseM,
    gallery
  };
  return combinedCampsiteObject;
};

export const combinedHouseModel = (house: any, address = {}) => {
  const addressM = addressModel(address);
  const houseM = houseModel(house);
  const combinedHouseObject = {
    ...houseM,
    address: addressM
  };
  return combinedHouseObject;
};
