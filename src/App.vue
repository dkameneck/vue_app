<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div id="main">
      <ul id="nav">
        <li><router-link to="/">Vuex Loading</router-link></li>
        <li><router-link to="/graphs">Graphs</router-link></li> <!-- <i v-if == aktivna ruta> -->
        <li><router-link to="/currencies">Currencies</router-link></li>
        <li><router-link to="/vuex">Vuex</router-link></li>
      </ul>
      <router-view></router-view>
    </div>
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
  margin-top: 30px;
  width: 100%;
}
ul {
  margin: 0;
  padding: 10px;
  overflow: hidden;
  background-color: #008CBA;
}
li {
  display: inline;
  text-decoration: none;
  text-align: center;
  padding: 10px;
  margin: 0;
}
li a {
  color: white;
  text-decoration: none;
  padding: 10px;
}
li:hover {
    background-color: #017ba3;
}
li a.router-link-exact-active {
  background-color: #017ba3;
  padding: 10px;
}
button {
  color: white;
  background-color: #008CBA;
  padding: 10px;
  border: none;
  margin: 5px;
}
img {
  margin: 0px auto;
}
#main {
  width: 80%;
  margin: 0px auto;
}
table {
  margin: 0px auto;
  padding: 10px;
}
th {
  padding: 15px;
}
.tdHover:hover {
  background-color: #5987d1;
}
</style>
