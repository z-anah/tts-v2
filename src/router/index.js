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
import V2LanguageChoice from '../views/v2/LanguageChoice.vue';

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
    path: '/',
    name: 'V2LanguageChoice',
    component: V2LanguageChoice,
  },
  {
    path: '/v2/:lang',
    name: 'V2Index',
    component: V2Index,
    props: true,
  },
  {
    path: '/v2/:lang/choice/:title',
    name: 'V2Choice',
    component: V2Choice,
    props: true,
  },
  {
    path: '/v2/:lang/reading/:title',
    name: 'V2Reading',
    component: V2Reading,
    props: true,
  },
  {
    path: '/v2/:lang/where-am-i/:title',
    name: 'V2WhereAmI',
    component: V2WhereAmI,
    props: true,
  },
  {
    path: '/v2/:lang/what-am-i/:title',
    name: 'V2WhatAmI',
    component: V2WhatAmI,
    props: true,
  },
  {
    path: '/v2/:lang/chat',
    name: 'V2ChatExpressions',
    component: V2ChatExpressions,
    props: true,
  },
  {
    path: '/v2/:lang/list/:title',
    name: 'V2List',
    component: () => import('@/views/v2/List.vue'),
    props: true,
  },
  // Listening.vue
  {
    path: '/v2/:lang/listening',
    name: 'V2Listening',
    component: () => import('@/views/v2/Listening.vue'),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory('/tts-v2/'),
  routes,
});

export default router;
