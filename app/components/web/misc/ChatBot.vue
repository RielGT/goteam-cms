<script setup lang="ts">
import { ref, nextTick } from "vue";
import type { ChatBot, ChatReply } from "../types";

const props = withDefaults(
  defineProps<{
    bot: ChatBot;
    quickReplies?: string[];
    replies?: ChatReply[];
    fallback?: string;
  }>(),
  {
    quickReplies: () => [],
    replies: () => [],
    fallback: "Good question — I'll route that to the team.",
  },
);

type ChatMessage = { role: "bot" | "user"; text: string };

const open = ref(false);
const userInput = ref("");
const messagesEl = ref<HTMLElement | null>(null);

const messages = ref<ChatMessage[]>([{ role: "bot", text: props.bot.greeting }]);

function toggle() {
  open.value = !open.value;
}

function botReply(input: string): string {
  const q = input.toLowerCase();
  for (const r of props.replies) {
    if (r.match.some((m) => q.includes(m.toLowerCase()))) return r.text;
  }
  return props.fallback;
}

function scrollChatToBottom() {
  if (messagesEl.value) messagesEl.value.scrollTop = messagesEl.value.scrollHeight;
}

async function sendMessage(text?: string) {
  const content = (text ?? userInput.value).trim();
  if (!content) return;
  messages.value.push({ role: "user", text: content });
  userInput.value = "";
  await nextTick();
  scrollChatToBottom();
  setTimeout(async () => {
    messages.value.push({ role: "bot", text: botReply(content) });
    await nextTick();
    scrollChatToBottom();
  }, 450);
}
</script>

<template>
  <div class="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end gap-3 print:hidden">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-2 scale-95"
    >
      <div
        v-if="open"
        class="w-[20rem] sm:w-[22rem] h-[28rem] flex flex-col rounded-2xl border border-zinc-200 dark:border-white/10 bg-paper/95 dark:bg-ink/95 backdrop-blur shadow-2xl shadow-ink/10 dark:shadow-black/40 overflow-hidden origin-bottom-right"
      >
        <header class="flex items-center justify-between px-4 py-3 border-b border-zinc-200/70 dark:border-white/5">
          <div class="flex items-center gap-2.5">
            <span class="relative inline-flex w-2.5 h-2.5">
              <span class="absolute inset-0 rounded-full bg-brand-green pulse-dot" />
              <span class="relative inline-block w-2.5 h-2.5 rounded-full bg-brand-green" />
            </span>
            <div class="leading-tight">
              <p class="font-display font-semibold text-sm text-ink dark:text-white">{{ bot.name }}</p>
              <p class="font-mono text-[10px] text-zinc-500">{{ bot.tagline }}</p>
            </div>
          </div>
          <button
            aria-label="Close chat"
            class="w-8 h-8 grid place-items-center rounded-full text-zinc-500 hover:text-brand-purple hover:bg-brand-purple/10 transition"
            @click="toggle"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div ref="messagesEl" class="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
          <div
            v-for="(m, i) in messages"
            :key="i"
            class="flex"
            :class="m.role === 'user' ? 'justify-end' : 'justify-start'"
          >
            <div
              class="max-w-[80%] text-sm leading-relaxed px-3.5 py-2 rounded-2xl"
              :class="m.role === 'user'
                ? 'bg-brand-purple text-white rounded-br-md'
                : 'bg-zinc-100 dark:bg-white/5 text-ink dark:text-zinc-100 rounded-bl-md'"
            >
              {{ m.text }}
            </div>
          </div>
        </div>

        <div v-if="messages.length <= 1 && quickReplies.length" class="px-4 pb-2 flex flex-wrap gap-1.5">
          <button
            v-for="q in quickReplies"
            :key="q"
            class="font-mono text-[11px] px-2.5 py-1 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-brand-purple hover:text-brand-purple transition"
            @click="sendMessage(q)"
          >
            {{ q }}
          </button>
        </div>

        <form
          class="flex items-center gap-2 p-3 border-t border-zinc-200/70 dark:border-white/5"
          @submit.prevent="sendMessage()"
        >
          <input
            v-model="userInput"
            type="text"
            placeholder="Ask anything…"
            class="flex-1 bg-zinc-100 dark:bg-white/5 text-sm px-3.5 py-2 rounded-full text-ink dark:text-zinc-100 placeholder:text-zinc-500 outline-none border border-transparent focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition"
          >
          <button
            type="submit"
            aria-label="Send message"
            class="w-9 h-9 grid place-items-center rounded-full bg-brand-purple text-white hover:bg-ink dark:hover:bg-white dark:hover:text-ink transition disabled:opacity-40"
            :disabled="!userInput.trim()"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </Transition>

    <button
      :aria-label="open ? 'Close chat assistant' : 'Open chat assistant'"
      class="relative w-14 h-14 grid place-items-center rounded-full bg-brand-purple text-white shadow-xl shadow-brand-purple/30 hover:-translate-y-0.5 hover:bg-ink dark:hover:bg-white dark:hover:text-ink transition"
      @click="toggle"
    >
      <span
        v-if="!open"
        class="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-brand-green ring-2 ring-paper dark:ring-ink pulse-dot"
        aria-hidden="true"
      />
      <svg v-if="!open" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  </div>
</template>
