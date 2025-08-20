<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import { get_user_details } from '../user_handler/user_info.js';
import { themeColor, themeColorWhite } from '../data/items.js';
import { verify_jwt } from '../user_handler/login.js';
import { getMachineList, updateMachineList } from "../user_handler/machine.js";
import { getMaterials } from "../user_handler/materials.js"

import Header from "./Header.vue";
import Summary from "./Summary.vue";
import FeatureList from "./FeatureList.vue";
import Machines from "./Machines.vue";
import EnrollToSub from "./EnrollToSub.vue";
import ReportIssue from "./ReportIssue.vue";
import SubscriptionStatus from "./SubscriptionStatus.vue";
import Materials from "./Materials.vue";

const activeTab = ref('Summary');
const tabs = ['Summary',
              'Machines',
              'Materials',
              'Features',
              'Subscription',
              'Issues'];

const userDetails = ref({});
const machines    = ref([]);
const materials   = ref([]);

const error = ref('');
const showHubForm = ref(false);
const isAuthenticated = ref(false);

const tabRefs = ref([]);
const indicatorStyle = ref({});


onMounted(async () => {

    isAuthenticated.value = await verify_jwt();
    if (!isAuthenticated.value) window.location.replace("/login");
    
    userDetails.value = await get_user_details();
    machines.value    = await getMachineList();
    materials.value   = await getMaterials();
    
    const sub_status = userDetails.value.subscription_status
    
    if ( sub_status === "inactive" || sub_status === "demo") {
        showHubForm.value = true;
    }
    
    // initialize indicator after DOM renders
    await nextTick();
    const initialIndex = tabs.indexOf(activeTab.value);
    moveIndicator(initialIndex);
});


// --------------------
// Style needed function
// --------------------
function setActiveTab(tab, index) {
    activeTab.value = tab;
    moveIndicator(index);
}

// move indicator to active tab
function moveIndicator(index) {
    const el = tabRefs.value[index];
    if (el) {
        indicatorStyle.value = {
            width: el.offsetWidth + "px",
            transform: `translateX(${el.offsetLeft}px)`,
        };
    }
}

</script>


<template>
<Header :context="'profile'" />

<div class="untree_co-section bg-light">
  <div class="row justify-content-center">
    <div class="col-md-12 col-lg-8">
      
      <div v-if="showHubForm">
        <EnrollToSub />
      </div>
      
      <div  v-else >
        
        <div class="tab-menu-container text-center mb-6">
          <div class="tab-menu">
            <div class="tab-indicator" :style="indicatorStyle"></div>
            <button
              v-for="(tab, index) in tabs"
              :key="tab"
              ref="tabRefs"
              @click="setActiveTab(tab, index)"
              :class="['tab-button', { 'active': activeTab === tab }]" >
              {{ tab }}
            </button>
          </div>
        </div>
        
        <div v-if="activeTab === 'Summary'">
          <Summary
            :machines="machines"
            :materials="materials"/>
        </div>
        
        <div v-if="activeTab === 'Machines'">
          <Machines
            :machines="machines"
            @update_machine="(mac) => machines = mac"/>
        </div>
        
        <div v-if="activeTab === 'Materials'">
          <Materials
            :machines="machines"
            :materials="materials"
            @update_materials="(mats) => materials = mats"/>
        </div>
        
        <div v-if="activeTab === 'Subscription'">
          <SubscriptionStatus :user="userDetails"/>
        </div>
        
        <div v-else-if="activeTab === 'Features'">
          <FeatureList
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
    position: relative;
    display: inline-flex;
    border-radius: 50px;
    border: 2px solid v-bind(themeColor);
    padding: 0.25rem;
}

.tab-indicator {
    position: absolute;
    top: 2px;
    height: calc(100% - 4px);
    background-color: v-bind(themeColor);
    border-radius: 50px;
    transition: transform 0.3s ease, width 0.3s ease;
    z-index: 0;
}

.tab-button {
    position: relative;
    z-index: 1; /* keep text above indicator */
    padding: 0.5rem 1.5rem;
    border: none;
    background: none;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.3s;
}

.tab-button.active {
  color: v-bind(themeColorWhite);
}

.tab-button:not(.active):hover {
  color: v-bind(themeColor);
}
</style>
