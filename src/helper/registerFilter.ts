export const registerFilter = (
  filterName: string,
  isActive: boolean,
  filterRequest: string,
  rawValue = null
) => {
  return { filterName, isActive, filterRequest, rawValue };
};
