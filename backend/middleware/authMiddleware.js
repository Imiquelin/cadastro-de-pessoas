require('dotenv').config(); // Para carregar as variáveis de ambiente
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;  // A mesma chave secreta usada no authController

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = authenticateJWT;
