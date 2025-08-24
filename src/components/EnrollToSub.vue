<script setup>
import { ref, watch, defineProps, onMounted } from 'vue';
import { create_subscription } from '../user_handler/subscription.js';
import { themeColor, themeColorOrange, themeColorWhite, price_list, sub_links_list } from '../data/items.js';

const props = defineProps(["provisional_hub_name"])

const hostAddress = ref('');
const paymentUrl = ref('');

const hasError = ref(false)
const error = ref('');

const subscriptionPlan = ref('');

// initialize hostAddress with provisional_hub_name if provided
onMounted(() => {
  if (props.provisional_hub_name) {
    hostAddress.value = props.provisional_hub_name;
  }
});

watch(subscriptionPlan, (plan) => {
  paymentUrl.value = sub_links_list[plan];
});

async function paySubscription() {
  hostAddress.value = hostAddress.value.trim().toLowerCase();
  if (!/^[a-z0-9_-]+$/.test(hostAddress.value)) {
    error.value = "No spaces or special characters are allowed.";
    hasError.value = true;
    return;
  }

  const response = await create_subscription(subscriptionPlan.value, hostAddress.value);

  if (response.status === 409) {
    error.value = "The requested host address is already in use. Please choose a different one.";
    hasError.value = true;
    return;
  }

  if (paymentUrl.value) {
    window.location.href = paymentUrl.value;
  }
}
</script>

<template>
  <div class="subscription-card p-6 rounded-xl shadow-lg">
    <!-- Title -->
    <h2 class="subscription-title text-3xl mb-4" :style="{ color: themeColor }">
      Launch Your Hub in Seconds
    </h2>

    <!-- Description -->
    <p class="subscription-description mb-6">
      Pick the plan that suits your needs and claim your unique hub address. 
      Whether you're experimenting or running a full workspace, everything you need to get started is just a few clicks away.
    </p>

    <!-- Error Message -->
    <div v-if="hasError" class="error-text mb-4 font-medium">{{ error }}</div>

    <!-- Form -->
    <form @submit.prevent="paySubscription">
      <div class="form-group mb-5">
        <label for="planSelect" class="mb-2"><strong>Select Your Plan</strong></label>
        <select v-model="subscriptionPlan" id="planSelect" class="form-control w-full p-3 border border-gray-300 rounded-lg" required>
          <option
            v-for="([plan_name, price]) in Object.entries(price_list).filter(([key]) => key !== 'demo')"
            :key="plan_name"
            :value="plan_name">
            {{ plan_name.charAt(0).toUpperCase() + plan_name.slice(1) }} — ${{ price }}
          </option>
        </select>
      </div>

      <div class="form-group mb-6">
        <label for="hostUrl" class="mb-2"><strong>Choose Your Hub Address</strong></label>
        <input
          v-model="hostAddress"
          id="hostUrl"
          type="text"
          class="form-control w-full p-3 border border-gray-300 rounded-lg"
          required />
      </div>

      <div class="text-center">
        <button
          type="submit"
          class="btn btn-primary mt-10 rounded-full transition-all duration-300 hover:scale-105 shadow-md"
          :style="{ background: themeColor, borderColor: themeColor }">
          Proceed to Payment
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.subscription-card {
  max-width: 800px;
  padding: 3rem; 
  margin: 3rem auto;
  background: v-bind(themeColorWhite);
  border-radius: 20px;
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.subscription-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: v-bind(themeColor);
  margin-bottom: 2rem;
}

.form-control {
  width: 100%;
  padding: 0 1rem;  /* add horizontal padding inside each group */
  border: 1px solid #ccc;
  border-radius: 4px;
}


.subscription-description {
  text-align: center;
  color: v-bind(themeColor);
  line-height: 1.6;
}

.error-text {
  text-align: center;
  color: red;
}
</style>
