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
    name: house["name"],
    beds: house["betten"],
    rooms: house["seminarraeume"],
    price: house["preis"],
    annotations: house["bemerkungen"]
  };
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
    combinedPrice: campsiteM.price + houseM.price,
    address: addressM,
    house: houseM,
    gallery
  };
  return combinedCampsiteObject;
};
