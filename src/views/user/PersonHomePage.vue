<template>
  <div class="person_home_content">
    <a-card hoverable style="height: 150px; box-shadow: 0px 2px 17px -1px #c4c4c4;">
      <a-card-meta title="测试超" description="看来我没有描述">
        <template #avatar>
          <a-avatar src="https://www.keaitupian.cn/cjpic/frombd/0/253/3498215567/1247959937.jpg" :size="64"/>
        </template>
      </a-card-meta>
      <template #actions>
        <!--todo 跳转到编辑个人信息页 -->
        <a-button type="primary">编辑个人信息</a-button>
      </template>
    </a-card>
    <br/>
    <a-card hoverable class="outer_card" :tab-list="tabListNoTitle" :active-tab-key="noTitleKey"
            @tabChange="key => onTabChange(key, 'noTitleKey')">
      <a-card v-if="noTitleKey === 'mine'" v-for="card in minecards" :key="card.id" hoverable>
        <a-card-meta :title="card.title" :description="card.description">
          <template #avatar>
            <a-avatar :size="64">{{ card.author.charAt(0) }}</a-avatar>
          </template>
        </a-card-meta>
      </a-card>
      <a-card v-else v-for="collect in cardsCollection" :key="collect.id" hoverable>
        <a-card-meta :title="collect.title" :description="collect.description">
          <template #avatar>
            <a-avatar :size="64">{{ collect.author.charAt(0) }}</a-avatar>
          </template>
        </a-card-meta>
      </a-card>
    </a-card>
  </div>

</template>

<script setup lang="ts">
import {ref} from 'vue';

const tabListNoTitle = [
  {
    key: 'mine',
    tab: '我的',
  },
  {
    key: 'collections',
    tab: '收藏',
  },
];

const noTitleKey = ref('app')
const onTabChange = (value: string, type: string) => {
  console.log(value, type);
  if (type === 'key') {
    key.value = value;
  } else if (type === 'noTitleKey') {
    noTitleKey.value = value;
  }
};

const minecards = ref([
  {
    id: 1,
    title: "第三篇文章",
    description: "无需多言3",
    author: "陈俊渝",
    cover: "https://aliyuncdn.antdv.com/logo.png",
    isDisabled: false,
    clickCount: 0,
    likeCount: 0
  },
  {
    id: 2,
    title: "第四篇文章",
    description: "无需多言4",
    author: "杨曜伟",
    cover: "https://avatars.githubusercontent.com/u/31885971?v=4",
    isDisabled: false,
    clickCount: 0,
    likeCount: 0
  },
  {
    id: 3,
    title: "第五篇文章",
    description: "无需多言5",
    author: "陈国汉",
    cover: "https://avatars.githubusercontent.com/u/31885971?v=4",
    isDisabled: false,
    clickCount: 0,
    likeCount: 0
  },
  {
    id: 4,
    title: "第六篇文章",
    description: "无需多言6",
    author: "陈国汉",
    cover: "https://avatars.githubusercontent.com/u/31885971?v=4",
    isDisabled: false,
    clickCount: 0,
    likeCount: 0
  },
]);
const cardsCollection = ref([
  {
    id: 1,
    title: "收藏文章1",
    description: "无需多言3",
    author: "陈俊渝",
    cover: "https://aliyuncdn.antdv.com/logo.png",
    isDisabled: false,
    clickCount: 0,
    likeCount: 0
  },
  {
    id: 2,
    title: "收藏文章2",
    description: "无需多言4",
    author: "杨曜伟",
    cover: "https://avatars.githubusercontent.com/u/31885971?v=4",
    isDisabled: false,
    clickCount: 0,
    likeCount: 0
  },
  {
    id: 3,
    title: "收藏文章3",
    description: "无需多言5",
    author: "陈国汉",
    cover: "https://avatars.githubusercontent.com/u/31885971?v=4",
    isDisabled: false,
    clickCount: 0,
    likeCount: 0
  },
  {
    id: 4,
    title: "第六篇文章",
    description: "无需多言6",
    author: "陈国汉",
    cover: "https://avatars.githubusercontent.com/u/31885971?v=4",
    isDisabled: false,
    clickCount: 0,
    likeCount: 0
  },
]);
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
  height: 360px
}
</style>