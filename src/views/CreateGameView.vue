<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { GameService } from "../services/GameService.js";
import { useUserStore } from "../stores/user.js";
import { UserService } from "../services/UserService.js";

const router = useRouter();
const userStore = useUserStore();

const gameName = ref("");
const playerName = ref("");

const error = ref("");

async function send() {
  if (!userStore.currentUser) {
    if (!playerName.value) {
      error.value = "Player name cannot be empty.";
      return;
    }
    const user = await UserService.create(playerName.value);
    userStore.save(user); // TODO maybe that should be part of the action itself?
  }
  if (!gameName.value) {
    error.value = "Game name cannot be empty.";
    return;
  }
  const userId = userStore.currentUser.id;
  const game = await GameService.create({
    gameName: gameName.value,
    creatorId: userId,
  });
  router.push({
    name: "game",
    params: { gameId: game.id },
  });
}
</script>

<template>
  <main>
    <div>Start a new game.</div>
    <div v-if="!userStore.currentUser">
      <label id="player-name">Player name:</label>
      <input v-model="playerName" id="player-name" />
    </div>
    <div>
      <label id="game-name">Game name:</label>
      <input v-model="gameName" id="game-name" />
    </div>
    <button @click="send">Create a game</button>
    <div v-if="error">{{ error }}</div>
  </main>
</template>

<style scoped></style>
