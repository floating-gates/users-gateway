<script setup>
import { themeColor, themeColorOrange, themeColorWhite } from '../data/items.js';
import githubLogo from "../assets/images/github-logo.svg";
import f6sLogo from "../assets/images/f6s-logo.svg";
import mailLogo from "../assets/images/mail-logo.svg";
</script>

<template>
<div class="report-issue-container text-center py-6 px-5 my-6">
  <h2 class="report-issue-title mb-5" :style="{ color: themeColor }">
    Need Help?
  </h2>
  
  <p class="report-issue-description mb-6">
    If you've encountered any problems or unexpected behavior while using the platform, we're here to help! 
    Here are the ways you can reach us:
  </p>
  
  <ul class="report-issue-list text-center">
    <li>
      <img :src="githubLogo" alt="GitHub" class="icon" />
      <a 
        href="https://github.com/floating-gates/users-gateway/issues" 
        target="_blank" >
        Report an issue
      </a>
    </li>
    
    <li>
      <img :src="f6sLogo" alt="Review" class="icon" />
      <a 
        href="https://www.f6s.com/software/review?product=floating-gates"
        target="_blank" >
        Leave a review
      </a>
    </li>
    
    <li>
      <img :src="mailLogo" alt="Email" class="icon" />
      <a href="mailto:contact@floating-gates.com">
        Send an Email
      </a>
    </li>
  </ul>
</div>
</template>

<style scoped>
.report-issue-container {
    background-color: v-bind(themeColorWhite);
    border-radius: 25px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.12);
    padding: 2rem;
    margin: 3rem;
    max-width: 1200px;
    text-align: center;
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
  margin: 1.5rem;
}

.report-issue-list {
    list-style: none;
}

.report-issue-list li {
  display: flex;              /* ✅ makes icon + text align horizontally */
  align-items: center;        /* ✅ vertical centering */
  gap: 12px;                  /* space between icon and link */
  font-size: 1.1rem;
  margin: 1rem 0;
}

.report-issue-list li a {
    color: v-bind(themeColor);
    font-size: 2rem;
    /* font-weight: 500; */
    /* text-decoration: none; */
    transition: color 0.3s ease;
    margin: 1rem;
}

.report-issue-list li a:hover {
    color: v-bind(themeColorOrange);
}

.icon {
    width: 2.2rem;
    height: 2.2rem;
}
</style>
