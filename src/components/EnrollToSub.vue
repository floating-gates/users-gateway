<script setup>
import { ref, watch, defineProps, onMounted } from 'vue';
import { set_next_subscription  } from '../user_handler/subscription.js';
import { get_gocardless_payment_link } from '../user_handler/subscription.js';
import { themeColor, themeColorOrange, themeColorWhite,
         price_list, docs_links } from '../config.js';
import HelpIcon from './HelpIcon.vue'

const props = defineProps({
    provisional_hub_name: String,
    discount: Number
});

const hostAddress = ref('');
const subscriptionPlan = ref('');
const price = ref(null);
const showPaymentButton = ref(true)
const enrollButtonText = ref('Select a Plan')

const error = ref(null);
const error_in_hostname = ref(null)

async function start_payment_procedure() {
    
    let paymentUrl = null 
    hostAddress.value = hostAddress.value.trim().toLowerCase();
    
    if (!/^[a-z0-9_-]+$/.test(hostAddress.value)) {
        error.value = "No spaces or special characters are allowed.";
        hasError.value = true;
        return;
    }
    
    try {
        await set_next_subscription( subscriptionPlan.value,
                                     hostAddress.value,
                                     price.value )
    } catch (e) {
        error_in_hostname.value = e.message
    }
    
    try {
        paymentUrl = await get_gocardless_payment_link( price.value )
    } catch (e) {
        error.value = e.message
    }
        
    if (paymentUrl) window.location.href = paymentUrl;
}

watch(subscriptionPlan, (plan) => {
    
    (plan === "standard") ?
        showPaymentButton.value = false : showPaymentButton.value = true
    if (plan === 'basic') { enrollButtonText.value = "Activate your Hub Now" }
    if (plan === 'enterprise') { enrollButtonText.value = "Request a Quotation" }
    if (plan) { price.value = price_list[plan][props.discount].price; }
});

onMounted(() => {
    if (props.provisional_hub_name) hostAddress.value = props.provisional_hub_name;
});
</script>

<template>
<div class="subscription-card">
  <h2 class="subscription-title" :style="{ color: themeColor }">
    Activate your Subscription, to host your Factory online.
    <HelpIcon :docs_link="docs_links.subscription"/>
  </h2>
  <h2 class="subscription-title" :style="{ color: themeColorOrange }">
    You are currently in Demo mode. </h2>
  <p class="note">
    Secure your own hub today and start receiving orders instantly.  
    Choose the plan that matches your goals — from a little 3D machine to production line.
  </p>
  
  <div v-if="error" class="error-text">
    {{ error }}
  </div>
  
  <form @submit.prevent="start_payment_procedure">
    <div class="form-group">
      <label for="planSelect"><strong>Select Your Plan</strong></label>
      <select v-model="subscriptionPlan" id="planSelect"
              class="form-control" required>
        <option
          v-for="(plans, plan_name) in price_list"
          :key="plan_name"
          :value="plan_name">
          {{ plan_name.charAt(0).toUpperCase() + plan_name.slice(1) }}
        </option>
      </select>
    </div>
    
    <div v-if="subscriptionPlan" class="pricing-highlight" :style="{ color: themeColorOrange }">
      {{ price_list[subscriptionPlan][props.discount].display_price }}
    </div>
    
    <div v-if="error_in_hostname" class="error-text">
      {{ error_in_hostname }}
    </div>
    
    <div class="form-group">
      <label for="hostUrl"><strong>🌐 Choose Your CAD Address</strong></label>
      <input
        v-model="hostAddress"
        id="hostUrl"
        type="text"
        placeholder="e.g. yourhub"
        class="form-control"
        required />
      <p class="input-hint">Your hub will be available at <strong>{{ hostAddress || "yourhub" }}.floating-gates.com</strong></p>
    </div>
    
    <div v-if="showPaymentButton" class="form-actions">
      <button type="submit" class="btn-primary" :style="{ backgroundColor: themeColor }">
        {{ enrollButtonText }}
      </button>
      <p class="benefits">Instant CAD setup • Refund Guaranteed • Cancel Anytime</p>
    </div>
  </form>
</div>
</template>

<style scoped>
.subscription-card {
    background-color: #fff;
    border-radius: 1.5rem;
    box-shadow: 0 6px 12px rgba(0,0,0,0.52);
    max-width: 900px;
    margin: 6rem auto 0 auto;
    padding: 2.5rem;
}

.subscription-title {
    text-align: center;
    font-size: 1.8rem;
    font-weight: 700;
    color: v-bind(themeColor);
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-control {
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.6rem;
    box-sizing: border-box;
}

.pricing-highlight {
    text-align: center;
    margin: 1rem 0;
    font-size: 1.2rem;
    font-weight: bold;
    color: v-bind(themeColorOrange);
}

.note {
    text-align: center;
    font-size: 0.85rem;
    color: #666;
}

.input-hint {
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.3rem;
}

.form-actions {
    text-align: center;
    margin-top: 2rem;
}

.btn-primary {
    background-color: v-bind(themeColor);
    border: none;
    border-radius: 999px;
    padding: 0.9rem 2.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 3px 6px rgba(0,0,0,0.15);
}

.btn-primary:hover {
    transform: scale(1.05);
    background-color: v-bind(themeColorOrange);
}

select.form-control {
  appearance: auto; /* Restores the default dropdown arrow */
  -webkit-appearance: auto;
  -moz-appearance: auto;
}

.benefits {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #444;
}
</style>
