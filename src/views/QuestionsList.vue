<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAllQuestionSets } from '@/data/questions.js';

const router = useRouter();
const questionSets = ref(getAllQuestionSets());

function goHome() {
  router.push('/');
}

function goToSet(path) {
  router.push(path);
}
</script>

<template>
  <div class="questions-list-container">
    <button class="home-btn" @click="goHome">🏠 Home</button>

    <div class="header">
      <h1>📝 Questions</h1>
      <p class="subtitle">Choose a question set</p>
    </div>

    <div class="sets-grid">
      <div
        v-for="set in questionSets"
        :key="set.id"
        class="set-card"
        @click="goToSet(set.path)"
      >
        <h2 class="set-title">{{ set.title }}</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.questions-list-container {
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
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.25rem;
  color: #666;
}

.sets-grid {
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.set-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.set-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.set-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

@media (max-width: 768px) {
  .questions-list-container {
    padding: 1.5rem;
  }

  .home-btn {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .sets-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .set-card {
    padding: 1.5rem;
  }

  .set-title {
    font-size: 1.1rem;
  }
}
</style>
