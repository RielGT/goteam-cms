import { computed } from 'vue'
import type { Header } from '~/types/website/header'

export function useHeaderStyles(blok: Header) {
  const themeStyles = computed(() => {
    const vars: Record<string, string> = {}

    const set = (key: string, value: string | undefined) => {
      if (value) vars[key] = value
    }

    // Light theme CSS custom properties
    set('--header-light-bg', blok.light_background_color)
    set('--header-light-nav-text', blok.light_nav_text_color)
    set('--header-light-nav-hover', blok.light_nav_hover_color)
    set('--header-light-cta', blok.light_cta_color)
    set('--header-light-border', blok.light_border_color)
    set('--header-light-dropdown-bg', blok.light_dropdown_background)
    set('--header-light-dropdown-text', blok.light_dropdown_text)
    set('--header-light-mobile-bg', blok.light_mobile_menu_background)

    // Dark theme CSS custom properties
    set('--header-dark-bg', blok.dark_background_color)
    set('--header-dark-nav-text', blok.dark_nav_text_color)
    set('--header-dark-nav-hover', blok.dark_nav_hover_color)
    set('--header-dark-cta', blok.dark_cta_color)
    set('--header-dark-border', blok.dark_border_color)
    set('--header-dark-dropdown-bg', blok.dark_dropdown_background)
    set('--header-dark-dropdown-text', blok.dark_dropdown_text)
    set('--header-dark-mobile-bg', blok.dark_mobile_menu_background)

    return vars
  })

  return { themeStyles }
}
