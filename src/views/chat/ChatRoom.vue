<template>
  <el-dialog v-model="state.loginDialogVisible" :close-on-click-modal="false" :show-close="false" title="进入知识问答区"
             width="30%" center>
    <p>请输入你的名字</p>
    <el-input ref="getName" v-model="userInfo.userName"
              @keyup.enter="userInfo.userName === '' ? '' : login(userInfo.userName)"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button :disabled="userInfo.userName === '' ? true : false" @click="login(userInfo.userName)" type="primary">进入</el-button>
      </span>
    </template>
  </el-dialog>

  <div class="chatroom">
    <el-container>

      <el-header>
        <div class="header">
          <div class="headerLeft">
            <a-typography-title :level="2" type="success">{{ state.title }}</a-typography-title>
            <a-typography-title :level="5" type="warning">当前在线人数：{{ state.userList.size }}</a-typography-title>
          </div>
          <div class="headerRight" style="position: relative" @click="handleOpenDrawer()">
            <el-icon size="28px">
              <UserFilled/>
            </el-icon>
            <div class="new" v-show="state.newPrivate"></div>
          </div>
        </div>
      </el-header>
      <el-divider/>
      <el-main id="main">
        <div class="content">
          <div class="message" v-for="(item, index) of state.chatData.value" :key="index">
            <el-text class="tips" type="primary" v-if="item.type === 'tips'">{{ item.content }}</el-text>
            <div v-else :class="item.type === 'me' ? 'messageRight' : 'messageLeft'">
              <!--              <div class="userName" @click="handleOpenDrawer(item)">-->
              <!--                {{ item.userName.charAt(0) }}-->
              <!--              </div>-->
              <a-avatar :size="'default'" style="color: #f56a00; background-color: #fde3cf"
                        @click="handleOpenDrawer(item)">{{
                  item.userName.charAt(0)
                }}
              </a-avatar>
              <div class="messageContent">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </el-main>
      <el-divider/>
      <el-footer>
        <el-input ref="getMessage" v-model="state.message" @keyup.enter="state.message === '' ? '' : send()">
          <template #append>
            <el-button type="success" :disabled="state.message === '' ? true : false" @click="send()">发送消息
            </el-button>
          </template>
        </el-input>
      </el-footer>

    </el-container>
  </div>

  <el-drawer v-model="state.drawer" :show-close="false" style="background-color: #464646;">
    <template #header>
      <a-typography-title :level="2" type="success" style="text-align: center;">用户：{{
          chatUserInfo.chatUserName
        }}
      </a-typography-title>
    </template>
    <div class="userChatContent" id="userChatContent">
      <div class="userMessage" v-for="(item, index) of userChatData.value" :key="index">
        <div :class="item.type === 'me' ? 'messageRight' : 'messageLeft'">
          <div class="userName">{{ item.name }}</div>
          <div class="messageContent">{{ item.content }}</div>
        </div>
      </div>
    </div>
    <template #footer>
      <el-input ref="getPrivate" v-model="state.privateMsg"
                @keyup.enter="state.privateMsg === '' ? '' : handleSendUser()">
        <template #append>
          <el-button type="success" :disabled="state.privateMsg === '' ? true : false" @click="handleSendUser()">发送
          </el-button>
        </template>
      </el-input>
    </template>
  </el-drawer>

</template>

<script setup lang="ts">
import {reactive, ref, onMounted} from "vue";
import {io} from "socket.io-client";
import {UserFilled} from "@element-plus/icons-vue";

const socket = io("ws://localhost:5432");

const getMessage = ref(null);
const getPrivate = ref(null);

// 用户信息
const userInfo = reactive({
  userName: "",
  id: "",
});

// 用户私聊对象
const chatUserInfo = reactive({
  chatUserName: "",
  chatUserId: "",
});

// 用户私聊记录
const userChatData = reactive({
  value: [],
});

// 多出用到的常量
const state = reactive({
  title: "知识交流室",
  Total: 0,
  message: "",
  newPrivate: false,
  privateMsg: "",
  loginDialogVisible: true,
  drawer: false,
  userList: new Map(),
  chatData: {value: []},
  userChatData: new Map(),
});

socket.on("back", (e) => {
  console.log(e);
});

// 监听登录成功事件
socket.on("joined", (e) => {
  console.log(e);
  userInfo.userName = e.userName;
  userInfo.id = e.id;
  e.chatData.forEach((item) => {
    item.type = item.id == userInfo.id ? "me" : "your";
  });
  state.chatData.value = e.chatData;
  boxScroll("main");
  localStorage.setItem("isLogin", String(true));
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
});

// 监听 welcome
socket.on("welcome", ({name, uList}) => {
  // 将当前群聊中的成员保存到userList中
  uList.forEach((item) => {
    const [id, value] = item;
    state.userList.set(id, value);
    console.log(state.userList);
  });
  console.log(name, uList);
  // 在消息卡片中展示欢迎信息
  state.chatData.value.push({
    type: "tips",
    id: Math.random().toString().split(".")[1].slice(0, 10),
    content: "欢迎" + name + "加入群聊~",
  });
  boxScroll("main");
});

// 监听消息的广播
socket.on("message", (e) => {
  const msg = {...e, type: "your"};
  state.chatData.value.push(msg);
  boxScroll("main");
  console.log(state.chatData.value);
});

