<script setup>
import { ref, watch, onMounted } from 'vue';
import { create_subscription, delete_subscription } from '../user_handler/subscription.js';
import { get_user_details } from '../user_handler/user_info.js';
import { themeColor, price_list, sub_links_list } from "../data/items.js";
import Header from "./Header.vue";

import { verify_jwt }   from '../user_handler/login.js';


const userDetails = ref({});
const subscriptionPlan = ref('');
const hostAddress = ref('');
const error = ref('');

const showHubForm = ref(false);
const isProvisioning = ref(false);
const isAuthenticated = ref(false);

watch(subscriptionPlan, (plan) => {
    paymentUrl.value = sub_links_list[plan];
});

const paymentUrl = ref('');

async function handleDeleteSubscription() {
    if (!window.confirm('Are you sure you want to delete this subscription?')) return;
    
    try {
        const res = await delete_subscription();
        if (res.status !== 204) {
            const err = await res.json();
            throw new Error(err.message || 'Failed to delete subscription');
        }
    } catch (e) {
        error.value = e.message;
    }
    
    await loadUserDetails();
}

async function paySubscription() {
    
    const response = await create_subscription(subscriptionPlan.value, hostAddress.value);
    
    if (response.status === 409) {
        error.value =  "The requested host address is already in use. Please choose a different one";
    }
    
    if (paymentUrl.value) {
        window.location.href = paymentUrl.value;
    }
}

async function loadUserDetails() {
    try {
        const res = await get_user_details();
        if (!res.ok) throw new Error('Failed to fetch user details');
        
        const user = await res.json();
        userDetails.value = user;
        subscriptionPlan.value = user.subscription_plan;
        
        const status = user.subscription_status;
        
        if (status === "inactive" || status === "demo") {
            showHubForm.value = true;
        } else if (status === "instantiation") {
            isProvisioning.value = true;
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
  <div class="container">
    <div class="row text-center mb-4">
      <div class="col-12">
        <h1 class="heading">Hosting Management</h1>
      </div>
    </div>
    
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        
        <div v-if="isProvisioning" class="provisioning-message text-center mb-4">
          <p>The hub will be functioning within 24 hours and ready to receive external projects.</p>
          <p>
            <a :href="paymentUrl" class="text-primary">
              Having issues? Complete payment here.
            </a>
          </p>
        </div>
        
        
        <div v-if="showHubForm">
          <div class="subscription-card bg-white p-4">
            <div v-if="error" class="error-text">{{ error }}</div>
            
            <form @submit.prevent="paySubscription">
              <div class="form-group">
                <label for="planSelect">What plan do you need?</label>
                
                <select v-model="subscriptionPlan" id="planSelect" class="form-control" required>
                  <option
                    v-for="([plan_name, price], index) in Object.entries(price_list).filter( ([key]) => key !== 'demo')"
                    :key="plan_name"
                    :value="plan_name"
                    >
                    {{ plan_name.charAt(0).toUpperCase() + plan_name.slice(1) }}
                  </option>
                </select>
              </div>
              
              <div class="form-group mb-4">
                <label for="hostUrl">Choose an address for your hub:</label>
                <input
                  v-model="hostAddress"
                  id="hostUrl"
                  type="text"
                  class="form-control"
                  placeholder="Your Hub Address name"
                  required
                  />
              </div>
              
              <button
                type="submit"
                class="btn btn-primary w-100"
                :style="{ background: themeColor, borderColor: themeColor }"
                @click="paySubscription"
                >
                Go to Payments
              </button>
            </form>
          </div>
        </div>
        
        <!-- Subscription Table -->
        <div  v-else >
          <div class="table-responsive">
            <table class="table table-sm text-center">
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <a :href="userDetails.host_address">
                      {{ userDetails.host_address }}
                    </a>
                  </td>
                  <td>{{ userDetails.subscription_plan }}</td>
                  <td>{{ userDetails.subscription_status }}</td>
                  <td>
                    <button class="btn btn-sm btn-danger" @click="handleDeleteSubscription">
                      Suspend
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>


<style scoped>
.form-group {
    margin-bottom: 1rem;
}

.form-control {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.error-text {
    color: red;
    font-size: 0.875rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background-color: #fee;
    border: 1px solid #fcc;
    border-radius: 4px;
}

.success-text {
    margin-top: 1rem;
    color: green;
    font-weight: bold;
}

.table th {
    background-color: #f1f1f1;
    font-weight: 600;
    color: #333;
}

.table td, .table th {
    vertical-align: middle;
    padding: 0.5rem;
    border: 1px solid #dee2e6;
}

.confirmation-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050;
}

.confirmation-box {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 420px;
    width: 90%;
    animation: fadeIn 0.3s ease-out;
}

.confirmation-box p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
}

.confirmation-box button {
    min-width: 120px;
    margin: 0 0.5rem;
}

@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
}
</style>
