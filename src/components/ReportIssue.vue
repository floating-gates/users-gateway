<script setup>
import { themeColor, themeColorOrange, themeColorWhite } from '../data/items.js';
</script>

<template>
  <div class="report-issue-container text-center py-6 px-5 my-6">
    <h2 class="report-issue-title mb-5" :style="{ color: themeColor }">
      Need Help? Report an Issue
    </h2>
    
    <p class="report-issue-description mb-6">
      If you've encountered any problems or unexpected behavior while using the platform, we're here to help! 
      You can submit an issue via GitHub or reach out directly via email.
    </p>
    
    <div class="d-flex justify-content-center gap-5 flex-wrap">
      <!-- GitHub button -->
      <a
        href="https://github.com/floating-gates/users-gateway/issues"
        target="_blank"
        class="btn btn-pill"
        :style="{ background: themeColor, borderColor: themeColor, color: themeColorWhite }">
        Report on GitHub
      </a>

      <!-- Email button -->
      <a
        href="mailto:contact@floating-gates.com"
        class="btn btn-pill"
        :style="{ background: themeColorOrange, borderColor: themeColorOrange, color: themeColor }">
        Contact Us via Email
      </a>
    </div>
  </div>
</template>

<style scoped>
.report-issue-container {
    background-color: v-bind(themeColorWhite);
    border-radius: 25px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.12);
    padding: 3rem 2rem;
    margin: 3rem auto; 
    max-width: 700px;
}

.report-issue-title {
    font-size: 2.0rem;
    font-weight: 700;
    color: v-bind(themeColor);
    margin-bottom: 2.5rem;
}

.report-issue-description {
    font-size: 1.2rem;
    color: #555;
    max-width: 720px;
    margin: 0 auto 1.5rem auto;
    line-height: 1.7;
}

.btn-pill {
    border-radius: 50px;
    padding: 0.8rem 1rem;
    font-weight: 500;
    margin: 1rem;
    font-size: 1.1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    text-transform: none;
}

.btn-pill:hover {
    transform: translateY(-2px);
}
</style>
