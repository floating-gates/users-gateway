<script setup>
import { ref, watch, onMounted } from 'vue';
import { get_user_details } from '../user_handler/user_info.js';
import { themeColor, themeColorOrange, themeColorWhite, price_list, sub_links_list } from '../data/items.js';
import { verify_jwt }   from '../user_handler/login.js';

import Header from "./Header.vue";
import Summary from "./Summary.vue"
import FeatureList from "./FeatureList.vue";
import AvailableMachines from "./AvailableMachines.vue"
import EnrollToSub from "./EnrollToSub.vue"
import ReportIssue from "./ReportIssue.vue"
import SubscriptionStatus from "./SubscriptionStatus.vue"


const activeTab = ref('Summary'); // default tab
const tabs = ['Summary', 'Machines', 'Materials', 'Features', 'Subscription', 'Issues'];


const userDetails = ref({});
const error = ref('');
const showHubForm = ref(false);
const isAuthenticated = ref(false);

async function loadUserDetails() {
    try {
        const res = await get_user_details();
        if (!res.ok) throw new Error('Failed to fetch user details');
        
        const user = await res.json();
        const status = user.subscription_status;
        
        userDetails.value = user;
        
        if (status === "inactive" || status === "demo") {
            showHubForm.value = true;
        }
        
    } catch (e) {
        error.value = e.message;
    }
}

onMounted(async () => {
    
    isAuthenticated.value = await verify_jwt();
    
    if (!isAuthenticated.value) {
        window.location.replace("/login");
        
    }
    
    loadUserDetails();
})
</script>

<template>
<Header :context="'profile'" />

<div class="untree_co-section bg-light" id="user-subscription-section">
  <div class="row justify-content-center">
    <div class="col-md-12 col-lg-8">
      
      <div v-if="showHubForm">
        <EnrollToSub />
      </div>
      
      <div  v-else >
        <div class="tab-menu-container text-center mb-6">
          <div class="tab-menu">
            <button
              v-for="tab in tabs"
              :key="tab"
              @click="activeTab = tab"
              :class="['tab-button', { 'active': activeTab === tab }]"
              >
              {{ tab }}
            </button>
          </div>
        </div>
        
        <div v-if="activeTab === 'Summary'">
          <Summary />
        </div>
        
        <div v-if="activeTab === 'Subscription'">
          <SubscriptionStatus :user="userDetails"/>
        </div>
        
        <div v-if="activeTab === 'Machines'">
          <AvailableMachines />
        </div>

        <div v-if="activeTab === 'Materials'">
          <Materials />
        </div>
                
        <div v-else-if="activeTab === 'Features'">
          <FeatureList
            v-if="userDetails && typeof userDetails.payment_independent !== 'undefined' && typeof userDetails.automatic_quotation !== 'undefined'"
            :independent_payment="userDetails.payment_independent"
            :automatic_quotation="userDetails.automatic_quotation"
            />
        </div>
        
        <div v-else-if="activeTab === 'Issues'">
          <ReportIssue />
        </div>
      </div>
    </div>
  </div>
</div>

</template>


<style scoped>
.tab-menu {
    display: inline-flex;
    border-radius: 50px;
    border: 2px solid v-bind(themeColor);
}

.tab-button {
    padding: 0.5rem 2rem;
    border: none;
    background: none;
    font-weight: 500;
    transition: background 0.3s, color 0.3s;
}

.tab-button.active {
    background-color: v-bind(themeColor); 
    color: v-bind(themeColorWhite);
    border-radius: 50px
}

.tab-button:not(.active):hover {
    background-color: #e2e6ea;
    border-radius: 50px
}

</style>
