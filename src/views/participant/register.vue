<template>
  <div class="register">
    <!-- 注册表格 -->
    <div class="registerform">
      <h2 style="cursor: pointer;">Enroll在线活动报名平台注册</h2>
      <el-form
        ref="participantRegisterForm"
        :model="participantRegisterForm"
        :rules="participantRegisterRules"
        label-width="95px"
      >
        <el-form-item label="用户名" prop="participantname" class="whiteItem">
          <el-input v-model="participantRegisterForm.participantname" ref="participantname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="whiteItem">
          <el-input
            :key="passwordType"
            v-model="participantRegisterForm.password"
            :type="passwordType"
            ref="password"
          ></el-input>
          <span class="show-pwd" @click="showPwd">
            <ricon :name="passwordType === 'password' ? 'eye-slash' : 'regular/eye'" :title="passwordType === 'password' ? '显示密码' : '隐藏密码'"></ricon>
          </span>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordtwo" class="whiteItem">
          <el-input
            :key="passwordTypeTwo"
            v-model="participantRegisterForm.passwordtwo"
            :type="passwordTypeTwo"
            ref="passwordtwo"
          ></el-input>
          <span class="show-pwd" @click="showPwdTwo">
            <ricon :name="passwordTypeTwo === 'password' ? 'eye-slash' : 'regular/eye'" :title="passwordTypeTwo === 'password' ? '显示密码' : '隐藏密码'"></ricon>
          </span>
        </el-form-item>
        <el-form-item label="手机号码" prop="phonenumber" class="whiteItem">
          <el-input v-model="participantRegisterForm.phonenumber" ref="phonenumber" @keyup.enter.native="submitParticipantFrom"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitParticipantFrom">注册</el-button>
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
    const namepattern = /^[A-Za-z\u4e00-\u9fa5]+$/;
    const pswpattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
    const phonepattern = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
    const validateParticipantName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("用户名不能为空"));
      } else if (value.length < 3){
        callback(new Error("用户名不能小于3位数"));
      } else if (value.length > 8){
        callback(new Error("用户名不能大于8位数"));
      } else if (value.indexOf(" ") != -1){
        callback(new Error("用户名不能包含空格"));
      } else if (!namepattern.test(value)){
        callback(new Error("用户名只能为汉字和英文字母的混合"));
      } else {
        callback();
      }
    }
    // Password的校验方法
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空"));
      } else if (value.length < 6) {
        callback(new Error("密码不能小于6位数"));
      } else if (value.length > 14) {
        callback(new Error("密码不能小于14位数"));
      } else if (value.indexOf(" ") != -1){
        this.$refs.password.value = '';
        callback(new Error("密码不能包含空格"));
      } else if (!pswpattern.test(value)){
        callback(new Error("密码必须包括至少1个大写字母1个小写字母1个数字"));
      } else {
        callback();
      }
    }
    //确认密码的校验
    const validatePasswordtwo = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次确认密码"));
      }else if (value !== this.$refs.password.value) {
        console.log(this.$refs.password.value)
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    }
    //手机号码的校验
    const validatePhonenumber = (rule, value, callback) => {
      if (!value) {
        callback(new Error("手机号码不能为空"));
      } else if (value.indexOf(" ") != -1){
        callback(new Error("号码不能包含空格"));
      } else if (!phonepattern.test(value)) {
        callback(new Error("号码格式错误"));
      } else {
        callback();
      }
    }
    return {
      // 登录表单
      participantRegisterForm: {
        participantname: '',
        password: '',
        passwordtwo: '',
        phonenumber: ''
      },
      // 登陆表单的校验规则
      participantRegisterRules: {
        participantname: [
          { required: true, trigger: 'blur', validator: validateParticipantName }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        passwordtwo: [
          { required: true, trigger: 'blur', validator: validatePasswordtwo }
        ],
        phonenumber: [
          { required: true, trigger: 'blur', validator: validatePhonenumber }
        ]
      },
      passwordType: 'password', // 控制密码输入框类型，用于显示密码
      passwordTypeTwo: 'password',
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
    showPwdTwo () {
      if (this.passwordTypeTwo === 'password') {
        this.passwordTypeTwo = ''
      } else {
        this.passwordTypeTwo = 'password'
      }
      this.$nextTick(() => {
        this.$refs.passwordtwo.focus()
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
