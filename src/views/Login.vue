<script setup>
import RegistrationForm from "../components/RegistrationForm.vue";
import RecoveryUser from "../components/RecoveryUser.vue";
import LoginForm from "../components/LoginForm.vue";
import Header from "../components/Header.vue";
import { verify_user_credentials } from "../user_handler/login.js";
import { terms_and_services_url, privacy_policy_url } from "../config.js"
import { ref, onMounted } from "vue";

const currentView = ref("login"); 

function switchTo(view) {
    currentView.value = view;
}

onMounted(async () => {
    const credentials = await verify_user_credentials();
    if (credentials.is_authenticated) {
        window.location.replace("/dashboard");
    }
});
</script>

<template>
<Header :context="'login'" />

<div class="untree_co-hero" id="auth-section">
  <div class="container-fluid login-container container">
    <div class="row align-items-center">
      <!-- Form column -->
      <div class="col-lg-5">
        <div v-if="currentView === 'login'">
          <LoginForm 
            @switch-to-register="() => switchTo('register')" 
            @switch-to-recovery="() => switchTo('recovery')" 
            />
        </div>
        <div v-else-if="currentView === 'register'">
          <RegistrationForm @switch-to-login="() => switchTo('login')" />
        </div>
        <div v-else-if="currentView === 'recovery'">
          <RecoveryUser @switch-to-login="() => switchTo('login')" />
        </div>
      </div>
      
      <!-- Image column -->
      <div class="col-lg-7">
        <img 
          src="../data/images/platform_logic_pic.webp" 
          alt="Manufacturing Hub" 
          class="img-fluid rounded"
          />
      </div>
    </div>
    
    <div class="register-footer">
      <div v-if="currentView === 'register'">
        <p>
          Already have an account?
          <a href="#" @click.prevent="() => switchTo('login')">Login</a>
        </p>
      </div>
      
      <div>
        <p>
          Are you a partner? 
          <a href="/referral-login">Login as Partner</a>
        </p>

        <p>
          By registering you confirm to have read and accepted the
          <a :href="terms_and_services_url">Terms and Conditions</a>
          and 
          <a :href="privacy_policy_url">Privacy Policy</a>
        </p>
      </div>
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

.register-footer {
    text-align: center;
}
</style>


