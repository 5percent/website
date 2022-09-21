/**
 * @file sg路由
 */

import { createRouter, createWebHashHistory } from 'vue-router';

import Entry from '../views/Sg.vue'
import Garden from '../components/sg/Garden.vue'
import Photo from '../components/sg/Photo.vue'
import Board from '../components/sg/Board.vue'

const routes = [
  { path: '/', component: Entry },
  { path: '/garden', component: Garden},
  { path: '/photo', component: Photo},
  { path: '/board', component: Board}
]; 

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/' && !window.permission) {
      next(false);
  }
  else {
      next();
  }
});
 
export default router;
