require('dotenv').config(); // Para carregar as variáveis de ambiente
const nodemailer = require('nodemailer');

// // Configuração do transporte de e-mail
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   secure: process.env.SMTP_SECURE,  // Use TLS
//   service: process.env.PROVIDER,  // Use o serviço de e-mail que você quiser (Gmail, SMTP etc.)
//   auth: {
//     user: process.env.FROM,  // Seu e-mail
//     pass: process.env.PASS  // Sua senha ou app password
//   }
// });

// Configuração do transporte de e-mail
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,  // Use TLS
  auth: {
    user: 'miquelin@outlook.com.br',  // Seu e-mail
    pass: 'I01J26S05@31a10'  // Sua senha ou app password
  },
  tls: {
    ciphers: 'SSLv3'
  }
});

// Função para enviar o e-mail de verificação
const sendVerificationEmail = async (toEmail, subject, html) => {
  const mailOptions = {
    from: process.env.FROM,
    to: toEmail,
    subject: subject,
    text: html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail de verificação enviado para:', toEmail);
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
  }

};

module.exports = { sendVerificationEmail };