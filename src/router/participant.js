import Participant from '../views/participant/home.vue'
const participantRouter = {
  path: '/participant',
  name: 'participant',
  component: Participant,
  redirect: '/participant/signupActivity',
  children: [
    {// 我参加的的活动
      path: 'mySignedActivity',
      component: () => import('../views/participant/activity/mySignedActivity.vue'),
      name: 'mySignedActivity'
    },
    {// 活动报名
      path: 'signupActivity',
      component: () => import('../views/participant/activity/signupActivity.vue'),
      name: 'signupActivity'
    },
    {
      path: '404',
      component: () => import('../views/participant/404.vue'),
      name: 'participant404'
    }
  ]
}

export default participantRouter
