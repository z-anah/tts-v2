<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTopicById } from '@/data/topics.js';

const route = useRoute();
const router = useRouter();

const topicId = route.params.id;
const topic = computed(() => getTopicById(topicId));
const topicTitle = computed(() => topic.value?.title || 'Unknown Topic');

function goHome() {
  router.push('/');
}

function goToReading() {
  router.push(`/topic/${topicId}/reading`);
}

function goToShowMe() {
  router.push(`/topic/${topicId}/showme`);
}

function goToGrid() {
  router.push(`/topic/${topicId}/grid`);
}

function goToPictureQuiz() {
  router.push(`/topic/${topicId}/picturequiz`);
}

// Category color logic (reuse from Home)
const categoryColors = {
  'Ism': { bg: '#e3f2fd', accent: '#1976d2', text: '#0d47a1' },
  'Fiil': { bg: '#fff3e0', accent: '#f57c00', text: '#e65100' },
  'Harf': { bg: '#f3e5f5', accent: '#9c27b0', text: '#6a1b9a' },
  'Arqam': { bg: '#e8f5e9', accent: '#43a047', text: '#1b5e20' },
  'Other': { bg: '#f5f5f5', accent: '#757575', text: '#424242' },
  'Home': { bg: '#eeeeee', accent: '#9e9e9e', text: '#616161' }
};
function getCategoryColor(category) {
  return categoryColors[category] || categoryColors['Other'];
}
const topicCategory = computed(() => topic.value?.category || 'Other');
const color = computed(() => getCategoryColor(topicCategory.value));
</script>

<template>
  <div class="choice-container" :style="{ background: color.bg }">
    <div class="header">
      <h1 :style="{ color: color.text }">{{ topicTitle }}</h1>
      <p class="subtitle">Choose your mode</p>
    </div>
    <div class="choices-wrapper">
      <div class="choice-card" @click="goToReading" :style="{ borderLeft: `4px solid ${color.accent}` }">
        <div class="card-content">
          <span class="topic-indicator" :style="{ background: color.accent }"></span>
          <h2 class="choice-title">Reading</h2>
        </div>
        <span class="arrow">→</span>
      </div>
      <div class="choice-card" @click="goToShowMe" :style="{ borderLeft: `4px solid ${color.accent}` }">
        <div class="card-content">
          <span class="topic-indicator" :style="{ background: color.accent }"></span>
          <h2 class="choice-title">Show Me</h2>
        </div>
        <span class="arrow">→</span>
      </div>
      <div class="choice-card" @click="goToGrid" :style="{ borderLeft: `4px solid ${color.accent}` }">
        <div class="card-content">
          <span class="topic-indicator" :style="{ background: color.accent }"></span>
          <h2 class="choice-title">Grid View</h2>
        </div>
        <span class="arrow">→</span>
      </div>
      <div class="choice-card" @click="goToPictureQuiz" :style="{ borderLeft: `4px solid ${color.accent}` }">
        <div class="card-content">
          <span class="topic-indicator" :style="{ background: color.accent }"></span>
          <h2 class="choice-title">Picture Quiz</h2>
        </div>
        <span class="arrow">→</span>
      </div>
      <div
        class="choice-card"
        @click="goHome"
        :style="{ borderLeft: `4px solid ${categoryColors['Home'].accent}` }"
      >
        <div class="card-content">
          <span class="topic-indicator" :style="{ background: categoryColors['Home'].accent }"></span>
          <h2 class="choice-title" :style="{ color: categoryColors['Home'].text }">Home</h2>
        </div>
        <span class="arrow" :style="{ color: categoryColors['Home'].accent }">→</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.choice-container {
  min-height: 100vh;
  padding: 2rem;
  background: #f8f9fa;
  position: relative;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.1rem;
  color: #666;
}

.choices-wrapper {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.choice-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  border-radius: 10px;
  padding: 1.25rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #eee;
  font-size: 1.1rem;
  font-weight: 600;
}

.choice-card:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #bbb;
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

.choice-title {
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  margin: 0;
}

.arrow {
  color: #999;
  font-size: 1.1rem;
  transition: transform 0.2s ease;
}

.choice-card:hover .arrow {
  transform: translateX(4px);
  color: #666;
}

@media (max-width: 768px) {
  .choice-container {
    padding: 1rem;
  }

  .header h1 {
    font-size: 1.75rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .choices-wrapper {
    gap: 0.75rem;
    max-width: 100%;
  }

  .choice-card {
    padding: 0.875rem 1rem;
  }

  .choice-title {
    font-size: 0.95rem;
  }
}
</style>
