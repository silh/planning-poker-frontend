<script setup>
import http from "../http-commons.js";
import { ref } from "vue";

const gameName = ref("");

const emit = defineEmits("created");

async function send() {
  await http.post("/games", {
    gameName: gameName.value,
    creator: {
      id: 11, // TODO this is a placeholder for real request.
      name: "aName",
    },
  });
  emit("created");
}
</script>

<template>
  <main>
    <div>Start a new game.</div>
    <label id="game-name">Game name:</label>
    <input v-model="gameName" id="game-name" />
    <button @click="send">Create a game</button>
  </main>
</template>

<style scoped>
</style>
