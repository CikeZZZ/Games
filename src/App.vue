<template>
  <!-- 1. 全局噪点层 (增加胶片质感) -->
  <div class="bg-noise"></div>

  <!-- 2. 动态深空背景 -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#eef2ff] dark:bg-[#020617] transition-colors duration-500">
    
    <!-- 科技网格线 (Grid) -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

    <!-- 动态光源 (使用 mix-blend-mode 增强色彩融合) -->
    <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/30 dark:bg-purple-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-float-slow"></div>
    <div class="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/30 dark:bg-indigo-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-float-delay"></div>
    
    <!-- 鼠标跟随光斑 (可选，增加氛围) -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-400/10 dark:bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
  </div>

  <div class="relative z-10 min-h-screen flex flex-col font-sans text-slate-800 dark:text-slate-100">
    <NavBar />
    
    <main class="flex-grow container mx-auto px-4 py-8">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="py-10 text-center text-slate-500 text-sm font-medium tracking-wide">
      <p class="glass-next inline-block px-6 py-2 rounded-full text-xs">
        ⚡ POWERED BY LOCAL GAME LIBRARY
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
</script>

<style>
/* 页面切换动画：缩放+淡入 */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
  transform: scale(0.98) translateY(10px);
  filter: blur(10px);
}

/* 浮动动画 */
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, -30px) scale(1.1); }
}
.animate-float-slow {
  animation: float-slow 15s ease-in-out infinite;
}
.animate-float-delay {
  animation: float-slow 20s ease-in-out infinite reverse;
}
</style>