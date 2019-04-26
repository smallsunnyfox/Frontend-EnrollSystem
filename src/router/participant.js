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
    {// 我参加的的活动
      path: 'mySignedActivity',
      component: () => import('../views/participant/activity/mySignedActivity.vue'),
      name: 'mySignedActivity'
    },
    {// 我的提问
      path: 'myQuestion',
      component: () => import('../views/participant/activity/myQuestion.vue'),
      name: 'myQuestion'
    },
    {// 活动报名
      path: 'signupActivity',
      component: () => import('../views/participant/activity/signupActivity.vue'),
      name: 'signupActivity'
    }
  ]
}

export default participantRouter
