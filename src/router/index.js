import { createRouter, createWebHistory } from 'vue-router'
import AdminDashboard    from '../views/AdminDashboard.vue'
import Dashboard         from '../components/Dashboard.vue'
import Login             from '../views/Login.vue'
import Profile           from '../components/Profile.vue'
import ReferralDashboard from '../views/ReferralDashboard.vue'
import ReferralLogin     from '../views/ReferralLogin.vue'
import SetNewPasswd      from '../views/SetNewPasswd.vue'
import SetNewReferralPasswd from '../views/SetNewReferralPasswd.vue'

const routes = [
    { path: '/login', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: '/admin-dashboard', component: AdminDashboard },
    { path: '/profile', component: Profile },
    { path: '/recover-email', component: SetNewPasswd },
    { path: '/recover-referral-email', component: SetNewReferralPasswd },
    { path: '/referral-login', component: ReferralLogin },
    { path: '/referral-dashboard', component: ReferralDashboard }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
