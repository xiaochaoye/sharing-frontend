<template>
  <div class="user_manage_content">
    <div class="tag-content">
      <div class="left-content">
        <div class="itemCon">
          <span class="label">用户昵称：</span>
          <el-input v-model="inputName" style="width: 240px" placeholder="请输入用户名"/>
        </div>
        <div class="itemCon">
          <span class="label">用户ID：</span>
          <el-input v-model="inputId" style="width: 240px" placeholder="请输入ID"/>
        </div>
        <div class="itemCon">
          <span class="label">性别：</span>
          <el-select v-model="gender" placeholder="选择" style="width: 240px">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </div>
      </div>
      <div class="right-content">
        <el-button type="primary" @click="handleSearch">查 询</el-button>
        <el-button type="success">重 置</el-button>
      </div>
    </div>

    <div class="tableContent">
      <el-table :data="tableData" max-height="350px" show-overflow-tooltip="true">
        <el-table-column fixed prop="username" label="用户昵称" width="150"/>
        <el-table-column prop="id" label="用户ID" width="120"/>
        <el-table-column prop="avatarUrl" label="头像" width="120">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-image :src="scope.row.avatarUrl" height="50px"/>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"/>
        <el-table-column prop="email" label="邮箱" width="120"/>
        <el-table-column prop="gender" label="性别" width="120" :formatter="genderFormat"/>
        <el-table-column prop="isDelete" label="是否删除" width="120"/>
        <el-table-column prop="userRole" label="用户角色" width="120"/>
        <el-table-column prop="userBirthday" label="生日" width="120"/>
        <el-table-column fixed="right" prop label="操作" width="120">
          <template #default>
            <el-button link type="primary" size="small" @click="handleClick">编辑</el-button>
            <el-button link type="primary" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {getCurrentUser} from "../../config/user.ts";
import {useRouter} from "vue-router";

const router = useRouter()

const gender = ref()

const genderFormat = (row) => {
  return row.gender === 0 ? "男" : "女"
}

const inputName = ref()
const inputId = ref()

const handleSearch = () => {

}

const handleClick = () => {
  ElMessageBox.alert('click')
}

const tableData = ref([])

const fetchUser = () => {
  
}

onMounted(async () => {
  const loginUser = await getCurrentUser()
  if (loginUser === null) {
    ElMessage.error("未登录！")
    router.back()
  }
  if (loginUser.userRole != 1) {
    ElMessage.error("无权限！")
    router.back()
  } else {
    fetchUser()
  }
})
</script>

<style scoped lang="less">
.user_manage_content {
  margin: 30px auto 0;
  background-color: #ffffff;
  height: calc(100% - 50px);
  padding: 20px;
  box-sizing: border-box;
  max-width: 1000px;
  min-width: 700px;
  opacity: 0.9;
}

.tag-content {
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 2px 17px -1px #c4c4c4;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;

  .left-content {
    flex: 1;
    display: flex;
    margin: 10px 0;
    width: 100%;
    flex-wrap: wrap;

    .itemCon {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      span {
        font-size: 16px;
        display: inline-block;
        width: 100px;
        text-align: right;
        margin-right: 10px;
      }

      el-input {
        flex: 1;
      }
    }
  }

  .right-content {
    margin: 10px 0;
    display: flex;
    align-items: center;
    min-width: 50px;
  }
}

.tableContent {
  box-shadow: 0px 2px 17px -1px #c4c4c4;
  margin-top: 20px;
}
</style>