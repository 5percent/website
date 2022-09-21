/**
 * @file 主站路由
 */

import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '../views/Home.vue';

import Snake from '../components/Snake.vue';
import Tetris from '../components/Tetris.vue';
import Sudoku from '../components/Sudoku.vue';
import Mine from '../components/Mine.vue';

const routes = [
  { path: '/snake', component: Snake },
  { path: '/tetris', component: Tetris },
  { path: '/sudoku', component: Sudoku },
  { path: '/mines', component: Mine },
  { path: '/', component: Home }
];
 
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
});
 
export default router;
