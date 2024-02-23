#* Step 1: Build Express App

FROM        node:18.17.1-alpine AS builder
WORKDIR     /app
COPY        package.json .
RUN         npm ci --production
COPY        . .
RUN         npm run build 

#* Step 2: Start Express Server

FROM        node:18.17.1-alpine
WORKDIR     /app
COPY        --from=builder /app/dist /app/dist
COPY        --from=builder /app/node_modules /app/node_modules
EXPOSE      3000
ENTRYPOINT  ["npm","run","start"]