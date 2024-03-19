<template>
  <div class="content-box">
    <div class="left">
      <el-badge :value="1" class="item" type="primary">
        <el-button>comments</el-button>
      </el-badge>
    </div>
    <div class="article_show_content">
      <el-form label-width="120px">
        <a-typography-title v-text="title" style="margin: 30px"/>
        <a-typography-title style="margin: 30px" :level="5">作者：{{ author }}</a-typography-title>
        <a-divider style="height: 2px; background-color: #000000"/>
        <v-md-preview :text="text" width="100%" height="100%" style="background-color: #ffffff"></v-md-preview>
      </el-form>
    </div>
  </div>

</template>

<script setup lang="ts">
// 后端接受文章 id 来展示文章
import {onMounted, ref} from "vue";
import myAxios from "../../plugins/myAxios.ts";
import {useRoute} from "vue-router";
import {ElMessage} from "element-plus";

const route = useRoute();

const title = ref('')

const text = ref('')

const author = ref('')

// 获取文章内容
async function fetchArticle() {
  try {
    const response = await myAxios.get('article/read', {
      params: {
        id: route.query.articleId
      }
    });
    text.value = response.data.content;
    title.value = response.data.title;
    author.value = response.data.author;
    console.log("文章内容：", text.value)
    console.log("文章标题", title.value)
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
  //margin: 20px auto 0 auto;
  margin: 20px 0 0 0;
  overflow: auto;
  opacity: 0.9;
}

.content-box {
  display: flex;
  justify-content: center;
  border: 1px solid red;
  height: 100%;
  box-sizing: border-box;

  .left {
    margin: 20px 10px 0 0;
    display: flex;
    flex-direction: column;

    span {
      background-color: #ffffff;
      min-width: 50px;
      min-height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px;
      border-radius: 50%;
      cursor: pointer;

      &:hover {
        color: #5ee7df;
      }
    }
  }

}
</style>