<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTopicById } from '@/data/topics.js';

const route = useRoute();
const router = useRouter();
const topicId = route.params.id;

const topic = computed(() => getTopicById(topicId));
const allWords = computed(() => topic.value?.words || []);

const displayedWords = ref([]);
const targetWord = ref(null);
const score = ref(0);
const rounds = ref(0);
const maxRounds = 10;
const selectedId = ref(null);
const isCorrect = ref(null);
const isSpeaking = ref(false);
const canClick = ref(true);

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function setupRound() {
  selectedId.value = null;
  isCorrect.value = null;
  canClick.value = true;
  
  // Pick 4 random words to display
  const shuffled = shuffleArray(allWords.value);
  displayedWords.value = shuffled.slice(0, Math.min(4, shuffled.length));
  
  // Pick one as the target (can be any of the displayed)
  const randomIndex = Math.floor(Math.random() * displayedWords.value.length);
  targetWord.value = displayedWords.value[randomIndex];
  
  // Speak the target word after a short delay
  setTimeout(() => {
    speakWord(targetWord.value.arabic);
  }, 500);
}

function speakWord(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.8;
    
    utterance.onstart = () => { isSpeaking.value = true; };
    utterance.onend = () => { isSpeaking.value = false; };
    
    window.speechSynthesis.speak(utterance);
  }
}

function repeatWord() {
  if (targetWord.value) {
    speakWord(targetWord.value.arabic);
  }
}

function handleChoice(word) {
  if (!canClick.value) return;
  
  canClick.value = false;
  selectedId.value = word.id;
  rounds.value++;
  
  if (word.id === targetWord.value.id) {
    isCorrect.value = true;
    score.value++;
  } else {
    isCorrect.value = false;
  }
  
  // Move to next round after delay
  setTimeout(() => {
    if (rounds.value >= maxRounds) {
      alert(`Game Over! Your score: ${score.value}/${maxRounds}`);
      router.push(`/topic/${topicId}`);
    } else {
      setupRound();
    }
  }, 1500);
}

function goHome() {
  router.push('/');
}

function goBack() {
  router.push(`/topic/${topicId}`);
}

onMounted(() => {
  if (allWords.value.length > 0) {
    setupRound();
  }
});
</script>

<template>
  <div class="showme-container">
    <div class="nav-buttons">
      <button class="back-btn" @click="goBack">← Back</button>
      <button class="home-btn" @click="goHome">🏠 Home</button>
    </div>
    
    <div class="header">
      <div class="score">Score: {{ score }}/{{ rounds }}</div>
      <div class="round">Round {{ rounds + 1 }}/{{ maxRounds }}</div>
    </div>

    <button class="repeat-btn" @click="repeatWord" :class="{ speaking: isSpeaking }">
      🔊 Repeat Word
    </button>

    <div class="images-grid">
      <div
        v-for="word in displayedWords"
        :key="word.id"
        class="image-card"
        :class="{
          correct: selectedId === word.id && isCorrect,
          wrong: selectedId === word.id && isCorrect === false,
          reveal: selectedId && word.id === targetWord.id && !isCorrect
        }"
        @click="handleChoice(word)"
      >
        <span class="emoji">{{ word.image }}</span>
      </div>
    </div>

    <div class="instructions">
      <p>🔊 Listen to the word</p>
      <p>👆 Click the matching image</p>
    </div>
  </div>
</template>

<style scoped>
.showme-container {
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

.header {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.score {
  color: #4CAF50;
  font-weight: 600;
}

.round {
  color: #666;
}

.repeat-btn {
  padding: 1rem 2rem;
  font-size: 1.25rem;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.repeat-btn:hover {
  background: #1976D2;
}

.repeat-btn.speaking {
  animation: pulse 0.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 500px;
  width: 100%;
}

.image-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  border: 4px solid transparent;
}

.image-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.image-card.correct {
  border-color: #4CAF50;
  background: #E8F5E9;
}

.image-card.wrong {
  border-color: #f44336;
  background: #FFEBEE;
}

.image-card.reveal {
  border-color: #4CAF50;
  background: #E8F5E9;
}

.emoji {
  font-size: 5rem;
  display: block;
}

.instructions {
  margin-top: 2rem;
  text-align: center;
  color: #888;
}

.instructions p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
}
</style>
