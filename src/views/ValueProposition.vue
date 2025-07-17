<script setup>
import Header from "../components/Header.vue";
import { themeColor } from "../data/items.js";

const value_proposition_intro = "Unlocks the full potential of your machinery by delivering a steady flow of qualified orders, helping you grow your online presence without extra effort."

const product_intro = "Online platform to allow additional customer funnneling, providing services for advanced manifacturing i.g. simulation and shape optimization."

const productSections = [
  {
    title: "Gives",
    points: [
      "Manufactuting checks",
      "Automated order handling and tracking",
      "Pay before shipment"
    ]
   },
   {
    title: "Feature",
    points: [
      "Real-time pricing",
      "Automatic shape optimization"
    ]
  },

  {
    title: "Stand out from the crowd",
    points: [
      "Model analyzer and shape optimizer",
      "Simulation module integrated",
    ]
  }
];

const customer_intro = "3D printing business owners or simply 3D printers hobbiest. Who does not use the full manufacturing potential of the machines they bought, helping them to recover the investement"

const customerSections = [
  {
    title: "Want",
    points: [
      "More customer",
      "Less quoting",
      "More Adevertising"
    ]
  },
  {
    title: "Fear",
    points: [
      "Wasting time on unprintable files",
      "Customer not paying"
    ]
  },
  {
    title: "Need",
    points: [
      "Reliable file validation and quoting",
      "Advanced solutions to attract customer",
      "Secure and automatic payout"
    ]
  }
];
</script>

<template>
  <Header :context="'login'" />
  <div class="page">
    <div class="intro">
      <h1>Smarter Manufacturing Starts Here</h1>
      <p> {{value_proposition_intro}} </p>
    </div>

    <section class="column customer" :style="{ '--theme-color': themeColor }">
      <div class="column product">
        <h2>Product</h2>
        <p class="image-intro"> {{product_intro}} </p>

        <img src="../assets/images/product.png" alt="Product Illustration" class="section-image" />

        <div class="section" v-for="(item, index) in productSections" :key="'product-' + index">
          <h3>{{ item.title }}</h3>
          <ul>
            <li v-for="(point, i) in item.points" :key="i">{{ point }}</li>
          </ul>
        </div>
      </div>

      <div class="column customer">
        <h2>Customer</h2>
        <p class="image-intro"> {{customer_intro}} </p>

        <img src="../assets/images/customer.webp" alt="Product Illustration" class="section-image" />
        <div class="section" v-for="(item, index) in customerSections" :key="'customer-' + index">
          <h3>{{ item.title }}</h3>
          <ul>
            <li v-for="(point, i) in item.points" :key="i">{{ point }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>


<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6rem 2rem 2rem; /* Top padding increased to prevent header overlap */
  background-color: #f9fafb;
}

.intro {
  max-width: 800px;
  text-align: center;
  margin-bottom: 3rem;
}

.h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #111827;
}

.p {
  font-size: 1.125rem;
  color: #4b5563;
}

section.column.customer {
  background-color: var(--theme-color);
  display: flex;
  gap: 2rem;
  max-width: 1600px;
  width: 100%;
}

.column {
  flex: 1;
  background-color: white;
  border: 2px solid var(--theme-color);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.column:hover {
  transform: translateY(-3px);
}

h2 {
  font-size: 1.75rem;
  color: var(--theme-color);
  margin-bottom: 1rem;
  text-align: center;
}

.section {
  margin-bottom: 1.5rem;
}

.section h3 {
  font-size: 1.25rem;
  color: var(--theme-color);
  margin-bottom: 0.5rem;
  text-align: center;
}

ul {
  list-style-type: none;
  padding-left: 1.25rem;
}

li {
  text-align: center;
  color: var(--theme-color);
  background-color: #f1f5f9;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

li:hover {
  background-color: #e2e8f0;
}

.section-image {
  display: block;
  margin: 0 auto 1.5rem;  /* centers the image and adds bottom margin */
  border-radius: 12px;
  object-fit: cover;
  width: 75%;

  border: 3px solid var(--theme-color);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.image-intro {
  font-size: 1rem;
  color: var(--theme-color);
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 500;
}

</style>
