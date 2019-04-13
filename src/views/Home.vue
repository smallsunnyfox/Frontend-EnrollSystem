<template>
  <div class="home">

  </div>
</template>

<script>
import { initToken } from '../utils/auth'
export default {
  name: 'home',
  components: {

  },
  created() {
    //登录主页面创建时初始化cookie
    initToken()
  },
}
</script>
