import { onMounted, ref } from 'vue'

declare global {
  namespace globalThis {
    let chrome: any;
  }
}

export function useIcon(iconName: string = 'icon_1024.png') {
  const iconSrc = ref('')

  onMounted(() => {
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      iconSrc.value = chrome.runtime.getURL(iconName)
    } else {
      iconSrc.value = `/${iconName}`
    }
  })

  return { iconSrc }
}
