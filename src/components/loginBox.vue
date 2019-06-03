<template>
  <div class="loginform">
    <h2 style="cursor: pointer;">{{" "+title}}</h2>
    <el-form ref="LoginForm" :model="LoginForm" :rules="LoginRules" label-width="95px">
      <el-form-item label="用户名" prop="name" class="whiteItem">
        <el-input v-model="LoginForm.name" ref="name"></el-input>
      </el-form-item>
      <el-form-item label="密码 " prop="password" class="whiteItem">
        <el-input
          :key="passwordType"
          v-model="LoginForm.password"
          :type="passwordType"
          ref="password"
          @keyup.enter.native="submitFrom"
        ></el-input>
        <span class="show-pwd" @click="showPwd">
          <ricon
            :name="passwordType === 'password' ? 'eye-slash' : 'regular/eye'"
            :title="passwordType === 'password' ? '显示密码' : '隐藏密码'"
          ></ricon>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitFrom" size="small">登录</el-button>
        <el-button @click="resetForm" size="small">重置</el-button>
        <el-button @click="passToRegister" v-show="!isAdmin" size="small">注册</el-button>
        <el-button @click="passToHome" size="small">首页</el-button><br>
        <el-button @click="forgetpwd()" size="small" type="text">忘记密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  name: 'loginForm',
  data () {
    // Name的校验方法
    const namepattern = /^[A-Za-z\u4e00-\u9fa5]+$/
    const validateName = (rule, value, callback) => {
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
    // Password的校验方法
    const validatePassword = (rule, value, callback) => {
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
    return {
      // 登录表单
      LoginForm: {
        name: '',
        password: '',
        role: this.roleofuser
      },
      // 登陆表单的校验规则
      LoginRules: {
        name: [
          { required: true, trigger: 'blur', validator: validateName }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password', // 控制密码输入框类型，用于显示密码
      isAdmin: false
    }
  },
  props: ['roleofuser', 'title'],
  methods: {
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
    // 提交登录表单方法
    submitFrom () {
      this.$refs.LoginForm.validate(valid => {
        if (valid) {
          console.log('submit success!!')
          this.$store
            .dispatch('user/login', this.LoginForm)
            .then(() => {
              Message({
                showClose: true,
                message: '登录成功了哦！',
                type: 'success'
              })
              this.$router.push(this.roleofuser)
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
      this.$refs.LoginForm.resetFields()
    },
    passToRegister () {
      this.$router.push({ path: `/${this.roleofuser}Register` })
    },
    passToHome () {
      this.$router.push({ path: '/' })
    },
    forgetpwd () {
      this.$emit('forgetpwd')
    }
  },
  mounted () {
    if (this.LoginForm.name === '') {
      this.$refs.name.focus()
    } else if (this.LoginForm.password === '') {
      this.$refs.password.focus()
    }

    if (this.roleofuser === 'admin') {
      this.isAdmin = true
    }
  }
}
</script>

<style scoped>
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
  min-width: 582px;
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
</style>
<style>
/*修改全局组件el-form-item的label的样式*/
.whiteItem .el-form-item__label {
  color: white;
}
</style>
