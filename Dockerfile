FROM node:18-alpine AS builder

WORKDIR /src

COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY . .

FROM node:18-alpine

WORKDIR /prod

COPY --from=builder /src/node_modules ./node_modules
COPY --from=builder /src .

ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "server.js"]
