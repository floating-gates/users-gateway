<script setup>
import { ref, onMounted, defineProps } from "vue";
import { verify_jwt } from "../user_handler/login.js"
import { themeColor, logout_api_endpoint,
         COOKIE_NAME } from "../data/items.js";
import { demo_url } from "../data/demo.js"

defineProps({
    context: {
        type: String,
    },
    admin: {
        type: String,
        default: false
    },
    host_address: String,
    default: demo_url
})

const isAuthenticated = ref(false);

onMounted(async () => {
    isAuthenticated.value = await verify_jwt();
})

const logout = async () => {
    try {
        await fetch(logout_api_endpoint, {
            method: 'POST',
            credentials: 'include',
        });
    } catch (error) {
        console.error("Logout failed", error);
    } finally {
        localStorage.removeItem( COOKIE_NAME );
        isAuthenticated.value = await verify_jwt();
    }
};
</script>


<template>
<nav class="site-nav dark js-site-navbar mb-5 site-navbar-target">
  <div class="container">
    <div class="site-navigation">
      <a href="/" class="logo m-0 float-left">
        <img src="../assets/images/logo.webp" alt="Logo" class="logo-img" />
      </a>
      
      <div v-if="context === 'landing-page'">
        
        <ul class="js-clone-nav d-block d-lg-inline-block site-menu float-left">
          <li><a href="#features-section" class="nav-link">How does it work</a></li>
          <li><a href="#pricing-section" class="nav-link">Pricing</a></li>
          <li><a href="/mission" class="nav-link">Mission</a></li>
          <li><a href="/services" class="nav-link">Services</a></li>
        </ul>
        
        <!-- Auth buttons (can be context-specific too) -->
        <ul v-if="!isAuthenticated" class="js-clone-nav d-block mt-1 d-lg-inline-block site-menu float-right">
          <li class="cta-button-outline" style="margin-right: 10px;">
            <a href="/login">Sign in</a>
          </li>
                    
          <li class="cta-primary">
              <a :href="demo_url" :style="[{ backgroundColor: themeColor }]">Demo</a>
          </li>
          
        </ul>
        
        <ul v-else-if="isAuthenticated" class="js-clone-nav d-block mt-1 d-lg-inline-block site-menu float-right">
          <li class="cta-button-outline" style="margin-right: 10px;">
            <a href="/dashboard">Dashboard</a>
          </li>
          <li class="cta-primary">
            <a @click="logout" :style="[{ backgroundColor: themeColor }]">Logout</a>
          </li>
        </ul>
      </div>
      
      <!-- DASHBOARD HEADER -->
      
      <div v-if="context === 'dashboard'">
        <ul class="js-clone-nav d-block mt-1 d-lg-inline-block site-menu float-right" v-if="isAuthenticated">
          <li class="cta-button-outline" style="margin-right: 10px;">
            <a :href='host_address'>Customers' View</a>
          </li>
          <li class="cta-button-outline" style="margin-right: 10px;">
            <a href="/profile">Profile</a>
          </li>
        </ul>
      </div>
      
      <div v-else-if="context === 'profile'" >
        <ul class="js-clone-nav d-block mt-1 d-lg-inline-block site-menu float-right" v-if="isAuthenticated">
          <li class="cta-button-outline" style="margin-right: 10px;">
            <a href="/dashboard">Dashboard</a>
          </li>
        </ul>
      </div>
   
      
      <div v-if="admin" >
        <ul class="js-clone-nav d-block mt-1 d-lg-inline-block site-menu float-right">
          <li class="cta-button-outline" >
            <a href="/admin_dashboard">Admin Dashboard</a>
          </li>
        </ul>
      </div>
      
    </div>
  </div>
</nav>
</template>
