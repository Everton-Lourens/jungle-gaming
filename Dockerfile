FROM node:18.20.7-alpine

COPY . .

RUN npm ci

RUN npm run build

CMD ["npm", "start"]