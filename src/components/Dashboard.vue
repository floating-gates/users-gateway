<script setup>
import { ref, onMounted, computed } from 'vue';

import Header from "./Header.vue";
import ShippingDetails from "./ShippingDetails.vue";
import PricingDetails from "./PricingDetails.vue"; 
import OrderDetails from "./OrderDetails.vue";
import EnrollToSub from "./EnrollToSub.vue"
import DashboardStats from "./DashboardStats.vue"

import { connect_projects_via_ws, delete_project, get_progress } from '../project_handler/project.js';
import { handle_price_allocation } from '../price_handler/price_setting.js'
import { get_user_details } from '../user_handler/user_details.js';
import { verify_user_credentials } from '../user_handler/login.js';
import { themeColor, themeColorOrange, themeColorLille, themeColorGold,
         themeColorWhite, price_status } from "../config.js";

// State
const project_in_scope = ref(null)
const proj_list = ref([])
const isAdmin = ref(false)
const user_details = ref({});
const subscriptionToBeActivated = ref(false)
const error = ref('')
const hasError = ref(false)
const loading = ref(true)

// Modal visibility
const modals = ref({
    pricing: false,
    shipping: false,
    order: false
})

// Modal handlers
const toggleModal = (type, proj_id = null) => {
    if (proj_id) {
        project_in_scope.value = proj_list.value.find(p => p.id === proj_id)
    }
    modals.value[type] = !modals.value[type]
}

// Delete handler
async function handleDelete(proj_id) {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
        const res = await delete_project(proj_id);
        if (res.status !== 204) throw new Error('Failed to delete project');
        proj_list.value = proj_list.value.filter(p => p.id !== proj_id);
    } catch (err) {
        alert("Error deleting project: " + err.message);
    }
}

// Status badge helpers
const isPriceAccepted = (status) => status === 'accepted'
const isInvoiceSent = (status) => status === 'invoice_sent'
const shouldShowShipping = (status) => isPriceAccepted(status) || isInvoiceSent(status)

onMounted(async () => {
    const credentials = await verify_user_credentials().catch(() => null)

    if (!credentials || !credentials.is_authenticated) {
        window.location.replace("/login")
        return
    }

    user_details.value = await get_user_details()
    isAdmin.value = credentials.is_admin

    const sub = user_details.value.subscription_status
    
    if ( (sub === 'demo') || (sub === 'inactive') ) {
        subscriptionToBeActivated.value = true
    }
    
    loading.value = false // authentication OK

    connect_projects_via_ws(proj_list)
})
</script>

<template>
<Header context="dashboard" :host_address="user_details.host_address" />

<div v-if="loading" class="loading-state">
  Checking authentication…
</div>
<div v-else>
<!-- Subscription --> 
<div v-if="subscriptionToBeActivated" class="sub-wrapper">
  <EnrollToSub
    :provisional_hub_name="user_details.provisional_hub_name"
    :demo_address="user_details.host_address"
    :discount="user_details.discount" />
</div>

