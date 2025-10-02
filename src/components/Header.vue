<script setup>
import { ref, defineProps } from "vue";
import { logout } from "../user_handler/logout.js"
import { themeColor, demo_url } from "../data/items.js";

defineProps({
  context: {
    type: String,
  },
  host_address: {
    type: String,
    default: demo_url
  }
})

// const isAuthenticated = ref(false);
const isMenuOpen      = ref(false);

async function platform_logout() {
    await logout(); 
    isAuthenticated.value = false;
    window.location.href = "/login"
};
</script>

<template>
  <nav class="site-nav dark js-clone-nav js-site-navbar site-navbar-target">
    <div class="container">
      <div class="site-navigation">
        <div class="nav-wrapper">
          <!-- Logo -->
          <a href="/" class="logo">
            <img src="../assets/images/logo.webp" alt="Floating Gates Logo" class="logo-img" />
          </a>

          <!-- Hamburger button -->
          <button class="hamburger" @click="isMenuOpen = !isMenuOpen">
            <span :class="{ 'open': isMenuOpen }"></span>
            <span :class="{ 'open': isMenuOpen }"></span>
            <span :class="{ 'open': isMenuOpen }"></span>
          </button>

          <!-- Menus -->
          <div class="menu-container" :class="{ 'mobile-open': isMenuOpen }">
            <!-- LANDING PAGE HEADER -->
            <template v-if="context === 'landing-page'">
              <ul class="site-menu main-menu"   :style="{ color: themeColor, fontWeight: '500', fontSize: '1.05rem' }">
                <li><a href="/" class="nav-link">Home</a></li>
                <li><a href="/pricing" class="nav-link">Pricing</a></li>
                <li><a href="/mission" class="nav-link">Mission</a></li>
                <li><a href="/faq" class="nav-link">FAQ</a></li>
                <li><a href="/case-studies" class="nav-link">Resources</a></li>
              </ul>

              <div class="button-group">
                <ul  class="site-menu button-menu">
                  <li class="cta-button-outline">
                    <a href="/login">Log in</a>
                  </li>
                  <li class="cta-primary">
                    <a :href="demo_url" :style="{ backgroundColor: themeColor }">Demo</a>
                  </li>
                </ul>
              </div>
            </template>

            <!-- DASHBOARD HEADER -->
            <template v-else-if="context === 'dashboard'">
              <div class="button-group">
                <ul class="site-menu button-menu">
                  
                  <li class="cta-button-outline">
                    <a :href='host_address'>Your Hub Client</a>
                  </li>
                  <li class="cta-primary"><a href="/profile" :style="{ backgroundColor: themeColor }">Profile</a>
                  </li>
                </ul>
              </div>
            </template>

            <!-- PROFILE HEADER -->
            <template v-else-if="context === 'profile'">
              <div class="button-group">
                <ul class="site-menu button-menu">
                  <li class="cta-button-outline"><a href="/dashboard">Dashboard</a></li>
                  <li class="cta-primary"><a @click="platform_logout" :style="{ backgroundColor: themeColor }">Logout</a></li>
                </ul>
              </div>
            </template>

            <template v-else-if="context === 'referral'">
              <div class="button-group">
                <ul class="site-menu button-menu">
                  <!-- <li class="cta-button-outline"><a href="/dashboard">Dashboard</a></li> -->
                  <li class="cta-primary"><a @click="platform_logout" :style="{ backgroundColor: themeColor }">Logout</a></li>
                </ul>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.site-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;       /* ensure full width */
  z-index: 2000;
  /* background: white; */
}

.site-nav .container {
  max-width: 1550px;
  margin: 0 auto;    /* centers the container inside nav */
  padding-left: 5%;
  padding-right: 5%;
}

.nav-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.menu-container {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
}

.button-group {
  margin-left: auto;
}

.button-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.button-menu li {
  white-space: nowrap;
}

/* Mobile styles */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
}

.hamburger span {
  width: 24px;
  height: 3px;
  background: #333;
  border-radius: 2px;
  transition: 0.3s;
}

/* animate hamburger to X when open */
.hamburger span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger span.open:nth-child(2) {
  opacity: 0;
}
.hamburger span.open:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

@media (max-width: 768px) {
  .menu-container {
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    flex-direction: column;
    align-items: stretch;
    padding: 1rem;
    gap: 1rem;
    display: none;
    z-index: 1000;
  }

  .menu-container.mobile-open {
    display: flex;
  }

  .hamburger {
    display: flex;
  }

  .button-group {
    margin-left: 0;
    width: 100%;
  }

  .main-menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.75rem;
  }

  .button-menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.75rem;
  }

  .button-menu li {
    width: 100%;
  }

  .cta-button-outline a,
  .cta-primary a {
    display: block;
    width: 100%;
    padding: 1rem;
    text-align: center;
  }
}
</style>
