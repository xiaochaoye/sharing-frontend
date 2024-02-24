<template>
  <div class="content">
    <v-md-editor v-model="text" :disabled-menus="[]" height="100%" @save="save" default-show-toc="true"
                 mode="edit"
                 @upload-image="testing"/>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

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
  console.log(text.value)
  const filePath = "output.txt"
  const blob = new Blob([text.value], {type: 'text/plain'});
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

</script>

<style lang="less" scoped>
.vuepress-markdown-body {
  height: 100%;
}

.content {
  width: 60%;
  height: calc(100% - 20px);
  background-color: #ffffff;
  margin: 20px auto 0 auto;
  overflow: auto;
  opacity: 0.9;
}
</style>