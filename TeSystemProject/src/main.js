// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from "vue-router"
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Qs from 'qs'
import store from './store'
import App from './App'
import router from './router'
import $ from 'jquery';
window.jQuery = $;
window.$ = $;


Vue.config.debug = true; 
Vue.use(ElementUI);
Vue.use(VueRouter); 
Vue.use(VueResource); 
Vue.use(VXETable);
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.qs = Qs
axios.defaults.withCredentials = true;
// 生产环境用
// axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
// 开发环境用
axios.defaults.baseURL = '/api';


// const First = { template: '<div><h2>我是第 1 个子页面</h2></div>' } 
// const routers = new VueRouter(
//   { mode: 'history', base: __dirname, routes: [ 
//     { path: '/first', component: First }, 
//     { path: '/second', component: secondcomponent } 
//   ] 
// })

const app = new Vue({ 
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  /*router: routers, render: h => h(App)*/ })//.$mount('#app')
/* eslint-disable no-new */

