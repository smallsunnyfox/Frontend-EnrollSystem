import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Test from '../views/test.vue'
import ParticipantLogin from '../views/participant/login.vue'
import OrganizerLogin from '../views/organizer/login.vue'
import AdminLogin from '../views/admin/login.vue'
import ParticipantHome from '../views/participant/home.vue'
import OrganizerHome from '../views/organizer/home.vue'
import AdminHome from '../views/admin/home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/participant',
      name: 'participant',
      component: ParticipantLogin
    },
    {
      path: '/participantHome',
      name: 'participanthome',
      component: ParticipantHome
    },
    {
      path: '/organizer',
      name: 'organizer',
      component: OrganizerLogin
    },
    {
      path: '/organizerHome',
      name: 'organizerhome',
      component: OrganizerHome
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLogin
    },
    {
      path: '/adminHome',
      name: 'adminhome',
      component: AdminHome
    }
  ]
})
