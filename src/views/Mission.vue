<script setup>
import { themeColor, themeColorOrange } from "../data/items";
import mainPhoto from "../assets/images/manufacturing_hub_pic.webp";
import Header from "../components/Header.vue";

const missionHeading = "Our Mission";
const missionSubHeading = "Maximizing the Potential of 3D Manufacturing Everywhere";
const missionQuote =
  '"Our goal is to empower individuals and businesses by enabling easy access to underutilized 3D printers — turning idle capacity into real-world value."';
function youtubeVideoUrl() {
  const youtubeVideoId = "yKL8LrZcOcc"; // Replace with your own mission-related video
  return `https://www.youtube.com/watch?v=${youtubeVideoId}&amp;t=9s`;
}
</script>

<template>
  <Header :context="'login'" />
  <div class="untree_co-section bg-light">
    <div class="container">
      <div class="row justify-content-between d-flex align-items-center">
        <div class="col-lg-4">
          <span
            class="caption"
            data-aos="fade-up"
            data-aos-delay="0"
            :style="[{ color: themeColor }]"
          >
            {{ missionHeading }}
          </span>
          <h2 class="heading" data-aos="fade-up" data-aos-delay="100">
            {{ missionSubHeading }}
          </h2>
          <div class="mb-4" data-aos="fade-up" data-aos-delay="200">
            <p>
              We believe that every 3D printer, whether in a household garage or a corporate lab,
              holds untapped potential. Our mission is to connect customers with these machines
              — effortlessly, transparently, and sustainably.
            </p>
            <ul class="list-unstyled ul-check primary">
              <li>Unlock idle 3D printing capacity worldwide</li>
              <li>Offer seamless access to local machines for customers</li>
              <li>Empower makers, creators, and businesses</li>
            </ul>
          </div>
        </div>

        <div class="col-lg-7" data-aos="fade-up" data-aos-delay="400">
          <a :href="youtubeVideoUrl()" class="btn-video" data-fancybox>
            <span class="wrap-icon-play">
              <svg
                class="bi bi-play-fill"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
                />
              </svg>
            </span>
            <img :src="mainPhoto" alt="Mission Image" class="img-fluid img-shadow" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

.ul-check.primary li::before {
  color: v-bind(themeColorOrange); 
}

</style>
