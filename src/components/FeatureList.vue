<script setup>
import { ref, computed, defineProps, onMounted } from 'vue'
import { themeColor, themeColorWhite, themeColorOrange } from '../data/items.js'
import { updateFeature } from '../user_handler/feature.js'

import AutoQuoteForm from './AutoQuoteForm.vue'

// Props from parent
const props = defineProps({
  independent_payment: Boolean,
  automatic_quotation: Boolean,
})

const indep_pay = ref(null)
const auto_quote = ref(null)

const show_auto_quote_form = ref(false)

// Toggle automatic quotation
async function toggleAutomaticQuotation() {
  auto_quote.value = !auto_quote.value
  await updateFeature(!!indep_pay.value, !!auto_quote.value)
}

// Toggle independent payment
async function togglePaymentIndependent() {
  indep_pay.value = !indep_pay.value
  await updateFeature(!!indep_pay.value, !!auto_quote.value)
}

// Computed object for automatic quotes
const automatic_quote = computed(() => ({
  name: 'Automatic Quotes',
  enabled: auto_quote.value
}))

function toggleAutomaticQuotationForm() {
    show_auto_quote_form.value = !show_auto_quote_form.value
}

// Initialize state from props
onMounted(() => {
  indep_pay.value = props.independent_payment
  auto_quote.value = props.automatic_quotation
})
</script>

<template>
  <div class="hub-features">
    <h2>Hub Features</h2>

    <div class="features-list">
      <div class="feature-item">
        <span class="feature-label">{{ automatic_quote.name }}</span>
        <button v-if="auto_quote"
                class="feature-toggle"
                @click="toggleAutomaticQuotationForm" >
          Configure
        </button>
        <button
          class="feature-toggle"
          :style="automatic_quote.enabled
            ? { background: themeColor, borderColor: themeColor, color: themeColorWhite }
            : { background: themeColorOrange, borderColor: themeColorOrange, color: themeColor }"
          @click="toggleAutomaticQuotation" >
          {{ automatic_quote.enabled ? 'ON' : 'OFF' }}
        </button>
      </div>
    </div>
    <AutoQuoteForm v-if="show_auto_quote_form" />
  </div>
</template>

<style scoped>
.hub-features {
  background-color: v-bind(themeColorWhite);
  border-radius: 25px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.12);
  padding: 3rem 2rem;
  margin: 3rem auto;
  max-width: 700px;
  text-align: center;
}

.hub-features h2 {
  font-size: 2rem;
  font-weight: 700;
  color: v-bind(themeColor);
  margin-bottom: 2rem;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.feature-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fafafa;
  padding: 1rem 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.feature-label {
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
}

.feature-toggle {
  padding: 0.6rem 1.4rem;
  border-radius: 50px;
  font-weight: 500;
  font-size: 1rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
}

.feature-toggle:hover {
  transform: translateY(-2px);
}
</style>

