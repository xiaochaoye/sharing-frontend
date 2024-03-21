<template>

  <div class="input-box">
    <el-space wrap size="100">
      <el-input v-model="inputTitle" style="width: 240px" placeholder="按文章标题搜索">
        <template #prefix>
          <el-icon class="el-input__icon">
            <Search/>
          </el-icon>
        </template>
      </el-input>
      <el-button type="primary" :icon="Search" @click="searchTitle">搜索</el-button>
      <a-divider style="height: 30px; background-color: #000000" type="vertical"/>
      <el-input v-model="inputContent" style="width: 240px" placeholder="按文章内容搜索">
        <template #prefix>
          <el-icon class="el-input__icon">
            <Search/>
          </el-icon>
        </template>
      </el-input>
      <el-button type="primary" :icon="Search" @click="searchContent">搜索</el-button>
    </el-space>
  </div>
  <div class="article_list_content">
    <a-card class="card-item" v-for="card in cards" :key="card.id" hoverable style="width: 230px; height: 340px">
      <template #cover>
        <img v-if="card.cover == null || card.cover == ''" style="width: 100%; height: 150px; display: inline-block"
             alt="默认封面"
             src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
        <img
            v-else
            alt="文章封面"
            style="width: 100%; max-height: 150px; display: inline-block"
            :src="card.cover"
        />
      </template>
      <template #actions>
        <a-space>
          <a-button type="success" v-if="card.clickCount % 2 == 0" :icon="h(LikeOutlined)" @click="increaseLike(card)"
                    :disabled="card.isDisabled">{{ card.likeCount }}
          </a-button>
          <a-button type="success" v-if="card.clickCount % 2 !== 0" :icon="h(LikeTwoTone)" @click="cancelLike(card)"
                    :disabled="card.isDisabled">{{ card.likeCount }}
          </a-button>
        </a-space>
        <a-space>
          <a-button type="success" v-if="card.clickCount % 2 == 0" :icon="h(HeartOutlined)"
                    @click="handleCollect(card.id)" :disabled="card.isDisabled">{{ card.collectCount }}
          </a-button>
          <a-button type="success" v-if="card.clickCount % 2 !== 0" :icon="h(HeartTwoTone)"
                    @click="removeCollect(card.id)" :disabled="card.isDisabled">{{ card.collectCount }}
          </a-button>
        </a-space>
        <a-button type="success" :icon="h(EllipsisOutlined)" @click="isVisible = true"/>
      </template>
      <a-card-meta :description="truncatedDescription(card.description)">
        <template #title>
          <a-typography-title :level="5" ellipsis="" @click="onClick(card.id)">{{ card.title }}</a-typography-title>
        </template>
        <template #avatar>
          <a-avatar :size="50" style="color: #f56a00; background-color: #fde3cf">{{ card.author.charAt(0) }}</a-avatar>
        </template>
      </a-card-meta>
      <a-modal v-model:open="isVisible" title="是否删除该文章？" centered @ok="deleteOrNot(card)" cancelText="取消"
               ok-text="删除" :mask="false">
        <p></p>
      </a-modal>
    </a-card>

    <el-empty v-if="cards.length === 0" :image-size="200" style="position:absolute; top:20%; left:43%"/>
  </div>
</template>

<script setup lang="ts">
import {LikeOutlined, HeartOutlined, EllipsisOutlined, LikeTwoTone, HeartTwoTone} from '@ant-design/icons-vue';
import {Search} from "@element-plus/icons-vue";
import {onMounted, ref, h} from "vue";
import myAxios from '../../plugins/myAxios';
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {getCurrentUser} from "../../config/user.ts";

const router = useRouter();

const inputTitle = ref('');
const inputContent = ref('');

const isVisible = ref<boolean>(false);

const searchTitle = async () => {
  const user = await getCurrentUser()
  if (user == null) {
    ElMessage.error("未登录！")
  }
  await myAxios.get('/article/search/title', {
    params: {
      keyword: inputTitle.value
    }
  }).then(response => {
    cards.value = response.data;
  })
}

const searchContent = async () => {
  const user = await getCurrentUser()
  if (user == null) {
    ElMessage.error("未登录！")
  }
  await myAxios.get('/article/search/content', {
    params: {
      keyword: inputContent.value
    }
  }).then(response => {
    cards.value = response.data;
  })
}

// 记录当前点击次数，开始为 1， 数据量不大，采用点击一次点赞，再点一次取消点赞，记录按钮延时为 1s,标志位为isDisabled。
const increaseLike = (index) => {
  myAxios.get('/article/like', {
    params: {
      id: index.id
    }
  })
  index.likeCount++;
  index.clickCount++;
  index.isDisabled = true;
  setTimeout(() => {
    index.isDisabled = false;
  }, 1000)
}

