FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# RUN npx sequelize-cli db:migrate
CMD ["npm", "start"]