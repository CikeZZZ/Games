<template>
  <div class="relative min-h-screen pb-20">
    
    <!-- ================= 1. 背景氛围层 ================= -->
    <div v-if="game" class="fixed inset-0 z-0 pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-slate-50/95 to-slate-50 dark:from-slate-950/80 dark:via-slate-950/90 dark:to-[#020617] z-10"></div>
      <img 
        :src="game.preview[0]?.url" 
        class="w-full h-full object-cover blur-[60px] opacity-60 dark:opacity-40 scale-110 transition-all duration-1000"
      />
    </div>

    <div v-if="game" class="container mx-auto px-4 relative z-10 pt-6">

      <!-- ================= [手机独占] 顶部标题区 ================= -->
      <!-- 只有在手机(lg:hidden)显示，保证用户第一眼看到名字 -->
      <div class="lg:hidden mb-6 animate-fade-in-up">
        <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2 drop-shadow-xl">
          {{ game.name }}
        </h1>
        <div class="flex flex-wrap gap-2">
           <span v-for="tag in game.tags.slice(0,3)" :key="tag" class="px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/5">
             {{ tag }}
           </span>
        </div>
      </div>

      <!-- ================= 主布局 Grid ================= -->
      <!-- 手机单列，大屏双列 (1:3 比例) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-fade-in-up">
        
        <!-- ============ 左侧栏 (封面/信息/下载) ============ -->
        <!-- 这一栏在 DOM 前面，所以手机上自然排在上面 -->
        <div class="lg:col-span-4 xl:col-span-3 flex flex-col gap-6">
          
          <!-- 1. 封面 -->
          <div class="relative group perspective-1000">
            <div class="absolute -inset-1 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-2xl blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
            <div class="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <img :src="game.preview[0]?.url" class="w-full h-full object-cover" />
              <!-- 玻璃光泽 -->
              <div class="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
            </div>
          </div>

          <!-- 2. 信息胶囊 -->
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

          <!-- 3. 下载区域 (现在紧跟在信息下面) -->
          <div class="glass-next p-6 rounded-2xl relative overflow-hidden ring-1 ring-cyan-500/20">
            <h3 class="text-lg font-black mb-4 text-slate-800 dark:text-white flex items-center gap-2">
              <span>📥</span> 下载中心
            </h3>
            
            <!-- 修改后的下载区域 -->
            <div class="space-y-4">
              <div v-for="platform in game.downloads" :key="platform.platform">
                <!-- 平台标题 -->
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-[10px] font-bold uppercase text-slate-400 tracking-widest">{{ platform.platform }}</span>
                  <div class="h-[1px] flex-1 bg-slate-200 dark:bg-white/10"></div>
                </div>
                
                <!-- 下载按钮组 -->
                <div class="flex flex-col gap-2">
                  <a 
                    v-for="(link, i) in platform.links" 
                    :key="i"
                    :href="link.url"
                    target="_blank"
                    v-ripple
                    class="group relative w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 overflow-hidden shadow-md hover:shadow-cyan-500/30
                          bg-slate-800 text-white border border-slate-700 hover:border-cyan-500"
                  >
                    <!-- 扫光动画 (保持不变) -->
                    <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                    
                    <div class="flex items-center gap-3 z-10">
                      <!-- 图标 -->
                      <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      
                      <!-- 显示自定义名字 -->
                      <span class="text-sm font-bold tracking-wide group-hover:text-cyan-300 transition-colors">
                        {{ link.name || `下载地址 ${i + 1}` }}
                      </span>
                    </div>

                    <!-- 外部链接箭头 -->
                    <svg class="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                  </a>
                </div>
              </div>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-200/50 dark:border-white/10 text-center">
               <a :href="'mailto:' + game.contactEmail" class="text-xs font-bold text-cyan-600 dark:text-cyan-400 opacity-80">联系作者反馈</a>
            </div>
          </div>
        </div>

        <!-- ============ 右侧内容区 (标题/视频/Markdown) ============ -->
        <div class="lg:col-span-8 xl:col-span-9 flex flex-col">
          
          <!-- [电脑独占] 标题 (手机上隐藏，防止重复) -->
          <div class="hidden lg:block mb-8">
            <div class="flex flex-wrap gap-2 mb-4">
               <span v-for="tag in game.tags" :key="tag" class="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/5">
                 #{{ tag }}
               </span>
            </div>
            <h1 class="text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-4 drop-shadow-xl">
              {{ game.name }}
            </h1>
            <p class="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-4xl">
              {{ game.intro }}
            </p>
          </div>

          <!-- 修改后的媒体轮播区域 -->
          <div class="glass-next p-2 rounded-2xl mb-8 group">
            <!-- 主显示区 -->
            <div class="relative aspect-video rounded-xl overflow-hidden bg-black shadow-inner">
              <transition name="fade" mode="out-in">
                
                <!-- 情况1: 如果是视频类型，解析并显示 iframe -->
                <div v-if="activeMediaObj.type === 'video'" :key="'video-'+activeMediaIndex" class="w-full h-full">
                  <iframe 
                    :src="getEmbedUrl(activeMediaObj.url)" 
                    class="w-full h-full" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                  ></iframe>
                </div>

                <!-- 情况2: 普通图片 -->
                <img 
                  v-else 
                  :key="'img-'+activeMediaIndex" 
                  :src="activeMediaObj.url" 
                  class="w-full h-full object-cover" 
                />
              </transition>
            </div>
            
            <!-- 略缩图条 (保持不变，只是 click 逻辑微调) -->
            <div class="flex gap-3 mt-3 overflow-x-auto pb-2 px-1 custom-scrollbar">
                <div 
                  v-for="(media, idx) in game.preview" 
                  :key="idx" 
                  @click="activeMediaIndex = idx" 
                  :class="['relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border-2', activeMediaIndex === idx ? 'border-cyan-500 scale-105 opacity-100' : 'border-transparent opacity-60 hover:opacity-100']"
                >
                  <!-- 缩略图：如果是视频，尝试用视频封面或通用图标，这里简单处理用第一帧或黑底 -->
                  <div v-if="media.type === 'video'" class="w-full h-full bg-slate-900 flex items-center justify-center">
                    <span class="text-2xl">📺</span>
                  </div>
                  <img v-else :src="media.url" class="w-full h-full object-cover" />
                </div>
            </div>
          </div>

          <!-- Markdown 介绍 (垂直排列) -->
          <div class="space-y-8">
            <div class="glass-next p-6 md:p-8 rounded-2xl">
              <h3 class="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">
                <span class="text-cyan-500 text-2xl">▍</span> 游戏档案
              </h3>
              
              <!-- Markdown 渲染区: 使用 prose 美化 -->
              <div 
                class="prose prose-slate dark:prose-invert max-w-none 
                       prose-headings:font-bold prose-headings:text-slate-800 dark:prose-headings:text-white
                       prose-a:text-cyan-600 dark:prose-a:text-cyan-400 hover:prose-a:text-cyan-500 prose-a:no-underline
                       prose-strong:text-cyan-600 dark:prose-strong:text-cyan-400
                       prose-img:rounded-xl prose-img:shadow-lg"
                v-html="renderMarkdown(game.description)"
              ></div>
            </div>

            <div class="glass-next p-6 md:p-8 rounded-2xl border-l-4 !border-l-purple-500">
              <h3 class="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
                <span class="text-purple-500 text-2xl">⚡</span> 补丁与更新
              </h3>
              <div 
                class="prose prose-sm prose-slate dark:prose-invert max-w-none
                       bg-slate-100 dark:bg-black/20 p-4 rounded-xl border border-slate-200 dark:border-white/5"
                v-html="renderMarkdown(game.updates)"
              ></div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div v-else class="min-h-screen flex items-center justify-center">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { gamesData, type Game } from '../data/games';
