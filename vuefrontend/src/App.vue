<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './components/Login.vue'

export default {
  name: 'app',
  components: {
    Login,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 150px;
}
section {
  margin: 3em auto;
}
</style>
