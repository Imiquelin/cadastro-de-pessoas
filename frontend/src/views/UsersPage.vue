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
            <button class="btn btn-danger btn-sm" @click="confirmDelete(user)" :disabled="user.id === loggedInUserId">
              Excluir
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>

  <div class="modal fade" id="confirmDeleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Confirmar Exclusão</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Tem certeza que deseja excluir o usuário <strong>{{ userToDelete?.name }}</strong>?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Cancelar
          </button>
          <button type="button" class="btn btn-danger" @click="deleteUser(userToDelete.id)" data-bs-dismiss="modal">
            Excluir
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { getUsers, deleteUser } from '@/services/api';
import { jwtDecode } from 'jwt-decode';  // Importa o jwt-decode para decodificar o token
import { Modal } from 'bootstrap';

export default {
  emits: ['loginSuccess'],  // Declare o evento emitido
  data() {
    document.title = 'Gestão de Pessoas';
    return {
      users: [],
      loggedInUserId: null,  // Armazenar o ID do usuário logado
      userToDelete: null,  // Armazena o usuário que será excluído
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
      // Remover o token do localStorage
      localStorage.removeItem('jwt');
      this.isLoggedIn = false;
      // Redirecionar para a página de login
      this.$router.push('/auth');
      console.error('Erro ao buscar usuários:', error);
    }
  },
  methods: {
    editUser(id) {
      this.$router.push(`/edit-user/${id}`);  // Direcionar para a página de edição com o ID do usuário
    },
    confirmDelete(user) {
      this.userToDelete = user;
      const modal = new Modal(document.getElementById('confirmDeleteModal'));
      modal.show();  // Exibe o modal de confirmação
    },
    async deleteUser(id) {
      try {
        await deleteUser(id);
        this.users = this.users.filter(user => user.id !== id);  // Remover o usuário da lista
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
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