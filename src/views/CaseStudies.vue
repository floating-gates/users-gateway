<script setup>
import { ref, computed, watchEffect } from "vue";
import { themeColor, themeColorOrange, themeColorLille, themeColorWhite } from "../data/items.js";
import Header from "../components/Header.vue";
import { articles } from "../data/articles.js";
import { useRoute, useRouter } from "vue-router";

// Pagination
const route = useRoute();
const router = useRouter();
// Modal state
const selectedArticle = ref(null);

const currentPage = ref(1);
const perPage = 4;

const totalPages = computed(() => Math.ceil(articles.length / perPage));

const paginatedArticles = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    return articles.slice(start, start + perPage);
});

// If URL already has ?article=3, load it
watchEffect(() => {
    // const id = parseInt(route.query.article);
    const id = route.query.article;
    selectedArticle.value = articles.find(a => a.id === id) || null;
});

const openArticle = (article) => {
    router.push({ query: { article: article.id } });
};

const closeArticle = () => {
    router.push({ query: {} }); // remove param
};
</script>


<template>
<Header :context="'landing-page'" />
<div class="case-studies-page" :style="{ backgroundColor: themeColorWhite, color: themeColor }">
  <!-- Hero Section -->
  <div class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">Resources</h1>
      <p class="hero-subtitle">
        Discover how we've helped companies through open solutions.
      </p>
    </div>
  </div>
  
  <!-- Articles Grid -->
  <div class="articles-container">
    <div class="articles-grid">
      <div
        v-for="article in paginatedArticles"
        :key="article.id"
        class="article-card"
        :style="{ backgroundColor: themeColorLille }"
        >
        <div class="article-image-container">
          <img
            :src="article.image"
            :alt="article.title"
            class="article-image"
            />
          <div class="image-overlay"></div>
        </div>
        
        <div class="article-content">
          <h2 class="article-title">{{ article.title }}</h2>
          <p class="article-excerpt">{{ article.excerpt }}</p>
          <p class="article-excerpt"> Author: {{ article.author }}</p>
          
          <button
            class="read-button"
            :style="{ backgroundColor: themeColorOrange, color: themeColorWhite }"
            @click="openArticle(article)"
            >
            <span>Read Case Study</span>
            <svg class="button-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Pagination Controls -->
  <div class="pagination-container">
    <div class="pagination-wrapper">
      <button
        class="pagination-button prev"
        :disabled="currentPage === 1"
        :style="{ 
                backgroundColor: currentPage === 1 ? 'transparent' : themeColor, 
                color: currentPage === 1 ? themeColor : themeColorWhite,
                borderColor: themeColor
                }"
        @click="currentPage--"
        >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="pagination-icon">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Previous
      </button>
      
      <div class="page-info">
        <span class="current-page">{{ currentPage }}</span>
        <span class="page-separator">of</span>
        <span class="total-pages">{{ totalPages }}</span>
      </div>
      
      <button
        class="pagination-button next"
        :disabled="currentPage === totalPages"
        :style="{ 
                backgroundColor: currentPage === totalPages ? 'transparent' : themeColor, 
                color: currentPage === totalPages ? themeColor : themeColorWhite,
                borderColor: themeColor
                }"
        @click="currentPage++"
        >
        Next
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="pagination-icon">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </div>
  
  <!-- Modal for Full Article -->
  <div
    v-if="selectedArticle"
    class="modal-overlay"
    @click="closeArticle"
    >
    <div
      class="modal-content"
      :style="{ backgroundColor: themeColorWhite, color: themeColor }"
      @click.stop
      >
      <div class="modal-header">
        <h2 class="modal-title">{{ selectedArticle.title }}</h2>
        <button
          class="modal-close"
          :style="{ backgroundColor: themeColorOrange, color: themeColorWhite }"
          @click="closeArticle"
          >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="close-icon">
            <path stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="modal-body">
        <img
          v-if="selectedArticle.image"
          :src="selectedArticle.image"
          :alt="selectedArticle.title"
          class="modal-image"
          />
        
<div class="modal-text">
  <div
    v-for="(section, idx) in selectedArticle.content"
    :key="idx"
    class="article-section"
  >
    <h3 v-if="section.sub_title" class="section-title">{{ section.sub_title }}</h3>
    <div class="section-text">
      <template v-for="line in section.sub_content.split('\n')">
        <p v-if="!line.trim().startsWith('•') && !line.match(/^\d+\./)">
          {{ line }}
        </p>
      </template>
    </div>
  </div>
</div>
<a 
  v-if="selectedArticle.callToActionLink" 
  :href="selectedArticle.callToActionLink" 
  target="_blank" 
  rel="noopener noreferrer"
  class="cta-button"
