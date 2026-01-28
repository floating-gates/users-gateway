<script setup>
import { ref, defineProps } from "vue";
import { themeColor, themeColorWhite, demo_url,
         docs_links } from "../config.js";
import { logout } from "../user_handler/logout.js";

defineProps({
    context: {
        type: String,
    },
    host_address: {
        type: String,
        default: demo_url
    }
});

const isMenuOpen = ref(false);
const isProfileOpen = ref(false); // Added missing ref
</script>

<template>
  <nav class="site-nav dark js-clone-nav js-site-navbar">
    <div class="container">
      <div class="site-navigation">
        <div class="nav-wrapper">
          <a href="/dashboard">
            <img src="../data/images/logo.webp" alt="Manufacturing Hub" class="logo logo-img" />
          </a>
          
          <template v-if="context === 'dashboard' || context === 'profile'">
            <button class="hamburger" @click="isMenuOpen = !isMenuOpen">
              <span :class="{ open: isMenuOpen }"></span>
              <span :class="{ open: isMenuOpen }"></span>
              <span :class="{ open: isMenuOpen }"></span>
            </button>

            <div class="menu" :class="{ 'open': isMenuOpen }">
              <ul class="menu-list">
                <li v-if="context === 'dashboard'" class="cta">
                  <a href="/profile">Software-Defined Factory</a>
                </li>
                <li v-if="context === 'profile'" class="cta">
                  <a href="/dashboard">Dashboard</a>
                </li>

                <li class="dropdown">
                  <button
                    @click="isProfileOpen = !isProfileOpen"
                    class="cta dropdown-toggle"
                    :style="{ borderColor: themeColor, color: themeColor }"
                  >
                    Profile <span class="chevron"></span>
                  </button>
                  <ul class="dropdown-menu" v-show="isProfileOpen">
                    <li><a :href="host_address">Your 3D CAD Interface</a></li>
                    <li><a href="#" @click.prevent="logout">Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </template> </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.header-button-group {
    margin-left: auto;
}

.menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu-list {
  display: flex;
  align-items: center;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.cta {
    font-weight: 600;
}

.cta a {
  color: v-bind(themeColorWhite);
  background-color: v-bind(themeColor);
  padding: 0.5rem 1.25rem;
  border-radius: 12px;
}

.cta:hover {
    opacity: 0.85;
    transition: all 0.2s;
    transform: translateY(-2px);
}

/* Dropdown */
.dropdown {
  position: relative;
}
.dropdown-toggle {
  background: none;
  border: 2px solid;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  padding: 0.5rem 0;
  list-style: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  z-index: 999;
}
.dropdown-menu li a {
  padding: 0.5rem 1rem;
  white-space: nowrap;
  display: block;
}
.dropdown-menu li a:hover {
  background: #f5f5f5;
}

/* Hamburger */
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
.hamburger span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger span.open:nth-child(2) {
  opacity: 0;
}
.hamburger span.open:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Mobile */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }
  .menu {
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background: #fff;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    display: none;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  .menu.open {
    display: flex;
  }
  .menu-list {
    flex-direction: column;
  }
}
.chevron {
  font-size: 14px;
  opacity: 0.7;
}
</style>
