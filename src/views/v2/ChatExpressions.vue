<template>
  <div class="chat-expressions-page">
    <div class="spacer"></div>
    <Accordion>
      <AccordionTab
        v-for="(expressions, category) in categories"
        :key="category"
        :header="categoryLabels[category] || category"
      >
        <div class="expressions-list">
          <div
            v-for="(expr, idx) in expressions"
            :key="idx"
            class="expression-card"
            @click="copyAr(expr.ar)"
          >
            <div class="expr-ar">{{ expr.ar }}</div>
            <div class="expr-en">{{ expr.en }}</div>
          </div>
        </div>
      </AccordionTab>
    </Accordion>
    <Toast />
    <div class="choice-buttons">
      <Button label="Home" @click="goHome" />
    </div>
  </div>
</template>

<script setup>
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

// Import expressions
import arabicChatExpressions from '@/data/chat.js'

const router = useRouter()
const toast = useToast()

// Map for pretty category labels
const categoryLabels = {
  greetings: 'Greetings',
  politeness: 'Politeness',
  religious: 'Religious',
  agreement: 'Agreement',
  emotion: 'Emotion',
  closing: 'Closing',
  laughter: 'Laughter',
  reactions: 'Reactions',
  casual: 'Casual',
  fillers: 'Fillers',
  questions: 'Questions',
}

const categories = arabicChatExpressions

function copyAr(ar) {
  if (!ar) return
  navigator.clipboard.writeText(ar)
  toast.add({
    severity: 'success',
    summary: 'Copied!',
    detail: 'Copied to clipboard',
    life: 1200
  })
}

function goHome() {
  router.push({ name: 'V2Index' })
}
</script>

<style scoped>
.chat-expressions-page {
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
.expressions-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;
}
.expression-card {
  background: #f8f8f8;
  border-radius: 12px;
  padding: 16px 12px;
  margin-bottom: 0.2rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background 0.15s;
}
.expression-card:active {
  background: #e0e0e0;
}
.expr-ar {
  font-size: 1.5rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 0.3rem;
  text-align: center;
  letter-spacing: 1px;
}
.expr-en {
  font-size: 0.5rem;
  color: #666;
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
