/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
window.Swal = Swal;

import { router } from './router/routes'
import { store } from './vuex/store'

import Swal from 'sweetalert2';

import VueProgressBar from 'vue-progressbar';

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '5px'
})

const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

window.toast = toast;

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


import MainApp from './components/MainApp.vue';
import Layout from './components/layout/Layout.vue';

const app = new Vue({
    el: '#app',
    created(){
        if (this.$store.getters.isAuthenticated) {
            this.$store.dispatch('userRequest');
        }
    },
    store,
    router,
    components: {MainApp, Layout}
});
