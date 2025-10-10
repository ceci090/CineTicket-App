<template>
  <div class="home-container">
    <!-- 🔹 Barra de navegación -->
    <nav class="navbar">
      <div class="logo">
        <img src="../assets/logo.jpeg" alt="CineTicket Logo" />
        <span>CineTicket</span>
      </div>
      <ul class="menu">
        <li><router-link to="/cartelera">Cartelera</router-link></li>
        <li><router-link to="/estrenos">Estrenos</router-link></li>
        <li><a href="#" @click.prevent="logout">Cerrar sesión</a></li>
      </ul>
    </nav>

    <!-- 🔹 Contenido principal -->
    <div class="content">
      <h1>¡Bienvenido a CineTicket!</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    logout() {
      // Eliminar datos de sesión
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      // Redirigir al login
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* 🔹 Estilos generales */
.home-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f4f8;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 4vw; /* tamaño de texto relativo al ancho de pantalla */
}

/* 🔹 Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1c1c1c;
  color: #fff;
  padding: 2vh 4vw; /* padding proporcional a la pantalla */
}

.navbar .logo {
  display: flex;
  align-items: center;
  gap: 2vw; /* separación relativa entre elementos */
}

.navbar .logo img {
  width: 8vw;   /* ancho relativo al ancho de pantalla */
  height: auto;
  border-radius: 1vw;
}

.navbar .logo span {
  font-size: 4.5vw; /* tamaño de texto relativo */
  font-weight: 600;
}

.menu {
  list-style: none;
  display: flex;
  gap: 4vw; /* separación proporcional */
  margin: 0;
}

.menu li a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 4vw;
  transition: color 0.3s;
}

.menu li a:hover {
  color: #f4b400;
}

/* 🔹 Contenido central */
.content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2vh 4vw;
}

.content h1 {
  font-size: 6vw;  /* tamaño adaptable al ancho de pantalla */
  font-weight: 600;
  color: #1c1c1c;
  text-align: center;
}

/* 🔹 Media query para pantallas más grandes (tablets/PCs) */
@media (min-width: 1080px) {
  .home-container {
    font-size: 16px;
  }
  .navbar .logo span,
  .menu li a,
  .content h1 {
    font-size: initial; /* vuelve al tamaño fijo si es necesario */
  }
  .navbar {
    padding: 10px 20px;
  }
  .navbar .logo img {
    width: 40px;
  }
  .menu {
    gap: 20px;
  }
}
</style>
