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
        <el-tab-pane label="审核中活动" name="first">
          <el-input placeholder="搜索活动名称" v-model="searchNameValue1" ref="searchNameValue1" style="width:30%;float:left;margin-bottom:10px;">
          </el-input>
          <el-button-group style="float:left;margin-left:10px;">
              <el-button type="primary" @click="search1">搜索</el-button>
              <el-button type="primary" @click="resetSearch1">重置</el-button>
          </el-button-group>
          <el-table
            :data="unauditActivities.slice((currentpage1-1)*pagesize1,currentpage1*pagesize1)"
            style="width:100%;"
            stripe
            v-loading="loading1"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left">
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
            <el-table-column prop="name" label="活动名称" width="310"></el-table-column>
            <el-table-column prop="organization" label="所属组织"></el-table-column>
            <el-table-column label="审核状态" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.isapproved==='tobeaudit'">审核中</span>
                <el-tooltip v-else effect="dark" placement="top">
                  <div slot="content">未通过原因：<br/>{{scope.row.isapproved}}</div>
                  <span>审核未通过</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="报名表单" align="center" width="80">
              <template slot-scope="scope">
                <el-button size="mini" @click="previewEntryform(scope.row.entryform)">预览</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="245">
              <template slot-scope="scope">
                <el-button v-if="scope.row.isapproved!=='tobeaudit'" size="mini" @click="reauditActivity(scope.row.id)">重新审核</el-button>
                <el-button size="mini" @click="updateActivity(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteActivity(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            small
            layout="prev, pager, next"
            :total="unauditActivities.length"
            :pageSize="pagesize1"
            @current-change="handleCurrentChange1"
            :current-page="currentpage1"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="未归档活动" name="second">
          <el-input placeholder="搜索活动名称" v-model="searchNameValue2" ref="searchNameValue2" style="width:30%;float:left;margin-bottom:10px;">
          </el-input>
          <el-button-group style="float:left;margin-left:10px;">
              <el-button type="primary" @click="search2">搜索</el-button>
              <el-button type="primary" @click="resetSearch2">重置</el-button>
          </el-button-group>
          <el-table
            :data="unfinishedActivities.slice((currentpage2-1)*pagesize2,currentpage2*pagesize2)"
            style="width:100%;"
            stripe
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left">
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
            <el-table-column prop="name" label="活动名称" width="310"></el-table-column>
            <el-table-column prop="organization" label="所属组织"></el-table-column>
            <el-table-column label="活动状态" align="center" width="160">
              <template slot-scope="scope">
                <span>{{ getActivityStatus(scope.row) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="报名签到" width="80">
              <template slot-scope="scope">
                <el-button size="mini" @click="viewSignuplist(scope.row)">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column label="报名表单" align="center" width="80">
              <template slot-scope="scope">
                <el-button size="mini" @click="previewEntryform(scope.row.entryform)">预览</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <el-button size="mini" @click="archiveActivity(scope.row)">归档</el-button>
                <el-button size="mini" type="danger" @click="deleteActivity(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            small
            layout="prev, pager, next"
            :total="unfinishedActivities.length"
            :pageSize="pagesize2"
            @current-change="handleCurrentChange2"
            :current-page="currentpage2"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="已归档活动" name="third">
          <el-input placeholder="搜索活动名称" v-model="searchNameValue3" ref="searchNameValue3" style="width:30%;float:left;margin-bottom:10px;">
          </el-input>
          <el-button-group style="float:left;margin-left:10px;">
              <el-button type="primary" @click="search3">搜索</el-button>
              <el-button type="primary" @click="resetSearch3">重置</el-button>
          </el-button-group>
          <el-table
            :data="finishedActivities.slice((currentpage3-1)*pagesize3,currentpage3*pagesize3)"
            style="width:100%;"
            stripe
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left">
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
            <el-table-column prop="name" label="活动名称" width="310"></el-table-column>
            <el-table-column prop="organization" label="所属组织"></el-table-column>
            <el-table-column label="报名签到" width="80">
              <template slot-scope="scope">
                <el-button size="mini" @click="viewSignuplist(scope.row)">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column label="报名表单" align="center" width="80">
              <template slot-scope="scope">
                <el-button size="mini" @click="previewEntryform(scope.row.entryform)">预览</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="80">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="deleteActivity(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            small
            layout="prev, pager, next"
            :total="finishedActivities.length"
            :pageSize="pagesize3"
            @current-change="handleCurrentChange3"
            :current-page="currentpage3"
          >
          </el-pagination>
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
        <el-form-item label="是否需要审核">
          <el-switch
            v-model="addActivityForm.isneedaudit"
            active-color="#409eff"
            inactive-color="#dcdfe6"
            style="float:left; margin-top:12px;"
            :width="selectWidth"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="报名填写项">
          <el-popover v-model="systemEntryItemPopover" placement="right" trigger="click" style="float:left;margin-right:10px;">
            <el-table height="380" :data="systemEntryItems" stripe @row-click="selectSystemEntryItem">
              <el-table-column prop="name" label="报名项名称" align="center" width="160"></el-table-column>
            </el-table>
            <el-button slot="reference">添加系统报名项</el-button>
          </el-popover>
          <el-popover v-model="myEntryItemPopover" placement="right" trigger="click" style="float:left;">
            <el-table height="380" :data="myEntryItems" stripe @row-click="selectMyEntryItem">
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
      <el-form :model="updateActivityForm" :rules="updateActivityRules" ref="updateActivityForm" label-width="auto" label-position="right">
        <el-form-item label="活动名称" prop="uname">
          <el-input v-model="updateActivityForm.uname" ref="uname"></el-input>
        </el-form-item>
        <el-form-item label="所属组织" prop="uorganization">
          <el-input v-model="updateActivityForm.uorganization"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" prop="utime">
          <el-date-picker
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="float:left;"
            v-model="updateActivityForm.utime"
            :picker-options="datetimePickerOption"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报名截止日期" prop="udeadline">
          <el-date-picker
            v-model="updateActivityForm.udeadline"
            type="datetime"
            placeholder="选择日期时间"
            style="float:left;"
            :picker-options="datetimePickerOption"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动地点" prop="usite">
          <el-input v-model="updateActivityForm.usite"></el-input>
        </el-form-item>
        <el-form-item label="活动详情" prop="udetail">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" v-model="updateActivityForm.udetail"></el-input>
        </el-form-item>
        <el-form-item label="是否需要审核">
          <el-switch
            v-model="updateActivityForm.uisneedaudit"
            active-color="#409eff"
            inactive-color="#dcdfe6"
            style="float:left; margin-top:12px;"
            :width="selectWidth"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="报名填写项">
          <el-popover v-model="usystemEntryItemPopover" placement="right" trigger="click" style="float:left;margin-right:10px;">
            <el-table height="380" :data="systemEntryItems" stripe @row-click="uselectSystemEntryItem">
              <el-table-column prop="name" label="报名项名称" align="center" width="160"></el-table-column>
            </el-table>
            <el-button slot="reference">添加系统报名项</el-button>
          </el-popover>
          <el-popover v-model="umyEntryItemPopover" placement="right" trigger="click" style="float:left;">
            <el-table height="380" :data="myEntryItems" stripe @row-click="uselectMyEntryItem">
              <el-table-column prop="name" label="报名项名称" align="center" width="160"></el-table-column>
            </el-table>
            <el-button slot="reference">添加我的报名项</el-button>
          </el-popover>
        </el-form-item>
        <el-form-item label="调整报名项顺序" prop="uentryform">
          <div style="display: flex;float:left;" v-if="updateActivityForm.uentryform.length !== 0">
            <SlickList :lockToContainerEdges="true" lockAxis="y" v-model="updateActivityForm.uentryform" class="list">
              <div v-for="(item, index) in updateActivityForm.uentryform" :key="index">
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
                <el-button style="float:left;margin:24px 10px;" @click="udeleteEntryItem(index)" icon="el-icon-delete" size="small" circle></el-button>
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
        <el-button @click="updateActivityDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdateActivityForm">确 定</el-button>
      </div>
    </el-dialog>
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
    <el-dialog :visible.sync="signupListDialog" width="60%" top="55px">
      <div slot="title" class="dialog-title"><i class="el-icon-tickets"></i>报名签到</div>
      <el-input ref="searchParticipantValue" v-model="searchParticipantValue" placeholder="请输入报名者名称" style="width:600px;float:left;"></el-input>
      <el-button-group style="float:left;margin-left:10px;">
        <el-button type="primary" @click="searchSignupInDialog">搜索</el-button>
        <el-button type="primary" @click="resetSearchSignupInDialog">重置</el-button>
      </el-button-group>
      <el-table
        :data="signupofActivity"
        stripe
        empty-text="暂无报名信息"
      >
        <el-table-column prop="participant" label="报名者" align="center"></el-table-column>
        <el-table-column label="报名表单" align="center">
          <template slot-scope="scope">
            <el-popover
              placement="right"
              width="400"
              trigger="click">
              <el-form label-width="auto" label-position="right">
                <el-form-item
                  v-for="(name,index) in scope.row.name.split(',')"
                  :key="index"
                  :label="name+':'"
                >
                  <span v-if="scope.row.value.split(',')[index]!==''" style="float:left;">{{ scope.row.value.split(',')[index] }}</span>
                  <span v-else style="float:left;">报名者未填写</span>
                </el-form-item>
              </el-form>
              <el-button slot="reference" size="mini">查看</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="签到状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.signinstatus === 'yes'">已签到</span>
            <span v-else>未签到</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer">
        <el-button type="primary" @click="signupListDialog = false">关闭查看</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { SlickList, SlickItem } from 'vue-slicksort'
import { mapGetters } from 'vuex'
import { archiveActivity } from '@/api/activity.js'
import { getsignupAuditofActivity, searchSignupofActivity } from '@/api/signupaudit.js'
import { getName } from '../../../utils/auth.js'
import { myEntryItems, systemEntryItems, addActivity, searchUnauditActivities, searchUnfinishedActivities, searchFinishedActivities, updateActivity, deleteActivity, getUnauditActivities, getUnfinishedActivities, getFinishedActivities, getEntryItemsOfActivity, reauditActivity } from '../../../api/activity.js'
import { Tabs, TabPane, Radio, Checkbox, CheckboxGroup, Tooltip, RadioGroup, Popover, Select, DatePicker, TimePicker, Option, Loading, ButtonGroup, MessageBox, Switch, Alert, Message, Table, TableColumn, Pagination } from 'element-ui'
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Popover)
Vue.use(Tooltip)
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
Vue.use(Loading.directive)
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
      } else if (value.length > 20) {
        callback(new Error('所属组织不能超过20个字符'))
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
    // 对更新活动表单中活动时间的异步校验
    const validateUpdateTime = (rule, value, callback) => {
      if (this.updateActivityForm.utime.length === 0) {
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
    // 对更新活动表单中报名截止日期的异步校验
    const validateUpdateDeadline = (rule, value, callback) => {
      var starttime = new Date(Date.parse(this.updateActivityForm.utime[0]))
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
      } else if (value.length > 200) {
        callback(new Error('活动详情不能超过200个字符'))
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
    // 对更新活动表单中报名项的异步校验
    const validateUpdateEntryform = (rule, value, callback) => {
      if (this.updateActivityForm.uentryform.length === 0) {
        callback(new Error('必须添加报名项'))
      } else {
        callback()
      }
    }
    return {
      selectWidth: 50,
      activeName: 'first', // 当前激活的Tab页
      unauditActivities: [], // 待审核的活动list
      pagesize1: 10,
      currentpage1: 1,
      searchNameValue1: '',
      loading1: true,
      unfinishedActivities: [], // 未完成活动list
      pagesize2: 10,
      currentpage2: 1,
      searchNameValue2: '',
      finishedActivities: [], // 已完成活动list
      pagesize3: 10,
      currentpage3: 1,
      searchNameValue3: '',
      addActivityDialog: false, // 控制添加活动Dialog的显示
      updateActivityDialog: false, // 控制更新活动Dialog的显示
      previewEntryformDialog: false,
      signupListDialog: false,
      addActivityForm: {// 添加活动的表单
        name: '',
        organizer: '',
        organization: '',
        time: [],
        deadline: '',
        site: '',
        detail: '',
        entryform: [],
        isneedaudit: false
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
        utime: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        udeadline: '',
        usite: '',
        udetail: '',
        uentryform: [],
        uisneedaudit: false
      },
      updateActivityRules: {// 更新活动的验证规则
        uname: [{ required: true, trigger: 'blur', validator: validateName }],
        uorganization: [{ required: true, trigger: 'blur', validator: validateOrg }],
        utime: [{ required: true, trigger: 'blur', validator: validateUpdateTime }],
        udeadline: [{ required: true, trigger: 'blur', validator: validateUpdateDeadline }],
        usite: [{ required: true, trigger: 'blur', validator: validateSite }],
        udetail: [{ required: true, trigger: 'blur', validator: validateDetail }],
        uentryform: [{ required: true, trigger: 'blur', validator: validateUpdateEntryform }]
      },
      systemEntryItems: [], // 系统报名项
      myEntryItems: [], // 我的报名项
      previewEntryItems: [],
      systemEntryItemPopover: false, // 控制系统报名项Popover的显示
      myEntryItemPopover: false, // 控制我的报名项Popover的显示
      usystemEntryItemPopover: false, // 控制系统报名项Popover的显示
      umyEntryItemPopover: false, // 控制我的报名项Popover的显示
      datetimePickerOption: { // 控制日期时间选择器中的时间禁用
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      signupofActivity: [],
      searchParticipantValue: '',
      searchActivityValue: ''
    }
  },
  created () {
    this.initActivity()
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
    // 初始化表格中的数据
    initActivity () {
      setTimeout(() => {
        this.getUnauditActivities()
        this.getUnfinishedActivities()
        this.getFinishedActivities()
      }, 600)
    },
    // 获取审核中活动的list
    getUnauditActivities () {
      getUnauditActivities(getName())
        .then(response => {
          this.unauditActivities = response.data
          console.log('获取审核中活动成功')
          this.loading1 = false
        }).catch(error => {
          console.log(error)
          console.log('获取审核中活动失败')
        })
    },
    // 获取未完成活动的list
    getUnfinishedActivities () {
      getUnfinishedActivities(getName())
        .then(response => {
          this.unfinishedActivities = response.data
          console.log('获取已完成活动成功')
        }).catch(error => {
          console.log(error)
          console.log('获取已完成活动失败')
        })
    },
    // 获取已完成活动的list
    getFinishedActivities () {
      getFinishedActivities(getName())
        .then(response => {
          this.finishedActivities = response.data
          console.log('获取未完成活动成功')
        }).catch(error => {
          console.log(error)
          console.log('获取未完成活动失败')
        })
    },
    // 对分页页码的处理
    handleCurrentChange1: function (currentpage1) {
      this.currentpage1 = currentpage1
    },
    handleCurrentChange2: function (currentpage2) {
      this.currentpage2 = currentpage2
    },
    handleCurrentChange3: function (currentpage3) {
      this.currentpage3 = currentpage3
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
                this.getUnauditActivities()
                this.getUnfinishedActivities()
                this.getFinishedActivities()
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
    // 在更新Dialog中选择添加系统报名项
    uselectSystemEntryItem (row) {
      if (this.updateActivityForm.uentryform.indexOf(row) === -1) {
        this.usystemEntryItemPopover = false
        this.updateActivityForm.uentryform.push(row)
      } else {
        Message({
          showClose: true,
          message: '此报名项已经添加过了',
          type: 'warning'
        })
      }
    },
    // 在更新Dialog中选择添加我的报名项
    uselectMyEntryItem (row) {
      if (this.updateActivityForm.uentryform.indexOf(row) === -1) {
        this.umyEntryItemPopover = false
        this.updateActivityForm.uentryform.push(row)
      } else {
        Message({
          showClose: true,
          message: '此报名项已经添加过了',
          type: 'warning'
        })
      }
    },
    // 在更新Dialog中删除已选中的报名项
    udeleteEntryItem (index) {
      this.updateActivityForm.uentryform.splice(index, 1)
    },
    // 调出更新活动Dialog
    updateActivity (row) {
      const loading = this.$loading({
        lock: true,
        text: '获取信息中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.getEntryItems()
      this.updateActivityForm.uid = row.id
      this.updateActivityForm.uname = row.name
      this.updateActivityForm.uorganizer = row.organizer
      this.updateActivityForm.uorganization = row.organization
      this.updateActivityForm.usite = row.site
      this.updateActivityForm.udetail = row.detail
      this.updateActivityForm.uisneedaudit = row.isneedaudit === 'true'
      this.updateActivityForm.utime = []
      this.updateActivityForm.utime[0] = new Date(row.starttime)
      this.updateActivityForm.utime[1] = new Date(row.endtime)
      this.updateActivityForm.udeadline = new Date(row.deadline)
      getEntryItemsOfActivity(row.entryform)
        .then(response => {
          this.updateActivityForm.uentryform = response.data
          loading.close()
          this.updateActivityDialog = true
          this.$nextTick(() => {
            this.$refs.updateActivityForm.clearValidate()
          })
        }).catch(error => {
          console.log(error)
        })
    },
    // 提交更新表单
    submitUpdateActivityForm () {
      this.$refs.updateActivityForm.validate(valid => {
        if (valid) {
          updateActivity(this.updateActivityForm)
            .then(response => {
              if (response.data.status === 'updateSuccess') {
                Message({
                  showClose: true,
                  message: '更新活动成功！',
                  type: 'success'
                })
                this.getUnauditActivities()
                this.getUnfinishedActivities()
                this.getFinishedActivities()
                this.updateActivityDialog = false
              } else {
                Message({
                  showClose: true,
                  message: '系统被外星人袭击了，请再次尝试更新！',
                  type: 'warning'
                })
              }
            }).catch(error => {
              Message({
                showClose: true,
                message: '系统被外星人袭击了，请再次尝试更新！',
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
    // 删除活动
    deleteActivity (id) {
      MessageBox.confirm('确认要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteActivity(id)
          .then(response => {
            if (response.data.status === 'deleteSuccess') {
              Message({
                showClose: true,
                message: '删除活动成功！',
                type: 'success'
              })
              this.getUnauditActivities()
              this.getUnfinishedActivities()
              this.getFinishedActivities()
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
    // 审核中活动的查询
    search1 () {
      if (this.searchNameValue1 !== '') {
        searchUnauditActivities(this.searchNameValue1, this.name)
          .then(response => {
            if (response.data.length === 0) {
              Message({
                showClose: true,
                message: '未查询到相关活动！快去发起活动吧！',
                type: 'warning'
              })
              this.searchNameValue1 = ''
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
        this.$refs.searchNameValue1.focus()
      }
    },
    // 审核中活动的查询重置
    resetSearch1 () {
      this.searchNameValue1 = ''
      this.getUnauditActivities()
    },
    // 未完成活动的查询
    search2 () {
      if (this.searchNameValue2 !== '') {
        searchUnfinishedActivities(this.searchNameValue2, this.name)
          .then(response => {
            if (response.data.length === 0) {
              Message({
                showClose: true,
                message: '未查询到相关活动！快去发起活动吧！',
                type: 'warning'
              })
              this.searchNameValue2 = ''
            } else {
              this.unfinishedActivities = response.data
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
        this.$refs.searchNameValue2.focus()
      }
    },
    // 未完成活动的查询重置
    resetSearch2 () {
      this.searchNameValue2 = ''
      this.getUnfinishedActivities()
    },
    // 已完成活动的查询
    search3 () {
      if (this.searchNameValue3 !== '') {
        searchFinishedActivities(this.searchNameValue3, this.name)
          .then(response => {
            if (response.data.length === 0) {
              Message({
                showClose: true,
                message: '未查询到相关活动！快去发起活动吧！',
                type: 'warning'
              })
              this.searchNameValue3 = ''
            } else {
              this.finishedActivities = response.data
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
        this.$refs.searchNameValue3.focus()
      }
    },
    // 已完成活动的查询重置
    resetSearch3 () {
      this.searchNameValue3 = ''
      this.getFinishedActivities()
    },
    // 预览报名表单调用的方法
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
    // 重新审核调用的方法
    reauditActivity (id) {
      reauditActivity(id)
        .then(response => {
          if (response.data.status === 'reauditSuccess') {
            Message({
              showClose: true,
              type: 'success',
              message: '申请成功'
            })
            this.loading1 = true
            setTimeout(() => {
              this.getUnauditActivities()
            }, 300)
          }
        }).catch(error => {
          console.log(error)
        })
    },
    getActivityStatus (row) {
      var now = new Date()
      var ds = new Date(Date.parse(row.starttime))
      var de = new Date(Date.parse(row.endtime))
      var dd = new Date(Date.parse(row.deadline))
      if (now < dd) {
        return '报名进行中'
      } else {
        if (now < ds) {
          return '报名截止，活动未开始'
        } else {
          if (now <= de) {
            return '活动进行中'
          } else {
            return '活动结束'
          }
        }
      }
    },
    viewSignuplist (row) {
      this.signupofActivity = []
      this.searchActivityValue = ''
      getsignupAuditofActivity(row.name, row.organizer)
        .then(response => {
          this.signupofActivity = response.data
        }).catch(error => {
          console.log(error)
        })
      this.searchActivityValue = row.name
      this.signupListDialog = true
    },
    archiveActivity (row) {
      if (this.getActivityStatus(row) === '活动结束') {
        MessageBox.confirm('确认要归档该活动吗?', '归档提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          archiveActivity(row.id)
            .then(response => {
              if (response.data.status === 'archiveSuccess') {
                Message({
                  showClose: true,
                  message: '归档活动成功！',
                  type: 'success'
                })
                this.getUnauditActivities()
                this.getUnfinishedActivities()
                this.getFinishedActivities()
              }
            }).catch(error => {
              console.log(error)
            })
        }).catch(() => {
          Message({
            showClose: true,
            type: 'info',
            message: '已取消归档'
          })
        })
      } else {
        Message({
          showClose: true,
          type: 'warning',
          message: '该活动尚未结束，无法归档！'
        })
      }
    },
    searchSignupInDialog () {
      if (this.searchParticipantValue !== '') {
        searchSignupofActivity(this.searchParticipantValue, this.searchActivityValue, getName())
          .then(response => {
            if (response.data.length === 0) {
              Message({
                showClose: true,
                message: '未查询到该报名者的报名信息！',
                type: 'warning'
              })
              this.searchParticipantValue = ''
            } else {
              this.signupofActivity = response.data
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
        this.$refs.searchParticipantValue.focus()
      }
    },
    resetSearchSignupInDialog () {
      this.searchParticipantValue = ''
      getsignupAuditofActivity(this.searchActivityValue, getName())
        .then(response => {
          this.signupofActivity = response.data
        }).catch(error => {
          console.log(error)
        })
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
