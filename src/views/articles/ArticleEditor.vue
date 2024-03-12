<template>
  <div class="article_edit_content">
    <el-form :model="form" :rules="inputRules" ref="infoFormRef" label-width="120px">
      <div style="font-size: 20px">编辑文章</div>
      <el-divider/>

      <el-form-item label="标题：" prop="title">
        <el-input v-model="form.title" clearable maxlength="60" show-word-limit placeholder="文章标题最多60字"/>
      </el-form-item>
      <el-form-item label="描述：" prop="description">
        <el-input v-model="form.description" clearable placeholder="请描述一下你的文章"/>
      </el-form-item>

      <el-form-item label="封面上传">
        <el-upload
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

      <el-form-item label="内容：">
        <v-md-editor v-model="form.content" :disabled-menus="[]" height="100%" @save="save" default-show-toc="true"
                     mode="editable" toc-nav-position-right="true" :include-level="[1, 2, 3, 4, 5, 6]"
                     @upload-image="uploading"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {ElMessage, FormInstance, FormRules, UploadProps} from "element-plus";
import {getCurrentUser} from "../../config/user.ts";
import myAxios from "../../plugins/myAxios.ts";
import {useRouter} from "vue-router";

const router = useRouter();

interface RuleForm {
  title: string
  description: string
  content: string
}

const infoFormRef = ref<FormInstance>()

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

// 响应式表单
const form = reactive<RuleForm>({
  title: '',
  description: '',
  content: '### 右上角全屏编写更方便\n#### 除了已经列举出来的功能外还支持 ***emoji***、***katex***、***mermaid***、***todo-list***、***tip*** 等功能'
})

// 表单校验规则
const inputRules = reactive<FormRules<RuleForm>>({
  title: [
    {required: true, message: '请输入标题', trigger: 'change'},
    {min: 2, message: '标题至少要有两个字', trigger: 'change'},
  ],
  description: [
    {required: true, message: '请输入描述', trigger: 'change'},
    {min: 2, message: '描述至少要有两个字', trigger: 'change'},
  ],
})

// 保存文本方法（测试）
const save = () => {
  const filePath = "output.txt"
  const blob = new Blob([form.content], {type: 'text/plain'});
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = filePath;
  downloadLink.click();
}

// 文章中上传图片和回显图片链接方法
const uploading = (event, insertImage, files) => {
  console.log(files[0])
  let dataForm = new FormData();

  dataForm.append('image', files[0])

  myAxios.post('/file/uploadImage', dataForm)
      .then(response => {
        insertImage({
          // 回显后端返回的图片路径和描述
          url: response.data,
          desc: files[0].name,
          width: 'auto',
          height: 'auto'
        }),
            (error: any) => {
              ElMessage.error('请求失败了，', error.message)
            }
      })
}

// 重置表单内容
const onCancel = () => {
  form.title = ''
  form.description = ''
  form.content = ''
}

// 提交方法
const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    ElMessage.warning('用户未登录！')
  }
  let dataForm = new FormData();

  fileList.value.forEach(it => {
    dataForm.append('image', it)
  })

  let coverUrl: null

  try {
    coverUrl = (await myAxios.post('/file/uploadImage', dataForm)).data
  } catch (error) {
    console.log(error)
    coverUrl = null;
  }

  await myAxios.post('/article/upload', {
    author: currentUser.username,
    authorId: currentUser.id,
    title: form.title,
    description: form.description,
    cover: coverUrl,
    content: form.content,
    isDisabled: false,
    clickCount: 0,
    likeCount: 0
  }).then(response => {
    if (response.code === 0) {
      ElMessage.success("上传成功！")
      router.push('/main')
    }
  })
}

</script>

<style lang="less" scoped>
.vuepress-markdown-body {
  height: 100%;
}

.article_edit_content {
  width: 60%;
  height: calc(100% - 30px);
  background-color: #ffffff;
  margin: 20px auto 0 auto;
  overflow: auto;
  opacity: 0.9;
}
</style>