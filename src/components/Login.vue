<script setup>
import RegistrationForm from "./RegistrationForm.vue";
import LoginForm from "./LoginForm.vue";
import Header from "./Header.vue";

import { ref } from 'vue';

const showRegisterForm = ref(false);

function switchToRegister() {
  showRegisterForm.value = true;
}

function switchToLogin() {
  showRegisterForm.value = false;
}
</script>

<template>
  <Header :context="'login'" />
  
  <div class="untree_co-hero" id="auth-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 offset-lg-3">

          <div v-if="!showRegisterForm">
            <LoginForm @switch-to-register="switchToRegister" />
          </div>
          <div v-else>
            <RegistrationForm @switch-to-login="switchToLogin"/>
          </div>
          
          
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

.toggle-link a {
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
}

.btn {
  width: 100%;
}

.heading {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
}
</style>
