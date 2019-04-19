<template>
  <div class="home">
    <div class="home_header">
      <div class="nav_console">
        <img src="../../assets/logoicon.png" alt class="nav_console_logo">
        <div class="nav_console_text">活动组织控制台</div>
      </div>
      <div class="home_header_usercenter">
        <el-dropdown :hide-on-click="true" style="margin:18px 10px 0 0;">
          <span style="cursor:pointer;">
            <ricon name="user" scale="0.7"></ricon> {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="myprofile"><ricon name="user-tag" scale="0.8"></ricon> 我的信息</el-dropdown-item>
            <el-dropdown-item @click.native="updatePwd"><ricon name="user-lock" scale="0.8"></ricon> 修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout"><ricon name="sign-out-alt" scale="0.8"></ricon> 退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="home_content">
      <div class="home_content_navi" >
        <el-menu
          mode="vertical"
          class="el-menu-vertical-demo"
          background-color="lightskyblue"
          text-color="#000"
          active-text-color="#ccffff"
          router="true"
          :default-active="$route.path"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-date" style="color:black;"></i>
              <span>活动管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/organizer/launchActivity">发起活动</el-menu-item>
              <el-menu-item index="/organizer/myActivity">我的活动</el-menu-item>
              <el-menu-item index="/organizer/entryItem">自定义报名项</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
         <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document" style="color:black;"></i>
              <span>报名管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/organizer/signupList">报名名单</el-menu-item>
              <el-menu-item index="/organizer/signupAudit">报名审核</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
         <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-bell" style="color:black;"></i>
              <span>签到管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/organizer/signinList">签到名单</el-menu-item>
              <el-menu-item index="/organizer/leaveRequest">请假条</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/organizer/question">
            <i class="el-icon-service" style="color:black;"></i>
            <span slot="title">提问栏</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="home_content_view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Menu, Submenu, MenuItem, MenuItemGroup} from 'element-ui'
import { mapGetters } from 'vuex';
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
export default {
  name: 'home',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'role',
      'phonenumber'
    ])
  },
  components: {},
  created () {
    this.$store.dispatch('user/getInfo')
      .then(() => {
        console.log('geiInfo success')
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    myprofile () {
      console.log('sssss');
    },
    updatePwd () {
      console.log('sssss');
    },
    logout () {
      console.log('sssss');
    }

  },
}
</script>

<style scoped>
.home {
  height: 100%;
}
.home_header {
  height: 8%;
  width: 100%;
  background: lightskyblue;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}
.nav_console {
  height: 100%;
  width: 15%;
  border-right: 1px solid #fff;
  float: left;
}
.nav_console_logo {
  margin: 5%;
  width: 35px;
  height: 35px;
  float: left;
}
.nav_console_text {
  margin: 18px 0 0 20px;
  height: 25px;
  width: 115px;
  float: left;
  font-size: 16px;
  font-weight: bold;
}
.home_header_usercenter {
  height: 100%;
  width: 150px;
  float: right;
  font-size: 16px;
}
.home_content {
  width: 100%;
  height: 92%;
}
.home_content_navi {
  width: 15%;
  height: 100%;
  background-color: lightskyblue;
  float: left;
}
.home_content_view {
  height: 100%;
  width: 85%;
  float: left;
}
.el-menu-vertical-demo {
  text-align: left;
  border-top: 1px solid #fff;
}
</style>
<style>
.el-menu-item-group__title {
  padding: 0px;
}
.el-submenu__title:hover {
  background-color: #fff;
}
.el-dropdown {
  font-size: 16px;
}
.el-submenu__title i {
  color: #000;
}
</style>
