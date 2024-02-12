FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 2020
CMD ["npm", "run", "start"]
