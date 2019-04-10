<template>
  <div id="test">
      <h2>This is a test vue</h2><br>
      <el-button @click="getData">data test</el-button>
      <h3>My name is {{name}}</h3>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'test',
  data () {
    return {
      backData: 's'
    }
  },
  methods: {
    // axios test
    getData () {
      this.$store.dispatch('user/TestAction')
    }
  },
  computed: {
    name () {
      return this.$store.getters.name
    }
  }
}
</script>
