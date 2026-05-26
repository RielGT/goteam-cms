// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    files: ['app/storyblok/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    files: ['app/components/web/**/*.vue'],
    rules: {
      // These components render trusted, internally-authored HTML (SVG icons,
      // syntax-highlighted code snippets, headline markup), so v-html is intentional.
      'vue/no-v-html': 'off',
    },
  },
)
