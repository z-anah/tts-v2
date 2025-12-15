<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTopicById } from '@/data/topics.js';

const route = useRoute();
const router = useRouter();
const topicId = route.params.id;

const topic = computed(() => getTopicById(topicId));
const words = computed(() => topic.value?.words || []);

function speakWord(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.8;
    
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang.startsWith('ar'));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  }
}

function goBack() {
  router.push(`/topic/${topicId}`);
}

function goHome() {
  router.push('/');
}
</script>

<template>
  <div class="grid-container">
    <div class="nav-buttons">
      <button class="back-btn" @click="goBack">← Back</button>
      <button class="home-btn" @click="goHome">🏠 Home</button>
    </div>
    
    <h1 class="title">{{ topic?.title }}</h1>
    
    <div class="words-grid">
      <div 
        v-for="(word, index) in words" 
        :key="index"
        class="word-item"
        @click="speakWord(word.arabic)"
      >
        <div class="word-visual">
          <img
            v-if="word.image"
            :src="word.image"
            :alt="word.arabic"
            class="img-image"
          />
          <span
            v-else-if="word.emoji"
            class="img-emoji"
          >{{ word.emoji }}</span>
          <span
            v-else-if="word.text"
            class="img-text"
          >{{ word.text }}</span>
        </div>
        <p class="word-arabic">{{ word.arabic }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  min-height: 100vh;
  padding: 2rem;
  padding-top: 5rem;
}

.nav-buttons {
  position: fixed;
  top: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.back-btn,
.home-btn {
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.back-btn:hover,
.home-btn:hover {
  background: #e0e0e0;
}

.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

.words-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.word-item {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.word-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.word-item:active {
  transform: translateY(-2px);
}

.word-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  min-height: 6rem;
}

.img-emoji {
  font-size: 5rem;
  display: block;
}

.img-text {
  font-size: 1rem;
  color: #888;
  display: block;
  word-break: break-word;
  text-align: center;
  padding: 0.5rem;
}

.img-image {
  width: 6rem;
  height: 6rem;
  border-radius: 12px;
  object-fit: cover;
}

.word-arabic {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  direction: rtl;
}

@media (max-width: 768px) {
  .grid-container {
    padding: 1rem;
    padding-top: 4rem;
  }

  .nav-buttons {
    flex-direction: column;
    gap: 0.25rem;
  }

  .back-btn,
  .home-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  .title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .words-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  .word-visual {
    min-height: 4rem;
  }
  
  .img-emoji {
    font-size: 3.5rem;
  }
  
  .img-image {
    width: 4rem;
    height: 4rem;
  }
  
  .word-arabic {
    font-size: 1.2rem;
  }
}
</style>
