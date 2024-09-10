<!-- <template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import { testConnection } from './services/api';
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->

<template>
  <div id="app">
    <h1>Teste de Conexão com o Backend</h1>
    <button @click="testBackendConnection">Testar Conexão</button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { testConnection } from './services/api.js';

export default {
  data() {
    return {
      message: ''  // Armazena a mensagem de resposta do backend
    };
  },
  methods: {
    async testBackendConnection() {
      try {
        const response = await testConnection();
        this.message = response.data.message;  // Exibir a resposta do backend
      } catch (error) {
        this.message = 'Erro ao conectar ao backend';
      }
    }
  }
};
</script>

<style scoped>
/* Estilos simples para o layout */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 40px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>