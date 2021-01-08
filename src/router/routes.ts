import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/SplashLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SplashScreen.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/register', component: () => import('pages/Register.vue') }
    ]
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/add/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'service', component: () => import('pages/AddService.vue') },
      { path: 'product', component: () => import('pages/AddProduct.vue') },
      { path: 'project', component: () => import('pages/AddProject.vue') },
      { path: 'unity', component: () => import('pages/AddUnity.vue') }
    ]
  },
  {
    path: '/unity',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Unity.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
