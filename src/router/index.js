import { createRouter, createWebHistory } from 'vue-router'
import LandingPage       from '../views/LandingPage.vue'
import Login             from '../views/Login.vue'
import Dashboard         from '../components/Dashboard.vue'
import Pricing           from '../views/Pricing.vue'
import AdminDashboard    from '../views/AdminDashboard.vue'
import Mission           from '../views/Mission.vue'
import ValueProposition  from '../views/ValueProposition.vue'
import Profile           from '../components/Profile.vue'
import TermsService      from '../views/TermsService.vue'
import Services          from '../views/Services.vue'
import Guide             from '../views/Guide.vue'
import FAQ               from '../views/FAQ.vue'
import CaseStudies       from '../views/CaseStudies.vue'
import PrivacyPolicy     from '../views/PrivacyPolicy.vue'
import ReferralLogin     from '../views/ReferralLogin.vue'
import ReferralDashboard from '../views/ReferralDashboard.vue'
import SetNewPasswd      from '../views/SetNewPasswd.vue'
import SetNewReferralPasswd from '../views/SetNewReferralPasswd.vue'

const routes = [
    { path: '/', component: LandingPage },
    { path: '/login', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: '/admin-dashboard', component: AdminDashboard },
    { path: '/mission', component: Mission },
    { path: '/value-proposition', component: ValueProposition },
    { path: '/profile', component: Profile },
    { path: '/services', component: Services },
    { path: '/terms_and_services', component: TermsService },
    { path: '/privacy-policy', component: PrivacyPolicy },
    { path: '/guide', component: Guide },
    { path: '/recover-email', component: SetNewPasswd },
    { path: '/recover-referral-email', component: SetNewReferralPasswd },
    { path: '/faq',   component: FAQ },
    { path: '/pricing', component: Pricing },
    { path: '/case-studies', component: CaseStudies },
    { path: '/referral-login', component: ReferralLogin },
    { path: '/referral-dashboard', component: ReferralDashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
