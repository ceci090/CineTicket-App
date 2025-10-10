<template>
  <div class="login-page">
    <div class="login-container">
      <!-- LOGIN Y REGISTRO dentro del mismo transition -->
      <transition name="fade" mode="out-in">
        <!-- LOGIN -->
        <div v-if="!mostrarRegistro" key="login">
          <h2>Iniciar Sesión</h2>
          <input v-model="username" placeholder="Usuario" />
          <input v-model="password" type="password" placeholder="Contraseña" />
          <button @click="login" :disabled="loading">
            {{ loading ? "Ingresando..." : "Iniciar Sesión" }}
          </button>
          <p class="mensaje" v-if="mensaje">{{ mensaje }}</p>

          <p class="registro-texto">
            ¿No tienes cuenta?
            <span @click="mostrarRegistro = true" class="link">Regístrate aquí</span>
          </p>
        </div>

        <!-- REGISTRO -->
        <div v-else key="registro">
          <h2>Crear Cuenta</h2>
          <input v-model="nuevoUsuario" placeholder="Usuario" />
          <input v-model="nuevaContraseña" type="password" placeholder="Contraseña" />
          <select v-model="rol" class="select-rol">
            <option disabled value="">Selecciona un rol</option>
            <option value="Usuario">Usuario</option>
            <option value="Administrador">Administrador</option>
          </select>
          <input
            v-if="rol === 'Administrador'"
            v-model="adminCode"
            type="password"
            placeholder="Código de administrador"
          />
          <button @click="registrar" :disabled="loading">
            {{ loading ? "Registrando..." : "Crear cuenta" }}
          </button>
          <p class="mensaje" v-if="mensaje">{{ mensaje }}</p>

          <p class="registro-texto">
            ¿Ya tienes una cuenta?
            <span @click="mostrarRegistro = false" class="link">Inicia sesión</span>
          </p>
        </div>
      </transition>
    </div>

    <!-- Logo -->
    <img src="../assets/logo.jpeg" alt="CineTicket Logo" class="bottom-logo" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // login
      username: "",
      password: "",
      // registro
      nuevoUsuario: "",
      nuevaContraseña: "",
      rol: "",
      adminCode: "",
      // estados
      mensaje: "",
      loading: false,
      mostrarRegistro: false,
    };
  },
  methods: {
    // LOGIN
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
          password: this.password,
        });

        console.log("Usuario logueado:", response.data);

        const rol = response.data.role || "Usuario";

        // 🔹 Guardamos datos del usuario
        localStorage.setItem("userRole", rol);
        localStorage.setItem("username", this.username);

        // 🔹 Redirigir al home (mismo para todos)
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
    },

    // REGISTRO
    async registrar() {
      if (!this.nuevoUsuario || !this.nuevaContraseña || !this.rol) {
        this.mensaje = "Por favor completa todos los campos";
        return;
      }

      if (this.rol === "Administrador" && !this.adminCode) {
        this.mensaje = "Ingresa el código de administrador";
        return;
      }

      this.loading = true;
      this.mensaje = "";

      try {
        const response = await axios.post("/api/Users/register", {
          username: this.nuevoUsuario,
          password: this.nuevaContraseña,
          role: this.rol,
          adminCode: this.rol === "Administrador" ? this.adminCode : "",
        });

        console.log("Registro exitoso:", response.data);
        this.mensaje = "¡Registro exitoso! Ahora puedes iniciar sesión.";
        this.mostrarRegistro = false;
      } catch (error) {
        console.error(error);
        this.mensaje =
          error.response && error.response.status === 400
            ? error.response.data
            : "Error al registrar. Intenta de nuevo";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
/* ANIMACIONES */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* CONTENEDOR GENERAL */
.login-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at top, #2E0B70, #1A0949 80%);
  padding: 2vh 4vw; /* padding relativo */
  font-size: 4vw;   /* texto escalable según ancho de pantalla */
}

/* FORMULARIO */
.login-container {
  width: 90vw;         /* ancho relativo */
  max-width: 380px;    /* límite para pantallas más grandes */
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 5vw;  /* proporcional a pantalla */
  padding: 5vh 4vw;    /* padding escalable */
  box-shadow: 0 2vh 3vh rgba(0, 0, 0, 0.5); /* sombras proporcionales */
  text-align: center;
  animation: fadeIn 0.8s ease;
}

.login-container h2 {
  color: #fff;
  margin-bottom: 3vh; /* separación relativa */
  font-size: 6vw;      /* tamaño escalable */
  letter-spacing: 0.3vw;
}

.login-container input,
.select-rol {
  width: 100%;
  padding: 1.5vh 2vw;  /* padding proporcional */
  margin-bottom: 2vh;
  border: none;
  border-radius: 2vw;
  font-size: 4vw;      /* texto escalable */
  background-color: rgba(255, 255, 255, 0.9);
  outline: none;
  transition: 0.3s;
}

.login-container input:focus,
.select-rol:focus {
  background-color: #fff;
  box-shadow: 0 0 1vh #ffcc00;
}

.select-rol {
  color: #333;
}

/* BOTÓN */
.login-container button {
  width: 100%;
  padding: 1.5vh 0;
  border: none;
  border-radius: 2vw;
  background-color: #ffcc00;
  color: #1A0949;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 4vw;
}

.login-container button:hover {
  background-color: #ffd633;
  transform: scale(1.03);
}

/* MENSAJES Y TEXTOS */
.mensaje,
.registro-texto {
  color: #fff;
  font-size: 3.5vw;
  margin-top: 1.5vh;
  text-align: center;
}

.link {
  color: #ffcc00;
  cursor: pointer;
  font-weight: 600;
  text-decoration: underline;
  font-size: 4vw;
}

/* LOGO */
.bottom-logo {
  width: 15vw;       /* proporcional al ancho de pantalla */
  height: auto;
  position: absolute;
  bottom: 2vh;
  left: 50%;
  transform: translateX(-50%);
  filter: drop-shadow(0 0 1vh rgba(255, 255, 255, 0.4));
}

/* ANIMACIÓN */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4vh);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Media query para pantallas más grandes (tablets/PCs) */
@media (min-width: 1080px) {
  .login-page {
    font-size: 16px;
  }
  .login-container h2,
  .login-container input,
  .login-container button,
  .mensaje,
  .registro-texto,
  .link {
    font-size: initial;
    padding: 12px;
    border-radius: 10px;
  }
  .bottom-logo {
    width: 70px;
  }
}
</style>
