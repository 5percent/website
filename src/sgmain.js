/**
 * @file 入口js文件
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import Entry from './components/Entry'
import Garden from './components/Garden'
import Board from './components/Board'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Entry },
    { path: '/garden', component: Garden},
    { path: '/board', component: Board}
];

const router = new VueRouter({
    hashbang: false,
    routes: routes
});

router.beforeEach((to, from, next) => {
    if (to.path !== '/' && !window.permission) {
        next(false);
    }
    else {
        next();
    }
});

var app = new Vue({
    el: '#sg',
    template: '<App/>',
    router: router,
    components: { App }
});
