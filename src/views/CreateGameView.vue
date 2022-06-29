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
  if (!gameName.value || !playerName.value) { // FIXME this check is incorrect when storing user in localStorage
    error.value = "Game name and player name cannot be empty.";
    return;
  }
  let user = await UserService.signup(playerName);
  userStore.save(user); // TODO maybe that should be part of the action itself?
  let createGameResp = await GameService.create({
    gameName: gameName.value,
    creatorId: userStore.currentUser.id,
  });
  router.push({
    name: "game",
    params: {
      gameId: Number(createGameResp.id),
      playerId: Number(userStore.currentUser.id),
    },
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
