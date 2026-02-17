FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY index.html ./

RUN npm install

COPY src ./src
COPY public ./public

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
