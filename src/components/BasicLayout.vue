<template>
  <div class="main-content">
    <!-- 头部-->
    <div class="top-content">
      <div style="width: 1200px; background-color: #1a1a1a; height: 100%"></div>
      <el-menu
          :default-active="routes"
          class="top"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
      >
        <el-menu-item index="/write">写文章页</el-menu-item>
        <el-menu-item index="/read">读文章页</el-menu-item>
        <el-menu-item index="/edit">编辑个人信息</el-menu-item>
        <el-menu-item index="/login">登录页</el-menu-item>
      </el-menu>
      <div>
        <!--        <input type="text" placeholder="请输入内容"/>-->
        <el-dropdown @command="choosePage">
          <el-avatar shape="square" size="medium"
                     src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"/>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="UserFilled" command="/edit">个人主页</el-dropdown-item>
              <el-dropdown-item :icon="Promotion" command="/logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

    </div>
    <div class="center-content">
      <!-- 主内容-->
      <router-view/>
    </div>
    <el-footer class="footer-content">
      <!-- 底部-->
      © {{ new Date().getFullYear() }} 超——知识分享平台
    </el-footer>
  </div>
</template>

<script setup lang="ts">
import routes from '../config/route.ts'
import {UserFilled, Promotion} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";

const router = useRouter();
const choosePage = (command: any) => {
  router.push(command)
}
</script>

<style lang="less" scoped>
.main-content {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;

  .top-content {
    display: flex;
    justify-content: space-between;
    background-color: #53aae7;
    align-items: center;
    padding-right: 20px;
    box-sizing: border-box;
  }

  .top {
    height: 50px;
    background-color: #53aae7;
    flex: 1;
  }

  .center-content {
    flex: 1;
    overflow: auto;
    background: url("/src/assets/bg-whole.jpg") no-repeat;
    background-size: 100% 100%;
  }

  .footer-content {
    height: 50px;
    background-color: #9d9df1;
    text-align: center;
    line-height: 50px;
  }
}
</style>