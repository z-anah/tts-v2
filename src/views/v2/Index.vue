<template>
    <div class="lang-switch">
      <Button
        :label="lang === 'id' ? 'Learn Arabic' : 'Learn Indonesian'"
        @click="switchLang"
        class="lang-switch-btn"
      />
    </div>
  <div class="topics-list">
    <Accordion>
      <AccordionTab
        v-for="(topics, category) in groupedTopics"
        :key="category"
        :header="category"
      >
        <div class="topic-buttons">
          <Button
            v-for="topic in topics"
            :key="topic.title"
            :label="topic.title"
            @click="goToChoice(topic)"
          />
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup>
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Button from 'primevue/button'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { topics as arabicTopics } from '@/data/topics-v2.js'
import { topics as idTopics } from '@/data/topics-id.js'

const route = useRoute()
const router = useRouter()

const lang = computed(() => route.params.lang || 'arabic')
const topics = computed(() => lang.value === 'id' ? idTopics : arabicTopics)

// Group topics by category, topics in each category from last to first
const groupedTopics = computed(() =>
  topics.value.reduce((acc, topic) => {
    if (!acc[topic.category]) acc[topic.category] = []
    acc[topic.category].unshift(topic)
    return acc
  }, {})
)

function goToChoice(topic) {
  router.push({ name: 'V2Choice', params: { lang: lang.value, title: topic.title } })
}

function switchLang() {
  const newLang = lang.value === 'id' ? 'arabic' : 'id'
  router.push({ name: 'V2Index', params: { lang: newLang } })
}
</script>

<style scoped>
.topics-list {
  max-width: 480px;
  margin: 0 auto;
  padding: 16px 8px;
}
.topic-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.lang-switch {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}
.lang-switch-btn {
  min-width: 180px;
}
@media (min-width: 600px) {
  .topics-list {
    max-width: 480px;
  }
}
</style>