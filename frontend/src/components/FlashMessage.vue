<template>
  <!-- Modal de Flash Message -->
  <div class="modal fade" id="flashMessageModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div :class="`modal-content ${type}`">
        <div class="modal-header">
          <h5 class="modal-title" id="flashMessageLabel">
            {{ title }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {{ message }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  props: {
    message: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: 'Mensagem'
    },
    type: {
      type: String,
      default: 'success'  // Tipo de mensagem (success, error, info, etc.)
    },
    duration: {
      type: Number,
      default: 3000  // Duração padrão de 3 segundos
    }
  },
  data() {
    return {
      modal: null
    };
  },
  mounted() {
    this.modal = new Modal(document.getElementById('flashMessageModal'));
    this.showMessage();

    document
      .getElementById('flashMessageModal')
      .addEventListener('hidden.bs.modal', this.onCloseModal);
  },
  methods: {
    showMessage() {
      // Exibir o modal
      this.modal.show();

      // Ocultar o modal automaticamente após 'duration' milissegundos
      setTimeout(() => {
        this.modal.hide();
      }, this.duration);
    },
    onCloseModal() {
      // Emitir um evento para o componente pai quando o modal for fechado
      this.$emit('clearFlashMessage');
    }
  },
  beforeUnmount() {
    // Remover o event listener quando o componente for destruído
    document
      .getElementById('flashMessageModal')
      .removeEventListener('hidden.bs.modal', this.onCloseModal);
  }
};
</script>

<style scoped>
/* Estilos opcionais para ajustar o tamanho e posicionamento do modal */
.modal-content {
  text-align: center;
}

.success>.modal-body {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.danger>.modal-body {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
</style>
