<template>
  <div>
    <h3 class="card-title text-center">Login</h3>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="email" class="form-control" id="email" placeholder="Digite seu email" required />
      </div>
      <div class="form-group position-relative">
        <label for="password">Senha</label>
        <div class="input-group" id="div-inpu-group">
          <div class="input-group-addon" id="div-password">
            <input :type="passwordVisible ? 'text' : 'password'" v-model="password" class="form-control" id="password"
              placeholder="Digite sua senha" required>
          </div>
          <div id="div-button-show-hide-icon">
            <button type="button" class="btn btn-outline-secondary" id="btn-show-hide" @click="togglePassword">
              <i v-if="passwordVisible" class="fa fa-eye-slash"></i>
              <i v-else class="fa fa-eye"></i>
            </button>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-block" id="btn-confirm">Entrar</button>
    </form>
    <p class="mt-3 text-center">
      Não tem uma conta?
      <a href="#" @click.prevent="switchToRegister">Registrar-se aqui</a> <!-- Evento para alternar a aba -->
    </p>
    <p v-if="message" class="alert alert-danger mt-3">{{ message }}</p>
  </div>
</template>

<script>
import { login } from '@/services/api';

export default {
  data() {
    return {
      email: '',
      password: '',
      message: '',
      passwordVisible: false  // Controlar visibilidade da senha
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await login({ email: this.email, password: this.password });
        const token = response.data.token;

        // Armazenar o token no localStorage
        localStorage.setItem('jwt', token);

        // Emitir o evento para notificar que o login foi bem-sucedido
        this.$emit('loginSuccess');

        // Redirecionar para a página de usuários
        this.$router.push('/users');
      } catch (error) {
        this.message = 'Login falhou. Verifique suas credenciais.';
      }
    },
    switchToRegister() {
      this.$emit('switchTab', 'register');  // Emitir o evento para alternar a aba
    }
    ,
    togglePassword() {
      this.passwordVisible = !this.passwordVisible;  // Alterna entre mostrar e esconder a senha
    }
  }
};
</script>

<style scoped>
input[type=password]::-ms-reveal,
input[type=password]::-ms-clear {
  display: none;
}

#btn-confirm {
  margin-top: 10px;
}

#div-password {
  min-width: 100%;
}

#div-password input {
  padding-right: 45px;
}

#div-button-show-hide-icon {
  margin-left: -45px;
}

#div-button-show-hide-icon {
  background: none;
}

#btn-show-hide {
  border-color: transparent;
}

#btn-show-hide:hover {
  color: #6c757d;
  background-color: transparent;
  border-color: transparent;
}

#div-inpu-group {
  flex-wrap: nowrap;
  align-items: center;
}
</style>