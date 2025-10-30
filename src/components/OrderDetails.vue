<script setup>
import { defineProps, defineEmits } from 'vue';
import { themeColor, themeColorOrange } from "../data/items.js";
import { downloadFile } from '../project_handler/project.js';

// pub struct ProjectDescription {
//     pub id: String, // UUID text
//     pub proj_name: String,
//     pub description: Option<String>,
//     pub status: String,
//     pub updated_at: String,
//     pub proj_url: String,
//     pub customer_mail: String,
//     pub shipping_address: String,
//     pub city: String,
//     pub postal_code: String,
//     pub country: String,

//     // From quotes (LEFT JOIN)
//     pub price_status: Option<String>,
//     pub price: Option<f64>,
//     pub estimated_price: Option<f64>,
//     pub quantity: Option<i64>,
//     pub delivery_date: Option<String>,
//     // From tolerance_multipliers (LEFT JOIN)
//     pub tolerance: Option<f64>,
//     // From surface_finish (LEFT JOIN)
//     pub surface_finish: Option<String>,

//     pub material: Option<String>,
//     pub machine: Option<String>,
// }

const props = defineProps(['proj']);
const emit  = defineEmits(['close']);
const tol = props.proj.tolerance ? "±" + props.proj.tolerance + "mm" : "Not defined" 
const surf = props.proj.surface_finish ? props.proj.surface_finish : "Not defined" 
</script>

<template>
  <div class="modal-overlay shadow" @click.self="$emit('close')">
    <div class="modal-content">
      <h2 class="modal-title">Order Details</h2>

      <div class="order-field">
        <span class="label">Quantity:</span>
        <span class="value">{{ props.proj.quantity }}</span>
      </div>

      <div class="order-field">
        <span class="label">Machine:</span>
        <span class="value status">{{ props.proj.machine }}</span>
      </div>

      <div class="order-field">
        <span class="label">Material:</span>
        <span class="value status">{{ props.proj.material }}</span>
      </div>

      <div class="order-field">
        <span class="label">Surface finish:</span>
        <span class="value status">{{ surf }}</span>
      </div>

      <div class="order-field">
        <span class="label">Tolerances:</span>
        <span class="value status">{{ tol }}</span>
      </div>
      
      <div class="price-highlight">
        <span>Estimated Price</span>
        <div class="price-value">
          <template v-if="props.proj.estimated_price < 0.01">
            Price not evaluated by the customer
          </template>
          <template v-else>
            {{ props.proj.estimated_price.toFixed(2) }} €
          </template>
        </div>
      </div>

      <div class="order-field">
        <span class="label">Email:</span>
        <span class="value">{{ props.proj.customer_mail }}</span>
      </div>

      <div class="order-field">
        <span class="label">Delivery date:</span>
        <span class="value status">{{ props.proj.delivery_date }}</span>
      </div>
      

      <div class="order-field">
        <span class="label">Shipping Address:</span>
        <span class="value">
          {{ props.proj.shipping_address }}, {{ props.proj.city }}, {{ props.proj.country }}
        </span>
      </div>

      <div class="modal-actions">
        <button
        @click="downloadFile(props.proj.id)"
        class="btn"
        :style="{ borderColor: themeColor, color: themeColor }"
          title="Download the 3D model">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" >
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
</svg>

        </button>
        
        <button
          type="button"
          class="btn"
          :style="{ borderColor: themeColor, color: themeColor }"
          @click="$emit('close')" >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2147483647;
}

.modal-content {
  background: #fff;
  border-radius: 12px;
  padding: 25px 30px;
  width: 420px;
  max-width: 95%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  animation: fadeInUp 0.25s ease;
}

.modal-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}


.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 20px;
}

.btn {
  flex: 1;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  color: white;
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.btn svg {
  width: 2rem;
  height: 2rem;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.btn-download {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.btn-close {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.order-field {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.label {
  font-weight: bold;
  color: #555;
}

.value {
  color: #333;
}

.status {
  text-transform: capitalize;
}

.price-highlight {
  border: 2px solid;
  border-radius: 8px;
  padding: 15px;
  margin: 18px 0;
  text-align: center;
}

.price-highlight span {
  font-size: 14px;
  color: #666;
  display: block;
}

.price-value {
  font-size: 28px;
  font-weight: bold;
  color: v-bind(themeColor);
}

.modal-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn {
  padding: 8px 18px;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  background: white;
  transition: 0.2s ease;
}

.btn:hover {
  opacity: 0.8;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
