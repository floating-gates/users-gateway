<script setup>
import { ref, onMounted, defineProps } from "vue";
import { verify_jwt } from "../user_handler/login.js"
import { themeColor, logout_api_endpoint, COOKIE_NAME } from "../data/items.js";
import { demo_url } from "../data/demo.js"

defineProps({
    context: {
        type: String,
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    host_address: {
        type: String,
        default: demo_url
    }
})

const isAuthenticated = ref(false);

async function logout() {
    try {
        await fetch(logout_api_endpoint, {
            method: 'POST',
            credentials: 'include',
        });
    } catch (error) {
        console.error("Logout failed: ", error);
    } finally {
        localStorage.removeItem( COOKIE_NAME );
        isAuthenticated.value = await verify_jwt();
    }
};

onMounted(async () => {
    isAuthenticated.value = await verify_jwt();
})
</script>


<template>
<nav class="site-nav dark js-clone-nav  js-site-navbar mb-5 site-navbar-target">
  <div class="container">
    <div class="site-navigation">
      <a href="/" class="logo float-left">
        <img src="../assets/images/logo.webp" alt="Floating Gates Logo" class="logo-img" />
      </a>
      
      <!-- LANDING PAGE HEADER -->
      
      <div v-if="context === 'landing-page'">
        
        <ul class="d-flex d-lg-inline-block site-menu">
          <!-- <li><a href="/#why" class="nav-link">Why</a></li> -->
          <!-- <li><a href="/#how_does_it_work" class="nav-link">How does it work</a></li> -->
          <li><a href="/" class="nav-link">Home</a></li>
          <li><a href="/pricing" class="nav-link">Pricing</a></li>
          <li><a href="/mission" class="nav-link">Mission</a></li>
          <!-- <li><a href="/use-cases" class="nav-link">Use Cases</a></li> -->
        </ul>
        
        
        <ul v-if="isAuthenticated" class="d-flex d-lg-inline-block site-menu float-right">
          <li class="cta-button-outline">
            <a href="/dashboard">Dashboard</a>
          </li>
          <li class="cta-primary">
            <a @click="logout" :style="{ backgroundColor: themeColor }">Logout</a>
          </li>
        </ul>
        
        <ul v-else class="d-block mt-1 d-lg-inline-block site-menu float-right">
          <li class="cta-button-outline">
            <a href="/login">Sign in</a>
          </li>
          <li class="cta-primary">
            <a :href="demo_url" :style="{ backgroundColor: themeColor }">Demo</a>
          </li>
        </ul>
      </div>
      
      <!-- DASHBOARD HEADER -->
      
      <div v-if="context === 'dashboard'">
        <ul class="d-block mt-1 d-lg-inline-block site-menu float-right">
          <li class="cta-button-outline" >
            <a :href='host_address'>Customers' View</a>
          </li>
          <li class="cta-primary" >
            <a href="/profile" :style="{ backgroundColor: themeColor }">Profile</a>
          </li>
        </ul>
      </div>
      
      <div v-else-if="context === 'profile'" >
        <ul class=" d-block mt-1 d-lg-inline-block site-menu float-right">
          <li class="cta-button-outline">
            <a href="/dashboard">Dashboard</a>
          </li>
        </ul>
      </div>
      
      
      <div v-if="is_admin" >
        <ul class=" d-block mt-1 d-lg-inline-block site-menu float-right">
          <li class="cta-button-outline" >
            <a href="/admin_dashboard">Admin Dashboard</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
</template>


<style scoped>
.cta-button-outline {
    margin-right: 10px;
}
</style>
