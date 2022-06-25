<script setup>
import { onMounted, ref } from "vue";
import http from "../http-commons";

const props = defineProps({
  gameId: String,
  playerId: Number, // this is not desirable, also it should be number, we are getting string.
});

const game = ref({});

const fetchGame = async () => {
  let resp = await http.get(`/games/${props.gameId}`);
  game.value = resp.data;
};

const vote = async (v) => {
  await http.post(`/games/${props.gameId}/vote`, {
    playerId: props.playerId,
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
