<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Login</h2>
      <input v-model="username" placeholder="Usuario" />
      <input v-model="password" type="password" placeholder="Contraseña" />
      <button @click="login" :disabled="loading">
        {{ loading ? "Ingresando..." : "Iniciar Sesión" }}
      </button>
      <p class="mensaje" v-if="mensaje">{{ mensaje }}</p>
    </div>

    <!-- Logo fuera de la caja, abajo centrado -->
    <img src="../assets/logo.jpeg" alt="CineTicket Logo" class="bottom-logo" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      mensaje: "",
      loading: false
    };
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        this.mensaje = "Por favor completa todos los campos";
        return;
      }

      this.loading = true;
      this.mensaje = "";

      try {
        const response = await axios.post("/api/Users/login", {
          username: this.username,
          password: this.password
        });

        console.log(response.data); // datos del usuario

        this.$router.push("/home");
      } catch (error) {
        console.error(error);
        this.mensaje =
          error.response && error.response.status === 401
            ? "Usuario o contraseña incorrectos"
            : "Error de conexión. Intenta de nuevo";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style src="../styles/login.css"></style>

<style>
.login-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
}

.login-container {
  width: 90%;
  max-width: 360px;
  padding: 30px;
  background: linear-gradient(145deg, #1A0949, #2E0B70);
  border-radius: 25px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bottom-logo {
  width: 50px;       /* tamaño pequeño */
  height: auto;
  position: absolute;
  bottom: 20px;      /* distancia desde el fondo */
  left: 50%;
  transform: translateX(-50%); /* centrar horizontalmente */
}
</style>
