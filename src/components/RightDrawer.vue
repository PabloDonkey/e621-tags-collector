<script setup lang="ts">
import { defineEmits } from 'vue'
import { ref } from "vue";

const emit = defineEmits(['update:modelValue'])
const showDrawer = ref(false)

const close = () => {
  showDrawer.value = false
}
</script>

<template>
  <button v-if="!showDrawer"
          @click="showDrawer = true"
          class="open-sidebar-btn"
          aria-label="Open Sidebar">Open Sidebar</button>
  <transition name="drawer-slide">
    <div v-if="showDrawer"
         class="right-drawer"
         @click.self="close">
      <div class="drawer-content">
        <button class="close-btn" @click="close">×</button>
        <slot />
      </div>
    </div>

  </transition>
</template>

<style scoped>
.right-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 340px;
  height: 100vh;
  background: #fff;
  box-shadow: -2px 0 16px rgba(0,0,0,0.18);
  z-index: 9999;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
}

.drawer-content {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  padding: 0;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 1;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform 0.25s cubic-bezier(.4,0,.2,1);
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
}

.open-sidebar-btn {
  position: fixed;
  top: 160px;
  right: 32px;
  z-index: 9998;
  background: rgba(255,255,255,0.3);
  border: none;
  border-radius: 10%;
  width: 36px;
  height: 36px;
  font-size: 20px;
  color: #333;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  transition: background 0.2s;
}
.open-sidebar-btn:hover {
  background: rgba(0,0,0,0.18);
}
</style>