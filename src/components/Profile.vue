<script setup>
import { ref, reactive, onMounted, nextTick, defineAsyncComponent } from 'vue';
import { get_user_details } from '../user_handler/user_details.js';
import { themeColor, themeColorWhite } from '../config.js';
import { verify_user_credentials } from '../user_handler/login.js';
import { derive_menu_from_features } from '../user_handler/subscription.js';
import { getMachineList, updateMachineList } from "../user_handler/machine.js";
import { getMaterials } from "../user_handler/materials.js"

import Header from "./Header.vue";
const Summary   = defineAsyncComponent(() => import("./Summary.vue"));
const Machines  = defineAsyncComponent(() => import("./Machines.vue"));
const Materials = defineAsyncComponent(() => import("./Materials.vue"));
const SubscriptionStatus = defineAsyncComponent(() => import("./SubscriptionStatus.vue"));
const FeatureList = defineAsyncComponent(() => import("./FeatureList.vue"));
const AutoQuote   = defineAsyncComponent(() => import("./AutoQuote.vue"));
const ParametricModel = defineAsyncComponent(() => import("./ParametricModel.vue"));
const BrandDetails = defineAsyncComponent(() => import("./BrandDetails.vue"));

const activeTab = ref('');
const tabs = ref([]);

const user_details = ref({});
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
    
    Object.assign(user_details.value, updatedFeatures);

    const features = {
        automatic_quotation: user_details.value.automatic_quotation,
        parametric_design: user_details.value.parametric_design
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
  const [user, machineList, materialList] = await Promise.all([
    get_user_details(),
    getMachineList(),
    getMaterials()
  ]);

  user_details.value = user;
  machines.value = machineList;
  materials.value = materialList;

  const sub_status = user.subscription_status;
  if (sub_status === "inactive" || sub_status === "demo") {
    subscriptionToBeActivated.value = true;
  }

  refresh_menu();
    
  const params = new URLSearchParams(window.location.search);
  const first_page = params.get("menu");
  
    if ( first_page ) {
        activeTab.value = first_page;
    } else { 
        activeTab.value = tabs.value[0];
    }
    await nextTick();
}
);
</script>


<template>
<Header context="profile" :host_address="user_details.host_address" />

<div class="untree_co-section">
  <div class="row justify-content-center">
<div v-if="!tabs.length">
  <div class="skeleton-loader">Loading dashboard...</div>
</div>
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
        
        <div v-else-if="activeTab === 'Admin'">
          <SubscriptionStatus
            :user="user_details" />
        </div>
        
        <div v-else-if="activeTab === 'Features'">
          <FeatureList
            :independent_payment="user_details.payment_independent"
            :automatic_quotation="user_details.automatic_quotation"
            :parametric_design="user_details.parametric_design"
            @refresh-features="refresh_menu"
            />
        </div>

        <div v-else-if="activeTab === 'AutoQuote'">
          <AutoQuote />
        </div>
        
        <div v-else-if="activeTab === 'Devices'">
          <ParametricModel />
        </div>
        
        <div v-else-if="activeTab === 'Brand'">
          <BrandDetails
            :user="user_details" />
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
