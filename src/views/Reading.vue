<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTopicById } from '@/data/topics.js';

const route = useRoute();
const router = useRouter();
const topicId = route.params.id;

const topic = computed(() => getTopicById(topicId));
const words = computed(() => topic.value?.words || []);

const currentIndex = ref(0);
const clickCount = ref(0);
const clickTimer = ref(null);
const isSpeaking = ref(false);
const voicesLoaded = ref(false);

// Preload voices
function loadVoices() {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      voicesLoaded.value = true;
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        voicesLoaded.value = true;
        resolve(window.speechSynthesis.getVoices());
      };
    }
  });
}

function speakWord(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.8;
    
    // Try to find an Arabic voice
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang.startsWith('ar'));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }
    
    utterance.onstart = () => { isSpeaking.value = true; };
    utterance.onend = () => { isSpeaking.value = false; };
    
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Text-to-speech not supported in this browser');
  }
}

function handleImageClick() {
  clickCount.value++;
  
  if (clickTimer.value) {
    clearTimeout(clickTimer.value);
  }
  
  clickTimer.value = setTimeout(() => {
    if (clickCount.value >= 2) {
      // Double click - repeat current word
      speakWord(words.value[currentIndex.value].arabic);
    } else {
      // Single click - go to next word
      goToNext();
    }
    clickCount.value = 0;
  }, 300);
}

function goToNext() {
  if (currentIndex.value < words.value.length - 1) {
    currentIndex.value++;
    speakWord(words.value[currentIndex.value].arabic);
  } else {
    // Finished all words
    alert('Great job! You completed all words!');
    router.push(`/topic/${topicId}`);
  }
}

function goHome() {
  router.push('/');
}

function goBack() {
  router.push(`/topic/${topicId}`);
}

onMounted(async () => {
  if ('speechSynthesis' in window) {
    // Preload voices first
    await loadVoices();
    
    // Speak first word once voices are ready
    if (words.value.length > 0) {
      speakWord(words.value[currentIndex.value].arabic);
    }
  }
});
</script>

<template>
  <div class="reading-container">
    <div class="nav-buttons">
      <button class="back-btn" @click="goBack">← Back</button>
      <button class="home-btn" @click="goHome">🏠 Home</button>
    </div>
    
    <div class="progress">
      <span>{{ currentIndex + 1 }} / {{ words.length }}</span>
    </div>

    <div class="word-card" @click="handleImageClick">
      <div class="word-image" :class="{ speaking: isSpeaking }">
        {{ words[currentIndex].image }}
      </div>
      <div class="word-text">
        <p class="arabic">{{ words[currentIndex].arabic }}</p>
      </div>
    </div>

    <div class="instructions">
      <p>🔊 Listen to the word</p>
      <p>👆 Click once to continue</p>
      <p>👆👆 Double-click to repeat</p>
    </div>
  </div>
</template>

<style scoped>
.reading-container {
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-buttons {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.5rem;
}

.back-btn {
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.back-btn:hover {
  background: #e0e0e0;
}

.home-btn {
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

.progress {
  margin-bottom: 2rem;
  font-size: 1.25rem;
  color: #666;
}

.word-card {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.word-card:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.word-card:active {
  transform: scale(0.98);
}

.word-image {
  font-size: 8rem;
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}

.word-image.speaking {
  animation: pulse 0.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.word-text {
  margin-top: 1rem;
}

.arabic {
  font-size: 3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  direction: rtl;
}

.instructions {
  margin-top: 3rem;
  text-align: center;
  color: #888;
}

.instructions p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
}
</style>
