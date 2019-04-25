<template>
  <div class="myActivity">
    <el-card shadow="never">
      <div slot="header" class="myActivity_header">
        <span>我的活动管理</span>
        <el-button type="text" @click="addActivity" style="float:right;padding-bottom:0px;padding-top:0px;">
          <i class="el-icon-circle-plus-outline"></i> 发起活动
        </el-button>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="待审核活动" name="first">
          待审核活动
        </el-tab-pane>
        <el-tab-pane label="未完成活动" name="second">
          未完成活动
        </el-tab-pane>
        <el-tab-pane label="已完成活动" name="third">
          已完成活动
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 新增活动的Dialog -->
    <el-dialog :visible.sync="addActivityDialog" width="50%" top="55px">
      <!-- title -->
      <div slot="title" class="dialog-title"><i class="el-icon-circle-plus-outline"></i>发起活动</div>
      <!-- form -->
      <el-form :model="addActivityForm" :rules="addActivityRules" ref="addActivityForm" label-width="auto" label-position="right">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="addActivityForm.name" ref="name"></el-input>
        </el-form-item>
        <el-form-item label="所属组织" prop="organization">
          <el-input v-model="addActivityForm.organization"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" prop="time">
          <el-date-picker
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="float:left;"
            v-model="addActivityForm.time"
            :picker-options="datetimePickerOption"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报名截止日期" prop="deadline">
          <el-date-picker
            v-model="addActivityForm.deadline"
            type="datetime"
            placeholder="选择日期时间"
            style="float:left;"
            :picker-options="datetimePickerOption"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动地点" prop="site">
          <el-input v-model="addActivityForm.site"></el-input>
        </el-form-item>
        <el-form-item label="活动详情" prop="detail">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" v-model="addActivityForm.detail"></el-input>
        </el-form-item>
        <el-form-item label="报名填写项">
          <el-popover v-model="systemEntryItemPopover" placement="right" trigger="click" style="float:left;margin-right:10px;">
            <el-table :data="systemEntryItems" stripe @row-click="selectSystemEntryItem">
              <el-table-column prop="name" label="报名项名称" align="center" width="160"></el-table-column>
            </el-table>
            <el-button slot="reference">添加系统报名项</el-button>
          </el-popover>
          <el-popover v-model="myEntryItemPopover" placement="right" trigger="click" style="float:left;">
            <el-table :data="myEntryItems" stripe @row-click="selectMyEntryItem">
              <el-table-column prop="name" label="报名项名称" align="center" width="160"></el-table-column>
            </el-table>
            <el-button slot="reference">添加我的报名项</el-button>
          </el-popover>
        </el-form-item>
        <el-form-item label="调整报名项顺序" prop="entryform">
          <div style="display: flex;float:left;" v-if="addActivityForm.entryform.length !== 0">
            <SlickList :lockToContainerEdges="true" lockAxis="y" v-model="addActivityForm.entryform" class="list">
              <div v-for="(item, index) in addActivityForm.entryform" :key="index">
                <SlickItem  class="list-item" :index="index" style="float:left;">
                  {{ item.name }}<span v-if="item.creator==='system'">(系统报名项)</span>
                  <span style="margin-left:30px;" v-if="item.type==='input'">输入框</span>
                  <span style="margin-left:30px;" v-if="item.type==='textarea'">文本域</span>
                  <span style="margin-left:30px;" v-if="item.type==='inputnumber'">数字</span>
                  <span style="margin-left:30px;" v-if="item.type==='radio'">单选框</span>
                  <span style="margin-left:30px;" v-if="item.type==='checkbox'">多选框</span>
                  <span style="margin-left:30px;" v-if="item.type==='select'">下拉列表</span>
                  <span style="margin-left:30px;" v-if="item.type==='datepicker'">日期选择</span>
                </SlickItem>
                <el-button style="float:left;margin:24px 10px;" @click="deleteEntryItem(index)" icon="el-icon-delete" size="small" circle></el-button>
              </div>
            </SlickList>
          </div>
          <el-alert
            v-else
            title="暂未添加报名项"
            type="info"
            :closable="false"
          >
          </el-alert>
        </el-form-item>
      </el-form>
      <!-- footer -->
      <div slot="footer">
        <el-button @click="addActivityDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitAddActivityForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 更新活动的Dialog -->
    <el-dialog :visible.sync="updateActivityDialog" width="50%" top="55px">
      <!-- title -->
      <div slot="title" class="dialog-title"><i class="el-icon-edit"></i>修改活动</div>
      <!-- form -->
      <!-- footer -->
      <div slot="footer">
        <el-button @click="updateActivityDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdateActivityForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { SlickList, SlickItem } from 'vue-slicksort'
