<script setup>
import { onUnmounted, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { GameService } from "../services/GameService";

const props = defineProps({
  gameId: String,
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

let ws; // WebSocket
const vote = (value) => {
  ws.send(
    JSON.stringify({
      channel: "vote",
      vote: value,
    })
  );
};

onMounted(async () => {
  if (!userStore.currentUser) {
    router.push({ name: "create-game" });
    return;
  }
  game.value = await GameService.get(props.gameId);
  ws = new WebSocket(`ws://${window.location.host}/ws`);
  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        channel: "join",
        gameId: props.gameId,
        playerId: userStore.currentUser.id,
      })
    );
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    switch (data.channel) {
      case "join": {
        const newPlayer = data.player;
        game.value.players[newPlayer.id] = newPlayer;
        break;
      }
      case "leave": {
        delete game.value.players[data.playerId];
        break;
      }
      case "vote": {
        game.value.votes[data] = data.vote;
        break;
      }
      default:
        console.log(`Received a message: ${JSON.stringify(event)}`);
    }
  };
});

onUnmounted(async () => {
  if (ws) {
    ws.close();
  }
});
</script>

<template>
  <div v-if="game">
    <div>Game: {{ game.name }}</div>
    <div v-if="game.players">
      <div>Players:</div>
      <div
        v-for="[playerId, player] in Object.entries(game.players)"
        :key="playerId"
      >
        {{ player.name }}
        {{ player.id === userStore.currentUser.id ? "(You)" : "" }}, vote:
        {{ game.votes[playerId] ?? "-" }}
      </div>
    </div>

    <div>
      <button
        v-for="voteValue in voteValues"
        v-bind:key="voteValue"
        @click="vote(voteValue)"
      >
        {{ voteValue }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
