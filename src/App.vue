<template>
  <!-- 🔹 Aquí Vue Router inyectará LoginForm o Home según la ruta -->
  <router-view></router-view>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
}
</style>
