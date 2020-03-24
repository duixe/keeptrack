import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import {fb} from './firebase'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

let app;
fb.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
  console.log(user.id)
})

