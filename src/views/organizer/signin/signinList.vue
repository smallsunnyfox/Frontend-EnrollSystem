<template>
  <div class="signinList">
    <el-card shadow="never">
      <div slot="header" class="signinList_header">
        <span>签到管理</span>
        <el-button type="text" @click="chooseActivity" style="float:right;padding-bottom:0px;padding-top:0px;">
          <i class="el-icon-thumb"></i> 选择活动
        </el-button>
      </div>
      <el-alert style="margin-bottom:10px;" v-show="currentActivity===''" title="请先选择活动" type="success" :closable="false">
      </el-alert>
      <el-alert style="margin-bottom:10px;" v-show="currentActivity!==''" :title="'当前活动为 —— ' + currentActivity" type="success" :closable="false">
      </el-alert>
      <el-input ref="searchParname" v-model="searchParname" placeholder="请输入报名者" style="width:500px; float:left;margin-bottom:10px;">
      </el-input>
      <el-button-group style="float:left;margin-left:10px;">
        <el-button type="primary" @click="searchPar">搜索</el-button>
        <el-button type="primary" @click="resetSearch">重置</el-button>
      </el-button-group>
      <el-table
        :data="passedSignupofActivity.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        v-loading="loading"
        empty-text="该活动暂无报名信息"
        stripe
        highlight-current-row
        :default-sort = "{prop: 'submittime', order: 'descending'}"
      >
        <el-table-column prop="participant" label="报名者"></el-table-column>
        <el-table-column prop="submittime" sortable label="报名提交时间" width="170" align="center"></el-table-column>
        <el-table-column label="签到状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.signinstatus === 'yes'">已签到</span>
            <span v-else>未签到</span>
          </template>
        </el-table-column>
        <el-table-column label="签到处理" width="80px;">
          <template slot-scope="scope">
            <el-button slot="reference" size="mini" @click="signinforParticipant(scope.row.id, scope.row.signinstatus)">签到</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        small
        layout="prev, pager, next"
        :total="passedSignupofActivity.length"
        :pageSize="pageSize"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
      >
      </el-pagination>
    </el-card>
    <el-dialog :visible.sync="chooseActivityDialog" width="50%" top="55px">
      <div slot="title" class="dialog-title"><i class="el-icon-thumb"></i>选择活动(单击要选择的活动的行)</div>
      <el-table
        :data="myactivities"
        empty-text="您暂无正在进行中的活动"
        stripe
        highlight-current-row
        @row-click="chooseOneActivity"
      >
        <el-table-column prop="name" label="活动名称" width="310"></el-table-column>
        <el-table-column prop="organization" label="所属组织" align="center"></el-table-column>
        <el-table-column prop="site" label="活动地点" align="center"></el-table-column>
      </el-table>
      <div slot="footer">
        <el-button @click="chooseActivityDialog=false">取消选择</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { getName } from '@/utils/auth.js'
import { ButtonGroup, Table, Pagination, Message, MessageBox, TableColumn, Loading } from 'element-ui'
import { getSigninActivity } from '@/api/activity.js'
import { getsignupAuditofActivity, signinforParticipant } from '@/api/signupaudit.js'
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(Pagination)
Vue.use(Loading.directive)
Vue.use(TableColumn)
export default {
  name: 'signinList',
  data () {
    return {
      currentActivity: '',
      chooseActivityDialog: false,
      pageSize: 10,
      currentPage: 1,
      loading: true,
      searchParname: '',
      passedSignupofActivity: [],
      myactivities: []
    }
  },
  created () {
    this.chooseActivity()
  },
  methods: {
    chooseActivity () {
      getSigninActivity(getName())
        .then(response => {
          this.myactivities = response.data
        }).catch(error => {
          console.log(error)
        })
      this.chooseActivityDialog = true
    },
    chooseOneActivity (row) {
      this.currentActivity = row.name
      getsignupAuditofActivity(row.name, row.organizer)
        .then(response => {
          this.passedSignupofActivity = response.data
        }).catch(error => {
          console.log(error)
        })
      this.chooseActivityDialog = false
      this.loading = false
    },
    searchPar () {

    },
    resetSearch () {

    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    signinforParticipant (id, status) {
      if (status === 'yes') {
        Message({
          showClose: true,
          type: 'warning',
          message: '请勿重复签到！'
        })
      } else {
        MessageBox.confirm('确认该报名者已准时参加活动吗？', '签到提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          signinforParticipant(id)
            .then(response => {
              if (response.data.status === 'signinSuccess') {
                Message({
                  showClose: true,
                  type: 'success',
                  message: '已成功为该报名者签到！'
                })
                getsignupAuditofActivity(this.currentActivity, getName())
                  .then(response => {
                    this.passedSignupofActivity = response.data
                  }).catch(error => {
                    console.log(error)
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
}
</script>
<style scoped>
.signinList {
  margin: 20px auto;
  width: 95%;
}
.signinList_header {
  font-size: 14px;
  text-align: left;
}
.dialog-title {
  text-align: left;
  font-size: 18px;
}
</style>
