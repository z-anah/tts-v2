import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import TopicChoice from '../views/TopicChoice.vue';
import Reading from '../views/Reading.vue';
import ShowMe from '../views/ShowMe.vue';

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
];

const router = createRouter({
  history: createWebHistory('/linea-proto-construction/'),
  routes,
});

export default router;
