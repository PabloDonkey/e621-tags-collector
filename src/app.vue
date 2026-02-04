<script setup lang="ts">
import TagSidebar from "./components/TagSidebar.vue";
import RightDrawer from "./components/RightDrawer.vue";

</script>

<template>
  <div class="app-layout">
    <main class="main-content">
      <!-- Your main page content here -->
    </main>
    <right-drawer>
      <TagSidebar />
    </right-drawer>
  </div>
</template>

<style>
.app-layout {
  display: flex;
  flex-direction: row-reverse;
  height: 100vh;
}

.main-content {
  flex: 1;
  /* Add padding or styles as needed */
}
</style>
