<script setup>
import { themeColor, themeColorOrange, themeColorWhite } from "../config.js";
import mainPhoto from "../data/images/platform_logic_pic.webp";
import Header from "../components/Header.vue";

const missionSubHeading = "Maximizing Idle Manufacturing Potential";

const features = [
    { 
        title: 'Automatic Feasibility Check', 
        description: 'Check manufacturing feasibility instantly with AI-powered analysis' 
    },
    { 
        title: 'Immediate Quote Estimation', 
        description: 'Obtain automatic, transparent quotes in line with the market' 
    },
    { 
        title: 'Device Optimization', 
        description: 'Optimize the devices under analysis for maximum efficiency' 
    }
]
</script>

<template>
<Header :context="'landing-page'" />

<!-- Hero Mission Section -->
<div class="container-fluid mission-container container">
  <div class="row justify-content-between align-items-center">
    <div class="col-lg-5">
      <div class="mission-content">
        <span
          class="mission-badge"
          data-aos="fade-up"
          :style="{ backgroundColor: themeColorOrange + '20', color: themeColorOrange }" >
          Our Mission
        </span>
        
        <h1 class="mission-title" data-aos="fade-up" data-aos-delay="100">
          {{ missionSubHeading }}
        </h1>
        <div class="mission-description" data-aos="fade-up" data-aos-delay="200">
          <p class="lead-text">
            Every machine, whether in a household garage or a corporate lab, holds <b>untapped potential</b>. Our mission is to directly connect customers with your machines to meet customizable and scalable production needs and target the 100% usage span.
          </p>
        </div>
      </div>
    </div>
    
    <div class="col-lg-7" data-aos="fade-up" data-aos-delay="400">
      <div class="video-container">
        <img :src="mainPhoto" alt="Manufacturing Hub" class="hero-image" />
      </div>
    </div>
  </div>
</div>

<!-- How to Achieve Section -->
<section class="achievement-section bg-light">
  <div class="container">
    <div class="section-header text-center" data-aos="fade-up" data-aos-delay="0">
      <span class="section-badge" :style="{ backgroundColor: themeColorOrange + '20', color: themeColorOrange }">
        How we do it
      </span>
      <h2 class="section-title">You are going to provide to your customers</h2>
      <div class="title-underline" :style="{ backgroundColor: themeColor }"></div>
    </div>
    
    <div class="row align-items-center g-5" data-aos="fade-up" data-aos-delay="100">
      <div class="col-lg-6">
        <div class="strategy-content">
          <h3 class="strategy-heading">Connect Your Machines</h3>
          <p class="strategy-text">
            We provide a comprehensive B2B platform for companies with manufacturing capacity, enabling them to maximize their resources while serving both new and existing customers with unprecedented efficiency.
          </p>
          
          <div  class="cta-section">
            <a href="/faq" class="cta-button" :style="{ backgroundColor: themeColor, borderColor: themeColor }">
              Learn More About Our Platform
            </a>
          </div>
        </div>
      </div>
      
      <div class="col-lg-6">
        <div class="features-grid">
          <div
            class="feature-card"
            v-for="(feature, index) in features"
            :key="index"
            :data-aos-delay="150 + index * 50"
            >
            <div class="feature-icon">
              <svg v-if="index === 0" width="32" height="32" viewBox="0 0 24 24" fill="none" :stroke="themeColorOrange" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              
              <svg  v-else-if="index === 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  width="32" height="32" fill="none"  :stroke="themeColorOrange" stroke-linecap="round" stroke-linejoin="round">>
                <path fill-rule="evenodd" d="M3.75 3.375c0-1.036.84-1.875 1.875-1.875H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375Zm7.464 9.442c.459-.573 1.019-.817 1.536-.817.517 0 1.077.244 1.536.817a.75.75 0 1 0 1.171-.937c-.713-.892-1.689-1.38-2.707-1.38-1.018 0-1.994.488-2.707 1.38a4.61 4.61 0 0 0-.705 1.245H8.25a.75.75 0 0 0 0 1.5h.763c-.017.25-.017.5 0 .75H8.25a.75.75 0 0 0 0 1.5h1.088c.17.449.406.87.705 1.245.713.892 1.689 1.38 2.707 1.38 1.018 0 1.994-.488 2.707-1.38a.75.75 0 0 0-1.171-.937c-.459.573-1.019.817-1.536.817-.517 0-1.077-.244-1.536-.817-.078-.098-.15-.2-.215-.308h1.751a.75.75 0 0 0 0-1.5h-2.232a3.965 3.965 0 0 1 0-.75h2.232a.75.75 0 0 0 0-1.5H11c.065-.107.136-.21.214-.308Z" clip-rule="evenodd" />
                <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg"  v-else-if="index === 2" width="32" height="32" viewBox="0 0 24 24" fill="none" :stroke="themeColorOrange" stroke-linecap="round" stroke-linejoin="round">>
                <path fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm4.5 7.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V12Zm2.25-3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0V9.75A.75.75 0 0 1 13.5 9Zm3.75-1.5a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0v-9Z" clip-rule="evenodd" />
              </svg>
              
            </div>
            <div class="feature-content">
              <h4 class="feature-title">{{ feature.title }}</h4>
              <p class="feature-description">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
