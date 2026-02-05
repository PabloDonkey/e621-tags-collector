<script setup lang="ts">
import { ref } from "vue";
import IconButton from "./IconButton.vue";

const showDrawer = ref(false)

const close = () => {
  showDrawer.value = false
}
</script>

<template>
  <IconButton v-if="!showDrawer"
          @click="showDrawer = true"
          class="open-sidebar-btn"
          aria-label="Open Sidebar">Open Sidebar</IconButton>
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
  top: 224px;
  right: 8px;
  z-index: 9998;
}
.open-sidebar-btn:hover {
  background: rgba(0,0,0,0.18);
}
</style>