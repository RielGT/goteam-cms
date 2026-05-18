import { ref, onMounted } from 'vue'

export function useMobileNavigation() {
  const isOpen = ref(false)

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  function toggle() {
    isOpen.value = !isOpen.value
  }

  onMounted(() => {
    // Reinitialize Preline components after mount so offcanvas/collapse
    // components pick up the dynamically rendered markup.
    if (typeof window !== 'undefined' && window.HSStaticMethods) {
      window.HSStaticMethods.autoInit()
    }
  })

  return { isOpen, open, close, toggle }
}
