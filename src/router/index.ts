import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import RegisterUser from "../views/RegisterUser.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/itemList",
    component: () => import("../views/itemList.vue"),
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
    path: "/",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/registerUser",
    name: "registerUser",
    component: RegisterUser,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
