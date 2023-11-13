import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@/app/router'

const app = createApp(App)

import { registerModules } from ':/register'
import authModule from ':/auth'
registerModules({
    auth: authModule,
});

app.use(createPinia())
app.use(router)

app.mount('#app')
