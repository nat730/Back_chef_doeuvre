FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
VOLUME /app/db/database.sqlite
EXPOSE 2020
CMD ["npm", "run", "start"]
