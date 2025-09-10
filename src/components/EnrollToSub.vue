<script setup>
import { ref, watch, defineProps, onMounted } from 'vue';
import { create_subscription } from '../user_handler/subscription.js';
import { themeColor, themeColorOrange, themeColorWhite, price_list } from '../data/items.js';

const props = defineProps({
  provisional_hub_name: String,
  discount: Number
});

const hostAddress = ref('');
const subscriptionPlan = ref('');
const price = ref(null);
const showPaymentButton = ref(true)
const paymentUrl = ref('');
const enrollButtonText = ref('Select a Plan')

const hasError = ref(false);
const error = ref('');

async function paySubscription() {
  hostAddress.value = hostAddress.value.trim().toLowerCase();
  
  if (!/^[a-z0-9_-]+$/.test(hostAddress.value)) {
    error.value = "No spaces or special characters are allowed.";
    hasError.value = true;
    return;
  }
  
  const response = await create_subscription(
    subscriptionPlan.value,
    hostAddress.value,
    price.value
  );
  
  if (response.status === 409) {
    error.value = "The requested host address is already in use. Please choose a different one.";
    hasError.value = true;
    return;
  }
  
  if (paymentUrl.value) window.location.href = paymentUrl.value;
}

watch(subscriptionPlan, (plan) => {

    if (plan === "standard") { showPaymentButton.value = false }
    else { showPaymentButton.value = true }

    if (plan === 'basic')      { enrollButtonText.value = "Activate your Hub Now" }
    if (plan === 'enterprise') { enrollButtonText.value = "Request a Quotation" }
    
    if (plan) {
    paymentUrl.value = price_list[plan][props.discount].link;
        price.value  = price_list[plan][props.discount].price;
  }
});

onMounted(() => {
  if (props.provisional_hub_name) hostAddress.value = props.provisional_hub_name;
});
</script>

<template>
<div class="subscription-card">
  <h2 class="subscription-title" :style="{ color: themeColor }">
    Launch Your Hub in Seconds
  </h2>
  
  <p class="subscription-description">
    Secure your own hub today and start receiving orders instantly.  
    Choose the plan that matches your goals — from a little 3D machine to production line.
  </p>
  
  <div v-if="hasError" class="error-text">{{ error }}</div>
  
  <form @submit.prevent="paySubscription">
    <div class="form-group">
      <label for="planSelect"><strong>Select Your Plan</strong></label>
      <select v-model="subscriptionPlan" id="planSelect" class="form-control" required>
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
      <span class="note">(cancel anytime)</span>
    </div>
    <p class="payment-note">Your payment is securely processed by GoCardless Ltd.</p>
    
    <div class="form-group">
      <label for="hostUrl"><strong>🌐 Choose Your Hub Address</strong></label>
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
      <p class="benefits">Instant setup • Refund Guaranteed • Cancel anytime</p>
    </div>
  </form>
</div>
</template>

<style scoped>
.subscription-card {
    background-color: #fff;
    border-radius: 1.5rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.12);
    max-width: 600px;
    margin: 3rem auto;
    padding: 2.5rem;
}

.subscription-title {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: v-bind(themeColor);
    margin-bottom: 1rem;
}

.subscription-description {
    text-align: center;
    color: #333;
    line-height: 1.6;
    margin-bottom: 2rem;
}

.error-text {
    text-align: center;
    color: red;
    font-weight: 500;
    margin-bottom: 1rem;
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
    font-size: 0.85rem;
    color: #666;
    margin-left: 0.3rem;
}

.payment-note {
    text-align: center;
    font-size: 0.85rem;
    color: #555;
    margin-bottom: 1.5rem;
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

.benefits {
    margin-top: 1rem;
    font-size: 0.9rem;
  color: #444;
}
</style>
