<template>
  <div>
    <div>Game with ID {{game.id}}.</div>
    <div>Creator: {{game.creator.name}}</div>
    <div>State: {{game.state}}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Game from '@/interfaces/Game';
import GameService from '@/services/GameService';

export default Vue.extend({
  name: 'GameView',
  props: {
    gameId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      game: {} as Game,
    };
  },
  created() {
    GameService.getGame(this.gameId)
      .then((game) => {
        this.game = game;
      });
  },
});
</script>

<style scoped lang="scss">

</style>
