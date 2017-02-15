/**
 * @file 入口js文件
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import Home from './components/Home'
import Invation from './components/Invation'

Vue.use(VueRouter);

const Bar = { template: '<div>bar</div>' };

const routes = [
    { path: '/invation', component: Invation },
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
