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
  protected item: any;

  protected constructor(id: number, store: Array<object>) {
    super(store);
    this.id = id;
    this.item = find(this.store, { id: this.id }) || {};
  }

  protected getValue(item: any, key: string) {
    return item[key];
  }

  protected getItem() {
    return this.item;
  }
}

export class CreateCampsite extends CreateItem {
  constructor(id: number, store: Array<object>) {
    super(id, store);
  }

  getItem() {
    return {
      id: this.getValue(this.item, "id"),
      status: this.getValue(this.item, "status"),
      name: this.getValue(this.item, "name"),
      previewImage: this.getValue(this.item, "preview_image"),
      persons: this.getValue(this.item, "persons"),
      kitchen: this.getValue(this.item, "kitchen"),
      sanitary: this.getValue(this.item, "sanitary"),
      price: this.getValue(this.item, "price"),
      rating: this.getValue(this.item, "rating"),
      website: this.getValue(this.item, "website")
    };
  }
}

export class CreateHouse extends CreateItem {
  constructor(id: number, store: Array<object>) {
    super(id, store);
  }

  getItem() {
    return {
      id: this.getValue(this.item, "id"),
      name: this.getValue(this.item, "name"),
      beds: this.getValue(this.item, "beds"),
      rooms: this.getValue(this.item, "rooms"),
      price: this.getValue(this.item, "price"),
      annotations: this.getValue(this.item, "annotations"),
      rating: this.getValue(this.item, "rating"),
      kitchen: this.getValue(this.item, "kitchen"),
      sanitary: this.getValue(this.item, "sanitary"),
      av: this.getValue(this.item, "av"),
      wifi: this.getValue(this.item, "wifi"),
      additionalEquipment: this.getValue(this.item, "additional_equipment"),
      previewImage: this.getValue(this.item, "preview_image"),
      recreationalRoom: this.getValue(this.item, "recreational_room"),
      website: this.getValue(this.item, "website")
    };
  }
}

export class CreateAddress extends CreateItem {
  constructor(id: number, store: Array<object>) {
    super(id, store);
  }

  getItem() {
    return {
      street: this.getValue(this.item, "street"),
      houseNumber: this.getValue(this.item, "house_number"),
      zip: this.getValue(this.item, "zip"),
      city: this.getValue(this.item, "city"),
      name: this.getValue(this.item, "name"),
      website: this.getValue(this.item, "website"),
      email: this.getValue(this.item, "mail"),
      phone: this.getValue(this.item, "phone"),
      fax: this.getValue(this.item, "fax"),
      state: this.getValue(this.item, "state"),
      county: this.getValue(this.item, "county"),
      type: this.getValue(this.item, "type")
    };
  }
}

export class CreateGallery extends CreateItem {
  protected identifier: string;
  private galleries: Array<object>;
  private galleryImages: Array<object>;

  constructor(id: number, store: Array<object>, identifier: string) {
    super(id, store);
    this.identifier = identifier;

    this.galleries = this.store.filter((item: any) => {
      if (item[this.identifier]) {
        return item[this.identifier]["id"] === this.id;
      } else {
        return false;
      }
    });

    this.galleryImages = [];
  }

  private getGalleryItem(gallery: any, item: string) {
    return gallery["directus_files_id"][item];
  }

  getItem() {
    for (const gallery of this.galleries) {
      this.galleryImages.push({
        ...this.getGalleryItem(gallery, "data"),
        description: this.getGalleryItem(gallery, "description")
      });
    }
    return this.galleryImages;
  }
}

abstract class RelatedItems extends CreateItem {
  protected relationKey: string;
  protected items: Array<object>;

  protected constructor(id: number, store: Array<object>, relationKey: string) {
    super(id, store);
    this.relationKey = relationKey;
    this.items = this.item[this.relationKey];
  }

  protected getItems() {
    return this.items;
  }
}

export class RelatedIds extends RelatedItems {
  protected idKey: string;
  private ids: Array<number>;

  constructor(
    id: number,
    store: Array<object>,
    relationKey: string,
    idKey: string
  ) {
    super(id, store, relationKey);
    this.idKey = idKey;
    this.ids = [];
  }

  getIds() {
    for (const item of this.items) {
      this.ids.push(this.getValue(item, this.idKey));
    }
    return this.ids;
  }
}
