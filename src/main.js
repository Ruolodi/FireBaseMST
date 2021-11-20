import { createApp } from 'vue'
import App from './App.vue'

import '/theme.css'


const VueScrollTo = require('vue-scrollto')

createApp(App)
.use(VueScrollTo)
.mount('#app')
