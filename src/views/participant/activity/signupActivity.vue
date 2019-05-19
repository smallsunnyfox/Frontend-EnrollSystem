<template>
  <div class="signupActivity">
    <el-input ref="searchNameValue" placeholder="请输入内容" v-model="searchNameValue" class="input-with-select" style="float:left;margin-bottom:15px;margin-top:20px;width:811px;">
      <el-select ref="searchSelectValue" v-model="searchSelectValue" slot="prepend" placeholder="请选择" style="width:150px;">
        <el-option label="活动名称" value="name"></el-option>
        <el-option label="活动组织者" value="organizer"></el-option>
        <el-option label="活动所属组织" value="organization"></el-option>
      </el-select>
    </el-input>
    <el-button-group style="float:left;margin:20px 0 15px 10px;">
      <el-button type="primary" @click="searchActivity">搜索</el-button>
      <el-button type="primary" @click="resetSearch">重置</el-button>
    </el-button-group>
    <el-card
      v-for="activity in couldSignupActivities"
      :key="activity.id"
      shadow="hover"
      class="activity_card"
    >
      <div slot="header" class="activity_header">
        <span>{{activity.name}}</span>
        <el-button type="text" @click="signupActivity(activity.id, activity.entryform)" style="float:right;padding-bottom:0px;padding-top:2px;">活动报名</el-button>
        <el-button type="text" @click="viewActivityInfo(activity)" style="float:right;padding-bottom:0px;padding-top:2px;">活动详情</el-button>
      </div>
      <div class="activity_content">
        活动组织者: <span>{{activity.organizer}}</span> 所属组织: <span>{{activity.organization}}</span>
        <span style="float:right;margin-top:2.4px;"> {{activity.deadline}}</span><span style="float:right;color:black;">报名截止时间:</span>
      </div>
    </el-card>
    <br>
    <br>
    <br>
    <el-alert
      v-show="showAlert"
      title="暂无可报名的活动"
      type="success"
      :closable="false"
      style="margin-bottom:10px;"
    ></el-alert>
    <el-button icon="el-icon-refresh" type="primary" size="small" circle title="刷新活动" @click="refreshData()"></el-button>
    <!-- 查看活动信息的Dialog -->
    <el-dialog :visible.sync="activityInfoDialog" width="50%" top="58px">
      <!-- title -->
      <div slot="title" class="dialog-title"><i class="el-icon-document"></i> 活动信息</div>
      <el-form label-position="left">
        <el-form-item>
          <span slot="label"><i class="el-icon-location-outline"></i>活动地点:</span>
          <span style="color:gray;float:left;">{{ moreInfo.site }}</span>
        </el-form-item>
        <el-form-item>
          <span slot="label"><i class="el-icon-time"></i>活动开始时间:</span>
          <span style="color:gray;float:left;">{{ moreInfo.starttime }}</span>
        </el-form-item>
        <el-form-item>
          <span slot="label"><i class="el-icon-time"></i>活动结束时间:</span>
          <span style="color:gray;float:left;">{{ moreInfo.endtime }}</span>
        </el-form-item>
        <el-form-item>
          <span slot="label"><i class="el-icon-collection-tag"></i>活动详情:</span>
          <span style="color:gray;float:left;text-align:left;">{{ moreInfo.detail }}</span>
        </el-form-item>
      </el-form>
      <!-- footer -->
      <div slot="footer">
        <el-button @click="activityInfoDialog = false">关闭查看</el-button>
      </div>
    </el-dialog>
    <!-- 报名的Dialog -->
    <el-dialog :visible.sync="signupDialog" width="50%" top="58px">
      <!-- title -->
      <div slot="title" class="dialog-title"><i class="el-icon-document-add"></i> 活动报名</div>
      <el-form :model="signupEntryForm" ref="signupEntryForm" :rules="signupRules" label-width="auto" label-position="right">
        <el-form-item v-for="item in signupEntryItems" :key="item.id" :label="item.name" :prop="item.name">
          <el-input v-if="item.type === 'input'" v-model="signupEntryForm[item.name]"></el-input>
          <el-input v-else-if="item.type === 'textarea'" type="textarea" v-model="signupEntryForm[item.name]"></el-input>
          <el-input v-else-if="item.type === 'inputnumber'" type="number" v-model="signupEntryForm[item.name]"></el-input>
          <el-radio-group v-else-if="item.type === 'radio'" v-model="signupEntryForm[item.name]" style="float:left;margin-top:13px;">
            <el-radio v-for="option in item.options.split(',')" :key="option" :label="option">{{option}}</el-radio>
          </el-radio-group>
          <el-checkbox-group v-model="signupEntryForm[item.name]" v-else-if="item.type === 'checkbox'" :value="[]" style="float:left;height:40px;">
            <el-checkbox v-for="option in item.options.split(',')" :key="option" :label="option">{{option}}</el-checkbox>
          </el-checkbox-group>
          <el-date-picker style="float:left;" v-model="signupEntryForm[item.name]" v-else-if="item.type === 'datepicker'" :placeholder="'选择'+item.name"></el-date-picker>
          <el-select :value="''" style="float:left;" v-model="signupEntryForm[item.name]" v-else-if="item.type === 'select'" placeholder="请选择">
            <el-option v-for="option in item.options.split(',')" :key="option" :label="option" :value="option"></el-option>
          </el-select>
          <br v-if="item.reminder!=='' && item.reminder!==null">
          <span v-if="item.reminder!=='' && item.reminder!==null" style="font-size:12px;color:gray;float:left;">填写提示：{{item.reminder}}</span>
        </el-form-item>
      </el-form>
      <!-- footer -->
      <div slot="footer">
        <el-button @click="signupDialog = false">取消报名</el-button>
        <el-button type="primary" @click="submitEntryForm">提交报名</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { getName } from '../../../utils/auth.js'
