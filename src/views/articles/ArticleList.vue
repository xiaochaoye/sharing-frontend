<template>
  <div class="article_list_content">
    <a-card v-for="card in cards" :key="card.id" hoverable style="width: 300px">
      <template #cover>
        <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      </template>
      <template #actions>
        <setting-outlined key="setting"/>
        <edit-outlined key="edit"/>
        <ellipsis-outlined key="ellipsis"/>
      </template>
      <a-card-meta :title="card.title" :description="card.description">
        <template #avatar>
          <a-avatar src="https://joeschmoe.io/api/v1/random"/>
        </template>
      </a-card-meta>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {SettingOutlined, EditOutlined, EllipsisOutlined} from '@ant-design/icons-vue';
import {onMounted, ref} from "vue";
import myAxios from '../../plugins/myAxios';

//todo 获取卡片数据后端方法
// 定义响应式数据来存储卡片信息
const cards = ref([]);

// 定义获取卡片数据的方法
async function fetchCards() {
  try {
    const response = await myAxios.get('/api/cards');
    cards.value = response.data;
  } catch (error) {
    console.error('获取卡片数据失败:', error);
  }
}

// 在组件挂载后获取卡片数据
onMounted(fetchCards);

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
}

.article_list_content {
  width: 60%;
  height: calc(100% - 30px);
  background-color: #ffffff;
  margin: 20px auto 0 auto;
  overflow: auto;
  opacity: 0.9;
}
</style>