<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getAllTopics } from '@/data/topics.js';

const router = useRouter();

const pages = ref(getAllTopics());

// Track which categories are open
const openCategories = ref({});

function toggleCategory(category) {
  openCategories.value[category] = !openCategories.value[category];
}

function isCategoryOpen(category) {
  return openCategories.value[category] || false;
}

function navigateToPage(path) {
  router.push(path);
}

function goToQuestions() {
  router.push('/questions');
}

// Group topics by category
const groupedPages = computed(() => {
  const groups = {};
  pages.value.forEach(page => {
    const cat = page.category || 'Other';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(page);
  });
  return groups;
});

// Category colors
const categoryColors = {
  'Ism': { bg: '#e3f2fd', accent: '#1976d2', text: '#0d47a1' },
  'Fiil': { bg: '#fff3e0', accent: '#f57c00', text: '#e65100' },
  'Harf': { bg: '#f3e5f5', accent: '#9c27b0', text: '#6a1b9a' },
  'Arqam': { bg: '#e8f5e9', accent: '#43a047', text: '#1b5e20' },
  'Other': { bg: '#f5f5f5', accent: '#757575', text: '#424242' },
};

function getCategoryColor(category) {
  return categoryColors[category] || categoryColors['Other'];
}
</script>

<template>
  <div class="home-container">
    <div class="header">
      <h1>Arabic</h1>
      <p class="subtitle">Choose the topic</p>
    </div>

    <div class="categories-wrapper">
      <!-- Questions as a pseudo-category -->
      <div class="category-section">
        <div
          class="category-header"
          :style="{
            background: categoryColors['Other'].bg,
            borderLeft: `4px solid ${categoryColors['Other'].accent}`
          }"
          @click="goToQuestions"
        >
          <div class="category-info">
            <span
              class="category-badge"
              :style="{ background: categoryColors['Other'].accent }"
            >?</span>
            <h3
              class="category-name"
              :style="{ color: categoryColors['Other'].text }"
            >Questions</h3>
          </div>
          <span class="chevron" :style="{ color: categoryColors['Other'].accent }">▶</span>
        </div>
      </div>

      <div 
        v-for="(topicList, category) in groupedPages" 
        :key="category" 
        class="category-section"
      >
        <div 
          class="category-header"
          :style="{ 
            background: getCategoryColor(category).bg,
            borderLeft: `4px solid ${getCategoryColor(category).accent}`
          }"
          @click="toggleCategory(category)"
        >
          <div class="category-info">
            <span 
              class="category-badge"
              :style="{ background: getCategoryColor(category).accent }"
            >
              {{ topicList.length }}
            </span>
            <h3 
              class="category-name"
              :style="{ color: getCategoryColor(category).text }"
            >
              {{ category }}
            </h3>
          </div>
          <span 
            class="chevron"
            :class="{ 'chevron-open': isCategoryOpen(category) }"
            :style="{ color: getCategoryColor(category).accent }"
          >
            ▶
          </span>
        </div>

        <transition name="slide">
          <div v-if="isCategoryOpen(category)" class="pages-grid">
            <div
              v-for="page in topicList"
              :key="page.id"
              class="page-card"
              @click="navigateToPage(page.path)"
            >
              <div class="card-content">
                <span 
                  class="topic-indicator"
                  :style="{ background: getCategoryColor(category).accent }"
                ></span>
                <h2 class="page-title">{{ page.title }}</h2>
              </div>
              <span class="arrow">→</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  padding: 2rem;
  background: #f8f9fa;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1a1a2e;
}

.subtitle {
  font-size: 1.1rem;
  color: #666;
}

.questions-btn-homogen {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-radius: 10px;
  padding: 1rem 1.25rem;
  margin: 0 auto 2rem auto;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #eee;
  font-size: 1.1rem;
  font-weight: 600;
  min-width: 220px;
  max-width: 350px;
}

.questions-btn-homogen:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #43A047;
}

.questions-btn-homogen .arrow {
  color: #999;
  font-size: 1.1rem;
  transition: transform 0.2s ease;
}

.questions-btn-homogen:hover .arrow {
  transform: translateX(4px);
  color: #43A047;
}

.categories-wrapper {
  max-width: 900px;
  margin: 0 auto;
}

.category-section {
  margin-bottom: 1rem;
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-header:hover {
  filter: brightness(0.97);
}

.category-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.category-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
}

.category-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.chevron {
  font-size: 0.9rem;
  transition: transform 0.3s ease;
}

.chevron-open {
  transform: rotate(90deg);
}

.pages-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem 0 0 0;
}

.page-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-radius: 10px;
  padding: 1rem 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #eee;
}

.page-card:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #ddd;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.topic-indicator {
  width: 4px;
  height: 24px;
  border-radius: 2px;
}

.page-title {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.arrow {
  color: #999;
  font-size: 1.1rem;
  transition: transform 0.2s ease;
}

.page-card:hover .arrow {
  transform: translateX(4px);
  color: #666;
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  max-height: 1000px;
}

@media (max-width: 768px) {
  .home-container {
    padding: 1rem;
  }

  .header h1 {
    font-size: 1.75rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .questions-btn {
    padding: 0.875rem 2rem;
    font-size: 1.1rem;
  }

  .category-header {
    padding: 0.875rem 1rem;
  }

  .category-name {
    font-size: 1.1rem;
  }

  .page-card {
    padding: 0.875rem 1rem;
  }

  .page-title {
    font-size: 0.95rem;
  }
}
</style>