import { getCouldSignupActivity, searchCouldSignupActivity, getEntryItemsOfActivity, signupActivity } from '@/api/activity.js'
import { Select, Option, Message, ButtonGroup, Alert, Radio, RadioGroup, CheckboxGroup, Checkbox, DatePicker } from 'element-ui'
Vue.use(Select)
Vue.use(Option)
Vue.use(ButtonGroup)
Vue.use(Alert)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(DatePicker)
export default {
  name: 'signupActivity',
  data () {
    return {
      showAlert: false, // 控制是否显示无活动的Alert
      searchNameValue: '', // 查询的类型
      searchSelectValue: 'name', // 查询的内容
      couldSignupActivities: [], // 可以报名的活动list
      activityInfoDialog: false, // 控制查看活动信息的Dialog
      signupDialog: false, // 控制报名的Dialog
      moreInfo: { // 查看更多信息
        site: '',
        starttime: '',
        endtime: '',
        detail: ''
      },
      signupEntryItems: [], // 获取报名项
      signupEntryForm: {}, // 动态生成报名表单
      signupRules: {} // 动态生成报名校验规则
    }
  },
  created () {
    this.getCouldSignupActivity()
  },
  methods: {
    // 获取所有可报名活动
    getCouldSignupActivity () {
      getCouldSignupActivity()
        .then(response => {
          if (response.data.length === 0) {
            this.showAlert = true
          } else {
            this.showAlert = false
          }
          this.couldSignupActivities = response.data
        }).catch(error => {
          console.log(error)
        })
    },
    // 刷新数据
    refreshData () {
      const loading = this.$loading({
        lock: true,
        text: '稍等哦，刷新活动中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        if (this.searchNameValue !== '') {
          this.searchActivity()
        } else {
          this.getCouldSignupActivity()
        }
        loading.close()
      }, 600)
    },
    // 查询活动
    searchActivity () {
      if (this.searchNameValue !== '') {
        searchCouldSignupActivity(this.searchSelectValue, this.searchNameValue)
          .then(response => {
            if (response.data.length === 0) {
              Message({
                showClose: true,
                message: '未查询到相关活动！快去发起活动吧！',
                type: 'warning'
              })
              this.searchNameValue = ''
            } else {
              this.couldSignupActivities = response.data
            }
          }).catch(error => {
            console.log(error)
          })
      } else {
        Message({
          showClose: true,
          message: '请先输入您要搜索的内容！',
          type: 'warning'
        })
        this.$refs.searchNameValue.focus()
      }
    },
    // 重置查询
    resetSearch () {
      this.searchNameValue = ''
      this.searchSelectValue = 'name'
      this.getCouldSignupActivity()
    },
    // 查看更多活动信息
    viewActivityInfo (activity) {
      this.moreInfo.site = activity.site
      this.moreInfo.starttime = activity.starttime
      this.moreInfo.endtime = activity.endtime
      this.moreInfo.detail = activity.detail
      this.activityInfoDialog = true
    },
    // 报名
    signupActivity (id, entryform) {
      // 报名的校验规则
      const validateInput = (rule, value, callback) => {
        if (!value) {
          callback(new Error('该项为必填项'))
        } else if (value.length > 20) {
          callback(new Error('该项不能超过20个字符'))
        } else {
          callback()
        }
      }
      const validateTextarea = (rule, value, callback) => {
        if (!value) {
          callback(new Error('该项为必填项'))
        } else if (value.length > 140) {
          callback(new Error('该项不能超过140个字符'))
        } else {
          callback()
        }
      }
      const validateCheckbox = (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error('该项为必填项'))
        } else {
          callback()
        }
      }
      const validateValue = (rule, value, callback) => {
        if (!value) {
          callback(new Error('该项为必填项'))
        } else {
          callback()
        }
      }
      const loading = this.$loading({
        lock: true,
        text: '生成报名表单中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        getEntryItemsOfActivity(entryform)
          .then(response => {
            this.signupEntryItems = response.data
            this.signupEntryForm = {}
            this.$set(this.signupEntryForm, 'aid', id)
            this.$set(this.signupEntryForm, 'pname', getName())
            for (var i = 0; i < this.signupEntryItems.length; i++) {
              if (this.signupEntryItems[i].type === 'input') {
                this.$set(this.signupEntryForm, this.signupEntryItems[i].name, '')
                if (this.signupEntryItems[i].isrequired === 'true') {
                  this.$set(this.signupRules, this.signupEntryItems[i].name, [{ required: true, trigger: 'blur', validator: validateInput }])
                }
              } else if (this.signupEntryItems[i].type === 'textarea') {
                this.$set(this.signupEntryForm, this.signupEntryItems[i].name, '')
                if (this.signupEntryItems[i].isrequired === 'true') {
                  this.$set(this.signupRules, this.signupEntryItems[i].name, [{ required: true, trigger: 'blur', validator: validateTextarea }])
                }
              } else if (this.signupEntryItems[i].type === 'checkbox') {
                this.$set(this.signupEntryForm, this.signupEntryItems[i].name, [])
                if (this.signupEntryItems[i].isrequired === 'true') {
                  this.$set(this.signupRules, this.signupEntryItems[i].name, [{ required: true, trigger: 'blur', validator: validateCheckbox }])
                }
              } else {
                this.$set(this.signupEntryForm, this.signupEntryItems[i].name, '')
                if (this.signupEntryItems[i].isrequired === 'true') {
                  this.$set(this.signupRules, this.signupEntryItems[i].name, [{ required: true, trigger: 'blur', validator: validateValue }])
                }
              }
            }
            loading.close()
            this.signupDialog = true
            this.$nextTick(() => {
              this.$refs.signupEntryForm.resetFields()// 重置表单
            })
          }).catch(error => {
            console.log(error)
          })
      }, 500)
      // Vue.$set([想要添加字段的对象],'字段名',字段值) 动态生成表单和验证规则
    },
    // 提交报名表单
    submitEntryForm () {
      this.$refs.signupEntryForm.validate(valid => {
        if (valid) {
          signupActivity(this.signupEntryForm)
            .then(response => {
              if (response.data.status === 'needAudit') {
                Message({
                  showClose: true,
                  message: '报名成功，您的报名正在审核中，请等待通知哦！',
                  type: 'success'
                })
              } else if (response.data.status === 'signupPassed') {
                Message({
                  showClose: true,
                  message: '报名成功！请准时参加活动！',
                  type: 'success'
                })
              } else if (response.data.status === 'alreadySignup') {
                Message({
                  showClose: true,
                  message: '您已经报名过该活动了！无需重复报名!',
                  type: 'warning'
                })
              }
              this.signupDialog = false
            }).catch(error => {
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.dialog-title {
  text-align: left;
  font-size: 18px;
}
.signupActivity {
  width: 960px;
  margin: 0 20px;
}
.activity_card {
  width: 960px;
  margin-bottom: 10px;
}
.activity_header {
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  color: black;
}
.activity_content {
  font-size: 14px;
  text-align: left;
}
.activity_content span {
  color: #3a8ee6;
}
</style>
<style>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-card__header {
  padding: 10px 12px;
  border: none;
}
.el-card__body {
  padding: 0 12px 12px 12px;
}
.el-button--text {
  color: #0f28e9;
}

</style>