>
  {{ selectedArticle.callToActionText }}
  <svg class="cta-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
  </svg>
</a>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.case-studies-page {
    min-height: 100vh;
}

/* Hero Section */
.hero-section {
    padding: 8rem 2rem 3rem;
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
}

.hero-content {
    max-width: 600px;
    margin: 0 auto;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 650;
    line-height: 1.2;
}

.hero-subtitle {
    font-size: 1.25rem;
    line-height: 1.6;
    opacity: 0.8;
    font-weight: 400;
}

/* Articles Container */
.articles-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem 2rem;
}

.articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

/* Article Cards */
.article-card {
    border-radius: 1.5rem;
    overflow: hidden;
    border: 2px solid transparent;
    position: relative;
    transition: all 0.3s ease;
}

.article-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Image inside card */
.article-image-container {
    position: relative;
    display: grid;
    place-items: center;
    height: 240px;
    background: #f4f4f4; /* neutral background if letterboxed */
    overflow: hidden;
}

.article-image {
    width: 100%;
    height: 100%;
    object-fit: contain; /* show full image without cropping */
    object-position: center;
}

/* overlay effect */
.image-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.article-card:hover .image-overlay {
    opacity: 1;
}

/* Article Content */
.article-content {
    padding: 2rem;
}

.article-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.3;
}

.article-excerpt {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    opacity: 0.8;
}

/* Read Button */
.read-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    border-radius: 0.75rem;
    font-weight: 600;
    font-size: 0.95rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
}

.read-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.button-arrow {
    width: 1.25rem;
    height: 1.25rem;
    transition: transform 0.2s ease;
}

.read-button:hover .button-arrow {
    transform: translateX(2px);
}

/* Pagination */
.pagination-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem 4rem;
}

.pagination-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
}

.pagination-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border-radius: 0.75rem;
    font-weight: 600;
    border: 2px solid;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.95rem;
}

.pagination-button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.pagination-button:not(:disabled):hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.pagination-icon {
    width: 1rem;
    height: 1rem;
}

.page-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    font-size: 1.1rem;
}

.current-page {
    font-size: 1.25rem;
    font-weight: 700;
}

.page-separator {
    opacity: 0.6;
}

.total-pages {
    opacity: 0.8;
}

/* Modal */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    z-index: 50;
    align-items: flex-start; /* push modal to top */
    padding: 4rem 1rem 1rem; /* top padding creates the "lowered" effect */
}

.modal-content {
    width: 100%;
    max-width: 900px;
    max-height: 90vh;
    border-radius: 1.5rem;
    overflow: hidden;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    animation: modalEnter 0.3s ease-out;
    display: flex;
    flex-direction: column;
}

@keyframes modalEnter {
    from {
        opacity: 0;
        transform: scale(0.95) translateY(20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 2rem 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.modal-title {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0;
    line-height: 1.3;
}

.modal-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
}

.modal-close:hover {
    transform: scale(1.05);
}

.close-icon {
    width: 1.25rem;
    height: 1.25rem;
}

.modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 1rem 2rem 2rem;
    display: grid;
    place-items: center;
}

.modal-image {
    width: 100%;
    height: 50vh;
    object-fit: contain; /* no crop */
    object-position: center;
    border-radius: 1rem;
    margin-bottom: 2rem;
}

.modal-text {
    font-size: 1.1rem;
    line-height: 1.7;
    width: 100%;
}

.modal-text ul {
  padding-left: 1.5rem;
  margin: 0.5rem 0 1rem;
  list-style-type: disc;
}

.modal-text li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2.5rem;
    }
    .hero-subtitle {
        font-size: 1.1rem;
    }
    .articles-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    .article-content {
        padding: 1.5rem;
    }
    .pagination-wrapper {
        flex-direction: column;
    gap: 1rem;
  }
  .modal-header {
    padding: 1.5rem 1.5rem 1rem;
  }
  .modal-body {
    padding: 1rem 1.5rem 1.5rem;
  }
  .modal-title {
    font-size: 1.5rem;
  }
}
/* Call To Action Button */
.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  background-color: v-bind(themeColorOrange);
  color: v-bind(themeColor) ;
  border-radius: 0.75rem;
  transition: all 0.25s ease;
  box-shadow: 0 6px 15px rgba(255, 107, 45, 0.35);
}

.cta-button:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 12px 24px rgba(255, 107, 45, 0.45);
}

.cta-arrow {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.25s ease;
}

.cta-button:hover .cta-arrow {
  transform: translateX(4px);
}

</style>
