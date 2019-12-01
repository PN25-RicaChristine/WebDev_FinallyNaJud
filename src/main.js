import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import router from "./router";
import api from '@/auth/api.js'
import store from './store.js'
//Import Axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// import VueSweetAlert2 from 'vue-sweetalert2'

Vue.use(VueAxios,axios)
// Vue.use(VueSweetAlert2);
Vue.use(VueMaterial)
Vue.config.productionTip = false
Vue.mixin(api)
Vue.use(require('vue-pusher'), {
  api_key: '202380678230df0b4d46',
  options: {
    cluster: 'ap1',
    encrypted: true,
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
