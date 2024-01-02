FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
# RUN npm install -g serve
EXPOSE 2020
CMD ["npm", "run", "start"]
