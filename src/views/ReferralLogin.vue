<script setup>
import ReferralRegistrationForm from "../components/ReferralRegistrationForm.vue";
import ReferralLoginForm from "../components/ReferralLoginForm.vue";
import Header from "../components/Header.vue";

import { ref, onMounted } from "vue";
import { verify_referral_credentials } from "../referral_handler/login.js"

const showLoginForm = ref(false);
const isAuthenticated = ref(false);

function toggleLoginForm() {
  showLoginForm.value = !showLoginForm.value;
}


onMounted(
    async () => {
        const credentials = await verify_referral_credentials();
        
        if ( credentials.is_authenticated ) { window.location.replace("/referral-dashboard")}
        }
        
)
</script>

<template>
<Header :context="'login'" />

  <div class="untree_co-hero" id="-refferral-auth-section">
    <!-- <div class="container"> -->
     <div class="container-fluid login-container container">

      <div class="row align-items-center">
        <!-- Form column -->
        <div class="col-lg-5">
          <div v-if="showLoginForm">
            <ReferralLoginForm @switch-to-register="toggleLoginForm" />
          </div>
          <div v-else>
            <ReferralRegistrationForm @switch-to-login="toggleLoginForm"/>
          </div>
        </div>

        <!-- Image column -->
        <div class="col-lg-7">
          <img 
            src="../assets/images/platform_logic_pic.webp" 
            alt="Manufacturing Hub" 
            class="img-fluid rounded"
          />
        </div>
      </div>
      <div v-if="!showLoginForm" class="register-footer">
        <p> Already have an account?
          <a href="#" @click.prevent="toggleLoginForm">Login</a>
        </p>
        <p>By registering you confirm to have read and accepted the
          <a href="/terms_and_services">Terms and Conditions</a>
          and 
          <a href="/privacy-policy"> Privacy Policy</a>
        </p>
      </div>
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
  margin-bottom: 1rem;
}

.toggle-link {
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1rem;
}


.login-container {    
    padding-left: 5%;
    padding-right: 5%;
    max-width: 1600px; /* Optional: cap it so it doesn’t grow too much on ultra-wide monitors */
    margin: 0 auto;
}


.img-fluid {
  max-width: 100%;
  height: auto;
}

.register-footer {
  text-align: center;
}
</style>


