<template>
  <div class="content">
    <el-form :model="form" ref="infoFormRef" label-width="120px">
      <div style="font-size: 20px">修改信息</div>
      <el-divider/>

      <el-form-item label="用户昵称">
        <el-input v-model="form.name" clearable maxlength="10" show-word-limit/>
      </el-form-item>

      <el-form-item label="头像上传">
        <!--todo action为图片上传的地址-->
        <el-upload
            :http-request="httpRequest"
            multiple
            :show-file-list="true"
            list-type="picture-card"
            :limit="1"
            :before-upload="beforeAvatarUpload"
            :auto-upload="false"
        >
          <el-icon class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
          <template #tip>
            <div class="el-upload__tip">
              限制上传1个文件，新文件将覆盖旧文件
            </div>
          </template>
        </el-upload>

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
                          value-format="YYYY-MM-DD"/>
        </el-col>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone" clearable/>
      </el-form-item>

      <el-form-item label="邮箱">
        <div class="email_input">
          <el-input v-model="form.email" clearable/>
          <el-select v-model="emailSuffix" placeholder="选择" style="width: 230px" clearable>
            <el-option label="@qq.com" value="@qq.com"/>
            <el-option label="@163.com" value="@163.com"/>
            <el-option label="@gmail.com" value="@gmail.com"/>
          </el-select>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="updateSubmit">提交</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {FormInstance, UploadProps, ElMessage} from 'element-plus'
import myAxios from "../../plugins/myAxios.ts";
import {getCurrentUser} from "../../config/user.ts";

interface RuleForm {
  name: string
  gender: string
  date: string
  phone: string
  email: string
}

const infoFormRef = ref<FormInstance>()

const emailSuffix = ref()

const form = reactive<RuleForm>({
  name: '',
  gender: '',
  date: '',
  phone: '',
  email: ''
})

// const inputRules = reactive<FormRules<RuleForm>>({
//   password: [
//     {required: true, message: '请输入密码', trigger: 'change'},
//     {min: 8, max: 15, message: '密码长度在8~15位之间', trigger: 'change'},
//   ],
// })
//定义一个响应式数组用来接收图片
const fileList = ref([]);

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('图片上传格式为JPG或PNG!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片不能大于2MB!')
    return false
  }
  return true
}



//自定义函数用来覆盖原有的XHR行为（默认提交行为）
function httpRequest(option) {
//将图片存到数组中
  fileList.value.push(option)
  return option
}


const updateSubmit = async () => {

  // const currentUser = await getCurrentUser();
  // if (!currentUser) {
  //   ElMessage.warning('用户未登录！')
  // }

  let dataForm = new FormData();

  fileList.value.forEach((it) => {
    dataForm.append('image', it.file)
  })

  await myAxios.post('/user/update', {
    // id: currentUser.id,
    username: form.name,
    gender: form.gender,
    userBirthday: form.date,
    phone: form.phone,
    email: form.email + emailSuffix.value
  })

  // await myAxios.post('/user/upload', dataForm, {
  //   headers: {
  //     "Content-Type": "multipart/form-data"
  //   }
  // })

  await myAxios({
    method: 'POST',
    url: 'http://localhost:9002/book/save',
    data: dataForm,
//设置请求参数的规则
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then(response => {
    console.log(response.data)
  })
}

const onCancel = () => {
  form.name = ''
  form.gender = ''
  form.date = ''
  form.phone = ''
  form.email = ''
}
</script>

<style lang="less">
.content {
  margin: 30px auto 0;
  background-color: #ffffff;
  height: calc(100% - 50px);
  padding: 20px;
  box-sizing: border-box;
  max-width: 1000px;
  min-width: 700px;
  opacity: 0.9;
}

.email_input {
  display: flex;
  align-items: center;
}
</style>
<style>
.el-icon .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>