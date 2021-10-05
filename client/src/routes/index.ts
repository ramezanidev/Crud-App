import {createRouter, createWebHistory, RouteRecordRaw, Router} from "vue-router";


const Home = () => import('../views/index.vue');
const About = () => import('../views/about.vue');


const routes:Array<RouteRecordRaw> = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];



const router:Router = createRouter({
  history: createWebHistory(),
  routes, 
});


export default router