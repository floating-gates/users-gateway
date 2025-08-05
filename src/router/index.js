import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Login from    '../components/Login.vue'
import Dashboard from    '../components/Dashboard.vue'
import AdminDashboard from    '../views/AdminDashboard.vue'
import Mission from    '../views/Mission.vue'
import ValueProposition from '../views/ValueProposition.vue'
import Profile from '../components/Profile.vue'
import TermsService from '../views/TermsService.vue'
import Services from '../components/Services.vue'
import Guide from '../components/Guide.vue'

const routes = [
    { path: '/', component: LandingPage },
    { path: '/login', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: '/admin_dashboard', component: AdminDashboard },
    { path: '/mission', component: Mission },
    { path: '/value-proposition', component: ValueProposition },
    { path: '/profile', component: Profile },
    { path: '/services', component: Services },
    { path: '/terms_and_services', component: TermsService },
    { path: '/guide', component: Guide }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
