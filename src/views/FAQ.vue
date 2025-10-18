<script setup>
import { themeColor, themeColorOrange, themeColorLille } from "../data/items";
import { ref } from "vue";
import Header from "../components/Header.vue";

const faqs = [
{
  question: "What does Gates provides to Your Business?",
    answer: "Gates provides to You a Manufacturing Hub to funnel orders, while it host publicly a CAD Online to permit Your customers to engineer/price the devices ahead of time. The platform enables your customer to issue orders and to take the advantage of feasibility checks, instant quotes, and design optimizations. The advantage is that manufacturers can gain new customers and track existing clients thanks to renewed visibility, avoid uncertain prospects and streamline interactions with their customer base."
},
{
    question: "Who is it for?",
    answer: "Gates serves from big manufacturing lines (i.g. plastic injection) to small workshops that owns just a 3D printer. Our solution is especially valuable for those with well-established production methods who struggle to fully utilize their machines due to cumbersome order inquiries."
},
{
  question: "What is Floating Gates?",
  answer: "Floating Gates is a technology Partner for manufacturers. We help businesses connect with new and existing customers by providing digital tools to establish a strong online presence, and enable growth. Our solutions empower manufacturers to expand their reach to stay competitive in an increasingly digital market."
},
{
  question: "What problem does it solve?",
  answer: "Low sales and a high amount of time spent on preliminaries studies. Gates increase actual orders by spreading and assessing new customer requests. It streamlines quotes and performs technical checks, allowing manufacturers to operate more efficiently and focus on what they do best: build."
},
{
  question: "What differentiates it from competitors?",
  answer: "Unlike standalone tools, we provide a complete infrastructure that connects manufacturers directly with the customers, maximizing visibility and utilization. We do not interfere with your business decisions, instead we provide a framework around it, with the goal of improving operational efficiency."
},
{
  question: "Can I be listed into one of the Certified Manufacturers list?",
  answer: "Yes, we are starting a programme to collect a list a company who prefer to be listed into a wider network of makers so they can reach a wider customer base. Send us an email at contact@floating-gates.com if you would like a preview of the service."
},
{
  question: "How is data handled and stored?",
  answer: "For the Basic and Standard plans, we offer secure cloud access as well as on-premise options, with all data protected under GDPR-compliant practices. For enterprise customers, software and data governance are fully transferred to the purchaser."
},
{
  question: "How does it work the custom address?",
  answer: "Gates is a managed cloud service and it is going to host a server for the infrastructrure and its'services. For the Basic and Standard programme we are going to use the suffix floating-gates.com while for Enterprise customer we purchase a stand alone domain name"
},
{
  question: "Do you offer affiliate programs?",
  answer: "Yes. Creators and manufacturers can earn commissions by bringing new customers to the platform. By subscribing at: https://floating-gates.com/referral_login"
},
{
  question: "What is your refund policy?",
  answer: "If your account remains inactive during a billing cycle—meaning there is no activity from you or your potential customers—you will automatically receive a full refund. Refunds are processed at the end of the month and issued within 5–10 business days."
}
];


const openItems = ref(new Set());

const toggleItem = (index) => {
  const newOpenItems = new Set(openItems.value);
  if (newOpenItems.has(index)) {
    newOpenItems.delete(index);
  } else {
    newOpenItems.add(index);
  }
  openItems.value = newOpenItems;
};

const isOpen = (index) => openItems.value.has(index);
</script>

<template>
  <Header :context="'landing-page'" />
  <div class="faq-section">
    <div class="container">
      <div class="row justify-content-center">
        
          
          <!-- Enhanced Header Section -->
          <div class="faq-header">
            <h2 class="faq-title">Got Questions? We've Got Answers</h2>
            <p class="faq-subtitle">Everything you need to know about Floating Gates and how it can help your manufacturing business</p>
          </div>

          <div class="faq-container">
            <div
              v-for="(faq, index) in faqs"
              :key="index"
              class="faq-item"
              :class="{ 'is-open': isOpen(index) }"  >
              <button
                @click="toggleItem(index)"
                class="faq-question"
                :aria-expanded="isOpen(index)"    >
                <div class="question-left">
                  <div class="question-number">{{ String(index + 1).padStart(2, '0') }}</div>
                  <span class="question-text">{{ faq.question }}</span>
                </div>
                <span class="faq-icon">
                  <svg
                    :class="{ 'rotated': isOpen(index) }"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </span>
              </button>
              
              <div class="faq-answer" :class="{ 'is-open': isOpen(index) }">
                <div class="answer-content">
                  <div class="answer-text">{{ faq.answer }}</div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-section {
  padding: 8rem 0;
  /* background: linear-gradient(135deg, #fafbfc 0%, #f8f9fa 100%); */
  position: relative;
}

