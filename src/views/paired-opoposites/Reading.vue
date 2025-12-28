<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTopicById } from '@/data/topics.js';

const route = useRoute();
const router = useRouter();
const topicId = route.params.id;

const topic = computed(() => getTopicById(topicId));
const pairs = computed(() => topic.value?.words || []);

const currentIndex = ref(0);
const clickCount = ref(0);
const clickTimer = ref(null);
const isSpeaking = ref(false);
const voicesLoaded = ref(false);

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
  return new Promise((resolve) => {
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
      utterance.onstart = () => { isSpeaking.value = true; };
      utterance.onend = () => { isSpeaking.value = false; resolve(); };
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech not supported in this browser');
      resolve();
    }
  });
}

async function speakPair(pair) {
  if (!pair) return;
  await speakWord(pair.left.arabic);
  await speakWord(pair.right.arabic);
}

function handleImageClick() {
  clickCount.value++;
  if (clickTimer.value) clearTimeout(clickTimer.value);
  clickTimer.value = setTimeout(async () => {
    if (clickCount.value >= 2) {
      // Double click - repeat current pair
      await speakPair(pairs.value[currentIndex.value]);
    } else {
      // Single click - go to next pair
      goToNext();
    }
    clickCount.value = 0;
  }, 300);
}

async function goToNext() {
  if (currentIndex.value < pairs.value.length - 1) {
    currentIndex.value++;
    await speakPair(pairs.value[currentIndex.value]);
  } else {
    alert('Great job! You completed all pairs!');
    router.push(`/paired-opposites/topic/${topicId}`);
  }
}

function goHome() {
  router.push('/');
}

function goBack() {
  router.push(`/paired-opposites/topic/${topicId}`);
}

onMounted(async () => {
  if ('speechSynthesis' in window) {
    // Preload voices first
    await loadVoices();
    
    // Speak first word once voices are ready
    if (pairs.value.length > 0) {
      await speakPair(pairs.value[currentIndex.value]);
    }
  }
});
</script>

<template>
  <div class="reading-container">
    <div class="progress">
      <span>{{ currentIndex + 1 }} / {{ pairs.length }}</span>
    </div>

    <div class="word-card" @click="handleImageClick">
      <div class="word-image" :class="{ speaking: isSpeaking }">
        <img
          v-if="pairs[currentIndex].image"
          :src="pairs[currentIndex].image"
          alt="pair image"
          class="img-image"
        />
      </div>
      <div class="pair-row">
        <div class="pair-col">
          <p class="arabic">{{ pairs[currentIndex].left.arabic }}</p>
        </div>
        <div class="pair-col">
          <p class="arabic">{{ pairs[currentIndex].right.arabic }}</p>
        </div>
      </div>
    </div>

    <div class="nav-buttons">
      <button class="back-btn" @click="goBack">← Back</button>
      <button class="home-btn" @click="goHome">🏠 Home</button>
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

.progress {
  margin-bottom: 2rem;
  font-size: 1.25rem;
  color: #666;
}

/* Move word-card to the bottom */
.word-card {
  background: white;
  border-radius: 20px 20px 0 0;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  max-width: 500px;
  width: 100%;
  position: fixed;
  left: 50%;
  bottom: 3.5rem; /* leave space for nav-buttons */
  transform: translateX(-50%);
  z-index: 10;
  /* padding moved to mobile/desktop below */
}

.word-card:hover { transform: translateX(-50%) scale(1.02); box-shadow: 0 -12px 32px rgba(0,0,0,0.15);}
.word-card:active { transform: translateX(-50%) scale(0.98);}

.word-image {
  font-size: 8rem;
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20rem;
}

.img-image {
  width: 8rem;
  height: 8rem;
  border-radius: 12px;
  display: block;
  margin: 0 auto;
  object-fit: contain; 
}

.pair-row {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.pair-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.arabic {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  direction: rtl;
}

.label {
  font-size: 1rem;
  color: #888;
}

/* Nav buttons under card, fixed at bottom */
.nav-buttons {
  position: fixed;
  left: 50%;
  bottom: 0.75rem;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 20;
}

.back-btn, .home-btn {
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.back-btn:hover, .home-btn:hover {
  background: #e0e0e0;
}

@media (max-width: 768px) {
  .reading-container { padding: 1rem; }
  .progress { margin-bottom: 1.5rem; font-size: 1rem; }
  .word-card {
    padding: 1.5rem 0.5rem 1.5rem 0.5rem;
    max-width: 100vw;
    border-radius: 16px 16px 0 0;
    bottom: 3.5rem;
  }
  .word-image { font-size: 5rem; margin-bottom: 1.5rem; }
  .img-image { 
    width: 20rem; 
    height: 20rem; 
    object-fit: contain; 
  }
  .arabic { font-size: 1.5rem; }
  .pair-row { gap: 1rem; }
  .nav-buttons {
    flex-direction: column;
    gap: 0.25rem;
    left: 50%;
    bottom: 0.5rem;
    transform: translateX(-50%);
  }
  .back-btn, .home-btn { padding: 0.4rem 0.8rem; font-size: 0.9rem; }
}
</style>
