import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import CampsiteSearch from "@/views/CampsiteSearch.vue";
import CampsiteDetailPage from "@/views/CampsiteDetailPage.vue";
import HouseSearch from "@/views/HouseSearch.vue";
import HouseDetailPage from "@/views/HouseDetailPage.vue";
import NotFound from "@/components/NotFound.vue";
import Wishlist from "@/views/Wishlist.vue";
import Administration from "@/components/Administration/Administration.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "*",
    name: "404",
    component: NotFound
  },
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
  },
  {
    path: "/admin",
    name: "Administration",
    component: Administration
  }
];

const router = new VueRouter({
  routes
});

export default router;
