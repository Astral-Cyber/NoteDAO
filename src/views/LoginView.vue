<script setup>

import Login from "../components/Login.vue";
import Sign from "../components/Sign.vue";
import {ref} from 'vue'

const activeName = ref('first')

</script>

<template >
  <el-tabs v-model="activeName" class="tabs">
    <el-tab-pane class="ele" label="LOGIN" name="first">
      <Login/>
    </el-tab-pane>
    <el-tab-pane class="ele" label="SIGN UP" name="second">
      <Sign/>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped>
.tabs {
  margin: auto;
  width: 422px;
  margin-top: -120px;
}

.ele {
  padding: 10px;
}
</style>