<script setup>
import CreateGame from "@/components/CreateGame.vue";
import ListGamesNames from "@/components/ListGamesNames.vue";
import { ref, onMounted } from "vue";
import http from "../http-commons.js";

const games = ref([]);

const fetchGames = async () => {
  let resp = await http.get("/games");
  games.value = resp.data;
};

onMounted(fetchGames);

const onGameCreated = fetchGames;
</script>

<template>
  <main>
    <CreateGame @created="onGameCreated" />
    <ListGamesNames :games="games" />
  </main>
</template>
