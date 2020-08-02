/* eslint-disable  @typescript-eslint/no-explicit-any */
export enum ROUTE {
  AUTH = "/auth/authenticate",
  LOGOUT = "/auth/logout",
  REFRESH = "/auth/refresh",
  COLLECTIONS = "/collections",
  ITEMS = "/items/"
}

export enum CREDENTIALS {
  EMAIL = process.env.VUE_APP_USERNAME,
  PASSWORD = process.env.VUE_APP_PASSWORD
}

/**
 * Create base url for api call
 *
 * @param collectionName
 */
const createBaseUrl = (collectionName: string) => {
  if (!collectionName) {
    return false;
  }
  return `${process.env.VUE_APP_API_URL}${ROUTE.ITEMS}${collectionName}?`;
};

/**
 * Create filter parameter to attach to base url
 *
 * @param filterQuery
 */
const createFilterParameter = (filterQuery: string) => {
  if (!filterQuery) {
    return false;
  }
  return `${filterQuery}`;
};

/**
 * Create field parameter to attach to base url
 *
 * @param detailedView
 */
const createFieldParameter = (detailedView: boolean) => {
  if (detailedView) {
    return "&fields=*.*";
  }
  return detailedView;
};

/**
 * Create sort parameter to attach to base url
 *
 * @param sortCriteria
 */
const createSortParameter = (sortCriteria: string) => {
  if (!sortCriteria) {
    return false;
  }
  return `&sort=${sortCriteria}`;
};

/**
 * Create publish parameter to attach to base url
 *
 * @param onlyPublished
 */
const createPublishedParameter = (onlyPublished: boolean) => {
  if (onlyPublished) {
    return "&status=published";
  }
  return false;
};

/**
 * Create offset parameter to attach to base url
 *
 * @param offset
 */
const createOffsetParameter = (offset: number) => {
  return `&offset=${offset}`;
};

/**
 * Create limit parameter to attach to base url
 *
 * @param limit
 */
const createLimitParameter = (limit: number) => {
  return `&limit=${limit}`;
};

/**
 * Create request url for api call
 *
 * @param collectionName
 * @param filterQuery
 * @param sortCriteria
 * @param offset
 * @param limit
 * @param detailedView
 * @param onlyPublished
 *
 * @returns string
 */
export const getRequestUrl = (
  collectionName: string,
  filterQuery: any,
  sortCriteria = "id",
  offset = 0,
  limit = -1,
  detailedView = true,
  onlyPublished = true
) => {
  const requestUrl: Array<any> = [];

  const catchRequestUrl = [
    createBaseUrl(collectionName),
    createFilterParameter(filterQuery),
    createSortParameter(sortCriteria),
    createOffsetParameter(offset),
    createLimitParameter(limit),
    createFieldParameter(detailedView),
    createPublishedParameter(onlyPublished)
  ];

  for (const urlItem of catchRequestUrl) {
    if (urlItem) {
      requestUrl.push(urlItem);
    }
  }

  return requestUrl.join("");
};
