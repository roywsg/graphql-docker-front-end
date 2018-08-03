import Vue from 'vue'
import VueRouter from 'vue-router'
import 'animate.css'

import App from './App.vue'
import router from './components/routes'
import store from './store/store'

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
