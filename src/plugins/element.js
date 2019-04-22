import Vue from 'vue'
import { Button, Col, Row, Form, FormItem, Input, Icon, Loading, Card } from 'element-ui'

Vue.use(Button)
Vue.use(Col)
Vue.use(Row)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Card)
Vue.prototype.$loading = Loading.service
