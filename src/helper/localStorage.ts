interface Store {
  key: string;
  value?: object;
}

export const writeToStorage = (value: Store) => {
  localStorage.setItem(value.key.toString(), JSON.stringify(value.value));
};

export const readFromStorage = (value: Store) => {
  const storage: string = localStorage.getItem(value.key.toString()) || "";
  return storage ? JSON.parse(storage) : "";
};
