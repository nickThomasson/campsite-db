import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import CampsiteSearch from "@/views/CampsiteSearch.vue";
import CampsiteDetailPage from "@/views/CampsiteDetailPage.vue";
import Wishlist from "@/views/Wishlist.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "CampsiteSearch",
    component: CampsiteSearch
  },
  {
    path: "/wishlist",
    name: "Wishlist",
    component: Wishlist
  },
  {
    path: "/campsite/:campsiteId",
    name: "CampsiteDetailPage",
    component: CampsiteDetailPage
  }
];

const router = new VueRouter({
  routes
});

export default router;
