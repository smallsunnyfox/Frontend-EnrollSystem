import Participant from '../views/participant/home.vue'
const participantRouter = {
  path: '/participant',
  name: 'participant',
  component: Participant,
  redirect: '/participant/index',
  children: [
    {// 首页
      path: 'index',
      component: () => import('../views/participant/activity/index.vue'),
      name: 'index'
    },
    {// 我的活动
      path: 'myActivity',
      component: () => import('../views/participant/activity/myActivity.vue'),
      name: 'myActivity'
    },
    {// 我的提问
      path: 'myQuestion',
      component: () => import('../views/participant/activity/myQuestion.vue'),
      name: 'myQuestion'
    },
    {// 活动查找
      path: 'searchActivity',
      component: () => import('../views/participant/activity/searchActivity.vue'),
      name: 'searchActivity'
    },
    {// 活动报名
      path: 'signupActivity',
      component: () => import('../views/participant/activity/signupActivity.vue'),
      name: 'signupActivity'
    }
  ]
}

export default participantRouter
