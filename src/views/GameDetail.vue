<template>
  <div class="relative min-h-screen pb-20">
    
    <!-- ================= 1. 沉浸式背景层 ================= -->
    <!-- 使用游戏第一张预览图作为全屏模糊背景，营造氛围 -->
    <div v-if="game" class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-slate-50/95 to-slate-50 dark:from-slate-950/80 dark:via-slate-950/90 dark:to-[#020617] z-10"></div>
      <img 
        :src="game.preview[0]?.url" 
        class="w-full h-full object-cover blur-[60px] opacity-60 dark:opacity-40 scale-110 transition-all duration-1000"
      />
    </div>

    <div v-if="game" class="container mx-auto px-4 relative z-10 pt-6">
      
      <!-- 顶部导航栏 (返回按钮) -->
      <button 
        @click="$router.back()" 
        class="group mb-8 flex items-center gap-2 px-5 py-2.5 rounded-full glass-next text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all hover:pl-3"
      >
        <svg class="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        <span class="font-bold text-sm tracking-wide">BACK TO LIBRARY</span>
      </button>

      <!-- ================= 2. 英雄区域 (Hero Section) ================= -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 animate-fade-in-up">
        
        <!-- 左侧：3D 悬浮封面 -->
        <div class="lg:col-span-4 xl:col-span-3 flex flex-col gap-6">
          <div class="relative group perspective-1000">
            <!-- 发光背板 -->
            <div class="absolute -inset-1 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-2xl blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
            
            <!-- 封面图 -->
            <div class="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:rotate-y-6 group-hover:scale-[1.02]">
              <img :src="game.preview[0]?.url" class="w-full h-full object-cover" />
              <!-- 玻璃质感光泽 -->
              <div class="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
            </div>
          </div>

          <!-- 快速信息胶囊 -->
          <div class="glass-next p-5 rounded-2xl space-y-4">
            <div class="flex justify-between items-center border-b border-slate-200/50 dark:border-white/10 pb-3">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Version</span>
              <span class="text-sm font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">{{ game.version }}</span>
            </div>
            <div class="flex justify-between items-center border-b border-slate-200/50 dark:border-white/10 pb-3">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Developer</span>
              <span class="text-sm font-bold text-slate-700 dark:text-slate-200 truncate max-w-[150px]">{{ game.developer }}</span>
            </div>
             <div class="flex justify-between items-center">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">ID</span>
              <span class="text-xs font-mono text-slate-500">{{ game.id }}</span>
            </div>
          </div>
        </div>

        <!-- 右侧：核心信息与展示 -->
        <div class="lg:col-span-8 xl:col-span-9 flex flex-col">
          
          <!-- 标题头 -->
          <div class="mb-8">
            <div class="flex flex-wrap gap-2 mb-4">
               <span v-for="tag in game.tags" :key="tag" class="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/5">
                 #{{ tag }}
               </span>
            </div>
            <h1 class="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-4 drop-shadow-xl">
              {{ game.name }}
            </h1>
            <p class="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-3xl">
              {{ game.intro }}
            </p>
          </div>

          <!-- 剧院模式：媒体轮播 -->
          <div class="glass-next p-2 rounded-2xl mb-8 group">
            <div class="relative aspect-video rounded-xl overflow-hidden bg-black shadow-inner">
              <!-- 主显示区 -->
              <transition name="fade" mode="out-in">
                 <img 
                   :key="activeMedia"
                   :src="activeMedia" 
                   class="w-full h-full object-cover"
                 />
              </transition>
              
              <!-- 视频播放按钮覆盖层 (如果类型是视频) -->
              <div v-if="game.preview[activeMediaIndex]?.type === 'video'" class="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer hover:bg-black/30 transition">
                 <div class="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/50">
                   <span class="text-white text-2xl">▶</span>
                 </div>
              </div>
            </div>

            <!-- 略缩图条 -->
            <div class="flex gap-3 mt-3 overflow-x-auto pb-2 px-1 custom-scrollbar">
               <div 
                 v-for="(media, idx) in game.preview" 
                 :key="idx"
                 @click="activeMediaIndex = idx"
                 :class="['relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border-2', activeMediaIndex === idx ? 'border-cyan-500 scale-105 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'border-transparent opacity-60 hover:opacity-100']"
               >
                 <img :src="media.url" class="w-full h-full object-cover" />
                 <!-- 视频标识 -->
                 <div v-if="media.type === 'video'" class="absolute inset-0 flex items-center justify-center bg-black/50">
                   <span class="text-white text-[10px]">VIDEO</span>
                 </div>
               </div>
            </div>
          </div>

          <!-- 布局：介绍与下载并排 -->
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            <!-- 详细介绍 + 更新日志 -->
            <div class="space-y-8">
              <div class="glass-next p-8 rounded-2xl">
                <h3 class="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
                  <span class="text-cyan-500">▍</span> 游戏详情
                </h3>
                <div class="prose prose-slate dark:prose-invert max-w-none text-sm leading-7 text-slate-600 dark:text-slate-300">
                  <p class="whitespace-pre-line">{{ game.description }}</p>
                </div>
              </div>

              <div class="glass-next p-8 rounded-2xl border-l-4 !border-l-purple-500">
                <h3 class="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
                  <span class="text-purple-500">⚡</span> 最新动态
                </h3>
                <div class="bg-slate-100 dark:bg-black/20 p-4 rounded-xl font-mono text-xs text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">
                  {{ game.updates }}
                </div>
              </div>
            </div>

            <!-- 下载控制台 -->
            <div class="flex flex-col gap-6">
              <div class="glass-next p-8 rounded-2xl relative overflow-hidden">
                <!-- 装饰背景 -->
                <div class="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                </div>

                <h3 class="text-2xl font-black mb-6 text-slate-800 dark:text-white flex items-center gap-3">
                  📥 下载中心
                </h3>

                <div class="space-y-6">
                  <div v-for="platform in game.downloads" :key="platform.platform">
                    <div class="flex items-center gap-2 mb-3">
                      <span class="text-xs font-bold uppercase text-slate-400 tracking-widest">{{ platform.platform }}</span>
                      <div class="h-[1px] flex-1 bg-slate-200 dark:bg-white/10"></div>
                    </div>
                    
                    <div class="grid grid-cols-1 gap-3">
                      <a 
                        v-for="(link, i) in platform.links" 
                        :key="i"
                        :href="link"
                        target="_blank"
                        class="group relative w-full flex items-center justify-between px-6 py-4 bg-slate-100 dark:bg-slate-800/50 hover:bg-cyan-600 dark:hover:bg-cyan-600 rounded-xl transition-all duration-300 overflow-hidden shadow-sm hover:shadow-cyan-500/30 hover:shadow-lg"
                      >
                        <!-- 按钮背景流光 -->
                        <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                        
                        <div class="flex items-center gap-3 z-10">
                          <span class="bg-slate-200 dark:bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                            <svg class="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                          </span>
                          <span class="font-bold text-slate-700 dark:text-slate-200 group-hover:text-white">Link {{ i + 1 }}</span>
                        </div>
                        <span class="text-xs font-mono text-slate-400 group-hover:text-cyan-100 transition-colors z-10">SERVER 0{{ i + 1 }}</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div class="mt-8 pt-6 border-t border-slate-200/50 dark:border-white/10 text-center">
                  <p class="text-xs text-slate-400 mb-2">遇到问题？联系支持团队</p>
                  <a :href="'mailto:' + game.contactEmail" class="text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:underline">
                    {{ game.contactEmail || 'contact@example.com' }}
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
    
    <!-- Loading 状态 -->
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { gamesData, type Game } from '../data/games';

const route = useRoute();
const game = ref<Game | undefined>(undefined);
const activeMediaIndex = ref(0);

const activeMedia = computed(() => {
  return game.value?.preview[activeMediaIndex.value]?.url || '';
});

onMounted(() => {
  // 模拟数据加载延迟，让动画更自然
  const id = route.params.id as string;
  game.value = gamesData.find(g => g.id === id);
});
</script>

<style scoped>
/* 3D 效果工具类 */
.perspective-1000 {
  perspective: 1000px;
}
.rotate-y-6 {
  transform: rotateY(10deg);
}

/* 按钮扫光动画 */
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
.animate-shimmer {
  animation: shimmer 1.5s infinite;
}

/* 页面入场动画 */
.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 自定义水平滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(6, 182, 212, 0.3);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(6, 182, 212, 0.8);
}
</style>