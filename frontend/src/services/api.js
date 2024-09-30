import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // URL do seu backend
});

// Função para autenticar o usuário
export const login = (data) => {
  return api.post('/auth/login', data);
};

// Função para registrar um usuário
export const createUser = (data) => {
  return api.post('/auth/register', data);
};

export const testConnection = () => {
  return api.get('/test');
};

// Função para obter a lista de usuários
export const getUsers = () => {
  // Adicionar o token JWT ao cabeçalho Authorization
  const token = localStorage.getItem('jwt');
  return api.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Função para obter um usuário por ID
export const getUserById = (id) => {
  const token = localStorage.getItem('jwt');
  return api.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Função para atualizar um usuário
export const updateUser = (id, data) => {
  const token = localStorage.getItem('jwt');
  return api.put(`/users/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Função para excluir um usuário
export const deleteUser = (id) => {
  const token = localStorage.getItem('jwt');
  return api.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export default api;