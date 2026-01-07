<template>
  <div class="choice-list">
    <div class="spacer"></div>
    <div class="choice-bottom">
      <h2 class="topic-title">{{ title }}</h2>
      <div class="choice-buttons">
        <Button label="Reading" @click="go('reading')" />
        <Button label="Where am I" @click="go('where-am-i')" />
        <Button label="What am I" @click="go('what-am-i')" />
        <Button label="Home" @click="goHome" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const title = route.params.title

function go(type) {
  if (type === 'reading') {
    router.push({ name: 'V2Reading', params: { title } })
  } else if (type === 'where-am-i') {
    router.push({ name: 'V2WhereAmI', params: { title } })
  } else if (type === 'what-am-i') {
    router.push({ name: 'V2WhatAmI', params: { title } })
  }
}

function goHome() {
  router.push({ name: 'V2Index' })
}
</script>

<style scoped>
.choice-list {
  max-width: 480px;
  margin: 0 auto;
  padding: 0 8px 16px 8px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.spacer {
  flex: 1 1 auto;
}
.choice-bottom {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 16px;
}
.topic-title {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  text-align: center;
}
.choice-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}
</style>
