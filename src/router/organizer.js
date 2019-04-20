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
    {// 发起活动
      path: 'launchActivity',
      component: () => import('../views/organizer/activity/launchActivity.vue'),
      name: 'launchActivity'
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
    {// 报名名单
      path: 'signupList',
      component: () => import('../views/organizer/signup/signupList.vue'),
      name: 'signupList'
    },
    {// 签到名单
      path: 'signinList',
      component: () => import('../views/organizer/signin/signinList.vue'),
      name: 'signinList'
    },
    {// 请假条
      path: 'leaveRequest',
      component: () => import('../views/organizer/signin/leaveRequest.vue'),
      name: 'leaveRequest'
    },
    {// 提问栏
      path: 'question',
      component: () => import('../views/organizer/question.vue'),
      name: 'question'
    }
  ]
}

export default organizerRouter
