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
const isMenuOpen = ref(false);

async function logout() {
  try {
    await fetch(logout_api_endpoint, {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.error("Logout failed: ", error);
  } finally {
    localStorage.removeItem(COOKIE_NAME);
    isAuthenticated.value = false;
  }
};

onMounted(async () => {
  isAuthenticated.value = await verify_jwt();
})
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
              <ul class="site-menu main-menu">
                <li><a href="/" class="nav-link">Home</a></li>
                <li><a href="/pricing" class="nav-link">Pricing</a></li>
                <li><a href="/mission" class="nav-link">Mission</a></li>
              </ul>

              <div class="button-group">
                <ul v-if="isAuthenticated" class="site-menu button-menu">
                  <li class="cta-button-outline"><a href="/dashboard">Dashboard</a></li>
                  <li class="cta-primary"><a @click="logout" :style="{ backgroundColor: themeColor }">Logout</a></li>
                </ul>

                <ul v-else class="site-menu button-menu">
                  <li class="cta-button-outline"><a href="/login">Sign in</a></li>
                  <li class="cta-primary"><a :href="demo_url" :style="{ backgroundColor: themeColor }">Demo</a></li>
                </ul>
              </div>
            </template>

            <!-- DASHBOARD HEADER -->
            <template v-else-if="context === 'dashboard'">
              <div class="button-group">
                <ul class="site-menu button-menu">
                  <li class="cta-button-outline"><a :href='host_address'>Customers' View</a></li>
                  <li class="cta-primary"><a href="/profile" :style="{ backgroundColor: themeColor }">Profile</a></li>
                  <li v-if="is_admin" class="cta-button-outline"><a href="/admin_dashboard">Admin Dashboard</a></li>
                </ul>
              </div>
            </template>

            <!-- PROFILE HEADER -->
            <template v-else-if="context === 'profile'">
              <div class="button-group">
                <ul class="site-menu button-menu">
                  <li class="cta-button-outline"><a href="/dashboard">Dashboard</a></li>
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
.site-nav .container {
  max-width: 1550px; 
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
