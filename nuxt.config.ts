import { defineNuxtConfig } from "nuxt/config";
import mkcert from "vite-plugin-mkcert";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2026-01-13",
  devtools: { enabled: false },
  modules: [
    [
      "@storyblok/nuxt",
      {
        accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
        apiOptions: {
          /** Set the correct region for your space. Learn more: https://www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
          region: process.env.STORYBLOK_REGION || "eu",
          /** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
          endpoint: process.env.STORYBLOK_API_BASE_URL
            ? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
            : undefined,
        },
      },
    ],
    "@nuxt/eslint",
  ],

  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
        },
      ],
      htmlAttrs: { class: "scroll-smooth" },
      bodyAttrs: {
        class: "bg-paper text-ink dark:bg-ink dark:text-zinc-100 antialiased transition-colors duration-300",
      },
    },
  },

  css: ["~/assets/css/main.css"],

  ssr: true,

  devServer: {
    https: true,
  },

  vite: {
    plugins: [tailwindcss(), mkcert()],
  },
});