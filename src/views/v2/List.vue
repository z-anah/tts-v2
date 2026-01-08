<template>
  <div class="exercise-page">
    <div class="spacer"></div>
    <h2 class="topic-title">{{ title }}</h2>
    <div class="words-list">
      <div class="words-grid">
        <Card
          v-for="(word, idx) in words"
          :key="idx"
          class="word-card"
          @click="speak(word.ar)"
          style="cursor: pointer"
        >
          <template #content>
            <div class="word-content">
              <div v-if="word.img" class="word-img">
                <img :src="word.img" alt="" />
              </div>
              <div v-else-if="word.emo" class="word-emo">
                {{ word.emo }}
              </div>
              <div v-else-if="word.txt" class="word-txt">
                {{ word.txt }}
              </div>
              <div class="word-ar">
                {{ word.ar }}
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
    <div class="choice-buttons">
      <Button label="Back" @click="goBack" />
      <Button label="Home" @click="goHome" />
    </div>
  </div>
</template>

<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useRoute, useRouter } from 'vue-router'
import { topics } from '@/data/topics-v2.js'

const route = useRoute()
const router = useRouter()
const title = route.params.title

const topic = topics.find(t => t.title === title)
const words = topic?.words || []

function speak(ar) {
  if (!ar) return
  const utter = new window.SpeechSynthesisUtterance(ar)
  utter.lang = 'ar-SA'
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utter)
}

function goBack() {
  router.back()
}
function goHome() {
  router.push({ name: 'V2Index' })
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
.topic-title {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}
.words-list {
  margin-bottom: 2rem;
}
.words-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
.word-card {
  width: 100%;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border-radius: 16px;
  user-select: none;
}
.word-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px 0;
}
.word-img img {
  max-width: 120px;
  max-height: 120px;
  margin-bottom: 12px;
  border-radius: 12px;
  background: #f8f8f8;
  object-fit: contain;
}
.word-emo {
  font-size: 2.5rem;
  margin-bottom: 12px;
}
.word-txt {
  font-size: 1.3rem;
  margin-bottom: 12px;
  color: #555;
}
.word-ar {
  font-size: 2.2rem;
  font-weight: 600;
  color: #222;
  letter-spacing: 1px;
  margin-bottom: 10px;
  text-align: center;
}
.choice-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  margin: 0 auto 16px auto;
}
</style>
