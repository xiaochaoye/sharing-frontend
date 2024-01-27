<template>
  <div class="login" style="height: 100vh; background-color: aqua">
  <div class="login-form">
    <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
    >
      <a-form-item
          label="Username"
          name="username"
          :rules="ValidateRules.name[0]"
      >
        <a-input v-model:value="formState.username" style="height: 50px"/>
      </a-form-item>

      <a-form-item
          label="Password"
          name="password"
          :rules="ValidateRules.name[1]"
      >
        <a-input-password v-model:value="formState.password"/>
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
        <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
      </a-form-item>
    </a-form>
  </div>
  </div>
</template>
<script lang="ts" setup>
import {reactive} from 'vue';

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});

const ValidateRules = reactive({
  name: [
    {required: true, message: 'Please input your username!'},
    {required: true, message: 'Please input your password!'}
  ]
})
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const resetFields = () => {
  console.log("清空")
}
</script>


<style>
.login {
  width: 100%;
  height: 100vh;
  background-color: #1a1a1a;
}
.login-form {
  position: absolute;
  top: 50%;
  width: 300px;
  height: 250px;
  left: 50%;
  background-color: #9fc0b7;
  background-size: 100% auto;
  transform: translate3d(-50%, -50%, 0);
  display: flex;
}

</style>