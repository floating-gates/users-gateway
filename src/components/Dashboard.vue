<script setup>
import { ref, onMounted, computed } from 'vue';

import Header from "./Header.vue";
import ShippingDetails from "./ShippingDetails.vue";
import PricingDetails  from "./PricingDetails.vue"; 
import OrderDetails    from "./OrderDetails.vue";

import { create_project, get_project, count_project_states,
         delete_project } from '../project_handler/project.js';
import { handle_price_allocation } from '../price_handler/price_setting.js'
import { get_user_details } from '../user_handler/user_info.js';
import { verify_jwt, verify_admin }   from '../user_handler/login.js';
import { themeColor, themeColorOrange, themeColorLille, price_status } from "../data/items.js";

// Dashboard data
const project_in_scope = ref(null)
const project_list = ref([])
const isAuthenticated = ref(false)
const showConfirmation = ref(false)
const showPricingDetails = ref(false)
const showShippingDetails = ref(false)
const showOrderInfo = ref(false)
const isAdmin = ref(false);

const error = ref('');
const user_details = ref('');

// Use computed for reactive counts
const activeProjects = computed(() => project_list.value.length);
const pendingSimulations = computed(() =>
    count_project_states(project_list.value, price_status[2]));
const completedSimulations = computed(() =>
    count_project_states(project_list.value,price_status[3]) + 
        count_project_states(project_list.value,price_status[7]) );

function handle_price_set_confirmation() { showConfirmation.value = true }

function handle_showPricingDetails( proj_id ) {
    project_in_scope.value = project_list.value.find( proj => proj.id === proj_id );
    showPricingDetails.value = !showPricingDetails.value;
}

function handle_showShippingDetails( proj_id ) {
    project_in_scope.value = project_list.value.find( proj => proj.id === proj_id );
    showShippingDetails.value = !showShippingDetails.value;
}
        
function handle_showOrderInfo( proj_id ) {
    project_in_scope.value = project_list.value.find( proj => proj.id === proj_id );
    showOrderInfo.value = !showOrderInfo.value
}

function handleGeneral_showShippingDetails() {
    showShippingDetails.value = !showShippingDetails.value;
}

function handleGeneral_showOrderInfo() {
    showOrderInfo.value = !showOrderInfo.value
}

function handleGeneral_showPricingDetails() {
    showPricingDetails.value = !showPricingDetails.value;
}

async function handleDelete(proj_id) {
    
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
        const res = await delete_project(proj_id);
        if (res.status !== 204) { throw new Error('Failed to delete project');  }
        
        // Remove from list
        project_list.value = project_list.value.filter(p => p.id !== proj_id);
        
    } catch (err) {
        alert("Error deleting project: " + err.message);
    }
}

onMounted(async () => {
    
    isAuthenticated.value = await verify_jwt();
    
    if (!isAuthenticated.value) {
        window.location.replace("/login");
    }
    
    isAdmin.value = await verify_admin()
    
    try {
        const res_usr = await get_user_details();
        
        if (!res_usr.ok) {
            throw new Error('Failed to fetch username');
        }
        
        user_details.value = await res_usr.json();
        
        const res_prj = await get_project();
        if (!res_prj.ok) {
            throw new Error('Failed to fetch projects');
        }
        project_list.value = await res_prj.json();
        
    } catch (e) {
        error.value = e.message;
    }
})
</script>

