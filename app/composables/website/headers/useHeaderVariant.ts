import type { Component, AsyncComponentLoader } from 'vue'
import { computed, defineAsyncComponent } from 'vue'
import type { Header } from '~/types/website/header'

const variantMap: Record<string, AsyncComponentLoader> = {
  classic: () => import('~/storyblok/website/headers/variants/ClassicHeader.vue'),
  mega_menu: () => import('~/storyblok/website/headers/variants/MegaMenuHeader.vue'),
  utility_topbar: () => import('~/storyblok/website/headers/variants/UtilityTopbarHeader.vue'),
  minimal_cta: () => import('~/storyblok/website/headers/variants/MinimalCtaHeader.vue'),
}

export function useHeaderVariant(blok: Header) {
  const variantComponent = computed<Component>(() => {
    const loader = variantMap[blok.variant] ?? variantMap['classic']
    if (!loader) {
      console.warn(`[WebsiteHeader] Unknown variant "${blok.variant}", falling back to "classic".`)
      return {} as Component
    }
    return defineAsyncComponent(loader)
  })

  return { variantComponent }
}
