<template>
  <!-- 外层增加 padding 让导航栏悬浮 -->
  <div class="sticky top-4 z-50 px-4 mb-4">
    <nav class="glass-next rounded-2xl px-6 py-4 flex justify-between items-center shadow-2xl">
      
      <!-- Logo 区 -->
      <router-link to="/" class="group flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
          <span class="text-xl text-white">🎮</span>
        </div>
        <div class="flex flex-col">
          <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 tracking-tight">
            NEXUS
          </span>
          <span class="text-[10px] text-slate-400 tracking-[0.2em] font-bold uppercase">Game Library</span>
        </div>
      </router-link>
      
      <!-- 功能区 -->
      <div class="flex items-center gap-4">
        <!-- 主题切换按钮：拟态开关 -->
        <button 
          @click="toggleTheme()" 
          class="relative w-14 h-8 rounded-full bg-slate-200 dark:bg-slate-800 shadow-inner transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
        >
          <div 
            class="absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center text-xs"
            :class="isDark ? 'translate-x-6 bg-indigo-500 text-white' : 'translate-x-0 text-yellow-500'"
          >
            <span v-if="isDark">🌙</span>
            <span v-else>☀</span>
          </div>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
const isDark = useDark();
const toggleTheme = useToggle(isDark);
</script>