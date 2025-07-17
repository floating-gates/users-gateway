<script setup>
import { ref, onMounted, computed } from 'vue';
import { themeColor, themeColorOrange, themeColorLille } from "../data/items.js";
import Header from "./Header.vue"

import { create_project, get_project,
         count_project_states, delete_project } from '../project_handler/project.js';

import { set_price } from '../price_handler/price_setting.js'
import { get_user_details } from '../user_handler/user_info.js';
import { verify_jwt, verify_admin }   from '../user_handler/login.js';

import { download_api_endpoint, price_status } from "../data/items.js"

// Dashboard data
const project_list = ref([]);
const isAuthenticated = ref(false);
const showConfirmation = ref(false);
const isAdmin = ref(false);

const error = ref('');
const user_details = ref('');

// Use computed for reactive counts
const activeProjects = computed(() => project_list.value.length);
const pendingSimulations = computed(() => count_project_states(project_list.value, price_status[2]));
const completedSimulations = computed(() => count_project_states(project_list.value,price_status[3]));

// Show confirmation screen first
function handle_price_set_confirmation() {
    showConfirmation.value = true;
}

async function create_new_project() {
    const name = prompt("Enter project name:");
    if (!name) return;
    
    const customer_email = prompt("Enter email of the project owner:");
    if (!customer_email) return;
    
    const description = "Missing description";
    
    try {
        const res = await create_project(name, customer_email, description);
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || 'Failed to create project');
        }
        
        const new_project = await res.json();
        
        // Prepend to the project list for immediate feedback
        project_list.value.unshift(new_project);
        activeProjects.value = project_list.value.length;
    } catch (err) {
        alert("Error creating project: " + err.message);
    }
}

async function handleDelete(proj_id) {
    
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
        const res = await delete_project(proj_id);
        
        console.log(status)
        if (res.status !== 204) {
            throw new Error('Failed to delete project');
        }
        
        // Remove from list
        project_list.value = project_list.value.filter(p => p.id !== proj_id);
        
    } catch (err) {
        alert("Error deleting project: " + err.message);
    }
}


async function handlePriceSet( proj ) {
    try {
        const response = await set_price(proj);
        
        // Wait for the request to finish
        if (response.ok) {
            proj.price_status = price_status[2];
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Price update failed');
        }
    } catch (err) {
        console.error('Request failed:', err);
        alert('Failed to set price.');
    }
}


onMounted(async () => {
    
    isAuthenticated.value = await verify_jwt();
    
    if (!isAuthenticated.value) {
        window.location.replace("/login");
    }
    
    isAdmin.value = await verify_admin()
    
    try {
        const res = await get_user_details();
        if (!res.ok) {
            throw new Error('Failed to fetch username');
        }
        
        user_details.value = await res.json();

        
    } catch (e) {
        error.value = e.message;
    }
    
    try {
        const res = await get_project();
        if (!res.ok) {
            throw new Error('Failed to fetch projects');
        }
        
        
        project_list.value = await res.json()
    } catch (e) {
        error.value = e.message;
    }    
})
</script>

<template>
<Header :context="'dashboard'" :admin='isAdmin' :host_address='user_details.host_address' />
<div class="untree_co-hero dashboard-section" id="dashboard-section">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-12">
        <div class="dots"></div>
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
          <div>
            
            <!-- Dashboard Stats -->
            <div class="col-lg-12 mb-5">
              <div class="row">
                <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
                  <div class="stats-card">
                    <h3 class="stats-number">{{ activeProjects }}</h3>
                    <p class="stats-label">Projects</p>
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
                    <p class="stats-label">Completed Projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Main Dashboard Content -->
          <div class="col-12" data-aos="fade-up" data-aos-delay="400">
            <div class="dashboard-main-content">
              
              <div class="content-header">
                <h2 class="section-title">Recent Projects</h2>
                <div class="action-buttons">
                  <a class="btn btn-primary"
                     style="margin-right: 5px"
                     :style="[{ background: themeColor },
                             { borderColor: themeColor }]"
                     @click="create_new_project"
                     >New Project for Customer</a>
                </div>
              </div>
              
              <!-- Projects List -->
              <div class="projects-list">
                <div 
                  v-for="project in project_list" 
                  :key="project.id" 
                  class="project-item"
                  >
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
                      <a :href="project.address">View project</a>
                    </p>
                  </div>
                  
                  <div class="project-actions ">
                    <!-- Download button -->
                    <button :href="`${download_api_endpoint}/${project.id}`" 
                       class="btn icon icon-download"
                       :style="{ borderColor: themeColor, color: themeColor }"
                       title="Download 3D model"> </button>
                    
                    <!-- Delete button -->
                    <button 
                      @click="handleDelete(project.id)" 
                      class="btn icon icon-trash"
                      :style="{ borderColor: themeColorOrange, color: themeColor }"
                      title="Delete Project"
                      ></button>
                    
                    <!-- Price sets -->
                    <form v-if="project.price_status === 'pending'"  class="price-form" @submit.prevent="handlePriceSet( project )">
                      <label>Set Price (€):</label>
                      <input
                        type="number"
                        v-model="project.price"
                        required
                        />
                      <button
                        type="submit"
                        class="btn btn-primary btn-sm"
                        :style="[{ background: themeColor, borderColor: themeColor }]"
                        >
                        Submit
                      </button>
                    </form>
                    
                    <div v-else class="d-flex align-items-center">
                      <h3 class="mb-0 me-3">{{ project.price }}€</h3>
                      
                      <i 
                        class="icon icon-check-circle text-success" 
                        v-if="project.price_status === price_status[3]" 
                        style="font-size: 20px;"
                        ></i>
                      
                      <i 
                        class="icon icon-spinner animate-spin text-secondary" 
                        v-if="project.price_status === price_status[2]" 
                        style="font-size: 20px;"
                        ></i>
                      
                      <i 
                        class="icon icon-cancel text-danger" 
                        v-if="project.price_status === price_status[4]" 
                        style="font-size: 20px;"
                        ></i>
                    </div>
                  </div>
                  
                  <!-- Progress bar -->
                  <div class="progress-container">
                    <div class="progress">
                      <div 
                        class="progress-bar" 
                        role="progressbar" 
                        :style="{ 
                                width: project.progress + '%', 
                                backgroundColor: project.progress === 100 ? themeColorOrange : themeColor 
                                }" 
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
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}


.icon {
    padding: 14px;
}

.project-item:last-child {
    border-bottom: none;
}

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
    border: 1px solid #ddd;
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

.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

</style>
