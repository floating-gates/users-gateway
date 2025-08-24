<script setup>
import { themeColor, contactInfo } from "../data/items.js";
import Header from "../components/Header.vue"

const lastUpdated = 'August 24, 2025';

function scrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
</script>



<template>
  <Header :context="'landing-page'" />
<div class="terms-container">
  <div class="header-section">
    <h1 class="main-title">Terms of Service</h1>
    <div class="company-info">
      <p class="last-updated">Last Updated: {{ lastUpdated }}</p>
    </div>
  </div>
  
  <div class="content-wrapper">
    <nav class="table-of-contents">
      <h3>Table of Contents</h3>
      <ul>
        <li><a href="#acceptance" @click="scrollTo('acceptance')">1. Acceptance of Terms</a></li>
        <li><a href="#description" @click="scrollTo('description')">2. Service Description</a></li>
        <li><a href="#definitions" @click="scrollTo('definitions')">3. Definitions</a></li>
        <li><a href="#eligibility" @click="scrollTo('eligibility')">4. Eligibility</a></li>
        <li><a href="#account" @click="scrollTo('account')">5. Account Registration</a></li>
        <li><a href="#platform-services" @click="scrollTo('platform-services')">6. Platform Services</a></li>
        <li><a href="#responsibilities" @click="scrollTo('responsibilities')">7. User Responsibilities</a></li>
        <li><a href="#intellectual-property" @click="scrollTo('intellectual-property')">8. Intellectual Property</a></li>
        <li><a href="#data-privacy" @click="scrollTo('data-privacy')">9. Data Privacy and Security</a></li>
        <li><a href="#payment" @click="scrollTo('payment')">10. Payment Terms</a></li>
        <li><a href="#limitations" @click="scrollTo('limitations')">11. Service Limitations</a></li>
        <li><a href="#termination" @click="scrollTo('termination')">12. Termination</a></li>
        <li><a href="#disclaimers" @click="scrollTo('disclaimers')">13. Disclaimers</a></li>
        <li><a href="#limitation-liability" @click="scrollTo('limitation-liability')">14. Limitation of Liability</a></li>
        <li><a href="#indemnification" @click="scrollTo('indemnification')">15. Indemnification</a></li>
        <li><a href="#governing-law" @click="scrollTo('governing-law')">16. Governing Law</a></li>
        <li><a href="#changes" @click="scrollTo('changes')">17. Changes to Terms</a></li>
        <li><a href="#contact" @click="scrollTo('contact')">18. Contact Information</a></li>
      </ul>
    </nav>
    
    <main class="terms-content">
      <section id="acceptance" class="term-section">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the Floating Gates platform ("Platform"), you acknowledge that you have read, 
          understood, and agree to be bound by these Terms of Service ("Terms"). If you are using the Platform 
          on behalf of a company or organization, you represent and warrant that you have the authority to bind 
          such entity to these Terms.
        </p>
        <p>
          If you do not agree to these Terms, you must not access or use the Platform.
        </p>
      </section>
      
      <section id="description" class="term-section">
        <h2>2. Service Description</h2>
        <p>
          Floating Gates operates a B2B2C proxy platform that connects manufacturers with manufacturing capacity 
          to their customer base. Our Platform provides intelligent manufacturing workflow solutions including:
        </p>
        <ul>
          <li><strong>Automatic Feasibility Check:</strong> Real-time assessment of manufacturing feasibility</li>
          <li><strong>Immediate Quote Estimation:</strong> Instant pricing calculations</li>
          <li><strong>Shape Optimization/Suggestion:</strong> Design enhancement recommendations</li>
          <li><strong>Streamlined Order Handling:</strong> Automated workflow management</li>
        </ul>
        <p>
          The Platform serves as an intermediary, reducing sales overhead for manufacturers while enhancing 
          service capabilities for end customers.
        </p>
      </section>
      
      <section id="definitions" class="term-section">
        <h2>3. Definitions</h2>
        <div class="definitions-grid">
          <div class="definition-item">
            <strong>"Platform"</strong> refers to the Floating Gates software platform, including all related services, 
            tools, and applications.
          </div>
          <div class="definition-item">
            <strong>"Manufacturer"</strong> refers to companies with manufacturing capacity that use our Platform 
            to serve their customers.
          </div>
          <div class="definition-item">
            <strong>"End Customer"</strong> refers to the customers of Manufacturers who access Platform services 
            through the B2B2C model.
          </div>
          <div class="definition-item">
            <strong>"User"</strong> refers to any individual or entity accessing or using the Platform, including 
            Manufacturers and End Customers.
          </div>
          <div class="definition-item">
            <strong>"Model Analyzer"</strong> refers to our proprietary analysis tools for manufacturing 
            optimization.
          </div>
        </div>
      </section>
      
      <section id="eligibility" class="term-section">
        <h2>4. Eligibility</h2>
        <p>
          To use the Platform, you must:
        </p>
        <ul>
          <li>Be at least 18 years of age or the age of majority in your jurisdiction</li>
          <li>Have the legal capacity to enter into binding agreements</li>
          <li>Represent a legitimate business entity (for Manufacturer accounts)</li>
          <li>Not be prohibited from using the Platform under applicable law</li>
          <li>Comply with all local, state, national, and international laws and regulations</li>
        </ul>
      </section>
      
      <section id="account" class="term-section">
        <h2>5. Account Registration and Security</h2>
        <p>
          <strong>5.1 Account Creation:</strong> To access Platform services, you must create an account by providing 
          accurate, complete, and current information. You are responsible for maintaining the accuracy of your 
          account information.
        </p>
        <p>
          <strong>5.2 Account Security:</strong> You are solely responsible for maintaining the confidentiality of 
          your account credentials. You agree to notify us immediately of any unauthorized access to your account.
        </p>
        <p>
          <strong>5.3 Account Types:</strong> Different account types (Manufacturer, End Customer) may have different 
          access levels and capabilities within the Platform.
        </p>
      </section>
      
      <section id="platform-services" class="term-section">
        <h2>6. Platform Services</h2>
        <p>
          <strong>6.1 Model Analyzer Services:</strong> Our Model Analyzer provides automated analysis including 
          feasibility checks, quote estimations, and optimization suggestions. Results are estimates and should 
          be verified before making final manufacturing decisions.
        </p>
        <p>
          <strong>6.2 Proxy Services:</strong> We act as an intermediary between Manufacturers and End Customers, 
          facilitating communication, order processing, and service delivery.
        </p>
        <p>
          <strong>6.3 Service Availability:</strong> We strive to maintain Platform availability but do not guarantee 
          uninterrupted access. Scheduled maintenance and updates may temporarily affect service availability.
        </p>
        <p>
          <strong>6.4 Service Modifications:</strong> We reserve the right to modify, suspend, or discontinue any 
          Platform features with reasonable notice to Users.
        </p>
      </section>
      
      <section id="responsibilities" class="term-section">
        <h2>7. User Responsibilities</h2>
        <p>
          <strong>7.1 Manufacturer Responsibilities:</strong>
        </p>
        <ul>
          <li>Provide accurate manufacturing capabilities and capacity information</li>
          <li>Maintain quality standards for manufactured products</li>
          <li>Honor quotes and commitments made through the Platform</li>
          <li>Comply with all applicable manufacturing regulations and standards</li>
        </ul>
        
        <p>
          <strong>7.2 End Customer Responsibilities:</strong>
        </p>
        <ul>
          <li>Provide accurate project specifications and requirements</li>
          <li>Ensure uploaded models and designs comply with intellectual property laws</li>
          <li>Make timely payments for services rendered</li>
        </ul>
        
        <p>
          <strong>7.3 Prohibited Activities:</strong> Users must not:
        </p>
        <ul>
          <li>Upload malicious software, viruses, or harmful code</li>
          <li>Attempt to reverse engineer or hack the Platform</li>
          <li>Use the Platform for illegal or unauthorized purposes</li>
          <li>Violate intellectual property rights</li>
          <li>Share account credentials with unauthorized parties</li>
          <li>Manipulate or falsify data or results</li>
        </ul>
      </section>
      
      <section id="intellectual-property" class="term-section">
        <h2>8. Intellectual Property Rights</h2>
        <p>
          <strong>8.1 Platform IP:</strong> Floating Gates retains all rights, title, and interest in the Platform, 
          including our Model Analyzer, algorithms, software, and related intellectual property.
        </p>
        <p>
          <strong>8.2 User Content:</strong> You retain ownership of your designs, models, and data uploaded to 
          the Platform. By using our services, you grant us a limited license to process and analyze your content 
          for the purpose of providing Platform services.
        </p>
        <p>
          <strong>8.3 Feedback:</strong> Any feedback, suggestions, or improvements you provide may be used by 
          Floating Gates without compensation or attribution.
        </p>
      </section>
      
      <section id="data-privacy" class="term-section">
        <h2>9. Data Privacy and Security</h2>
        <p>
          <strong>9.1 Data Collection:</strong> We collect and process data necessary to provide Platform services 
          as outlined in our Privacy Policy.
        </p>
        <p>
          <strong>9.2 Data Security:</strong> We implement industry-standard security measures to protect your data. 
          However, no system is completely secure, and we cannot guarantee absolute data security.
        </p>
        <p>
          <strong>9.3 Data Retention:</strong> We retain user data as necessary to provide services and comply with 
          legal obligations. Users may request data deletion subject to our retention policies.
        </p>
      </section>
      
      <section id="payment" class="term-section">
        <h2>10. Payment Terms</h2>
        <p>
          <strong>10.1 Fees:</strong> Platform usage fees are determined based on service tier, usage volume, 
          and specific agreements with Manufacturers and End Customers.
        </p>
        <p>
          <strong>10.2 Payment Processing:</strong> We may facilitate payment processing between Manufacturers and 
          End Customers. Transaction fees may apply.
        </p>
        <p>
          <strong>10.3 Refunds:</strong> Refund policies vary based on service type and specific circumstances. 
          Refund requests must be submitted through official channels.
        </p>
      </section>
      
      <section id="limitations" class="term-section">
        <h2>11. Service Limitations and Accuracy</h2>
        <p>
          <strong>11.1 Analysis Limitations:</strong> Model Analyzer results are estimates based on available data 
          and algorithms. Actual manufacturing results may vary.
        </p>
        <p>
          <strong>11.2 No Guarantee:</strong> We do not guarantee the accuracy, completeness, or suitability of 
          Platform analyses for specific manufacturing applications.
        </p>
        <p>
          <strong>11.3 User Verification:</strong> Users are responsible for verifying all Platform-generated 
          information before making manufacturing or business decisions.
        </p>
      </section>
      
      <section id="termination" class="term-section">
        <h2>12. Termination</h2>
        <p>
          <strong>12.1 User Termination:</strong> You may terminate your account at any time by following the 
          account closure process in the Platform settings.
        </p>
        <p>
          <strong>12.2 Our Termination Rights:</strong> We may suspend or terminate accounts for:
        </p>
        <ul>
          <li>Violation of these Terms</li>
          <li>Non-payment of fees</li>
          <li>Fraudulent or illegal activity</li>
          <li>Extended account inactivity</li>
        </ul>
        <p>
          <strong>12.3 Effect of Termination:</strong> Upon termination, your access to the Platform will cease, 
          and we may delete your account data subject to legal retention requirements.
        </p>
      </section>
      
      <section id="disclaimers" class="term-section">
        <h2>13. Disclaimers</h2>
        <p>
          THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS 
          OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
          PURPOSE, OR NON-INFRINGEMENT.
        </p>
        <p>
          WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE FROM HARMFUL COMPONENTS. 
          YOUR USE OF THE PLATFORM IS AT YOUR SOLE RISK.
        </p>
      </section>
      
      <section id="limitation-liability" class="term-section">
        <h2>14. Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, FLOATING GATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
          SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOST PROFITS, DATA LOSS, OR 
          BUSINESS INTERRUPTION.
        </p>
        <p>
          OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM THESE TERMS OR THE PLATFORM SHALL NOT EXCEED THE 
          AMOUNT PAID BY YOU FOR PLATFORM SERVICES IN THE 12 MONTHS PRECEDING THE CLAIM.
        </p>
      </section>
      
      <section id="indemnification" class="term-section">
        <h2>15. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Floating Gates and its officers, directors, employees, and 
          agents from any claims, damages, losses, or expenses arising from:
        </p>
        <ul>
          <li>Your use of the Platform</li>
          <li>Your violation of these Terms</li>
          <li>Your infringement of intellectual property rights</li>
          <li>Your interactions with other Platform users</li>
        </ul>
      </section>
      
      <section id="governing-law" class="term-section">
        <h2>16. Governing Law and Dispute Resolution</h2>
        <p>
          <strong>16.1 Governing Law:</strong> These Terms shall be governed by and construed in accordance with 
          the laws of [Jurisdiction], without regard to conflict of law principles.
        </p>
        <p>
          <strong>16.2 Dispute Resolution:</strong> Any disputes arising from these Terms shall be resolved through 
          binding arbitration in accordance with [Arbitration Rules].
        </p>
        <p>
          <strong>16.3 Class Action Waiver:</strong> You agree that any arbitration or legal proceeding shall be 
          conducted on an individual basis and not as part of a class action.
        </p>
      </section>
      
      <section id="changes" class="term-section">
        <h2>17. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. Material changes will be communicated through 
          the Platform or via email. Your continued use of the Platform after such changes constitutes acceptance 
          of the modified Terms.
        </p>
        <p>
          It is your responsibility to review these Terms periodically for updates.
        </p>
      </section>
      
      <section id="contact" class="term-section">
        <h2>18. Contact Information</h2>
        <p>
          For questions about these Terms or the Platform, please contact us at:
        </p>
        <div class="contact-info">
          <p>Email: {{ contactInfo.email }} </p>
          <p>Address: {{ contactInfo.address }}</p>
          <p>VAT: {{ contactInfo.vat }}</p>
        </div>
      </section>
    </main>
  </div>
