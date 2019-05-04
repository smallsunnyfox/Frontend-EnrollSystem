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
        <el-button type="text" @click="signupActivity(activity.entryform)" style="float:right;padding-bottom:0px;padding-top:2px;">活动报名</el-button>
        <el-button type="text" @click="viewActivityInfo(activity)" style="float:right;padding-bottom:0px;padding-top:2px;">查看活动</el-button>
      </div>
      <div class="activity_content">
        活动组织者: <span>{{activity.organizer}}</span> 所属组织: <span>{{activity.organization}}</span>
        <span style="float:right;margin-top:2.4px;"> {{activity.deadline}}</span><span style="float:right;color:black;">报名截止时间:</span>
      </div>
    </el-card>
    <br>
    <br>
    <br>
    <el-button icon="el-icon-refresh" type="primary" size="small" circle title="刷新活动" @click="refreshData()"></el-button>
    <!-- 查看活动信息的Dialog -->
    <el-dialog :visible.sync="activityInfoDialog" width="50%" top="58px">
      <!-- title -->
      <div slot="title" class="dialog-title"><i class="el-icon-document"></i> 活动信息</div>
      <!-- footer -->
      <div slot="footer">
        <el-button @click="activityInfoDialog = false">关闭查看</el-button>
      </div>
    </el-dialog>
    <!-- 报名的Dialog -->
    <el-dialog :visible.sync="signupDialog" width="50%" top="58px">
      <!-- title -->
      <div slot="title" class="dialog-title"><i class="el-icon-document-add"></i> 活动报名</div>
      <!-- footer -->
      <div slot="footer">
        <el-button @click="signupDialog = false">取消报名</el-button>
        <el-button type="primary" @click="signupDialog = false">提交报名</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { getCouldSignupActivity, searchCouldSignupActivity } from '@/api/activity.js'
import { Select, Option, Message, ButtonGroup } from 'element-ui'
Vue.use(Select)
Vue.use(Option)
Vue.use(ButtonGroup)
export default {
  name: 'signupActivity',
  data () {
    return {
      searchNameValue: '',
      searchSelectValue: 'name',
      couldSignupActivities: [],
      activityInfoDialog: false,
      signupDialog: false
    }
  },
  created () {
    this.getCouldSignupActivity()
  },
  methods: {
    getCouldSignupActivity () {
      getCouldSignupActivity()
        .then(response => {
          this.couldSignupActivities = response.data
        }).catch(error => {
          console.log(error)
        })
    },
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
    resetSearch () {
      this.searchNameValue = ''
      this.searchSelectValue = 'name'
      this.getCouldSignupActivity()
    },
    viewActivityInfo (activity) {
      console.log(activity)
      this.activityInfoDialog = true
    },
    signupActivity (entryform) {
      console.log(entryform)
      this.signupDialog = true
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