<div class="untree_co-hero dashboard-section" id="dashboard-section">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-12">
        <div class="row">
          
          <!-- Dashboard Header -->
          <div class="col-lg-12 mb-4">
            <div class="dashboard-header" >
              <h1 class="heading">Ongoing Projects</h1>
              <p class="welcome-message">
                Welcome, <span :style="{ color: themeColorOrange }">{{ user_details.full_name }}</span>
              </p>
            </div>
          </div>

          <DashboardStats :proj_list="proj_list" :is_admin="isAdmin" />
          
          <!-- Main Content -->
          <div class="col-12" data-aos="fade-up" data-aos-delay="400">
            <div v-if="hasError" class="error-box">
              <p>{{ error }}</p>
            </div>
            
            <div class="dashboard-main-content">
              <div class="content-header">
                <h2 class="section-title">Recent Orders</h2>
                <!-- <a class="btn action-btn" -->
                <!--    :href="user_details.host_address" -->
                <!--    :style="{ background: themeColor, -->
                <!--            borderColor: themeColor, -->
                <!--            color: themeColorWhite }"> -->
                <!--   Visit your CAD -->
                <!-- </a> -->
              </div>
              
              <!-- Projects List -->
              <div class="projects-list">
                <div v-for="project in proj_list" :key="project.id" class="project-item">
                  <div class="project-info">
                    <h3>{{ project.proj_name }}</h3>
                    <p class="proj-detail">Status: {{ project.status }}</p>
                    <p class="proj-detail">
                      <a :href="'mailto:' + project.customer_mail">Email customer</a>
                    </p>
                    <p class="proj-detail">
                      <a :href="user_details.host_address + project.id">View project</a>
                    </p>
                  </div>
                  
                  <div class="project-actions">

                    <!-- Price Form -->
                    <form v-if="project.price_status === 'pending'"
                          class="price-form"
                          @submit.prevent="handle_price_allocation(project)">
                      <h5 :style="{ color: themeColor }"  >Set Price (€):</h5>
                      <input type="number" v-model="project.price" />
                      <button type="submit" class="btn action-btn"
                              :style="{ background: themeColor,
                                      borderColor: themeColor,
                                      color: themeColorWhite }">
                        Send Quote
                      </button>
                    </form>

                    <!-- Info Button -->
                    <button
                      @click="toggleModal('order', project.id)"
                      class="btn action-2nd-btn"
                      :style="{ borderColor: themeColorLille,
                                color: themeColor }"
                      title="Info on Order"
                      >
                      <svg xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           :stroke="themeColor"
                           stroke-width="1.6"
                           style="width: 24px; height: 24px;">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M11.25 11.25h1.5v5.25h-1.5v-5.25zM12 9a.75.75 0 110-1.5.75.75 0 010 1.5zm0 12a9 9 0 100-18 9 9 0 000 18z" />
                      </svg>
                    </button>
                    
                    <!-- Delete Button -->
                    <button
                      @click="handleDelete(project.id)"
                      class="btn action-2nd-btn"
                      :style="{ borderColor: themeColorOrange, color: themeColor }"
                      title="Delete Project"
                      >
                      <svg xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           :stroke="themeColor"
                           stroke-width="1.6"
                           style="width: 24px; height: 24px;">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M6 7.5h12m-9 3v6m6-6v6M9 3h6a1 1 0 011 1v1H8V4a1 1 0 011-1zM4.5 7.5h15l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7.5z" />
                      </svg>
                    </button>
                                        
                    <!-- Payment Button -->
                    <button v-if="isPriceAccepted(project.price_status)"
                            @click="toggleModal('pricing', project.id)"
                            class="btn action-btn"
                            :style="{ background: themeColor, borderColor: themeColor, color: themeColorWhite }">
                      Send Payment Details
                    </button>
                    
                    <!-- Invoice Status -->
                    <button v-else-if="isInvoiceSent(project.price_status)"
                            class="btn action-btn"
                            :style="{ background: themeColorLille, color: themeColor }">
                      <span >Invoice Sent</span>
                    </button>
                    
                    <!-- Shipping Button -->
                    <button v-if="shouldShowShipping(project.price_status)"
                            @click="toggleModal('shipping', project.id)"
                            class="btn action-btn"
                            :style="{ background: themeColorOrange,
                                    borderColor: themeColorOrange,
                                    color: themeColor }">
                      Ship to {{ project.city }}, {{ project.country }}
                    </button>
                    
                    <!-- Price Display -->
                    <div v-else class="d-flex align-items-center gap-2">
                      <h3 class="mb-0">{{ project.price }}€</h3>
                      
                      <!-- Waiting Quotation -->
                      <svg v-if="project.price_status === price_status[2]" 
                           viewBox="0 0 100 100" 
                           class="status-icon animate-spin" 
                           width="28" height="28">
                        <circle cx="50" cy="20" r="4" :fill="themeColor" />
                        <circle cx="67.32" cy="25.98" r="4" :fill="themeColor" />
                        <circle cx="78.66" cy="41.34" r="4" :fill="themeColor" />
                        <circle cx="80" cy="60" r="4" :fill="themeColor" />
                        <circle cx="67.32" cy="74.02" r="4" :fill="themeColor" />
                        <circle cx="50" cy="80" r="4" :fill="themeColor" />
                        <circle cx="32.68" cy="74.02" r="4" :fill="themeColor" />
                        <circle cx="20" cy="60" r="4" :fill="themeColor" />
                      </svg>
                      
                      <!-- Accepted Quotation -->
                      <svg v-if="project.price_status === price_status[3]" 
                           xmlns="http://www.w3.org/2000/svg" 
                           fill="none" viewBox="0 0 24 24" 
                           stroke-width="2" 
                           class="status-icon" 
                           width="28" height="28"
                           :style="{ stroke: '#22c55e' }">
                        <path stroke-linecap="round" stroke-linejoin="round" 
                              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      
                      <!-- Refused Quotation  -->
                      <svg v-if="project.price_status === price_status[4]" 
                           xmlns="http://www.w3.org/2000/svg" 
                           fill="none" viewBox="0 0 24 24" 
                           stroke-width="2" 
                           class="status-icon" 
                           width="28" height="28"
                           :style="{ stroke: '#ef4444' }">
                        <path stroke-linecap="round" stroke-linejoin="round" 
                              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                  </div>
                  
                  <!-- Progress Bar -->
                  <div class="progress-container">
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" 
                           :style="{ 
                                   width: get_progress(project) + '%', 
                                   backgroundColor: get_progress(project) === 100 ? themeColorGold : themeColor 
                                   }"
                           :aria-valuenow="get_progress(project)"
                           aria-valuemin="0" aria-valuemax="100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Modals -->
          <ShippingDetails v-if="modals.shipping"
                           :proj="project_in_scope"
                           @close="toggleModal('shipping')" />
          <PricingDetails v-if="modals.pricing"
                          :proj="project_in_scope"
                          @close="toggleModal('pricing')" />
          <OrderDetails v-if="modals.order"
                        :proj="project_in_scope"
                        @close="toggleModal('order')" />
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<style scoped>
.welcome-message {
    font-size: 18px;
    margin-top: 10px;
    text-align: left;
}

