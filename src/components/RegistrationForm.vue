<script setup>
import { reactive, ref, onMounted } from 'vue'
import { themeColor, themeColorOrange } from '../config.js'
import { user_login } from '../user_handler/login.js'
import { register_user } from '../user_handler/registration.js'
import { validate_logo } from '../user_handler/logo.js'

const previewUrl = ref(null)
const provisional_hub_name = ref('')
const referral_code = ref(null)
const showEmailCheck = ref(false)
      
const form = reactive({
    full_name: '',
    company: '',
    phone_number: '',
    postal_code: '',
    email: '',
    password: '',
    logo: null,
    referral_code: referral_code,
    provisional_hub_name: provisional_hub_name
})

const errors = reactive({
    general: '',
    full_name: '',
    email: '',
    password: '',
    logo: '',
    role: ''
})

function handleLogoUpload(event) {
    const file = event.target.files[0]
    previewUrl.value = null
    errors.logo = ''
    
    if ( validate_logo(file, errors.logo) ) {
        form.logo = file
        previewUrl.value = URL.createObjectURL(file)
    }
}

async function handleSubmit() {
    Object.keys(errors).forEach( key => errors[key] = '' )
    
    let hasError = false
    
    if (form.email) {
        form.email = form.email.toLowerCase().trim()
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (!form.email) {
        errors.email = 'Email is required.'
        hasError = true
    } else if (!emailRegex.test(form.email)) {
        errors.email = 'Invalid email format.'
        hasError = true
    }
    
    if (!form.full_name) {
        errors.full_name = 'Full name is required.'
        hasError = true
    }
    
    if (!form.password) {
        errors.password = 'Password is required.'
        hasError = true
    }
    
    if (hasError) return
    
    try {
        const registrationForm = new FormData()
        Object.entries(form).forEach(([key, value]) => {
            if (value !== null) registrationForm.append(key, value)
        })
        
        const response = await register_user(registrationForm)
        
        if (!response.ok) {
            if (response.status === 409) {
                errors.email = 'Email already registered.'
            } else {
                errors.general = 'Registration failed. Return status: ' + response.status
            }
        }
                
        showEmailCheck.value = true
        // await user_login(form.email, form.password)
        
    } catch (error) {
        console.error('Submission error: ', error)
        alert('A network or unexpected error occurred.')
    }
}

onMounted( () => {
    const params = new URLSearchParams(window.location.search);
    provisional_hub_name.value = params.get("provisional_hub_name");
    referral_code.value = params.get("referral_code");
})
</script>

<template>
<div class="untree_co-hero" id="register-section">
  <div class="container">
    <div v-if="showEmailCheck" class="email-check-container" data-aos="fade-up">
      <h3 class="heading" data-aos="fade-up">Check your inbox!</h3>
      <p>
        We’ve sent a confirmation link to <strong>{{ form.email }}</strong>.
        Please verify your email to activate your account.
      </p>
      <p class="small mt-2">
        Didn’t receive the email? Check your spam folder.
      </p>
    </div>
    
    <div v-else>
      <h3 class="heading" data-aos="fade-up">
        Get Your Hub
        <sub class="no-payment-text">
          NO PAYMENT REQUIRED.
        </sub>
      </h3>
      
      <form @submit.prevent="handleSubmit" data-aos="fade-up" data-aos-delay="100">
      <!-- General error -->
      <p v-if="errors.general" class="error-text">{{ errors.general }}</p>
      
      <!-- Full Name -->
      <div class="form-group">
        <label>Full Name</label>
        <input v-model="form.full_name" type="text" class="form-control" />
        <p v-if="errors.full_name" class="error-text">{{ errors.full_name }}</p>
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
      
      <div class="form-group">
        <label>Hub Name (Optional)</label>
        <input v-model="form.provisional_hub_name" type="text" class="form-control" />
      </div>
      
      <!-- Logo Upload -->
      <div class="form-group">
        <label>Upload your Logo (Optional - .png ONLY)</label>
        
        <div class="mb-3">
          <!-- Hidden file input -->
          <input
            id="logo-upload"
            type="file"
            accept=".png,image/png"
            class="hidden"
            @change="handleLogoUpload"
            />
        </div>
        <!-- Visible upload button -->
        <label for="logo-upload" class="upload-button">
          <svg xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               stroke-width="1.5"
               :stroke="themeColor"
               style="width: 32px; height: 32px;">
            <path stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
          </svg>
        </label>
        
        <div v-if="previewUrl" class="preview">
          <img :src="previewUrl" alt="Logo preview" />
        </div>
        <p v-if="errors.logo" class="error-text">{{ errors.logo }}</p>
      </div>
            
      <div class="form-group">
        <label>Phone Number (Optional)</label>
        <input v-model="form.phone_number" type="text" class="form-control" />
      </div>
      
      <!-- Post Code -->
      <div class="form-group">
        <label>Post Code (Optional)</label>
        <input v-model="form.postal_code" type="text" class="form-control" />
      </div>
      
      <!-- Referral -->
      <div class="form-group mb-3">
        <label>Referral Code (Optional)</label>
        <input v-model="form.referral_code" type="text" class="form-control" />
      </div>
      
      <!-- Submit -->
      <div class="text-center mt-3">
        <button
          type="submit"
          class="btn btn-primary"
          :style="{ background: themeColor, borderColor: themeColor }">
          Register
        </button>
      </div>
    </form>
    </div>
  </div>  
</div>
</template>

<style scoped>
.form-group {
    margin-bottom: 1rem;
}

.hidden {
    display: none;
}

.heading {
    font-size: 4rem;
    margin-bottom: 2rem;
}

.upload-button .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    cursor: pointer;
    transition: background 0.2s;
}

.upload-button:hover {
    transform: translateY(3px);
    cursor: pointer;
}

.preview {
    margin-top: 10px;
}
.preview img {
    max-width: 120px;
    max-height: 120px;
    border-radius: 8px;
    border: 1px solid #ddd;
}

.form-control {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.no-payment-text {
    position: absolute;
    bottom: 8;      /* Align to bottom */
    right: 0;       /* Align to right */
    color: v-bind(themeColorOrange); /* Or use themeColorOrange */
    font-size: 1rem;
}

.error-text {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}
</style>
