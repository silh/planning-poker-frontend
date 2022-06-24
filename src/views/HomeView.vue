<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <main>
    <div>
      <RouterLink :to="{ name: 'create-game' }">
        Create new poker game
      </RouterLink>
    </div>
    <div>
      <RouterLink :to="{ name: 'games' }"> List all games </RouterLink>
    </div>
  </main>
</template>
