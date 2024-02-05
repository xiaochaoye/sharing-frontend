<template>
  <div class="content">
    <el-form :model="form" label-width="120px">
      <div style="font-size: 20px">修改信息</div>
      <el-divider/>

      <el-form-item label="用户昵称">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="form.account"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"/>
      </el-form-item>
      <el-form-item label="头像上传">
        <!--todo action为图片上传的地址-->
        <el-upload v-model:file-list="fileList" action="#" list-type="picture-card" :auto-upload="false" limit="1"
                   :on-exceed="checkQuantity"
                   accept=".jpg,.png"
                   v-show="showUploadFile">
          <el-icon>
            <Plus/>
          </el-icon>
          <template #file="{ file }">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""/>
              <span class="el-upload-list__item-actions">
                  <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                  >
                    <el-icon><zoom-in/></el-icon>
                  </span>
                  <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove"
                  >
                    <el-icon><Delete/></el-icon>
                  </span>
                </span>
            </div>
          </template>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image"/>
        </el-dialog>
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
          <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="选择日期"
              style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery"/>
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type"/>
          <el-checkbox label="Promotion activities" name="type"/>
          <el-checkbox label="Offline activities" name="type"/>
          <el-checkbox label="Simple brand exposure" name="type"/>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor"/>
          <el-radio label="Venue"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {UploadFile, UploadUserFile,} from 'element-plus'
import {ElMessage} from "element-plus";
import {Plus, Delete, ZoomIn} from "@element-plus/icons-vue";

const radio = ref(0)
const showUploadFile = ref(true)
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const fileList = reactive<UploadUserFile[]>([])
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleRemove = () => {
  fileList.length = 0
}

function checkQuantity() {
  ElMessage.error("当前限制选择 1 个文件，请删除后继续上传")
}

const form = reactive({
  name: '',
  region: '',
  date: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
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
</style>