</div>
</template>


<style scoped>
.terms-container {
  max-width: 1800px;
  margin: 0 auto;
  padding: 100px 20px 20px; /* push down so it's below the header */
  line-height: 1.6;
  color: #333;
}

.header-section {
    text-align: center;
    margin-bottom: 40px;
    padding-bottom: 30px;
    border-bottom: 2px solid #e0e0e0;
}

.main-title {
    font-size: 2.5rem;
    margin: 0 0 20px 0;
    color: v-bind(themeColor);
    font-weight: 700;
}


.last-updated {
    color: #666;
    font-style: italic;
    margin: 0;
}

.content-wrapper {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 40px;
    align-items: start;
}

.table-of-contents {
    position: sticky;
    top: 20px;
    background: #f8f9fa;
    padding: 25px;
    border-radius: 8px;
    border: 1px solid #e9ecef;
}

.table-of-contents h3 {
    margin: 0 0 15px 0;
    color: v-bind(themeColor);
    font-size: 1.1rem;
}

.table-of-contents ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.table-of-contents li {
    margin-bottom: 8px;
}

.table-of-contents a {
    color: #2b6cb0;
    text-decoration: none;
    font-size: 0.9rem;
    cursor: pointer;
    transition: color 0.2s ease;
}

.table-of-contents a:hover {
    color: v-bind(themeColor);
    text-decoration: underline;
}

