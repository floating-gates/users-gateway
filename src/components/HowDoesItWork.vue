<script setup>
import dashboard_pic from "../assets/images/manufacturing_hub_pic.webp";
import printer_pic from "../assets/images/printer.webp";
import product_pic from "../assets/images/in_platform_tank.webp"
import dashboard_empty from "../assets/images/dashboard_empty.webp"
import platform_with_pump from "../assets/images/platform_with_pump.webp";
import { themeColor, themeColorOrange, themeColorLille,
         themeColorGold, themeColorWhite } from "../data/items";

// const heading = "How does it work?";
// const heading = "0 → 1: From nothing to customers via Gates."

const items = [
  {
      id: 1,
      name: "Publish the Platform with your Brand",
      des: "Deploy your manufacturing facilities online with your name and assets.",
      pic: dashboard_empty,
      alt: "Publish Hub"
  },
  {
      id: 2,
      name: "Your Customers can Access the Services",
      des: "Your customers car run Manufacturing Checks, Automatic Quotation and Shape Optimizations. While you are informed at every step.",
      pic: platform_with_pump,
      alt: "Services"

  },
  {
      id: 3,
      name: "Wait for Orders to come to you",
      des: "Your customers will funnel models to be printed by your machine.",
      pic: product_pic,
      alt: "Wait Orders"
  },
  {
      id: 4,
      name: "No more Idle time for your Machines",
      des: "Now it time to make use of your facilities to produce the devices and ship it.",
      pic: printer_pic,
      alt: "Use the machinery"
  },
];

const total = 4;
</script>

<template>
  <div class="untree_co-section bg-light" id="how_does_it_work">
    <div class="container">
      <h1 class="heading" data-aos="fade-up">
<span class="enhance-sequential">
  <span v-for="(letter, index) in 'Enhance and Automate'.split('')" 
        :key="index"
        class="letter"
        :style="{ '--delay': index + 's' }">
    {{ letter }}
  </span>
</span>
         Customers'Projects
      <sub :style="{ color: themeColorOrange, 'font-size': '1.3rem' }">
          WITH GATES
      </sub></h1>
      <div class="row justify-content-between d-flex align-items-center">
        
        <div class="col-lg-5 order-lg-2 js-custom-dots">
          <a
            class="service link horizontal d-flex active"
            data-aos="fade-left"
          >
            <div class="service-icon  mb-4" :style="{ backgroundColor: themeColorWhite }">
              <svg
                class="bi bi-app-indicator"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                :fill="themeColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z"
                />
                <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              </svg>
            </div>
            <div class="service-contents">
              <h3>{{ items[0].name }}</h3>
              <p>{{ items[0].des }}</p>
            </div>
          </a>
          <a
            class="service link horizontal d-flex"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <div class="service-icon  mb-4" :style="{ backgroundColor: themeColorLille }" >
              <svg
                class="bi bi-arrow-repeat"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="{{themeColor}}"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.854 7.146a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L2.5 8.207l1.646 1.647a.5.5 0 0 0 .708-.708l-2-2zm13-1a.5.5 0 0 0-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708z"
                />
                <path
                  fill-rule="evenodd"
                  d="M8 3a4.995 4.995 0 0 0-4.192 2.273.5.5 0 0 1-.837-.546A6 6 0 0 1 14 8a.5.5 0 0 1-1.001 0 5 5 0 0 0-5-5zM2.5 7.5A.5.5 0 0 1 3 8a5 5 0 0 0 9.192 2.727.5.5 0 1 1 .837.546A6 6 0 0 1 2 8a.5.5 0 0 1 .501-.5z"
                />
              </svg>
            </div>
            <div class="service-contents">
              <h3>{{ items[1].name }}</h3>
              <p>{{ items[1].des }}</p>
            </div>
          </a>
          <a
            class="service link horizontal d-flex"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div class="service-icon  mb-4" :style="{ backgroundColor: themeColorGold }">
              <svg 
                class="bi bi-briefcase"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="{{themeColor}}"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6h-1v6a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-6H0v6z"
                />
                <path
                  fill-rule="evenodd"
                  d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5v2.384l-7.614 2.03a1.5 1.5 0 0 1-.772 0L0 6.884V4.5zM1.5 4a.5.5 0 0 0-.5.5v1.616l6.871 1.832a.5.5 0 0 0 .258 0L15 6.116V4.5a.5.5 0 0 0-.5-.5h-13zM5 2.5A1.5 1.5 0 0 1 6.5 1h3A1.5 1.5 0 0 1 11 2.5V3h-1v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V3H5v-.5z"
                />
              </svg>
            </div>
            <div class="service-contents">
              <h3>{{ items[2].name }}</h3>
              <p>{{ items[2].des }}</p>
            </div>
          </a>
          <a
            class="service link horizontal d-flex"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <div class="service-icon mb-4" :style="{ backgroundColor: themeColorOrange }">
              <svg
                class="bi bi-collection"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="{{themeColor}}"
                xmlns="http://www.w3.org/2000/svg"  >
                <path
                  fill-rule="evenodd"
                  d="M14.5 13.5h-13A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5zm-13 1A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z"   />
              </svg>
            </div>
            <div class="service-contents">
              <h3>{{ items[3].name }}</h3>
              <p>{{ items[3].des }}</p>
            </div>
          </a>
        </div>
        <div class="col-lg-7">
          <div class="img-shadow">
            <div class="owl-single no-dots owl-carousel">
              <div class="item">
                <span class="number">{{ items[0].id }}/{{ total }}</span>
                <img :src="items[0].pic" alt="items[0].alt" class="img" />
              </div>
              <div class="item">
                <span class="number">{{ items[1].id }}/{{ total }}</span>
                <img :src="items[1].pic" alt="items[1].alt" class="img" />
              </div>
              <div class="item">
                <span class="number">{{ items[2].id }}/{{ total }}</span>
                <img :src="items[2].pic" alt="items[2].alt" class="img" />
              </div>
              <div class="item">
                <span class="number">{{ items[3].id }}/{{ total }}</span>
                <img :src="items[3].pic" alt="items[3].alt" class="img" />
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
  margin-bottom: 5rem;  
  font-size: 3.0rem;  
  font-weight: 550;
  text-align: left;
  color: v-bind(themeColor);
  
}

.img {
  height: 30rem;      /* fixed height */
  width: auto;        /* adjust width automatically */
  max-width: 100%;    /* prevent overflow */
  object-fit: contain; /* keep aspect ratio */
  display: block;     /* avoid inline spacing issues */
  margin: 0 auto;     /* optional: center horizontally */
}

.service-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.owl-single .number {
  background-color: v-bind(themeColor);
}


.enhance-sequential .letter {
  color: v-bind(themeColor); /* default color */
  animation: letter-highlight 20s infinite; /* total duration = letters * 1s */
  animation-delay: var(--delay);
}

@keyframes letter-highlight {
  0%, 70.0% { color: v-bind(themeColor); } /* stay black most of the time */
  30%, 25% { color: v-bind(themeColorOrange); } /* themeColorOrange */
}

</style>
