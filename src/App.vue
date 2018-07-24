<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <span><router-link to="/">Home</router-link></span>
      <span><router-link to="/graphs">Graphs</router-link></span> <!-- <i v-if == aktivna ruta> -->
      <span><router-link to="/currencies">Currencies</router-link></span>
      <span>Vuex</span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
