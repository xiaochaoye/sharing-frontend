<template>
  <div class="content">
    <el-form :model="form" :rules="inputRules" ref="ruleFormRef" label-width="120px">
      <div style="font-size: 20px">修改信息</div>
      <el-divider/>

      <el-form-item label="用户昵称">
        <el-input v-model="form.name" clearable maxlength="10" show-word-limit/>
      </el-form-item>
      <el-form-item label="头像上传">
        <!--todo action为图片上传的地址-->
        <el-upload
            ref="upload"
            class="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :limit="1"
            :on-exceed="handleExceed"
            :auto-upload="false"
        >
          <template #trigger>
            <el-button type="primary">select file</el-button>
          </template>
          <el-button class="ml-3" type="success" @click="submitUpload">
            upload to server
          </el-button>
          <template #tip>
            <div class="el-upload__tip text-red">
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
          <el-date-picker v-model="form.date" type="date" placeholder="选择日期" style="width: 100%"/>
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
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {ElMessage} from "element-plus";

interface RuleForm {
  name: string
  gender: string
  date: string
  phone: string
  email: string
}

const ruleFormRef = ref<FormInstance>()

const emailSuffix = ref('@qq.com')

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


const onSubmit = () => {
  console.log(form.email + emailSuffix.value)
  console.log(form)
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