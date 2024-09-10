const express = require('express');
const cors = require('cors');  // Adicionar o CORS

const app = express();
const port = 3000;

app.use(cors());  // Ativar o CORS para todas as rotas

// Middleware para permitir o parsing de JSON no body da requisição
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Conexão com o backend funcionando!' });
});

app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
});