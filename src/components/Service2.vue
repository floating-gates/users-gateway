<script setup>
import dashboard_pic from "../assets/images/manufacturing_hub_pic.webp";
import printer_pic from "../assets/images/printer.webp";
import product_pic from "../assets/images/in_platform_tank.webp"
import heat_exchanger_pic from "../assets/images/heat_exchanger.webp";
import { themeColor, themeColorOrange, themeColorLille,
         themeColorGold, themeColorWhite } from "../data/items";

const heading = "How does it work?";

const items = [
  {
    id: 1,
    name: "Publish the Platform with your Logos/Name",
    des: "Deploy your manufacturing hub at your name.",
  },
  {
    id: 2,
    name: "Wait for Orders to come to you",
    des: "Your customers will funnel models to be printed by your machine.",
  },
  {
    id: 3,
    name: "Allow Shape Optimizations",
    des: "Your customers car run shape optimizations.",
  },
  {
    id: 4,
    name: "Time to use your 3D printers",
    des: "Make use of your machines to produce the devices and ship it.",
  },
];

const total = 4;
</script>

<template>
  <div class="untree_co-section bg-light" id="features-section">
    <div class="container">
      <h1 class="heading" data-aos="fade-up">{{ heading }}</h1>
      <div class="row justify-content-between d-flex align-items-center">
        
        <div class="col-lg-5 order-lg-2 js-custom-dots">
          <a
            
            class="service link horizontal d-flex active"
            data-aos="fade-left"
            data-aos-delay="0"
          >
            <div class="service-icon  mb-4" :style="{ backgroundColor: themeColorWhite }">
              <svg
                class="bi bi-app-indicator"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="{{themeColor}}"
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
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.5 13.5h-13A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5zm-13 1A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z"
                />
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
                <img :src="dashboard_pic" alt="Dashboard Manufacturing" class="img-fluid" />
              </div>
              <div class="item">
                <span class="number">{{ items[1].id }}/{{ total }}</span>
                <img :src="product_pic" alt="Image" class="img-fluid" />
              </div>
              <div class="item">
                <span class="number">{{ items[2].id }}/{{ total }}</span>
                <img :src="heat_exchanger_pic" alt="Image" class="img-fluid" />
              </div>
              <div class="item">
                <span class="number">{{ items[3].id }}/{{ total }}</span>
                <img :src="printer_pic" alt="Image" class="img-fluid" />
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
  margin-bottom: 6rem;  /* adds vertical space below */
  font-size: 3.5rem;   /* adjust to your design system */
  font-weight: 600;
  text-align: left;   /* optional, use left if desired */
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

</style>
