<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Gestão de Usuários</a>
        <div class="d-flex">
          <button
            v-if="isLoggedIn"
            @click="logout"
            class="btn btn-outline-danger"
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
    <router-view @loginSuccess="handleLoginSuccess"></router-view> <!-- Ouvir o evento de login -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false
    };
  },
  created() {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.isLoggedIn = true;  // Se houver token, significa que o usuário está logado
    }
  },
  methods: {
    handleLoginSuccess() {
      this.isLoggedIn = true;  // Atualiza o estado quando o login for bem-sucedido
    },
    logout() {
      // Remover o token do localStorage
      localStorage.removeItem('jwt');
      this.isLoggedIn = false;
      // Redirecionar para a página de login
      this.$router.push('/auth');
    }
  }
};
</script>

<style>
/* Adicione estilos personalizados se necessário */
</style>