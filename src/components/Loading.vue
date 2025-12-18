<script setup>
import { defineProps } from 'vue';
import { themeColor } from "../config.js";

defineProps({
  message: {
    type: String,
    default: 'Loading...'
  },
});
</script>

<template>
  <div class="loading-wrapper">
    <svg
      class="spinner"
      width="50px"
      height="50px"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
        :stroke="themeColor"
      />
    </svg>
  </div>
</template>

<style scoped>
.loading-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  color: inherit;
}

.spinner {
  animation: rotate 1s linear infinite;
  margin-bottom: 1rem;
}

.path {
  stroke-linecap: round;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% { transform: rotate(360deg); }
}

@keyframes dash {
  0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
  50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
  100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
}

.loading-wrapper p {
  font-size: 1rem;
  font-weight: 500;
}
</style>
