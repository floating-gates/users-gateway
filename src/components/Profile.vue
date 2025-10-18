<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import { get_user_details } from '../user_handler/user_details.js';
import { themeColor, themeColorWhite } from '../data/items.js';
import { verify_user_credentials } from '../user_handler/login.js';
import { derive_menu_from_features } from '../user_handler/subscription.js';
import { getMachineList, updateMachineList } from "../user_handler/machine.js";
import { getMaterials } from "../user_handler/materials.js"

import Header from "./Header.vue";
import Summary from "./Summary.vue";
import FeatureList from "./FeatureList.vue";
import Machines from "./Machines.vue";
import ReportIssue from "./ReportIssue.vue";
import SubscriptionStatus from "./SubscriptionStatus.vue";
import Materials from "./Materials.vue";
import BrandDetails from "./BrandDetails.vue";
import ParametricModel from "./ParametricModel.vue";
import AutoQuote from "./AutoQuote.vue";

const activeTab = ref('');
const tabs = ref([]);

const userDetails = ref({});
const machines    = ref([]);
const materials   = ref([]);

const error = ref('');
const subscriptionToBeActivated = ref(false);

const tabRefs = ref([]);
const indicatorStyle = ref({});


function changeMenuTab(selected_menu_tab, idx) {
    activeTab.value = selected_menu_tab
    setActiveTab(selected_menu_tab, idx)
}

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

// Recompute availble tabs
function refresh_menu( updatedFeatures ) {
    
    Object.assign(userDetails.value, updatedFeatures);

    const features = {
        automatic_quotation: userDetails.value.automatic_quotation,
        parametric_design: userDetails.value.parametric_design
    }

    tabs.value = derive_menu_from_features(features); // This control menu
    
    if (!tabs.value.includes(activeTab.value)) {
        activeTab.value = tabs.value[0];
    }

    nextTick(() => {
        const idx = tabs.value.indexOf(activeTab.value);
        moveIndicator(idx);
    });
}

onMounted(async () => {

    userDetails.value = await get_user_details();
    machines.value    = await getMachineList();
    materials.value   = await getMaterials();
    const sub_status = userDetails.value.subscription_status
    
    if ( sub_status === "inactive" || sub_status === "demo") {
        subscriptionToBeActivated.value = true;
    }
    
    refresh_menu();
    
    await nextTick();
    if (tabs.value.length > 0) {
        activeTab.value = tabs.value[0];
        moveIndicator(0);
    }
});
</script>


<template>
<Header :context="'profile'" />

<div class="untree_co-section">
  <div class="row justify-content-center">
    <div class="col-md-12 col-lg-8">
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
            :materials="materials"
            @go_to_machines="changeMenuTab('Machines', 1)"/>
        </div>
        
        <div v-else-if="activeTab === 'Machines'">
          <Machines
            :machines="machines"
            @update_machine="(mac) => machines = mac"/>
        </div>
        
        <div v-else-if="activeTab === 'Materials'">
          <Materials
            :machines="machines"
            :materials="materials"
            @update_materials="(mats) => materials = mats"/>
        </div>
        
        <div v-else-if="activeTab === 'Subscription'">
          <SubscriptionStatus
            :user="userDetails" />
        </div>
        
        <div v-else-if="activeTab === 'Features'">
          <FeatureList
            :independent_payment="userDetails.payment_independent"
            :automatic_quotation="userDetails.automatic_quotation"
            :parametric_design="userDetails.parametric_design"
            @refresh-features="refresh_menu"
            />
        </div>

        <div v-else-if="activeTab === 'AutoQuote'">
          <AutoQuote />
        </div>
        
        <div v-else-if="activeTab === 'Devices'">
          <ParametricModel />
        </div>
        
        <div v-else-if="activeTab === 'Details'">
          <BrandDetails
            :user="userDetails" />
        </div>
        
        <div v-else-if="activeTab === 'Issues'">
          <ReportIssue />
        </div>
        
      </div>
    </div>
</div>
</template>


<style scoped>
.tab-menu-container {
  margin-top: 2rem; /* push below header */
  overflow-x: auto; /* allow horizontal scroll if too many tabs */
  -webkit-overflow-scrolling: touch;
}


.tab-menu {
    position: relative;
    display: inline-flex;
    border-radius: 50px;
    border: 3px solid v-bind(themeColor);
    padding: 0.25rem;
}

.tab-indicator {
    position: absolute;
    top: 2px;
    left: 0;
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
