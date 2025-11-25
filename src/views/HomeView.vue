<template>
  <div class="container mx-auto px-4 py-8 relative min-h-screen">
    
    <!-- ================= 头部视觉中心 ================= -->
    <header class="relative py-20 mb-12 text-center isolate">
      
      <!-- 1. 背景氛围光 (位于文字后方) -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-32 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none mix-blend-screen"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-20 bg-purple-500/20 blur-[60px] rounded-full pointer-events-none mix-blend-screen animate-pulse"></div>

      <!-- 2. 装饰性 HUD 元素 -->
      <div class="flex justify-center items-center gap-4 mb-4 opacity-60">
        <div class="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500"></div>
        <span class="text-[10px] font-mono tracking-[0.3em] text-cyan-500 uppercase">System Ready // v.2.4.0</span>
        <div class="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500"></div>
      </div>

      <!-- 3. 主标题 (动态流光) -->
      <h1 class="relative text-6xl md:text-8xl font-black tracking-tighter mb-6 z-10">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x bg-[length:200%_auto]">
          INFINITE
        </span>
        <br class="md:hidden" />
        <span class="text-slate-800 dark:text-white drop-shadow-2xl">
           LIBRARY
        </span>
      </h1>

      <!-- 4. 副标题 -->
      <p class="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-medium">
        探索此游戏宇宙。沉浸式体验，
        <span class="text-cyan-500 dark:text-cyan-400">极致流畅</span> 的管理中心。
      </p>

      <!-- 5. 次世代搜索舱 (悬浮交互) -->
      <div class="mt-10 max-w-2xl mx-auto relative group z-20">
        <!-- 搜索框发光边框 (悬浮显示) -->
        <div class="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full opacity-30 group-hover:opacity-100 blur transition duration-500"></div>
        
        <div class="relative flex items-center bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl rounded-full p-2 shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]">
          <!-- 搜索图标 -->
          <div class="pl-4 pr-2 text-slate-400 group-focus-within:text-cyan-500 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          
          <!-- 输入框 -->
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="搜索游戏名称 / ID / 标签..." 
            class="flex-1 bg-transparent border-none outline-none text-slate-800 dark:text-white placeholder-slate-400 h-12 text-lg font-medium"
          >
          
          <!-- 快捷键提示 -->
          <div class="hidden md:flex pr-4">
             <kbd class="hidden sm:inline-block px-2 py-1 text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">CTRL K</kbd>
          </div>

          <!-- 搜索按钮 -->
          <button class="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-colors shadow-lg">
            SEARCH
          </button>
        </div>
      </div>

    </header>

    <!-- ... 下面是原来的分类按钮和游戏列表 (保持不变) ... -->
    
    <!-- 动态分类过滤器 (保持之前的样式，这里省略，请保留你的代码) -->
    <div class="flex flex-wrap gap-3 justify-center mb-12">
        <!-- ...你的分类按钮代码... -->
    </div>

    <!-- 游戏列表 (保持不变) -->
    <div v-if="paginatedGames.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <GameCard 
        v-for="game in paginatedGames" 
        :key="game.id" 
        :game="game" 
        @click="goToDetail"
      />
    </div>
    <!-- ... -->

  </div>
</template>

<script setup lang="ts">
// Script 保持不变
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { gamesData } from '../data/games';
import GameCard from '../components/GameCard.vue';

const router = useRouter();
const searchQuery = ref('');
const selectedCategory = ref('');
const currentPage = ref(1);
const itemsPerPage = 9;

// ... (保留你之前的逻辑代码) ...
const allCategories = computed(() => {
  const cats = new Set<string>();
  gamesData.forEach(g => g.categories.forEach(c => cats.add(c)));
  return Array.from(cats).sort();
});

const filteredGames = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  return gamesData.filter(game => {
    const matchSearch = game.name.toLowerCase().includes(query) || game.id.toLowerCase().includes(query) || game.tags.some(t => t.toLowerCase().includes(query));
    const matchCat = selectedCategory.value === '' || game.categories.includes(selectedCategory.value);
    return matchSearch && matchCat;
  });
});

const totalPages = computed(() => Math.ceil(filteredGames.value.length / itemsPerPage));
const paginatedGames = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredGames.value.slice(start, start + itemsPerPage);
});

const goToDetail = (id: string) => {
  router.push(`/game/${id}`);
};
</script>

<style scoped>
/* 定义流光渐变动画 */
.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
}

@keyframes gradient-x {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>