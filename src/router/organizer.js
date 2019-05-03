import Organizer from '../views/organizer/home.vue'
const organizerRouter = {
  path: '/organizer',
  name: 'organizer',
  redirect: '/organizer/console',
  component: Organizer,
  children: [
    {// 控制台
      path: 'console',
      component: () => import('../views/organizer/console.vue'),
      name: 'console'
    },
    {// 自定义报名项
      path: 'entryItem',
      component: () => import('../views/organizer/activity/entryItem.vue'),
      name: 'entryItem'
    },
    {// 我的活动
      path: 'myActivity',
      component: () => import('../views/organizer/activity/myActivity.vue'),
      name: 'myActivity'
    },
    {// 报名审核
      path: 'signupAudit',
      component: () => import('../views/organizer/signup/signupAudit.vue'),
      name: 'signupAudit'
    },
    {// 签到管理
      path: 'signinList',
      component: () => import('../views/organizer/signin/signinList.vue'),
      name: 'signinList'
    },
    {// 提问栏
      path: 'question',
      component: () => import('../views/organizer/question.vue'),
      name: 'question'
    },
    {
      path: '404',
      component: () => import('../views/organizer/404.vue'),
      name: 'organizer404'
    }
  ]
}

export default organizerRouter
