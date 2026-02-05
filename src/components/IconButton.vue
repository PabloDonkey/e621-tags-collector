<script setup lang="ts">
import { onMounted, ref } from 'vue'

declare global {
  namespace globalThis {
    var chrome: any
  }
}

const iconSrc = ref('')

onMounted(() => {
  if (typeof chrome !== 'undefined' && chrome.runtime) {
    iconSrc.value = chrome.runtime.getURL('icon_1024.png')
  } else {
    iconSrc.value = '/icon_1024.png'
  }
})
</script>

<template>
  <button class="icon-btn" @click="$emit('click')" aria-label="Icon Button">
    <img :src="iconSrc" alt="icon" class="icon-img" />
  </button>
</template>

<style scoped>
.icon-btn {
  background: #2a2832;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: 10%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-img {
  width: 50px;
  height: 50px;
  object-fit: contain;
}
</style>