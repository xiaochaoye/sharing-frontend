<template>
  <div class="person_home_content">
    <a-card hoverable style="height: 150px; box-shadow: 0px 2px 17px -1px #c4c4c4;">
      <a-card-meta :title="userName">
        <template #avatar>
          <a-avatar :src="userAvatar" :size="64"/>
        </template>
        <template #description>
          <a-tag color="blue" v-if="userRole == 0">用户</a-tag>
          <a-tag color="red" v-else>管理员</a-tag>
        </template>
      </a-card-meta>

      <template #actions>
        <a-button type="primary" @click="() => { router.push('/edit') }">编辑个人信息</a-button>
      </template>
    </a-card>
    <br/>
    <a-card hoverable class="outer_card" :tab-list="tabList" :active-tab-key="key"
            @tabChange="key => onTabChange(key, 'key')">
      <a-card v-if="key === 'mine'" v-for="card in myArticles" :key="card.id" hoverable>
        <a-card-meta :title="card.title" :description="card.description" @click="onClick(card.id)">
          <template #avatar>
            <a-avatar :size="64">{{ card.author.charAt(0) }}</a-avatar>
          </template>
        </a-card-meta>
      </a-card>

      <a-card v-else v-for="collect in myCollection" :key="collect.id" hoverable>
        <a-card-meta :title="collect.title" :description="collect.description" @click="onClick(collect.id)">
          <template #avatar>
            <a-avatar :size="64">{{ collect.author.charAt(0) }}</a-avatar>
          </template>
        </a-card-meta>
        <template #actions>
          <a-button type="primary" @click="onRemove(collect.id)">移除收藏</a-button>
        </template>
      </a-card>
    </a-card>

  </div>

</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {getCurrentUser} from '../../config/user';
import {useRouter} from "vue-router";
import myAxios from "../../plugins/myAxios.ts";
import {ElMessage} from "element-plus";

const router = useRouter();

const userName = ref('')
const userRole = ref()
const userAvatar = ref('')
const currentUser = ref()

const tabList = [
  {
    key: 'mine',
    tab: '我的',
  },
  {
    key: 'collections',
    tab: '收藏',
  },
];

const key = ref('mine')
const onTabChange = (value: string, type: string) => {
  console.log(value, type);
  if (type === 'key') {
    key.value = value;
  }
};

const myArticles = ref([]);
const myCollection = ref([]);

const fetchMine = () => {
  myAxios.get('/article/mine').then((res) => {
    if (res.code === 0) {
      myArticles.value = res.data
    }
  })
}

const fetchCollection = async () => {
  const loginUser = await getCurrentUser()
  myAxios.get('/article/favourite/get', {
    params: {
      userId: loginUser.id
    }
  }).then((res) => {
    if (res.code === 0) {
      myCollection.value = res.data
    }
  })
}

const onRemove = (id) => {
  myAxios.post('/article/favourite/remove', {
    contentID: id,
    userId: currentUser.value
  }).then(res => {
    if (res.code === 0) {
      fetchCollection()
      ElMessage.success("移除收藏成功！")
    }
  })
}

const onClick = (id: any) => {
  router.push({
    path: '/read',
    query: {
      articleId: id
    }
  })
}

onMounted(async () => {
  const loginUser = await getCurrentUser()
  currentUser.value = loginUser.id
  userName.value = loginUser.username
  userRole.value = loginUser.userRole
  userAvatar.value = loginUser.avatarUrl
  fetchMine()
  await fetchCollection()
})

</script>

<style scoped lang="less">
.person_home_content {
  margin: 30px auto 0;
  background-color: #cdcbcbb0;
  height: calc(100% - 50px);
  padding: 20px;
  box-sizing: border-box;
  max-width: 1000px;
  min-width: 700px;
  opacity: 0.9;
}

.outer_card {
  width: 100%;
  box-shadow: 0px 2px 17px -1px #c4c4c4;
  overflow: auto;
  height: 550px
}
</style>