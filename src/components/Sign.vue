<script setup>
import {ref} from 'vue'

const user = ref('')
const name = ref('')
const password = ref('')
const repeatPassword = ref('')
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>SIGN</span>
      </div>
    </template>

    <el-row>
      <el-input v-model="user" placeholder="用户名" clearable/>
    </el-row>
    <el-row>
      <el-input v-model="name" placeholder="昵称" clearable/>
    </el-row>
    <el-row>
      <el-col>
        <el-input
            v-model="password"
            type="password"
            placeholder="密码"
            show-password
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-input
            v-model="repeatPassword"
            type="password"
            placeholder="重复密码"
            show-password
        />
      </el-col>
    </el-row>
    <el-divider/>
    <div id="operate">
      <el-button type="primary" size="large">注册</el-button>
    </div>
  </el-card>
</template>

<style scoped>
.box-card {
  width: 25vw;
}

.card-header {
  font-size: xxx-large;
  font-weight: bolder;
  color: #409EFF;
  justify-content: space-between;
  align-items: center;
}

.el-row {
  margin-bottom: 10px;
}

#operate {
  text-align: right;
}
</style>
