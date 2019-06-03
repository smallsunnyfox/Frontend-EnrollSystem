<template>
  <div class="home">
    <!-- 导航栏 -->
    <div class="home_header">
      <!-- 控制台 -->
      <div class="nav_console">
        <img src="../../assets/logoicon.png" alt class="nav_console_logo">
        <div class="nav_console_text">活动组织控制台</div>
      </div>
      <div class="home_header_breadcrumb">
        <breadcrumb></breadcrumb>
      </div>
      <!-- 用户中心 -->
      <!-- eslint-disable -->
      <div class="home_header_usercenter">
        <el-popover trigger="manual" v-model="isshowNotiPopover" placement="bottom" width="500">
          <el-alert v-if="myNotification.length===0" title="暂无未读消息" type="info" show-icon :closable="false" style="margin-bottom:5px;"></el-alert>
          <el-alert v-else v-for="noti in myNotification" :key="noti.id" :title="'来自管理员 '+noti.sender+' 的未读消息 --- '+noti.createtime" :description="noti.content" type="error" close-text="知道了" @close="messageHasread(noti.id)" style="margin-bottom:5px;"></el-alert>
          <el-alert v-if="isShowHasreadNoti===true" v-for="noti in myHasreadNoti" :key="noti.id" :title="'来自管理员 '+noti.sender+' 的已读消息 --- '+noti.createtime" :description="noti.content" type="info" close-text="删除" @close="deleteHasreadNoti(noti.id)" style="margin-bottom:5px;"></el-alert>
          <el-button v-if="!isShowHasreadNoti" type="text" size="mini" @click="isShowHasreadNoti=true"><i class="el-icon-bell"></i>显示已读消息</el-button>
          <el-button v-if="isShowHasreadNoti" type="text" size="mini" @click="isShowHasreadNoti=false"><i class="el-icon-close-notification"></i>隐藏已读消息</el-button>
          <el-badge :value="myNotification.length===0 ? '': myNotification.length" style="margin-right:20px;" slot="reference">
            <el-button icon="el-icon-message-solid" type="primary" size="mini" circle @click="isshowNotiPopover = !isshowNotiPopover"></el-button>
          </el-badge>
        </el-popover>
        <el-dropdown :hide-on-click="true" style="margin:18px 8px 0 0;">
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
      <!-- eslint-enable -->
    </div>
    <!-- organizer首页内容 -->
    <div class="home_content">
      <!-- 左侧路由导航栏 -->
      <div class="home_content_navi" >
        <el-menu
          ref="contentnavi"
          mode="vertical"
          class="el-menu-vertical-demo"
          background-color="lightskyblue"
          text-color="#000"
          active-text-color="#ccffff"
          :default-active="$route.path"
          router
        >
          <el-menu-item index="/organizer/console" style="border-top: 1px solid #fff;">
            <i class="el-icon-orange" style="color:black;"></i>
            <span slot="title">控制台</span>
          </el-menu-item>
          <el-menu-item index="/organizer/myActivity" >
            <i class="el-icon-document-copy" style="color:black;"></i>
            <span slot="title">我的活动</span>
          </el-menu-item>
          <el-menu-item index="/organizer/entryItem" >
            <i class="el-icon-document" style="color:black;"></i>
            <span slot="title">自定义报名项</span>
          </el-menu-item>
          <el-menu-item index="/organizer/signupAudit" >
            <i class="el-icon-document-add" style="color:black;"></i>
            <span slot="title">报名审核</span>
          </el-menu-item>
          <el-menu-item index="/organizer/signinList" >
            <i class="el-icon-document-checked" style="color:black;"></i>
            <span slot="title">签到管理</span>
          </el-menu-item>
        </el-menu>
      </div>
      <!-- 放子路由页面的view -->
      <div class="home_content_view">
        <v-scroll :ops="ops">
          <router-view @show-noti="showNotiPopover"></router-view>
        </v-scroll>
      </div>
    </div>
    <!-- 更新密码的dialog -->
    <el-dialog :visible.sync="updatePwdDialog" width="30%">
      <!-- title -->
      <div slot="title" class="dialog-title"><ricon name="user-lock"></ricon> 修改密码</div>
      <!-- form -->
      <el-form :model="updatePwdForm" ref="updatePwdForm" :rules="updatePwdRules" label-width="100px">
        <el-form-item label="原密码" prop="oldpwd">
          <el-input v-model="updatePwdForm.oldpwd" ref="oldpwd" :type="passwordType"></el-input>
          <span class="show-pwd" @click="showPwd(1)">
            <ricon :name="passwordType === 'password' ? 'eye-slash' : 'regular/eye'" :title="passwordType === 'password' ? '显示密码' : '隐藏密码'"></ricon>
          </span>
        </el-form-item>
        <el-form-item label="新密码" prop="newpwd">
          <el-input v-model="updatePwdForm.newpwd" ref="newpwd" :type="passwordType2"></el-input>
          <span class="show-pwd" @click="showPwd(2)">
            <ricon :name="passwordType2 === 'password' ? 'eye-slash' : 'regular/eye'" :title="passwordType2 === 'password' ? '显示密码' : '隐藏密码'"></ricon>
          </span>
        </el-form-item>
        <el-form-item label="确认新密码" prop="newpwd2">
          <el-input v-model="updatePwdForm.newpwd2" ref="newpwd2" :type="passwordType3"></el-input>
          <span class="show-pwd" @click="showPwd(3)">
            <ricon :name="passwordType3 === 'password' ? 'eye-slash' : 'regular/eye'" :title="passwordType3 === 'password' ? '显示密码' : '隐藏密码'"></ricon>
          </span>
        </el-form-item>
      </el-form>
      <!-- footer -->
      <div slot="footer">
        <el-button type="text" @click="forgetPwd">忘记密码？</el-button>
        <el-button @click="updatePwdDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdatePwdForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 忘记密码的dialog -->
    <el-dialog :visible.sync="forgetPwdDialog" width="30%">
      <!-- title -->
      <div slot="title" class="dialog-title"><ricon name="user-lock"></ricon> 忘记密码</div>
      <!-- form -->
      <el-form :model="forgetPwdForm" ref="forgetPwdForm" :rules="forgetPwdRules" label-width="100px">
        <el-form-item label="手机号码" prop="phonenumber">
          <el-input v-model="forgetPwdForm.phonenumber" ref="phonenumber"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="fnewpwd">
          <el-input v-model="forgetPwdForm.fnewpwd" ref="fnewpwd" :type="passwordType4"></el-input>
          <span class="show-pwd" @click="showPwd(4)">
            <ricon :name="passwordType4 === 'password' ? 'eye-slash' : 'regular/eye'" :title="passwordType4 === 'password' ? '显示密码' : '隐藏密码'"></ricon>
          </span>
        </el-form-item>
        <el-form-item label="确认新密码" prop="fnewpwd2">
          <el-input v-model="forgetPwdForm.fnewpwd2" ref="fnewpwd2" :type="passwordType5"></el-input>
          <span class="show-pwd" @click="showPwd(5)">
            <ricon :name="passwordType5 === 'password' ? 'eye-slash' : 'regular/eye'" :title="passwordType5 === 'password' ? '显示密码' : '隐藏密码'"></ricon>
          </span>
        </el-form-item>
      </el-form>
      <!-- footer -->
      <div slot="footer">
        <el-button @click="forgetPwdDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitForgetPwdForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看我的信息的dialog -->
    <el-dialog :visible.sync="myProfileDialog" width="30%" @close="closeProfileDialog">
      <!-- title -->
      <div slot="title" class="dialog-title"><ricon name="user-tag"></ricon> 我的信息</div>
      <!-- form -->
      <el-form ref="myProfileForm" :model="myProfileForm" :rules="myProfileRules" label-width="100px">
        <el-form-item label="用户名" prop="myname">
          <el-input v-model="myProfileForm.myname" :disabled="!isUpdateProfile"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="myphone">
          <el-input v-model="myProfileForm.myphone" :disabled="!isUpdateProfile"></el-input>
        </el-form-item>
      </el-form>
      <!-- footer -->
      <div slot="footer">
        <el-button type="primary" v-show="!isUpdateProfile" @click="isUpdateProfile = true">修改信息</el-button>
        <el-button type="primary" v-show="isUpdateProfile" @click="cancelUpdateProfile">取消修改</el-button>
        <el-button type="primary" v-show="isUpdateProfile" @click="submitUpdateProfileForm">提交修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { Dialog, Menu, Form, Submenu, MenuItem, MessageBox, Message, MenuItemGroup, Badge, Popover, Alert } from 'element-ui'
