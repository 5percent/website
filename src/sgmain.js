/**
 * @file 入口js文件
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import Hello from './components/Hello'

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Hello }
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
