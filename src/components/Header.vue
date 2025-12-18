<script setup>
import { ref, defineProps } from "vue";
import { themeColor, demo_url, docs_links } from "../config.js";
import { logout } from "../user_handler/logout.js"

defineProps({
    context: {
        type: String,
    },
    host_address: {
        type: String,
        default: demo_url
    }
})

const isMenuOpen = ref(false);
const isDocsOpen = ref(false);

</script>

<template>
<nav class="site-nav dark js-clone-nav js-site-navbar">
  <div class="container">
    <div class="site-navigation">
      <div class="nav-wrapper">
        <!-- Logo -->
        <a  href="/dashboard" >
          <img src="../data/images/logo.webp"
               alt="Manufacturing Hub" class="logo logo-img" />
        </a>
        
        <!-- LANDING PAGE HEADER -->
        <template v-if="context === 'dashboard' || context === 'profile'">

          <!-- Menus -->
          <button class="hamburger" @click="isMenuOpen = !isMenuOpen">
            <span :class="{ 'open': isMenuOpen }"></span>
            <span :class="{ 'open': isMenuOpen }"></span>
            <span :class="{ 'open': isMenuOpen }"></span>
          </button>
          
          <div class="menu-container" :class="{ 'mobile-open': isMenuOpen }">
            <div class="header-button-group">
              <ul class="site-menu button-menu">
                
                <!-- PROFILE BUTTON + DROPDOWN -->
                <li v-if="context === 'dashboard'" class="cta-primary"><a href="/profile">Set Up your Factory</a> </li>
                
                <li v-if="context === 'profile'" class="cta-primary"><a href="/dashboard">Dashboard</a></li>
                                
                <li class="dropdown"  @click="isDocsOpen = !isDocsOpen">
                  <a
                    :style="{
                            margin: '1rem',
                            color: themeColor,
                            fontSize: '18px',
                            fontWeight: 550,
                            border: `2px solid ${themeColor}`,
                            padding: '6px 25px',
                            borderRadius: '14px'
                            }"
                     >
                     <span>Profile </span>
                    <span class="chevron"> ▾</span>
                  </a>
                  
                  <ul class="dropdown-menu" v-show="isDocsOpen">
                    <li>
                      <a :href='host_address' class="nav-link">Your 3D CAD Interface</a>
                    </li>
                    <li>
                      <a @click.prevent="logout" class="nav-link">Logout</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</nav>
</template>

<style scoped>
.menu-container {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
}

.header-button-group {
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

/* Dropdown wrapper */
.dropdown {
    position: relative;
    cursor: pointer;
}

/* Dropdown menu */
.dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;       /* aligns under the "Profile" button */
    left: auto;     /* prevents stretching */
    background: white;
    padding: 0.5rem 0;
    list-style: none;
    min-width: 180px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    z-index: 9999;
}

.dropdown-menu li a {
    padding: 0.5rem 1rem;
    display: block;
    white-space: nowrap;
}

.dropdown-menu li a:hover {
    background: #f5f5f5;
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
}
.chevron {
  font-size: 14px;
  opacity: 0.7;
}
</style>
