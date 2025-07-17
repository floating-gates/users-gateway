<template>
<div class="terms-container">
  <h1 class="title">Terms of Service – Floating Gates</h1>
  <p class="version"><strong>Effective Date: </strong> 02/06/2025 · <strong>Version:</strong> 1.0</p>
  
  <section v-for="section in termsSections" :key="section.title" class="terms-section">
    <h1>{{ section.title }}</h1>
    <div v-html="section.content"></div>
  </section>
  
  <footer class="contact">
    <h2>Contact</h2>
    <p>Email: {{ contactInfo.email }} </p>
    <p>Address: {{ contactInfo.address }}</p>
    <p>VAT: {{ contactInfo.vat }}</p>
  </footer>
</div>
</template>

<script setup>
import { contactInfo } from "../data/items.js";

const termsSections = [
    {
        title: "1. About the Platform",
        content: `
      <p>Floating Gates is a digital platform allowing registered users ("Customers", "Users") to upload, host, manage, and potentially share or license 3D models.</p>
    `,
    },
    {
        title: "2. Eligibility",
        content: `
      <p>You must be at least 18 years old or the age of majority in your jurisdiction to use the Platform. By registering, you confirm that you meet this requirement and have full legal capacity to enter into this agreement.</p>
    `,
    },
    {
        title: "3. User Accounts",
        content: `
      <p>To access most features, you must create an account and provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.</p>
      <p>We reserve the right to suspend or terminate accounts that violate these Terms or applicable law.</p>
    `,
    },
    {
        title: "4. User Content",
        content: `
      <h3>4.1. Ownership</h3>
      <p>You retain full ownership of the 3D models and other content ("User Content") you upload. Floating Gates does not claim ownership over your content.</p>
      <h3>4.2. License to Host and Display</h3>
      <p>By uploading content, you grant us a non-exclusive, worldwide, royalty-free license to host, display, and process your content for the purpose of providing the Platform's services.</p>
      <p>You may remove your content at any time; upon deletion, the license granted to us terminates (except where retention is legally required).</p>
      <h3>4.3. Responsibility</h3>
      <p>You are solely responsible for your content and warrant that you have the necessary rights and that it complies with applicable laws.</p>
    `,
    },
    {
        title: "5. Acceptable Use",
        content: `
      <p>You agree not to use the Platform for unlawful purposes or in ways that violate intellectual property rights, privacy, or platform integrity. We may remove content or suspend access in case of violations.</p>
    `,
    },
    {
        title: "6. Data Protection and Privacy",
        content: `
      <p>We process your personal data in accordance with the GDPR and our <a href='#'>Privacy Policy</a>. You have the right to access, correct, delete, or restrict processing of your data.</p>
    `,
    },
    {
        title: "7. Intellectual Property",
        content: `
      <p>All rights not expressly granted to you remain with Floating Gates or its licensors. You may not copy or distribute our branding or software without consent.</p>
    `,
    },
    {
        title: "8. Platform Availability and Changes",
        content: `
      <p>We may temporarily suspend or change the Platform for maintenance or legal reasons. We are not liable for losses due to such downtime, except in cases of gross negligence.</p>
    `,
    },
    {
        title: "9. Third-Party Services",
        content: `
      <p>The Platform may contain links to third-party services, for which we are not responsible.</p>
    `,
    },
    {
        title: "10. Termination",
        content: `
      <p>You can delete your account anytime. We may terminate your access for violations. Legal data retention obligations may apply even after termination.</p>
    `,
    },
    {
        title: "11. Liability and Disclaimer",
        content: `
      <p>The Platform is provided "as is". We disclaim liability to the extent permitted by law, excluding cases like fraud or personal injury. Total liability is limited to €100 or the amount you paid us in the past 12 months.</p>
    `,
    },
    {
        title: "12. Governing Law and Jurisdiction",
        content: `
      <p>These Terms are governed by EU law and the laws of Italy. Consumers may rely on the laws of their country of residence. Disputes may be resolved via the <a href='https://ec.europa.eu/consumers/odr/' target='_blank'>Online Dispute Resolution Platform</a>.</p>
    `,
    },
    {
        title: "13. Modifications to Terms",
        content: `
      <p>We may update these Terms. Material changes will be communicated in advance. Continued use means acceptance of the changes.</p>
    `,
    },
];
</script>

<style scoped>
.terms-container {
    max-width: 800px;
    margin: auto;
    padding: 2rem;
    font-family: Arial, sans-serif;
    line-height: 1.6;
}

.title {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.version {
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 2rem;
}

.terms-section {
    margin-bottom: 2rem;
}

.terms-section h2 {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    color: #333;
}

.terms-section h3 {
    font-size: 1.1rem;
  margin-top: 1rem;
  margin-bottom: 0.3rem;
  color: #444;
}

.contact {
  border-top: 1px solid #ccc;
  padding-top: 1rem;
  margin-top: 2rem;
}
</style>