.sub-wrapper {
    padding-top: 3rem;
}

.dashboard-main-content {
    background-color: white;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 5px 3px 3px 5px v-bind(themeColorLille);
}

.content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.section-title {
    font-size: 22px;
    margin: 0;
}

.project-item {
    padding: 15px 0;
    border-bottom: 1px solid v-bind(themeColorLille);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.icon {
    padding: 14px;
}

.heading {
    text-align: left;
}

.error-box {
    background: #ffe6e6;
    border: 1px solid #ff4d4d;
    color: #b30000;
    padding: 12px;
    border-radius: 8px;
    margin: 1rem 0;
}

.project-info {
    flex: 1;
    min-width: 300px;
    margin-bottom: 15px;
    text-align: left;
}

.proj-detail {
    font-size: 14px;
    color: v-bind(themeColor);
    margin-bottom: 5px;
}

.project-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 15px;
    /* margin-bottom: 15px; */
}

.project-actions button:hover svg {
  stroke: v-bind(themeColorWhite);
}

.price-form {
    display: flex;
    align-items: center;
    gap: 10px;
}

.price-form label {
    margin-right: 5px;
    font-size: 14px;
}

.price-form input {
    width: 80px;
    padding: 5px;
    border: 1px solid v-bind(themeColor);
    border-radius: 4px;
}

.progress-container {
    width: 100%;
    margin-top: 10px;
}

.progress {
    height: 8px;
}

.btn:hover {
    background-color: v-bind(themeColorOrange);
    border-color: v-bind(themeColor);
}

.btn-lille:hover {
    background-color: v-bind(themeColorLille);
    border-color: v-bind(themeColor);
}

.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
