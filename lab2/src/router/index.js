import { createRouter, createWebHistory } from "vue-router";
import index from "../views/index.vue";


const routes = [
  { path: "/", component: index },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;