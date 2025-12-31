<script setup>
import { ref } from 'vue'
import { themeColor } from '../config.js'
import { user_login } from '../user_handler/login.js'
import { handleGoogleAuthentication } from '../user_handler/oauth.js'
import google_icon from "../data/images/google_icon.svg"

const login_form = ref({ email: '', password: '' })
const error = ref(null)
const isLoading = ref(false)

async function handleLogin() {
  error.value = null
    
  if (!login_form.value.email)    { error.value = 'Email is required.' }
  if (!login_form.value.password) { error.value = 'Password is required.' }
  if ( error.value ) return

  isLoading.value = true

  try {
      const response = await user_login( login_form.value.email,
                                         login_form.value.password)
    if (response.status === 202) {
        window.location.href = '/dashboard'
    } else {

      // WTF is this 
      const data = await response.json().catch(() => ({}))
      if (response.status === 401) error.value = 'Invalid email or password.'
      else if (response.status === 400) error.value = 'No user found.'
      else if (response.status === 403 && data.error_code === 'EMAIL_NOT_VERIFIED')
        error.value = 'Your email is not verified. Check your inbox.'
      else if (response.status === 403)
        error.value = 'Account access forbidden. Please contact support.'
      else if (response.status >= 500)
        error.value = 'Server error. Please try again later.'
      else error.value = data.message || 'Unknown error. Please try again.'
    }
  } catch (e) {
    console.error('Login error:', e)
    error.value = e.message || 'Network error. Please check your connection.'
  } finally {
    isLoading.value = false
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

    <div class="form-group">
      <label>Password</label>
      <input
        v-model="login_form.password"
        type="password"
        class="form-control"
        required
        placeholder="Enter your password"
      />
    </div>

    <!-- Buttons Row -->
    <div class="button-row">
      <button
        type="submit"
        class="btn btn-primary"
        :style="{ background: themeColor, borderColor: themeColor }"
        :disabled="isLoading" >
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>

      <button class="btn btn-google"
              type="button"
              @click="handleGoogleAuthentication">
        Login with
        <img :src="google_icon" alt="Google icon" class="google-icon" />
      </button>
    </div>
  </form>

  <div class="toggle-link mt-3">
    Don't have an account?
    <a href="#" @click.prevent="$emit('switch-to-register')">Register</a>
    \ Do you need to
    <a href="#" @click.prevent="$emit('switch-to-recovery')">Recover Password</a>?
  </div>
</template>

<style scoped>
.heading {
  font-size: 4rem;
}

.form-group {
    margin-top: 2rem;
    margin-bottom: 1rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.toggle-link {
  text-align: center;
  font-size: 0.9rem;
}

</style>
