<template>
  <div class="entryItem">
    <el-card shadow="never">
      <div slot="header" class="entryItem_header">
        <span>自定义报名项管理</span>
        <el-button type="text" @click="addEntryItem" style="float:right;padding-bottom:0px;padding-top:0px;">
          <i class="el-icon-circle-plus-outline"></i> 新增报名项
        </el-button>
      </div>
      <el-input placeholder="搜索报名项名称" ref="searchName" v-model="searchNameValue" style="width:30%;float:left;margin-bottom:10px;">
      </el-input>
      <el-button-group style="float:left;margin-left:10px;">
          <el-button type="primary" @click="searchItemByName">搜索</el-button>
          <el-button type="primary" @click="resetSearch">重置</el-button>
      </el-button-group>
      <el-table
        :data="myEntryItemList.slice((currentPage-1)*itempagesize,currentPage*itempagesize)"
        style="width:100%;"
        border
        stripe
        highlight-current-row
      >
        <el-table-column prop="name" label="名称" width="160"></el-table-column>
        <el-table-column prop="type" label="类型" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type==='input'">输入框</span>
            <span v-else-if="scope.row.type==='radio'">单选框</span>
            <span v-else-if="scope.row.type==='checkbox'">多选框</span>
            <span v-else-if="scope.row.type==='datepicker'">日期选择</span>
            <span v-else-if="scope.row.type==='inputnumber'">数字</span>
            <span v-else-if="scope.row.type==='select'">下拉列表</span>
            <span v-else-if="scope.row.type==='textarea'">文本域</span>
          </template>
        </el-table-column>
        <el-table-column prop="isrequired" label="是否必填" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isrequired==='true'">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="options" label="选项" show-overflow-tooltip width="200" align="center"></el-table-column>
        <el-table-column prop="reminder" label="填写提示" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template>
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        small
        layout="prev, pager, next"
        :total="itemnumber"
        :pageSize="itempagesize"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
      >
      </el-pagination>
    </el-card>
    <!-- 新增报名项的dialog -->
    <el-dialog :visible.sync="addEntryItemDialog" width="50%" top="55px">
      <!-- title -->
      <div slot="title" class="dialog-title"><i class="el-icon-circle-plus-outline"></i>新增报名项</div>
      <!-- form -->
      <el-form :model="addEntryItemForm" :rules="addEntryItemRules" ref="addEntryItemForm" label-width="auto" label-position="right">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addEntryItemForm.name"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="addEntryItemForm.type" ref="type" style="float:left;">
            <el-option
              v-for="item in typelist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否必填" prop="isrequired">
          <el-switch
            v-model="addEntryItemForm.isrequired"
            active-color="#409eff"
            inactive-color="#dcdfe6"
            style="float:left; margin: 10px 0;"
            :width="switchwidth"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="填写提示" prop="reminder">
          <el-input v-model="addEntryItemForm.reminder"></el-input>
        </el-form-item>
        <el-form-item label="报名项配置">
          <el-alert
            v-if="addEntryItemForm.type === 'input'"
            title="输入框支持20字以内的输入（更多字数可选择文本域）"
            type="success"
            :closable="false"
          >
          </el-alert>
          <el-alert
            v-if="addEntryItemForm.type === 'textarea'"
            title="文本域支持140字以内的输入（较少字数可选择输入框）"
            type="success"
            :closable="false"
          >
          </el-alert>
          <el-alert
            v-if="addEntryItemForm.type === 'inputnumber'"
            title="数字输入无多余配置"
            type="info"
            :closable="false"
          >
          </el-alert>
          <el-alert
            v-if="addEntryItemForm.type === 'radio'"
            title="请为单选框配置选项！"
            type="warning"
            :closable="false"
          >
          </el-alert>
          <el-alert
            v-if="addEntryItemForm.type === 'checkbox'"
            title="请为多选框配置选项！"
            type="warning"
            :closable="false"
          >
          </el-alert>
          <el-alert
            v-if="addEntryItemForm.type === 'select'"
            title="请为下拉列表配置选项！"
            type="warning"
            :closable="false"
          >
          </el-alert>
          <el-alert
            v-if="addEntryItemForm.type === 'datepicker'"
            title="日期选择无多余配置"
            type="info"
            :closable="false"
          >
          </el-alert>
        </el-form-item>
        <el-form-item label="选项" prop="options" v-if="addEntryItemForm.type === 'select' || addEntryItemForm.type === 'checkbox' || addEntryItemForm.type === 'radio'">
          <div ></div>
          <el-tag
            :key="option"
            v-for="option in addEntryItemForm.options"
            closable
            :disable-transitions="false"
            @close="deleteOption(option)"
            style="float:left;margin-top: 4px;"
          >
          {{option}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputOptionVisible"
            v-model="inputOptionValue"
            ref="saveOptionInput"
            size="small"
            @keyup.enter.native="handleInputOptionConfirm"
            @blur="handleInputOptionConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showOptionInput">+ 新增选项</el-button>
        </el-form-item>
      </el-form>
      <!-- footer -->
      <div slot="footer">
        <el-button @click="addEntryItemDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitEntryItemForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Select, Option, ButtonGroup, Switch, Alert, Tag, Message, Table, TableColumn, Pagination } from 'element-ui'
import { addEntryItem, myEntryItems, searchItemByName } from '../../../api/activity.js'
import { getName } from '../../../utils/auth.js'
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(Alert)
Vue.use(Table)
Vue.use(Tag)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(ButtonGroup)
export default {
  name: 'entryItem',
  data () {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('报名项名称不能为空'))
      } else if (value.length > 8) {
        callback(new Error('报名项名称不能超过8个字符'))
      } else {
        callback()
      }
    }
    const validateReminder = (rule, value, callback) => {
      if (value.length > 30) {
        callback(new Error('报名项填写提示不能超过30个字符'))
      } else {
        callback()
      }
    }
    const validateOptions = (rule, value, callback) => {
      if (this.$refs.type.value === 'radio' || this.$refs.type.value === 'select' || this.$refs.type.value === 'checkbox') {
        if (this.addEntryItemForm.options.length < 2) {
          callback(new Error('请至少添加两个选项'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      myEntryItemList: [],// 数据列表
      currentPage: 1,// 当前页码
      itemnumber: 0,// 总数据数
      itempagesize: 7,// 每页数据数
      switchwidth: 50,// switch控件的宽度
      addEntryItemDialog: false,// 控制添加报名项Dialog的显示
      inputOptionVisible: false,// 控制报名项Dialog中的选项输入
      inputOptionValue: '',// 新增选项的value
      searchNameValue: '',// 搜索框绑定的值
      typelist: [// 选择类型下拉框中的值
        { value: 'input', label: '输入框' },
        { value: 'textarea', label: '文本域' },
        { value: 'inputnumber', label: '数字' },
        { value: 'radio', label: '单选框' },
        { value: 'checkbox', label: '多选框' },
        { value: 'select', label: '下拉列表' },
        { value: 'datepicker', label: '日期选择' }
      ],
      addEntryItemForm: {// 添加报名项表单
        name: '',
        type: 'input',
        isrequired: false,
        options: [],
        reminder: '',
        creator: ''
      },
      addEntryItemRules: {// 添加报名项的验证规则
        name: [
          { required: true, trigger: 'blur', validator: validateName }
        ],
        reminder: [
          { required: false, trigger: 'blur', validator: validateReminder }
        ],
        options: [
          { validator: validateOptions, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.initList()
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    // 从后台拉取数据
    initList () {
      myEntryItems(getName())
        .then(response => {
          this.myEntryItemList = response.data
          this.itemnumber = this.myEntryItemList.length
          console.log('获取报名项列表成功')
        }).catch(error => {
          console.log(error)
          console.log('获取报名项列表失败')
        })
    },
    // 控制分页
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage
    },
    // 调出新增报名项的Dialog
    addEntryItem () {
      this.addEntryItemDialog = true
      this.$nextTick(() => {
        this.$refs.addEntryItemForm.resetFields()// 重置表单
      })
      this.addEntryItemForm.creator = this.name
    },
    // 控制单选框 多选框 下拉列表的选项的删除
    deleteOption (option) {
      this.addEntryItemForm.options.splice(this.addEntryItemForm.options.indexOf(option), 1)
    },
    // 控制选项输入框的显示
    showOptionInput () {
      this.inputOptionVisible = true
      this.$nextTick(() => {
        this.$refs.saveOptionInput.$refs.input.focus()
      })
    },
    // 控制单选框 多选框 下拉列表的选项的新增
    handleInputOptionConfirm () {
      let inputOptionValue = this.inputOptionValue
      if (inputOptionValue) {
        for (let index = 0; index < this.addEntryItemForm.options.length; index++) {
          if (inputOptionValue === this.addEntryItemForm.options[index]) {
            Message({
              showClose: true,
              message: '请勿重复添加！',
              type: 'warning'
            })
            this.inputOptionValue = ''
            return false
          }
        }
        this.addEntryItemForm.options.push(inputOptionValue)
      }
      this.inputOptionVisible = false
      this.inputOptionValue = ''
    },
    // 提交添加新报名项的表单
    submitEntryItemForm () {
      this.$refs.addEntryItemForm.validate(valid => {
        if (valid) {
          addEntryItem(this.addEntryItemForm)
            .then(response => {
              if (response.data.status === 'addSuccess') {
                Message({
                  showClose: true,
                  message: '新增报名项成功！',
                  type: 'success'
                })
                this.addEntryItemDialog = false
                this.initList()
              } else if (response.data.status === 'alreadyExist') {
                Message({
                  showClose: true,
                  message: '您已经添加过这个报名项了哦！请勿重复添加',
                  type: 'warning'
                })
                this.addEntryItemDialog = false
              }
              this.addEntryItemDialog = false
            }).catch(error => {
              Message({
                showClose: true,
                message: '系统被外星人袭击了，请再次尝试添加！',
                type: 'warning'
              })
              console.log(error)
              return false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 根据名称从后台搜索
    searchItemByName () {
      console.log(this.searchNameValue)
      console.log(this.name)
      if (this.searchNameValue !== '') {
        searchItemByName(this.searchNameValue, this.name)
          .then(response => {
            if (response.data.length === 0) {
              Message({
                showClose: true,
                message: '未查询到相关报名项！快去新增报名项添加吧！',
                type: 'warning'
              })
              this.searchNameValue = ''
            } else {
              this.myEntryItemList = response.data
              this.itemnumber = this.myEntryItemList.length
            }
          }).catch(error => {
            console.log(error)
          });
      } else {
        Message({
          showClose: true,
          message: '请先输入您要搜索的报名项名称！',
          type: 'warning'
        })
        this.$refs.searchName.focus()
      }
    },
    // 重置搜索
    resetSearch () {
      this.searchNameValue = ''
      this.initList()
    }
  }
}
</script>

<style scoped>
.entryItem {
  margin: 20px auto;
  width: 95%;
}
.entryItem_header {
  font-size: 14px;
  text-align: left;
}
.dialog-title {
  text-align: left;
  font-size: 18px;
}
</style>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  float:left;
  margin-top: 4px;
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  float:left;
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
