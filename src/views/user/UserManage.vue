<template>
  <div class="user_manage_content">
    <div class="tag-content">
      <div class="left-content">
        <div class="itemCon">
          <span class="label">用户昵称：</span>
          <el-input v-model="inputVal" style="width: 240px" placeholder="Please input" />
        </div>
        <div class="itemCon">
          <span class="label">用户ID：</span>
          <el-input v-model="inputVal" style="width: 240px" placeholder="Please input" />
        </div>
        <div class="itemCon">
          <span class="label">性别：</span>
          <el-input v-model="inputVal" style="width: 240px" placeholder="Please input" />
        </div>
      </div>
      <div class="right-content">
        <el-button type="primary" @click="handleSearch">查 询</el-button>
        <el-button type="success">重 置</el-button>
      </div>
    </div>

    <div class="tableContent">
      <el-table :data="tableData" style="width: 100%; overflow: auto;" show-overflow-tooltip="true">
        <el-table-column fixed prop="username" label="用户昵称" width="150" />
        <el-table-column prop="id" label="用户ID" width="120" />
        <el-table-column prop="avatarUrl" label="头像" width="120" />
        <el-table-column prop="phone" label="手机号" width="120" />
        <el-table-column prop="email" label="邮箱" width="120" />
        <el-table-column prop="gender" label="性别" width="120" :formatter="genderFormate" />
        <el-table-column prop="isDelete" label="是否删除" width="120" />
        <el-table-column prop="userRole" label="用户角色" width="120" />
        <el-table-column prop="userBirthday" label="生日" width="120" />
        <el-table-column fixed="right" prop label="操作" width="120">
          <template #default>
            <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
            <el-button link type="primary" size="small">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessageBox } from "element-plus";

const genderormate = (row, column) => {
  return row.gender === 0 ? "男" : "女"
}

const inputVal = ref('asfsf')

const handleSearch = () => {

}

const handleClick = () => {
  ElMessageBox.alert('click')
}

const tableData = [
  {
    "username": "嘻哈一怪",
    "id": "1",
    "avatarUrl": "https://pic2.zhimg.com/v2-2387649d9de0ef6b74aac0f69fbc8b59_r.jpg",
    "phone": "17833781538",
    "email": "2861184979@qq.com",
    "isDelete": "0",
    "userRole": "1",
    "gender": 0,
    "userBirthday": "14/3/2024"
  },
  {
    "username": "蔡徐坤",
    "id": "2",
    "avatarUrl": "https://pic2.zhimg.com/v2-2387649d9de0ef6b74aac0f69fbc8b59_r.jpg",
    "phone": "17833781538",
    "email": "2861184979@qq.com",
    "isDelete": "0",
    "userRole": "0",
    "gender": "",
    "userBirthday": "14/3/2024"
  },
  {
    "username": "ikun",
    "id": "3",
    "avatarUrl": "",
    "phone": "17833781538",
    "email": "2861184979@qq.com",
    "isDelete": "0",
    "userRole": "0",
    "gender": "",
    "userBirthday": ""
  },
  {
    "username": "ijun",
    "id": "4",
    "avatarUrl": "",
    "phone": "17833781538",
    "email": "2861184979@qq.com",
    "isDelete": "0",
    "userRole": "0",
    "gender": "",
    "userBirthday": ""
  },
  {
    "username": "",
    "id": "5",
    "avatarUrl": "",
    "phone": "17833781538",
    "email": "2861184979@qq.com",
    "isDelete": "0",
    "userRole": "0",
    "gender": "",
    "userBirthday": ""
  },
  {
    "username": "",
    "id": "6",
    "avatarUrl": "",
    "phone": "17833781538",
    "email": "2861184979@qq.com",
    "isDelete": "0",
    "userRole": "0",
    "gender": "",
    "userBirthday": ""
  },
  {
    "username": "",
    "id": "7",
    "avatarUrl": "",
    "phone": "17833781538",
    "email": "2861184979@qq.com",
    "isDelete": "0",
    "userRole": "0",
    "gender": "",
    "userBirthday": ""
  },
  {
    "username": "",
    "id": "8",
    "avatarUrl": "",
    "phone": "17833781538",
    "email": "2861184979@qq.com",
    "isDelete": "0",
    "userRole": "0",
    "gender": "",
    "userBirthday": ""
  },
  {
    "username": "",
    "id": "9",
    "avatarUrl": "",
    "phone": "17833781538",
    "email": "2861184979@qq.com",
    "isDelete": "0",
    "userRole": "0",
    "gender": "",
    "userBirthday": ""
  },
  {
    "username": "",
    "id": "10",
    "avatarUrl": "",
    "phone": "17833781538",
    "email": "2861184979@qq.com",
    "isDelete": "0",
    "userRole": "0",
    "gender": "",
    "userBirthday": ""
  },
]
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