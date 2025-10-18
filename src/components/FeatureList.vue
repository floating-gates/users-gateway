<script setup>
import { ref, computed, defineProps, defineEmits, onMounted } from 'vue'
import { themeColor, themeColorWhite,
         themeColorOrange } from '../data/items.js'
import { update_features } from '../feature_handling/features_handling.js'

// Props from parent
const props = defineProps({
    independent_payment: Boolean,
    automatic_quotation: Boolean,
    parametric_design:   Boolean
})

const emit = defineEmits(['refresh-features'])

const indep_pay = ref(null)
const auto_quote = ref(null)
const param_design = ref(null)

// Computed wrappers
const automatic_quote = computed(() => ({
  enabled: auto_quote.value
}))

const parametric_design_state = computed(() => ({
  enabled: param_design.value
}))  

async function update() {
    await update_features(
        !!indep_pay.value,
        !!auto_quote.value,
        !!param_design.value
    );

    // Passing by properties works onlu Parent -> Child
    // To refresh menu emit does the Child -> Parent
    emit("refresh-features", {
        independent_payment: !!indep_pay.value,
        automatic_quotation: !!auto_quote.value,
        parametric_design: !!param_design.value
    });
}

async function toggleAutomaticQuotation() {
    auto_quote.value = !auto_quote.value
    update()
}

async function toggleParametricDesign() {
    param_design.value = !param_design.value
    update()
}

async function togglePaymentIndependent() {
    indep_pay.value = !indep_pay.value
    update()
}

// Initialize state from props
onMounted(() => {
    indep_pay.value = props.independent_payment
    auto_quote.value = props.automatic_quotation
    param_design.value = props.parametric_design
})
</script>

<template>
  <div class="hub-features">
    <h2>Hub Features</h2>

    <div class="features-list">
      <div class="feature-item">
        <span class="feature-label"> Automatic Quotes </span>
        <button
          class="feature-toggle"
          :style="automatic_quote.enabled
            ? { background: themeColor, borderColor: themeColor, color: themeColorWhite }
            : { background: themeColorOrange, borderColor: themeColorOrange, color: themeColor }"
          @click="toggleAutomaticQuotation" >
          {{ automatic_quote.enabled ? 'ON' : 'OFF' }}
        </button>
      </div>

      <div class="feature-item">
        <span class="feature-label"> Parametric Design </span>
        <button
          class="feature-toggle"
          :style="parametric_design_state.enabled
            ? { background: themeColor, borderColor: themeColor, color: themeColorWhite }
            : { background: themeColorOrange, borderColor: themeColorOrange, color: themeColor }"
          @click="toggleParametricDesign" >
          {{ parametric_design_state.enabled ? 'ON' : 'OFF' }}
        </button>
      </div>
    </div>
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

