<script setup>
import { themeColor, themeColorOrange, contactInfo } from "../data/items";
import Header from "./Header.vue";
import { ref } from "vue";

const phone =  contactInfo["phone"].replace(/[\s+]/g, "");
const message = "Hi! I'm interested in one of Floating Gates services"
const whatsAppUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

const services = [
  {
    name: "Scientific Software Development",
    description:
      "As manufacturing becomes more complex, we design predictive software to model system behavior using proven numerical methods. Examples include structural integrity, fatigue, vibrations, heat exchange, and magnetic properties.",
    advantages: [
      "Explore a wide variety of designs without costly experiments.",
      "Make measurements in locations otherwise inaccessible, e.g., inside a combustion chamber."
    ],
     outcome: [
      "Software able to explore/measure physics of a specific phenomenon you want from the device."]
   },
   {
    name: "Parametric Mechanical Design",
    description:
      "We use CAD and automation to rapidly iterate on designs. Our parametric workflows help you reach optimal solutions driven by physical and measurable objectives.",
    advantages: [
      "Physics-informed, data-driven design decisions.",
      "Quick design updates through parameter adjustments."
    ],
   outcome: [
      "Software able to build up a custom CAD file algoritmically to allow easy fast iterations."
   ]
  },
  {
    name: "Machine Learning Exploration",
    description:
      "By integrating ML with physics-based simulations, we analyze a broader range of design options efficiently and at lower cost.",
    advantages: [
      "Predict complex system behavior with minimal data.",
      "Perform hundreds of virtual experiments with minimal computational cost."
    ],
      outcome: [
      "Software able to explore physics from a starting point and insight modification."
    ]

  },
  {
    name: "Provider of Informatic Infrastructure",
    description:
      "We build scalable, tailored IT infrastructure for simulation and data processing—on-premise or in the cloud.",
    advantages: [
      "Hardware customized to your workload.",
      "Full data ownership.",
      "Robust architecture built for scalability and longevity."
    ],
    outcome: [
          "Fully functioning server with all the services you neeed."
    ]
  }
];

const selectedIndex = ref(0);
</script>

<template>
  <Header :context="'profile'" />
  <div class="untree_co-hero">
    <div class="container">
      <div class="row align-items-center">

        <h1 class="mb-4 text-4xl align-items-center heading font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white border-gray-200  shadow-sm">Services</h1>
              
        <div class="col-12">
          <div class="dots"></div>
          <div class="row align-items-center">
            <div class="col-lg-5">
              <ul class="list-group shadow-sm rounded overflow-hidden">
                <li
                  v-for="(service, index) in services"
                  :key="index"
                  @click="selectedIndex = index"
                  class="list-group-item list-group-item-action py-3"
                  :class="{ active: selectedIndex === index }"
                  :style="selectedIndex === index
                          ? { backgroundColor: themeColor, border: 'none' }
                          : { cursor: 'pointer' }"
                >
                  {{ service.name }}
                </li>
              </ul>
            </div>

            <div
              class="col-lg-7 order-lg-2"
              data-aos="fade-right"
              data-aos-delay="400"
            >
              <div
                class="active"
                :style="{
                  backgroundColor: '#fbfbfe',
                  padding: '2rem',
                  border: '1px',
                  borderRadius: '0.75rem',
                }"
              >
                <h3 class="mb-3" :style="{ color: themeColor }">
                  {{ services[selectedIndex].name }}
                </h3>
                <p class="text-muted mb-3">
                  {{ services[selectedIndex].description }}
                </p>

                <p :style="{ color: themeColor, fontWeight: '600', fontSize: '1.05rem' }">
                  Outcome:
                </p>
                <ul class="mt-2">
                  <li
                    v-for="(adv, i) in services[selectedIndex].outcome"
                    :key="i"
                    class="text-dark mb-2"
                    :style="{ fontWeight: '600', fontSize: '1rem' }"
                  >
                    {{ adv }}
                  </li>
                </ul>
                
                <p :style="{ color: themeColor, fontWeight: '600', fontSize: '1.05rem' }">
                  Advantages:
                </p>
                <ul class="mt-2">
                  <li
                    v-for="(adv, i) in services[selectedIndex].advantages"
                    :key="i"
                    class="text-dark mb-2"
                    :style="{ fontWeight: '600', fontSize: '1rem' }"
                  >
                    {{ adv }}
                  </li>
                </ul>

                <!-- WhatsApp Button -->
                <a
                  :href="whatsAppUrl"
                  class="whatsapp_container"
                  target="_blank"
                  rel="noopener"
                >
                  <img
                    src="../assets/images/WhatsAppButtonWhiteSmall.svg"
                    alt="Contact via WhatsApp"
                    class="section-image"
                  />
                </a>
              </div>
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

.list-group-item:hover {
  background-color: #f0f0f0;
  transition: background-color 0.2s ease;
}

.list-group-item.active {
  font-weight: 600;
}

.whatsapp_container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; 
  margin-top: 2rem;
}
</style>
