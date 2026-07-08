<template>
    <div class="exercise-page">
        <div class="spacer"></div>
        <Card v-if="!started" class="word-card">
            <template #content>
                <div class="word-content">
                    <div class="word-ar">Ready?</div>
                </div>
            </template>
        </Card>
        <Card v-else-if="currentWord" class="word-card" @click="nextWord">
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
                        {{ currentWord[lang] }}
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
        <div class="choice-buttons">
            <Button v-if="!started" label="Begin" @click="started = true" />
            <Button
                v-if="started && currentWord"
                label="Replay"
                @click="speak(currentWord[lang])"
            />
            <Button label="Back" @click="goBack" />
            <Button label="Home" @click="goHome" />
        </div>
    </div>
</template>

<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useRoute, useRouter } from 'vue-router'
import { topics as arabicTopics } from '@/data/topics-v2.js'
import { topics as idTopics } from '@/data/topics-id.js'
import { ref, computed, watch } from 'vue'

const route = useRoute()
const router = useRouter()
const lang = route.params.lang || 'arabic'
const title = route.params.title

const topics = lang === 'arabic' ? arabicTopics : idTopics
const topic = topics.find(t => t.title === title)
const words = topic?.words || []

const index = ref(0)
const started = ref(false)
const currentWord = computed(() => started.value ? words[index.value] || null : null)

function speak(target) {
    if (!target) return
    const utter = new window.SpeechSynthesisUtterance(target)
    switch (lang) {
        case 'id':
            utter.lang = 'id-ID'
            break
        case 'fr':
            utter.lang = 'fr-FR'
            break
        case 'mg':
            utter.lang = 'mg-MG'
            break
        case 'en':
            utter.lang = 'en-US'
            break
        case 'ar':
            utter.lang = 'ar-SA'
            break
    }
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)
}

function nextWord() {
    if (index.value < words.length) {
        index.value++
    }
}

function goBack() {
    router.back()
}

function goHome() {
    router.push({ name: 'V2Index', params: { lang } })
}

// Speak on word change
watch(currentWord, (val) => {
    if (started.value && val && val[lang]) {
        console.log('Speaking:', val[lang])
        speak(val[lang])
    }
    if (started.value && val === null) {
        setTimeout(() => router.back(), 900)
    }
})
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
    margin: 0 auto 24px auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    border-radius: 16px;
    cursor: pointer;
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
    font-size: 0.7rem;
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

.choice-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    margin: 0 auto 16px auto;
}
</style>
