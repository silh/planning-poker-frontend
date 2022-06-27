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
    <div v-if="games.length === 0">
      There are no games at the moment.
      <router-link :to="{ name: 'create-game' }">
        Would you like to start one?
      </router-link>
    </div>
    <div v-else>
      <router-link
        v-for="game in games"
        v-bind:key="game.id"
        :to="{ name: 'join-game', params: { gameId: game.id } }"
      >
        {{ game.name }}
      </router-link>
    </div>
  </div>
</template>

<style scoped></style>
