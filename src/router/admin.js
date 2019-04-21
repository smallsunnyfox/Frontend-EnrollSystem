import Admin from '../views/admin/home.vue'
const adminRouter = {
  path: '/admin',
  name: 'admin',
  component: Admin,
  redirect: '/admin/index',
  children: [
    {// 首页
      path: 'index',
      component: () => import('../views/admin/index.vue'),
      name: ''
    },
    {// 活动审核
      path: 'activityAudit',
      component: () => import('../views/admin/audit/activityAudit.vue'),
      name: 'activityAudit'
    },
    {// 提问栏答案审核
      path: 'answerAudit',
      component: () => import('../views/admin/audit/answerAudit.vue'),
      name: 'answerAudit'
    },
    {// 提问栏问题审核
      path: 'questionAudit',
      component: () => import('../views/admin/audit/questionAudit.vue'),
      name: 'questionAudit'
    },
    {// 审核员管理
      path: 'auditor',
      component: () => import('../views/admin/audit/auditor.vue'),
      name: 'auditor'
    }
  ]
}
export default adminRouter
