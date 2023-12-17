FROM node:18-buster
ENV WDS_SOCKET_PORT=3001
ENV CHOKIDAR_USEPOLLING=true
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]