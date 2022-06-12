<script setup>
const props = defineProps({
  games: Array,
});
</script>

<template>
  <div>
    <div v-for="game in props.games" :key="game">{{ game }}</div>
  </div>
</template>

<style scoped></style>
