<script setup>
import { onMounted, ref } from "vue";
import { GameService } from "../services/GameService";

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
  game.value = await GameService.get(props.gameId);
};

const vote = async (v) => {
  await GameService.vote(props.gameId, {
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
        @click="vote($event.target.textContent)"
      >
        {{ voteValue }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
