<script setup>
import { themeColor, contactInfo } from "../config.js";
import Header from "../components/Header.vue"

const lastUpdated = 'November 06, 2025';

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
      <h1 class="main-title">Privacy Policy</h1>
      <div class="company-info">
        <p class="last-updated">Last Updated: {{ lastUpdated }}</p>
      </div>
    </div>

    <div class="content-wrapper">
      <nav class="table-of-contents">
        <h3>Table of Contents</h3>
        <ul>
          <li><a href="#interpretation" @click="scrollTo('interpretation')">1. Interpretation & Definitions</a></li>
          <li><a href="#data-collection" @click="scrollTo('data-collection')">2. Collecting and Using Your Personal Data</a></li>
          <li><a href="#retention" @click="scrollTo('retention')">3. Retention of Your Personal Data</a></li>
          <li><a href="#transfer" @click="scrollTo('transfer')">4. Transfer of Your Personal Data</a></li>
          <li><a href="#delete" @click="scrollTo('delete')">5. Deleting Your Personal Data</a></li>
          <li><a href="#disclosure" @click="scrollTo('disclosure')">6. Disclosure of Your Personal Data</a></li>
          <li><a href="#security" @click="scrollTo('security')">7. Security of Your Personal Data</a></li>
          <li><a href="#children" @click="scrollTo('children')">8. Children's Privacy</a></li>
          <li><a href="#links" @click="scrollTo('links')">9. Links to Other Websites</a></li>
          <li><a href="#changes" @click="scrollTo('changes')">10. Changes to this Privacy Policy</a></li>
          <li><a href="#contact" @click="scrollTo('contact')">11. Contact Us</a></li>
        </ul>
      </nav>

      <main class="terms-content">
        <section id="interpretation" class="term-section">
          <h2>1. Interpretation & Definitions</h2>
          <p>
            Words with an initial capital letter have meanings defined under the following conditions. 
            These definitions apply consistently whether they appear in singular or plural form.
          </p>
          <div class="definitions-grid">
            <div class="definition-item"><strong>Account:</strong> A unique account created for You to access our Service or specific parts of it.</div>
            <div class="definition-item"><strong>Affiliate:</strong> Any entity that controls, is controlled by, or is under common control with a party, where “control” means ownership of 50% or more of the shares, equity interest, or other securities entitled to vote for directors or other managing authority.</div>
            <div class="definition-item"><strong>Application:</strong> Gates, the software platform provided by the Company to deliver our SaaS Service.</div>
            <div class="definition-item"><strong>Company:</strong> Floating Gates srl, Via Vapitello Rasa 28, referred to as “the Company”, “We”, “Us”, or “Our”.</div>
            <div class="definition-item"><strong>Country:</strong> Italy.</div>
            <div class="definition-item"><strong>Device:</strong> Any electronic device capable of accessing the Service, such as a computer, smartphone, or tablet.</div>
            <div class="definition-item"><strong>Cookies:</strong> Small files placed on Your Device that store details of your browsing history and preferences.</div>
            <div class="definition-item"><strong>Personal Data:</strong> Any information relating to an identified or identifiable individual, such as name, contact details, account credentials, or online identifiers.</div>
            <div class="definition-item"><strong>Service:</strong> Refers to the Application and all associated web services operated by the Company.</div>
            <div class="definition-item"><strong>Service Provider:</strong> Any natural or legal person who processes data on behalf of the Company, such as cloud infrastructure or analytics providers.</div>
            <div class="definition-item"><strong>Usage Data:</strong> Data collected automatically during use of the Service, including device information, activity logs, and performance metrics.</div>
            <div class="definition-item"><strong>You:</strong> The individual, company, or other legal entity accessing or using the Service, as applicable.</div>
          </div>
        </section>

        <section id="data-collection" class="term-section">
          <h2>2. Collecting and Using Your Personal Data</h2>

          <h5>Types of Data Collected</h5>
          <p>We collect different categories of information to provide, improve, and secure our Service:</p>
          <ul>
            <li><strong>Personal identification data:</strong> Email address, first and last name, and optionally phone number or company name.</li>
            <li><strong>Account credentials:</strong> Encrypted passwords, authentication tokens, and user role assignments.</li>
            <li><strong>Billing information:</strong> Payment details, invoices, and transaction records handled securely by third-party payment processors.</li>
            <li><strong>Usage Data:</strong> Log data such as IP address, browser type, operating system, time spent on pages, feature usage, and diagnostic data.</li>
          </ul>

          <h5>Tracking Technologies and Cookies</h5>
          <p>
            We use Cookies and similar tracking technologies (e.g., web beacons, pixels, and local storage) to monitor activity on our Service, 
            store user preferences, and collect analytics. You can manage cookie settings through your browser, 
            but disabling cookies may affect certain Service functionalities.
          </p>

          <h5>Use of Personal Data</h5>
          <p>The Company may process Personal Data for the following purposes:</p>
          <ul>
            <li>To <strong>provide and maintain</strong> our Service, including monitoring its usage and performance.</li>
            <li>To <strong>manage your Account</strong> and enable authentication and access control.</li>
            <li>To <strong>perform contractual obligations</strong>, such as fulfilling subscriptions or service-level agreements.</li>
            <li>To <strong>contact You</strong> regarding updates, security notifications, or service changes.</li>
            <li>To <strong>send marketing communications</strong> or product information, where legally permitted and with Your consent.</li>
            <li>To <strong>analyze user behavior</strong> and improve usability, performance, and features.</li>
            <li>To <strong>protect the Service</strong> against misuse, fraud, and security threats.</li>
            <li>To <strong>comply with legal obligations</strong> and enforce our rights under applicable laws.</li>
          </ul>

          <h5>Legal Basis for Processing (EU/EEA Users)</h5>
          <p>
            If You are located in the European Economic Area (EEA), we process your Personal Data under one or more of the following legal bases: 
            (a) your consent, (b) performance of a contract, (c) compliance with a legal obligation, (d) legitimate interests, or (e) protection of vital interests.
          </p>
        </section>

        <section id="retention" class="term-section">
          <h2>3. Retention of Your Personal Data</h2>
          <p>
            We retain Personal Data only as long as necessary for the purposes outlined in this Policy, including maintaining your Account, 
            fulfilling legal obligations, resolving disputes, and enforcing agreements. 
            When data is no longer required, it will be securely deleted or anonymized.
          </p>
        </section>

        <section id="transfer" class="term-section">
          <h2>4. Transfer of Your Personal Data</h2>
          <p>
            Your data may be transferred and processed in countries other than your own. These jurisdictions may have different data protection laws.
            We ensure that any such transfers comply with applicable data protection regulations, such as the EU Standard Contractual Clauses or equivalent safeguards.
          </p>
        </section>

        <section id="delete" class="term-section">
          <h2>5. Deleting Your Personal Data</h2>
          <p>
            You may request deletion of your Personal Data at any time. Deletion can be initiated via your account settings or by contacting our support team.
            Certain information may be retained where required for compliance, fraud prevention, or accounting purposes.
          </p>
          <p>
            Upon confirmation, your data will be permanently removed or anonymized within a reasonable timeframe.
          </p>
        </section>

        <section id="disclosure" class="term-section">
          <h2>6. Disclosure of Your Personal Data</h2>
          <ul>
            <li><strong>Business Transactions:</strong> Personal Data may be transferred as part of a merger, acquisition, or asset sale. We will notify you before your data is transferred and becomes subject to a different privacy policy.</li>
            <li><strong>Law Enforcement:</strong> We may disclose Personal Data if required by law or in response to valid legal requests from public authorities.</li>
            <li><strong>Other Legal Requirements:</strong> We may disclose Personal Data to protect the rights, property, or safety of the Company, our users, or the public.</li>
          </ul>
        </section>

        <section id="security" class="term-section">
          <h2>7. Security of Your Personal Data</h2>
          <p>
            We implement administrative, technical, and physical safeguards designed to protect your Personal Data from unauthorized access, 
            loss, misuse, or disclosure. These include encryption in transit and at rest, restricted data access, and continuous monitoring.
            However, no online system can guarantee absolute security, and you use the Service at your own risk.
          </p>
        </section>

        <section id="children" class="term-section">
          <h2>8. Children's Privacy</h2>
          <p>
            Our Service is not intended for individuals under 13 years of age, and we do not knowingly collect data from minors.
            If you believe that a child has provided us with Personal Data, please contact us immediately so we can delete the information.
          </p>
        </section>

        <section id="links" class="term-section">
          <h2>9. Links to Other Websites</h2>
          <p>
            Our Service may contain links to third-party websites or services. We have no control over, and assume no responsibility for, 
            the content, privacy policies, or practices of any third-party sites. We encourage You to review the privacy policy of every site You visit.
          </p>
        </section>

        <section id="changes" class="term-section">
          <h2>10. Changes to this Privacy Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Any revisions will be posted on this page with an updated “Last Updated” date.
            We encourage You to review this Policy regularly. Continued use of the Service following any updates constitutes your acceptance of the revised terms.
          </p>
        </section>

        <section id="contact" class="term-section">
          <h2>11. Contact Us</h2>
          <p>
            For any questions, requests, or concerns about this Privacy Policy or our data handling practices, please contact us at:
          </p>
          <div class="contact-info">
            <p>Email: {{ contactInfo.email }}</p>
            <p>Address: {{ contactInfo.address }}</p>
            <p>VAT: {{ contactInfo.vat }}</p>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Same styles as your Terms of Service component */
.terms-container {
  max-width: 1800px;
  margin: 0 auto;
  padding: 100px 20px 20px;
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
    padding: 4px;
    border-radius: 4px;
    border-color: v-bind(themeColor);
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

/* Mobile responsiveness same as TOS */
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
    .terms-container { padding: 15px; }
    .main-title { font-size: 2rem; }
    .table-of-contents { padding: 15px; }
    .term-section h2 { font-size: 1.2rem; }
}

@media (max-width: 480px) {
    .main-title { font-size: 1.8rem; }
    .definitions-grid { gap: 10px; }
    .definition-item { padding: 10px; }
}
</style>
