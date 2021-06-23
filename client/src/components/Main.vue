<template>
  <div class="area">
    <v-card class="mx-auto card" elevation="24">
      <v-list-item three-line><Post /> </v-list-item>
    </v-card>
  </div>
</template>

<script>
import Post from "./Post.vue";

export default {
  name: "Main",
  components: {
    Post,
  }
};
</script>

<style scoped>
.area {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  min-width: 25vw;
  border-radius: 30px;
  background-color: #4158d0;
  background-image: linear-gradient(
    43deg,
    #4158d0 0%,
    #c850c0 46%,
    #ffcc70 100%
  );
  padding: 50px;
}
</style>
