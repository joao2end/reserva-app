import { createApp } from 'vue'
import '@fontsource/atkinson-hyperlegible/400.css'
import '@fontsource/atkinson-hyperlegible/700.css'
import './style.css'
import App from './presentation/App.vue'
import { router } from './presentation/router'
import { iniciarEstoque } from './presentation/estado/useEstoque'
import { iniciarPreferencias } from './presentation/estado/usePreferencias'
import { registrarBotaoVoltar } from './presentation/botaoVoltar'

Promise.all([iniciarEstoque(), iniciarPreferencias()]).then(() => {
  createApp(App).use(router).mount('#app')
  registrarBotaoVoltar(router)
})
