<script setup>
import Header from "../components/Header.vue";
import { themeColor } from "../data/items.js";
// import { useHead } from '@vueuse/head'; // Install: npm install @vueuse/head

const value_proposition_intro = "Every manufacturing machine whether in a garage or a corporate lab, holds unused potential. Our mission is to connect machines, effortlessly and transparently with the greatest ideators. We aim to be the leading provider of virtual manufacturing hubs, using simulation capabilities, rigorous manufacturing checks, and commitment to connecting manufacturers with clients."

const product_intro = "Gates is software platform that empowers manufacturers by bridging the gap between production capacity and customer demand. Acting as a proxy layer between manufacturers and their clients, the platform reduces sales friction, automates technical validation, and expands service offerings—helping manufacturers focus on what they do best: producing."

const productSections = [
  {
    title: "Current Features",
    points: [
        "Automated order handling and tracking",
        "Parameterize main product specifications",
        "Real-time manufacturing quotes",
        "Secure pay-before-shipment system"
    ]
   },
   {
    title: "Upcoming Features",
    points: [
        "Advanced manufacturing quality checks",
        "Global manufacturing world map",
        "AI-powered automatic shape optimization"
    ]
  },
];

const customer_intro = "Small to medium-sized manufacturing enterprises (SMEs) with limited client reach. These companies typically have strong manufacturing capabilities but lack the marketing and sales resources to effectively compete in the market."

const customerSections = [
  {
    title: "Customer Needs",
    points: [
      "More qualified customers and market awareness",
      "Reduced time on quoting and feasibility checks",
      "Clear communication structure for device properties",
      "Enhanced advertising and marketing reach"
    ]
  },
  {
    title: "Customer Pain Points",
    points: [
        "Time wasted on unprintable or faulty files",
        "Need to hire personnel for repetitive tasks",
        "Risk of manufactured products not meeting specifications",
        "Customer payment security concerns"
    ]
  },
];

</script>

<template>
  <Header :context="'login'" />
  
  <main class="page" role="main">
    <!-- Hero Section -->
    <header class="intro" itemscope itemtype="https://schema.org/Organization">
      <h1 itemprop="name">Smarter Manufacturing Starts Here</h1>
      <p class="hero-description" itemprop="description">{{ value_proposition_intro }}</p>
    </header>

    <!-- Main Content Section -->
    <section class="content-wrapper" :style="{ '--theme-color': themeColor }" aria-label="Platform Features and Target Customers">
      
      <!-- Product Section -->
      <article class="column product-column" itemscope itemtype="https://schema.org/SoftwareApplication">
        <header class="column-header">
          <h2 itemprop="name">Gates Solution</h2>
          <p class="section-intro" itemprop="description">{{ product_intro }}</p>
        </header>

        <figure class="image-wrapper">
          <img 
            src="../assets/images/product.png" 
            alt="Gates manufacturing platform dashboard showing automated order tracking, real-time quoting interface, and production management tools" 
            class="section-image"
            itemprop="screenshot"
            loading="lazy"
          />
          <figcaption class="visually-hidden">Manufacturing software interface demonstration</figcaption>
        </figure>

        <div class="features-container" itemprop="featureList">
          <section 
            class="feature-section" 
            v-for="(item, index) in productSections" 
            :key="'product-' + index"
            :aria-labelledby="'product-heading-' + index"
          >
            <h3 :id="'product-heading-' + index" class="feature-title">{{ item.title }}</h3>
            <ul class="feature-list" role="list">
              <li 
                v-for="(point, i) in item.points" 
                :key="i"
                role="listitem"
                class="feature-item"
              >
                {{ point }}
              </li>
            </ul>
          </section>
        </div>

        <!-- Software Application Schema Properties -->
        <div class="hidden-schema" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
          <span itemprop="price">Contact for pricing</span>
          <span itemprop="priceCurrency">USD</span>
        </div>
        <span itemprop="applicationCategory" class="visually-hidden">Manufacturing Software</span>
        <span itemprop="operatingSystem" class="visually-hidden">Web Application</span>
      </article>

      <!-- Customer Section -->
      <article class="column customer-column" itemscope itemtype="https://schema.org/Audience">
        <header class="column-header">
          <h2 itemprop="audienceType">Target Manufacturing Customers</h2>
          <p class="section-intro" itemprop="description">{{ customer_intro }}</p>
        </header>

        <figure class="image-wrapper">
          <img 
            src="../assets/images/customer.webp" 
            alt="Small and medium manufacturing enterprises workshop showing production equipment and manufacturing processes" 
            class="section-image"
            loading="lazy"
          />
          <figcaption class="visually-hidden">Small to medium manufacturing enterprises production facility</figcaption>
        </figure>

        <div class="customer-info-container">
          <section 
            class="info-section" 
            v-for="(item, index) in customerSections" 
            :key="'customer-' + index"
            :aria-labelledby="'customer-heading-' + index"
          >
            <h3 :id="'customer-heading-' + index" class="info-title">{{ item.title }}</h3>
            <ul class="info-list" role="list">
              <li 
                v-for="(point, i) in item.points" 
                :key="i"
                role="listitem"
                class="info-item"
              >
                {{ point }}
              </li>
            </ul>
          </section>
        </div>
      </article>
    </section>

    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Gates Manufacturing Platform",
      "description": "Smart manufacturing software platform that connects SMEs with customers through automated quoting, order tracking, and quality validation",
      "url": "https://gates-manufacturing.com",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web-based",
      "screenshot": "https://gates-manufacturing.com/assets/images/product.png",
      "featureList": [
        "Automated order handling and tracking",
        "Real-time manufacturing quotes",
        "Secure payment processing",
        "Manufacturing quality checks",
        "Production capacity optimization"
      ],
      "offers": {
        "@type": "Offer",
        "description": "Manufacturing platform software subscription",
        "price": "Contact for pricing",
        "priceCurrency": "USD"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Small to medium-sized manufacturing enterprises",
        "geographicArea": "Global"
      },
      "provider": {
        "@type": "Organization",
        "name": "Gates Manufacturing Platform",
        "url": "https://gates-manufacturing.com"
      }
    }
    </script>
  </main>
