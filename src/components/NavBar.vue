<template>
  <div class="sticky top-0 z-50 px-4 pt-4 mb-4">
    <nav class="glass-next rounded-2xl px-4 md:px-6 py-3 shadow-2xl transition-all duration-300 relative">
      
      <div class="flex justify-between items-center">
        <!-- 1. 左侧：Logo & 品牌 -->
        <router-link to="/" class="group flex items-center gap-3 z-50">
          <div class="relative w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200/50 dark:border-white/10 group-hover:border-cyan-500/50 transition-colors">
            <div class="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span class="text-2xl relative z-10 transform group-hover:scale-110 transition-transform">🎮</span>
          </div>
          <div class="flex flex-col">
            <span class="text-lg font-black tracking-tight text-slate-800 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              Cike GAMES
            </span>
            <div class="flex items-center gap-1.5">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">ONLINE</span>
            </div>
          </div>
        </router-link>

        <!-- 2. 中间：随机推荐按钮 (桌面端) -->
        <div class="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
          <button 
            @click="jumpToRandomGame"
            v-ripple
            class="glass-btn px-6 py-2 rounded-full flex items-center gap-2 group hover:text-cyan-600 dark:hover:text-cyan-400"
          >
            <span class="group-hover:animate-spin">🎲</span> 
            <span>随机推荐</span>
          </button>
        </div>
        
        <!-- 3. 右侧：功能按钮区 -->
        <div class="flex items-center gap-4 z-50">
          
          <!-- 主题切换按钮 (绑定了高级动画函数) -->
          <button 
            @click="toggleThemeWithTransition" 
            class="relative w-12 h-7 rounded-full bg-slate-200 dark:bg-slate-700 shadow-inner transition-colors duration-500 focus:outline-none ring-1 ring-slate-900/5 dark:ring-white/10 overflow-hidden cursor-pointer"
            title="切换日间/夜间模式"
          >
            <!-- 背景装饰 -->
            <div class="absolute inset-0 opacity-20 bg-gradient-to-r from-orange-300 to-yellow-300 dark:from-indigo-900 dark:to-blue-900 transition-opacity duration-500"></div>

            <!-- 滑块图标 (保留你的旋转动画) -->
            <div 
              class="absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center text-[10px] z-10"
              :class="[
                'transition-all duration-500 cubic-bezier(0.68, -0.55, 0.265, 1.55)', 
                isDark ? 'translate-x-5 rotate-[360deg] bg-indigo-500 text-white' : 'translate-x-0 rotate-0 text-amber-500'
              ]"
            >
              <span v-if="isDark" class="scale-90">🌙</span>
              <span v-else class="scale-110">☀</span>
            </div>
          </button>

          <!-- 手机端汉堡菜单按钮 -->
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <span v-if="!isMobileMenuOpen">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </span>
            <span v-else>
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </span>
          </button>
        </div>
      </div>

      <!-- 4. 手机端下拉菜单 -->
      <transition 
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 -translate-y-2 scale-95"
      >
        <div v-if="isMobileMenuOpen" class="md:hidden mt-4 pt-4 border-t border-slate-200/50 dark:border-white/10">
          <div class="flex flex-col gap-2">
            <button 
              @click="jumpToRandomGame"
              class="px-4 py-3 rounded-xl text-left font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/5 hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 transition-all flex items-center justify-between group"
            >
              <span class="flex items-center gap-2"><span class="group-hover:animate-spin">🎲</span> 随机推荐</span>
              <span class="text-slate-300 group-hover:text-white transition-colors">→</span>
            </button>
          </div>
        </div>
      </transition>

    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { gamesData } from '../data/games';

const isDark = useDark();
// 获取原始切换函数，用于在动画内部调用
const toggleDarkRaw = useToggle(isDark);
const router = useRouter();
const isMobileMenuOpen = ref(false);

const jumpToRandomGame = () => {
  isMobileMenuOpen.value = false;
  if (gamesData.length === 0) return alert("暂无数据");
  const randomId = gamesData[Math.floor(Math.random() * gamesData.length)].id;
  router.push(`/game/${randomId}`);
};

// ==================== 核心：扩散动画逻辑 ====================
const toggleThemeWithTransition = async (event: MouseEvent) => {
  const x = event.clientX;
  const y = event.clientY;
  
  // 计算覆盖全屏所需的半径
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );

  // 如果浏览器不支持 View Transition，直接切换
  // @ts-ignore
  if (!document.startViewTransition) {
    toggleDarkRaw();
    return;
  }

  // 启动过渡
  // @ts-ignore
  const transition = document.startViewTransition(async () => {
    toggleDarkRaw();
    await nextTick();
  });

  // 等待伪元素准备好，然后执行动画
  await transition.ready;

  // 执行圆形扩散动画：新视图(New)覆盖旧视图(Old)
  document.documentElement.animate(
    {
      clipPath: [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ],
    },
    {
      duration: 500,
      easing: 'ease-in',
      pseudoElement: '::view-transition-new(root)', // 指定动画作用于“新视图”
    }
  );
};
</script>