<template>
  <div class="language-choice-page">
    <div class="spacer"></div>
    <h2 class="title">Choose Language</h2>
    <div class="choice-buttons">
      <Button label="Learn Arabic" @click="choose('arabic')" />
      <Button label="Learn Indonesian" @click="choose('id')" />
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
const router = useRouter()
function choose(lang) {
  router.push({ name: 'V2Index', params: { lang } })
}
</script>

<style scoped>
.language-choice-page {
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
.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}
.choice-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin: 0 auto 16px auto;
}
</style>
