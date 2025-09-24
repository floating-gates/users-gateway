<script setup>
import { ref } from 'vue';
import { themeColor, auth_api_endpoint} from '../data/items'
import { user_login } from '../user_handler/login.js'
import { useRouter } from 'vue-router'

// Form state
const login_form = ref({ email: '', password: '' })
const router = useRouter()
const error = ref('')
const isLoading = ref(false)
const isLoggedIn = ref(false)

async function handleLogin() {
  // Clear previous error at the start
  error.value = ''
  let hasError = false
  
  // Validate input
  if (!login_form.value.email) {
    error.value = 'Email is required.'
    hasError = true
  }
  if (!login_form.value.password) {
    error.value = 'Password is required.'
    hasError = true
  }
  if (hasError) return
  
  isLoading.value = true
  
  try {
    const response = await user_login(login_form.value.email, login_form.value.password);
    
    if (response.status === 202) {
      router.push('/dashboard');
    } else {
      // Handle different error statuses
      if (response.status === 401) {
        error.value = 'Invalid email or password. Please try again.';
      } else if (response.status === 403) {
        error.value = 'Account access forbidden. Please contact support.';
      } else if (response.status >= 500) {
        error.value = 'Server error. Please try again later.';
      } 
    }
  } catch (e) {
    console.error('Login error:', e); // Debug log
    error.value = e.message || 'Network error. Please check your connection.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <h2 class="heading" data-aos="fade-up">Login</h2>
    
  <div v-if="error" class="error-text" data-testid="error-message">
    {{ error }}
  </div>
  
  <form @submit.prevent="handleLogin" data-aos="fade-up" data-aos-delay="100">
    <div class="form-group">
      <label>Email</label>
      <input
        v-model="login_form.email"
        type="email"
        class="form-control"
        required
        placeholder="Enter your email"
      />
    </div>
    <div class="form-group mb-4">
      <label>Password</label>
      <input
        v-model="login_form.password"
        type="password"
        class="form-control"
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
      {{ isLoading ? 'Logging in...' : 'Login' }}
    </button>
  </form>
  
<div class="toggle-link mt-3">
  Don't have an account?
  <a href="#" @click.prevent="$emit('switch-to-register')">Register</a>
  \  Do you need to
  <a href="#" @click.prevent="$emit('switch-to-recovery')">Recover Password</a>?
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
  color: red;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 4px;
  display: block;
}

.success-text {
  margin-top: 1rem;
  color: green;
  font-weight: bold;
}
</style>
