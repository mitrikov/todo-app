import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const UIcomponents = import.meta.glob(
    '@/components/ui/*.vue',
    {eager : true}
)

const iconComponentPrefix = "Icon";
const iconComponents = import.meta.glob(
    '@/components/icons/*.vue',
    {eager : true}
)

const app = createApp(App)

// Object.entries(UIcomponents).forEach(([path, component]) => {
//     // @ts-ignore
//     const name = path.split('/').pop().replace(/\.\w+$/, '')
//     // @ts-ignore
//     app.component(name, component.default)
// })


Object.entries(iconComponents).forEach(([path, component]) => {
    // @ts-ignore
    const name = iconComponentPrefix + path.split('/').pop().replace(/\.\w+$/, '')
    // @ts-ignore
    app.component(name, component.default)
})

app.use(createPinia())
app.use(router)

app.mount('#app')
