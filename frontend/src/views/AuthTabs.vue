<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link" :class="{ active: currentTab === 'login' }" @click="switchTab('login')" href="#">
              Login
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ active: currentTab === 'register' }" @click="switchTab('register')" href="#">
              Registrar-se
            </a>
          </li>
        </ul>
        <div class="tab-content">
          <div v-if="currentTab === 'login'">
            <LoginPage @loginSuccess="emitLoginSuccess" @switchTab="currentTab = $event" />
            <!-- Ouvir o evento de alternância -->
          </div>
          <div v-if="currentTab === 'register'">
            <RegisterPage />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';

export default {
  components: {
    LoginPage,
    RegisterPage
  },
  data() {
    document.title = 'Login';
    return {
      currentTab: 'login'  // Abre inicialmente na aba de Login
    };
  },
  methods: {
    switchTab(tab) {
      this.currentTab = tab;
      this.updateTitle();  // Atualizar o título quando a aba mudar
    },
    updateTitle() {
      if (this.currentTab === 'login') {
        document.title = 'Login';
      } else if (this.currentTab === 'register') {
        document.title = 'Registrar-se';
      }
    },
    emitLoginSuccess() {
      this.$emit('loginSuccess');  // Reemitir o evento para o App.vue
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}

.nav-tabs {
  margin-bottom: 20px;
}
</style>