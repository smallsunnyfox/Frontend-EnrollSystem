<template>
  <div class="mySignedActivity">
    <el-input ref="searchNameValue" placeholder="请输入内容" v-model="searchNameValue" class="input-with-select" style="float:left;margin-bottom:15px;margin-top:20px;width:811px;">
      <el-select ref="searchSelectValue" v-model="searchSelectValue" slot="prepend" placeholder="请选择" style="width:150px;">
        <el-option label="活动名称" value="activity"></el-option>
        <el-option label="活动组织者" value="organizer"></el-option>
      </el-select>
    </el-input>
    <el-alert
      v-show="showAlert"
      title="您尚未报名活动"
      type="success"
      :closable="false"
      style="margin-bottom:10px;"
    ></el-alert>
    <el-card
      v-for="audit in mysignupAudits"
      :key="audit.id"
      shadow="hover"
      class="mySignedActivity_card"
    >
      <div slot="header" class="mySignedActivity_header">
        <span>{{ audit.activity }}</span>
        <el-button type="text" @click="viewMyEntryform(audit)" style="float:right;padding-bottom:0px;padding-top:2px;margin-left:5px;">我的报名表单</el-button>
        <el-button type="text" @click="cancelSignup(audit.id)" style="float:right;padding-bottom:0px;padding-top:2px;margin-left:0px;">取消报名</el-button>
      </div>
      <div class="mySignedActivity_content">
        报名状态:
        <span v-if="audit.status === 'tobeAudit'">待审核</span>
        <span v-else-if="audit.status === 'noneedAudit'">该活动无需审核，请准时参加活动</span>
        <span v-else-if="audit.status === 'passed'">您的报名已通过审核，请准时参加活动</span>
        <span v-else>您的报名未通过审核，原因为：{{audit.status}}</span>
        <br><br>
        活动组织者: <span>{{ audit.organizer }}</span>
        <span style="float:right;margin-top:2.4px;"> {{audit.submittime}}</span><span style="float:right;color:black;">报名提交时间:</span>
      </div>
    </el-card>
    <br>
    <br>
    <br>
    <el-button icon="el-icon-refresh" type="primary" size="small" circle title="刷新活动" @click="refreshData()"></el-button>
    <!-- 查看报名表单的Dialog -->
    <el-dialog :visible="entryformDialog" width="50%" top="58px">
      <div slot="title" class="dialog-title"><i class="el-icon-tickets"></i>报名表单</div>
        <el-form label-width="auto" label-position="right">
          <el-form-item
            v-for="(name,index) in names"
            :key="index"
            :label="name+':'"
          >
            <span v-if="values[index]!==''" style="float:left;">{{ values[index] }}</span>
            <span v-else style="float:left;">报名者未填写</span>
          </el-form-item>
        </el-form>
      <div slot="footer">
        <el-button type="primary" @click="entryformDialog = false">关闭查看</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { getName } from '../../../utils/auth.js'
import { getAuditOfParticipant, searchAuditofParticipant, cancelSignup } from '@/api/signupaudit.js'
import { Select, Option, ButtonGroup, Alert, MessageBox, Message } from 'element-ui'
Vue.use(Select)
Vue.use(Option)
Vue.use(ButtonGroup)
Vue.use(Alert)
export default {
  name: 'mySignedActivity',
  data () {
    return {
      searchNameValue: '',
      searchSelectValue: 'activity',
      mysignupAudits: [],
      showAlert: false,
      entryformDialog: false,
      names: [],
      values: []
    }
  },
  created () {
    this.getMysignupAudit()
  },
  methods: {
    // 获取我的报名信息
    getMysignupAudit () {
      getAuditOfParticipant(getName())
        .then(response => {
          if (response.data.length === 0) {
            this.showAlert = true
          } else {
            this.showAlert = false
          }
          this.mysignupAudits = response.data
        }).catch(error => {
          console.log(error)
        })
    },
    // 刷新数据
    refreshData () {
      const loading = this.$loading({
        lock: true,
        text: '稍等哦，刷新报名信息中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        if (this.searchNameValue !== '') {
          this.searchActivity()
        } else {
          this.getMysignupAudit()
        }
        loading.close()
      }, 600)
    },
    // 查询我的报名信息
    searchAudit () {
      if (this.searchNameValue !== '') {
        searchAuditofParticipant(getName(), this.searchSelectValue, this.searchNameValue)
          .then(response => {
            if (response.data.length === 0) {
              Message({
                showClose: true,
                message: '未查询到相关报名信息！快去报名吧！',
                type: 'warning'
              })
              this.searchNameValue = ''
            } else {
              this.mysignupAudits = response.data
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
      this.searchSelectValue = 'activity'
      this.getMysignupAudit()
    },
    // 查看我的报名表单
    viewMyEntryform (audit) {
      this.names = audit.name.split(',')
      this.values = audit.value.split(',')
      this.entryformDialog = true
    },
    // 取消活动报名
    cancelSignup (id) {
      MessageBox.confirm('确认要取消该活动的报名吗?', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelSignup(id)
          .then(response => {
            if (response.data.status === 'cancelSuccess') {
              Message({
                showClose: true,
                type: 'success',
                message: '取消成功'
              })
              this.getMysignupAudit()
            } else if (response.data.status === 'cannotCancel') {
              Message({
                showClose: true,
                type: 'warning',
                message: '该活动报名已经截止，无法取消报名！'
              })
            }
          }).catch(error => {
            console.log(error)
          })
      }).catch(() => {
        Message({
          showClose: true,
          type: 'info',
          message: '已取消操作'
        })
      })
    }
  }
}
</script>
<style scoped>
.mySignedActivity {
  width: 960px;
  margin: 0 20px;
}
.dialog-title {
  text-align: left;
  font-size: 18px;
}
.mySignedActivity_card {
  width: 960px;
  margin-bottom: 10px;
}
.mySignedActivity_header {
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  color: black;
}
.mySignedActivity_content {
  font-size: 14px;
  text-align: left;
}
.mySignedActivity_content span {
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
