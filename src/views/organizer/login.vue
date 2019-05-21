<template>
  <div class="login">
    <!-- 登录表格 -->
    <loginbox :title="title" :roleofuser="role" @forgetpwd="forgetpwd()"></loginbox>
    <!-- 背景视频 -->
    <div class="homepage-hero-module">
      <div class="video-container">
        <div :style="fixStyle" class="filter"></div>
        <video
          :style="fixStyle"
          autoplay
          loop
          muted
          playsinline
          class="fillWidth"
          v-on:canplay="canplay"
        >
          <source src="..\..\assets\organizer\Live-Music.mp4" type="video/mp4">浏览器不支持 video 标签，建议升级浏览器。
        </video>
        <div class="poster hidden" v-if="!vedioCanPlay">
          <img :style="fixStyle" src="..\..\assets\organizer\Live-Music.jpg" alt="Night_Market">
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="forgetPwdDialog" width="30%">
      <!-- title -->
      <div slot="title" class="dialog-title"><ricon name="user-lock"></ricon> 忘记密码</div>
      <!-- form -->
      <el-form :model="forgetPwdForm" ref="forgetPwdForm" :rules="forgetPwdRules" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="forgetPwdForm.username" ref="username"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phonenumber">
          <el-input v-model="forgetPwdForm.phonenumber" ref="phonenumber"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="fnewpwd">
          <el-input v-model="forgetPwdForm.fnewpwd" ref="fnewpwd"  show-password></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="fnewpwd2">
          <el-input v-model="forgetPwdForm.fnewpwd2" @keyup.enter.native="submitForgetPwdForm" ref="fnewpwd2" show-password></el-input>
        </el-form-item>
      </el-form>
      <p>修改说明</p>
      <p>忘记密码时可根据用户手机号码修改密码</p>
      <p>若忘记手机号码请联系网站超级管理员修改密码</p>
      <p>联系方式：010-0010-0010</p>
      <!-- footer -->
      <div slot="footer">
        <el-button @click="forgetPwdDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitForgetPwdForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import loginBox from '@c/loginBox'
import { Message } from 'element-ui'
import { forgetPwdBeforeLogin } from '@/api/user.js'
export default {
  name: 'login',
  data () {
    const namepattern = /^[A-Za-z\u4e00-\u9fa5]+$/
    const pswpattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/
    const phonepattern = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名不能为空'))
      } else if (value.length < 3) {
        callback(new Error('用户名不能小于三个字符'))
      } else if (value.length > 6) {
        callback(new Error('用户名不能大于6位数'))
      } else if (value.indexOf(' ') !== -1) {
        callback(new Error('用户名不能包含空格'))
      } else if (!namepattern.test(value)) {
        callback(new Error('用户名只能为汉字或者英文字母的混合'))
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
    return {
      title: 'Enroll在线活动组织平台登录',
      role: 'organizer',
      vedioCanPlay: false,
      fixStyle: '',
      forgetPwdDialog: false,
      forgetPwdForm: {
        username: '',
        userrole: 'organizer',
        phonenumber: '',
        fnewpwd: '',
        fnewpwd2: ''
      },
      forgetPwdRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        phonenumber: [
          { required: true, trigger: 'blur', validator: validatePhone }
        ],
        fnewpwd: [
          { required: true, trigger: 'blur', validator: validateFNewPwd }
        ],
        fnewpwd2: [
          { required: true, trigger: 'blur', validator: validateFNewPwd2 }
        ]
      }
    }
  },
  methods: {
    // 检测浏览器是否支持播放背景视频
    canplay () {
      this.vedioCanPlay = true
    },
    forgetpwd: function () {
      this.forgetPwdDialog = true
      this.$nextTick(() => {
        this.$refs.forgetPwdForm.resetFields()
      })
    },
    // 提交忘记密码表单
    submitForgetPwdForm () {
      this.$refs.forgetPwdForm.validate(valid => {
        if (valid) {
          forgetPwdBeforeLogin(this.forgetPwdForm)
            .then(response => {
              if (response.data.status === 'validateFalse') {
                Message({
                  showClose: true,
                  message: '手机号码验证错误！',
                  type: 'warning'
                })
                this.$refs.phonenumber.focus()
              } else if (response.data.status === 'UpdateSuccess') {
                Message({
                  showClose: true,
                  message: '密码修改成功，下次登录请输入新密码哦！',
                  type: 'success'
                })
                this.forgetPwdDialog = false
              } else if (response.data.status === 'userNotFound') {
                Message({
                  showClose: true,
                  message: '未找到您输入的用户名！请确认用户名是否正确',
                  type: 'warning'
                })
                this.$refs.username.focus()
              }
            }).catch(error => {
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted: function () {
    // 随着窗口的改变控制视频的长宽
    window.onresize = () => {
      const windowWidth = document.body.clientWidth
      const windowHeight = document.body.clientHeight
      const windowAspectRatio = windowHeight / windowWidth
      let videoWidth
      let videoHeight
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth
        videoHeight = videoWidth * 0.5625
        this.fixStyle = {
          height: windowWidth * 0.5625 + 'px',
          width: windowWidth + 'px',
          'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
          'margin-left': 'initial',
          left: '0px'
        }
      } else {
        videoHeight = windowHeight
        videoWidth = videoHeight / 0.5625
        this.fixStyle = {
          height: windowHeight + 'px',
          width: windowHeight / 0.5625 + 'px',
          'margin-left': (windowWidth - videoWidth) / 2 + 'px',
          'margin-bottom': 'initial',
          left: '0px'
        }
      }
    }
    window.onresize()
    // 数据渲染后自动聚焦到输入框
  },
  components: {
    loginbox: loginBox
  }
}
</script>

<style scoped>
.login {
  min-width: 650px;
}
.dialog-title {
  text-align: left;
  font-size: 18px;
}
.homepage-hero-module,
.video-container {
  min-width: 650px;
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.video-container .poster img,
.video-container video {
  z-index: -2;
  position: absolute;
}

.video-container .filter {
  z-index: -1;
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
}

.video-container video.fillWidth {
  width: 100%;
}
</style>
