import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
import JourneyView from '../views/JourneyView.vue'
import ProjectDetailView from '../views/ProjectDetailView.vue'
import ContactView from '../views/ContactView.vue'
import Error404 from '../views/Error404View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/mon-parcours',
      name: 'myJourney',
      component: JourneyView
    },
    {
      path: '/projet/:id',
      name: 'project',
      component: ProjectDetailView
    },
    {
      path: '/me-contacter',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: Error404
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
