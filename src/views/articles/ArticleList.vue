<template>
  <div class="article_list_content">
    <a-card class="card-item" v-for="card in cards" :key="card.id" hoverable style="width: 200px; height: 340px">
      <template #cover>
        <img v-if="card.cover == null" style="width: 100%; max-height: 100px; display: inline-block"
             alt="默认封面"
             src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
        <img
            alt="文章封面"
            style="width: 100%; max-height: 150px; display: inline-block"
            :src="card.cover"
        />
      </template>
      <template #actions>
        <setting-outlined key="setting"/>
        <edit-outlined key="edit"/>
        <ellipsis-outlined key="ellipsis"/>
      </template>
      <a-card-meta :description="truncatedDescription(card.description)">
        <template #title>
          <a-typography-link @click="onClick(card.id)">{{ card.title }}</a-typography-link>
        </template>
        <template #avatar>
          <a-avatar :size="50" style="color: #f56a00; background-color: #fde3cf">{{ card.author.charAt(0) }}</a-avatar>
        </template>
      </a-card-meta>
    </a-card>
    <el-empty v-if="cards.length === 0" :image-size="200" style="position:absolute; top:20%; left:43%"/>
  </div>
</template>

<script setup lang="ts">
import {SettingOutlined, EditOutlined, EllipsisOutlined} from '@ant-design/icons-vue';
import {onMounted, ref} from "vue";
import myAxios from '../../plugins/myAxios';
import {useRouter} from "vue-router";

const router = useRouter();

//todo 获取卡片数据后端方法
// 定义响应式数据来存储卡片信息
// const cards = ref([]);
const cards = ref([
  {
    id: 1,
    title: "第一篇文章",
    description: "无需多言1无需多言1无需多言1无需多言1无需多言1无需多言1无需多言1无需多言1无需多言1无需多言1无需多言1无需多言1",
    author: "许曜麟",
    cover: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
  },
  {
    id: 2,
    title: "第二篇文章",
    description: "无需多言2",
    author: "王超",
    cover: "https://aliyuncdn.antdv.com/vue.png"
  },
  {
    id: 3,
    title: "第三篇文章",
    description: "无需多言3",
    author: "陈俊渝",
    cover: "https://aliyuncdn.antdv.com/logo.png"
  },
  {
    id: 4,
    title: "第四篇文章",
    description: "无需多言4",
    author: "杨曜伟",
    cover: "https://avatars.githubusercontent.com/u/31885971?v=4"
  },
  {
    id: 5,
    title: "第五篇文章",
    description: "无需多言5",
    author: "陈国汉",
    cover: "https://avatars.githubusercontent.com/u/31885971?v=4"
  },
  {
    id: 6,
    title: "第六篇文章",
    description: "无需多言6",
    author: "邓丽雯",
    cover: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  },
]);

// 截断超过 10 个字的文章描述
const truncatedDescription = (description: string) => {
  if (description.length > 10) {
    return description.substring(0, 9) + "..."
  } else {
    return description;
  }
}

// 定义获取卡片数据的方法
async function fetchCards() {
  try {
    const response = await myAxios.get('/api/cards');
    cards.value = response.data;
  } catch (error) {
    console.error('获取卡片数据失败:', error);
  }
}

const onClick = (id: any) => {
  router.push({
    path: '/read',
    query: {
      articleId: id
    }
  })
}

// 在组件挂载后获取卡片数据
onMounted(fetchCards);
// onCreated(){}

</script>

<style scoped lang="less">
.article_list_content {
  margin: 30px auto 0;
  background-color: #ffffff;
  height: calc(100% - 50px);
  padding: 20px;
  box-sizing: border-box;
  max-width: 1000px;
  min-width: 700px;
  opacity: 0.9;
  overflow: auto;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.card-item {
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

//.article_list_content {
//  width: 60%;
//  height: calc(100% - 30px);
//  background-color: #ffffff;
//  margin: 20px auto 0 auto;
//  overflow: auto;
//  opacity: 0.9;
//}
</style>