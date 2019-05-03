<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{path:'/organizer/console'}">控制台</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(list,index) in currentPath" :key="index">{{list}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
import Vue from 'vue'
import { Breadcrumb, BreadcrumbItem } from 'element-ui'
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
export default {
  data () {
    return {
      currentPath: ['首页']
    }
  },
  watch: {
    '$route': 'changeCurrentPath'
  },
  mounted () {
    this.changeCurrentPath()
  },
  methods: {
    // 监听当前路由来改变面包屑
    changeCurrentPath () {
      if (this.$route.path === '/organizer/console') {
        this.currentPath = ['首页']
      } else if (this.$route.path === '/organizer/myActivity') {
        this.currentPath = ['我的活动']
      } else if (this.$route.path === '/organizer/entryItem') {
        this.currentPath = ['自定义报名项']
      } else if (this.$route.path === '/organizer/signupAudit') {
        this.currentPath = ['报名审核']
      } else if (this.$route.path === '/organizer/signinList') {
        this.currentPath = ['签到管理']
      } else if (this.$route.path === '/organizer/question') {
        this.currentPath = ['提问栏']
      }
    }
  }
}
</script>

<style>
.el-breadcrumb__separator {
  color: #fff;
}
</style>
