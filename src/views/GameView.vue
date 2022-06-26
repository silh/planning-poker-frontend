<script setup>
import { onMounted, ref } from "vue";
import http from "../http-commons";

const props = defineProps({
  // both of the below are actually numbers, need to address that.
  gameId: String,
  playerId: String, // this is not desirable
});

const voteValues = [
  "0",
  "0.5",
  "1",
  "2",
  "3",
  "5",
  "8",
  "13",
  "20",
  "40",
  "100",
  "∞",
  "?",
  "☕",
];

const game = ref({});

const fetchGame = async () => {
  let resp = await http.get(`/games/${props.gameId}`);
  game.value = resp.data;
};

const vote = async (e) => {
  let v = e.target.textContent;
  console.log(v);
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
      <button
        v-for="voteValue in voteValues"
        v-bind:key="voteValue"
        @click="vote($event)"
      >
        {{ voteValue }}
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
