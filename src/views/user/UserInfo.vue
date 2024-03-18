<template>
  <div class="user_content">
    <el-form :model="form" :rules="inputRules" ref="infoFormRef" label-width="120px">
      <div style="font-size: 20px">修改信息</div>
      <el-divider/>

      <el-form-item label="用户昵称" prop="name">
        <el-input v-model="form.name" clearable maxlength="10" show-word-limit placeholder="让他人记住你"/>
      </el-form-item>

      <el-form-item label="头像上传">
        <!--todo action为图片上传的地址-->
        <el-upload
            :http-request="httpRequest"
            multiple
            list-type="picture"
            :show-file-list="true"
            :limit="1"
            :on-change="beforeAvatarUpload"
            :auto-upload="false"
            accept=".jpg,.jpeg,.png"
        >
          <el-button type="primary">点击选择</el-button>
          <template #tip>
            <div class="el-upload__tip">
              限制上传1个文件，新文件请删除后重新选择
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
import {FormInstance, UploadProps, ElMessage, FormRules} from 'element-plus'
import myAxios from "../../plugins/myAxios.ts";
import {getCurrentUser} from "../../config/user.ts";

interface RuleForm {
  name: string
  gender: number
  date: string
  phone: string
  email: string
}

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
    {required: true, message: '请输入昵称', trigger: 'change'},
  ],
})

// 定义一个响应式数组用来接收图片
const fileList = ref([]);

// 上传前校验格式和大小方法
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log('rawFile', rawFile)
  if (rawFile.raw.type !== 'image/jpeg' && rawFile.raw.type !== 'image/png') {
    ElMessage.error('图片上传格式为JPG或PNG!')
    return Promise.reject(false)
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片不能大于2MB!')
    return false
  }
  console.log('raw:', rawFile.raw)
  fileList.value = [rawFile.raw]
  console.log('数组内容：', fileList)
  return true
}

// 覆盖默认的 Xhr 行为，允许自行实现上传文件的请求（无作用）
const httpRequest = async () => {
  let dataForm = new FormData();

  fileList.value.forEach(it => {
    dataForm.append('image', it)
  })

  await myAxios.post('/uer/upload',)
}

// 提交更新方法
const updateSubmit = async () => {

  // const currentUser = await getCurrentUser();
  // if (!currentUser) {
  //   ElMessage.warning('用户未登录！')
  // }
  let dataForm = new FormData();

  fileList.value.forEach(it => {
    dataForm.append('image', it)
  })

  await myAxios.post('/user/update', {
    // id: currentUser.id,
    username: form.name,
    gender: form.gender,
    userBirthday: form.date,
    phone: form.phone,
    email: form.email + emailSuffix.value,
  }).then(response => {
    if (response.code === 200) {
      ElMessage.success("信息更新成功")
    } else {
      ElMessage.error(response.description)
    }
  })

  await myAxios.post('/file/uploadAvatar', dataForm).then(response => {
    if (response.code !== 200) {
      ElMessage.error(response.description)
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
</script>

<style lang="less">
.user_content {
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

//.preview-image {
//  max-width: 100%; /* 图片最大宽度为父元素宽度 */
//  max-height: 85vh; /* 图片最大高度为80%视窗高度 */
//}

.el-upload-list__item is-ready {
  display: none;
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