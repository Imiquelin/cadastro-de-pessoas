# Usar uma imagem do Node.js como base
FROM node:14-alpine
# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app
# Copiar o package.json e o package-lock.json para o contêiner
COPY package*.json ./
# Instalar as dependências do projeto
RUN npm install
# Copiar o restante dos arquivos do projeto para o contêiner
COPY . .
# Compilar o projeto para produção
RUN npm run build
# Expor a porta que será usada pelo servidor web
EXPOSE 8080
# Comando para rodar a aplicação
CMD ["npm", "run", "serve"]