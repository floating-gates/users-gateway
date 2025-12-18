<script setup>
import { ref, computed, onMounted } from 'vue'
import { themeColor, themeColorOrange,
         themeColorWhite } from '../config.js'
import { get_autoquote_config,
         update_autoquote_config } from '../feature_handling/autoquote.js'

///////////////////////////////////////////////////////////////
// struct CompleteAutoquoteConfig {
//     min_price: f64,
//     overhead_multiplier: f64,
//     materials: Vec<MaterialQuoteData>,
//     machines: Vec<MachineQuoteData>,
//     quantity_multipliers: Vec<NumericPropertyPair>,
//     tolerance_multipliers: Vec<NumericPropertyPair>,
//     surface_finish_costs: Vec<StringPropertyPair>,
//     urgency_multipliers: Vec<NumericPropertyPair>,
///////////////////////////////////////////////////////////////
const autoquote_config = ref({})
const isLoading = ref(false)
const error = ref('')
const success = ref('')

// === Computed table definitions ===
const tableDefinitions = computed(() => ({
  'Quantity Discount': {
    keyLabel: 'Quantity',
    valueLabel: 'Price Discount (%)',
    key_data_type: 'number',
    data: autoquote_config.value.quantity_multipliers,
  },
  'Tolerance Cost': {
    keyLabel: 'Tolerance (mm)',
    valueLabel: 'Price Increase (%)',
    key_data_type: 'number',
    data: autoquote_config.value.tolerance_multipliers,
  },
  'Surface Finish': {
    keyLabel: 'Finish Type',
    valueLabel: 'Cost per squared cm (€/cm²)',
    key_data_type: 'string',
    data: autoquote_config.value.surface_finish_costs,
  },
  'Urgency': {
    keyLabel: 'Urgent Delivery (days)',
    valueLabel: 'Price Increase (%)',
    key_data_type: 'integer',
    data: autoquote_config.value.urgency_multipliers,
  },
}))

// === Row management ===
// If .ID is 0 - then is to be inserted in database
function addRow(table) {  table.push({ id: 0, key: 0, value: 0 }) }
function removeRow(table, index) {  table.splice(index, 1) }

// === Save to backend ===
async function update_db() {
  isLoading.value = true
  error.value = ''
  success.value = ''

  try {
    // Reinsert correct id inside the struct, so you can delete it      
    autoquote_config.value = await update_autoquote_config( autoquote_config.value )
    success.value = 'Configuration updated successfully!'
  } catch (err) {
    console.error('Update failed:', err)
    error.value = 'Update failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}

// === Fetch from backend ===
onMounted(async () => {
  try {
    autoquote_config.value = await get_autoquote_config()
  } catch (err) {
    error.value = 'Failed to load configuration. Please reload the page.'
  }
})
</script>
    
<template>
<div class="selector-container">
  <div class="selector-zone"> 
    <div class="header-section">
      <h2 class="selector-title">Automatic Quotation</h2>
      <p class="subtitle">
        Configure your data to make the quotation as precise as possible:
      </p>
    </div>
    
    <!-- === MAIN INPUTS === -->
    <div class="input-section">
      <div class="input-group">
        <label>Minimum Payment (€)</label>
        <input
          type="number"
          v-model.number="autoquote_config.min_price"
          class="input-field"
          min="1"
        />
        <label>Business Overhead (%)</label>
        <input
          type="number"
          v-model.number="autoquote_config.overhead_multiplier"
          class="input-field"
          min="1"
        />
      </div>
    </div>

    <!-- === DYNAMIC TABLES === -->
    <div class="tables-section">
      <div
        v-for="(def, name) in tableDefinitions"
        :key="name"
        class="table-block"
      >
        <h4 class="table-title">{{ name }}</h4>

        <table class="cost-table">
          <thead>
            <tr>
              <th>{{ def.keyLabel }}</th>
              <th>{{ def.valueLabel }}</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(row, i) in def.data" :key="i">
              <td>
                <input
                  v-if="def.key_data_type === 'number'"
                  type="number"
                  v-model.number="row.key"
                  class="table-input"
                  min="0.0001"    />
                <input
                  v-else-if="def.key_data_type === 'string'"
                  type="text"
                  v-model="row.key"
                  class="table-input"    />
                <input
                  v-else-if="def.key_data_type === 'integer'"
                  type="number"
                  step="1"
                  min="1"
                  v-model="row.key"
                  class="table-input" />
              </td>

              <td>
                <input
                  type="number"
                  v-model.number="row.value"
                  class="table-input"
                  min="0"
                />
              </td>

              <td>
                <button class="remove-btn" @click="removeRow(def.data, i)">
                  ✕
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <button class="add-btn" @click="addRow(def.data)">+ Add Row</button>
      </div>
    </div>

    <!-- === UPDATE BUTTON === -->
    <div class="update-section">
      <button class="update-btn" @click="update_db" :disabled="isLoading">
        {{ isLoading ? 'Saving...' : 'Update Configuration' }}
      </button>

      <transition name="fade">
        <p v-if="success" class="save-message success">{{ success }}</p>
      </transition>

      <transition name="fade">
        <p v-if="error" class="save-message error">{{ error }}</p>
      </transition>
    </div>
    </div>
  </div>

</template>

<style scoped>

.input-section {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #475569;
}

.input-field {
  padding: 0.5rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  width: 200px;
}

.tables-section {
  background: white;
  margin: 2rem;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.table-block {
  margin-bottom: 2rem;
}

.table-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #475569;
}

.cost-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 0.5rem;
}

.cost-table th,
.cost-table td {
  border-bottom: 1px solid #e2e8f0;
  padding: 0.5rem;
  text-align: left;
}

.table-input {
  width: 100%;
  padding: 0.3rem 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.25rem;
}

.add-btn,
.remove-btn {
  background: v-bind(themeColor);
  color: white;
  border: none;
  padding: 0.4rem 0.75rem;
  border-radius: 0.4rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background 0.2s;
}

.remove-btn {
  background: #ef4444;
}

.add-btn:hover {
  background: v-bind(themeColorOrange);
}
.remove-btn:hover {
  background: #dc2626;
}

.update-section {
  text-align: center;
  margin-top: 2rem;
}

.update-btn {
  background: v-bind(themeColor);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
}

.update-btn:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.update-btn:hover:not(:disabled) {
    background: v-bind(themeColorOrange);
}

.save-message {
  margin-top: 0.75rem;
  font-weight: 500;
  font-size: 0.95rem;
}

.save-message.success {
  color: #16a34a;
}

.save-message.error {
  color: #dc2626;
}

/* Smooth fade for messages */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
