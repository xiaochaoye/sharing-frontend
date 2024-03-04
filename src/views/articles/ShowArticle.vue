<template>
  <div class="article_show_content">
    <el-form label-width="120px">
      <div style="font-size: 20px">{{ title }}</div>
      <v-md-preview :text="text" width="100%" height="100%" style="background-color: #ffffff"></v-md-preview>
    </el-form>
  </div>
</template>

<script setup lang="ts">
//todo 后端接受文章 id 作者 id 来展示文章
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {useRoute} from "vue-router";
import { ElMessage } from "element-plus";

const route = useRoute();

const title = ref('')
const text = ref(`
---
:smile: :copyright:
---
$$\\sum_{i=1}^n a_i=0$$
---
### 每天都要开心呀:smile:
`)

// 获取文章内容
async function fetchArticle() {
  try {
    const response = await myAxios.get('/article/fetch', {
      params: {
        id: route.query.articleId
      }
    });
    text.value = response.data.content;
    title.value = response.data.title;
  } catch (error) {
    ElMessage.error('获取文章卡片数据失败:', error);
  }
}

onMounted(fetchArticle)
</script>

<style lang="less" scoped>
.article_show_content {
  width: 60%;
  height: calc(100% - 20px);
  background-color: #ffffff;
  margin: 20px auto 0 auto;
  overflow: auto;
  opacity: 0.9;
}
</style>