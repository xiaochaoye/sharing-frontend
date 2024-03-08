<template>
  <a-row class="layout" type="flex" justify="center">
    <a-card class="login_card" bodyStyle="height:100%;padding:unset;" hoverable>
      <div class="card_body">
        <div class="login_img">
          <img src="/src/assets/kkbomb.jpg"/>
          <p>Knowledge Reshapes Destiny！</p>
          <p>知识分享</p>
        </div>
        <div class="login_form">
          <a-form class="form" ref="loginFormRef" layout="vertical" :rules="inputRules" :model="loginForm"
                  v-show="isVisible">
            <a-form-item label="账号:" name="username">
              <a-input v-model:value="loginForm.username" size="large"/>
            </a-form-item>
            <a-form-item label="密码:" name="password">
              <a-input-password v-model:value="loginForm.password" size="large"/>
            </a-form-item>
            <a style="color: #1890ff" @click="showMe">点击注册</a>
            <a-form-item>
              <a-button type="primary" size="large" block @click="loginSubmit">提交</a-button>
            </a-form-item>
          </a-form>

          <a-form class="form" ref="registerFromRef" layout="vertical" :rules="inputRules" :model="registerForm"
                  v-show="!isVisible">
            <a-page-header sub-title="返回" @back="showMe"/>
            <a-form-item label="账号:" name="username">
              <a-input v-model:value="registerForm.username" size="large"/>
            </a-form-item>
            <a-form-item label="密码:" name="password">
              <a-input-password v-model:value="registerForm.password" size="large"/>
            </a-form-item>
            <a-form-item label="确认密码:" name="password">
              <a-input-password v-model:value="registerForm.check" size="large"/>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" size="large" block @click="registerSubmit">提交</a-button>
            </a-form-item>
          </a-form>

        </div>
      </div>
    </a-card>
  </a-row>
</template>

<script setup lang="ts">

import {reactive, ref} from 'vue';
import {useRouter} from 'vue-router';
import {message} from 'ant-design-vue';
import myAxios from "../../plugins/myAxios.ts";

// 注册框是否可见的变量
const isVisible = ref(true)

// 注册框展示方法
const showMe = () => {
  isVisible.value = !isVisible.value;
}

interface formStateLogin {
  username: string;
  password: string;
}

interface formStateRegister {
  username: string;
  password: string;
  check: string;
}

const router = useRouter();
const loginFormRef = ref();
const registerFromRef = ref();
const loginForm: formStateLogin = reactive({
  username: '',
  password: '',
});

const registerForm: formStateRegister = reactive({
  username: '',
  password: '',
  check: ''
});

// 账号密码校验规则
const inputRules = {
  username: [
    {
      required: true,
      message: '账号在4~8位之间',
      trigger: 'change',
      min: 4,
      max: 8
    },
  ],
  password: [
    {
      required: true,
      message: '密码长度在8~15位之间',
      trigger: 'change',
      min: 8,
      max: 15
    },
  ],
};

// 登录方法
const loginSubmit = async () => {
  loginFormRef.value.validate().then(() => {
    myAxios.post('/user/login', {
      // data: toRaw(loginForm),
      userAccount: loginForm.username,
      userPassword: loginForm.password
    }).then((res) => {
      console.log(res);
      if (res.code === 0 && res.data) {
        router.push('/main');
        message.success('登录成功')
      } else {
        message.error(res.description);
      }
    });
  });
};

// 注册方法
const registerSubmit = async () => {
  registerFromRef.value.validate().then(() => {
    myAxios.post('/user/register', {
      userAccount: registerForm.username,
      userPassword: registerForm.password,
      checkPassword: registerForm.check
    }).then((res) => {
      console.log(res);
      if (res.code === 0 && res.data) {
        router.push('/login');
        message.success('注册成功')
        showMe()
      } else {
        message.error(res.description);
      }
    });
  });
};

</script>

<style lang="less" scoped>
//.alert-content {
//  position: absolute;
//  z-index: 1000;
//  top: 40px;
//}

.layout {
  width: 100%;
  height: 100vh;
  align-items: center;
  background: url("../../assets/bg-login.jpg") repeat;
  position: relative;

  .login_card {
    width: 100%;
    height: 100%;
    max-width: 1000px;
    max-height: 550px;
    border-radius: 10px;
    background: #fff;
    opacity: 0.8;
  }

  .card_body {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }

  .login_img {
    background: #1890ff;
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      padding: 10px;
      background: #fff;
      max-width: 160px;
    }

    p {
      margin: 20px 0;
      font-size: 22px;
      color: #fff;
    }
  }

  .login_form {
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;

    .form {
      width: 100%;
      max-width: 380px;
    }

    .ant-page-header {
      padding: 20px 1px;
    }
  }
}
</style>