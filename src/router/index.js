import { createRouter, createWebHistory } from 'vue-router';
import PairedOppositesModeChoice from '../views/paired-opoposites/ModeChoice.vue';
import PairedOppositesReading from '../views/paired-opoposites/Reading.vue';
import PairedOppositesShowMe from '../views/paired-opoposites/ShowMe.vue';
import V2Index from '../views/v2/Index.vue';
import V2Choice from '../views/v2/Choice.vue';
import V2Reading from '../views/v2/Reading.vue';
import V2WhereAmI from '../views/v2/WhereAmI.vue';
import V2WhatAmI from '../views/v2/WhatAmI.vue';
import V2ChatExpressions from '../views/v2/ChatExpressions.vue';

const routes = [
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
  {
    path: '/v2',
    name: 'V2Index',
    component: V2Index,
  },
  {
    path: '/v2/choice/:title',
    name: 'V2Choice',
    component: V2Choice, props: true,
  },
  {
    path: '/v2/reading/:title',
    name: 'V2Reading',
    component: V2Reading,
    props: true,
  },
  {
    path: '/v2/where-am-i/:title',
    name: 'V2WhereAmI',
    component: V2WhereAmI,
    props: true,
  },
  {
    path: '/v2/what-am-i/:title',
    name: 'V2WhatAmI',
    component: V2WhatAmI,
    props: true,
  },
  {
    path: '/v2/chat',
    name: 'V2ChatExpressions',
    component: V2ChatExpressions
  },
  {
    path: '/v2/list/:title',
    name: 'V2List',
    component: () => import('@/views/v2/List.vue')
  },
];

const router = createRouter({
  history: createWebHistory('/tts-v2/'),
  routes,
});

export default router;
