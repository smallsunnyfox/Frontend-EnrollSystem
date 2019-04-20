import Vue from 'vue'
import { Button, Col, Row, Form, FormItem, Input, Icon, Loading } from 'element-ui'

Vue.use(Button)
Vue.use(Col)
Vue.use(Row)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Icon)
Vue.prototype.$loading = Loading.service
