<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import mainPhoto from "../assets/images/hero_pic.webp";
import { themeColor, themeColorOrange, themeColorWhite } from "../data/items";

const heroHeading = "Host your Manufacturing to Elevate and Automate Customers'Projects";

// User input state
const userAddress = ref("");
const isSubmitting = ref(false);
const progress = ref(0);
const placeholder = ref("Choose your hub name (e.g. Smith-Machining)");

// Suggested auto-fill text
const suggestedText = ["John-Smith-Machining", "Makers-Of-The-Worls-Inc", "Looney-Red-Hub"];

// state for controlling typewriter
let typingStopped = false;
let activeTimers = [];

// Sequential typewriter effect
function autoFillMultiple(textList, delayBetween) {
  let current = 0;

  function typeText() {
    if (typingStopped) return; // stop typing if user interacts

    placeholder.value = "";
    userAddress.value = ""; // clear input
    const text = textList[current];
    let index = 0;

    const interval = setInterval(() => {
      if (typingStopped) {
        clearInterval(interval);
        return;
      }
      if (index < text.length) {
        userAddress.value += text[index];
        index++;
      } else {
        clearInterval(interval);
        const timer = setTimeout(() => {
          current = (current + 1) % textList.length;
          typeText();
        }, delayBetween);
        activeTimers.push(timer);
      }
    }, 160);
    activeTimers.push(interval);
  }

  typeText();
}

onMounted(() => {
  const timer = setTimeout(() => {
    autoFillMultiple(suggestedText, 2500);
  }, 2000);
  activeTimers.push(timer);
});

// stop typewriter when user types or focuses
function stopTyping() {
  typingStopped = true;
  activeTimers.forEach(clearInterval);
  activeTimers.forEach(clearTimeout);
  activeTimers = [];
}

// Form submission
function submitAddress() {
  if (!userAddress.value) return;

  stopTyping();

  // STYLED COUNTDOWN
  const duration = 1200;
    const step = 50;
    const interval = setInterval(() => {
      progress.value += (step / duration) * 100;
    if (progress.value >= 100) {
      clearInterval(interval);
        window.location.href = "/login?provisional_hub_name=" + userAddress.value;
    }
  }, step);

    isSubmitting.value = true;

    // // Set cookie (expires in 30 days)
    // const days = 30;
    // const expires = new Date(Date.now() + days * 864e5).toUTCString();
    // document.cookie = `host_address=${encodeURIComponent(userAddress.value)}; expires=${expires}; path=/`;

    
    setTimeout(() => {
        // window.location.href = "/login?provisional_hub_name=" + userAddress.value;
  }, duration);
}

onBeforeUnmount(() => stopTyping()); // cleanup timers
</script>

<template>
<div class="untree_co-hero py-lg-8" id="home-section">
<div class="container wider-container">
  <div class="row align-items-center">
      <div class="col-12">
        <div class="dots"></div>
        <div class="row align-items-center">
          <div class="col-lg-6 ml-auto order-lg-2" data-aos="fade-right" data-aos-delay="400">
            <img :src="mainPhoto" alt="Floating Gates in action" class="img-fluid" />
          </div>
          
          <div class="col-lg-5 ps-lg-5">
            <h1 class="heading"
                style="font-size: clamp(2rem, 4vw, 3.5rem); line-height: 1.2; max-width: 100%;"
                data-aos="fade-up"
                data-aos-delay="100">
              {{ heroHeading }}
            </h1>
            <div class="excerpt" data-aos="fade-up" data-aos-delay="100">
              <p>
                Publish your platform at <span :style="{ color: themeColorOrange }">YOUR-NAME.COM</span> to easily receive and manage <span :style="{ color: themeColorOrange }">orders</span>, check its feasability, set its price and handle manufacturing.
              </p>
            </div>
            
            <form v-if="!isSubmitting"
                  @submit.prevent="submitAddress"
                  class="address-form d-flex align-items-center"
                  data-aos="fade-up"
                  data-aos-delay="200">
              <input required
                     v-model="userAddress"
                     type="text"
                     :placeholder="placeholder"
                     @focus="stopTyping"
                     @input="stopTyping"
                     class="form-control address-input" />
              <button
                type="submit"
                class="btn btn-primary address-submit"
                style="[{ background: themeColor }, { borderColor: themeColor }]
                       @click = submitAddress">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"/>
                </svg>
              </button>
            </form>
            
            <!-- Progress button when submitting -->
            <div v-else class="address-form d-flex align-items-center">
              <button type="submit"
                      class="btn btn-primary progress-btn w-100"
                      :style="{ 
                        background: `linear-gradient(90deg, ${themeColorOrange} ${progress}%, ${themeColor} ${progress}%)`,
                        borderColor: themeColorOrange 
                      }">
                <span class="loading"> Setting up the hub... {{ Math.floor(progress) }}%</span>
              </button>
            </div>
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

.wider-container {
  max-width: 1420px; /* Bootstrap’s xl is 1140px, this gives you extra room */
  margin: 0 auto;
}

.address-form {
    display: flex;
    gap: 10px;
    max-width: 100%;
    margin-top: 20px;
    background-color: #fff;
    border-radius: 12px;
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

.progress-btn {
    padding: 0.9rem 1.2rem;
    min-height: 56px;   
    border: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease, transform 0.2s ease;
    color: white;
    background-color: v-bind(themeColor);
    flex: 1;
}


.address-submit svg {
  width: 24px;
  height: 24px;
  stroke: white;
}
</style>


