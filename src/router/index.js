import { createRouter, createWebHistory } from "vue-router";
import CreateGameView from "../views/CreateGameView.vue";
import GameView from "../views/GameView.vue";
import HomeView from "../views/HomeView.vue";
import ListGamesView from "../views/ListGamesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/games/create",
      name: "create-game",
      component: CreateGameView,
    },
    {
      path: "/games",
      name: "games",
      component: ListGamesView,
    },
    {
      path: "/games/:gameId",
      name: "game",
      component: GameView,
      props: true,
    }
  ],
});

export default router;
