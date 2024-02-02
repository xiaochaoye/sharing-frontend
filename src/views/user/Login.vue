<template>
  <a-row class="layout" type="flex" justify="center">
    <a-card class="login_card" bodyStyle="height:100%;padding:unset;" hoverable>
      <div class="card_body">
        <div class="login_img">
          <img src="/src/assets/kkbomb.jpg"/>
          <p>分享知识</p>
        </div>
        <div class="login_form">
          <a-form class="form" ref="loginFormRef" layout="vertical" :rules="loginRules" :model="loginForm">
            <a-form-item label="账号:" name="username">
              <a-input v-model:value="loginForm.username" size="large"/>
            </a-form-item>
            <a-form-item label="密码:" name="password">
              <a-input-password v-model:value="loginForm.password" size="large"/>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" size="large" block @click="onSubmit">提交</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </a-card>


  </a-row>
</template>

<script setup lang="ts">
import {reactive, ref, toRaw} from 'vue';
import {useRouter} from 'vue-router';
import {message} from 'ant-design-vue';
import myAxios from "../../plugins/myAxios.ts";

interface formState {
  username: string;
  password: string;
}

const router = useRouter();
const loginFormRef = ref();
const loginForm: formState = reactive({
  username: '',
  password: '',
});
const loginRules = {
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
      message: '密码长度在4~8位之间',
      trigger: 'change',
      min: 4,
      max: 8
    },
  ],
};

const onSubmit = async () => {
  loginFormRef.value.validate().then(() => {
    myAxios.post('/user/login', {
      // data: toRaw(loginForm),
      userAccount: loginForm.username,
      userPassword: loginForm.password
    }).then((res) => {
      console.log(res);
      if (res.code === 0 && res.data) {
        router.push('/write');
        message.success('登录成功')
      } else {
        message.error(res.message);
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
  background: url("src/assets/bg.jpg") repeat;
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
  }
}
</style>