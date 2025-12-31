<script setup>
import { ref } from 'vue'
import { themeColor } from '../config.js'
import { start_recovery_password } from '../user_handler/recovery.js'

const email = ref('')
const error = ref('')
const success = ref('')
const isLoading = ref(false)

async function handleRecovery() {
    error.value = ''
    success.value = ''
    let hasError = false
    
    // Validate input
    if (!email.value) {
        error.value = 'Email is required.'
        hasError = true
    }
    
    if (hasError) return
    
    isLoading.value = true
    
try {
  const response = await start_recovery_password(email.value)

  if (response.ok) {
    success.value = 'Recovery email sent. Please check your inbox (or Spam)!'
    email.value = ''
  } else if (response.status === 401) {
    error.value = 'Invalid email. Please try again.'
  } else if (response.status === 403) {
    error.value = 'Account access forbidden. Please contact support.'
  } else if (response.status === 404) {
    error.value = 'No account found with this email.'
  } else if (response.status === 500) {
    error.value = 'Server error. Please try again later.'
  } else {
    error.value = 'Unexpected error. Please try again.'
  }
} catch (e) {
    error.value = e.message   
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
<h2 class="heading" data-aos="fade-up">Recover Password</h2>

<form @submit.prevent="handleRecovery">
  <div v-if="error" class="error-text" data-testid="error-message">
    {{ error }}
  </div>
  
  <div v-if="success" class="success-text" data-testid="success-message">
    {{ success }}
  </div>
  
  <div class="form-group">
    <label>Email</label>
    <input
      v-model="email"
      type="email"
      class="form-control"
      required
      placeholder="Enter your email"
      />
  </div>
  
  <button
    type="submit"
    class="btn btn-primary mb-4"
    :style="{ background: themeColor, borderColor: themeColor }"
    :disabled="isLoading"
    >
    {{ isLoading ? 'Recovering...' : 'Recover' }}
  </button>
</form>

<div class="toggle-link mt-3">
  Don't have an account?
  <a href="#" @click.prevent="$emit('switch-to-recovery')">Register</a>
</div>
</template>

<style scoped>
.form-group {
    margin-bottom: 1rem;
}

.form-control {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.heading {
    font-size: 4rem;
    margin-bottom: 2rem;
}

.error-text {
    color: #d32f2f;
    font-size: 0.875rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background-color: #ffebee;
    border: 1px solid #ffcdd2;
    border-radius: 4px;
    display: block;
}

.success-text {
    color: #388e3c;
    font-size: 0.875rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background-color: #e8f5e8;
    border: 1px solid #c8e6c9;
    border-radius: 4px;
    display: block;
    font-weight: 500;
}
</style>