</template>

<style scoped>
/* Base Layout & Typography */
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 2rem 4rem;
  background-color: #f9fafb;
  min-height: 100vh;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Hero Section */
.intro {
  max-width: 900px;
  text-align: center;
  margin-bottom: 4rem;
}

.intro h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #111827;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

.hero-description {
  font-size: clamp(1.125rem, 2.5vw, 1.375rem);
  color: #4b5563;
  line-height: 1.7;
  margin: 0;
  max-width: 800px;
}

/* Main Content Layout */
.content-wrapper {
  background: linear-gradient(135deg, var(--theme-color), color-mix(in srgb, var(--theme-color) 90%, white));
  display: flex;
  gap: 2.5rem;
  max-width: 1600px;
  width: 100%;
  padding: 3rem;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

/* Column Layout */
.column {
  flex: 1;
  background-color: white;
  border: 3px solid var(--theme-color);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.column::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--theme-color), color-mix(in srgb, var(--theme-color) 70%, white));
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.column:hover::before {
  transform: scaleX(1);
}

.column:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

/* Column Headers */
.column-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.column-header h2 {
  font-size: clamp(1.75rem, 3.5vw, 2.25rem);
  color: var(--theme-color);
  margin-bottom: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
}

.section-intro {
  font-size: 1.1rem;
  color: var(--theme-color);
  line-height: 1.6;
  font-weight: 500;
  opacity: 0.9;
}

.image-wrapper {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.section-image {
  border-radius: 16px;
  max-height: 25rem;
  border: 4px solid var(--theme-color);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.section-image:hover {
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
}

/* Feature Sections */
.features-container,
.customer-info-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.feature-section,
.info-section {
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.feature-section:hover,
.info-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.feature-title,
.info-title {
  font-size: 1.5rem;
  color: var(--theme-color);
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
  position: relative;
}

.feature-title::after,
.info-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background: var(--theme-color);
  border-radius: 2px;
}

/* Lists */
.feature-list,
.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}

.feature-item,
.info-item {
  text-align: center;
  color: var(--theme-color);
  background: white;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  font-weight: 500;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.feature-item::before,
.info-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  transition: left 0.5s ease;
}

.feature-item:hover::before,
.info-item:hover::before {
  left: 100%;
}

.feature-item:hover,
.info-item:hover {
  background: var(--theme-color);
  color: white;
  border-color: var(--theme-color);
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

/* Utility Classes */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.hidden-schema {
  display: none;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .content-wrapper {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  .page {
    padding: 5rem 1rem 2rem;
  }
  
  .content-wrapper {
    padding: 1.5rem;
  }
  
  .column {
    padding: 2rem;
  }
    
  .feature-item, .info-item {
    padding: 1rem 1.25rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .column {
    padding: 1.5rem;
  }
  
  .feature-section,
  .info-section {
    padding: 1.5rem;
  }
}

/* Accessibility & Focus States */
.column:focus-within {
  outline: 3px solid var(--theme-color);
  outline-offset: 4px;
}

.feature-item:focus,
.info-item:focus {
  outline: 2px solid var(--theme-color);
  outline-offset: 2px;
}

/* Print Styles */
@media print {
  .page {
    padding: 1rem;
    background: white;
  }
  
  .content-wrapper {
    background: white;
    box-shadow: none;
  }
  
  .column {
    box-shadow: none;
    border: 1px solid #ccc;
  }
  
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
  .column {
    border-width: 4px;
  }
  
  .feature-item,
  .info-item {
    border-width: 3px;
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>
