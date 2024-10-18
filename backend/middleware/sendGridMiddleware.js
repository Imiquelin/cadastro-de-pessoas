require('dotenv').config(); // Para carregar as variáveis de ambiente
const sgMail = require('@sendgrid/mail');

// Configurar a API Key da SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Função para enviar o e-mail
const sendEmail = (to, subject, text, html) => {
  const msg = {
    to: to, // Destinatário
    from: process.env.FROM, // Coloque aqui o e-mail verificado do SendGrid
    subject: subject, // Assunto do e-mail
    text: text, // Texto do corpo do e-mail
    html: html // Corpo do e-mail em HTML
  };

  // Enviar o e-mail
  sgMail
    .send(msg)
    .then(() => {
      console.log('E-mail enviado com sucesso');
    })
    .catch((error) => {
      console.error('Erro ao enviar e-mail:', error);
    });
};

module.exports = { sendEmail };
