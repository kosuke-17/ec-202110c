import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/itemList",
    component: () => import("../views/itemList.vue"),
  },
  {
    path: "/itemDetail",
    component: () => import("../views/itemDetail.vue"),
  },
  {
    path: "/cartList",
    component: () => import("../views/cartList.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
