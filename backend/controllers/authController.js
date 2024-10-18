require('dotenv').config(); // Para carregar as variáveis de ambiente
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const secretKey = process.env.SECRET_KEY;  // Use uma chave secreta forte em produção
const { sendEmail } = require('../middleware/sendGridMiddleware.js');
const { sendVerificationEmail } = require('../middleware/nodeMailerMiddleware.js');
const subject = 'Confirmação';
const textbody = 'Confirme que é você!';

// Registrar um novo usuário
const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validação de senhas no backend
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'As senhas não coincidem' });
  }

  try {
    // Verificar se o usuário já existe
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já registrado' });
    }

    // Criar um hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o novo usuário
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Gerar um token de verificação
    const verificationToken = jwt.sign(
      { userId: user.id, email: user.email },
      secretKey,  // Uma chave secreta
      { expiresIn: '1m' }  // Token expira em 1 dia
    );

    // Link de verificação
    const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}`;

    const to = email;
    const html = `<p>Clique no link abaixo para verificar seu e-mail:</p><a href="${verificationLink}">Confirmar E-mail</a>`;

    console.log(to);
    console.log(subject);
    console.log(textbody);
    console.log(html);

    // Dispara e-mail de confirmação via SendGrid
    await sendEmail(
      to, // Destinatário
      subject, // Assunto
      textbody, // Texto do e-mail
      html // Corpo do e-mail em HTML
    );
    
    // // Enviar o e-mail de verificação
    // await sendVerificationEmail(
    //   to, // Destinatário
    //   subject, // Assunto
    //   html // Corpo do e-mail em HTML
    // );

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login de usuário
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Gerar um token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

    res.json({ message: 'Login bem-sucedido!', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login
};