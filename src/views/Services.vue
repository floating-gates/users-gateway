<script setup>
import { ref } from "vue";
import { themeColor, themeColorOrange, themeColorLille, contactInfo } from "../data/items";
import Header from "../components/Header.vue";
import simulation_service_img from "../assets/images/simulation_service.jpg";
import stochastic_img from "../assets/images/stochastic_img.webp";
import param_design from "../assets/images/param_design.png";

const phone = contactInfo["phone"].replace(/[\s+]/g, "");
const message = "Hi! I'm interested in one of your enterprise services";
const whatsAppUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

const services = [
  {
    name: "Scientific Software Development",
    description: "As manufacturing becomes more complex, we design predictive software to model system behavior using proven numerical methods. Examples include structural integrity, fatigue, vibrations and heat exchange forecasts.",
    image: simulation_service_img,
    advantages: [
      "Explore a variety of designs without costly experiments.",
      "Make measurements in locations otherwise inaccessible, e.g., inside a mixer, oil channels etc.",
      "Physics-informed, data-driven design decisions.",
    ],
    outcome: ["Software able to explore/measure physics of a specific phenomenon you want from the device."]
  },
  {
    name: "Parametric Mechanical Design",
    description: "We use CAD and automation to rapidly iterate on designs. Our parametric workflows help you reach optimal solutions driven by physical and measurable objectives.",
    advantages: ["Quick design updates through parameter adjustments."],
    image: param_design,
    outcome: ["Software able to build up a custom CAD file algoritmically to allow easy fast iterations."]
  },
  {
    name: "Machine Learning Exploration",
    description: "By integrating ML with physics-based simulations, we analyze a broader range of design options efficiently and at lower cost.",
    image: stochastic_img,
    advantages: [
      "Predict complex systems behavior.",
      "Perform hundreds of virtual experiments with minimal computational cost."
    ],
    outcome: ["Insight and previosion of performances of complex systems."]
  }
];

const selectedIndex = ref(0);
const selectService = (index) => {
  selectedIndex.value = index;
};
</script>

<template>
  <Header :context="'landing-page'" />

  <div class="untree_co-hero">
    <div class="container">
      <div class="row align-items-center">
        <div class="section-header">
          <h2 class="page-title">Enterprise Services</h2>
          <p class="page-subtitle">
            Our enterprise services can be seamlessly integrated within Gates or developed independently according to your specific requirements.
          </p>
        </div>

        <div class="col-12">
          <div class="row">
            <div class="col-lg-4 d-flex align-items-center">
              <ul class="service-list">
                <li
                  v-for="(service, index) in services"
                  :key="index"
                  @click="selectService(index)"
                  :class="['service-item', { active: selectedIndex === index }]"
                >
                  {{ service.name }}
                </li>
              </ul>
            </div>

            <div class="col-lg-8 d-flex align-items-center">
              <div class="service-content">
                <h3 class="service-title">{{ services[selectedIndex].name }}</h3>
                <p class="service-description">{{ services[selectedIndex].description }}</p>

                <div class="service-image-container">
                  <img :src="services[selectedIndex].image" alt="Service illustration" class="service-image" />
                </div>

                <div class="service-section">
                  <h4 class="section-title">Outcome</h4>
                  <ul class="service-benefits">
                    <li v-for="(item, i) in services[selectedIndex].outcome" :key="i" class="benefit-item">
                      {{ item }}
                    </li>
                  </ul>
                </div>

                <div class="service-section">
                  <h4 class="section-title">Advantages</h4>
                  <ul class="service-benefits">
                    <li v-for="(item, i) in services[selectedIndex].advantages" :key="i" class="benefit-item">
                      {{ item }}
                    </li>
                  </ul>
                </div>

                <a :href="whatsAppUrl" class="whatsapp-btn">
                  <img src="../assets/images/WhatsAppButtonGreenMedium.svg" alt="Contact via WhatsApp" class="whatsapp-icon" />
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
  font-weight: 700;
  color: v-bind(themeColor);
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin: 0;
}

.section-header {
  margin-bottom: 2.5rem;
}

.service-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: white;
  border: 1px solid #e0e0e0;
  width: 100%;
}

.service-item {
  padding: 1rem 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  border-bottom: 1px solid #e0e0e0;
  color: #333;
}

.service-item:last-child {
  border-bottom: none;
}

.service-item:hover {
  background: #f5f5f5;
}

.service-item.active {
  background: v-bind(themeColor);
  color: white;
  font-weight: 600;
}

.service-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
  width: 100%;
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

.service-image-container {
  text-align: center;
  margin: 2rem 0;
}

.service-image {
  max-width: 300px;
  height: auto;
  border-radius: 14px;
}

.service-section {
  margin-bottom: 1.5rem;
}

.section-title {
  color: v-bind(themeColor);
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.service-benefits {
  list-style: none;
  padding: 0;
  margin: 0;
}

.benefit-item {
  color: #444;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
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
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem auto 0;
  transition: transform 0.2s ease;
}

.whatsapp-btn:hover {
  transform: translateY(-2px);
  text-decoration: none;
}

.whatsapp-icon {
  height: 50px;
  width: auto;
}

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