import { mapGetters } from 'vuex'
import { getName } from '../../../utils/auth.js'
import { myEntryItems, systemEntryItems, addActivity } from '../../../api/activity.js'
import { Tabs, TabPane, Popover, Select, DatePicker, TimePicker, Option, ButtonGroup, MessageBox, Switch, Alert, Message, Table, TableColumn, Pagination } from 'element-ui'
Vue.use(Select)
Vue.use(Popover)
Vue.use(Option)
Vue.use(Switch)
Vue.use(Alert)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(ButtonGroup)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(DatePicker)
Vue.use(TimePicker)
export default {
  name: 'myActivity',
  data () {
    // 对发起活动表单中活动名称的异步校验
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('活动名称不能为空'))
      } else if (value.length > 20) {
        callback(new Error('活动名称不能超过20个字符'))
      } else {
        callback()
      }
    }
    // 对发起活动表单中所属组织的异步校验
    const validateOrg = (rule, value, callback) => {
      if (!value) {
        callback(new Error('所属组织不能为空，若无请填写个人'))
      } else {
        callback()
      }
    }
    // 对发起活动表单中活动时间的异步校验
    const validateTime = (rule, value, callback) => {
      if (this.addActivityForm.time.length === 0) {
        callback(new Error('必须选择活动时间'))
      } else {
        callback()
      }
    }
    // 对发起活动表单中报名截止日期的异步校验
    const validateDeadline = (rule, value, callback) => {
      var starttime = new Date(Date.parse(this.addActivityForm.time[0]))
      var deadtime = new Date(Date.parse(value))
      if (!value) {
        callback(new Error('必须选择报名截止日期'))
      } else if (deadtime >= starttime) {
        callback(new Error('截止日期必须在活动开始时间之前'))
      } else {
        callback()
      }
    }
    // 对发起活动表单中活动地点的异步校验
    const validateSite = (rule, value, callback) => {
      if (!value) {
        callback(new Error('活动地点不能为空'))
      } else {
        callback()
      }
    }
    // 对发起活动表单中活动详情的异步校验
    const validateDetail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('活动详情不能为空'))
      } else {
        callback()
      }
    }
    // 对发起活动表单中报名项的异步校验
    const validateEntryform = (rule, value, callback) => {
      if (this.addActivityForm.entryform.length === 0) {
        callback(new Error('必须添加报名项'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'first', // 当前激活的Tab页
      unauditActivities: [], // 待审核的活动list
      unfinishedActivities: [], // 未完成活动
      finishedActivities: [], // 已完成活动list
      addActivityDialog: false, // 控制添加活动Dialog的显示
      updateActivityDialog: false, // 控制更新活动Dialog的显示
      addActivityForm: {// 添加活动的表单
        name: '',
        organizer: '',
        organization: '',
        time: [],
        deadline: '',
        site: '',
        detail: '',
        entryform: []
      },
      addActivityRules: {// 添加活动的验证规则
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        organization: [{ required: true, trigger: 'blur', validator: validateOrg }],
        time: [{ required: true, trigger: 'blur', validator: validateTime }],
        deadline: [{ required: true, trigger: 'blur', validator: validateDeadline }],
        site: [{ required: true, trigger: 'blur', validator: validateSite }],
        detail: [{ required: true, trigger: 'blur', validator: validateDetail }],
        entryform: [{ required: true, trigger: 'blur', validator: validateEntryform }]
      },
      updateActivityForm: {// 更新活动的表单
        uid: 0,
        uname: '',
        uorganizer: '',
        uorganization: '',
        utime: [],
        udeadline: '',
        usite: '',
        udetail: '',
        uentryform: ''
      },
      systemEntryItems: [], // 系统报名项
      myEntryItems: [], // 我的报名项
      systemEntryItemPopover: false, // 控制系统报名项Popover的显示
      myEntryItemPopover: false, // 控制我的报名项Popover的显示
      datetimePickerOption: { // 控制日期时间选择器中的时间禁用
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  components: {
    SlickItem,
    SlickList
  },
  methods: {
    initActivity () {

    },
    getUnauditActivities () {

    },
    getUnfinishedActivities () {

    },
    getFinishedActivities () {

    },
    // 从后台获取报名项
    getEntryItems () {
      myEntryItems(getName())
        .then(response => {
          this.myEntryItems = response.data
          console.log('获取我的自定义报名项列表成功')
        }).catch(error => {
          console.log(error)
          console.log('获取我的自定义报名项列表失败')
        })
      systemEntryItems()
        .then(response => {
          this.systemEntryItems = response.data
          console.log('获取系统报名项列表成功')
        }).catch(error => {
          console.log(error)
          console.log('获取系统报名项列表失败')
        })
    },
    // 选择添加系统报名项
    selectSystemEntryItem (row) {
      if (this.addActivityForm.entryform.indexOf(row) === -1) {
        this.systemEntryItemPopover = false
        this.addActivityForm.entryform.push(row)
      } else {
        Message({
          showClose: true,
          message: '此报名项已经添加过了',
          type: 'warning'
        })
      }
    },
    // 选择添加我的报名项
    selectMyEntryItem (row) {
      if (this.addActivityForm.entryform.indexOf(row) === -1) {
        this.myEntryItemPopover = false
        this.addActivityForm.entryform.push(row)
      } else {
        Message({
          showClose: true,
          message: '此报名项已经添加过了',
          type: 'warning'
        })
      }
    },
    // 删除已选中的报名项
    deleteEntryItem (index) {
      this.addActivityForm.entryform.splice(index, 1)
    },
    // 调出添加活动Dialog
    addActivity () {
      this.addActivityDialog = true
      this.$nextTick(() => {
        this.$refs.addActivityForm.resetFields()// 重置表单
      })
      this.getEntryItems()
      this.addActivityForm.organizer = this.name
    },
    // 提交添加表单
    submitAddActivityForm () {
      this.$refs.addActivityForm.validate(valid => {
        if (valid) {
          addActivity(this.addActivityForm)
            .then(response => {
              if (response.data.status === 'addSuccess') {
                Message({
                  showClose: true,
                  message: '发起活动成功！',
                  type: 'success'
                })
                this.addActivityDialog = false
              } else if (response.data.status === 'alreadyExist') {
                Message({
                  showClose: true,
                  message: '您已经发起过该活动了！请确认活动名称是否正确！',
                  type: 'warning'
                })
                this.$refs.name.focus()
              }
            }).catch(error => {
              Message({
                showClose: true,
                message: '系统被外星人袭击了，请再次尝试添加！',
                type: 'warning'
              })
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 调出更新活动Dialog
    updateActivity () {
      this.addActivityDialog = true
    },
    // 提交更新表单
    submitUpdateActivityForm () {
      this.updateActivityDialog = false
    }
  }
}
</script>
<style scoped>
.myActivity {
  margin: 20px auto;
  width: 95%;
}
.myActivity_header {
  font-size: 14px;
  text-align: left;
}
.dialog-title {
  text-align: left;
  font-size: 18px;
}
.list {
  margin: 0 auto;
  padding: 0;
  background-color: #f3f3f3;
  border: 1px solid #efefef;
  border-radius: 3;
  width: 412px;
}
.list-item {
  display: flex;
  align-items: center;
  width: 360px;
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #efefef;
  box-sizing: border-box;
  user-select: none;
  color: #333;
  font-weight: 400;
  z-index: 9999;
}
</style>
