<template>
  <div class="auditor">
    <el-card shadow="never" class="auditor_body">
      <div slot="header" style="font-size: 14px;text-align: left;">
        <span>审核员管理</span>
        <el-button type="text" @click="addAdmin" style="float:right;padding-bottom:0px;padding-top:0px;">
          <i class="el-icon-circle-plus-outline"></i> 添加审核员
        </el-button>
      </div>
      <el-input placeholder="搜索审核员名称" ref="searchAdminName" v-model="searchAdminName" style="float:left;width:500px;margin-bottom:10px;"></el-input>
      <el-button-group style="float:left;margin-left:10px;">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="resetSearch">重置</el-button>
      </el-button-group>
      <el-table
        :data="adminList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        stripe
        v-loading="loading"
      >
        <el-table-column prop="name" label="审核员名称"></el-table-column>
        <el-table-column prop="phonenumber" label="电话号码"></el-table-column>
        <el-table-column label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="updateAdmin(scope.row)">修改</el-button>
            <el-button size="mini" @click="deleteAdmin(scope.row.id)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        small
        layout="prev, pager, next"
        :total="adminList.length"
        :pageSize="pageSize"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
      >
      </el-pagination>
    </el-card>
    <el-dialog :visible.sync="addAdminDialog" width="50%" top="55px">
      <div slot="title" class="dialog-title"><i class="el-icon-circle-plus-outline"></i>添加审核员</div>
      <el-form :model="addAdminForm" :rules="addAdminRules" ref="addAdminForm" label-width="auto" label-position="right">
        <el-form-item label="审核员名称" prop="name">
          <el-input ref="name" v-model="addAdminForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phonenumber">
          <el-input v-model="addAdminForm.phonenumber"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addAdminForm.password" show-password disabled></el-input>
          <span style="float:left;">默认为初始密码:Aa123456</span>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addAdminDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitAddAdminForm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="updateAdminDialog" width="50%" top="55px">
      <div slot="title" class="dialog-title"><i class="el-icon-edit"></i>更新审核员信息</div>
      <el-form :model="updateAdminForm" :rules="updateAdminRules" ref="updateAdminForm" label-width="auto" label-position="right">
        <el-form-item label="审核员名称" prop="uname">
          <el-input v-model="updateAdminForm.uname"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="uphonenumber">
          <el-input v-model="updateAdminForm.uphonenumber"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="updateAdminDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdateAdminForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { adminList, addAdmin, updateAdmin, deleteAdmin, searchAdmin } from '@/api/user.js'
import { Table, TableColumn, Message, MessageBox, Pagination, Loading, ButtonGroup } from 'element-ui'
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(ButtonGroup)
Vue.use(Loading.directive)
export default {
  name: 'auditor',
  data () {
    const namepattern = /^[A-Za-z\u4e00-\u9fa5]+$/
    const phonepattern = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名不能为空'))
      } else if (value.length < 3) {
        callback(new Error('用户名不能小于3位数'))
      } else if (value.length > 6) {
        callback(new Error('用户名不能大于6位数'))
      } else if (value.indexOf(' ') !== -1) {
        callback(new Error('用户名不能包含空格'))
      } else if (!namepattern.test(value)) {
        callback(new Error('用户名只能为汉字和英文字母的混合'))
      } else {
        callback()
      }
    }
    // 手机号码的校验
    const validatePhonenumber = (rule, value, callback) => {
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
    return {
      loading: true,
      adminList: [],
      searchAdminName: '',
      currentPage: 1,
      pageSize: 10,
      addAdminDialog: false,
      updateAdminDialog: false,
      addAdminForm: {
        name: '',
        phonenumber: '',
        password: 'Aa123456'
      },
      updateAdminForm: {
        uid: 0,
        uname: '',
        uphonenumber: ''
      },
      addAdminRules: {
        name: [
          { required: true, trigger: 'blur', validator: validateName }
        ],
        phonenumber: [
          { required: true, trigger: 'blur', validator: validatePhonenumber }
        ]
      },
      updateAdminRules: {
        uname: [
          { required: true, trigger: 'blur', validator: validateName }
        ],
        uphonenumber: [
          { required: true, trigger: 'blur', validator: validatePhonenumber }
        ]
      }
    }
  },
  created () {
    this.getAdminList()
  },
  methods: {
    getAdminList () {
      adminList()
        .then(response => {
          this.adminList = response.data
          this.loading = false
        }).catch(error => {
          console.log(error)
        })
    },
    addAdmin () {
      this.addAdminDialog = true
      this.$nextTick(() => {
        this.$refs.addAdminForm.resetFields()// 重置表单
      })
    },
    search () {
      if (this.searchAdminName !== '') {
        searchAdmin(this.searchAdminName)
          .then(response => {
            if (response.data.length === 0) {
              Message({
                showClose: true,
                message: '未查询到相关审核者',
                type: 'warning'
              })
              this.searchAdminName = ''
            } else {
              this.adminList = response.data
            }
          }).catch(error => {
            console.log(error)
          })
      } else {
        Message({
          showClose: true,
          message: '请先输入您要搜索的报名者名称！',
          type: 'warning'
        })
        this.$refs.searchAdminName.focus()
      }
    },
    resetSearch () {
      this.searchAdminName = ''
      this.getAdminList()
    },
    // 对分页页码的处理
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    updateAdmin (row) {
      this.$nextTick(() => {
        this.$refs.updateAdminForm.resetFields()// 重置表单
      })
      this.updateAdminForm.uid = row.id
      this.updateAdminForm.uname = row.name
      this.updateAdminForm.uphonenumber = row.phonenumber
      this.updateAdminDialog = true
    },
    deleteAdmin (id) {
      MessageBox.confirm('确认要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAdmin(id)
          .then(response => {
            if (response.data.status === 'deleteSuccess') {
              Message({
                showClose: true,
                message: '删除审核员成功！',
                type: 'success'
              })
              this.getAdminList()
            }
          }).catch(error => {
            Message({
              showClose: true,
              message: '系统被外星人袭击了，请再次尝试删除！',
              type: 'warning'
            })
            console.log(error)
          })
      }).catch(() => {
        Message({
          showClose: true,
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submitAddAdminForm () {
      this.$refs.addAdminForm.validate(valid => {
        if (valid) {
          addAdmin(this.addAdminForm)
            .then(response => {
              if (response.data.status === 'addSuccess') {
                Message({
                  showClose: true,
                  message: '添加成功',
                  type: 'success'
                })
                this.getAdminList()
                this.addAdminDialog = false
              } else if (response.data.status === 'alreadyExist') {
                Message({
                  showClose: true,
                  message: '该审核员已存在！请修改审核员名称后重新提交！',
                  type: 'success'
                })
                this.$refs.name.foucs()
              }
            }).catch(error => {
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitUpdateAdminForm () {
      this.$refs.updateAdminForm.validate(valid => {
        if (valid) {
          updateAdmin(this.updateAdminForm)
            .then(response => {
              if (response.data.status === 'updateSuccess') {
                Message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                })
                this.getAdminList()
                this.updateAdminDialog = false
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
  }
}
</script>
<style scoped>
.dialog-title {
  text-align: left;
  font-size: 18px;
}
.auditor {
  width: 960px;
  height: auto;
  margin: 20px 0;
}
.auditor_body {
  width: 960px;
}
</style>
