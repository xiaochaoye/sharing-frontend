<template>
  <div class="content">
    <el-form :model="form" label-width="120px">
      <div style="font-size: 20px">修改信息</div>
      <el-divider />

      <el-form-item label="用户昵称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="form.account" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item label="头像上传">
        <!--todo action为图片上传的地址-->
        <el-upload v-model:file-list="fileList" class="upload-demo"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :on-preview="handlePreview"
          :on-remove="handleRemove" list-type="picture">
          <el-button type="primary">Click to upload</el-button>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
        </el-upload>
      </el-form-item>

      <el-form-item label="性别">
        <!--todo  获取性别的值      -->
        <el-radio-group v-model="radio">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日">
        <el-col :span="11">
          <el-date-picker v-model="form.date" type="date" placeholder="选择日期" style="width: 100%" />
        </el-col>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone" />
      </el-form-item>

      <el-form-item label="邮箱">
        <div class="email_input">
          <el-input v-model="form.email" />
          <el-select placeholder="选择" style="width: 115px">
            <el-option label="@qq.com" value="1" />
            <el-option label="@163.com" value="2" />
            <el-option label="@gmail.com" value="3" />
          </el-select>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ElMessage } from "element-plus";

const radio = ref(0)

// const handleRemove = () => {
//   fileList.length = 0
// }

const fileList = ref<UploadUserFile[]>([])

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file)
}

const form = reactive({

})


const onSubmit = () => {
  console.log()
}
</script>

<style lang="less">
.content {
  margin: 30px auto 0;
  background-color: #ffffff;
  height: calc(100% - 30px);
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