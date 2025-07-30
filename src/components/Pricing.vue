<script setup>
import { themeColor, themeColorOrange, price_list } from "../data/items";
const heading = "Pricing";
const subHeading = "Pricing refer to the hosting services. While you can choose how much charging the customer to produce their devices";
const startButtonName = "Get Started";

const package_names_vec = Object.keys(price_list)

function capitalizeWord(word) {
    return  word.charAt(0).toUpperCase() + word.slice(1)
}


const packages = [
  {
    name: capitalizeWord(package_names_vec[0]),
    price: price_list[package_names_vec[0]],
  },
  {
    name: capitalizeWord(package_names_vec[1]),
    price: "Coming Soon",
  },
  {
    name: capitalizeWord(package_names_vec[2]),
    price: "Coming Soon",
  },
];
</script>


<template>
  <div class="untree_co-section" id="pricing-section">
    <div class="container">
      <div class="row pricing-title">
        <div class="col-12 text-center" data-aos="fade-up" data-aos-delay="0">
          <h2 class="heading">{{ heading }}</h2>
          <p>{{ subHeading }}</p>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="row">
            <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div class="pricing">
                <div class="body">
                  <div class="price">
                    <span class="d-block plan">{{ packages[0].name }}</span>
                    <span class="price" :style="[{ color: themeColor }]"
                          >{{ packages[0].price }}<sup>€/Month</sup></span>
                  </div>
                  <pre></pre>
                  <ul class="list-unstyled ul-check primary mb-5">
                    <li> Up to 30 Projects</li>
                    <li> Private Projects </li>
                    <li> STL to STEP converter </li> 
                  </ul>
                  <p class="text-center mb-0">
                    <a
                      href="/profile"
                      class="btn btn-outline-primary btn-hovered"
                      :style="[
                        { color: themeColor },
                        { borderColor: themeColor },
                      ]"
                      >{{ startButtonName }}</a
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4" data-aos="fade-up" data-aos-delay="200">
              <div class="pricing active">
                <div class="body">
                  <div class="price">
                    <span class="d-block plan">{{ packages[1].name }}</span>
                    <span class="price" :style="[{ color: themeColor }]"
                      ><span><sup>{{ packages[1].price }}</sup></span></span
                    >
                  </div>
                  <ul class="list-unstyled ul-check primary mb-5">
                    <li>Unlimited Project Number</li>
                    <li>Customer data Ownership</li>
                    <li>200 Simulation Hours</li>
                  </ul>
                  <p class="text-center mb-0">
                    <a
                      href="/profile"
                      class="btn btn-primary"
                      :style="[
                        { backgroundColor: themeColor },
                        { borderColor: themeColor },
                      ]"
                      >{{ startButtonName }}</a
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4" data-aos="fade-up" data-aos-delay="300">
              <div class="pricing">
                <div class="body">
                  <div class="price">
                    <span class="d-block plan">{{ packages[2].name }}</span>
                    <span class="price" :style="[{ color: themeColor }]">
                      
                      <span><sup>{{ packages[2].price }}</sup></span></span
                    >
                  </div>
                  <ul class="list-unstyled ul-check primary mb-5">
                    <li>Package {{ packages[1].name }} plus </li>
                    <li>Proprietary URL</li>
                    <li>Topology Optimization method</li>
                  </ul>
                  <p class="text-center mb-0">
                    <a
                      href="/profile"
                      class="btn btn-outline-primary btn-hovered"
                      :style="[
                        { color: themeColor },
                        { borderColor: themeColor },
                      ]">{{ startButtonName }}</a
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.btn-hovered:hover {
  color: v-bind(themeColor);
  background-color: v-bind(themeColorOrange);
  border-color: v-bind(themeColor);
}

.ul-check.primary li::before {
  color: v-bind(themeColorOrange); 
}
</style>
