<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: currentTab === 'login' }"
              @click="currentTab = 'login'"
              href="#"
            >
              Login
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: currentTab === 'register' }"
              @click="currentTab = 'register'"
              href="#"
            >
              Registrar-se
            </a>
          </li>
        </ul>
        <div class="tab-content">
          <div v-if="currentTab === 'login'">
            <LoginPage @loginSuccess="emitLoginSuccess" @switchTab="currentTab = $event" />  <!-- Ouvir o evento de alternância -->
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
    return {
      currentTab: 'login'  // Abre inicialmente na aba de Login
    };
  },
  methods: {
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