import { FilterInterface } from "@/interfaces/interfaces";

export const registerFilter = (payload: FilterInterface) => {
  return { ...payload };
};
