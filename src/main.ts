import { createApp } from 'vue'
import './assets/css/style.css'
import App from './App.vue'
import router from './router'
import ripple from './directives/ripple' // 1. 引入指令

const app = createApp(App)

app.use(router)
app.directive('ripple', ripple) // 2. 注册指令

app.mount('#app')