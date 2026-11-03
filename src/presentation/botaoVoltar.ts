import { App } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import type { Router } from 'vue-router'

export function registrarBotaoVoltar(router: Router) {
  if (!Capacitor.isNativePlatform()) return
  App.addListener('backButton', () => {
    if (router.currentRoute.value.name === 'inicio') {
      App.exitApp()
      return
    }
    if (window.history.length > 1) router.back()
    else router.replace({ name: 'inicio' })
  })
}
