<template>
  <div class="console">
    <h2 style="text-align:left;">欢迎进入Enroll在线活动组织平台控制台</h2>
    <el-card shadow="hover" class="card1" v-on:click.native="goAduit()">
      <el-badge :value="newAudits===0 ? '暂无':newAudits" type="primary">
        <i class="el-icon-document-add"></i>
      </el-badge>
      <br>
      新的报名
    </el-card>
    <el-card shadow="hover" class="card1" @click.native="showNoti">
      <el-badge :value="newNoti===0 ? '暂无':newNoti" type="primary">
        <i class="el-icon-message-solid"></i>
      </el-badge>
      <br>
      新的通知
    </el-card>
    <el-card shadow="hover" class="card1" @click.native="goActivity">
      <i class="el-icon-document-copy"></i>
      <br>
      我的活动
    </el-card>
    <el-card shadow="hover" class="card2" @click.native="goSignin">
      <i class="el-icon-document-checked"></i>
      <br>
      签到管理
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { Badge } from 'element-ui'
import { getMySignupAudit } from '@/api/signupaudit.js'
import { getNotiofOrganizer } from '@/api/notification.js'
import { getName } from '@/utils/auth.js'
Vue.use(Badge)
export default {
  name: 'console',
  data () {
    return {
      newAudits: 0,
      newNoti: 0
    }
  },
  created () {
    this.getConsoleNumber()
    setInterval(this.getConsoleNumber, 1000)
  },
  methods: {
    goAduit () {
      this.$router.push('/organizer/signupAudit')
    },
    goActivity () {
      this.$router.push('/organizer/myActivity')
    },
    goSignin () {
      this.$router.push('/organizer/signinList')
    },
    showNoti () {
      console.log('asd')
      this.$emit('show-noti')
    },
    getConsoleNumber () {
      console.log('重复执行')
      getNotiofOrganizer(getName())
        .then(response => {
          this.newNoti = response.data.length
        }).catch(error => {
          console.log(error)
        })
      getMySignupAudit(getName())
        .then(response => {
          this.newAudits = response.data.length
        }).catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>
.console {
  margin: 20px auto;
  width: 95%;
}
.console_header {
  font-size: 14px;
  text-align: left;
}
.card1 {
  width: 10%;
  float: left;
  margin: 10px 10px 10px 0;
  background-color: lightskyblue;
  font-size: 18px;
  cursor: pointer;
}
.card2 {
  width: 10%;
  float: left;
  margin: 10px 0;
  background-color: lightskyblue;
  font-size: 18px;
  cursor: pointer;
}
</style>
