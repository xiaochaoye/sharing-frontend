<template>
  <a-card class="card-item" v-for="card in cards" :key="card.id" hoverable style="width: 200px; height: 340px">
    <template #actions>
      <a-space>
        <a-button type="success" v-if="clickCount % 2 == 0" :icon="h(LikeOutlined)" @click="increaseLike()"
                  :disabled="isDisabled">
          {{ likeCount }}
        </a-button>
        <a-button type="success" v-if="clickCount % 2 !== 0" :icon="h(LikeTwoTone)" @click="cancelLike()"
                  :disabled="isDisabled">
          {{ likeCount }}
        </a-button>
      </a-space>
      <a-button type="success" :icon="h(ShareAltOutlined)"/>
      <a-button type="success" :icon="h(EllipsisOutlined)"/>
    </template>
  </a-card>
</template>

<script lang="ts" setup>


import {EllipsisOutlined, LikeOutlined, LikeTwoTone, ShareAltOutlined} from "@ant-design/icons-vue";
import {ref, h} from "vue";
const isDisabled = ref(false);
const clickCount = ref(0)
const likeCount = ref(0);
const increaseLike = () => {
  likeCount.value++;
  clickCount.value++;
  isDisabled.value = true;
  setTimeout(() => {
    isDisabled.value = false;
  }, 1000)
}

const cancelLike = () => {
  likeCount.value--;
  clickCount.value--;
  isDisabled.value = true;
  setTimeout(() => {
    isDisabled.value = false;
  }, 1000)
}
</script>

<style scoped lang="less">

</style>