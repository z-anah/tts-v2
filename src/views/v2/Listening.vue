<template>
  <div class="listening-page">
    <Card v-if="currentWord" class="word-card">
      <template #content>
        <div class="word-content">
          <div v-if="currentWord.img" class="word-img">
            <img :src="currentWord.img" alt="" />
          </div>
          <div v-else-if="currentWord.emo" class="word-emo">
            {{ currentWord.emo }}
          </div>
          <div v-else-if="currentWord.txt" class="word-txt">
            {{ currentWord.txt }}
          </div>
          <div class="word-ar">
            {{ currentWord.target }}
          </div>
        </div>
      </template>
    </Card>
    <div v-else class="done-msg">
      <Card class="word-card">
        <template #content>
          <div class="word-content">
            <div class="word-ar">Done!</div>
          </div>
        </template>
      </Card>
    </div>
    <div class="slider-section">
      <Slider
        v-model="index"
        :min="0"
        :max="words.length - 1"
        :step="1"
        :disabled="!currentWord"
         style="width: 100%"
      />
      <div class="progress-info">
        {{ index + 1 }} / {{ words.length }}
      </div>
    </div>
    <div class="choice-buttons">
      <Button v-if="!started" label="Play" @click="startListening" />
      <Button label="Back" @click="goBack" />
      <Button label="Home" @click="goHome" />
    </div>
  </div>
</template>

<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'
import Slider from 'primevue/slider'
import { useRouter } from 'vue-router'
import { topics as arabicTopics } from '@/data/topics-v2.js'
import { ref, computed, watch } from 'vue'

const router = useRouter()

// Combine all words from all topics
const words = arabicTopics.flatMap(topic => topic.words || [])

const index = ref(0)
const started = ref(false)
const currentWord = computed(() => started.value ? words[index.value] || null : null)

function startListening() {
  started.value = true
  index.value = 0
}

function speak(target, onEnd) {
  if (!target) return
  window.speechSynthesis.cancel()
  const utter = new window.SpeechSynthesisUtterance(target)
  utter.lang = 'ar-SA'
  utter.onend = () => {
    if (typeof onEnd === 'function') onEnd()
  }
  window.speechSynthesis.speak(utter)
}

function goBack() {
  router.back()
}

function goHome() {
  router.push({ name: 'V2Index', params: { lang: 'arabic' } })
}

// Auto-play: speak and advance after speech ends
function playCurrentAndAdvance() {
  if (started.value && currentWord.value && currentWord.value.target) {
    window.speechSynthesis.cancel()
    speak(currentWord.value.target, () => {
      if (started.value && index.value < words.length - 1) {
        index.value++
      }
    })
  }
}

watch(index, () => {
  playCurrentAndAdvance()
})

watch(currentWord, () => {
  playCurrentAndAdvance()
})
</script>

<style scoped>
.listening-page {
  max-width: 480px;
  margin: 0 auto;
  padding: 0 8px 16px 8px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: #fff;
}
.word-card {
  width: 100%;
  margin: 0 auto 24px auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border-radius: 16px;
  user-select: none;
}
.word-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.word-img img {
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
  font-size: 2rem;
  font-weight: 600;
  color: #222;
  letter-spacing: 1px;
  margin-top: 8px;
  text-align: center;
}
.done-msg {
  width: 100%;
}
.slider-section {
  margin: 24px 0 8px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.progress-info {
  margin-top: 8px;
  font-size: 1rem;
  color: #555;
}
.choice-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  margin: 0 auto 16px auto;
}
</style>
