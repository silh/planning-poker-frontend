<script setup>
import { ref, onMounted } from "vue";
import http from "../http-commons.js";

const games = ref([]);

const fetchGames = async () => {
  let resp = await http.get("/games");
  games.value = resp.data;
};

onMounted(fetchGames);
</script>

<template>
  <div>
    <div v-for="game in games" :key="game">{{ game }}</div>
  </div>
</template>

<style scoped></style>
