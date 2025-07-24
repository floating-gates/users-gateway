<script setup>
import { ref } from "vue";
import mainPhoto from "../assets/images/heat_exchanger.webp";
import { themeColor, themeColorOrange, themeColorWhite } from "../data/items";

// Hero section content
const heroHeading = "Host your Platform to Receive and Simulate Customers' Projects";

// User input state
const userAddress = ref("");

// Submit handler
function submitAddress() {
  if (!userAddress.value) return;

  // Set cookie (expires in 30 days)
  const days = 30;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `host_address=${encodeURIComponent(userAddress.value)}; expires=${expires}; path=/`;

  // Redirect to /profile
  window.location.href = "/profile";
}
</script>

<template>
<div class="untree_co-hero" id="home-section">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-12">
        <div class="dots"></div>
        <div class="row align-items-center">
          <div
            class="col-lg-6 ml-auto order-lg-2"
            data-aos="fade-right"
            data-aos-delay="400"
            >
            <img :src="mainPhoto" alt="Heat Exchanger" class="img-fluid" />
          </div>
          
          <div class="col-lg-6">
            <h1   class="heading"
                  style="font-size: clamp(2rem, 4vw, 3.5rem); line-height: 1.2; max-width: 100%;"
                  data-aos="fade-up"
                  data-aos-delay="100">
              {{ heroHeading }}
            </h1>
            <div class="excerpt" data-aos="fade-up" data-aos-delay="100">
              <p>
                Easily receive <span :style="{ color: themeColorOrange }">orders</span>
                to perform simulation, and handle manufacturing.
              </p>
            </div>
            <form
              @submit.prevent="submitAddress"
              class="address-form d-flex align-items-center"
              data-aos="fade-up"
              data-aos-delay="200"
              >
              <input
                v-model="userAddress"
                type="text"
                placeholder="Enter where you want to host your hub, i.g. glass-maker"

                class="form-control address-input"
                required
                />
              <button
                type="submit"
                class="btn btn-primary address-submit"
                style="[{ background: themeColor }, { borderColor: themeColor }]
                        @click = submitAddress"
                
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>
                
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.btn-hover:hover {
    color: v-bind(themeColorWhite);
    background-color: v-bind(themeColorOrange);
}

.address-form {
    display: flex;
    gap: 10px;
    max-width: 100%;
    margin-top: 20px;
    background-color: #fff;
    border-radius: 10px;
    padding: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.address-input {
    flex: 1;
    padding: 0.9rem 1.2rem;
    font-size: 1.05rem;
    border: none;
    border-radius: 8px;
    outline: none;
    background-color: #f7f7f7;
    transition: background-color 0.3s ease;
}

.address-input:focus {
    background-color: #fff;
    box-shadow: inset 0 0 0 2px v-bind(themeColor);
}

.address-submit {
    padding: 0.9rem 1.2rem;
    min-width: 56px;
    min-height: 56px;
    border: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease, transform 0.2s ease;
    color: white;
    background-color: v-bind(themeColor);
}

.address-submit:hover {
    background-color: v-bind(themeColorOrange);
    transform: translateY(-1px);
    cursor: pointer;
}

.address-submit svg {
  width: 24px;
  height: 24px;
  stroke: white;
}
</style>


