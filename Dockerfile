FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install


COPY . .

RUN npm run build

EXPOSE 3000

RUN npx prisma generate
CMD ["node", "dist/src/main"]