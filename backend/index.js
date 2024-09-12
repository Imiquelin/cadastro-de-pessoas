const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());  // Habilitar parsing de JSON

// Rotas de autenticação
app.use('/api/auth', authRoutes);

// Usar o prefixo "/api/users" para as rotas de usuários
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});