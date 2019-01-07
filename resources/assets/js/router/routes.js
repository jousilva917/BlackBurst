import Vue from 'vue';
import VueRouter from 'vue-router'
import {store} from '../vuex/store'

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return
    }
    next('/dashboard')
}

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
        return
    }
    next('/')
}


import Login from './../components/auth/Login'
import Register from './../components/auth/Register'
import PasswordEmail from '../components/auth/password/Email'
import PasswordReset from '../components/auth/password/Reset'

import AdminLayout from './../components/layout/Layout'
import Dashboard from './../components/Dashboard'
import Home from './../components/webpage/Home'
import About from './../components/webpage/About'
import Blog from './../components/webpage/Blog'
import Services from './../components/webpage/Services'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        beforeEnter: ifNotAuthenticated,
    },
    {
        path: '/about',
        name: 'about',
        component: About,
        beforeEnter: ifNotAuthenticated,
    },
    {
        path: '/blog',
        name: 'blog',
        component: Blog,
        beforeEnter: ifNotAuthenticated,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: ifNotAuthenticated,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        beforeEnter: ifNotAuthenticated,
    },
    {
        path: '/password/reset/',
        name: 'password-email',
        component: PasswordEmail,
        beforeEnter: ifNotAuthenticated,
    },
    {
        path: '/password/reset/:token',
        name: 'password-reset',
        component: PasswordReset,
        beforeEnter: ifNotAuthenticated,
    },
    {
        path: '/',
        name: 'layout',
        component: AdminLayout,
        beforeEnter: ifAuthenticated,
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: Dashboard
            },
            {
                path: 'services',
                name: 'services',
                component: Services
            }

        ]
    },
];



export const router = new VueRouter({
    mode: 'history',
    routes
});

