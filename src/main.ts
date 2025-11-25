import { createApp } from 'vue'
import './assets/css/style.css'  // <--- 这一行绝对不能少！！
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')