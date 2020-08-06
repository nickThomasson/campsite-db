/* eslint-disable @typescript-eslint/no-explicit-any */
interface BaseModel {
  id: number;
  name: string;
  preis: number;
  kitchen: boolean;
  sanitary: boolean;
}
export interface CampsiteInterface extends BaseModel {
  status: string;
  vorschaubild: object;
  personen: number;
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

export interface HouseInterface extends BaseModel {
  betten: number;
  seminarraeume: number;
  preis: number;
  bemerkungen: string;
  rating: number;
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

export interface SourceKeyInterface {
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

interface Token {
  token: string;
}

interface DispatchToken extends Token {
  dispatchName: string;
}

export interface ChangePageInterface extends DispatchToken {
  pageOffset: number;
}

export interface PageLimitInterface extends DispatchToken {
  value: number;
}

export interface ApplyFilterInterface extends DispatchToken {
  type: string;
}

export interface AuthenticationInterface {
  username: string;
  email: string;
}

export interface LanguageImport {
  id: number;
  dictionary: { [key: string]: string };
  language: string;
  language_name: string;
  status: string;
}
