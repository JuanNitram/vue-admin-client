import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'

import Login from './views/auth/Login.vue'
import Dashboard from './views/Dashboard.vue'

import Administradores from './views/administradores/Administradores.vue'
import AdministradoresNuevo from './views/administradores/AdministradoresNuevo.vue'

import Productos from './views/productos/Productos.vue'
import ProductosNuevo from './views/productos/ProductosNuevo.vue'

import Sliders from './views/sliders/Sliders.vue'
import SlidersNuevo from './views/sliders/SlidersNuevo.vue'

import middlewares from './middlewares'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        isLogin: true,
        title: 'Login',
        section: 'login'
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
        title: 'Dashboard',
        section: 'dashboard'
      }
    },
    {
      path: '/admins',
      name: 'admins',
      component: Administradores,
      meta: {
        requiresAuth: true,
        title: 'Administradores',
        section: 'admins'
      }
    },
    {
      path: '/admins/new',
      name: 'new-admin',
      component: AdministradoresNuevo,
      meta: {
        requiresAuth: true,
        title: 'Nuevo Administrador',
        section: 'admins',
      }
    },
    {
      path: '/admins/edit/:id',
      name: 'edit-admin',
      component: AdministradoresNuevo,
      meta: {
        requiresAuth: true,
        title: 'Editar Administrador',
        section: 'admins'
      }
    },
    {
      path: '/products',
      name: 'products',
      component: Productos,
      meta: {
        requiresAuth: true,
        title: 'Productos',
        section: 'products'
      }
    },
    {
      path: '/products/new',
      name: 'new-product',
      component: ProductosNuevo,
      meta: {
        requiresAuth: true,
        title: 'Nuevo Producto',
        section: 'products'
      }
    },
    {
      path: '/products/edit/:id',
      name: 'edit-product',
      component: ProductosNuevo,
      meta: {
        requiresAuth: true,
        title: 'Editar Producto',
        section: 'products'
      }
    },
    {
      path: '/sliders',
      name: 'sliders',
      component: Sliders,
      meta: {
        requiresAuth: true,
        title: 'Sliders',
        section: 'sliders'
      }
    },
    {
      path: '/sliders/new',
      name: 'new-slider',
      component: SlidersNuevo,
      meta: {
        requiresAuth: true,
        title: 'Nuevo Slider',
        section: 'sliders'
      }
    },
    {
      path: '/sliders/edit/:id',
      name: 'edit-slider',
      component: SlidersNuevo,
      meta: {
        requiresAuth: true,
        title: 'Editar Slider',
        section: 'sliders'
      }
    },
    {
        path: '/*',
        redirect: '/dashboard'
    },
  ]
})

router.beforeEach((to, from, next) => {
  let check = middlewares.checkSections(to);
  if(check){
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {
        next()
        return
      }
      next('/login')
    } else {
      next()
    }
  } else {
    console.log("No permisions");
  }
});

export default router
