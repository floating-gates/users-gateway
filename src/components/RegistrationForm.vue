<script setup>
import { reactive, ref } from 'vue'
import { themeColor, register_user_api_endpoint} from '../data/items.js'
import { user_login } from '../user_handler/login.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
    full_name: '',
    company: '',
    phone_number: '',
    postal_code: '',
    email: '',
    password: ''
})

const errors = reactive({
    full_name: '',
    email: '',
    password: '',
    role: '',
})

const submitted = ref(false)


async function handleSubmit() {
  submitted.value = false
  Object.keys(errors).forEach(key => errors[key] = '')

  let hasError = false

  if (!form.full_name) {
    errors.full_name = 'Full name is required.'
    hasError = true
  }

  if (!form.email) {
    errors.email = 'Email is required.'
    hasError = true
  }

  if (!form.password) {
    errors.password = 'Password is required.'
    hasError = true
  }

  if (hasError) return

  try {
    const response = await fetch(register_user_api_endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const result = await response.json()

    if (!response.ok) {
      if (response.status === 409 && result.error_code === 'USER_DUPLICATE') {
        errors.email = 'Email already registered.'
      } else {
        console.error('Registration error:', result)
        alert(result.message || 'Registration failed.')
      }
      return
    }

    // Login right after registration
    const login_response = await user_login(form.email, form.password)
    if (login_response.ok) {
      submitted.value = true
      router.push('/dashboard')
    } else {
      alert('Login failed after registration.')
    }

  } catch (error) {
    console.error('Submission error:', error)
    alert('A network or unexpected error occurred.')
  }
}
</script>


<template>
  <div class="untree_co-hero" id="register-section">
    <div class="container">
      <div class="col-lg-6 offset-lg-3">
        <h2 class="heading mt-0" data-aos="fade-up">Register</h2>
        <form @submit.prevent="handleSubmit" data-aos="fade-up" data-aos-delay="100">
          <!-- Full Name -->
          <div class="form-group">
            <label>Full Name</label>
            <input v-model="form.full_name" type="text" class="form-control" />
            <p v-if="errors.full_name" class="error-text">{{ errors.full_name }}</p>
          </div>

          <!-- Optional Fields -->
          
          <div class="form-group">
            <label>Company Name (Optional)</label>
            <input v-model="form.company"      type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label>Postal Code (optional)</label>
            <input v-model="form.postal_code"  type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label>Phone Number (optional)</label>
            <input v-model="form.phone_number" type="text" class="form-control" />
          </div>

          <!-- Email -->
          <div class="form-group">
            <label>Email</label>
            <input v-model="form.email" type="email" class="form-control" />
            <p v-if="errors.email" class="error-text">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div class="form-group">
            <label>Password</label>
            <input v-model="form.password" type="password" class="form-control" />
            <p v-if="errors.password" class="error-text">{{ errors.password }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="btn btn-primary"
            :style="[{ background: themeColor, borderColor: themeColor }]"
            >
            Submit
          </button>

          <!-- Success Message -->
          <p v-if="submitted" class="success-text" data-aos="fade-up" data-aos-delay="200">
            Registration successful!
          </p>
          <p v-if="errors.email" class="error-text">{{ errors.email }}</p>
        </form>
      </div>
    </div>
    <div class="register-footer">
      Already have an account?
      <a href="#" @click.prevent="$emit('switch-to-login')">Login</a>
      | By registering you apply at <a href="/terms_and_services"> Terms and Conditions</a>
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

.error-text {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.success-text {
  margin-top: 1rem;
  color: green;
  font-weight: bold;
}

.register-footer {
  margin-top: 2rem;
  margin-bottom: 3rem; /* Adjust as needed */
  text-align: center;
  font-size: 0.95rem;
}

</style>
