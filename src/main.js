import Vue from 'vue'
import App from './App.vue'
import "./assets/sass/index.scss";
window.JQuery = window.$ = require("jquery");
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