.terms-content {
    max-width: none;
}

.term-section {
    margin-bottom: 35px;
    scroll-margin-top: 20px;
}

.term-section h2 {
    color: v-bind(themeColor);
    font-size: 1.4rem;
    margin: 0 0 15px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #e0e0e0;
}

.term-section p {
    margin-bottom: 15px;
    text-align: justify;
}

.term-section ul {
    margin: 15px 0;
    padding-left: 25px;
}

.term-section li {
    margin-bottom: 8px;
}

.definitions-grid {
    display: grid;
    gap: 15px;
    margin: 20px 0;
}

.definition-item {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 6px;
    border-left: 4px solid v-bind(themeColor);
}

.contact-info {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 6px;
    margin: 20px 0;
}

.contact-info p {
    margin: 5px 0;
}

.terms-footer {
    margin-top: 50px;
    padding: 30px 0;
    border-top: 2px solid #e0e0e0;
    text-align: center;
    color: #666;
}

.terms-footer p {
    margin: 5px 0;
}

/* Mobile Responsiveness */
@media (max-width: 1024px) {
    .content-wrapper {
        grid-template-columns: 1fr;
        gap: 30px;
    }
    
    .table-of-contents {
        position: static;
        order: 2;
    }
    
    .terms-content {
        order: 1;
    }
}

@media (max-width: 768px) {
    .terms-container {
        padding: 15px;
    }
    
    .main-title {
        font-size: 2rem;
    }
    
    .company-name {
        font-size: 1.4rem;
    }
    
    .table-of-contents {
        padding: 15px;
    }
    
    .term-section h2 {
        font-size: 1.2rem;
    }
}

@media (max-width: 480px) {
    .main-title {
        font-size: 1.8rem;
    }
    
    .company-name {
        font-size: 1.2rem;
    }
    
    .definitions-grid {
        gap: 10px;
    }
    
    .definition-item {
        padding: 10px;
    }
}
</style>
