<script setup>

import { themeColor, themeColorOrange, themeColorWhite,
       themeColorLille, themeColorGold } from '../data/items'

const items = [
  {
    title: "Publish your platform",
    description:
      "After our first contact.",
  },
  {
    title: "Client will funnel 3D models to you",
    description:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
  },
  {
    title: "They will Optimize they device",
    description:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
  },
  {
    iconBg: "background-color: #407BFF",
    title: "Manufacture the device",
    description:
      "You will make use of your machines to make the device possible and ship it to the customer.",
  },
];
</script>
<template>
  <div class="untree_co-section" id="features-section">
    <div class="container">
      <div class="row">
        <div
          class="col-md-6 mb-4 mb-lg-0 col-lg-3"
          data-aos="fade-up"
          data-aos-delay="0"
        >
          <div class="service">
            <div class="service-icon color-1 mb-4" :style="[items[0].iconBg]">
              <svg
                class="bi bi-app-indicator"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
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
              <h3>{{ items[0].title }}</h3>
              <p>{{ items[0].description }}</p>
            </div>
          </div>
        </div>
        <div
          class="col-md-6 mb-4 mb-lg-0 col-lg-3"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="service">
            <div class="service-icon color-2 mb-4" :style="[items[1].iconBg]">
              <svg
                class="bi bi-arrow-repeat"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
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
              <h3>{{ items[1].title }}</h3>
              <p>{{ items[1].description }}</p>
            </div>
          </div>
        </div>
        <div
          class="col-md-6 mb-4 mb-lg-0 col-lg-3"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div class="service">
            <div class="service-icon color-3 mb-4" :style="[items[2].iconBg]">
              <svg
                class="bi bi-briefcase"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
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
              <h3>{{ items[2].title }}</h3>
              <p>{{ items[2].description }}</p>
            </div>
          </div>
        </div>
        <div
          class="col-md-6 mb-4 mb-lg-0 col-lg-3"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div class="service">
            <div class="service-icon color-4 mb-4" :style="[items[3].iconBg]">
              <svg
                class="bi bi-collection"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.5 13.5h-13A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5zm-13 1A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z"
                />
              </svg>
            </div>
            <div class="service-contents">
              <h3>{{ items[3].title }}</h3>
              <p>{{ items[3].description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
