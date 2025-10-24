<script setup>
import mainPhoto from "../assets/images/hero_pic_.webp";

import { 
  themeColor, 
  themeColorOrange, 
  themeColorGold, 
  themeColorWhite 
} from "../data/items";
</script>

<template>
  <section class="untree_co-section bg-light" id="how_does_it_work">
    <div class="container text-center" data-aos="fade-up">
      <!-- TITLE -->
      <h1 class="heading">
        <span class="enhance-sequential">How does it work?</span>
      <!--   <sub :style="{ color: themeColorOrange, fontSize: '1.3rem' }"> -->
      <!--     USING GATES -->
      <!--   </sub> -->
      </h1>

      <!-- SUBTITLE / DESCRIPTION -->
      <p class="subtitle" data-aos="fade-up" data-aos-delay="100">
        Gates provides to You a Manufacturing Hub to funnel orders, while it host publicly a CAD Online to permit Your customers to engineer and price the devices ahead of time under your supervison.
      </p>

      <!-- IMAGE -->
      <div class="image-wrapper" data-aos="zoom-in" data-aos-delay="200">
        <img 
          :src="mainPhoto" 
          alt="How it works illustration" 
          class="main-image"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.untree_co-section {
  overflow-x: hidden;
  padding: 6rem 2rem;
  background-color: v-bind(themeColorWhite);
}

.container {
  max-width: 1400px;
  display: flex;
  flex-direction: column; /* stack children vertically */
  align-items: center; /* center horizontally */
  gap: 2.5rem; /* consistent spacing between elements */
}

.heading {
  font-size: 3rem;
  font-weight: 550;
  color: v-bind(themeColor);
  line-height: 1.2;
  text-align: center;
}

.heading sub {
  display: block;
  letter-spacing: 1px;
}

.subtitle {
  max-width: 1000px;
  color: #444;
  font-size: 1.15rem;
  line-height: 1.7;
  text-align: center;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-image {
  width: 100%;
  max-width: 1500px;
  height: auto;
  object-fit: cover;
  border-radius: 2rem;
  border: 5px solid v-bind(themeColor);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.main-image:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.enhance-sequential .letter {
  color: v-bind(themeColor);
  animation: letter-highlight 20s infinite;
  animation-delay: var(--delay);
}
</style>
