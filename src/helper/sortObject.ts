export const sortObject = (source: { [key: string]: string }) => {
  const target: { [key: string]: string } = {};
  Object.keys(source)
    .sort()
    .forEach(key => {
      target[key] = source[key];
    });
  return target;
};
