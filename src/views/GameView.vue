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

// TODO this should be a enum
// const gameStates = ["NOT_STARTED", "VOTING", "DISCUSSION", "FINISHED"];
const nextStateMap = new Map();
nextStateMap["NOT_STARTED"] = "VOTING";
nextStateMap["VOTING"] = "DISCUSSION";
nextStateMap["DISCUSSION"] = "NOT_STARTED";

const game = ref({});
let localVote; // We will keep a vote in this place to be able to show our vote event though the actual vote event doesn't have it

let ws; // WebSocket

// functions
const vote = (value) => {
  localVote = value;
  ws.send(
    JSON.stringify({
      channel: "vote",
      vote: value,
    })
  );
};

const toNextState = () => {
  // TODO this is unsafe
  const nextState = nextStateMap[game.value.state];
  ws.send(
    JSON.stringify({
      channel: "transition",
      nextState,
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
        // We know the vote value for ourselves and can set it here
        // even though the event doesn't have the actual value
        // it might be better to move that logic to the backend
        if (data.playerId == userStore.currentUser.id) {
          game.value.votes[data.playerId] = localVote;
          localVote = undefined;
        } else {
          game.value.votes[data.playerId] = "*";
        }
        break;
      }
      case "transition": {
        localVote = undefined; // clean on any transition
        game.value.state = data.targetState;
        game.value.votes = data.votes;
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

    <div>
      <button @click="toNextState">To {{ nextStateMap[game.state] }}</button>
    </div>
  </div>
</template>

<style scoped></style>
