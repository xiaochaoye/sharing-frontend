<template>
  <div class="main-content">
    <!-- 头部-->
    <el-menu
        :default-active="routes"
        class="top-content"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
        router
    >
      <el-menu-item index="/write">主页</el-menu-item>
      <el-menu-item index="/read">登录</el-menu-item>
      <el-menu-item index="/">Info</el-menu-item>
      <el-menu-item index="/4">Orders</el-menu-item>
      <el-avatar shape="square" size="medium"
                 src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"/>
    </el-menu>
    <div class="center-content">
      <!-- 主内容-->
      <!--      <ArticleEditor/>-->
      <!--      <el-divider style="height: 2px; background-color: #7cb305"/>-->
      <!--      <ShowArticle/>-->
      <router-view/>
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
import {ref} from 'vue'
import {useRouter} from "vue-router";
import routes from '../config/route.ts'

// const activeIndex = ref('1')
const router = useRouter()
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style lang="less" scoped>
.main-content {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;

  .top-content {
    height: 50px;
    background-color: #53aae7;
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