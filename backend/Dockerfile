FROM node:22-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE ${BACKEND_PORT}

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]