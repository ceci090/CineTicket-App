<template>
  <div class="home-container">
    <img src="../assets/logo.jpeg" alt="CineTicket Logo" class="home-logo" />
    <h1>¡Bienvenido a CineTicket!</h1>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style>
.home-container {
  display: flex;
  flex-direction: column; /* apila imagen y texto verticalmente */
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #F0F4F8;
}

.home-container h1 {
  font-size: 20px;
  text-align: center;
  color: #1C1C1C;
  font-weight: 600;
  line-height: 1.4;
  margin-top: 15px; /* espacio debajo de la imagen */
}

.home-logo {
  width: 80px; /* tamaño pequeño */
  height: auto;
  border-radius: 8px; /* opcional */
}
</style>
