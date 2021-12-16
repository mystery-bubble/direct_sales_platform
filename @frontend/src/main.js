import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

import "./styles/lib/tailwind.css";
import { Icon } from "@iconify/vue2";

Vue.component( "Icon", Icon )

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
