<template>
  <div class="entryItem">
    <el-card shadow="never">
      <div slot="header" class="entryItem_header">
        <span>自定义报名项管理</span>
        <el-button type="text" @click="addEntryItem" style="float:right;padding-bottom:0px;padding-top:0px;">
          <i class="el-icon-circle-plus-outline"></i> 新增报名项
        </el-button>
      </div>
    </el-card>
    <!-- 新增报名项的dialog -->
    <el-dialog :visible.sync="addEntryItemDialog" width="50%">
      <!-- title -->
      <div slot="title" class="dialog-title"><i class="el-icon-circle-plus-outline"></i>新增报名项</div>
      <!-- form -->
      <!-- footer -->
      <div slot="footer">
        <el-button @click="addEntryItemDialog = false">取 消</el-button>
        <el-button type="primary" @click="addEntryItemDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'entryItem',
  data() {
    return {
      addEntryItemDialog: false
    }
  },
  methods: {
    addEntryItem () {
      this.addEntryItemDialog = true
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
