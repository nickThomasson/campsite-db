import { ROUTE } from "@/helper/routes";

export default (id: string, size: string) => {
  return `${process.env.VUE_APP_API_URL}${ROUTE.ASSETS}/${id}?key=${size}`;
};
