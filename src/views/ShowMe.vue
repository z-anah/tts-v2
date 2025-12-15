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
const greyFinished = ref(true); // New state for grey out option


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
    // Do not remove, so it will be asked again
  }

  setTimeout(() => {
    setupRound();
  }, 100);
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
    <div class="nav-buttons">
      <button class="back-btn" @click="goBack">← Back</button>
      <button class="home-btn" @click="goHome">🏠 Home</button>
    </div>
    
    <div class="header">
      <div class="score">Score: {{ score }}/{{ rounds }}</div>
      <div class="round">Remaining: {{ remainingWords.length }}</div>
    </div>

    <button class="repeat-btn" @click="repeatWord" :class="{ speaking: isSpeaking }">
      🔊 Repeat Word
    </button>

    <div class="options">
      <label class="grey-option">
        <input type="checkbox" v-model="greyFinished" />
        Grey finished words
      </label>
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
        <!-- if word.image -->
         <img
           v-if="word.image"
           :src="word.image"
           :alt="word.arabic"
           class="img-image"
         />
         <!-- if word.emoji -->
          <span
            v-else-if="word.emoji"
            class="img-emoji"
          >{{ word.emoji }}</span>

          <!-- if word.text -->
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
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 500px;
  width: 100%;
  justify-content: center;
  margin: 0 auto;
}

.image-card {
  background: white;
  border-radius: 16px;
  padding: 1rem;
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

.emoji {
  display: block;
}


.img-emoji {
  font-size: 5rem;
  display: block;
  width: 6rem;
  height: 6rem;
}
.img-text {
  font-size: 1rem;
  color: #888;
  display: block;
  margin: 0 auto;
  word-break: break-all;
  text-align: center;
  padding: 0.2rem 0.4rem;
  width: 6rem;
  height: 6rem;

}
.img-image {
  width: 6rem;
  height: 6rem;
  border-radius: 12px;
  display: block;
  margin: 0 auto;
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
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  .repeat-btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .images-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)) !important;
    gap: 0.75rem;
    max-width: 100%;
  }

  .image-card {
    padding: 0.75rem;
    border: 3px solid transparent;
  }

  .img-emoji {
    font-size: 3rem;
    width: 4rem;
    height: 4rem;
  }

  .img-text {
    font-size: 0.85rem;
    width: 4rem;
    height: 4rem;
  }

  .img-image {
    width: 4rem;
    height: 4rem;
  }

  .instructions {
    margin-top: 1rem;
  }

  .instructions p {
    font-size: 0.8rem;
  }
}
</style>
