import { StoreInterface } from "@/interfaces/interfaces";

export const writeToStorage = (value: StoreInterface) => {
  localStorage.setItem(value.key.toString(), JSON.stringify(value.value));
};

export const readFromStorage = (value: StoreInterface) => {
  const storage: string = localStorage.getItem(value.key.toString()) || "";
  return JSON.parse(storage);
};
