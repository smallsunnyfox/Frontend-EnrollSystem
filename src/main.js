import Vue from 'vue'
import App from './App.vue'
import router from './router/index' // vue-router配置js
import store from './store/index' // vuex 核心仓库
import './plugins/element.js' // element-ui
import 'lib-flexible' // 移动端适配工具
import './permission' // permission control
// vue-awesome
import 'vue-awesome/icons/regular/eye.js'
import 'vue-awesome/icons/eye-slash'
import 'vue-awesome/icons/user'
import 'vue-awesome/icons/user-tag'
import 'vue-awesome/icons/user-lock'
import 'vue-awesome/icons/sign-out-alt'
import 'vue-awesome/icons/lock'
import Icon from 'vue-awesome/components/Icon.vue'

Vue.component('ricon', Icon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