.faq-section::before {
  /* content: ''; */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: radial-gradient(ellipse at center top, rgba(108, 117, 125, 0.03) 0%, transparent 70%);
  pointer-events: none;
}

.faq-header {
  text-align: center;
  margin-bottom: 4rem;
}

.faq-title {
  color: v-bind(themeColor);
  font-weight: 700;
  font-size: 3rem;
  margin-bottom: 1rem;
  /* line-height: 1.2; */
  /* letter-spacing: -0.02em; */
}

.faq-subtitle {
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 2rem;
  line-height: 1.5;
  margin-left: auto;
  margin-right: auto;
}

.faq-container {
    
  max-width: 800px;
    
  position: relative;
}

.faq-item {
  background: white;
  border-radius: 16px;
  margin-bottom: 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border: 2px solid transparent;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.faq-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: v-bind(themeColorLille);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.faq-item:hover {
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.faq-item:hover::before {
    /* transform: scaleX(1); */
    background: v-bind(themeColor);

}

.faq-item.is-open {
  border-color: v-bind(themeColor);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
}

.faq-item.is-open::before {
  background: v-bind(themeColor);
  transform: scaleX(1);
}

.faq-question {
  width: 100%;
  padding: 2rem 2.5rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
}

.faq-question:hover {
  background: rgba(248, 249, 250, 0.8);
}

.faq-item.is-open .faq-question {
  background: v-bind(themeColor);
  color: white;
}

.question-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.question-number {
  font-size: 2rem;
  font-weight: 700;
  color: v-bind(themeColor);
  opacity: 0.8;
  min-width: 30px;
  transition: all 0.3s ease;
}

.faq-item.is-open .question-number {
  color: white;
  opacity: 1;
}

.question-text {
  font-weight: 550;
  font-size: 1.8rem;
}

.faq-icon {
  flex-shrink: 0;
  margin-left: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: v-bind(themeColorLille);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: v-bind(themeColor);
}

.faq-item.is-open .faq-icon {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  transform: scale(1.1);
}

.faq-icon svg.rotated {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-answer.is-open {
  max-height: 500px;
}


.answer-text {
  color: v-bind(themeColor);
  /* line-height: 1.7; */
  font-size: 1.4rem;
  padding: 2rem;
  position: center;
}



.faq-cta {
  margin-top: 4rem;
  text-align: center;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 28px 50px rgba(0, 0, 0, 0.1);
  border: 2px solid v-bind(themeColorLille);
  position: relative;
  overflow: hidden;
}


.cta-content h3 {
  color: v-bind(themeColor);
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
}

.cta-content p {
  color: #6c757d;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.cta-button {
  background: v-bind(themeColor);
  color: white;
  border: none;
  padding: 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  background: v-bind(themeColorOrange);
}

/* Responsive */
@media (max-width: 768px) {
  .faq-section {
    padding: 4rem 0;
  }
  
  .faq-title {
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }
  
  .faq-subtitle {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
  
  .faq-question {
    padding: 1.5rem 1.5rem;
  }
  
  .question-left {
    gap: 1rem;
  }
  
  .question-number {
    font-size: 1.6rem;
    /* min-width: 25px; */
  }
  
  .question-text {
    font-size: 3rem;
    font-weight: 500;
  }
  
  .faq-icon {
    width: 40px;
    height: 40px;
  }
  
  .answer-content {
    padding: 0 1.5rem 2rem 3.5rem;
  }
  
  .answer-text {
    padding: 1.25rem 1.5rem;
    font-size: 1rem;
  }
  
  .faq-cta {
    margin-top: 3rem;
    padding: 2rem 1.5rem;
  }
  
  .cta-content h3 {
    font-size: 1.5rem;
  }
  
  .cta-content p {
    font-size: 1rem;
  }
  
  .cta-button {
    padding: 0.875rem 2rem;
    font-size: 1rem;
  }
}
</style>
