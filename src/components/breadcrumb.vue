<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item >控制台</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(list,index) in currentPath" :key="index">{{list}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
import Vue from 'vue'
import { Breadcrumb, BreadcrumbItem } from 'element-ui'
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
export default {
  data() {
    return {};
  },
  props: ['currentPath']
};
</script>

<style>
.el-breadcrumb__separator {
  color: #fff;
}
</style>