import MarkdownIt from 'markdown-it';

const route = useRoute();
const game = ref<Game | undefined>(undefined);
const activeMediaIndex = ref(0);

// 计算当前选中的媒体对象
const activeMediaObj = computed(() => {
  if (!game.value || !game.value.preview[activeMediaIndex.value]) return { type: 'image', url: '' };
  return game.value.preview[activeMediaIndex.value];
});

// 核心：视频地址解析器
const getEmbedUrl = (url: string) => {
  // 1. Bilibili (支持 BV号 或完整链接)
  if (url.includes('bilibili.com') || url.startsWith('BV')) {
    // 提取 BV 号 (这里做一个简单的正则匹配)
    const bvMatch = url.match(/(BV\w+)/);
    const bvid = bvMatch ? bvMatch[1] : url;
    return `//player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0`;
  }
  
  // 2. YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = '';
    if (url.includes('v=')) videoId = url.split('v=')[1].split('&')[0];
    else if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // 3. 其他直链视频 (mp4)
  return url;
};

// 初始化 Markdown 解析器
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true
});

const renderMarkdown = (text: string) => {
  return md.render(text || '');
};

const activeMedia = computed(() => {
  return game.value?.preview[activeMediaIndex.value]?.url || '';
});

onMounted(() => {
  const id = route.params.id as string;
  game.value = gamesData.find(g => g.id === id);
});
</script>

<style scoped>
/* 保持原有动画和样式 */
.perspective-1000 { perspective: 1000px; }
.rotate-y-6 { transform: rotateY(10deg); }
@keyframes shimmer { 100% { transform: translateX(100%); } }
.animate-shimmer { animation: shimmer 1.5s infinite; }
.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
.custom-scrollbar::-webkit-scrollbar { height: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(6, 182, 212, 0.3);
  border-radius: 4px;
}
</style>