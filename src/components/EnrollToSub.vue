<script setup>
import { ref, watch } from 'vue';
import { create_subscription } from '../user_handler/subscription.js';
import { themeColor, themeColorOrange, themeColorWhite, price_list, sub_links_list } from '../data/items.js';


const hostAddress = ref('');
const paymentUrl = ref('');

const hasError = ref(false)
const error = ref('');

const subscriptionPlan = ref('');

watch(subscriptionPlan, (plan) => {
    paymentUrl.value = sub_links_list[plan];
});


async function paySubscription() {
    hostAddress.value = hostAddress.value.trim().toLowerCase();
    if (!/^[a-z0-9_-]+$/.test(hostAddress.value)) {
        error.value = "No spaces or special characters are allowed.";
        return;
    }

    const response = await create_subscription(subscriptionPlan.value, hostAddress.value);

    if (response.status === 409) {
        error.value = "The requested host address is already in use. Please choose a different one.";
        hasError.value = true
        return;
    }

    if (paymentUrl.value) {
        window.location.href = paymentUrl.value;
    }
}
</script>

<template>
  <div class="subscription-card p-6 rounded-xl shadow-lg bg-gradient-to-br from-white to-gray-50">
    <!-- Title -->
    <h2 class="subscription-title text-3xl mb-4" :style="{ color: themeColor }">
      Launch Your Hub in Seconds
    </h2>

    <!-- Description -->
    <p class="subscription-description text-gray-700 mb-6">
      Pick the plan that suits your needs and claim your unique hub address. 
      Whether you're experimenting or running a full workspace, everything you need to get started is just a few clicks away.
    </p>

    <!-- Error Message -->
    <div v-if="hasError" class="error-text mb-4 font-medium">{{ error }}</div>

    <!-- Form -->
    <form @submit.prevent="paySubscription">
      <div class="form-group mb-5">
        <label for="planSelect" class="mb-2">Select Your Plan</label>
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
        <label for="hostUrl" class="mb-2">Choose Your Hub Address</label>
        <input
          v-model="hostAddress"
          id="hostUrl"
          type="text"
          class="form-control w-full p-3 border border-gray-300 rounded-lg"
          placeholder="e.g. JakeCorp, ParisMakers, 3DPrint"
          required />
      </div>

      <div class="text-center">
        <button
          type="submit"
          class="btn btn-primary px-8 py-8 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-md "
          :style="{ background: themeColor, borderColor: themeColor }">
          Proceed to Payment
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.subscription-card {
  max-width: 520px;
  margin: 3rem auto;
}

.subscription-title {
  text-align: center;
}

.subscription-description {
  text-align: center;
  line-height: 1.6;
}

.error-text {
    text-align: center;
    color: red
}
</style>
