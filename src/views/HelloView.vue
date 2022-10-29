<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{info.name}}</span>
      </div>
    </template>

    <el-row>
      <span style="font-size: large;font-weight: bolder;margin-left: 10px" >ID:{{info.id}}</span>
    </el-row>
    <el-divider/>
    <div id="operate">
      <el-button type="primary" @click="exit">退出登录</el-button>
    </div>
  </el-card>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from 'vue'

const route = useRoute();
const router = useRouter();
const id = ref('')
const info = ref('')
const name = ref('')
const password = ref('')
const host = 'http://123.60.44.50:3000'

onMounted(() => {
  id.value = route.params.id;
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }
  fetch(`${host}/users/${id.value}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        info.value = data
      })
})

function exit() {
  router.push('/')
}
</script>

<style scoped>
.box-card {
  width: 400px;
}

.card-header {
  font-size: xx-large;
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
