import type { ISbStoryData } from '@storyblok/js'

export interface SbLink {
  id: string
  url: string
  linktype: 'story' | 'url' | 'email' | 'asset'
  fieldtype: string
  cached_url: string
}

export interface SbAsset {
  id: number
  alt: string
  name: string
  focus: string
  title: string
  filename: string
  copyright: string
  fieldtype: string
}

export interface HeaderNavItem {
  _uid: string
  component: 'HeaderNavItem'
  label: string
  link: SbLink
  icon: string
  badge: string
  description: string
  children: HeaderNavItem[]
  open_in_new_tab: boolean
}

export interface HeaderButton {
  _uid: string
  component: 'HeaderButton'
  label: string
  link: SbLink
  style: 'primary' | 'secondary' | 'ghost' | 'outline' | 'icon'
  icon: string
  show_icon: boolean
}

export interface HeaderPromoCard {
  _uid: string
  component: 'HeaderPromoCard'
  title: string
  description: string
  image: SbAsset
  link: SbLink
  button_label: string
}

export interface HeaderUtilityItem {
  _uid: string
  component: 'HeaderUtilityItem'
  label: string
  icon: string
  link: SbLink
}

export type ThemeMode = 'light' | 'dark' | 'auto'

export interface ThemeConfiguration {
  theme_mode: ThemeMode
  allow_theme_toggle: boolean
  default_theme: ThemeMode

  light_background_color: string
  light_nav_text_color: string
  light_nav_hover_color: string
  light_cta_color: string
  light_border_color: string
  light_dropdown_background: string
  light_dropdown_text: string
  light_mobile_menu_background: string

  dark_background_color: string
  dark_nav_text_color: string
  dark_nav_hover_color: string
  dark_cta_color: string
  dark_border_color: string
  dark_dropdown_background: string
  dark_dropdown_text: string
  dark_mobile_menu_background: string
}

export type HeaderVariant = 'classic' | 'mega_menu' | 'utility_topbar' | 'minimal_cta'

export interface Header extends ThemeConfiguration {
  _uid: string
  component: 'WebsiteHeader'

  variant: HeaderVariant

  // Branding
  brand_image: SbAsset
  brand_text: string
  show_brand_image: boolean
  show_brand_text: boolean
  brand_link: SbLink

  // Navigation
  nav_items: HeaderNavItem[]

  // CTAs
  cta_buttons: HeaderButton[]
  action_buttons: HeaderButton[]

  // Utility
  utility_links: HeaderUtilityItem[]

  // Feature toggles
  show_promo_card: boolean
  promo_card: HeaderPromoCard[]
  show_search: boolean
  show_auth_buttons: boolean
  show_language_switcher: boolean
  show_social_links: boolean

  // Behavior
  enable_sticky: boolean
  enable_shadow: boolean
  enable_mobile_menu: boolean
  enable_transparent_header: boolean
}

export type StoryblokStory<T> = ISbStoryData & { content: T }
