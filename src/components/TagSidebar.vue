<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Tag {
  name: string
  selected: boolean
}

const tags = ref<Tag[]>([])
const copyFeedback = ref('')

// Extract tags from the page's #tag-list section
const extractTags = () => {
  try {
    const tagSection = document.querySelector('#tag-list')
    if (!tagSection) {
      console.warn('No #tag-list section found on this page.')
      return
    }

    // Each <li> has data-name="tag_name"
    const liTags = Array.from(tagSection.querySelectorAll('li[data-name]')) as HTMLElement[]
    const extractedTags = liTags
      .map((li) => (li as any).dataset.name)
      .filter((tag): tag is string => !!tag)

    tags.value = extractedTags.map((tag) => ({
      name: tag,
      selected: false,
    }))
  } catch (error) {
    console.error('Error extracting tags:', error)
  }
}

// Toggle tag selection
const toggleTag = (index: number) => {
  if(!tags.value[index]) return
  tags.value[index].selected = !tags.value[index].selected
}

// Copy selected tags to clipboard
const copySelectedTags = async () => {
  const selected = tags.value
    .filter((tag) => tag.selected)
    .map((tag) => tag.name)
    .join(', ')

  if (!selected) {
    copyFeedback.value = 'No tags selected!'
    setTimeout(() => (copyFeedback.value = ''), 2000)
    return
  }

  try {
    await navigator.clipboard.writeText(selected)
    const count = tags.value.filter((tag) => tag.selected).length
    copyFeedback.value = `Copied ${count} tags!`
    setTimeout(() => (copyFeedback.value = ''), 2000)
  } catch (err) {
    console.error('Clipboard error:', err)
    copyFeedback.value = 'Failed to copy tags. Check clipboard permissions.'
    setTimeout(() => (copyFeedback.value = ''), 3000)
  }
}

// Select all tags
const selectAll = () => {
  tags.value.forEach((tag) => (tag.selected = true))
}

// Deselect all tags
const deselectAll = () => {
  tags.value.forEach((tag) => (tag.selected = false))
}

// Refresh tags from page
const refreshTags = () => {
  extractTags()
  copyFeedback.value = 'Tags refreshed!'
  setTimeout(() => (copyFeedback.value = ''), 2000)
}

// Initialize on mount
onMounted(() => {
  extractTags()
})
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h2>🐾 Tag Collector</h2>
    </div>

    <!-- Feedback message -->
    <div v-if="copyFeedback" class="feedback-message">
      {{ copyFeedback }}
    </div>

    <!-- Tags stats -->
    <div class="tag-stats">
      <span>Total: {{ tags.length }}</span>
      <span>Selected: {{ tags.filter((t) => t.selected).length }}</span>
    </div>

    <!-- Tag list -->
    <div ref="tagListPanel" class="tag-list-panel">
      <span
        v-for="(tag, index) in tags"
        :key="`${tag.name}-${index}`"
        class="tag-item"
        :class="{ selected: tag.selected }"
        @click="toggleTag(index)"
      >
        {{ tag.name }}
      </span>

      <div v-if="tags.length === 0" class="empty-state">
        No tags found on this page
      </div>
    </div>

    <!-- Action buttons -->
    <div class="button-group">
      <button class="btn btn-primary" @click="copySelectedTags">
        📋 Copy Selected ({{ tags.filter((t) => t.selected).length }})
      </button>
      <div class="button-row">
        <button class="btn btn-secondary" @click="selectAll">
          ✓ Select All
        </button>
        <button class="btn btn-secondary" @click="deselectAll">
          ✗ Deselect
        </button>
      </div>
      <button class="btn btn-secondary" @click="refreshTags">
        🔄 Refresh
      </button>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0;
  overflow: hidden;
  font-family: system-ui, -apple-system, sans-serif;
}

.sidebar-header {
  padding: 16px;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.feedback-message {
  padding: 8px 12px;
  background: rgba(76, 175, 80, 0.3);
  border: 1px solid rgba(76, 175, 80, 0.5);
  border-radius: 4px;
  font-size: 12px;
  text-align: center;
  margin: 8px;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tag-stats {
  display: flex;
  justify-content: space-around;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 12px;
}

.tag-list-panel {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tag-item {
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.15);
  user-select: none;
  white-space: nowrap;
  transition: all 0.2s ease;
  font-size: 13px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.tag-item:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.tag-item.selected {
  background: #4caf50;
  color: white;
  border-color: #45a049;
  font-weight: 600;
}

.tag-item.selected:hover {
  background: #45a049;
}

.empty-state {
  width: 100%;
  text-align: center;
  padding: 40px 20px;
  opacity: 0.7;
  font-size: 13px;
}

.button-group {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.button-row {
  display: flex;
  gap: 8px;
}

.button-row .btn {
  flex: 1;
}

.btn {
  padding: 10px 12px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-primary {
  background: rgba(255, 255, 255, 0.3);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.btn-primary:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 12px;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

/* Scrollbar styling */
.tag-list-panel::-webkit-scrollbar {
  width: 6px;
}

.tag-list-panel::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.tag-list-panel::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.tag-list-panel::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
