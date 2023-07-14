<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { GameService } from "../services/GameService";
import { useUserStore } from "../stores/user";

const props = defineProps({
  gameId: String,
  playerId: String,
});

const router = useRouter();

const userStore = useUserStore();

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

const vote = async (v) => {
  await GameService.vote(props.gameId, {
    playerId: parseInt(userStore.currentUser.id),
    vote: v,
  });
};

let ws;

onMounted(async () => {
  if (!userStore.currentUser) {
    router.push({ name: "create-game" });
    return;
  }
  ws = new WebSocket("ws://localhost:8080/ws");
  ws.onopen = (event) => {
    console.log(`Connected: ${event}`);
  };

  ws.onmessage = (event) => {
    console.log(`Received a message: ${event}`);
  };
  // ws.
});
</script>

<template>
  <div v-if="game">
    <div>Game: {{ game.name }}</div>
    <div>Players:</div>
    <div v-for="player in game.players" :key="player">
      {{ player.id === userStore.currentUser.id ? "You" : player.name }} -
      {{ player.vote }}
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
