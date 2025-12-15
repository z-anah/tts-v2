<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAllTopics } from '@/data/topics.js';

const router = useRouter();

const pages = ref(getAllTopics());

function navigateToPage(path) {
  router.push(path);
}

function goToQuestions() {
  router.push('/questions');
}


</script>

<template>
  <div class="home-container">
    <div class="header">
      <h1>Arabic</h1>
      <p class="subtitle">Choose the topic</p>
    </div>

    <button class="questions-btn" @click="goToQuestions">
      📝 Questions
    </button>

    <div class="pages-grid">
      <div
        v-for="page in pages"
        :key="page.id"
        class="page-card"
        @click="navigateToPage(page.path)"
      >
        <h2 class="page-title">{{ page.title }}</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  padding: 3rem;
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

.pages-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.page-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.page-card:hover {
  transform: translateY(-0.5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.page-title {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}

.questions-btn {
  display: block;
  margin: 0 auto 2rem auto;
  padding: 1.5rem 3rem;
  font-size: 1.5rem;
  font-weight: 600;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.questions-btn:hover {
  background: #43A047;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(76, 175, 80, 0.4);
}

@media (max-width: 768px) {
  .home-container {
    padding: 1.5rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .questions-btn {
    padding: 1rem 2rem;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }

  .pages-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .page-card {
    padding: 1.5rem;
  }

  .page-title {
    font-size: 1.25rem;
  }
}
</style>
