/* eslint-disable @typescript-eslint/no-explicit-any */
import { find } from "lodash";
import { ReturnObject, ReturnIds } from "@/classes/interfaces";

class StoreConnector {
  protected store: Array<object>;

  protected constructor(store: Array<object>) {
    this.store = store;
  }
}

class CreateItem extends StoreConnector {
  protected id: number;
  readonly item: any;

  protected constructor(id: number, store: Array<object>) {
    super(store);
    this.id = id;
    this.item = find(this.store, { id: this.id }) || {};
  }

  protected getValue(item: any, key: string) {
    return item[key];
  }

  protected get() {
    return this.item;
  }
}

export class CreateCampsite extends CreateItem implements ReturnObject {
  constructor(id: number, store: Array<object>) {
    super(id, store);
  }

  get() {
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

export class CreateHouse extends CreateItem implements ReturnObject {
  constructor(id: number, store: Array<object>) {
    super(id, store);
  }

  get() {
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

export class CreateAddress extends CreateItem implements ReturnObject {
  constructor(id: number, store: Array<object>) {
    super(id, store);
  }

  get() {
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
      country: this.getValue(this.item, "country"),
      type: this.getValue(this.item, "type")
    };
  }
}

export class CreateGallery extends CreateItem implements ReturnObject {
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

  private getGalleryItem(gallery: any, key: any) {
    return gallery[key];
  }

  get() {
    for (const gallery of this.galleries) {
      this.galleryImages.push(
        this.getGalleryItem(gallery, "directus_files_id").id
      );
    }
    return this.galleryImages;
  }
}

class RelatedItems extends CreateItem {
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

export class RelatedIds extends RelatedItems implements ReturnIds {
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
