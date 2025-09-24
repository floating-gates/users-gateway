<script setup>
import { ref, onMounted } from 'vue'
import { themeColor } from '../data/items'
import { set_new_passwd } from '../user_handler/recovery.js'
import Header from '../components/Header.vue'

const passwd = ref('')
const user_id = ref(0)
const error = ref('')
const success = ref('')
const isLoading = ref(false)

async function handleNewPasswd() {
    error.value = ''
    success.value = ''
    let hasError = false
    
    // Validate input
    if (!passwd.value) {
        error.value = 'Password is required.'
        hasError = true
    }
    
    if (hasError) return
    
    isLoading.value = true
    
    try {
        const response = await set_new_passwd(passwd.value, user_id.value)
        
        if (response.ok) {
            success.value = 'Password updated successfully. You can now log in.'
            passwd.value = ''
        } else {
            const data = await response.json().catch(() => ({}))
            error.value = data.message || 'Failed to set new password. Please try again.'
        }
    } catch (e) {
        error.value = e.message || 'Network error. Please check your connection.'
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    const params = new URLSearchParams(window.location.search)
    user_id.value = params.get('recover_mail')
})
</script>

<template>
  <Header :context="'landing-page'" />
  
  <div class="untree_co-hero" >
    <div class="container-fluid login-container container">
      <h2 class="heading" data-aos="fade-up">Set New Password</h2>
      
      <form @submit.prevent="handleNewPasswd">
        <div v-if="error" class="error-text" data-testid="error-message">
          {{ error }}
        </div>
        
        <div v-if="success" class="success-text" data-testid="success-message">
          {{ success }}
        </div>
        
        <div class="form-group">
          <label>New password</label>
          <input
            v-model="passwd"
            class="form-control"
            type="password"
            required
            placeholder="Enter your password"
            />
        </div>
        
        <button
          type="submit"
          class="btn btn-primary mb-4"
          :style="{ background: themeColor, borderColor: themeColor }"
          :disabled="isLoading"
          >
          {{ isLoading ? 'Setting new password...' : 'Set new password' }}
        </button>
      </form>
    </div>
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
  font-size: 2rem;
  margin: 3rem;
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
