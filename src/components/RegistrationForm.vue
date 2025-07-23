<script setup>
import { reactive, ref } from 'vue'
import { themeColor } from '../data/items.js'
import { user_login } from '../user_handler/login.js'
import { register_user } from '../user_handler/registration.js'

const form = reactive({
    full_name: '',
    company: '',
    phone_number: '',
    postal_code: '',
    email: '',
    password: '',
    logo: null,
})

const errors = reactive({
    full_name: '',
    email: '',
    password: '',
    role: '',
    logo: '',
})

const submitted = ref(false)

function handleLogoUpload(event) {
    const file = event.target.files[0]
    
    // Clear previous logo error
    errors.logo = ''
    
    if (!file) return
    
    // Validate file type
    if (!file.type.includes('png')) {
        errors.logo = 'Only PNG files are allowed.'
        form.logo = null
        return
    }
    
    // Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        errors.logo = 'File size must be less than 5MB.'
        form.logo = null
        return
    }
    
    form.logo = file
}

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
        const registrationForm = new FormData()
        Object.entries(form).forEach(([key, value]) => registrationForm.append(key, value))
        
        const response = await register_user(registrationForm)
        
        if (!response.ok) {
            if (response.status === 409) {
                errors.email = 'Email already registered.'
            } else {
                alert(result.message || 'Registration failed.')
            }
            return
        }
        
        const login_response = await user_login(form.email, form.password)
        if (login_response.ok) {
            submitted.value = true
            window.location.replace("/dashboard");
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
        
        <!-- Logo Upload -->
        <div class="form-group">
          <label>Upload Logo</label>
          <input type="file" accept=".png,image/png" class="form-control" @change="handleLogoUpload" />
          <p v-if="errors.logo" class="error-text">{{ errors.logo }}</p>
        </div>
        
        <!-- Submit Button -->
        <button
          type="submit"
          class="btn btn-primary"
          :style="[{ background: themeColor, borderColor: themeColor }]"
          >
          Submit
        </button>
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

.register-footer {
  margin-top: 2rem;
  margin-bottom: 4rem; /* Adjust as needed */
  text-align: center;
  font-size: 0.95rem;
}
</style>
