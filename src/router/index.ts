import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/contactCompany",
    component: () => import("../views/contactCompany.vue"),
  },
  {
    path: "/orderFinished",
    component: () => import("../views/OrderFinished.vue"),
  },
  {
    path: "/orderHistory",
    component: () => import("../views/OrderHistory.vue"),
  },
  {
    path: "/orderConfirm",
    component: () => import("../views/orderConfirm.vue"),
  },
  {
    path: "/itemList",
    component: () => import("../views/itemList.vue"),
  },
  {
    path: "/registerUser",
    component: () => import("../views/RegisterUser.vue"),
  },
  {
    path: "/cartList",
    component: () => import("../views/cartList.vue"),
  },
  {
    path: "/itemDetail/:id",
    component: () => import("../views/itemDetail.vue"),
  },
  {
    path: "/loginUser",
    component: () => import("../views/loginUser.vue"),
  },
  {
    path: "/logoutUser",
    component: () => import("../views/logoutUser.vue"),
  },
  {
    path: "/loginAdministrator",
    component: () => import("../views/loginAdministrator.vue"),
  },
  {
    path: "/",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import("../views/notFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
