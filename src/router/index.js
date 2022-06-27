import { createRouter, createWebHistory } from "vue-router";
import CreateGameView from "../views/CreateGameView.vue";
import GameView from "../views/GameView.vue";
import HomeView from "../views/HomeView.vue";
import JoinGameView from "../views/JoinGameView.vue";
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
      path: "/games/:gameId/:playerId", // TODO fix that, shoud be like this
      name: "game",
      component: GameView,
      props: true,
    },
    {
      path: "/games/:gameId/join",
      name: "join-game",
      component: JoinGameView,
      props: true,
    },
  ],
});

export default router;
