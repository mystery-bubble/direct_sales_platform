import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

import "./styles/tailwind.css";
import PurgeIconsVue from 'purge-icons-vue'

Vue.use(PurgeIconsVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
