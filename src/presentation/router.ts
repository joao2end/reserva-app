import { createRouter, createWebHashHistory } from 'vue-router'
import { useEstoque } from './estado/useEstoque'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'inicio', component: () => import('./views/InicioView.vue') },
    { path: '/criar', name: 'criar', component: () => import('./views/CriarEstoqueView.vue') },
    { path: '/estoque', name: 'estoque', component: () => import('./views/EstoqueView.vue') },
    { path: '/estoque/:itemId', name: 'item', component: () => import('./views/ItemView.vue'), props: true },
    { path: '/compras', name: 'compras', component: () => import('./views/ComprasView.vue') },
    { path: '/guia', name: 'guia', component: () => import('./views/GuiaView.vue') },
    { path: '/guia/:secaoId', name: 'secao', component: () => import('./views/SecaoGuiaView.vue'), props: true },
    { path: '/cursos', name: 'cursos', component: () => import('./views/CursosView.vue') },
    { path: '/cursos/:cursoId', name: 'curso', component: () => import('./views/CursoView.vue'), props: true },
    { path: '/licao/:licaoId', name: 'licao', component: () => import('./views/LicaoView.vue'), props: true },
    { path: '/curso', redirect: { name: 'cursos' } },
    { path: '/curso/:licaoId', redirect: (destino) => ({ name: 'licao', params: { licaoId: String(destino.params.licaoId) } }) },
    { path: '/mochila', name: 'mochila', component: () => import('./views/MochilaView.vue') },
    { path: '/familia', name: 'familia', component: () => import('./views/ContatoFamiliaView.vue') },
    { path: '/locais', name: 'locais', component: () => import('./views/LocaisView.vue') },
    { path: '/:caminho(.*)*', redirect: { name: 'inicio' } },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

const ROTAS_QUE_EXIGEM_ESTOQUE = ['estoque', 'item', 'compras']

router.beforeEach((destino) => {
  const { configuracao, limparErro } = useEstoque()
  limparErro()
  if (ROTAS_QUE_EXIGEM_ESTOQUE.includes(String(destino.name)) && !configuracao.value) return { name: 'criar' }
})
