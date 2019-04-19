import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import ParticipantLogin from '../views/participant/login.vue'
import OrganizerLogin from '../views/organizer/login.vue'
import AdminLogin from '../views/admin/login.vue'
import ParticipantRegister from '../views/participant/register.vue'
import OrganizerRegister from '../views/organizer/register.vue'
import Participant from '../views/participant/home.vue'
import Admin from '../views/admin/home.vue'
import organizerRouter from './organizer.js'

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
      path: '/adminLogin',
      name: 'adminLogin',
      component: AdminLogin
    },
    {
      path: '/participantLogin',
      name: 'participantLogin',
      component: ParticipantLogin
    },
    {
      path: '/organizerLogin',
      name: 'organizerLogin',
      component: OrganizerLogin
    },
    {
      path: '/participantRegister',
      name: 'participantRegister',
      component: ParticipantRegister
    },
    {
      path: '/organizerRegister',
      name: 'organizerRegister',
      component: OrganizerRegister
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/participant',
      name: 'participant',
      component: Participant
    },
    organizerRouter
  ]
})
