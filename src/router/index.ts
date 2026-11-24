import { createRouter, createWebHashHistory } from 'vue-router'
import PopulationView from '../views/PopulationView.vue'
import InvestmentView from '../views/InvestmentView.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: (_to, _from, savedPosition) => savedPosition ?? { top: 0 },
  routes: [
    { path: '/', redirect: '/population' },
    { path: '/population', name: 'population', component: PopulationView },
    { path: '/investment', name: 'investment', component: InvestmentView },
    { path: '/:pathMatch(.*)*', redirect: '/population' },
  ],
})
