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
            list-type="picture-card"
            :show-file-list="true"
            :limit="1"
            :on-change="beforeAvatarUpload"
            :on-preview="handlePictureCardPreview"
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

          <el-dialog v-model="dialogVisible">
            <div class="dialog-content">
              <img :src="dialogImageUrl" alt="Preview Image" class="preview-image"/>
            </div>
          </el-dialog>
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
import {Plus} from '@element-plus/icons-vue'
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

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

//定义一个响应式数组用来接收图片
const fileList = ref([]);

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log('rawFile', rawFile)
  if (rawFile.raw.type !== 'image/jpeg' && rawFile.raw.type !== 'image/png') {
    ElMessage.error('图片上传格式为JPG或PNG!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片不能大于2MB!')
    return false
  }

  fileList.value = [rawFile.raw]
  return true
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const httpRequest = async () => {
  let dataForm = new FormData();

  fileList.value.forEach(it => {
    dataForm.append('image', it)
  })

  await myAxios.post('/uer/upload',)
}

const updateSubmit = async () => {

  // const currentUser = await getCurrentUser();
  // if (!currentUser) {
  //   ElMessage.warning('用户未登录！')
  // }

  await myAxios.post('/user/update', {
    // id: currentUser.id,
    username: form.name,
    gender: form.gender,
    userBirthday: form.date,
    phone: form.phone,
    email: form.email + emailSuffix.value,
  })

  alert(fileList.value.length)
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

.dialog-content {
  text-align: center; /* 居中显示图片 */
}

.preview-image {
  max-width: 100%; /* 图片最大宽度为父元素宽度 */
  max-height: 85vh; /* 图片最大高度为80%视窗高度 */
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