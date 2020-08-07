/* eslint-disable @typescript-eslint/no-explicit-any */
import { find } from "lodash";

class StoreConnector {
  store: Array<object>;

  constructor(store: Array<object>) {
    this.store = store;
  }
}

class CreateItem extends StoreConnector {
  id: number;

  constructor(id: number, store: Array<object>) {
    super(store);
    this.id = id;
  }

  getValue(item: any, key: string) {
    return item[key];
  }

  getItem() {
    const item: any = find(this.store, { id: this.id }) || {};
    return item;
  }
}

export class CreateCampsite extends CreateItem {
  constructor(id: number, store: Array<object>) {
    super(id, store);
  }

  getItem() {
    const item: any = super.getItem();
    return {
      id: this.getValue(item, "id"),
      status: this.getValue(item, "status"),
      name: this.getValue(item, "name"),
      previewImage: this.getValue(item, "vorschaubild"),
      persons: this.getValue(item, "personen"),
      kitchen: this.getValue(item, "kitchen"),
      sanitary: this.getValue(item, "sanitary"),
      price: this.getValue(item, "preis"),
      rating: this.getValue(item, "bewertung")
    };
  }
}

export class CreateHouse extends CreateItem {
  constructor(id: number, store: Array<object>) {
    super(id, store);
  }

  getItem() {
    const item: any = super.getItem();
    return {
      id: this.getValue(item, "id"),
      name: this.getValue(item, "name"),
      beds: this.getValue(item, "betten"),
      rooms: this.getValue(item, "seminarraeume"),
      price: this.getValue(item, "preis"),
      annotations: this.getValue(item, "bemerkungen"),
      rating: this.getValue(item, "rating"),
      kitchen: this.getValue(item, "kitchen"),
      sanitary: this.getValue(item, "sanitary"),
      av: this.getValue(item, "av"),
      wifi: this.getValue(item, "wifi"),
      additionalEquipment: this.getValue(item, "dadditional_equipment"),
      previewImage: this.getValue(item, "preview_image"),
      recreationalRoom: this.getValue(item, "recreational_room")
    };
  }
}

export class CreateAddress extends CreateItem {
  constructor(id: number, store: Array<object>) {
    super(id, store);
  }

  getItem() {
    const item: any = super.getItem();
    return {
      street: this.getValue(item, "strasse"),
      houseNumber: this.getValue(item, "hausnummer"),
      zip: this.getValue(item, "plz"),
      city: this.getValue(item, "stadt"),
      name: this.getValue(item, "name"),
      website: this.getValue(item, "website"),
      email: this.getValue(item, "email"),
      phone: this.getValue(item, "telefon"),
      fax: this.getValue(item, "fax"),
      state: this.getValue(item, "bundesland"),
      county: this.getValue(item, "landkreis")
    };
  }
}

export class CreateGallery extends CreateItem {
  identifier: string;

  constructor(id: number, store: Array<object>, identifier: string) {
    super(id, store);
    this.identifier = identifier;
  }

  getItem() {
    const galleries: Array<object> = this.store.filter((item: any) => {
      if (item[this.identifier]) {
        return item[this.identifier]["id"] === this.id;
      } else {
        return false;
      }
    });
    const galleryImages: Array<object> = [];

    const getGalleryImage = (gallery: any) => {
      return gallery["directus_files_id"]["data"];
    };
    for (const gallery of galleries) {
      galleryImages.push(getGalleryImage(gallery));
    }
    return galleryImages;
  }
}

class RelatedItems extends CreateItem {
  relationKey: string;

  constructor(id: number, store: Array<object>, relationKey: string) {
    super(id, store);
    this.relationKey = relationKey;
  }

  getItems() {
    const item: any = super.getItem();
    const items: Array<object> = item[this.relationKey];
    return items;
  }
}

export class RelatedIds extends RelatedItems {
  idKey: string;

  constructor(
    id: number,
    store: Array<object>,
    relationKey: string,
    idKey: string
  ) {
    super(id, store, relationKey);
    this.idKey = idKey;
  }

  getIds() {
    const items: Array<object> = super.getItems();
    const ids: Array<number> = [];

    for (const item of items) {
      ids.push(this.getValue(item, this.idKey));
    }

    return ids;
  }
}
