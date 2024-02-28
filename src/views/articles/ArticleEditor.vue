<template>
  <div class="content">
    <el-form :model="form" :rules="inputRules" ref="infoFormRef" label-width="120px">
      <div style="font-size: 20px">修改信息</div>
      <el-divider/>

      <el-form-item label="标题：" prop="title">
        <el-input v-model="form.title" clearable maxlength="60" show-word-limit placeholder="文章标题最多60字"/>
      </el-form-item>

      <el-form-item label="描述：" prop="description">
        <el-input v-model="form.description" clearable placeholder="请描述一下你的文章"/>
      </el-form-item>

      <el-form-item label="内容：">
        <v-md-editor v-model="form.content" :disabled-menus="[]" height="100%" @save="save" default-show-toc="true"
                     mode="editable" toc-nav-position-right="true" :include-level="[1, 2, 3, 4, 5, 6]"
                     @upload-image="testing"/>
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
import {ElMessage, FormInstance, FormRules} from "element-plus";
import {getCurrentUser} from "../../config/user.ts";
import myAxios from "../../plugins/myAxios.ts";

interface RuleForm {
  title: string
  description: string
  content: string
}

const infoFormRef = ref<FormInstance>()

const form = reactive<RuleForm>({
  title: '',
  description: '',
  content: '### 右上角全屏编写更方便\n#### 除了已经列举出来的功能外还支持 ***emoji***、***katex***、***mermaid***、***todo-list***、***tip*** 等功能'
})

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

const text = ref(`
### 右上角全屏编写更方便
#### 除了已经列举出来的功能外还支持 ***emoji***、***katex***、***mermaid***、***todo-list***、***tip*** 等功能
---
:smile: :copyright:
---
$$\\sum_{i=1}^n a_i=0$$
---
\`\`\`mermaid
graph LR
A --- B
B-->C[fa:fa-ban forbidden]
B-->D(fa:fa-spinner);
\`\`\`
---
- [x] Task
---
::: details
  这是一个详情块，在 IE / Edge 中不生效
:::
::: tip 自定义标题
  你也可以自定义块中的标题
:::
---
`)

const save = () => {
  console.log(form.content)
  const filePath = "output.txt"
  const blob = new Blob([form.content], {type: 'text/plain'});
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = filePath;
  downloadLink.click();
}

const testing = (event, insertImage, files) => {
  console.log(files)
  insertImage({
    url:
        'https://tse2-mm.cn.bing.net/th/id/OIP-C._kg3QODJ9oexfLJEmQePzgHaGr?rs=1&pid=ImgDetMain',
    desc: '小鸡子',
    // 回显后端返回的图片路径和描述
    // width: 'auto',
    // height: 'auto',
  });
}

const onCancel = () => {
  form.title = ''
  form.description = ''
  form.content = ''
}

const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    ElMessage.warning('用户未登录！')
  }
  
}

</script>

<style lang="less" scoped>
.vuepress-markdown-body {
  height: 100%;
}

.content {
  width: 60%;
  height: calc(100% - 30px);
  background-color: #ffffff;
  margin: 20px auto 0 auto;
  overflow: auto;
  opacity: 0.9;
}
</style>