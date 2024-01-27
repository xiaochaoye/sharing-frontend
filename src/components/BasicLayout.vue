<template>
  <div class="main-content">
    <div class="top-content">
      <!-- 头部-->

    </div>
    <div class="center-content">
      <!-- 主内容-->
      <ArticleEditor/>
      <el-divider style="height: 2px; background-color: #7cb305"/>
      <ShowArticle/>
    </div>
    <el-footer class="footer-content">
      <!-- 底部-->
      © {{ new Date().getFullYear() }}
    </el-footer>
  </div>
</template>
<script setup lang="ts">

import ArticleEditor from "../views/articles/ArticleEditor.vue";
import ShowArticle from "../views/articles/ShowArticle.vue";


</script>
<style lang="less" scoped>
.main-content {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;

  .top-content {
    height: 50px;
    background-color: #efadad;
  }

  .center-content {
    flex: 1;
    overflow: auto;
    //background-color: yellow;
  }

  .footer-content {
    height: 50px;
    background-color: #9d9df1;
    text-align: center;
    line-height: 50px;
  }
}
</style>