.mission-hero {
    padding: 200px 0 120px;
    position: relative;
    overflow: hidden;
}

.mission-content {
    position: relative;
    z-index: 2;
}

.mission-container {
    padding: 200px 0 120px;
    
    padding-left: 5%;
    padding-right: 5%;
    max-width: 1600px; /* Optional: cap it so it doesn’t grow too much on ultra-wide monitors */
    margin: 0 auto;
}

.mission-badge {
    display: inline-flex;
    align-items: center;
    padding: 8px 24px;
    border-radius: 50px;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 24px;
}

.mission-title {
    font-size: 3.5rem;
    font-weight: 650;
    line-height: 1.2;
    margin-bottom: 30px;
    color: v-bind("themeColor");
}

.lead-text {
    font-size: 1.2rem;
    line-height: 1.7;
    margin-bottom: 40px;
    font-weight: 400;
}

.mission-points {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.point-item {
    display: flex;
    align-items: center;
    padding: 20px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border-left: 4px solid v-bind("themeColorOrange");
}

.point-item:hover {
    transform: translateX(8px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.point-icon {
    font-size: 2rem;
    margin-right: 20px;
    flex-shrink: 0;
}

.point-text {
    font-size: 1.1rem;
    font-weight: 500;
    color: #333;
}

/* Video Section */
.video-container {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.hero-image {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.2s;
}

.video-overlay {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 3;
}

.video-overlay:hover .video-container .hero-image {
    transform: scale(1.05);
}

/* Achievement Section */
.achievement-section {
    padding: 120px 0;
    background: white;
    position: relative;
}

.section-header {
    margin-bottom: 60px;
}

.section-badge {
    display: inline-block;
    padding: 8px 24px;
    border-radius: 50px;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 16px;
}

.section-title {
    font-size: 2.8rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 20px;
}

.title-underline {
    width: 65%;
    height: 4px;
    margin: 0 auto;
    border-radius: 2px;
}

.strategy-content {
    padding-right: 40px;
}

.strategy-heading {
    font-size: 2.2rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 24px;
}

.strategy-text {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #666;
    margin-bottom: 40px;
}

.cta-button {
    display: inline-flex;
    align-items: center;
    padding: 16px 32px;
    border: none;
    border-radius: 50px;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
}

.features-grid {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.feature-card {
    display: flex;
    align-items: flex-start;
    padding: 32px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 1px solid #f0f0f0;
}

.feature-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 50px rgba(0, 0, 0, 0.15);
}

.feature-icon {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    margin-right: 24px;
    flex-shrink: 0;
}

.feature-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 8px;
}

.feature-description {
    color: #666;
    line-height: 1.6;
    margin: 0;
}

/* Responsive Design */
@media (max-width: 992px) {
    .mission-title {
        font-size: 2.8rem;
    }
    
    .strategy-content {
        padding-right: 0;
        margin-bottom: 40px;
    }
    
    .point-item {
        padding: 16px;
    }
    
    .point-icon {
        font-size: 1.5rem;
        margin-right: 16px;
    }
}

@media (max-width: 768px) {
    .mission-hero {
        padding: 60px 0 80px;
  }
  
  .mission-title {
    font-size: 2.2rem;
  }
  
  .section-title {
    font-size: 2.2rem;
  }
  
  .strategy-heading {
    font-size: 1.8rem;
  }
  
  .achievement-section {
    padding: 80px 0;
  }
  
  .play-button {
    width: 60px;
    height: 60px;
  }
  
  .video-pulse {
    width: 100px;
    height: 100px;
  }
}
</style>
