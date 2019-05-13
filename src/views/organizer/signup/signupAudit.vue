<template>
  <div class="signupAudit">
      <el-card shadow="never">
        <div slot="header" class="signupAudit_header">
          <span>报名审核</span>
        </div>
        <el-input ref="searchNameValue" placeholder="请输入内容" v-model="searchNameValue" class="input-with-select" style="float:left;width:500px;margin-bottom:12px;">
          <el-select ref="searchSelectValue" v-model="searchSelectValue" slot="prepend" placeholder="请选择" style="width:150px;">
            <el-option label="活动名称" value="activity"></el-option>
            <el-option label="报名者" value="participant"></el-option>
          </el-select>
        </el-input>
        <el-button-group style="float:left;margin-left:10px;">
          <el-button type="primary" @click="searchAudit">搜索</el-button>
          <el-button type="primary" @click="resetSearch">重置</el-button>
        </el-button-group>
        <el-table
          :data="signupAudit.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          v-loading="loading"
          border
          stripe
          highlight-current-row
          :default-sort = "{prop: 'submittime', order: 'descending'}"
        >
          <el-table-column prop="activity" label="活动名称"></el-table-column>
          <el-table-column prop="participant" label="报名者"></el-table-column>
          <el-table-column prop="submittime" sortable label="提交时间" width="170" align="center"></el-table-column>
          <el-table-column label="报名表单" width="150" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="viewEntryform(scope.row)">查看表单</el-button>
            </template>
          </el-table-column>
          <el-table-column label="是否通过" align="center" width="120">
            <template slot-scope="scope">
              <el-button size="mini" @click="passSignup(scope.row.id)">是</el-button>
              <el-button size="mini" @click="unpassSignup(scope.row.id)" type="danger">否</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          layout="prev, pager, next"
          :total="signupAudit.length"
          :pageSize="pageSize"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
        >
        </el-pagination>
      </el-card>
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
import { getName } from '@/utils/auth.js'
import { getMySignupAudit, searchAudit } from '@/api/signupaudit.js'
import { Select, Option, Message, ButtonGroup, Table, TableColumn, Loading, Pagination } from 'element-ui'
Vue.use(Select)
Vue.use(Option)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(Pagination)
Vue.use(Loading.directive)
Vue.use(TableColumn)
export default {
  name: 'signupAudit',
  data () {
    return {
      pageSize: 10,
      currentPage: 1,
      loading: true,
      searchNameValue: '',
      searchSelectValue: 'activity',
      signupAudit: [],
      entryformDialog: false,
      names: [],
      values: []
    }
  },
  created () {
    this.getMySignupAudit()
  },
  methods: {
    getMySignupAudit () {
      setTimeout(() => {
        getMySignupAudit(getName())
          .then(response => {
            this.signupAudit = response.data
            this.loading = false
          }).catch(error => {
            console.log(error)
          })
      }, 500)
    },
    searchAudit () {
      if (this.searchNameValue !== '') {
        searchAudit(getName(), this.searchSelectValue, this.searchNameValue)
          .then(response => {
            if (response.data.length === 0) {
              Message({
                showClose: true,
                message: '未查询到相关活动！快去发起活动吧！',
                type: 'warning'
              })
              this.searchNameValue = ''
            } else {
              this.signupAudit = response.data
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
      this.searchSelectValue = 'activity'
      this.getMySignupAudit()
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    viewEntryform (row) {
      this.names = row.name.split(',')
      this.values = row.value.split(',')
      this.entryformDialog = true
    },
    passSignup (id) {

    },
    unpassSignup (id) {

    }
  }
}
</script>
<style scoped>
.signupAudit {
  margin: 20px auto;
  width: 95%;
}
.signupAudit_header {
  font-size: 14px;
  text-align: left;
}
.dialog-title {
  text-align: left;
  font-size: 18px;
}
</style>
