<script setup>
import { defineEmits, defineProps } from 'vue';
import { themeColor, themeColorOrange } from "../config.js";
import { mark_proj_as_shipped } from "../price_handler/price_setting.js";

const emit = defineEmits(['close', 'shipped']);

const props = defineProps(['proj']);

function mark_as_shipped() {
    mark_proj_as_shipped(props.proj);
    emit('shipped'); // optionally notify parent something shipped
    emit('close');   // close the modal
}
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>Shipping Details</h2>

      <div class="form-group">
        <label>Address:</label>
        <p>{{ props.proj.shipping_address }}</p>
      </div>

      <div class="form-group">
        <label>City:</label>
        <p>{{ props.proj.city }}</p>
      </div>

      <div class="form-group">
        <label>Postal Code:</label>
        <p>{{ props.proj.postal_code }}</p>
      </div>

      <div class="form-group">
        <label>Country:</label>
        <p>{{ props.proj.country }}</p>
      </div>

      <div class="modal-actions">
        <button
          type="button"
          class="btn"
          @click="$emit('close')"
          :style="{ borderColor: themeColor, color: themeColor }"
        >
          Go Back
        </button>
        <button
          type="button"
          class="btn"
          @click="mark_as_shipped"
          :style="{
            borderColor: themeColorOrange,
            backgroundColor: themeColorOrange,
            color: themeColor }"  >
          Shipped
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
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99
}

.modal-content {
  background: #fff;
  border-radius: 10px;
  padding: 25px;
  width: 400px;
  max-width: 95%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 22px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select,
textarea {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 8px 16px;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
</style>
