<template>
  <div class="login">
    <div class="loginform">
      <h2 style="cursor: pointer;">Enroll后台审核系统</h2>
      <el-form
        ref="adminLoginForm"
        :model="adminLoginForm"
        :rules="adminLoginRules"
        label-width="95px"
      >
        <el-form-item label="AdminName" prop="adminname" class="whiteItem">
          <el-input v-model="adminLoginForm.adminname" ref="adminname"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password" class="whiteItem">
          <el-input
            :key="passwordType"
            v-model="adminLoginForm.password"
            :type="passwordType"
            ref="password"
            @keyup.enter.native="submitAdminFrom('adminLoginForm')"
          ></el-input>
          <span class="show-pwd" @click="showPwd">
            <i class="el-icon-view"></i>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAdminFrom('adminLoginForm')">登录</el-button>
          <el-button @click="resetForm('adminLoginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
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
          <source src="../../assets/admin/Mp4/Night_market.mp4" type="video/mp4">浏览器不支持 video 标签，建议升级浏览器。
        </video>
        <div class="poster hidden" v-if="!vedioCanPlay">
          <img :style="fixStyle" src="..\..\assets\admin\Photo\Night_market.jpg" alt="Night_Market">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    const validateAdminName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('管理员用户名不能为空'))
      } else {
        callback()
      }
    }
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
      adminLoginForm: {
        adminname: '',
        password: '',
        role: 'admin'
      },
      adminLoginRules: {
        adminname: [
          { required: true, trigger: 'blur', validator: validateAdminName }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password',
      vedioCanPlay: false,
      fixStyle: ''
    }
  },
  methods: {
    canplay () {
      this.vedioCanPlay = true
    },
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
    submitAdminFrom (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$store.dispatch('user/adminlogin', form)
            .then(() => {
              this.$router.push('adminHome')
              console.log(this.$store.getters.name)
              console.log(this.$store.getters.phonenumber)
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
    resetForm (form) {
      this.$refs[form].resetFields()
    }
  },
  mounted: function () {
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
    if (this.adminLoginForm.adminname === '') {
      this.$refs.adminname.focus()
    } else if (this.adminLoginForm.password === '') {
      this.$refs.password.focus()
    };
  }
}
</script>

<style scoped>
.login {
  min-width: 650px;
}
.loginform {
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
  color: black;
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