const cancelLike = (index) => {
  myAxios.get('/article/dislike', {
    params: {
      id: index.id
    }
  })
  index.likeCount--;
  index.clickCount--;
  index.isDisabled = true;
  setTimeout(() => {
    index.isDisabled = false;
  }, 1000)
}

const handleCollect = async (id) => {
  const user = await getCurrentUser()
  if (user == null) {
    ElMessage.error("未登录！")
  }
  await myAxios.post('/article/favourite/set', {
    contentID: id,
    userId: user.id
  }).then(response => {
    if (response.code === 0) {
      ElMessage.success("收藏成功")
    } else {
      ElMessage.warning(response.description)
    }
  })
}

const removeCollect = async (id) => {
  const user = await getCurrentUser()
  if (user == null) {
    ElMessage.error("未登录！")
  }
  await myAxios.post('/article/favourite/set', {
    contentID: id,
    userId: user.id
  }).then(response => {
    if (response.code === 0) {
      ElMessage.success("收藏成功")
    } else {
      ElMessage.warning(response.description)
    }
  })
}

const deleteOrNot = (index) => {
  setTimeout(() => {
    isVisible.value = false
  }, 2000)
  myAxios.get('/article/delete', {
    params: {
      id: index.id,
    }
  }).then(response => {
    if (response.code === 0) {
      ElMessage.success(response.description)
    } else {
      ElMessage.error(response.description)
    }
  })
  setTimeout(() => {
    window.location.reload(); // 刷新当前页面
  }, 3000);
}

// 定义响应式数据来存储卡片信息
const cards = ref([]);
// const cards = ref([
//   {
//     id: 1,
//     title: "第一篇文章",
//     description: "无需多言1无需多言1无需多言1无需多言1无需多言1无需多言1无需多言1无需多言1无需多言1无需多言1无需多言1无需多言1",
//     author: "许曜麟",
//     cover: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
//     isDisabled: false,
//     clickCount: 0,
//     likeCount: 0
//   },
//   {
//     id: 2,
//     title: "第二篇文章",
//     description: "无需多言2",
//     author: "王超",
//     cover: "https://aliyuncdn.antdv.com/vue.png",
//     isDisabled: false,
//     clickCount: 0,
//     likeCount: 0
//   },
//   {
//     id: 3,
//     title: "第三篇文章",
//     description: "无需多言3",
//     author: "陈俊渝",
//     cover: "https://aliyuncdn.antdv.com/logo.png",
//     isDisabled: false,
//     clickCount: 0,
//     likeCount: 0
//   },
//   {
//     id: 4,
//     title: "第四篇文章",
//     description: "无需多言4",
//     author: "杨曜伟",
//     cover: "https://avatars.githubusercontent.com/u/31885971?v=4",
//     isDisabled: false,
//     clickCount: 0,
//     likeCount: 0
//   },
//   {
//     id: 5,
//     title: "第五篇文章",
//     description: "无需多言5",
//     author: "陈国汉",
//     cover: "https://avatars.githubusercontent.com/u/31885971?v=4",
//     isDisabled: false,
//     clickCount: 0,
//     likeCount: 0
//   },
//   {
//     id: 6,
//     title: "第六篇文章",
//     description: "无需多言6",
//     author: "邓丽雯",
//     cover: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//     isDisabled: false,
//     clickCount: 0,
//     likeCount: 0
//   },
// ]);

// 截断超过 10 个字的文章描述
const truncatedDescription = (description: string) => {
  if (description.length > 7) {
    return description.substring(0, 5) + "..."
  } else {
    return description;
  }
}


// 定义获取卡片数据的方法
async function fetchCards() {
  try {
    const response = await myAxios.get('/article/cards');
    cards.value = response.data;
    console.log("类型为：", typeof response.data);
    console.log("cards数组的值为:", cards.value)
    console.log("cards数组的长度为：", cards.value.length)
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

</script>

<style scoped lang="less">
.article_list_content {
  margin: 30px auto 0 auto;
  background-color: #ededed;
  height: calc(100% - 136px);
  padding: 20px;
  box-sizing: border-box;
  max-width: 1100px;
  min-width: 710px;
  opacity: 0.95;
  overflow: auto;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.input-box {
  margin: 30px auto 0 auto;
  max-width: 1100px;
  min-width: 710px;
  background-color: #ededed;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.card-item {
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

</style>