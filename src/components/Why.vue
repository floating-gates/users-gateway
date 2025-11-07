<script setup>
import advantages_yoy from "../data/images/advantages_yoy.webp";
import { themeColor, themeColorOrange, themeColorWhite } from "../config.js";
</script>

<template>
  <div class="untree_co-section advantages-section" id="why">
    <div class="container-fluid login-container container">
      <!-- Section Header -->
      <div class="text-center" data-aos="fade-up">
        <h1 class="section-title">
          Move Manufacturing Online <span class="dot">•</span> Customers ask <span class="dot">•</span> We Automate <span class="dot">•</span> You produce
        </h1>
        <p class="subtitle">
          One of the most promising discoveries in our journey has been realizing how much companies care about how they are perceived. Hence we sat down and thought about how we can technologically enable manufacturing plants in the most outreaching way possible, giving birth to the idea of proxying our technology.
        </p>
      </div>

      <!-- Content + Visual -->
      <div class="space row align-items-center">
        <!-- Advantages Column -->
        <div class="col-lg-4 col-12" data-aos="fade-right" data-aos-delay="100">
          <div class="pe-lg-4">
            <ul class="advantage-list">
              <!-- Item 1 -->
              <li class="advantage-item">
                <div class="item-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9.75h4.875a2.625 2.625 0 0 1 0 5.25H12M8.25 9.75 10.5 7.5M8.25 9.75 10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z" />
                  </svg>
                </div>
                <div class="item-content">
                  <h4 class="item-title">Automatic Quotation</h4>
                  <p class="item-description">
                    Accurate pricing suggestions permit talking with customers willing to pay.
                  </p>
                </div>
              </li>

              <!-- Item 2 -->
              <li class="advantage-item">
                <div class="item-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div class="item-content">
                  <h4 class="item-title">Highlights Manufacturing Issues Ahead</h4>
                  <p class="item-description">
                    90% of drawings are corrected automatically, saving countless hours of manual review.
                  </p>
                </div>
              </li>

              <!-- Item 3 -->
              <li class="advantage-item">
                <div class="item-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                </div>
                <div class="item-content">
                  <h4 class="item-title">Shape Optimization</h4>
                  <p class="item-description">
                    Intelligent shape suggestions will improve the performance of your customer device.
                  </p>
                </div>
              </li>

              <!-- Item 4: Call to Action -->
              <li class="advantage-item" :style="{ backgroundColor: themeColor }">
                <a @click="$router.push('/login')" class="item-icon" :style="{ backgroundColor: themeColorWhite }">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="themeColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                  </svg>
                </a>
                <h3 class="item-title" :style="{ fontSize: '1.25rem', color: themeColorWhite }">
                  Try it out. Refund Guaranteed 100%
                </h3>
              </li>
            </ul>
          </div>
        </div>

        <!-- Image Column -->
        <div class="col-lg-8 col-12" data-aos="fade-left" data-aos-delay="150">
          <div class="shadow-lg rounded-4 overflow-hidden p-3">
            <img
              :src="advantages_yoy"
              alt="Automation performance metrics"
              loading="lazy"
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.advantages-section {
  position: relative;
  overflow: hidden;
}

.section-title {
  font-size: 2rem;
  font-weight: 650;
  color: v-bind(themeColor);
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
}

.section-title .dot {
  color: v-bind(themeColorOrange);
}

.subtitle {
  max-width: 900px;
  line-height: 1.6;
  margin: 0 auto;
  text-align: center;
}

.space {
  margin-top: 3rem;
}

.advantage-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.advantage-item {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background-color: v-bind(themeColorWhite);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.advantage-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.item-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: v-bind(themeColor);
  color: white;
  border-radius: 10px;
  margin-right: 1.25rem;
}

.item-icon svg {
  width: 24px;
  height: 24px;
}

.item-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: v-bind(themeColor);
  margin-bottom: 0.5rem;
}

.login-container {
  padding-left: 5%;
  padding-right: 5%;
  max-width: 1600px;
}

.visual-wrapper {
  transition: all 0.3s ease;
}

.visual-wrapper:hover {
  transform: scale(1.02);
}

/* Mobile Responsive */
@media (max-width: 767.98px) {
  .section-title {
    font-size: 1.75rem;
  }

  .section-subtitle {
    max-width: 90%;
    margin-bottom: 2rem;
  }
    
  .advantage-item {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    padding: 1rem;
  }

  .item-icon {
    margin-bottom: 1rem;
    margin-right: 0;
  }

  .item-content {
    width: 100%;
  }

  /* Image below advantages */
  .row.align-items-center {
    flex-direction: column;
  }

  .col-lg-4, .col-lg-8 {
    max-width: 100%;
    flex: 0 0 100%;
  }

  .col-lg-8 {
    margin-top: 1.5rem;
  }
}
</style>
