<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-center">Editar Usuário</h3>
            <form @submit.prevent="handleEdit">
              <div class="form-group">
                <label for="name">Nome</label>
<<<<<<< HEAD
                <input
                  type="text"
                  v-model="name"
                  class="form-control"
                  id="name"
                  placeholder="Digite o nome"
                  required
                />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  id="email"
                  placeholder="Digite o email"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
=======
                <input type="text" v-model="name" class="form-control" id="name" placeholder="Digite o nome" required />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" v-model="email" class="form-control" id="email" placeholder="Digite o email"
                  required />
              </div>
              <button type="submit" class="btn btn-primary btn-block" :disabled="loading" id="btn-confirm">
>>>>>>> develop
                <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Salvar Alterações
              </button>
            </form>

            <!-- Mostrar a mensagem de sucesso e redirecionamento -->
            <p v-if="message" class="alert alert-success mt-3">
              {{ message }} <br />
              Você será redirecionado para a lista de usuários em {{ countdown }} segundos...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserById, updateUser } from '@/services/api';

export default {
  data() {
    return {
      name: '',
      email: '',
      message: '',
      loading: false,
      countdown: 3  // Tempo de espera antes do redirecionamento
    };
  },
  async created() {
    const userId = this.$route.params.id;
    try {
      this.loading = true;
      const response = await getUserById(userId);
      this.name = response.data.name;
      this.email = response.data.email;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.error('Erro ao buscar o usuário:', error);
    }
  },
  methods: {
    async handleEdit() {
      const userId = this.$route.params.id;
      try {
        this.loading = true;
        await updateUser(userId, { name: this.name, email: this.email });
        this.message = 'Usuário atualizado com sucesso!';
        this.loading = false;

        // Iniciar contagem regressiva para redirecionamento
        this.startCountdown();
      } catch (error) {
        this.loading = false;
        console.error('Erro ao atualizar o usuário:', error);
      }
    },
    startCountdown() {
      const interval = setInterval(() => {
        if (this.countdown > 1) {
          this.countdown--;
        } else {
          clearInterval(interval);  // Parar o intervalo quando a contagem terminar
          this.$router.push('/users');  // Redirecionar para a lista de usuários
        }
      }, 1000);  // Contagem regressiva a cada 1 segundo
    }
  }
};
</script>
<<<<<<< HEAD
=======

<style scoped>
#btn-confirm {
  margin-top: 10px;
}
</style>
>>>>>>> develop
