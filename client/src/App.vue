<template>
  <div id="app">
    <v-tabs class="tab" color="#7785cb">
      <v-tab  to="/"><h2>Post</h2></v-tab>
      <v-tab to="/list"><h2>List of posts</h2></v-tab>
    </v-tabs>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.tab {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  
}
h2 {
  font-weight: bold;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  font-family: "Quicksand", sans-serif;
  // background-color: #fbab7e;
  // background-image: linear-gradient(
  //   62deg,
  //   #fbab7e 0%,
  //   #f7ce68 50%,
  //   #f7e385 100%
  // );
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
