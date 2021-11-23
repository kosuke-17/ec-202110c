import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import RegisterUser from "../views/RegisterUser.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
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
