<template>
  <div id="app">
    <router-view />
    <!-- progress-bar-->
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$Progress.start();
    this.$router.beforeEach((to, from, next) => {
      this.$Progress.start();
      next();
    });
    this.$router.afterEach((to, from) => {
      this.$Progress.finish();
    });
  },
  mounted() {
    this.$Progress.finish();
  }
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
* {
  text-decoration: none;
}
</style>
