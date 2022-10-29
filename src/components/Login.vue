<script setup>
import {ref} from 'vue'
import {useRouter} from "vue-router";

const router = useRouter()
const user = ref('')
const password = ref('')
const host = 'http://123.60.44.50:3000'

function login() {

  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  let requestOptions = { // 里面不能有body
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }
  fetch(`${host}/users/${user.value}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.id === user.value) {   // 验证是否存在该用户return data
        } else {
          throw new Error("用户名不存在")
        }
        if (data.password === password.value) {
          router.push({
            name: "Hello",
            params: {
              id: data.id,
            }
          })
        } else {
          throw new Error("密码错误")
        }
      })
      .catch(err => alert(err))
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Hello</span>
      </div>
    </template>

    <el-row>
      <el-input v-model="user" placeholder="用户名" clearable/>
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
    <el-divider/>
    <div id="operate">
      <el-button type="primary" size="large" @click="login">登录</el-button>
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
