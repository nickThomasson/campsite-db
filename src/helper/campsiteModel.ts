import {
  CampsiteInterface,
  AddressInterface,
  HouseInterface
} from "@/interfaces/interfaces";

const campsiteModel = (campsite: CampsiteInterface) => {
  return {
    id: campsite["id"],
    status: campsite["status"],
    name: campsite["name"],
    previewImage: campsite["vorschaubild"],
    persons: campsite["personen"],
    kitchen: campsite["kitchen"],
    sanitary: campsite["sanitary"],
    price: campsite["preis"],
    rating: campsite["bewertung"]
  };
};

const campsiteModelMultiple = (campsite: Array<CampsiteInterface>) => {
  const campsites = [];
  for (const item of campsite) {
    if (item) {
      campsites.push(campsiteModel(item));
    }
  }
  return campsites;
};

const addressModel = (address: AddressInterface) => {
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

const houseModel = (house: HouseInterface) => {
  return {
    id: house["id"],
    name: house["name"],
    beds: house["betten"],
    rooms: house["seminarraeume"],
    price: house["preis"],
    annotations: house["bemerkungen"],
    rating: house["rating"],
    kitchen: house["kitchen"],
    sanitary: house["sanitary"],
    av: house["av"],
    wifi: house["wifi"],
    additionalEquipment: house["additional_equipment"],
    previewImage: house["preview_image"],
    recreationalRoom: house["recreational_room"]
  };
};

const houseModelMultiple = (house: Array<HouseInterface>) => {
  const houses = [];
  for (const item of house) {
    if (item) {
      houses.push(houseModel(item));
    }
  }
  return houses;
};

export const combinedCampsiteModel = (
  campsite: CampsiteInterface,
  address: AddressInterface,
  house: Array<HouseInterface>,
  gallery: Array<object>
) => {
  const combinedCampsiteObject = {
    ...campsiteModel(campsite),
    address: addressModel(address),
    house: houseModelMultiple(house),
    gallery
  };
  return combinedCampsiteObject;
};

export const combinedHouseModel = (
  house: HouseInterface,
  address: AddressInterface,
  campsite: Array<CampsiteInterface>,
  gallery: Array<object>
) => {
  const combinedHouseObject = {
    ...houseModel(house),
    address: addressModel(address),
    campsites: campsiteModelMultiple(campsite),
    gallery
  };
  return combinedHouseObject;
};
