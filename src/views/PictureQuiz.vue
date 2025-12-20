<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTopicById } from '@/data/topics.js';

const route = useRoute();
const router = useRouter();
const topicId = route.params.id;

const topic = computed(() => getTopicById(topicId));
const allWords = computed(() => topic.value?.words || []);

const shuffledWords = ref([]);
const currentIndex = ref(0);
const clickState = ref('show'); // 'show' -> 'speak' -> 'next'
const isSpeaking = ref(false);

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

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
    
    utterance.onstart = () => { isSpeaking.value = true; };
    utterance.onend = () => { isSpeaking.value = false; };
    
    window.speechSynthesis.speak(utterance);
  }
}

function handleClick() {
  if (clickState.value === 'show') {
    // First click: play the voice
    speakWord(shuffledWords.value[currentIndex.value].arabic);
    clickState.value = 'speak';
  } else if (clickState.value === 'speak') {
    // Second click: go to next picture
    if (currentIndex.value < shuffledWords.value.length - 1) {
      currentIndex.value++;
      clickState.value = 'show';
    } else {
      // Finished all words
      alert('Great job! You completed all words!');
      router.push(`/topic/${topicId}`);
    }
  }
}

function goBack() {
  router.push(`/topic/${topicId}`);
}

function goHome() {
  router.push('/');
}

onMounted(() => {
  if (allWords.value.length > 0) {
    shuffledWords.value = shuffleArray(allWords.value);
  }
});
</script>

<template>
  <div class="picture-quiz-container">
    <div class="nav-buttons">
      <button class="back-btn" @click="goBack">← Back</button>
      <button class="home-btn" @click="goHome">🏠 Home</button>
    </div>

    <div class="progress">
      <span>{{ currentIndex + 1 }} / {{ shuffledWords.length }}</span>
      <span class="instruction">{{ clickState === 'show' ? '👆 Click to hear' : '👆 Click for next' }}</span>
    </div>

    <div class="picture-card" @click="handleClick" :class="{ speaking: isSpeaking }">
      <div class="picture-visual">
        <img
          v-if="shuffledWords[currentIndex]?.image"
          :src="shuffledWords[currentIndex].image"
          :alt="shuffledWords[currentIndex].arabic"
          class="img-image"
        />
        <span
          v-else-if="shuffledWords[currentIndex]?.emoji"
          class="img-emoji"
        >{{ shuffledWords[currentIndex].emoji }}</span>
        <span
          v-else-if="shuffledWords[currentIndex]?.text"
          class="img-text"
        >{{ shuffledWords[currentIndex].text }}</span>
      </div>
      <div v-if="clickState === 'speak'" class="arabic-floating">
        {{ shuffledWords[currentIndex]?.arabic }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.picture-quiz-container {
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

.progress {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  font-size: 1.25rem;
  color: #666;
}

.instruction {
  font-size: 0.9rem;
  color: #2196F3;
  font-weight: 500;
}

.picture-card {
  background: white;
  border-radius: 24px;
  padding: 4rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  max-width: 500px;
  width: 100%;
  position: relative;
}

.picture-card:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.picture-card:active {
  transform: scale(0.98);
}

.picture-card.speaking {
  animation: speakPulse 0.5s ease-in-out infinite;
}

@keyframes speakPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.picture-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.arabic-floating {
  position: absolute;
  left: 50%;
  top: 1500;
  transform: translate(-50%, 0);
  background: rgba(255,255,255,0.95);
  border-radius: 1rem;
  padding: 1rem 2rem;
  font-size: 2.5rem;
  font-weight: 600;
  color: #333;
  direction: rtl;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  z-index: 20;
  pointer-events: none;
}

.arabic-text {
  font-size: 2.5rem;
  font-weight: 600;
  color: #333;
  margin-top: 2rem;
  direction: rtl;
  text-align: center;
}

.img-emoji {
  font-size: 12rem;
  display: block;
}

.img-text {
  font-size: 2rem;
  color: #888;
  display: block;
  word-break: break-word;
  text-align: center;
  padding: 1rem;
}

.img-image {
  width: 300px;
  height: 300px;
  border-radius: 16px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .picture-quiz-container {
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

  .progress {
    font-size: 1rem;
    top: 0.5rem;
    right: 0.5rem;
  }

  .instruction {
    font-size: 0.8rem;
  }

  .picture-card {
    padding: 2rem;
    max-width: 100%;
  }

  .picture-visual {
    min-height: 200px;
  }

  .arabic-text {
    font-size: 1.8rem;
    margin-top: 1.5rem;
  }

  .img-emoji {
    font-size: 8rem;
  }

  .img-text {
    font-size: 1.5rem;
  }

  .img-image {
    width: 200px;
    height: 200px;
  }

  .arabic-floating {
    font-size: 1.8rem;
    padding: 0.7rem 1.2rem;
    top: 65%;
  }
}
</style>