import { mapGetters } from 'vuex'
import breadcrumb from '@c/breadcrumb.vue'
import { getNotiofOrganizer, readNotificationofOrganizer, getHasreadNotiofOrganizer, deleteHasreadNotiofOrganizer } from '@/api/notification.js'
import { getName } from '@/utils/auth.js'
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(Popover)
Vue.use(Badge)
Vue.use(Alert)
export default {
  name: 'home',
  data () {
    // 用户名正则
    const namepattern = /^[A-Za-z\u4e00-\u9fa5]+$/
    // 密码正则
    const pswpattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/
    // 手机号码正则
    const phonepattern = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
    // 修改密码旧密码的校验
    const validateOldPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不能为空'))
      } else if (value.length < 6) {
        callback(new Error('密码不能小于6位数'))
      } else if (value.length > 14) {
        callback(new Error('密码不能大于14位数'))
      } else if (value.indexOf(' ') !== -1) {
        callback(new Error('密码不能包含空格'))
      } else {
        callback()
      }
    }
    // 修改密码输入新密码的校验
    const validateNewPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不能为空'))
      } else if (value.length < 6) {
        callback(new Error('密码不能小于6位数'))
      } else if (value.length > 14) {
        callback(new Error('密码不能大于14位数'))
      } else if (value.indexOf(' ') !== -1) {
        this.$refs.password.value = ''
        callback(new Error('密码不能包含空格'))
      } else if (!pswpattern.test(value)) {
        callback(new Error('密码必须包括至少1个大写字母1个小写字母1个数字'))
      } else if (value === this.$refs.oldpwd.value) {
        callback(new Error('新密码不能与原密码相同'))
      } else {
        callback()
      }
    }
    // 修改密码确认密码的校验
    const validateNewPwd2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次确认密码'))
      } else if (value !== this.$refs.newpwd.value) {
        callback(new Error('两次输入的密码不一致'))
      } else if (value === this.$refs.oldpwd.value) {
        callback(new Error('新密码不能与原密码相同'))
      } else {
        callback()
      }
    }
    // 忘记密码手机号码的校验
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('手机号码不能为空'))
      } else if (value.indexOf(' ') !== -1) {
        callback(new Error('号码不能包含空格'))
      } else if (!phonepattern.test(value)) {
        callback(new Error('号码格式错误'))
      } else {
        callback()
      }
    }
    // 忘记密码输入新密码的校验
    const validateFNewPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不能为空'))
      } else if (value.length < 6) {
        callback(new Error('密码不能小于6位数'))
      } else if (value.length > 14) {
        callback(new Error('密码不能小于14位数'))
      } else if (value.indexOf(' ') !== -1) {
        callback(new Error('密码不能包含空格'))
      } else if (!pswpattern.test(value)) {
        callback(new Error('密码必须包括至少1个大写字母1个小写字母1个数字'))
      } else {
        callback()
      }
    }
    // 忘记密码确认新密码的校验
    const validateFNewPwd2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次确认密码'))
      } else if (value !== this.$refs.fnewpwd.value) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    // 修改用户名的校验
    const updateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名不能为空'))
      } else if (value.length < 3) {
        callback(new Error('用户名不能小于3位数'))
      } else if (value.length > 6) {
        callback(new Error('用户名不能大于6位数'))
      } else if (value.indexOf(' ') !== -1) {
        callback(new Error('用户名不能包含空格'))
      } else if (!namepattern.test(value)) {
        callback(new Error('用户名只能为汉字和英文字母的混合'))
      } else {
        callback()
      }
    }
    // 修改手机号码的校验
    const updatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('手机号码不能为空'))
      } else if (value.indexOf(' ') !== -1) {
        callback(new Error('号码不能包含空格'))
      } else if (!phonepattern.test(value)) {
        callback(new Error('号码格式错误'))
      } else {
        callback()
      }
    }
    return {
      ops: {
        vuescroll: {
          mode: 'native',
          sizeStrategy: 'percent',
          detectResize: true
        },
        bar: {
          background: 'lightskyblue',
          size: '4px',
          minSize: 0.3
        }
      },
      isshowNotiPopover: false,
      isShowHasreadNoti: false,
      myHasreadNoti: [],
      myNotification: [],
      passwordType: 'password',
      passwordType2: 'password',
      passwordType3: 'password',
      passwordType4: 'password',
      passwordType5: 'password',
      updatePwdDialog: false,
      forgetPwdDialog: false,
      myProfileDialog: false,
      isUpdateProfile: false,
      updatePwdForm: {
        oldpwd: '',
        newpwd: '',
        newpwd2: ''
      },
      forgetPwdForm: {
        phonenumber: '',
        fnewpwd: '',
        fnewpwd2: ''
      },
      myProfileForm: {
        myname: '',
        myphone: ''
      },
      updatePwdRules: {
        oldpwd: [
          { required: true, trigger: 'blur', validator: validateOldPwd }
        ],
        newpwd: [
          { required: true, trigger: 'blur', validator: validateNewPwd }
        ],
        newpwd2: [
          { required: true, trigger: 'blur', validator: validateNewPwd2 }
        ]
      },
      forgetPwdRules: {
        phonenumber: [
          { required: true, trigger: 'blur', validator: validatePhone }
        ],
        fnewpwd: [
          { required: true, trigger: 'blur', validator: validateFNewPwd }
        ],
        fnewpwd2: [
          { required: true, trigger: 'blur', validator: validateFNewPwd2 }
        ]
      },
      myProfileRules: {
        myname: [
          { required: true, trigger: 'blur', validator: updateName }
        ],
        myphone: [
          { required: true, trigger: 'blur', validator: updatePhone }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'role',
      'phonenumber'
    ])
  },
  components: {
    breadcrumb
  },
  created () {
    this.$store.dispatch('user/getInfo')
      .then(() => {
        console.log('geiInfo success')
      })
      .catch(error => {
        console.log(error)
      })
    this.getNotiofOrganizer()
    this.getHasreadNoti()
  },
  methods: {
    showNotiPopover: function () {
      console.log('asda')
      this.isshowNotiPopover = !this.isshowNotiPopover
    },
    // 显示密码
    showPwd (val) {
      if (val === 1) {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.oldpwd.focus()
        })
      } else if (val === 2) {
        if (this.passwordType2 === 'password') {
          this.passwordType2 = ''
        } else {
          this.passwordType2 = 'password'
        }
        this.$nextTick(() => {
          this.$refs.newpwd.focus()
        })
      } else if (val === 3) {
        if (this.passwordType3 === 'password') {
          this.passwordType3 = ''
        } else {
          this.passwordType3 = 'password'
        }
        this.$nextTick(() => {
          this.$refs.newpwd2.focus()
        })
      } else if (val === 4) {
        if (this.passwordType4 === 'password') {
          this.passwordType4 = ''
        } else {
          this.passwordType4 = 'password'
        }
        this.$nextTick(() => {
          this.$refs.fnewpwd.focus()
        })
      } else if (val === 5) {
        if (this.passwordType5 === 'password') {
          this.passwordType5 = ''
        } else {
          this.passwordType5 = 'password'
        }
        this.$nextTick(() => {
          this.$refs.fnewpwd2.focus()
        })
      }
    },
    // 调出我的信息dialog
    myprofile () {
      this.myProfileForm.myname = this.name
      this.myProfileForm.myphone = this.phonenumber
      this.myProfileDialog = true
      this.$nextTick(() => {
        this.$refs.myProfileForm.clearValidate()
      })
    },
    closeProfileDialog () {
      this.isUpdateProfile = false
    },
    // 取消修改我的信息方法
    cancelUpdateProfile () {
      this.$nextTick(() => {
        this.$refs.myProfileForm.clearValidate()
      })
      this.myProfileForm.myname = this.name
      this.myProfileForm.myphone = this.phonenumber
      this.isUpdateProfile = false
    },
    // 提交修改信息表单
    submitUpdateProfileForm () {
      this.$refs.myProfileForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch('user/updateProfile', this.myProfileForm)
            .then(() => {
              Message({
                showClose: true,
                message: '修改成功！',
                type: 'success'
              })
              this.isUpdateProfile = false
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 调出更新密码Dialog
    updatePwd () {
      this.updatePwdDialog = true
      this.$nextTick(() => {
        this.$refs.updatePwdForm.resetFields()
      })
    },
    // 调出忘记密码dialog
    forgetPwd () {
      this.updatePwdDialog = false
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
        this.forgetPwdDialog = true
        this.$nextTick(() => {
          this.$refs.forgetPwdForm.resetFields()
        })
      }, 500)
    },
    // 提交密码修改表单
    submitUpdatePwdForm () {
      this.$refs.updatePwdForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch('user/updatePwd', this.updatePwdForm)
            .then(() => {
              Message({
                showClose: true,
                message: '密码修改成功，下次登录请输入新密码哦！',
                type: 'success'
              })
              this.updatePwdDialog = false
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 提交忘记密码表单
    submitForgetPwdForm () {
      this.$refs.forgetPwdForm.validate(valid => {
        if (valid) {
          if (this.forgetPwdForm.phonenumber !== this.phonenumber) {
            Message({
              showClose: true,
              message: '手机号码验证失败！无法修改密码！',
              type: 'warning'
            })
          } else {
            this.$store
              .dispatch('user/forgetPwd', this.forgetPwdForm)
              .then(() => {
                Message({
                  showClose: true,
                  message: '密码修改成功，下次登录请输入新密码哦！',
                  type: 'success'
                })
                this.forgetPwdDialog = false
              }).catch(error => {
                console.log(error)
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 退出方法
    logout () {
      MessageBox.confirm('确认要退出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/logout')
          .then(() => {
            Message({
              showClose: true,
              type: 'success',
              message: '退出成功！'
            })
            this.$router.push({ path: '/' })
          })
          .catch(error => {
            console.log(error)
          })
      }).catch(() => {
        Message({
          showClose: true,
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    // 获取未读消息
    getNotiofOrganizer () {
      getNotiofOrganizer(getName())
        .then(response => {
          this.myNotification = response.data
        }).catch(error => {
          console.log(error)
        })
    },
    // 获取已读消息
    getHasreadNoti () {
      getHasreadNotiofOrganizer(getName())
        .then(response => {
          this.myHasreadNoti = response.data
        }).catch(error => {
          console.log(error)
        })
    },
    // 删除已读消息
    deleteHasreadNoti (id) {
      deleteHasreadNotiofOrganizer(id)
        .then(response => {
          if (response.data.status === 'deleteSuccess') {
            this.getHasreadNoti()
          }
        }).catch(error => {
          console.log(error)
        })
    },
    // 消息已读
    messageHasread (id) {
      readNotificationofOrganizer(id)
        .then(response => {
          if (response.data.status === 'readSuccess') {
            this.getNotiofOrganizer()
            this.getHasreadNoti()
          } else {
            console.log('readError')
          }
        }).catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.home {
  height: 100%;
  min-width: 1400px;
}
.home_header {
  height: 8%;
  min-height: 55px;
  width: 100%;
  background: lightskyblue;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}
.nav_console {
  height: 100%;
  width: 15%;
  min-width: 200px;
  border-right: 1px solid #fff;
  float: left;
  cursor: default;
}
.nav_console:hover {
  background: #ccffff;
  transition: all 0.5s;
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
.home_header_breadcrumb {
  height: 40%;
  width: 350px;
  float: left;
  padding: 0 10px;
  margin-top: 23px;
  cursor: default;
}
.home_header_usercenter {
  height: 100%;
  width: 240px;
  float: right;
  font-size: 16px;
}
.home_content {
  width: 100%;
  height: 92%;
}
.home_content_navi {
  width: 15%;
  min-width: 200px;
  height: 100%;
  background-color: lightskyblue;
  float: left;
}
.home_content_view {
  height: 100%;
  width: 85%;
  min-width: 1150px;
  float: left;
}
.el-menu-vertical-demo {
  text-align: left;
}

.dialog-title {
  text-align: left;
  font-size: 18px;
}
.show-pwd {
  position: absolute;
  right: 10px;
  font-size: 16px;
  color: gray;
  cursor: pointer;
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
