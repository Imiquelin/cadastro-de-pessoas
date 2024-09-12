const { User } = require('../models');

// Criar um novo usuário
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ message: 'Usuário criado com sucesso!', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar todos os usuários
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar um usuário pelo ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um usuário
const updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      return res.json({ message: 'Usuário atualizado com sucesso!', updatedUser });
    }
    throw new Error('Usuário não encontrado');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar um usuário
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      return res.json({ message: 'Usuário deletado com sucesso!' });
    }
    throw new Error('Usuário não encontrado');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função de teste no controller
const testController = (req, res) => {
  res.json({ message: 'Controller de teste funcionando!' });
};

// Exportar a função de teste junto com as outras
module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  testController  // Adicionar a função de teste aqui
};
