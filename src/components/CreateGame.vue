<script setup>
import http from "../http-commons.js";
import { ref } from "vue";

const gameName = ref("");

const emit = defineEmits("created");

async function send() {
  let data = {
    gameName: gameName.value,
    creator: { // TODO this is a placeholder for real request.
      id: 11,
      name: "aName",
    },
  };
  console.log(data);
  await http.post("/games", data);
  emit("created");
}
</script>

<template>
  <div>
    <label id="game-name">Game name:</label>
    <input v-model="gameName" id="game-name" />
    <button @click="send">Create a game</button>
  </div>
</template>

<style scoped>
</style>
