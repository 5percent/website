/**
 * @file 入口js文件
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import Board from './components/Board'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Board }
];

const router = new VueRouter({
    hashbang: false,
    routes: routes
});

var app = new Vue({
    el: '#sg',
    template: '<App/>',
    router: router,
    components: { App }
});
