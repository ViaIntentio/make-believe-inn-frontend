import { createRouter, createWebHistory } from 'vue-router'
import HomeView from ':/home/home.view.vue';
import checkMiddlewares from "@/app/middlewares"
import auth from "@/app/middlewares/auth"
import guest from "@/app/middlewares/guest"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        return checkMiddlewares({to, from, next}, [guest])
    }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(':/about/about.view.vue'),
      beforeEnter: (to, from, next) => {
        return checkMiddlewares({to, from, next}, [guest])
      }
    }
  ]
})

export default router
