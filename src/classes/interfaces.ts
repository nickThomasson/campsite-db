export interface ReturnObject {
  get(): object;
}

export interface ReturnId extends ReturnObject {
  id(): void;
}

export interface ReturnIds {
  getIds(): Array<number>;
}