// 监听私聊消息
socket.on("message-user", (e) => {
  console.log(e);
  if (!state.drawer && e.userId != chatUserInfo.chatUserId)
    state.newPrivate = true;
  const sendUserId = e.userId;
  chatUserInfo.chatUserId = sendUserId;
  chatUserInfo.chatUserName = e.name;
  console.log(chatUserInfo);
  if (!state.userChatData.has(sendUserId)) {
    state.userChatData.set(sendUserId, []);
  }
  userChatData.value = state.userChatData.get(sendUserId) ?? [];
  userChatData.value.push(Object.assign({}, e, {type: "your"}));
  boxScroll("userChatContent");
});

// 监听用户退出
socket.on("quit", (id) => {
  const user = state.userList.get(id);
  console.log(user);
  state.userList.delete(id);
  state.chatData.value.push({
    type: "tips",
    id: Math.random().toString().split(".")[1].slice(0, 10),
    content: user + "退出群聊~",
  });
  boxScroll("main");
  console.log(state.userList);
});

// 发送登录事件
const login = (e) => {
  state.loginDialogVisible = false;
  getMessage.value.focus();
  // console.log(Object.assign({}, e));
  socket.emit("join", e);
};

// 聊天视图滚动
const boxScroll = (id) => {
  let dom = document.getElementById(id);
  setTimeout(() => {
    dom.scrollTop = dom.scrollHeight;
  }, 10);
};

// 发送消息
const send = () => {
  const obj = {
    id: Math.random().toString().split(".")[1].slice(0, 10),
    userName: userInfo.userName,
    content: state.message,
    userId: userInfo.id,
  };
  // 在 chatData 中新增一条数据，表示自己发送的
  const type = "me";
  state.chatData.value.push({type, ...obj});
  // 发出send事件，将消息发送出去
  socket.emit("send", obj);
  // 清空 input box 中的内容
  state.message = "";
  boxScroll("main");
};

// 查看私聊消息
const handleOpenDrawer = (user = chatUserInfo) => {
  chatUserInfo.chatUserName = user.userName || user.chatUserName;
  chatUserInfo.chatUserId = user.userId || user.chatUserId;
  state.drawer = true;
  getPrivate.value.focus();
  state.newPrivate = false;
  userChatData.value = state.userChatData.get(chatUserInfo.chatUserId) ?? [];
  console.log(user);
};

// 发送私聊消息
const handleSendUser = () => {
  const obj = {
    id: Math.random().toString().split(".")[1].slice(0, 10),
    name: userInfo.userName,
    content: state.privateMsg,
    userId: userInfo.id,
    sendUserId: chatUserInfo.chatUserId,
  };
  const type = "me";
  if (!state.userChatData.has(chatUserInfo.chatUserId)) {
    state.userChatData.set(chatUserInfo.chatUserId, []);
  }
  userChatData.value = state.userChatData.get(chatUserInfo.chatUserId) ?? [];
  userChatData.value.push(Object.assign({}, {type}, obj));
  console.log(obj);
  socket.emit("send-user", obj);
  state.privateMsg = "";
  boxScroll("userChatContent");
};

// 验证登录记录
onMounted(() => {
  // const login = localStorage.getItem("isLogin");
  // state.loginDialogVisible = login === "true" ? false : true;
  // if (login === "true") {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   console.log(userInfo);
  //   socket.emit("join", userInfo.userName);
  // }
});
</script>

<style scoped>
.chatroom {
  width: 60%;
  height: calc(100% - 30px);
  background-color: #323644;
  margin: 20px auto 0 auto;
  overflow: auto;
  opacity: 0.9;
}

.chatroom >>> .el-container {
  height: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.tips {
  text-align: center;
}

.messageRight {
  text-align: right;
  margin-right: 10px;
  position: relative;
  align-items: flex-end !important;
}

.messageLeft {
  margin-left: 10px;
  position: relative;
  align-items: flex-start !important;
}

.messageLeft,
.messageRight {
  display: flex;
  flex-direction: column;
}

.messageRight::before {
  content: "";
  position: absolute;
  top: 42px;
  right: 6px;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-left: 8px solid aqua;
  z-index: 2;
}

.messageRight::after {
  content: "";
  position: absolute;
  top: 42px;
  right: 5px;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-left: 8px solid #333;
}

.messageLeft::before {
  content: "";
  position: absolute;
  top: 42px;
  left: 6px;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-right: 8px solid aqua;
  z-index: 2;
}

.messageLeft::after {
  content: "";
  position: absolute;
  top: 42px;
  left: 5px;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-right: 8px solid #333;
}

.messageContent {
  display: inline-block;
  padding: 6px 10px;
  margin: 5px 0 10px;
  border: 1px solid #333;
  background-color: aqua;
}

.messageRight .messageContent {
  margin-right: 20px;
  border-radius: 8px 0 8px 8px;
}

.messageLeft .messageContent {
  margin-left: 20px;
  border-radius: 0 8px 8px 8px;
}

.userName {
  display: inline-block;
  margin: 0 0 5px 0;
  font-size: 12px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #666;
  border-radius: 50%;
  cursor: pointer;
}

.new {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  right: 0;
  bottom: 5px;
}

#userChatContent {
  overflow-y: auto;
  height: 100%;
}
</style>
