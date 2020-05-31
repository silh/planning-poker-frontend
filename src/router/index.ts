import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import CreateGame from '@/views/CreateGame.vue';
import GameView from '@/views/GameView.vue';
import RouteNames from '@/router/RouteNames';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: RouteNames.CREATE_GAME,
    component: CreateGame,
  },
  {
    path: '/game/:gameId',
    name: RouteNames.GAME,
    component: GameView,
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
