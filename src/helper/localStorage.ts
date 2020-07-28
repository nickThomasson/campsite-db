/* eslint-disable @typescript-eslint/no-explicit-any */
export const writeToStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const readFromStorage = (key: string) => {
  const storage: any = localStorage.getItem(key);
  return JSON.parse(storage);
};
