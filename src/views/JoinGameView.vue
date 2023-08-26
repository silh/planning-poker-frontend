<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { GameService } from "../services/GameService.js";
import { useUserStore } from "../stores/user.js";
import { UserService } from "../services/UserService.js";

const props = defineProps({
  gameId: String,
});
const router = useRouter();
const userStore = useUserStore();

const game = ref({});
const playerName = ref("");

const error = ref("");

const routeToGame = async () => {
  router.push({
    name: "game",
    params: { gameId: props.gameId },
  });
};

const send = async () => {
  if (!playerName.value) {
    error.value = "Player name cannot be empty.";
    return;
  }
  const newUser = await UserService.create(playerName.value);
  userStore.save(newUser);
  routeToGame();
};

onMounted(async () => {
  // this can probably be part of the logic in a place which routes to this page
  if (userStore.currentUser) {
    routeToGame();
    return;
  }
  game.value = await GameService.get(props.gameId);
});
</script>

<template>
  <main>
    <div>Join a game {{ game.name }}.</div>
    <div>
      <label id="player-name">Player name:</label>
      <input v-model="playerName" id="player-name" />
    </div>
    <button @click="send">Join</button>
    <div v-if="error">{{ error }}</div>
  </main>
</template>

<style scoped></style>
