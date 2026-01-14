<template>
  <div class="chat-expressions-page">
    <div class="spacer"></div>
    <div class="search-bar">
      <InputText
        v-model="search"
        type="text"
        placeholder="Search expressions..."
        class="search-input"
        ref="searchInputRef"
      />
    </div>
    <Accordion>
      <AccordionTab
        v-for="(expressions, category) in filteredCategories"
        :key="category"
        :header="category"
      >
        <div class="expressions-list">
          <div
            v-for="(expr, idx) in expressions"
            :key="idx"
            class="expression-card"
            @click="copyAr(expr.ar)"
          >
            <div class="expr-ar">{{ expr.ar_t }}</div>
            <div class="expr-en">{{ expr.en }}</div>
          </div>
        </div>
      </AccordionTab>
    </Accordion>
    <Toast />
    <div class="choice-buttons">
      <Button label="Home" @click="goHome" />
      <Button label="Focus Search" @click="focusSearch" severity="secondary" />
    </div>
  </div>
</template>

<script setup>
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import InputText from 'primevue/inputtext'
import { useToast } from 'primevue/usetoast'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'

// Import expressions
import arabicChatExpressions from '@/data/chat.js'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const lang = route.params.lang || 'arabic'

const categories = arabicChatExpressions

const search = ref('')

// Filtered categories based on search
const filteredCategories = computed(() => {
  if (!search.value.trim()) return categories
  const q = search.value.trim().toLowerCase()
  const result = {}
  for (const [cat, exprs] of Object.entries(categories)) {
    // Check if category matches
    const catMatch = cat.toLowerCase().includes(q)
    // Filter expressions
    const filteredExprs = exprs.filter(expr =>
      (expr.ar && expr.ar.toLowerCase().includes(q)) ||
      (expr.en && expr.en.toLowerCase().includes(q)) ||
      (expr.ar_t && expr.ar_t.toLowerCase().includes(q)) ||
      catMatch
    )
    if (filteredExprs.length > 0) {
      result[cat] = filteredExprs
    }
  }
  return result
})

function speakAr(ar) {
  if (!ar) return
  const utterance = new window.SpeechSynthesisUtterance(ar)
  utterance.lang = 'ar-SA'
  window.speechSynthesis.speak(utterance)
}

function copyAr(ar) {
  if (!ar) return
  navigator.clipboard.writeText(ar)
  speakAr(ar)
  toast.add({
    severity: 'success',
    summary: 'Copied!',
    detail: 'Copied to clipboard',
    life: 1200
  })
}

function goHome() {
  router.push({ name: 'V2Index', params: { lang } })
}

const searchInputRef = ref(null)

function focusSearch() {
  // PrimeVue InputText exposes the native input via $el.querySelector('input')
  // or you can use $el.focus() if ref is on InputText
  if (searchInputRef.value) {
    // Try to focus the native input element
    const el = searchInputRef.value.$el?.querySelector('input') || searchInputRef.value.$el || searchInputRef.value
    if (el && typeof el.focus === 'function') el.focus()
  }
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
.search-bar {
  width: 100%;
  margin: 1.2rem 0 1.2rem 0;
  display: flex;
  justify-content: center;
}
.search-input {
  width: 100%;
  max-width: 420px;
  padding: 18px 20px;
  border-radius: 16px;
  font-size: 1.35rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
  background: #f5f5f5;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  transition: border 0.2s, box-shadow 0.2s;
  border: 2px solid #b3b3b3;
}
:deep(.p-inputtext) {
  background: #f5f5f5;
  border-radius: 16px;
  font-size: 1.35rem;
  font-weight: 500;
  padding: 18px 20px;
  border: none;
  box-shadow: none;
}
.search-input:focus,
:deep(.p-inputtext:focus) {
  border: 2px solid #007bff !important;
  background: #fff !important;
  box-shadow: 0 4px 16px rgba(0,123,255,0.08) !important;
  outline: none !important;
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
  font-size: 1rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 0.3rem;
  text-align: center;
  letter-spacing: 1px;
}
.expr-en {
  font-size: 0.3rem;
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
:deep(.p-toast) {
  max-width: 220px !important;
  min-width: 120px !important;
}
:deep(.p-toast-message) {
  max-width: 220px !important;
  min-width: 120px !important;
}
</style>
