<script setup>
import { reactive, ref } from 'vue'
import { themeColor } from '../config.js'
import { referral_login } from '../referral_handler/login.js'
import { register_referral } from '../referral_handler/registration.js'
import { countries } from '../data/country_list.js'

const showEmailCheck = ref(false)

const form = reactive({
    full_name: '',
    company: '',
    phone_number: '',
    is_private: true,
    postal_code: '',
    email: '',
    password: '',
    country: '',
    provisional_hub_name: ''
})

const errors = reactive({
    full_name: '',
    company: '',
    phone_number: '',
    is_private: '',
    postal_code: '',
    email: '',
    password: '',
    country: '',
    provisional_hub_name: '',
    general: ''
})

async function handleSubmit() {
    Object.keys(errors).forEach(key => errors[key] = '')
    
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
    
    if (!form.provisional_hub_name) {
        errors.provisional_hub_name = 'Hub Name is required to publish the platform as an Enterprise user.'
        hasError = true
    }

    if (!/^[a-z0-9_-]+$/.test(form.provisional_hub_name)) {
    errors.provisional_hub_name = "No spaces or special characters are allowed.";
    hasError = true;
  }
    
    if (!form.is_private && !form.company) {
        errors.company = 'Company name is required when registering as a business.'
        hasError = true
    }
    
    if (!form.phone_number) {
        errors.phone_number = 'Phone number is required.'
        hasError = true
    }
    
    if (!form.postal_code) {
        errors.postal_code = 'Postal code is required.'
        hasError = true
    }
    
    if (!form.country) {
        errors.country = 'Country is required.'
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
        
        const response = await register_referral(registrationForm)
        
        if (!response.ok) {
            if (response.status === 409) {
                errors.email = 'Email already registered.'
            } else {
                errors.general = 'Registration failed. Return status: ' + response.status
            }
            return
        }
                
        showEmailCheck.value = true
        
    } catch (error) {
        console.error('Submission error: ', error)
        alert('A network or unexpected error occurred.')
    }
}
</script>

<template>
<div class="untree_co-hero" id="register-section">
  <div class="container">
    <div v-if="showEmailCheck"
         class="email-check-container" data-aos="fade-up">
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
        Register as a Partner
      </h3>
      <p>
        A member of our team will reach out to discuss an exciting affiliation opportunity. As a partner, you’ll benefit from a 5-30% revenue share on the sales you help generate—creating a win-win collaboration for both of us.
      </p>
      
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
          <label>Hub Name</label>
          <input v-model="form.provisional_hub_name" type="text" class="form-control" />
          <p v-if="errors.provisional_hub_name" class="error-text">{{ errors.provisional_hub_name }}</p>

        </div>
        
        <!-- Is Private -->
        <div class="form-group checkbox-group">
          <input id="isPrivate" type="checkbox" v-model="form.is_private" />
          <label for="isPrivate">Register as a private individual</label>
        </div>
        
        <!-- Company (only if not private) -->
        <div v-if="!form.is_private" class="form-group">
          <label>Company</label>
          <input v-model="form.company" type="text" class="form-control" />
          <p v-if="errors.company" class="error-text">{{ errors.company }}</p>
        </div>
        
        <!-- Phone Number -->
        <div class="form-group">
          <label>Phone Number</label>
          <input v-model="form.phone_number" type="text" class="form-control" />
          <p v-if="errors.phone_number" class="error-text">{{ errors.phone_number }}</p>
        </div>
        
        <!-- Post Code -->
        <div class="form-group">
          <label>Post Code</label>
          <input v-model="form.postal_code" type="text" class="form-control" />
          <p v-if="errors.postal_code" class="error-text">{{ errors.postal_code }}</p>
        </div>
        
        <!-- Country -->
        <div class="form-group">
          <label>Country</label>
          <select v-model="form.country" class="form-control">
            <option disabled value="">Select your Country</option>
            <option v-for="c in countries" :key="c.label" :value="c.label">
              {{ c.name }}
            </option>
          </select>
          <p v-if="errors.country" class="error-text">{{ errors.country }}</p>
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

.checkbox-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.hidden {
    display: none;
}

.heading {
    font-size: 4rem;
    margin-bottom: 2rem;
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
</style>
