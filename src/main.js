import Vue from 'vue'
import App from './App.vue'
import router from './router/index' // vue-router配置js
import store from './store/index' // vuex 核心仓库
import './plugins/element.js' // element-ui
import 'lib-flexible' // 移动端适配工具
import './permission' // permission control

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
