<template>
  <div class="content-box">
    <div class="left">
      <el-badge :value="likeCount" class="item" type="primary">
        <el-button @click="increaseLike">
          <el-icon :size="20">
            <CircleCheck/>
          </el-icon>
        </el-button>
      </el-badge>
      <el-badge :value="collectCount" class="item" type="primary">
        <el-button @click="handleCollect">
          <el-icon :size="20">
            <Star/>
          </el-icon>
        </el-button>
      </el-badge>
      <el-button @click="copyUrl">
        <el-icon :size="20">
          <Share/>
        </el-icon>
      </el-button>
    </div>
    <div class="article_show_content">
      <el-form label-width="120px">
        <a-typography-title v-text="title" style="margin: 30px"/>
        <a-typography-paragraph style="margin: 30px">
          <blockquote>{{ description }}</blockquote>
        </a-typography-paragraph>
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
import {CircleCheck, Share, Star} from "@element-plus/icons-vue";
import {getCurrentUser} from "../../config/user.ts";

const route = useRoute();

const title = ref('')
const description = ref('')
const text = ref('')
const author = ref('')
const likeCount = ref('')
const collectCount = ref('')
const flag = ref(0)

const copyUrl = () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    ElMessage.success("复制链接成功！")
  }).catch((error) => {
    ElMessage.warning(error)
  })
}

const increaseLike = async () => {
  const user = await getCurrentUser()
  if (user == null) {
    ElMessage.error("未登录！")
    return
  }
  if (flag.value >= 1) {
    ElMessage.error("你已经点赞过该文章！")
    return
  }
  myAxios.get('/article/like', {
    params: {
      id: route.query.articleId
    }
  })
  likeCount.value = likeCount.value + 1
  flag.value++
}

const handleCollect = async () => {
  const user = await getCurrentUser()
  if (user == null) {
    ElMessage.error("未登录！")
  }
  await myAxios.post('/article/favourite/set', {
    contentID: route.query.articleId,
    userId: user.id
  }).then(response => {
    if (response.code === 0) {
      ElMessage.success("收藏成功")
    } else {
      ElMessage.warning(response.description)
    }
  })
}

// 获取文章内容
async function fetchArticle() {
  try {
    const response = await myAxios.get('article/read', {
      params: {
        id: route.query.articleId
      }
    });
    text.value = response.data.content;
    description.value = response.data.description;
    title.value = response.data.title;
    author.value = response.data.author;
    likeCount.value = response.data.likeCount;
    collectCount.value = response.data.collectCount;
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
  height: 100%;
  box-sizing: border-box;

  .left {
    margin: 30px 30px 0 0;
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

    .item {
      margin-bottom: 20px;

    }

  }

}
</style>