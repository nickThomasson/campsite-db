import { max, min } from "lodash";
import {
  AddressItemsInterface,
  RangeItemInterface
} from "@/interfaces/interfaces";

export const renderRange = (payload: RangeItemInterface) => {
  const items: Array<string> = [];
  for (const item of payload.source) {
    const returnValue = item[payload.key.toString()];
    if (!items.includes(returnValue)) items.push(returnValue);
  }
  return [min(items), max(items)];
};

export const renderAddressItems = (payload: AddressItemsInterface) => {
  const items: Array<string> = [];
  for (const item of payload.source) {
    const returnValue = item.address[payload.key.toString()];
    if (!items.includes(returnValue)) items.push(returnValue);
  }
  return items;
};
