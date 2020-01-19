<template>
  <div id="app">
    <div class="topTab">
      <tabPan></tabPan>
    </div>
    <router-view />
  </div>
</template>

<script>
import tabPan from "./components/tabPan.vue";
export default {
  components: {
    tabPan
  },
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

 .topTab{
   margin-top: 0%
}
</style>
