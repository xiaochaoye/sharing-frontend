<template>
  <div class="article_show_content">
    <el-form :model="form" :rules="inputRules" ref="infoFormRef" label-width="120px">
      <div style="font-size: 20px">编辑文章</div>
      
      <v-md-preview :text="text" width="100%" height="100%" style="background-color: #ffffff"></v-md-preview>
    </el-form>
  </div>
</template>

<script setup lang="ts">
//todo 后端接受文章 id 作者 id 来展示文章
import {ref} from "vue";

const text = ref(`
---
:smile: :copyright:
---
$$\\sum_{i=1}^n a_i=0$$
---
`)
</script>

<style lang="less" scoped>
.article_show_content {
  width: 60%;
  height: calc(100% - 20px);
  background-color: #ffffff;
  margin: 20px auto 0 auto;
  overflow: auto;
  opacity: 0.9;
}
</style>