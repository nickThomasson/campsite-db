/* eslint-disable  @typescript-eslint/no-explicit-any */
import { max, min } from "lodash";

export const renderItems = (state: any, key: any) => {
  const items: Array<string> = [];
  for (const item of state) {
    const returnValue = item[key];
    if (!items.includes(returnValue)) items.push(returnValue);
  }
  return items;
};

export const renderRange = (state: any, key: any) => {
  const items: Array<string> = [];
  for (const item of state) {
    const returnValue = item[key];
    if (!items.includes(returnValue)) items.push(returnValue);
  }
  return [min(items), max(items)];
};

export const renderAddressItems = (state: any, key: any) => {
  const items: Array<string> = [];
  for (const item of state) {
    const returnValue = item.address[key];
    if (!items.includes(returnValue)) items.push(returnValue);
  }
  return items;
};
