export const sortObject = (sourceObject: any) => {
  const targetObject: any = {};
  Object.keys(sourceObject)
    .sort()
    .forEach(key => {
      targetObject[key] = sourceObject[key];
    });
  return targetObject;
};
