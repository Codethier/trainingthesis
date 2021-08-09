FROM node:latest
WORKDIR "/app"
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY ./api .
CMD [ "node", "main.js"]
