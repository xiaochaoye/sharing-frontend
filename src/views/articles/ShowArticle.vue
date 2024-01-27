<template>
  <v-md-preview :text="text" width="800px" height="400px"></v-md-preview>
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

<style scoped>

</style>