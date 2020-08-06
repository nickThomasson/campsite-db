/* eslint-disable @typescript-eslint/no-explicit-any */

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
