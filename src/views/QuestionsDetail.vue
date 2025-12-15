<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getQuestionSetById } from '@/data/questions.js';

const route = useRoute();
const router = useRouter();
const setId = route.params.id;

const questionSet = computed(() => getQuestionSetById(setId));
const items = computed(() => questionSet.value?.items || []);
const title = computed(() => questionSet.value?.title || 'Questions');

const speakingId = ref(null);

function speakArabic(text, id) {
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
    
    utterance.onstart = () => { speakingId.value = id; };
    utterance.onend = () => { speakingId.value = null; };
    
    window.speechSynthesis.speak(utterance);
  }
}

function goHome() {
  router.push('/');
}

function goBack() {
  router.push('/questions');
}
</script>

<template>
  <div class="questions-detail-container">
    <div class="nav-buttons">
      <button class="back-btn" @click="goBack">← Back</button>
      <button class="home-btn" @click="goHome">🏠 Home</button>
    </div>

    <div class="header">
      <h1>{{ title }}</h1>
    </div>

    <div class="items-list">
      <div v-for="(item, index) in items" :key="index" class="item-card">
        <div class="item-content">
          <p class="arabic-text">{{ item.ar }}</p>
          <p class="english-text">{{ item.eng }}</p>
        </div>
        <button 
          class="tts-btn" 
          :class="{ speaking: speakingId === index }"
          @click="speakArabic(item.ar, index)"
        >
          🔊
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.questions-detail-container {
  min-height: 100vh;
  padding: 2rem;
}

.nav-buttons {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.5rem;
}

.back-btn,
.home-btn {
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.back-btn:hover,
.home-btn:hover {
  background: #e0e0e0;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  padding-top: 2rem;
}

.header h1 {
  font-size: 2rem;
  font-weight: 700;
}

.items-list {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.item-content {
  flex: 1;
}

.arabic-text {
  font-size: 3rem;
  font-weight: 300;
  color: #333;
  direction: rtl;
  margin-bottom: 0.5rem;
  text-align: right;
}

.english-text {
  font-size: 1rem;
  color: #888;
  text-align: left;
}

.tts-btn {
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.tts-btn:hover {
  background: #1976D2;
  transform: scale(1.05);
}

.tts-btn.speaking {
  animation: pulse 0.5s ease-in-out infinite;
  background: #1565C0;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@media (max-width: 768px) {
  .questions-detail-container {
    padding: 1rem;
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

  .header {
    margin-bottom: 1.5rem;
    padding-top: 3rem;
  }

  .header h1 {
    font-size: 1.5rem;
  }

  .items-list {
    max-width: 100%;
  }

  .item-card {
    padding: 1rem;
    flex-direction: column;
    align-items: stretch;
  }

  .arabic-text {
    font-size: 2rem;
    text-align: center;
  }

  .english-text {
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: 0.75rem;
  }

  .tts-btn {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
    align-self: center;
  }
}
</style>
