<template>
  <div class="user_manage_content">
    <div class="tag-content">
      <div class="left-content">
        <div class="itemCon">
          <span class="label">用户昵称：</span>
          <el-input v-model="inputName" style="width: 240px" placeholder="请输入用户名" />
        </div>
        <div class="itemCon">
          <span class="label">用户ID：</span>
          <el-input v-model="inputId" style="width: 240px" placeholder="请输入ID" />
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
      <el-table :data="tableData" max-height="480px" show-overflow-tooltip="true" :highlight-current-row="false"
        :cell-style="{ textAlign: 'center' }" :header-cell-style="{ 'text-align': 'center' }">
        <el-table-column fixed prop="username" label="用户昵称" width="150" />
        <el-table-column prop="id" label="用户ID" width="120" />
        <el-table-column prop="avatarUrl" label="头像" width="120">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-image :src="scope.row.avatarUrl" height="50px" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120" />
        <el-table-column prop="email" label="邮箱" width="120" />
        <el-table-column prop="gender" label="性别" width="120">
          <template #default="scope">
            <el-tag v-if="scope.row.gender === 0" type="primary" effect="dark">男</el-tag>
            <el-tag v-else type="danger" effect="dark">女</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="userRole" label="用户角色" width="120">
          <template #default="scope">
            <el-tag v-if="scope.row.userRole === 0" type="success" effect="dark">普通用户</el-tag>
            <el-tag v-else type="danger" effect="dark">管理员</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="userBirthday" label="生日" width="120" :formatter="birthdayFormat" sortable />
        <el-table-column fixed="right" prop label="操作" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleClick(scope.row.id)">编辑</el-button>
            <el-button link type="primary" size="small" @click="deleteThisOne(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
        :small="false" :disabled="false" :background="true" layout="total, sizes, prev, pager, next, jumper"
        :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <el-dialog v-model="dialogFormVisible" title="修改信息" width="500">

      <el-form :model="form" :rules="inputRules" ref="infoFormRef" label-width="120px">

        <el-form-item label="用户昵称" prop="name">
          <el-input v-model="form.name" clearable maxlength="10" show-word-limit placeholder="让他人记住你" />
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日">
          <el-col :span="11">
            <el-date-picker v-model="form.date" type="date" placeholder="选择日期" style="width: 100%"
              value-format="YYYY-MM-DD" />
          </el-col>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone" clearable />
        </el-form-item>

        <el-form-item label="邮箱">
          <div class="email_input">
            <el-input v-model="form.email" clearable />
            <el-select v-model="emailSuffix" placeholder="选择" style="width: 230px" clearable>
              <el-option label="@qq.com" value="@qq.com" />
              <el-option label="@163.com" value="@163.com" />
              <el-option label="@gmail.com" value="@gmail.com" />
            </el-select>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="updateSubmit">提交</el-button>
          <el-button @click="onCancel">重置</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { getCurrentUser } from "../../config/user.ts";
import { useRouter } from "vue-router";
import myAxios from "../../plugins/myAxios.ts";
import { dayjs } from 'element-plus';

const router = useRouter()

const demo = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref()
const dialogFormVisible = ref(false)
const gender = ref()

interface RuleForm {
  name: string
  gender: number
  date: string
  phone: string
  email: string
}

const birthdayFormat = (row) => {
  // 日期格式化
  return row.userBirthday !== null ? dayjs(row.userBirthday).format('YYYY-MM-DD') : null
}

const inputName = ref()
const inputId = ref()

const infoFormRef = ref<FormInstance>()

const emailSuffix = ref()

const form = reactive<RuleForm>({
  name: '',
  gender: Number(''),
  date: '',
  phone: '',
  email: ''
})

const inputRules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '请输入昵称', trigger: 'change' },
  ],
})

const updateSubmit = async () => {

  await myAxios.post('/user/update', {
    id: demo.value,
    username: form.name,
    gender: form.gender,
    userBirthday: form.date,
    phone: form.phone,
    email: form.email + emailSuffix.value,
  }).then(response => {
    if (response.code === 0) {
      ElMessage.success("信息更新成功！")
    } else {
      ElMessage.error("信息更新失败！")
    }
  })
}

const onCancel = () => {
  form.name = ''
  form.gender = Number('')
  form.date = ''
  form.phone = ''
  form.email = ''
}

const handleSearch = () => {
  myAxios.get('/user/search', {
    params: {
      gender: gender.value,
      id: inputId.value,
      username: inputName.value
    }
  }).then(res => {
    if (res.code === 0) {
      tableData.value = res.data
    } else {
      ElMessage.error(res.message)
    }
  })
}

const handleClick = (userId: number) => {
  dialogFormVisible.value = true
  demo.value = userId
  myAxios.get('/user/search', {
    params: {
      id: userId
    }
  }).then(res => {
    form.name = res.data[0].username
    form.gender = res.data[0].gender
    form.date = res.data[0].userBirthday
    form.phone = res.data[0].phone
    form.email = res.data[0].email.split('@')[0]
    emailSuffix.value = res.data[0].email.split('@')[1]
  })
}

const deleteThisOne = (userId) => {
  myAxios.get('/user/delete', {
    params: {
      id: userId
    }
  }).then(res => {
    if (res.code === 0) {
      ElMessage.success("删除成功！")
    }
  })
}

const tableData = ref([])

const handleSizeChange = (val: number) => {
  pageSize.value = val
  fetchUser()
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  fetchUser()
}
const fetchUser = () => {
  myAxios.get('/user/userList', {
    params: {
      pageNum: currentPage.value,
      pageSize: pageSize.value
    }
  }).then(res => {
    tableData.value = res.data.records
    total.value = res.data.total
  })
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