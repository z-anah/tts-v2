<template>
  <div class="exercise-page">
    <div class="spacer"></div>
    <div v-if="!started">
      <Card class="word-card">
        <template #content>
          <div class="word-content">
            <div class="word-ar">Ready?</div>
          </div>
        </template>
      </Card>
      <div class="choice-buttons">
        <Button label="Begin" @click="beginGame" />
        <Button label="Back" @click="goBack" />
        <Button label="Home" @click="goHome" />
      </div>
    </div>
    <div v-else-if="!gameOver">
      <Card class="word-card" @click="handleCardClick">
        <template #content>
          <div class="word-content">
            <img
              v-if="currentWord.img"
              :src="currentWord.img"
              class="word-img"
              alt=""
            />
            <span v-else-if="currentWord.emo" class="word-emo">{{ currentWord.emo }}</span>
            <span v-else-if="currentWord.txt" class="word-txt">{{ currentWord.txt }}</span>
          </div>
          <div v-if="showAr" class="word-ar">{{ currentWord[lang] }}</div>
        </template>
      </Card>
      <div class="choice-buttons">
        <Button label="Back" @click="goBack" />
        <Button label="Home" @click="goHome" />
      </div>
    </div>
    <div v-else class="done-msg">
      <Card class="word-card">
        <template #content>
          <div class="word-content">
            <div class="word-ar">Done!</div>
          </div>
        </template>
      </Card>
      <div class="choice-buttons">
        <Button label="Back" @click="goBack" />
        <Button label="Home" @click="goHome" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useRoute, useRouter } from 'vue-router'
import { topics as arabicTopics } from '@/data/topics-v2.js'
import { topics as idTopics } from '@/data/topics-id.js'
import { ref, computed } from 'vue'

const route = useRoute()
const router = useRouter()
const lang = route.params.lang || 'arabic'
const title = route.params.title

const topics = lang === 'id' ? idTopics : arabicTopics
const topic = topics.find(t => t.title === title)
const words = topic?.words?.filter(w => w.img || w.emo || w.txt) || []

// Shuffle utility
function shuffle(arr) {
  return arr.map(v => [Math.random(), v])
    .sort((a, b) => a[0] - b[0])
    .map(x => x[1])
}

const started = ref(false)
const showAr = ref(false)
const shownIdxs = ref([])
const order = ref([])
const idx = ref(0)

const gameOver = computed(() => shownIdxs.value.length === words.length && started.value)
const currentWord = computed(() => started.value && order.value.length ? words[order.value[idx.value]] : null)

function beginGame() {
  started.value = true
  showAr.value = false
  shownIdxs.value = []
  order.value = shuffle([...Array(words.length).keys()])
  idx.value = 0
}

function nextWord() {
  if (!started.value || gameOver.value) return
  showAr.value = false
  if (!shownIdxs.value.includes(order.value[idx.value])) {
    shownIdxs.value.push(order.value[idx.value])
  }
  if (shownIdxs.value.length === words.length) return
  let next = idx.value + 1
  while (shownIdxs.value.includes(order.value[next]) && next < order.value.length) {
    next++
  }
  if (next < order.value.length) {
    idx.value = next
  } else {
    // If all shown, mark as over
    idx.value = 0
  }
}

function playAr() {
  if (currentWord.value && currentWord.value[lang]) {
    const utter = new window.SpeechSynthesisUtterance(currentWord.value[lang])
    utter.lang = lang === 'id' ? 'id-ID' : 'ar-SA'
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)
  }
}

function showAndPlay() {
  showAr.value = true
  playAr()
}

function handleCardClick() {
  if (!showAr.value) {
    showAr.value = true
    showAndPlay()
  } else {
    nextWord()
  }
}

function goBack() {
  router.back()
}
function goHome() {
  router.push({ name: 'V2Index', params: { lang } })
}
</script>

<style scoped>
.exercise-page {
  max-width: 480px;
  margin: 0 auto;
  padding: 0 8px 16px 8px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: #fff;
}
.spacer {
  flex: 1 1 auto;
}
.word-card {
  width: 100%;
  max-width: 360px;
  margin: 0 auto 24px auto;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border-radius: 16px;
  cursor: pointer;
  user-select: none;
  text-align: center;
}
.word-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
}
.word-img {
  max-width: 200px;
  max-height: 200px;
  margin-bottom: 16px;
  border-radius: 12px;
  background: #f8f8f8;
  object-fit: contain;
}
.word-emo {
  font-size: 3rem;
  margin-bottom: 16px;
}
.word-txt {
  font-size: 2rem;
  margin-bottom: 16px;
  color: #555;
}
.word-ar {
  font-size: 2.2rem;
  font-weight: 600;
  color: #222;
  letter-spacing: 1px;
  margin-top: 8px;
  text-align: center;
}
.done-msg {
  width: 100%;
  margin-bottom: 24px;
}
.choice-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 360px;
  margin: 0 auto 16px auto;
}
.ar-reveal {
  width: 100%;
  max-width: 360px;
  margin: 0 auto 16px auto;
}
.ar-card {
  margin-top: 0.5rem;
}
</style>
