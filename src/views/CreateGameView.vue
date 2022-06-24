<script setup>
import http from "../http-commons.js";
import { ref } from "vue";
import { useRouter } from 'vue-router'

const router = useRouter();

const gameName = ref("");
const playerName = ref("");

const error = ref("");

async function send() {
  if (!gameName.value || !playerName.value) {
    error.value = "Game name and layer name cannot be empty.";
    return;
  }
  let resp = await http.post("/signup", {
    name: playerName.value,
  });
  await http.post("/games", {
    gameName: gameName.value,
    creator: {
      id: resp.data.id,
      name: "aName",
    },
  });
  router.push({ name: "games" });
}
</script>

<template>
  <main>
    <div>Start a new game.</div>
    <label id="player-name">Player name:</label>
    <input v-model="playerName" id="player-name" />
    <label id="game-name">Game name:</label>
    <input v-model="gameName" id="game-name" />
    <button @click="send">Create a game</button>
    <div v-if="error">{{ error }}</div>
  </main>
</template>

<style scoped>
</style>
