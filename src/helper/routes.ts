import { RequestUrlInterface } from "@/interfaces/interfaces";

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
const createFilterParameter = (filterQuery: string | boolean) => {
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
export const getRequestUrl = (payload: RequestUrlInterface) => {
  const requestUrl: Array<string> = [];

  const catchRequestUrl = [
    createBaseUrl(payload.collectionName),
    createFilterParameter(payload.filterQuery || false),
    createSortParameter(payload.sortCriteria || "id"),
    createOffsetParameter(payload.offset || 0),
    createLimitParameter(payload.limit || -1),
    createFieldParameter(payload.detailedView || true),
    createPublishedParameter(payload.onlyPublished || true)
  ];

  for (const urlItem of catchRequestUrl) {
    if (urlItem) {
      requestUrl.push(urlItem.toString());
    }
  }

  return requestUrl.join("");
};
