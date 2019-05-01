<template>
  <div class="activityAudit">
    <el-card shadow="never" class="auditbody">
      <div slot="header" style="font-size: 14px;text-align: left;">
        <span>活动审核</span>
      </div>
      <el-input placeholder="搜索活动名称" v-model="searchNameValue" ref="searchNameValue" style="width:30%;float:left;margin-bottom:10px;"></el-input>
      <el-input placeholder="搜索组织者" v-model="searchOrganizerValue" ref="searchOrganizerValue" style="width:30%;float:left;margin-bottom:10px;margin-left:10px;"></el-input>
      <el-button-group style="float:left;margin-left:10px;">
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="resetSearch">重置</el-button>
      </el-button-group>
      <el-table
        :data="unauditActivities.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        stripe
        highlight-current-row
        v-loading="loading"
        style="width:100%;"
        :default-sort = "{prop: 'submittime', order: 'descending'}"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left">
              <el-form-item>
                <span slot="label"><i class="el-icon-office-building"></i>活动组织机构:</span>
                <span style="color:gray;">{{ props.row.organization }}</span>
              </el-form-item>
              <el-form-item>
                <span slot="label"><i class="el-icon-location-outline"></i>活动地点:</span>
                <span style="color:gray;">{{ props.row.site }}</span>
              </el-form-item>
              <el-form-item>
                <span slot="label"><i class="el-icon-time"></i>活动开始时间:</span>
                <span style="color:gray;">{{ props.row.starttime }}</span>
              </el-form-item>
              <el-form-item>
                <span slot="label"><i class="el-icon-time"></i>活动结束时间:</span>
                <span style="color:gray;">{{ props.row.endtime }}</span>
              </el-form-item>
              <el-form-item>
                <span slot="label"><i class="el-icon-time"></i>活动报名截止时间:</span>
                <span style="color:gray;">{{ props.row.deadline }}</span>
              </el-form-item>
              <el-form-item>
                <span slot="label"><i class="el-icon-collection-tag"></i>活动详情:</span>
                <span style="color:gray;">{{ props.row.detail }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="活动名称" width="310" show-overflow-tooltip></el-table-column>
        <el-table-column prop="organizer" label="组织者" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="submittime" sortable label="提交时间" width="170" align="center"></el-table-column>
        <el-table-column label="报名表单" align="center" width="100">
          <template slot-scope="scope">
            <el-button size="mini" @click="previewEntryform(scope.row.entryform)">预览表单</el-button>
          </template>
        </el-table-column>
        <el-table-column label="是否通过" align="center" width="120">
          <template slot-scope="scope">
            <el-button size="mini" @click="passActivity(scope.row.id)">是</el-button>
            <el-button size="mini" type="danger" @click="unpassActivity(scope.row.id)">否</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        small
        layout="prev, pager, next"
        :total="unauditActivities.length"
        :pageSize="pageSize"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
      >
      </el-pagination>
    </el-card>
    <!-- 预览报名表单的Dialog -->
    <el-dialog :visible.sync="previewEntryformDialog" width="50%" top="55px">
      <!-- title -->
      <div slot="title" class="dialog-title"><i class="el-icon-tickets"></i>表单预览</div>
      <!-- form -->
      <el-form label-width="auto" label-position="right">
        <el-form-item v-for="item in previewEntryItems" :key="item.id" :label="item.name">
          <el-input disabled v-if="item.type === 'input'"></el-input>
          <el-input disabled v-else-if="item.type === 'textarea'" type="textarea"></el-input>
          <el-input disabled v-else-if="item.type === 'inputnumber'" type="number"></el-input>
          <el-radio-group disabled v-else-if="item.type === 'radio'" :value="item.options.split(',')[0]" style="float:left;margin-top:13px;">
            <el-radio v-for="option in item.options.split(',')" :key="option" :label="option">{{option}}</el-radio>
          </el-radio-group>
          <el-checkbox-group disabled v-else-if="item.type === 'checkbox'" :value="[]" style="float:left;height:40px;">
            <el-checkbox v-for="option in item.options.split(',')" :key="option" :label="option">{{option}}</el-checkbox>
          </el-checkbox-group>
          <el-date-picker style="float:left;" disabled v-else-if="item.type === 'datepicker'" :placeholder="'选择'+item.name"></el-date-picker>
          <el-select :value="''" style="float:left;" v-else-if="item.type === 'select'" placeholder="请选择">
            <el-option disabled v-for="option in item.options.split(',')" :key="option" :label="option" :value="option"></el-option>
          </el-select>
          <br v-if="item.reminder!=='' && item.reminder!==null">
          <span v-if="item.reminder!=='' && item.reminder!==null" style="font-size:12px;color:gray;float:left;">填写提示：{{item.reminder}}</span>
        </el-form-item>
      </el-form>
      <!-- footer -->
      <div slot="footer">
        <el-button type="primary" @click="previewEntryformDialog = false">关闭预览</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { getAllUnauditActivities, getEntryItemsOfActivity, searchUnauditActivities, passActivity, unpassActivity } from '@/api/activity.js'
import { Radio, RadioGroup, Checkbox, CheckboxGroup, DatePicker, MessageBox, Message, TimePicker, Select, Option, ButtonGroup, Table, TableColumn, Loading, Pagination } from 'element-ui'
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading.directive)
Vue.use(Pagination)
export default {
  name: 'activityAudit',
  data () {
    return {
      searchNameValue: '',
      searchOrganizerValue: '',
      unauditActivities: [],
      previewEntryItems: [],
      loading: true,
      pageSize: 6,
      currentPage: 1,
      previewEntryformDialog: false
    }
  },
  created () {
    this.getUnauditActivities()
  },
  methods: {
    // 获取未审核活动的list
    getUnauditActivities () {
      setTimeout(() => {
        getAllUnauditActivities()
          .then(response => {
            this.unauditActivities = response.data
            this.loading = false
            console.log('获取未审核活动成功')
          }).catch(error => {
            console.log(error)
            console.log('获取未审核活动失败')
          })
      }, 600)
    },
    // 预览报名表单
    previewEntryform (entryform) {
      const loading = this.$loading({
        lock: true,
        text: '生成预览表单中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        getEntryItemsOfActivity(entryform)
          .then(response => {
            this.previewEntryItems = response.data
            loading.close()
            this.previewEntryformDialog = true
          }).catch(error => {
            console.log(error)
          })
      }, 600)
    },
    // 搜索活动
    search () {
      if (this.searchNameValue !== '') {
        searchUnauditActivities(this.searchNameValue, this.searchOrganizerValue)
          .then(response => {
            if (response.data.length === 0) {
              Message({
                showClose: true,
                message: '未查询到相关活动！快去发起活动吧！',
                type: 'warning'
              })
              this.searchNameValue = ''
              this.searchOrganizerValue = ''
            } else {
              this.unauditActivities = response.data
            }
          }).catch(error => {
            console.log(error)
          })
      } else {
        Message({
          showClose: true,
          message: '请先输入您要搜索的活动名称！',
          type: 'warning'
        })
        this.$refs.searchNameValue.focus()
      }
    },
    // 搜索重置
    resetSearch () {
      this.searchNameValue = ''
      this.searchOrganizerValue = ''
      this.loading = true
      this.getUnauditActivities()
    },
    // 对分页页码的处理
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    // 通过审核的处理
    passActivity (id) {
      MessageBox.confirm('确认要通过该活动的审核吗?', '审核提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        passActivity(id)
          .then(response => {
            if (response.data.status === 'passSuccess') {
              Message({
                showClose: true,
                type: 'success',
                message: '操作成功'
              })
              this.loading = true
              this.getUnauditActivities()
            }
          }).catch(error => {
            console.log(error)
          })
      }).catch(() => {
        Message({
          showClose: true,
          type: 'info',
          message: '已取消通过'
        })
      })
    },
    // 未通过审核的处理
    unpassActivity (id) {
      function inputValidate (value) {
        if (!value) {
          return '必须输入未通过理由！'
        } else if (value.length > 20) {
          return '审核未通过理由不能超过四十个字符！'
        } else {
          return true
        }
      }
      MessageBox.prompt('请输入审核未通过理由', '审核提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator: inputValidate,
        inputType: 'textarea'
      }).then(({ value }) => {
        unpassActivity(id, value)
          .then(response => {
            if (response.data.status === 'unpassSuccess') {
              Message({
                showClose: true,
                type: 'success',
                message: '操作成功'
              })
              this.loading = true
              this.getUnauditActivities()
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
.dialog-title {
  text-align: left;
  font-size: 18px;
}
.activityAudit {
  width: 960px;
  height: auto;
  margin: 20px 0;
}
.auditbody {
  width: 960px;
}
</style>
