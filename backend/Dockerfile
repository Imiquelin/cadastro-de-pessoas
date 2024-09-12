FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
# EXPOSE 3000
# RUN chmod +x /usr/local/bin/wait-for-it.sh
# CMD ["wait-for-it.sh", "db:3306", "--", "npm", "start"]
CMD ["npm", "start"]