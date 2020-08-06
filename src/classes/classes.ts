/* eslint-disable @typescript-eslint/no-explicit-any */
import { find } from "lodash";

interface Base {
  id: number;
  name: string;
  price: number;
  kitchen: boolean;
  sanitary: boolean;
}
interface Campsite extends Base {
  status: string;
  previewImage: object;
  persons: number;
  rating: number;
}

interface House extends Base {
  beds: number;
  rooms: number;
  annotations: string;
  rating: number;
  av: boolean;
  wifi: boolean;
  additionalEquipment: Array<string>;
  previewImage: object;
  recreationalRoom: boolean;
}

interface Address {
  street: string;
  houseNumber: string;
  zip: string;
  city: string;
  name: string;
  website: string;
  email: string;
  phone: string;
  fax: string;
  state: string;
  county: string;
}

interface GetSingle {
  id: number;
  formatted?: boolean;
}

interface GetMultiple {
  ids: Array<number>;
  formatted?: boolean;
}

export class CampsiteModel {
  private campsites: Array<object>;

  constructor(campsites: Array<object>) {
    this.campsites = campsites;
  }

  private campsiteModel = (campsite: any) => {
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

  getSingle(payload: GetSingle) {
    const singleCampsite = find(this.campsites, { id: payload.id });

    if (!payload.formatted) {
      return singleCampsite;
    } else {
      return this.campsiteModel(singleCampsite);
    }
  }

  getMultiple(payload: GetMultiple) {
    const multipleCampsites: Array<object> = [];
    for (const id of payload.ids) {
      for (const camp of this.campsites.filter(
        (item: any) => item["id"] === id
      )) {
        multipleCampsites.push(camp);
      }
    }

    if (!payload.formatted) {
      return multipleCampsites;
    } else {
      const formattedCampsites: Array<Campsite> = [];
      for (const campsite of multipleCampsites) {
        formattedCampsites.push(this.campsiteModel(campsite));
      }
      return formattedCampsites;
    }
  }

  getAll(formatted = false) {
    if (!formatted) {
      return this.campsites;
    } else {
      const formattedCampsites: Array<Campsite> = [];
      for (const campsite of this.campsites) {
        formattedCampsites.push(this.campsiteModel(campsite));
      }
      return formattedCampsites;
    }
  }

  getHouseIds(payload: GetSingle) {
    const singleCampsite: any = find(this.campsites, { id: payload.id }) || {};
    const houseIds: Array<number> = [];
    for (const house of singleCampsite.haus) {
      houseIds.push(house.house_id);
    }
    return houseIds;
  }

  getGalleryIds(payload: GetSingle) {
    const singleCampsite: any = find(this.campsites, { id: payload.id }) || {};
    const galleryIds: Array<number> = [];
    for (const gallery of singleCampsite.galerie) {
      galleryIds.push(gallery.directus_files_id);
    }
    return galleryIds;
  }

  getAddressIds(payload: GetSingle) {
    const singleCampsite: any = find(this.campsites, { id: payload.id }) || {};
    const addressIds: Array<number> = [];
    for (const address of singleCampsite.adresse) {
      addressIds.push(address.address_id);
    }
    return addressIds;
  }
}

export class HouseModel {
  private houses: Array<object>;

  constructor(houses: Array<object>) {
    this.houses = houses;
  }

  private houseModel = (house: any) => {
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

  getSingle(payload: GetSingle) {
    const singleCampsite = find(this.houses, { id: payload.id });

    if (!payload.formatted) {
      return singleCampsite;
    } else {
      return this.houseModel(singleCampsite);
    }
  }

  getMultiple(payload: GetMultiple) {
    const multipleHouses: Array<object> = [];
    for (const id of payload.ids) {
      for (const house of this.houses.filter(
        (item: any) => item["id"] === id
      )) {
        multipleHouses.push(house);
      }
    }
    if (!payload.formatted) {
      return multipleHouses;
    } else {
      const formattedHouses: Array<House> = [];
      for (const house of multipleHouses) {
        formattedHouses.push(this.houseModel(house));
      }
      return formattedHouses;
    }
  }

  getAll(formatted = false) {
    if (!formatted) {
      return this.houses;
    } else {
      const formattedHouses: Array<House> = [];

      for (const house of this.houses) {
        formattedHouses.push(this.houseModel(house));
      }

      return formattedHouses;
    }
  }

  getCampsiteIds(payload: GetSingle) {
    const singleHouse: any = find(this.houses, { id: payload.id }) || {};
    const campsiteIds: Array<number> = [];
    for (const house of singleHouse.campsite) {
      campsiteIds.push(house.campsite_id);
    }
    return campsiteIds;
  }

  getGalleryIds(payload: GetSingle) {
    const singleHouse: any = find(this.houses, { id: payload.id }) || {};
    const galleryIds: Array<number> = [];
    for (const gallery of singleHouse.gallery) {
      galleryIds.push(gallery.directus_files_id);
    }
    return galleryIds;
  }

  getAddressIds(payload: GetSingle) {
    const singleHouse: any = find(this.houses, { id: payload.id }) || {};
    const addressIds: Array<number> = [];
    for (const address of singleHouse.adresse) {
      addressIds.push(address.address_id);
    }
    return addressIds;
  }
}

export class AddressModel {
  private addresses: Array<object>;

  constructor(addresses: Array<object>) {
    this.addresses = addresses;
  }

  private addressModel = (address: any) => {
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

  getSingle(payload: GetSingle) {
    const singleAddress = find(this.addresses, { id: payload.id });

    if (!payload.formatted) {
      return singleAddress;
    } else {
      return this.addressModel(singleAddress);
    }
  }

  getMultiple(payload: GetMultiple) {
    const multipleAddresses: Array<object> = [];
    for (const id of payload.ids) {
      for (const address of this.addresses.filter(
        (item: any) => item["id"] === id
      )) {
        multipleAddresses.push(address);
      }
    }
    if (!payload.formatted) {
      return multipleAddresses;
    } else {
      const formattedAddresses: Array<Address> = [];
      for (const address of multipleAddresses) {
        formattedAddresses.push(this.addressModel(address));
      }
      return formattedAddresses;
    }
  }

  getAll(formatted = false) {
    if (!formatted) {
      return this.addresses;
    } else {
      const formattedAddresses: Array<Address> = [];
      for (const address of this.addresses) {
        formattedAddresses.push(this.addressModel(address));
      }
      return formattedAddresses;
    }
  }
}

export class GalleryModel {
  private galleries: Array<object>;

  constructor(galleries: Array<object>) {
    this.galleries = galleries;
  }

  getSingle(payload: GetSingle) {
    const singleGallery = find(this.galleries, { id: payload.id });
    return singleGallery;
  }

  getMultiple(payload: GetMultiple) {
    const multipleGalleries: Array<object> = [];

    const galleryModel = (gallery: any) => {
      return {
        ...gallery["directus_files_id"]["data"]
      };
    };

    for (const id of payload.ids) {
      const galleries: Array<object> = this.galleries.filter(
        (item: any) => item["directus_files_id"]["id"] === id
      );
      for (const gallery of galleries) {
        multipleGalleries.push(galleryModel(gallery));
      }
    }

    return multipleGalleries;
  }

  getAll() {
    return this.galleries;
  }
}
