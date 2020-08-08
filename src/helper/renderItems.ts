import { max, min } from "lodash";
interface Key {
  key: string;
}

interface Source extends Key {
  source: Array<{ [key: string]: string }>;
}

interface Source2ndLayer extends Key {
  source: Array<{ [key: string]: { [key: string]: string } }>;
  key: string;
}

export const renderRange = (payload: Source) => {
  const items: Array<string> = [];
  for (const item of payload.source) {
    const returnValue = item[payload.key.toString()];
    if (!items.includes(returnValue)) items.push(returnValue);
  }
  return [min(items), max(items)];
};

export const renderAddressItems = (payload: Source2ndLayer) => {
  const items: Array<string> = [];
  for (const item of payload.source) {
    const returnValue = item.address[payload.key.toString()];
    if (!items.includes(returnValue)) items.push(returnValue);
  }
  return items;
};
