<template>
  <div>
    <!-- Exibir este bloco de HTML apenas se o usuário estiver logado -->
    <div v-if="isLoggedIn">
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <!-- Conteúdo específico para quando o usuário está logado -->
                <h3 class="card-title text-center">Adicionar Pessoa</h3>
                <form @submit.prevent="handleRegister">
                  <div class="form-group">
                    <label for="name">Nome</label>
                    <input type="text" v-model="name" class="form-control" id="name" placeholder="Digite seu nome"
                      required />
                  </div>
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" v-model="email" class="form-control" id="email" placeholder="Digite seu email"
                      required />
                  </div>
                  <div class="form-group position-relative">
                    <label for="password">Senha</label>
                    <div class="input-group" id="div-inpu-group">
                      <div class="input-group-addon" id="div-password">
                        <input :type="passwordVisible ? 'text' : 'password'" v-model="password" class="form-control"
                          id="password" placeholder="Digite sua senha" required>
                      </div>
                      <div id="div-button-show-hide-icon">
                        <button type="button" class="btn btn-outline-secondary btn-show-hide" @click="togglePassword">
                          <i v-if="passwordVisible" class="fa fa-eye-slash"></i>
                          <i v-else class="fa fa-eye"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="form-group position-relative">
                    <label for="confirmPassword">Confirmar Senha</label>
                    <div class="input-group" id="div-inpu-group">
                      <div class="input-group-addon" id="div-password">
                        <input :type="passwordVisible ? 'text' : 'password'" v-model="confirmPassword"
                          class="form-control" id="confirmPassword" placeholder="Digite sua senha" required>
                      </div>
                      <div id="div-button-show-hide-icon">
                        <button type="button" class="btn btn-outline-secondary btn-show-hide" @click="togglePassword">
                          <i v-if="passwordVisible" class="fa fa-eye-slash"></i>
                          <i v-else class="fa fa-eye"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div id="div-buttons">
                    <div>
                      <button type="submit" class="btn btn-primary btn-block">Adicionar</button>
                    </div>
                    <div>
                      <button class="btn btn-secondary btn-block" @click.stop="goBack">Voltar</button>
                    </div>
                  </div>
                </form>
                <!-- <p v-if="message" class="alert alert-danger mt-3">{{ message }}</p> -->
                <FlashMessage v-if="flashMessage" :message="flashMessage.message" :type="flashMessage.type" @clearFlashMessage="flashMessage = null" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bloco padrão para registro de usuários quando não estiver logado -->
    <div v-else>
      <h3 class="card-title text-center">Registrar-se</h3>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="name">Nome</label>
          <input type="text" v-model="name" class="form-control" id="name" placeholder="Digite seu nome" required />
        </div>
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
              <button type="button" class="btn btn-outline-secondary btn-show-hide" @click="togglePassword">
                <i v-if="passwordVisible" class="fa fa-eye-slash"></i>
                <i v-else class="fa fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="form-group position-relative">
          <label for="confirmPassword">Confirmar Senha</label>
          <div class="input-group" id="div-inpu-group">
            <div class="input-group-addon" id="div-password">
              <input :type="passwordVisible ? 'text' : 'password'" v-model="confirmPassword" class="form-control"
                id="confirmPassword" placeholder="Digite sua senha" required>
            </div>
            <div id="div-button-show-hide-icon">
              <button type="button" class="btn btn-outline-secondary btn-show-hide" @click="togglePassword">
                <i v-if="passwordVisible" class="fa fa-eye-slash"></i>
                <i v-else class="fa fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-block btn-confirm">Registrar-se</button>
      </form>
      <!-- <p v-if="message" class="alert alert-danger mt-3">{{ message }}</p> -->
      <FlashMessage v-if="flashMessage" :message="flashMessage.message" :type="flashMessage.type" @clearFlashMessage="flashMessage = null" />
    </div>
  </div>
</template>

<script>
import FlashMessage from '@/components/FlashMessage.vue';
import { createUser } from '@/services/api';

export default {
  components: {
    FlashMessage
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      message: '',
      passwordVisible: false,  // Controlar visibilidade da senha
      isLoggedIn: false,  // Indica se o usuário está logado
      flashMessage: null,  // Armazenar a flash message
    };
  },
  created() {
    // Verificar se o token JWT existe no localStorage
    const token = localStorage.getItem('jwt');
    if (token) {
      this.isLoggedIn = true;  // Se houver token, significa que o usuário está logado
    } else {
      this.$router.push('/auth');
    }
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {  // Validação de senhas iguais no frontend
        // this.message = 'As senhas não coincidem!';
        this.showFlashMessage('As senhas não coincidem!', 'danger');
        return;
      }

      try {
        await createUser({
          name: this.name,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
        });

        this.showFlashMessage('Usuário registrado com sucesso!', 'success');

        // Redirecionar para a lista de usuários se estiver logado, ou para login após o registro
        if (this.isLoggedIn) {
          this.$router.push('/users');
        } else {
          this.$router.push('/login');
        }
      } catch (error) {
        // this.message = 'Falha no registro. Tente novamente.';
        this.showFlashMessage('Falha no registro. Tente novamente.', 'danger');
      }
    }
    ,
    togglePassword() {
      this.passwordVisible = !this.passwordVisible;  // Alterna entre mostrar e esconder a senha
    },
    goBack() {
      this.$router.push('/users');
    },
    showFlashMessage(message, type) {
      this.flashMessage = { message, type };
    }
  }
};
</script>

<style scoped>
input[type=password]::-ms-reveal,
input[type=password]::-ms-clear {
  display: none;
}

input[type=confirmPassword]::-ms-reveal,
input[type=confirmPassword]::-ms-clear {
  display: none;
}

/* Estilos para alinhar o botão de espiar corretamente */
.input-group .input-group-append button {
  border-left: none;
}

.btn-confirm {
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

.btn-show-hide {
  border-color: transparent;
}

.btn-show-hide:hover {
  color: #6c757d;
  background-color: transparent;
  border-color: transparent;
}

#div-inpu-group {
  flex-wrap: nowrap;
  align-items: center;
}

#div-buttons {
  display: inline-flex;
}

#div-buttons div {
  margin-right: 10px;
  margin-top: 10px;
}
</style>