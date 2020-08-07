/* eslint-disable @typescript-eslint/no-explicit-any */
import { find } from "lodash";

abstract class StoreConnector {
  protected store: Array<object>;

  protected constructor(store: Array<object>) {
    this.store = store;
  }
}

abstract class CreateItem extends StoreConnector {
  protected id: number;

  protected constructor(id: number, store: Array<object>) {
    super(store);
    this.id = id;
  }

  protected getValue(item: any, key: string) {
    return item[key];
  }

  protected getItem() {
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
      previewImage: this.getValue(item, "preview_image"),
      persons: this.getValue(item, "persons"),
      kitchen: this.getValue(item, "kitchen"),
      sanitary: this.getValue(item, "sanitary"),
      price: this.getValue(item, "price"),
      rating: this.getValue(item, "rating"),
      website: this.getValue(item, "website")
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
      beds: this.getValue(item, "beds"),
      rooms: this.getValue(item, "rooms"),
      price: this.getValue(item, "price"),
      annotations: this.getValue(item, "annotations"),
      rating: this.getValue(item, "rating"),
      kitchen: this.getValue(item, "kitchen"),
      sanitary: this.getValue(item, "sanitary"),
      av: this.getValue(item, "av"),
      wifi: this.getValue(item, "wifi"),
      additionalEquipment: this.getValue(item, "additional_equipment"),
      previewImage: this.getValue(item, "preview_image"),
      recreationalRoom: this.getValue(item, "recreational_room"),
      website: this.getValue(item, "website")
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
      street: this.getValue(item, "street"),
      houseNumber: this.getValue(item, "house_number"),
      zip: this.getValue(item, "zip"),
      city: this.getValue(item, "city"),
      name: this.getValue(item, "name"),
      website: this.getValue(item, "website"),
      email: this.getValue(item, "mail"),
      phone: this.getValue(item, "phone"),
      fax: this.getValue(item, "fax"),
      state: this.getValue(item, "state"),
      county: this.getValue(item, "county"),
      type: this.getValue(item, "type")
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

    const getImageDescription = (gallery: any) => {
      return gallery["directus_files_id"]["description"];
    };

    for (const gallery of galleries) {
      galleryImages.push({
        ...getGalleryImage(gallery),
        description: getImageDescription(gallery)
      });
    }
    return galleryImages;
  }
}

abstract class RelatedItems extends CreateItem {
  relationKey: string;

  protected constructor(id: number, store: Array<object>, relationKey: string) {
    super(id, store);
    this.relationKey = relationKey;
  }

  protected getItems() {
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
