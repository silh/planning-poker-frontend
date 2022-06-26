<script setup>
import { onMounted, ref } from "vue";
import http from "../http-commons";

const props = defineProps({
  // both of the below are actually numbers, need to address that.
  gameId: String,
  playerId: String, // this is not desirable
});

const game = ref({});

const fetchGame = async () => {
  let resp = await http.get(`/games/${props.gameId}`);
  game.value = resp.data;
};

const vote = async (v) => {
  await http.post(`/games/${props.gameId}/vote`, {
    playerId: parseInt(props.playerId),
    vote: v,
  });
  await fetchGame();
};

onMounted(fetchGame);
</script>

<template>
  <div v-if="game">
    <div>Game: {{ game.name }}</div>
    <div>Players:</div>
    <div v-for="player in game.players" :key="player">
      {{ player.name }} - {{ player.vote }}
    </div>
    <div>
      <button @click="vote(1)">1</button>
      <button @click="vote(2)">2</button>
    </div>
  </div>
</template>

<style scoped></style>
