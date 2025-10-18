<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import mainPhoto from "../assets/images/hero_pic.webp";
import { themeColor, themeColorOrange, themeColorWhite } from "../data/items";

// Instead of a single string, make it a list
// const heroHeading = [
//     "Move Manufacturing Online",
//     "Customers ask.",
//     "We Automate.",
//     "You deliver."
// ];

const heroHeading = [
    "Invested in Manufacturing?",
    "Let’s make sure your machines work at full capacity."
];

// User input state
const userAddress = ref("");
const isSubmitting = ref(false);
const progress = ref(0);
const placeholder = ref("Choose your hub address");

// Suggested auto-fill text
const suggestedText = ["Gears-Maker",
                       "Smith-Machining",
                       "Medical-Machine-Hub"];

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
    
    setTimeout(() => {
    }, duration);
}

onBeforeUnmount(() => stopTyping()); // cleanup timers
</script>

<template>
<div class="untree_co-hero py-lg-8" id="hero">
  <div class="container wider-container">
    <div class="row align-items-center">
      <div class="col-12">
        <div class="dots"></div>
        <div class="row align-items-center">
          <div class="col-lg-7 ml-auto order-lg-2 image-col">
            <img :src="mainPhoto" alt="Technology Proxy in action" class="img-fluid hero-image" />
          </div>
          
          <div class="col-lg-5 ps-lg-5 intro" id="header">
            <h1 class="heading"
                style="font-size: 2.9rem; line-height: 1.2; max-width: 100%;"
                data-aos="fade-up"
                data-aos-delay="100">
              <span v-for="(line, idx) in heroHeading" :key="idx" :style="{ color: themeColor }" class="block">
                {{ line }}
              </span>
            </h1>
            
            <div class="excerpt"
                 data-aos="fade-up"
                 data-aos-delay="100">
              <p>
                Publish your HUB at <strong :style="{ color: themeColorOrange }">YourCompany.com</strong>.  
                Get customer requests, check if they fit, and send quotes automatically — without wasting time on sales calls or manual checks.
              </p>
            </div>
            
            <form v-if="!isSubmitting" @submit.prevent="submitAddress" class="address-form" data-aos="fade-up" data-aos-delay="200">
              <input
                v-model="userAddress"
                type="text"
                :placeholder="placeholder"
                @focus="stopTyping"
                @input="stopTyping"
                class="address-input"
                />
              <button type="submit" class="address-submit" Start Here >
                <span>Launch Your App</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"/>
                </svg>
              </button>
            </form>
            <div v-else class="address-form">
              <button type="button" class="progress-btn w-100"
                      :style="{ 
                              background: `linear-gradient(90deg, ${themeColorOrange} ${progress}%, ${themeColor} ${progress}%)`,
                              borderColor: themeColorOrange 
                              }">
                Setting up hub... {{ Math.floor(progress) }}%
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
.intro {
    margin-top: 4rem;
}

.heading .block {
    display: block;
}

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
    background-color: v-bind(themeColorWhite);
    transition: background-color 0.3s ease;
}

.address-input:focus {
    background-color: #fff;
    box-shadow: inset 0 0 0 2px v-bind(themeColor);
}

.address-submit {
  padding: 0.9rem 1.6rem;
  min-width: 56px;
  min-height: 56px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px; /* ⬅️ Adds clear horizontal space between text and icon */
  font-weight: 600;
  letter-spacing: 0.3px;
  transition: background-color 0.3s ease, transform 0.2s ease, color 0.3s ease;
  color: v-bind(themeColorWhite);
  background-color: v-bind(themeColor);
}

.address-submit:hover {
  background-color: v-bind(themeColorOrange);
  color: v-bind(themeColor);
  transform: translateY(-1px);
  cursor: pointer;
}

.address-submit svg {
  width: 1.2em; /* ⬅️ Makes the icon match text size */
  height: 1.2em;
  stroke: v-bind(themeColorWhite);
  transition: stroke 0.3s ease, transform 0.3s ease;
}

.address-submit:hover svg {
  stroke: v-bind(themeColor); /* stays white on orange bg */
  transform: translateX(4px); /* ⬅️ slight movement forward on hover */
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


