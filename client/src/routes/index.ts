import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  Router,
} from "vue-router";

const Home = () => import("../views/index.vue");
const Edit = () => import("../views/edit.vue");
const New = () => import("../views/new.vue");

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Home },
  { path: "/edit/:id", component: Edit },
  { path: "/new", component: New },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
