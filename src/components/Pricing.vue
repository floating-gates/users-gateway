<script setup>
import Header from './Header.vue'

import { themeColor, themeColorOrange,
         themeColorWhite, price_list } from "../data/items";

const heading = "Plans and Pricing";
const subHeading = "Pricing refer only to the hosting services (GATES). You choose the final price to charge the customer to manufacture their devices";
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
        price: "Coming Soon...",
    },
    {
        name: capitalizeWord(package_names_vec[2]),
        price: "Request a Quote",
    },
];
</script>


<template>
<Header :context="'landing-page'" />

<div class="untree_co-section bg-light" id="pricing-section">
  <div class="container">
    <div class="row pricing-title ">
      <div class="col-12 text-center" data-aos="fade-up" data-aos-delay="0">
        <h2 class="heading">
          {{ heading }}
          <sub :style="{ color: themeColorOrange, 'font-size': '0.8rem' }">for GATES</sub>
        </h2>
        
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
                  <li> Up to 20 Active Projects</li>
                  <li> Automatic Quotations </li>
                  <li> Your Brand in Display </li> 
                </ul>
                <p class="text-center mb-0">
                  <a
                    href="/profile"
                    class="btn btn-outline-primary btn-hovered"
                    :style="[ { backgroundColor: themeColorWhite },
                            { borderColor: themeColorWhite },
                            { color: themeColor }]">
                    {{ startButtonName }}</a >
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
                  <li>Manufacturing Checks</li>
                  <li>Shape Modifier</li>
                </ul>
                <p class="text-center mb-0">
                  <a
                    href="/profile"
                    class="btn btn-primary"
                    :style="[
                            { backgroundColor: themeColor },
                            { borderColor: themeColor },
                            ]" >{{ startButtonName }}</a
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
                  <li>Proprietary URL</li>
                  <li>Parametric CAD of your best product</li>
                  <li>Non subscription package</li>
                </ul>
                <p class="text-center mb-0">
                  <a
                    href="/profile"
                    class="btn btn-outline-primary btn-hovered"
                    :style="[ { backgroundColor: themeColorWhite },
                            { borderColor: themeColorWhite },
                            { color: themeColor }]">
                    {{ startButtonName }}</a
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
.heading {
    margin: 3rem;  
    font-size: 3.0rem;  
    font-weight: 550;
    text-align: center;
}

.btn {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn:hover {
    
    transform: scale(1.05);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
    z-index: 2; /* ensures it overlays above neighbors */
}

.ul-check.primary li::before {
    color: v-bind(themeColorOrange); 
}

.pricing {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 2rem; /* keep it smooth */
}

.pricing:hover {
    transform: scale(1.03);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
  z-index: 2; /* ensures it overlays above neighbors */
}
</style>
