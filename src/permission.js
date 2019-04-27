import router from './router'
import { getName, getRole } from './utils/auth'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 通过全局守卫控制前端路由的访问来实现权限控制
router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()
  if (to.matched.length === 0) {
    next({ path: '/404' }) // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
    NProgress.done()
  } else {
    // 获取cookie中的name
    const currentTokenName = getName()
    // 获取cookie中的role
    const currentTokenRole = getRole()
    if (currentTokenName !== '' && currentTokenRole !== '' && currentTokenName !== undefined && currentTokenRole !== undefined) {
      // cookie中存在已登录信息
      const homeUrl = '/' + currentTokenRole
      const notfoundurl = '/' + currentTokenRole + '/404'
      if (to.path === '/' || to.path === '/adminLogin' || to.path === '/participantLogin' || to.path === '/organizerLogin' || to.path === '/participantRegister' || to.path === '/organizerRegister') {
        // cookie中存在已登录信息，无需再次登录
        next({ path: homeUrl })
        Message({
          showClose: true,
          message: '您已经登录过了哦！已为您自动登录！', // 点击确定退出MessageBox
          type: 'success'
        })
        NProgress.done()
      } else {
        if (to.matched.length < 2) { // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
          next({ path: notfoundurl })
          NProgress.done()
        } else {
          // 不同角色的权限控制
          if (to.path.search(currentTokenRole) !== -1) {
            next()
            NProgress.done()
          } else {
            next({ path: homeUrl })
            Message({
              showClose: true,
              message: '您没有权限访问该页面哦！',
              type: 'warning'
            })
            NProgress.done()
          }
        }
      }
    } else {
      if (to.path === '/404' || to.path === '/' || to.path === '/adminLogin' || to.path === '/participantLogin' || to.path === '/organizerLogin' || to.path === '/participantRegister' || to.path === '/organizerRegister') {
        // 不需要cookie的页面放行
        next()
        NProgress.done()
      } else {
        // 需要cookie的页面返回登录页面
        Message({
          showClose: true,
          message: '先登录才能访问哦！已自动返回登录页面！',
          type: 'warning'
        })
        next('/')
        NProgress.done()
      }
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
