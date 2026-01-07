<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTopicById } from '@/data/topics.js';

const route = useRoute();
const router = useRouter();
const topicId = route.params.id;

const topic = computed(() => getTopicById(topicId));
const allPairs = computed(() => topic.value?.words || []);

const remainingPairs = ref([]);
const targetPair = ref(null);
const score = ref(0);
const rounds = ref(0);
const selectedId = ref(null);
const isCorrect = ref(null);
const isSpeaking = ref(false);
const canClick = ref(true);
const preparedUtterance = ref(null);
const greyFinished = ref(true);

// Arabic expressions for correct answers
const correctExpressions = [
  'أحسنت',
  'ممتاز',
  'رائع',
  'صحيح',
  'برافو',
  'عظيم',
];

// Arabic expressions for incorrect answers
const incorrectExpressions = [
  'حاول مرة أخرى',
  'لا بأس',
  'يمكنك ذلك',
  'استمر',
];

function getRandomExpression(expressions) {
  return expressions[Math.floor(Math.random() * expressions.length)];
}

function speakExpression(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  }
}

function setupGame() {
  remainingPairs.value = [...allPairs.value];
  score.value = 0;
  rounds.value = 0;
  setupRound();
}

async function speakWord(text) {
  return new Promise((resolve) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.8;
      utterance.onstart = () => { isSpeaking.value = true; };
      utterance.onend = () => { isSpeaking.value = false; resolve(); };
      window.speechSynthesis.speak(utterance);
    } else {
      resolve();
    }
  });
}

async function speakPair(pair) {
  if (!pair) return;
  await speakWord(pair.left.arabic +"."+ pair.right.arabic);
}

function setupRound() {
  selectedId.value = null;
  isCorrect.value = null;
  canClick.value = true;

  if (remainingPairs.value.length === 0) {
    setTimeout(() => {
      alert(`Game Over! Your score: ${score.value}/${rounds.value}`);
      router.push(`/paired-opposites/topic/${topicId}`);
    }, 100);
    return;
  }

  // Randomly pick the next pair to ask
  const idx = Math.floor(Math.random() * remainingPairs.value.length);
  targetPair.value = remainingPairs.value[idx];

  // Play both words in the pair
  speakPair(targetPair.value);
}

function repeatPair() {
  if (targetPair.value) {
    speakPair(targetPair.value);
  }
}

function handleChoice(pair, index) {
  if (!canClick.value) return;

  canClick.value = false;
  selectedId.value = index;
  rounds.value++;

  // Check if selected pair matches target pair by image
  if (pair.image === targetPair.value.image && pair.image != null) {
    isCorrect.value = true;
    score.value++;
    // Remove the pair from remaining
    const idx = remainingPairs.value.findIndex(p => p.image === targetPair.value.image);
    if (idx !== -1) remainingPairs.value.splice(idx, 1);
    // Speak encouraging expression
    // setTimeout(() => {
    //   speakExpression(getRandomExpression(correctExpressions));
    // }, 300);
  } else {
    isCorrect.value = false;
    // Speak supportive expression
    // setTimeout(() => {
    //   speakExpression(getRandomExpression(incorrectExpressions));
    // }, 300);
  }

  setTimeout(() => {
    setupRound();
  }, 1200);
}

function goHome() {
  router.push('/');
}

function goBack() {
  router.push(`/paired-opposites/topic/${topicId}`);
}

onMounted(() => {
  if (allPairs.value.length > 0) {
    setupGame();
  }
});

const isPairFinished = computed(() => (pairImage) => {
  return !remainingPairs.value.some(p => p.image === pairImage);
});
</script>

<template>
  <div class="showme-container">
    <div class="floating-stats">
      <span class="score">✓ {{ score }}/{{ rounds }}</span>
      <span class="remaining">📋 {{ remainingPairs.length }}</span>
    </div>

    <div class="pairs-grid">
      <div
        v-for="(pair, index) in allPairs"
        :key="index"
        class="pair-card"
        :class="{
          correct: selectedId === index && isCorrect,
          wrong: selectedId === index && isCorrect === false,
          reveal: selectedId && pair.image === targetPair?.image && !isCorrect,
          finished: greyFinished && isPairFinished(pair.image)
        }"
        @click="handleChoice(pair, index)"
      >
        <img
          v-if="pair.image"
          :src="pair.image"
          :alt="`${pair.left.arabic} - ${pair.right.arabic}`"
          class="pair-image"
        />
      </div>
    </div>

    <div class="instructions">
      <p>🔊 Listen to the pair of opposite words</p>
      <p>👆 Click the matching pair image</p>
    </div>

    <div class="nav-buttons">
      <button class="back-btn" @click="goBack">←</button>
      <button class="home-btn" @click="goHome">🏠</button>
      <button class="repeat-btn" @click="repeatPair" :class="{ speaking: isSpeaking }">
        🔊 
      </button>
    </div>
  </div>
</template>

<style scoped>
.showme-container {
  min-height: 100vh;
  padding: 2rem;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.floating-stats {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;
  z-index: 100;
}

.floating-stats .score {
  color: #4CAF50;
  font-weight: 600;
}

.floating-stats .remaining {
  color: #666;
}

.nav-buttons {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 100;
}

.back-btn,
.home-btn {
  padding: 0.75rem 1.5rem;
  background: #f0f0f0;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.back-btn:hover,
.home-btn:hover {
  background: #e0e0e0;
}

.repeat-btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.repeat-btn:hover {
  background: #1976D2;
}

.repeat-btn.speaking {
  animation: pulse 0.5s ease-in-out infinite;
}

.options {
  margin-bottom: 1.5rem;
}

.grey-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  user-select: none;
}

.grey-option input[type="checkbox"] {
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.pairs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.pair-card {
  background: white;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.pair-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.pair-card.finished {
  opacity: 0.3;
  filter: grayscale(100%);
}

.pair-card.correct {
  border-color: #4CAF50;
  background: #E8F5E9;
}

.pair-card.wrong {
  border-color: #f44336;
  background: #FFEBEE;
}

.pair-card.reveal {
  border-color: #4CAF50;
  background: #E8F5E9;
}

.pair-image {
  width: 100%;
  max-width: 150px;
  height: 150px;
  object-fit: contain;
  border-radius: 10px;
  margin-bottom: 0.5rem;
}

.pair-words {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
}

.arabic {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  direction: rtl;
  margin: 0;
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

@media (max-width: 768px) {
  .showme-container {
    padding: 1rem;
    padding-top: 3rem;
    padding-bottom: 5rem;
  }

  .floating-stats {
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }

  .nav-buttons {
    bottom: 0.75rem;
    gap: 0.75rem;
  }

  .back-btn,
  .home-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
    width: 5rem;
  }

  .repeat-btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    width: 5rem;
  }

  .pairs-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .pair-card {
    padding: 0.5rem;
  }

  .pair-image {
    max-width: 100px;
    height: 100px;
  }

  .arabic {
    font-size: 0.9rem;
  }

  .instructions {
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  .instructions p {
    font-size: 0.8rem;
  }
}
</style>
