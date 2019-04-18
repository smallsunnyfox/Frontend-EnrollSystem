<template>
  <div class="register">
    <!-- 登录表格 -->
    <div class="registerform">
      <h2 style="cursor: pointer;">Enroll在线活动组织平台</h2>
      <el-form
        ref="participantRegisterForm"
        :model="participantRegisterForm"
        :rules="participantRegisterRules"
        label-width="115px"
      >
        <el-form-item label="Name" prop="participantname" class="whiteItem">
          <el-input v-model="participantRegisterForm.participantname" ref="participantname"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password" class="whiteItem">
          <el-input
            :key="passwordType"
            v-model="participantRegisterForm.password"
            :type="passwordType"
            ref="password"
            @keyup.enter.native="submitParticipantFrom"
          ></el-input>
          <span class="show-pwd" @click="showPwd">
            <ricon :name="passwordType === 'password' ? 'eye-slash' : 'regular/eye'" :title="passwordType === 'password' ? '显示密码' : '隐藏密码'"></ricon>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitParticipantFrom">登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
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
          <source src="..\..\assets\participant\Tel-Aviv-Beach.mp4" type="video/mp4">浏览器不支持 video 标签，建议升级浏览器。
        </video>
        <div class="poster hidden" v-if="!vedioCanPlay">
          <img :style="fixStyle" src="..\..\assets\participant\Tel-Aviv-Beach.jpg" alt="Night_Market">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  name: 'register',
  data () {
    // Name的校验方法
    const validateParticipantName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('管理员用户名不能为空'))
      } else {
        callback()
      }
    }
    // Password的校验方法
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位数'))
      } else if (!value) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      // 登录表单
      participantRegisterForm: {
        participantname: '',
        password: ''
      },
      // 登陆表单的校验规则
      participantRegisterRules: {
        participantname: [
          { required: true, trigger: 'blur', validator: validateParticipantName }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password', // 控制密码输入框类型，用于显示密码
      vedioCanPlay: false,
      fixStyle: ''
    }
  },
  methods: {
    // 检测浏览器是否支持播放背景视频
    canplay () {
      this.vedioCanPlay = true
    },
    // 控制密码是否显示的方法
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 提交注册表单方法
    submitParticipantFrom () {
      this.$refs.participantRegisterForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch('user/participantRegister', this.participantRegisterForm)
            .then(() => {
              Message({
                showClose: true,
                message: '注册成功了哦！可以登录了哦！',
                type: 'success'
              })
              this.$router.push('participantLogin')
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
    // 重置登录表单方法
    resetForm () {
      this.$refs.participantRegisterForm.resetFields()
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
    if (this.participantRegisterForm.participantname === '') {
      this.$refs.participantname.focus()
    } else if (this.participantRegisterForm.password === '') {
      this.$refs.password.focus()
    }
  }
}
</script>

<style scoped>
.register {
  min-width: 650px;
}
.registerform {
  z-index: 2;
  position: absolute;
  top: 25%;
  left: 30%;
  right: 30%;
  width: 40%;
  border-radius: 3px;
  background: rgba(102, 102, 153, 0.6);
  color: #fff;
  min-width: 415px;
}

.el-form {
  margin-right: 27%;
  margin-left: 13%;
}

.show-pwd {
  position: absolute;
  right: 10px;
  font-size: 16px;
  color: gray;
  cursor: pointer;
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
<style>
/*修改全局组件el-form-item的label的样式*/
.whiteItem .el-form-item__label {
  color: white;
}
</style>
