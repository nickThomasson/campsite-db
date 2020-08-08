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

export interface Authentication {
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
