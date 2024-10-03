<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" @click="goBack" href="#">Gestão de Pessoas</a>
        <div class="d-flex">
          <button v-if="isLoggedIn" @click="confirmLogout" class="btn btn-outline-danger">
            Sair
          </button>
        </div>
      </div>
    </nav>
    <router-view @loginSuccess="handleLoginSuccess"></router-view> <!-- Ouvir o evento de login -->
  </div>

  <div class="modal fade" id="confirmLogoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Sair</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Tem certeza que deseja sair?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Cancelar
          </button>
          <button type="button" class="btn btn-danger" @click="logout" data-bs-dismiss="modal">
            Sair
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      isLoggedIn: false,
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
    },
    goBack() {
      this.$router.push('/users');
    },
    confirmLogout() {
      const modal = new Modal(document.getElementById('confirmLogoutModal'));
      modal.show();  // Exibe o modal de confirmação
    },
  }
};
</script>

<style>
/* Adicione estilos personalizados se necessário */
</style>