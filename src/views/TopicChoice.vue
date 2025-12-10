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
</script>

<template>
  <div class="choice-container">
    <button class="home-btn" @click="goHome">🏠 Home</button>
    
    <div class="header">
      <h1>{{ topicTitle }}</h1>
      <p class="subtitle">Choose your mode</p>
    </div>

    <div class="choices-grid">
      <div class="choice-card" @click="goToReading">
        <h2 class="choice-title">Reading</h2>
      </div>
      <div class="choice-card" @click="goToShowMe">
        <h2 class="choice-title">Show Me</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.choice-container {
  min-height: 100vh;
  padding: 3rem;
}

.home-btn {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.home-btn:hover {
  background: #e0e0e0;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
}

.header h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
}

.choices-grid {
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.choice-card {
  background: white;
  border-radius: 12px;
  padding: 3rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.choice-card:hover {
  transform: translateY(-0.5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.choice-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}
</style>
