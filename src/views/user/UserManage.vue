<template>
  <div class="user_manage_content">
    <div class="tag-content">
      <div class="left-content">
        <div class="itemCon">
          <span class="label">入库时间：</span>
          <el-input v-model="inputVal" style="width: 240px" placeholder="Please input"/>
        </div>
        <div class="itemCon">
          <span class="label">入库时间：</span>
          <el-input v-model="inputVal" style="width: 240px" placeholder="Please input"/>
        </div>
        <div class="itemCon">
          <span class="label">入库时间：</span>
          <el-input v-model="inputVal" style="width: 240px" placeholder="Please input"/>
        </div>

      </div>
      <div class="right-content">
        <el-button type="primary" @click="handleSearch">查 询</el-button>
        <el-button type="success">重 置</el-button>
      </div>
    </div>

    <div class="tableContent">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="date" label="用户昵称" width="150"/>
        <el-table-column prop="name" label="用户ID" width="120"/>
        <el-table-column prop="state" label="头像" width="120"/>
        <el-table-column prop="city" label="手机号" width="120"/>
        <el-table-column prop="address" label="邮箱" width="600"/>
        <el-table-column prop="zip" label="性别" width="120"/>
        <el-table-column prop="zip" label="是否删除" width="120"/>
        <el-table-column prop="zip" label="用户角色" width="120"/>
        <el-table-column fixed="right" label="生日" width="120">
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
import {ref} from "vue";
import {ElMessageBox} from "element-plus";

const inputVal = ref('asfsf')

const handleSearch = () => {

}

const handleClick = () => {
  ElMessageBox.alert('click')
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
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