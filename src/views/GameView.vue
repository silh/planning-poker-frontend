<script setup>
import { onMounted, ref } from "vue";
import http from "../http-commons";

const props = defineProps({
  gameId: String,
});

const game = ref({});

const fetchGame = async () => {
  let resp = await http.get(`/games/${props.gameId}`);
  game.value = resp.data;

};

onMounted(fetchGame);
</script>

<template>
  <div v-if="game">
    <div>{{ game.name }}</div>
    <div>Players:</div>
    <div v-for="(id, player) in game.players" :key="player">{{ player }}</div>
  </div>
</template>

<style scoped></style>
