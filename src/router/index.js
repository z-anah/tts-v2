import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ModeChoice from '../views/ModeChoice.vue';
import Reading from '../views/Reading.vue';
import ShowMe from '../views/ShowMe.vue';
import QuestionsList from '../views/QuestionsList.vue';
import QuestionsDetail from '../views/QuestionsDetail.vue';
import TopicGrid from '../views/TopicGrid.vue';
import PictureQuiz from '../views/PictureQuiz.vue';
import Admin from '../views/Admin.vue';
import PairedOppositesModeChoice from '../views/paired-opoposites/ModeChoice.vue';
import PairedOppositesReading from '../views/paired-opoposites/Reading.vue';
import PairedOppositesShowMe from '../views/paired-opoposites/ShowMe.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/topic/:id',
    name: 'ModeChoice',
    component: ModeChoice,
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
    path: '/topic/:id/picturequiz',
    name: 'PictureQuiz',
    component: PictureQuiz,
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
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/paired-opposites/topic/:id',
    name: 'PairedOppositesModeChoice',
    component: PairedOppositesModeChoice,
  },
  {
    path: '/paired-opposites/topic/:id/reading',
    name: 'PairedOppositesReading',
    component: PairedOppositesReading,
  },
  {
    path: '/paired-opposites/topic/:id/showme',
    name: 'PairedOppositesShowMe',
    component: PairedOppositesShowMe,
  },
];

const router = createRouter({
  history: createWebHistory('/tts-v2/'),
  routes,
});

export default router;
