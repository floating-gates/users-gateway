<script setup>
import mainPhoto from "../data/images/hero_pic_.webp";

import { 
  themeColor, 
  themeColorOrange, 
  themeColorGold, 
  themeColorWhite 
} from "../config.js";
</script>

<template>
  <section class="untree_co-section bg-light" id="how_does_it_work">
    <div class="container text-center">

      <h1 class="heading">
        <span :style="{ color: themeColorOrange }">How?  </span>
        <span :style="{ fontSize: '2.5rem' }">
           Integrate your work with clear requirements and live tracking.
        </span>
      </h1>

      <p class="subtitle">
        Gates provides to You a Manufacturing Hub to funnel orders, while it host publicly a CAD Online to permit Your customers to engineer and price the devices ahead of time under your supervison.
      </p>

      <!-- IMAGE -->
      <div class="image-wrapper" data-aos="zoom-in" data-aos-delay="200">
        <!-- <a :href="youtubeVideoUrl" class="video-overlay" data-fancybox> -->
        <!--     <div class="play-button" :style="{ backgroundColor: themeColor }"> -->
        <!--         <svg width="24" height="24" viewBox="0 0 16 16" fill="white"> -->
        <!--             <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/> -->
        <!--           </svg> -->
        <!--       </div> -->
        <!--     <div class="video-pulse" :style="{ borderColor: themeColor + '30' }"></div> -->
        <!--   </a> -->
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
  padding: 5rem 1rem;
  background-color: v-bind(themeColorWhite);
}

.container {
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.heading {
  font-size: 3rem;
  font-weight: 600;
  color: v-bind(themeColor);
  line-height: 1.2;
  text-align: center;
}

.subtitle {
  max-width: 1000px;
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
}

.video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background: rgba(0, 0, 0, 0.3); */
    /* text-decoration: none; */
    transition: all 0.3s ease;
    z-index: 3;
}

.video-overlay:hover .video-container .hero-image {
    transform: scale(1.05);
}

.play-button {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.play-button:hover {
    transform: scale(1.1);
}

.video-pulse {
    position: absolute;
    width: 120px;
    height: 120px;
    border: 3px solid;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) scale(1.3);
        opacity: 0;
    }
}
</style>
