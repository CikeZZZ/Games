<template>
  <div 
    class="group relative h-full rounded-2xl transition-all duration-500 focus:outline-none"
    @click="$emit('click', game.id)"
  >
    <!-- 卡片背后的动态光晕 (悬浮时出现) -->
    <div class="absolute -inset-0.5 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500 group-hover:duration-200"></div>

    <!-- 卡片主体：应用我们新的 glass-next 类 -->
    <div class="glass-next relative h-full rounded-2xl overflow-hidden flex flex-col bg-white/40 dark:bg-slate-900/40 !border-0">
      
      <!-- 1. 封面区域 (带遮罩和交互) -->
      <div class="h-56 overflow-hidden relative isolate">
        <!-- 图片：悬浮时放大 + 旋转一点点 -->
        <img 
          v-if="game.preview[0]"
          :src="game.preview[0].url" 
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" 
          loading="lazy"
        />
        <div v-else class="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500 font-mono text-xs">NO SIGNAL</div>

        <!-- 渐变遮罩：底部黑色渐变，顶部高光 -->
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90"></div>
        
        <!-- 悬浮时的 Flash 效果 -->
        <div class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"></div>

        <!-- 封面文字：左下角 -->
        <div class="absolute bottom-0 left-0 p-5 w-full">
          <div class="flex justify-between items-end">
            <div>
               <h3 class="text-2xl font-bold text-white tracking-tight drop-shadow-lg group-hover:text-cyan-300 transition-colors">
                 {{ game.name }}
               </h3>
               <p class="text-xs text-cyan-200/80 font-mono mt-1 flex items-center gap-1">
                 <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                 {{ game.developer }}
               </p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 2. 内容区域 -->
      <div class="p-5 flex-1 flex flex-col relative">
        <!-- 标签行 -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span 
            v-for="tag in game.tags.slice(0, 3)" 
            :key="tag" 
            class="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-slate-100/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 group-hover:border-cyan-500/50 group-hover:text-cyan-400 transition-colors"
          >
            {{ tag }}
          </span>
        </div>
        
        <!-- 简介 -->
        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 mb-6 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
          {{ game.intro }}
        </p>
        
        <!-- 底部 Action -->
        <div class="mt-auto flex items-center justify-between pt-4 border-t border-slate-200/20 dark:border-slate-700/50">
           <span class="text-xs font-mono text-slate-400 bg-slate-200/20 px-2 py-0.5 rounded">{{ game.version }}</span>
           
           <button class="text-xs font-bold flex items-center gap-1 text-slate-500 dark:text-slate-400 group-hover:text-cyan-500 transition-all group-hover:translate-x-1">
             LAUNCH <span class="text-lg leading-none">→</span>
           </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Game } from '../data/games';
defineProps<{ game: Game }>();
defineEmits(['click']);
</script>