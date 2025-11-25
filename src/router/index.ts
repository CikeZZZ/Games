import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameDetail from '../views/GameDetail.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/game/:id',
            name: 'game-detail',
            component: GameDetail
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 } // 每次跳转都滚回顶部
    }
})

export default router