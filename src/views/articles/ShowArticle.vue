<template>
  <div class="content">
    <v-md-preview :text="text" width="100%" height="100%" style="background-color: #ffffff"></v-md-preview>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const text = ref(`
---
:smile: :copyright:
---
$$\\sum_{i=1}^n a_i=0$$
---
`)
</script>

<style lang="less" scoped>
.content {
  width: 60%;
  height: calc(100% - 20px);
  background-color: #ffffff;
  margin: 20px auto 0 auto;
  overflow: auto;
  opacity: 0.9;
}
</style>