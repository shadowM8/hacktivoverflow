import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// // Require Froala Editor js file.
// require('froala-editor/js/froala_editor.pkgd.min')

// // Require Froala Editor css files.
// require('froala-editor/css/froala_editor.pkgd.min.css')
// require('font-awesome/css/font-awesome.css')
// require('froala-editor/css/froala_style.min.css')

// // Import and use Vue Froala lib.
// import VueFroala from 'vue-froala-wysiwyg'
// Vue.use(VueFroala)

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
