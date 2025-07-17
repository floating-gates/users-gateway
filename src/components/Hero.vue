<script setup>
import mainPhoto from "../assets/images/heat_exchanger.webp";
import { themeColor, themeColorOrange, themeColorWhite } from "../data/items";

const heroHeading = "Host your Platform to Receive and Simulate Customers' Projects";
const buttonSeeFeature = "How does it work";
const buttonPricing = "Pricing";
</script>

<template>
  <div class="untree_co-hero" id="home-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-12">
          <div class="dots"></div>
          <div class="row align-items-center">
            <div
              class="col-lg-7 ml-auto order-lg-2"
              data-aos="fade-right"
              data-aos-delay="400"
            >
              <img :src="mainPhoto" alt="Heat Exchanger" class="img-fluid" />
            </div>
            <div class="col-lg-5">
              <h1 class="heading" data-aos="fade-up" data-aos-delay="100">
                {{ heroHeading }}
              </h1>
              <div class="excerpt" data-aos="fade-up" data-aos-delay="100">
                <p>
                  Easily receive 
                  <span :style="{ color: themeColorOrange }">3D models</span>
                  to perform simulation, and handle manufacturing—all in one
                  seamless platform.
                </p>
              </div>
              <p data-aos="fade-up" data-aos-delay="200">
                <a
                  href="#features-section"
                  class="btn btn-primary smoothscroll"
                  style="margin-right: 5px"
                  :style="[
                    { background: themeColor },
                    { borderColor: themeColor },
                  ]"
                  >{{ buttonSeeFeature }}</a
                >
                <a
                  href="#pricing-section"
                  class="btn btn-outline-primary smoothscroll btn-hover"
                  :style="[{ color: themeColor }, { borderColor: themeColor }]"
                  >{{ buttonPricing }}</a>
              </p>
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
</style>
