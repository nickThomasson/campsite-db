import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import CampsiteSearch from "@/views/CampsiteSearch.vue";
import CampsiteDetailPage from "@/views/CampsiteDetailPage.vue";
import HouseSearch from "@/views/HouseSearch.vue";
import HouseDetailPage from "@/views/HouseDetailPage.vue";
import Wishlist from "@/views/Wishlist.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "CampsiteSearch",
    component: CampsiteSearch
  },
  {
    path: "/house-search",
    name: "HouseSearch",
    component: HouseSearch
  },
  {
    path: "/wishlist",
    name: "Wishlist",
    component: Wishlist
  },
  {
    path: "/campsite/:id",
    name: "CampsiteDetailPage",
    component: CampsiteDetailPage
  },
  {
    path: "/house/:id",
    name: "HouseDetailPage",
    component: HouseDetailPage
  }
];

const router = new VueRouter({
  routes
});

export default router;
