<template>
  <div class="home">
    <div class="home_header">
      <div class="home_logobar">
        <img src="../assets/logoicon.png" alt="" height="70px" width="70px">
        <img src="../assets/logotext.png" alt="" class="logotext">
      </div>
    </div>
  </div>
</template>

<script>
import { initToken } from '../utils/auth'
export default {
  name: 'home',
  components: {

  },
  created () {
    // 登录主页面创建时初始化cookie
    initToken()
  }
}
</script>

<style scoped>
  .home_header {
    width: 100%;
    height: 80px;
    border-bottom: 2px solid lightskyblue;
  }
  .home_logobar {
    margin: 5px auto;
    padding: 5px 0;
    width: 750px;
    height: 70px;
  }
  .logotext {
    width: 420px;
    height: 50px;
    margin: 10px 130px;
  }
</style>
