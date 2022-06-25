<script setup>
import http from "../http-commons.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const gameName = ref("");
const playerName = ref("");

const error = ref("");

async function send() {
  if (!gameName.value || !playerName.value) {
    error.value = "Game name and player name cannot be empty.";
    return;
  }
  let createPlayerResp = await http.post("/signup", {
    name: playerName.value,
  });
  let createGameResp = await http.post("/games", {
    gameName: gameName.value,
    creatorId: createPlayerResp.data.id,
  });
  router.push({
    name: "game",
    params: {
      gameId: createGameResp.data.id,
      playerId: parseInt(createPlayerResp.data.id),
    },
  });
}
</script>

<template>
  <main>
    <div>Start a new game.</div>
    <div>
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

<style scoped>
</style>
