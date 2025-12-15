import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import TopicChoice from '../views/TopicChoice.vue';
import Reading from '../views/Reading.vue';
import ShowMe from '../views/ShowMe.vue';
import QuestionsList from '../views/QuestionsList.vue';
import QuestionsDetail from '../views/QuestionsDetail.vue';
import TopicGrid from '../views/TopicGrid.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/topic/:id',
    name: 'TopicChoice',
    component: TopicChoice,
  },
  {
    path: '/topic/:id/reading',
    name: 'Reading',
    component: Reading,
  },
  {
    path: '/topic/:id/showme',
    name: 'ShowMe',
    component: ShowMe,
  },
  {
    path: '/topic/:id/grid',
    name: 'Grid',
    component: TopicGrid,
  },
  {
    path: '/questions',
    name: 'QuestionsList',
    component: QuestionsList,
  },
  {
    path: '/questions/:id',
    name: 'QuestionsDetail',
    component: QuestionsDetail,
  },
];

const router = createRouter({
  history: createWebHistory('/tts-v2/'),
  routes,
});

export default router;
