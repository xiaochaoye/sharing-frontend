<template>
  <v-md-editor v-model="text" :disabled-menus="[]" height="400px" @save="save" @upload-image="testing"/>
</template>

<script setup lang="ts">
import {ref} from "vue";

const text = ref(`
### 除了已经列举出来的功能外还支持 ***emoji***、***katex***、***mermaid***、***todo-list***、***tip*** 等功能
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

<style scoped>

</style>