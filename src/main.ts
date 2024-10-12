import { createApp } from 'vue'
import './style.css'
import './assets/common.css'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './mock/index'; // 引入 mock 文件


createApp(App)
    .use(pinia)
    .use(router)
    .use(ElementPlus)
    .mount('#app')


