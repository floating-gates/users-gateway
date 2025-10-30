import { createApp } from 'vue'
import './main.css'
import App from './App.vue'
import router from './router'

import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)
app.use(router)

app.mount('#app')

// Initialize AOS *after* Vue has rendered the first frame
window.addEventListener('load', () => {
  AOS.init({
    duration: 800,
    easing: 'slide',
    once: true
  })
})
