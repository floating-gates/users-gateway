<script setup>
import { themeColor, themeColorOrange, themeColorLille } from "../data/items";
import { ref } from "vue";
import Header from "../components/Header.vue";

const faqs = [
  {
    question: "Why would you need it?",
    answer: "In a scenario where cost must be reduced, a platform to offload sales and tecnical departements."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, our engagement terms are designed to be flexible. For ongoing projects, we work in milestone-based phases, allowing you to evaluate progress and decide on continuation at each stage. For consulting agreements, standard notice periods apply as outlined in your specific contract. We believe in earning your business through results, not lock-in contracts."
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
  <Header :context="'profile'" />
  
  <div class="faq-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <h2 class="faq-title">Frequently Asked Questions</h2>
          
          <div class="faq-container">
            <div
              v-for="(faq, index) in faqs"
              :key="index"
              class="faq-item"
              :class="{ 'is-open': isOpen(index) }"
            >
              <button
                @click="toggleItem(index)"
                class="faq-question"
                :aria-expanded="isOpen(index)"
              >
                <span class="question-text">{{ faq.question }}</span>
                <span class="faq-icon">
                  <svg
                    :class="{ 'rotated': isOpen(index) }"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </span>
              </button>
              
              <div class="faq-answer" :class="{ 'is-open': isOpen(index) }">
                <div class="answer-content">
                  {{ faq.answer }}
                </div>
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
  padding: 7rem 0;
  background: #fafafa;
}

.faq-title {
  text-align: center;
  color: v-bind(themeColor);
  font-weight: 600;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.faq-container {
  max-width: 100%;
}

.faq-item {
  background: white;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid v-bind(themeColorLille);
  overflow: hidden;
  transition: all 0.2s ease;
}

.faq-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.faq-question {
  width: 100%;
  padding: 1.25rem 1.5rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  position: relative;
}

.faq-question:hover {
  background: v-bind(themeColorLille);
}

.faq-item.is-open .faq-question {
  background: v-bind(themeColor);
  color: white;
}

.question-text {
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.4;
}

.faq-icon {
  flex-shrink: 0;
  margin-left: 1rem;
  transition: transform 0.2s ease;
}

.faq-item.is-open .faq-icon {
  color: white;
}

.faq-icon svg.rotated {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-answer.is-open {
  max-height: 500px;
}

.answer-content {
  padding: 0 1.5rem 1.5rem 1.5rem;
  color: #555;
  line-height: 1.6;
  border-top: 1px solid v-bind(themeColorLille);
  margin-top: 0;
  padding-top: 1.25rem;
}

/* Responsive */
@media (max-width: 768px) {
  .faq-section {
    padding: 2rem 0;
  }
  
  .faq-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .faq-question {
    padding: 1rem 1.25rem;
  }
  
  .question-text {
    font-size: 1rem;
  }
  
  .answer-content {
    padding: 1rem 1.25rem 1.25rem 1.25rem;
  }
}
</style>
