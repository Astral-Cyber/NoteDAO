<script setup>
import {ref} from 'vue'

const user = ref('')
const name = ref('')
const password = ref('')
const repeatPassword = ref('')

function register() {
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  }
  requestOptions.body = JSON.stringify({
    id: user.value,
    name: name.value,
    password: password.value,
  });
  if (repeatPassword.value !== password.value) {
    alert("两次输入的密码不一致，请检查")
  } else {
    fetch(`api/users`, requestOptions) // 这里的网址没有id
        .then(response => response.json())
        .then(data => alert(data.id+"，注册成功"))
  }
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Create</span>
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
      <el-button type="primary" size="large" @click="register">注册</el-button>
    </div>
  </el-card>
</template>

<style scoped>
.box-card {
  width: 400px;
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
