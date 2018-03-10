/**
 * @file 入口js文件
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import Entry from './components/sg/Entry'
import Garden from './components/sg/Garden'
import Photo from './components/sg/Photo'
import Board from './components/sg/Board'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Entry },
    { path: '/garden', component: Garden},
    { path: '/photo', component: Photo},
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
