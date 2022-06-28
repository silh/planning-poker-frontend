<script setup>
import http from "../http-commons.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { GameService } from "../services/GameService.js";

const props = defineProps({
  gameId: String,
});
const router = useRouter();

const game = ref({});
const playerName = ref("");

const error = ref("");

async function send() {
  if (!playerName.value) {
    error.value = "Player name cannot be empty.";
    return;
  }
  let createPlayerResp = await http.post("/signup", {
    name: playerName.value,
  });
  await GameService.put(props.gameId, {
    playerId: createPlayerResp.data.id,
  });
  router.push({
    name: "game",
    params: {
      gameId: Number(props.gameId),
      playerId: Number(createPlayerResp.data.id),
    },
  });
}

const fetchGame = async () => {
  game.value = await GameService.get(props.gameId);
};

onMounted(fetchGame);
</script>

<template>
  <main>
    <div>Join a game '{{ game.name }}'.</div>
    <div>
      <label id="player-name">Player name:</label>
      <input v-model="playerName" id="player-name" />
    </div>
    <button @click="send">Join</button>
    <div v-if="error">{{ error }}</div>
  </main>
</template>

<style scoped></style>
