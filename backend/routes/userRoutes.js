const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middleware/authMiddleware');

// Rota para criar um novo usuário
router.post('/', authenticateJWT, userController.createUser);

// Rota para listar todos os usuários
router.get('/', authenticateJWT, userController.getUsers);

// Rota para buscar um usuário por ID
router.get('/:id', authenticateJWT, userController.getUserById);

// Rota para atualizar um usuário
router.put('/:id', authenticateJWT, userController.updateUser);

// Rota para deletar um usuário
router.delete('/:id', authenticateJWT, userController.deleteUser);

module.exports = router;
