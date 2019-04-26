<template>
  <div id="app">
      <router-view>
      </router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {}
}
</script>

<style>
html,body {
  margin: 0px;
  padding: 0px;
  height: 100%;
  width: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
body .el-table th.gutter{
    display: table-cell!important;
}

body .el-table colgroup.gutter{
    display: table-cell!important;
}
</style>
