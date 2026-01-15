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
        <div v-else>
            <div v-if="gameOver" class="done-msg">
                <Card class="word-card">
                    <template #content>
                        <div class="word-content">
                            <div class="word-ar">Done!</div>
                        </div>
                    </template>
                </Card>
            </div>
            <div v-else>
                <div class="grid">
                    <Card v-for="(word, idx) in currentGrid" :key="idx" class="grid-card" :class="{
                        found: foundIdxs.includes(idx),
                        wrong: wrongIdx === idx,
                        correct: showCorrect && idx === currentIdx
                    }" @click="guess(idx)">
                        <template #content>
                            <div class="grid-content">
                                <img
                                    v-if="word.img"
                                    :src="word.img"
                                    class="grid-img"
                                    alt=""
                                    @mousedown="startLongPress(word.img)"
                                    @touchstart="startLongPress(word.img)"
                                    @mouseup="cancelLongPress"
                                    @mouseleave="cancelLongPress"
                                    @touchend="cancelLongPress"
                                    @touchcancel="cancelLongPress"
                                />
                                <span v-else-if="word.emo" class="grid-emo">{{ word.emo }}</span>
                                <span v-else-if="word.txt" class="grid-txt">{{ word.txt }}</span>
                                <span v-else class="grid-txt">?</span>
                            </div>
                        </template>
                    </Card>
                </div>
            </div>
        </div>
        <div class="choice-buttons">
            <Button v-if="!started" label="Begin" @click="beginGame" />
            <Button
                v-if="started && !gameOver && currentGrid.length && currentIdx !== null"
                label="Replay"
                @click="speak(currentGrid[currentIdx]?.target)"
            />
            <Button label="Back" @click="goBack" />
            <Button label="Home" @click="goHome" />
        </div>
        <div v-if="zoomImg" class="zoom-modal" @click="zoomImg = null">
            <img :src="zoomImg" class="zoom-img" alt="Zoomed" />
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

const topics = lang === 'id' ? idTopics : arabicTopics
const topic = topics.find(t => t.title === title)
const words = topic?.words || []

// Shuffle utility
function shuffle(arr) {
    return arr.map(v => [Math.random(), v])
        .sort((a, b) => a[0] - b[0])
        .map(x => x[1])
}

// Split words into chunks of 9
function chunk(arr, size) {
    const res = []
    for (let i = 0; i < arr.length; i += size) {
        res.push(arr.slice(i, i + size))
    }
    return res
}

const started = ref(false)
const allGrids = ref([])
const rowIdx = ref(0)
const foundIdxs = ref([])
const currentIdx = ref(null)
const wrongIdx = ref(null)
const showCorrect = ref(false)

// Zoom image state and long-press logic
const zoomImg = ref(null)
let longPressTimer = null

const gameOver = computed(() => {
    if (!started.value) return false
    if (!allGrids.value.length) return false
    if (rowIdx.value < allGrids.value.length - 1) return false
    return foundIdxs.value.length === currentGrid.value.length
})

const currentGrid = computed(() => allGrids.value[rowIdx.value] || [])

function speak(target) {
    if (!target) return
    const utter = new window.SpeechSynthesisUtterance(target)
    utter.lang = lang === 'id' ? 'id-ID' : 'ar-SA'
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)
}

function beginGame() {
    started.value = true
    allGrids.value = chunk(shuffle(words), 9)
    rowIdx.value = 0
    foundIdxs.value = []
    nextTarget()
}

function nextTarget() {
    // Pick a random index not found in current grid
    const available = currentGrid.value
        .map((_, i) => i)
        .filter(i => !foundIdxs.value.includes(i))
    if (available.length === 0) {
        // All found in this row, go to next row or finish
        if (rowIdx.value < allGrids.value.length - 1) {
            setTimeout(() => {
                rowIdx.value++
                foundIdxs.value = []
                nextTarget()
            }, 500)
        }
        return
    }
    let idx
    do {
        idx = available[Math.floor(Math.random() * available.length)]
    } while (idx === currentIdx.value && available.length > 1)
    currentIdx.value = idx
    speak(currentGrid.value[idx]?.target)
}

function guess(idx) {
    if (foundIdxs.value.includes(idx) || gameOver.value) return
    if (idx === currentIdx.value) {
        foundIdxs.value.push(idx)
        showCorrect.value = false
        if (foundIdxs.value.length === currentGrid.value.length) {
            // All found in this row, handled in nextTarget
            setTimeout(() => {
                nextTarget()
            }, 400)
        } else {
            setTimeout(() => {
                nextTarget()
            }, 400)
        }
    } else {
        wrongIdx.value = idx
        showCorrect.value = true
        setTimeout(() => {
            wrongIdx.value = null
            showCorrect.value = false
            nextTarget()
        }, 900)
    }
}

function startLongPress(img) {
    cancelLongPress()
    longPressTimer = setTimeout(() => {
        zoomImg.value = img
    }, 400)
}
function cancelLongPress() {
    if (longPressTimer) {
        clearTimeout(longPressTimer)
        longPressTimer = null
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
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    border-radius: 16px;
    user-select: none;
    text-align: center;
}

.word-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 0;
}

.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 24px;
}

.grid-card {
    min-height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 1;
    transition: box-shadow 0.2s, opacity 0.2s, background 0.2s;
    border-radius: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    background: #fff;
}

.grid-card.found {
    opacity: 0.3;
    pointer-events: none;
    background: #e0e0e0;
}

.grid-card.wrong {
    background: #ffbdbd;
}

.grid-card.correct {
    background: #d2ffd2;
    box-shadow: 0 0 0 2px #4caf50;
}

.grid-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.grid-img {
    max-width: 100px;
    max-height: 100px;
    border-radius: 10px;
    margin-bottom: 8px;
    background: #f8f8f8;
    object-fit: contain;
}

.grid-emo {
    font-size: 2.2rem;
    margin-bottom: 8px;
}

.grid-txt {
    font-size: 1.2rem;
    color: #444;
    margin-bottom: 8px;
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
    margin: 0 auto 16px auto;
}

.zoom-modal {
    position: fixed;
    z-index: 1000;
    inset: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: zoom-out;
}
.zoom-img {
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 18px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.25);
    background: #fff;
}
</style>
