<template>
  <div>
    <div>
      <label for="name">Name:</label>
      <input id=name type="text" v-model="name">
    </div>
    <div>
      <a href="" @click.prevent="createGame">Start Game</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GameService from '@/services/GameService';
import RouteNames from '@/router/RouteNames';

export default Vue.extend({
  name: 'CreateGame',
  data() {
    return {
      name: '',
      id: '',
    };
  },
  methods: {
    createGame() {
      GameService.createGame(this.name)
        .then((game) => {
          this.$router.push({ name: RouteNames.GAME, params: { gameId: game.id } });
        });
    },
  },
});
</script>

<style scoped lang="scss">

</style>
