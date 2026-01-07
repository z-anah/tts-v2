<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTopicById } from '@/data/topics.js';

const route = useRoute();
const router = useRouter();
const topicId = route.params.id;

const topic = computed(() => getTopicById(topicId));
const allWords = computed(() => topic.value?.words || []);

const randomizedWords = ref([]);
const remainingWords = ref([]);
const targetWord = ref(null);
const score = ref(0);
const rounds = ref(0);
const selectedId = ref(null);
const isCorrect = ref(null);
const isSpeaking = ref(false);
const canClick = ref(true);
const choices = ref([]);
const preparedUtterance = ref(null);
const greyFinished = ref(true);

function setupGame() {
  // Do not randomize images; keep original order
  randomizedWords.value = [...allWords.value];
  remainingWords.value = [...allWords.value];
  score.value = 0;
  rounds.value = 0;
  setupRound();
}

function prepareUtterance(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.8;
    preparedUtterance.value = utterance;
  }
}

function speakWord(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    // Use prepared utterance if available and matches text
    if (preparedUtterance.value && preparedUtterance.value.text === text) {
      preparedUtterance.value.onstart = () => { isSpeaking.value = true; };
      preparedUtterance.value.onend = () => { isSpeaking.value = false; };
      window.speechSynthesis.speak(preparedUtterance.value);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.8;
      utterance.onstart = () => { isSpeaking.value = true; };
      utterance.onend = () => { isSpeaking.value = false; };
      window.speechSynthesis.speak(utterance);
    }
  }
}

function setupRound() {
  selectedId.value = null;
  isCorrect.value = null;
  canClick.value = true;

  // If no more words, game over
  if (remainingWords.value.length === 0) {
    setTimeout(() => {
      alert(`Game Over! Your score: ${score.value}/${rounds.value}`);
      router.push(`/topic/${topicId}`);
    }, 100);
    return;
  }

  // Randomly pick the next word to ask (from remaining, no repeats)
  const idx = Math.floor(Math.random() * remainingWords.value.length);
  targetWord.value = remainingWords.value[idx];

  // Choices are always in topic order
  choices.value = randomizedWords.value;

  // Prepare utterance for instant playback
  prepareUtterance(targetWord.value.arabic);

  // Play sound
  speakWord(targetWord.value.arabic);
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

  // Accept any card with the same image as the target word
  if ((word.image === targetWord.value.image && word.image != null) ||
      (word.emoji === targetWord.value.emoji && word.emoji != null) ||
      (word.text === targetWord.value.text && word.text != null)) {
    isCorrect.value = true;
    score.value++;
    // Remove the word from remainingWords (by id)
    const idx = remainingWords.value.findIndex(w => w.id === targetWord.value.id);
    if (idx !== -1) remainingWords.value.splice(idx, 1);
  } else {
    isCorrect.value = false;
  }

  setTimeout(() => {
    setupRound();
  }, 1200);
}

function goHome() {
  router.push('/');
}

function goBack() {
  router.push(`/topic/${topicId}`);
}

onMounted(() => {
  if (allWords.value.length > 0) {
    setupGame();
  }
});

// Helper to check if a word is finished
const isWordFinished = computed(() => (wordId) => {
  return !remainingWords.value.some(w => w.id === wordId);
});
</script>

<template>
  <div class="showme-container">
    <div class="floating-stats">
      <span class="score">✓ {{ score }}/{{ rounds }}</span>
      <span class="remaining">📋 {{ remainingWords.length }}</span>
    </div>

    <div class="images-grid" :style="{ gridTemplateColumns: `repeat(${Math.min(7, randomizedWords.length)}, 1fr)` }">
      <div
        v-for="word in choices"
        :key="word.id"
        class="image-card"
        :class="{
          correct: selectedId === word.id && isCorrect,
          wrong: selectedId === word.id && isCorrect === false,
          reveal: selectedId && word.id === targetWord.id && !isCorrect,
          finished: greyFinished && isWordFinished(word.id)
        }"
        @click="handleChoice(word)"
      >
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
    </div>

    <div class="instructions">
      <p>🔊 Listen to the word</p>
      <p>👆 Click the matching image</p>
    </div>

    <div class="nav-buttons">
      <button class="back-btn" @click="goBack">←</button>
      <button class="home-btn" @click="goHome">🏠</button>
      <button class="repeat-btn" @click="repeatWord" :class="{ speaking: isSpeaking }">
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

.images-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  max-width: 700px;
  width: 100%;
  justify-content: center;
  justify-items: center;
  margin: 0 auto;
}

.image-card {
  background: white;
  border-radius: 16px;
  padding: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.image-card.finished {
  opacity: 0.3;
  filter: grayscale(100%);
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

.img-emoji {
  font-size: 5rem;
  display: block;
  width: 6rem;
  height: 6rem;
  line-height: 6rem;
}

.img-text {
  font-size: 1.1rem;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  word-break: break-word;
  text-align: center;
  padding: 0.25rem;
  width: 6rem;
  height: 6rem;
  font-weight: 500;
}

.img-image {
  width: 6rem;
  height: 6rem;
  border-radius: 10px;
  display: block;
  margin: 0 auto;
  object-fit: cover;
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

  .images-grid {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 0.5rem;
    max-width: 100%;
  }

  .image-card {
    padding: 0.35rem;
    border: 2px solid transparent;
    border-radius: 12px;
  }

  .img-emoji {
    font-size: 3.5rem;
    width: 4.5rem;
    height: 4.5rem;
    line-height: 4.5rem;
  }

  .img-text {
    font-size: 0.9rem;
    width: 4.5rem;
    height: 4.5rem;
  }

  .img-image {
    width: 4.5rem;
    height: 4.5rem;
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
