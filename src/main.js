/**
 * @file 入口js文件
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import Home from './components/Home'
import Snake from './components/Snake'
import Tetris from './components/Tetris'

Vue.use(VueRouter);

const routes = [
    { path: '/snake', component: Snake },
    { path: '/tetris', component: Tetris },
    { path: '/', component: Home }
];

const router = new VueRouter({
    hashbang: false,
    routes: routes
});

var app = new Vue({
    el: '#app',
    template: '<App/>',
    router: router,
    components: { App }
});
