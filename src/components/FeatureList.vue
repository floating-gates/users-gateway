<script setup>
import { ref, computed, defineProps, onMounted } from 'vue'
import { themeColor, themeColorWhite } from '../data/items.js'
import { updateFeature } from '../user_handler/feature.js'

// Props from parent
const props = defineProps({
  independent_payment: Boolean,
  automatic_quotation: Boolean,
})


const indep_pay = ref(null)
const auto_quote = ref(null)


// Single toggle dispatcher
async function toggleFeature(feature) {
  switch (feature) {
  case 'Automatic Quotes':
      await toggleAutomaticQuotation()
      break
    case 'Independent Payments':
      await togglePaymentIndependent()
      break
  }
}

// Individual toggles
async function toggleAutomaticQuotation() {
  auto_quote.value = !auto_quote.value
  await updateFeature(!!indep_pay.value, !!auto_quote.value)
}

async function togglePaymentIndependent() {
  indep_pay.value = !indep_pay.value
  await updateFeature(!!indep_pay.value, !!auto_quote.value)
}

// Computed features list (reactive)
const features = computed(() => [
  {
    name: 'Automatic Quotes',
    enabled: auto_quote.value
  },
  // {
  //   name: 'Independent Payments',
  //   enabled: indep_pay.value
  // }
])


// Set values on mount (useful if props may change late)
onMounted(() => {
  indep_pay.value = props.independent_payment
  auto_quote.value = props.automatic_quotation
})
</script>

<template>
  <div class="hub-features">
    <h2>Hub Features</h2>

    <div class="features-list">
      <div
        v-for="feature in features"
        :key="feature.name"
        class="feature-item"
      >
        <span class="feature-label">{{ feature.name }}</span>
        <button
          class="feature-toggle"
          :class="{ active: feature.enabled }"
          :style="feature.enabled ? { background: themeColor, color: themeColorWhite } : {}"
          @click="toggleFeature(feature.name)"
        >
          {{ feature.enabled ? 'ON' : 'OFF' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hub-features {
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 2rem;
}

.features-list {
  max-width: 450px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9f9f9;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.feature-label {
  font-size: 1rem;
  font-weight: 500;
}

.feature-toggle {
  padding: 0.4rem 1.2rem;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  background: #ccc;
  transition: all 0.3s ease;
}
</style>
