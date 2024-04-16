<template>
  <div class="main-content">
    <!-- 头部-->
    <div class="top-content">
      <div class="icon">
        <el-image src="/src/assets/knowledge.png" @click="goToHomePage"/>
        <el-link style="text-align: center; font-size: 20px" @click="goToHomePage" :underline="false">知识分享</el-link>
      </div>
      <el-menu :default-active="routes" class="top" mode="horizontal" background-color="#545c64" text-color="#fff"
               active-text-color="#ffd04b" router>
        <el-menu-item index="/write">写文章</el-menu-item>
        <el-menu-item index="/login">登录页</el-menu-item>
        <el-menu-item index="/chat">聊聊天</el-menu-item>
      </el-menu>

      <div>
        <el-dropdown @command="choosePage">
          <el-avatar shape="square" size="medium"
                     :src="avatarImage"/>
          <template #dropdown>
            <el-dropdown-menu v-if="showMe">
              <el-dropdown-item :icon="UserFilled" command="/user">个人主页</el-dropdown-item>
              <el-dropdown-item :icon="Tools" v-if="isAdmin" command="/manage">用户管理</el-dropdown-item>
              <el-dropdown-item :icon="Promotion" command="/logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
            <a-tooltip v-if="showMe === false" placement="bottomRight">登录体验完整功能</a-tooltip>
          </template>
        </el-dropdown>
      </div>
    </div>

    <div class="center-content">
      <!-- 主内容-->
      <router-view></router-view>
    </div>

    <el-footer class="footer-content">
      <!-- 底部-->
      © {{ new Date().getFullYear() }} 超——知识分享平台
    </el-footer>
  </div>
</template>

<script setup lang="ts">
import routes from '../config/route.ts'
import {UserFilled, Promotion, Tools} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {ElMessage} from "element-plus";
import {getCurrentUser} from "../config/user.ts";
import {onMounted, ref} from "vue";

const router = useRouter();

const avatarImage = ref<string>('https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png')

const showMe = ref(false)

const isAdmin = ref(false)

// 获取头像图片和是否显示头像下拉方法
const myAvatarImage = async () => {
  const loginUser = await getCurrentUser();
  if (loginUser !== null) {
    showMe.value = true;
  }
  if (loginUser.userRole == 1) {
    isAdmin.value = true
  }
  console.log('loginUser:', loginUser)
  avatarImage.value = loginUser ? loginUser.avatarUrl : 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png';
}

// 切换界面的方法
const choosePage = (command: any) => {
  if (command == "/logout") {
    ElMessage.success("退出成功")
    myAxios.post('/user/logout')
    router.push('/list')
    window.location.reload()
  } else {
    router.push(command)
  }
}

// 回到主页方法
const goToHomePage = () => {
  router.push('/');
};

// 组件挂载后执行异步操作,用以获取头像图片
onMounted(async () => {
  await myAvatarImage()
})

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
    //background: linear-gradient(to right, #79e8e1 0%, #b490ca 100%, #5ee7df 0%);
    background-image: linear-gradient(to right, #79e8e1, #53aae7, #79e8e1);
    align-items: center;
    padding-right: 20px;
    box-sizing: border-box;
  }

  .top {
    height: 50px;
    background-color: rgba(0, 0, 0, 0);
    flex: 1;
  }

  .icon {
    width: 140px;
    height: 100%;
    margin: 0px 20px 0 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  .center-content {
    flex: 1;
    overflow: auto;
    background: url("/src/assets/bg-whole.jpg") no-repeat;
    background-size: 100% 100%;
  }

  .footer-content {
    height: 50px;
    //background-color: #9d9df1;
    background-image: linear-gradient(to right, #79e8e1, #53aae7, #79e8e1);
    text-align: center;
    line-height: 50px;
  }
}
</style>