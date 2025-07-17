<script setup>
import { ref, watch, onMounted } from 'vue';
import { create_subscription,
         delete_subscription } from '../user_handler/subscription.js';
import { get_user_details }    from '../user_handler/user_info.js'
import { themeColor, price_list, sub_links_list } from "../data/items.js";
import Header from "./Header.vue";

const user_details = ref('');
const subscription_plan = ref('');
const url_to_pay = ref('');
const host_address = ref('');

watch( subscription_plan, (plan) => {
    url_to_pay.value = sub_links_list[plan];
});

const error = ref('');
const showNewHubForm = ref(true);

async function handleDeleteSubscription() {
    
    const confirmed = window.confirm('Are you sure you want to delete this subscription?');
    if (!confirmed) return
        
    try {
        const res = await delete_subscription();
        
        if (res.status !== 204) {
            const err = await res.json();
            throw new Error(err.message || 'Failed to delete subscription');
        }
                
    } catch (e) {
        error.value = e.message;
    }
}

async function paySubscription() {


    try {

        const response = await create_subscription(
            subscription_plan.value,
            host_address.value);
                
    } catch (e) {
        error.value = e.message;
    } 
    
    // Go to Payment
    window.location.href = url_to_pay.value
}

onMounted(async () => {
    
    try {
        const res = await get_user_details();
        if (!res.ok) {
            throw new Error('Failed to fetch username');
        }
        
        user_details.value = await res.json();
        const sub_status = user_details.value.subscription_status;     
        if (sub_status !== "inactive")  { showNewHubForm.value = false }
        
    } catch (e) {
        error.value = e.message;
    }
});
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
        <div v-if="showNewHubForm">
          <div class="subscription-card bg-white p-4">
            <div v-if="error" class="error-text">{{ error }}</div>
            
            <form @submit.prevent="paySubscription">
              <div class="form-group">
                <label for="planSelect">What plan do you need?</label>
                
                <select v-model="subscription_plan" id="planSelect" class="form-control" required>
                  <option
                    v-for="([plan_name, price], index) in Object.entries(price_list)"
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
                  v-model="host_address"
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
                >
                Checkout
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
                    <a :href="user_details.host_address">
                      {{  user_details.host_address }}
                    </a>
                  </td>
                  <td>{{ user_details.subscription_plan }}</td>
                  <td>{{ user_details.subscription_status }}</td>
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
