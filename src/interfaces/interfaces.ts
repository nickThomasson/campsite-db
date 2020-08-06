export interface CampsiteInterface {
  id: number;
  status: string;
  name: string;
  vorschaubild: object;
  personen: number;
  kitchen: boolean;
  sanitary: boolean;
  preis: number;
  bewertung: number;
}

export interface AddressInterface {
  strasse: string;
  hausnummer: string;
  plz: string;
  stadt: string;
  name: string;
  website: string;
  email: string;
  telefon: string;
  fax: string;
  bundesland: string;
  landkreis: string;
}

export interface HouseInterface {
  id: number;
  name: string;
  betten: number;
  seminarraeume: number;
  preis: number;
  bemerkungen: string;
  rating: number;
  kitchen: boolean;
  sanitary: boolean;
  av: boolean;
  wifi: boolean;
  additional_equipment: Array<string>;
  preview_image: object;
  recreational_room: boolean;
}

export interface StoreInterface {
  key: string;
  value?: object;
}

export interface FilterInterface {
  filterName: string;
  isActive: boolean;
  filterRequest: string;
  rawValue: string | boolean | Array<string>;
}

export interface AddressItemsInterface {
  source: any;
  key: string;
}

export interface RangeItemInterface {
  source: any;
  key: string;
}

export interface RequestUrlInterface {
  collectionName: string;
  filterQuery?: string | boolean;
  sortCriteria?: string;
  offset?: number;
  limit?: number;
  detailedView?: boolean;
  onlyPublished?: boolean;
}
