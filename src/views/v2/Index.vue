<template>
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
import { topics } from '@/data/topics-v2.js'
import { useRouter } from 'vue-router'

const router = useRouter()

// Group topics by category, topics in each category from last to first
const groupedTopics = topics.reduce((acc, topic) => {
  if (!acc[topic.category]) acc[topic.category] = []
  acc[topic.category].unshift(topic)
  return acc
}, {})

function goToChoice(topic) {
  router.push({ name: 'V2Choice', params: { title: topic.title } })
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
@media (min-width: 600px) {
  .topics-list {
    max-width: 480px;
  }
}
</style>