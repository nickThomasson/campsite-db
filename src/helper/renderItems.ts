/* eslint-disable  @typescript-eslint/no-explicit-any */
export const renderItems = (state: any, key: any) => {
  const items: Array<string> = [];
  for (const item of state) {
    const returnValue = item[key];
    if (!items.includes(returnValue)) items.push(returnValue);
  }
  return items;
};

export const renderAddressItems = (state: any, key: any) => {
  const items: Array<string> = [];
  for (const item of state) {
    const returnValue = item.address[key];
    if (!items.includes(returnValue)) items.push(returnValue);
  }
  return items;
};
