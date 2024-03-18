FROM node:alpine3.18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3066
