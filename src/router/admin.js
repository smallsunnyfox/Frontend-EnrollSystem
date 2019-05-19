import Admin from '../views/admin/home.vue'
const adminRouter = {
  path: '/admin',
  name: 'admin',
  component: Admin,
  redirect: '/admin/activityAudit',
  children: [
    {// 活动审核
      path: 'activityAudit',
      component: () => import('../views/admin/audit/activityAudit.vue'),
      name: 'activityAudit'
    },
    {// 审核员管理
      path: 'auditor',
      component: () => import('../views/admin/audit/auditor.vue'),
      name: 'auditor'
    },
    {
      path: '404',
      component: () => import('../views/admin/404.vue'),
      name: 'admin404'
    }
  ]
}
export default adminRouter
