import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/itemList",
    component: () => import("../views/itemList.vue"),
  },

  {
    path: "/itemDetail/:id",
    component: () => import("../views/itemDetail.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
