<script setup>
import { themeColor, themeColorOrange, themeColorLille, contactInfo } from "../data/items";
import Header from "../components/Header.vue";
import { ref } from "vue";

const phone =  contactInfo["phone"].replace(/[\s+]/g, "");
const message = "Hi! I'm interested in one of your enterprise services"
const whatsAppUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

const services = [
  {
    name: "Scientific Software Development",
    description:
      "As manufacturing becomes more complex, we design predictive software to model system behavior using proven numerical methods. Examples include structural integrity, fatigue, vibrations and heat exchange forecasts.",
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
      "Predict complex systems behavior with minimal data.",
      "Perform hundreds of virtual experiments with minimal computational cost."
    ],
      outcome: [
      "Software able to explore physics from a starting point and insight modification."
    ]
  },
  {
    name: "Installation in Loco",
    description:
      "We build scalable, tailored IT infrastructure for running gates locally.We can use use your infrastructure or build a new one from scratch. In case you are cloud first, we can also provide solution based on AWS, Google Cloud etc...",
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
  <Header :context="'landing-page'" />

  <div class="untree_co-hero">
    <div class="container">
      <div class="row align-items-center">

        <h1 class="page-title">Enterprise Services</h1>
              
        <div class="col-12">
          <div class="dots"></div>
          <div class="row align-items-center">
            <div class="col-lg-5">
              <ul class="service-list">
                <li
                  v-for="(service, index) in services"
                  :key="index"
                  @click="selectedIndex = index"
                  class="service-item"
                  :class="{ active: selectedIndex === index }"
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
              <div class="service-content">
                <h3 class="service-title">
                  {{ services[selectedIndex].name }}
                </h3>
                <p class="service-description">
                  {{ services[selectedIndex].description }}
                </p>

                <div class="service-section">
                  <h4 class="section-title">Outcome</h4>
                  <ul class="service-benefits">
                    <li
                      v-for="(outcome, i) in services[selectedIndex].outcome"
                      :key="i"
                      class="benefit-item"
                    >
                      {{ outcome }}
                    </li>
                  </ul>
                </div>
                
                <div class="service-section">
                  <h4 class="section-title">Advantages</h4>
                  <ul class="service-benefits">
                    <li
                      v-for="(adv, i) in services[selectedIndex].advantages"
                      :key="i"
                      class="benefit-item"
                    >
                      {{ adv }}
                    </li>
                  </ul>
                </div>

                <a  :href="whatsAppUrl"
                    class="whatsapp-btn" >
                  <img
                    src="../assets/images/WhatsAppButtonGreenMedium.svg"
                    alt="Contact via WhatsApp"
                    class="whatsapp-icon"
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
.page-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: v-bind(themeColor);
  margin-bottom: 3rem;
  text-align: center;
}

.service-list {
  list-style: none;
  padding: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: white;
  border: 1px solid v-bind(themeColorLille);
}

.service-item {
  padding: 1rem 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  border-bottom: 1px solid v-bind(themeColoLille);
  position: relative;
  background: white;
}

.service-item:hover {
  background: v-bind(themeColorLille);
}

.service-item.active {
  background: v-bind(themeColor);
  color: v-bind(themeColorLille);
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}


.service-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid v-bind(themeColorLille);
  position: relative;
}

.service-title {
  color: v-bind(themeColor);
  font-weight: 600;
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.service-description {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.service-section {
  margin-bottom: 1.5rem;
}

.section-title {
  color: v-bind(themeColor);
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

.section-title::before {
  content: '●';
  margin-right: 0.5rem;
  color: v-bind(themeColorOrange);
}

.service-benefits {
  list-style: none;
  padding: 0;
  margin: 0;
}

.benefit-item {
  color: #444;
  font-weight: 400;
  margin-bottom: 0.5rem;
  padding-left: 1.2rem;
  position: relative;
  line-height: 1.5;
}

.benefit-item::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: v-bind(themeColorOrange);
  font-weight: bold;
}

.whatsapp-btn {
  display: flex;               /* flex container */
  align-items: center;         /* vertical centering */
  justify-content: center;     /* horizontal centering */
  margin: 1.5rem auto 0;       /* add auto left/right for centering */
  width: fit-content;          /* shrink wrap button around content */
  transition: all 0.2s ease;
}

.whatsapp-btn:hover {
  transform: translateY(-2px);
  /* box-shadow: 0 4px 12px v-bind(themeColor); */
  text-decoration: none;
}

.whatsapp-icon {
  height: 60px;
  width: auto;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .service-content {
    padding: 1.25rem;
    margin-top: 1.5rem;
  }
  
  .service-item {
    padding: 0.875rem 1rem;
  }
  
  .page-title {
    margin-bottom: 2rem;
  }
}
</style>
