import { ref, computed, onMounted, watch } from 'vue'
import type { ThemeMode } from '~/types/website/header'

const STORAGE_KEY = 'header-theme'

// Module-level singleton so all header instances share state
const currentTheme = ref<'light' | 'dark'>('light')
let initialized = false

export function useThemeMode(defaultTheme: ThemeMode = 'auto', allowToggle = true) {
  const isDark = computed(() => currentTheme.value === 'dark')

  function applyTheme(theme: 'light' | 'dark') {
    currentTheme.value = theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function resolveInitialTheme(): 'light' | 'dark' {
    // 1. User persisted preference
    const stored = localStorage.getItem(STORAGE_KEY) as 'light' | 'dark' | null
    if (stored === 'light' || stored === 'dark') return stored

    // 2. Configured default
    if (defaultTheme === 'light' || defaultTheme === 'dark') return defaultTheme

    // 3. System preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'

    return 'light'
  }

  function toggleTheme() {
    if (!allowToggle) return
    const next = currentTheme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem(STORAGE_KEY, next)
    applyTheme(next)
  }

  onMounted(() => {
    if (initialized) return
    initialized = true

    const resolved = resolveInitialTheme()
    applyTheme(resolved)

    // Listen for system preference changes when in "auto" mode
    if (defaultTheme === 'auto') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      mq.addEventListener('change', (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
          applyTheme(e.matches ? 'dark' : 'light')
        }
      })
    }
  })

  // Keep <html> class in sync when currentTheme changes reactively
  watch(isDark, (dark) => {
    if (!import.meta.client) return
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })

  return { currentTheme, isDark, toggleTheme }
}
