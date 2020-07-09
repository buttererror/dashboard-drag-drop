import Vue from 'vue'
import App from './App.vue'
import "./assets/sass/index.scss";
window.JQuery = window.$ = require("jquery");
Vue.config.productionTip = false

import VueTour from 'vue-tour'

require('vue-tour/dist/vue-tour.css')

Vue.use(VueTour)


window.bus = new Vue();
new Vue({
  render: h => h(App),
}).$mount('#app')
