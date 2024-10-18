require('dotenv').config(); // Para carregar as variáveis de ambiente
const nodemailer = require('nodemailer');

// Configuração do transporte de e-mail
const transporter = nodemailer.createTransport({
  service: process.env.PROVIDER,  // Use o serviço de e-mail que você quiser (Gmail, SMTP etc.)
  auth: {
    user: process.env.FROM,  // Seu e-mail
    pass: process.env.PASS  // Sua senha ou app password (se usar Gmail)
  }
});

// Função para enviar o e-mail de verificação
const sendVerificationEmail = async (toEmail, subject, html) => {
  const mailOptions = {
    from: process.env.FROM,
    to: toEmail,
    subject: subject,
    html: html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail de verificação enviado para:', toEmail);
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
  }
};

module.exports = { sendVerificationEmail };