<template>
<Header context="dashboard" :is_admin='isAdmin' :host_address='user_details.host_address' />
<div class="untree_co-hero dashboard-section" id="dashboard-section">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-12">
        <div class="row">
          
          <!-- Dashboard Header -->
          <div class="col-lg-12 mb-4">
            <div class="dashboard-header" data-aos="fade-up" data-aos-delay="0">
              <h1 class="heading">Manufacturing Hub</h1>
              <p class="welcome-message">
                Welcome back, <span :style="{ color: themeColorOrange }">{{ user_details.full_name }}</span>
              </p>
            </div>
          </div>
          
          <!-- Dashboard Stats -->
          <div>
            <div class="col-lg-12 mb-5">
              <div class="row">
                <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
                  <div class="stats-card">
                    <h3 class="stats-number">{{ activeProjects }}</h3>
                    <p class="stats-label">Active Orders</p>
                  </div>
                </div>
                <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
                  <div class="stats-card">
                    <h3 class="stats-number">{{ pendingSimulations }}</h3>
                    <p class="stats-label">Customer Response Waiting</p>
                  </div>
                </div>
                <div class="col-md-4" data-aos="fade-up" data-aos-delay="300">
                  <div class="stats-card">
                    <h3 class="stats-number">{{ completedSimulations }}</h3>
                    <p class="stats-label">Orders Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Main Dashboard Content -->
          <div class="col-12" data-aos="fade-up" data-aos-delay="400">
            <div class="dashboard-main-content">
              
              <div class="content-header">
                <h2 class="section-title">Recent Orders</h2>
                <div class="action-buttons">                  
                  <a class="btn btn-primary"
                     :href="user_details.host_address"
                     style="margin-right: 5px"
                     :style="{ background: themeColor, borderColor: themeColor }">
                     Place an Order Yourself </a>
                </div>
              </div>
              
              <!-- Projects List -->
              <div class="projects-list">
                <div 
                  v-for="project in project_list" 
                  :key="project.id" 
                  class="project-item" >
                  <div class="project-info">
                    <a :href="project.proj_name" class="project-name">
                      <h3>{{ project.proj_name }}</h3>
                    </a>
                    
                    <p class="proj-detail">
                      Status: {{ project.status }}
                    </p>
                    
                    <p class="proj-detail">
                      <a :href="'mailto:' + project.customer_mail">Email customer</a>
                    </p>
                    
                    <p class="proj-detail">
                      <a :href="project.proj_url">View project</a>
                    </p>
                  </div>
                  
                  <div class="project-actions ">
                    <button
                      @click="handle_showOrderInfo( project.id )" 
                      class="btn btn-lille icon icon-info"
                      :style="{ borderColor: themeColorLille, color: themeColor }"
                      title="Info on Order"
                      ></button>
                    
                    
                    <!-- Delete button -->
                    <button 
                      @click="handleDelete(project.id)" 
                      class="btn icon icon-trash"
                      :style="{ borderColor: themeColorOrange, color: themeColor }"
                      title="Delete Project"
                      ></button>
                    
                    <!-- Price sets -->
                    <form v-if="project.price_status === 'pending'"
                          class="price-form"
                          @submit.prevent="handle_price_allocation( project )">
                      
                      <label>Set Price (€):</label>
                      <input
                        type="number"
                        v-model="project.price" />
                      <button
                        type="submit"
                        class="btn btn-primary btn-sm"
                        :style="[{ background: themeColor, borderColor: themeColor }]" >
                        Send Quote
                      </button>
                    </form>
                    
                    <button v-if="project.price_status === 'accepted'"
                            @click="handle_showPricingDetails( project.id )"
                            class="btn btn-primary btn-sm"
                            :style="[{ background: themeColor, borderColor: themeColor, color: themeColorWhite }]" >
                      Send Payment Details
                    </button>
                    <button
                      v-else-if="project.price_status === 'invoice_sent'"
                      class="btn btn-success btn-sm d-flex align-items-center"
                      disabled
                      :style="[{ background: themeColorLille, color: themeColor }]"  >
                      <span class="me-1">Invoice Sent</span>
                      <i class="bi bi-check-circle-fill"></i>
                    </button>
                    
                    <button v-if="project.price_status === 'accepted' || project.price_status === 'invoice_sent'"
                            @click="handle_showShippingDetails( project.id )"
                            class="btn btn-primary btn-sm"
                            :style="[{ background: themeColorOrange, borderColor: themeColorOrange, color: themeColor }]" >
                      Ship to {{ project.city }}, {{ project.country }}
                    </button>
                    
                    <div v-else class="d-flex align-items-center">
                      <h3 class="mb-0 me-3">{{ project.price }}€</h3>
                      
                      <i v-if="project.price_status === price_status[3]" 
                         class="icon icon-check-circle text-success" 
                         ></i>
                      
                      <i v-if="project.price_status === price_status[2]" 
                         class="icon icon-spinner animate-spin text-secondary" 
                         ></i>
                      
                      <i class="icon icon-cancel text-danger" 
                         v-if="project.price_status === price_status[4]"  ></i>
                    </div>
                  </div>
                  
                  <!-- Progress bar -->
                  <div class="progress-container">
                    <div class="progress">
                      <div 
                        class="progress-bar" 
                        role="progressbar" 
                        :style="{ width: project.progress + '%', 
                                backgroundColor: project.progress === 100 ? themeColorOrange : themeColor }" 
                        :aria-valuenow="project.progress" 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                        >
                        {{ project.progress }}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <ShippingDetails v-if="showShippingDetails"
                           :proj="project_in_scope"
                           @close="handleGeneral_showShippingDetails" />
          <PricingDetails v-if="showPricingDetails"
                          :proj="project_in_scope"
                          @close="handleGeneral_showPricingDetails" />
          <OrderDetails v-if="showOrderInfo"
                        :proj="project_in_scope"
                        @close="handleGeneral_showOrderInfo" />

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
}

.stats-card {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    height: 100%;
}

.stats-number {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 10px;
    color: v-bind(themeColor);
}


.stats-label {
    font-size: 16px;
    color: #666;
    margin: 0;
}

.dashboard-main-content, .dashboard-sidebar {
    background-color: white;
    border-radius: 10px;
    padding: 25px;
    box-shadow: 0 4px 6px v-bind(themeColorLille);
    height: 100%;
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
    /* justify-content: space-between; */
    align-items: center;
    flex-wrap: wrap;
}

.icon {
    padding: 14px;
}

/* .project-item:last-child { */
/*     border-bottom: none; */
/* } */

.project-info {
    flex: 1;
    min-width: 300px;
    margin-bottom: 15px;
}


.proj-detail {
    font-size: 14px;
    color: v-bind(themeColor);
    margin-bottom: 5px;
}

.project-actions {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
}

.action-buttons button,
.action-buttons a {
    margin-right: 10px;
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
