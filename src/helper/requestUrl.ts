import { ROUTE } from "@/helper/routes";

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

interface Request {
  collectionName: string;
  filterQuery?: string | boolean;
  sortCriteria?: string;
  offset?: number;
  limit?: number;
  detailedView?: boolean;
  onlyPublished?: boolean;
}

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
export const getRequestUrl = (payload: Request) => {
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
