<script setup>
import { ref } from "vue";
import { themeColor, themeColorOrange, themeColorLille, contactInfo } from "../config.js";
import Header from "../components/Header.vue";
import simulation_service_img from "../data/images/simulation_service.jpg";
import stochastic_img from "../data/images/stochastic_img.webp";
import param_design from "../data/images/param_design.png";

const phone = contactInfo["phone"].replace(/[\s+]/g, "");
const message = "Hi! I'm interested in one of your enterprise services";
const whatsAppUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

const services = [
  {
    name: "Scientific Software Development",
    description: "As modern manufacturing and engineering systems grow in complexity, our expertise empowers you to understand and predict how your products behave under real-world conditions. We design customized scientific software that leverages proven numerical methods—such as Finite Element Analysis (FEA) and other computational modeling techniques—to simulate physical phenomena with high accuracy. From structural integrity and fatigue to vibrations and heat transfer, our simulations enable data-driven design decisions that enhance performance and reliability.",
    image: simulation_service_img,
    advantages: [
      "Test and refine designs virtually, reducing the need for costly physical experiments.",
      "Access data from locations that are physically unreachable, such as inside mixers, micro-channels, or sealed systems.",
      "Combine physics-based models with real-world data for informed, predictive design decisions."
    ],
    outcome: [
      "A customized software tool capable of exploring and quantifying the physics behind the specific phenomena relevant to your system or device."
    ]
  },
  {
    name: "Parametric Mechanical Design",
    description: "We combine CAD automation and parametric modeling to accelerate your mechanical design process. By embedding key design parameters directly into your models, we enable rapid iteration and optimization guided by measurable physical objectives. Our approach allows you to explore design variations, fine-tune geometries, and converge toward high-performance solutions faster than ever before.",
    image: param_design,
    advantages: [
      "Instantly update and optimize designs through simple parameter adjustments.",
      "Reduce manual design work and human error through automation.",
      "Enable objective-driven design exploration linked to performance metrics."
    ],
    outcome: [
      "A parametric software system that programmatically generates and modifies CAD models, allowing seamless and fast design iterations."
    ]
  },
  {
    name: "Machine Learning Exploration",
    description: "We merge the predictive power of machine learning with the rigor of physics-based simulations to unlock new frontiers in design exploration. This hybrid approach enables the efficient analysis of complex systems, identifying optimal configurations with minimal computational cost. By learning from simulated or experimental data, our models can rapidly forecast system performance across a vast design space, accelerating innovation while reducing time and expense.",
    image: stochastic_img,
    advantages: [
      "Predict the behavior of complex, nonlinear, or multi-physics systems with high accuracy.",
      "Run hundreds of virtual experiments at a fraction of traditional computational costs.",
      "Leverage data-driven insights to guide design optimization and decision-making."
    ],
    outcome: [
      "Comprehensive insights and reliable performance predictions for complex systems, empowering smarter and faster design choices."
    ]
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
                  <img src="../data/images/WhatsAppButtonGreenMedium.svg" alt="Contact via WhatsApp" class="whatsapp-icon" />
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
  max-width: 600px;
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
