<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Lista de Usuários</h3>
      <button class="btn btn-success" @click="addUser">Adicionar Usuário</button> <!-- Botão de adicionar usuário -->
    </div>
    <ul class="list-group">
      <li v-for="user in users" :key="user.id"
        class="list-group-item d-flex justify-content-between align-items-center">
        <span>{{ user.name }} - {{ user.email }}</span>
        <div id="div-buttons">
          <div>
            <!-- Botão de editar sempre habilitado -->
            <button class="btn btn-primary btn-sm mr-2" @click="editUser(user.id)">Editar</button>
            <!-- Botão de excluir desabilitado se o usuário logado for o mesmo -->
          </div>
          <div>
            <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)" :disabled="user.id === loggedInUserId">
              Excluir
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getUsers, deleteUser } from '@/services/api';
import { jwtDecode } from 'jwt-decode';  // Importa o jwt-decode para decodificar o token

export default {
  data() {
    return {
      users: [],
      loggedInUserId: null  // Armazenar o ID do usuário logado
    };
  },
  async created() {
    try {
      const token = localStorage.getItem('jwt');
      if (token) {
        const decoded = jwtDecode(token);  // Decodificar o token JWT para obter as informações do usuário logado
        this.loggedInUserId = decoded.id;  // Armazenar o ID do usuário logado
      }

      const response = await getUsers();
      this.users = response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  },
  methods: {
    editUser(id) {
      this.$router.push(`/edit-user/${id}`);  // Direcionar para a página de edição com o ID do usuário
    },
    async deleteUser(id) {
      if (confirm('Tem certeza que deseja excluir este usuário?')) {
        try {
          await deleteUser(id);
          this.users = this.users.filter(user => user.id !== id);  // Remover o usuário da lista
        } catch (error) {
          console.error('Erro ao excluir usuário:', error);
        }
      }
    },
    addUser() {
      this.$router.push('/register');  // Redirecionar para a página de registro de usuário
    }
  }
};
</script>

<style scoped>
#div-buttons {
  display: inline-flex;
}

#div-buttons div {
  margin-right: 10px;
}
</style>